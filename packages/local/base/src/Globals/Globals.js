Ext.define('jskit.Globals', {
    singleton: true,
    
    isDevMode: location.hostname === 'localhost',
    
    EXPAND_MENU: 180,
    
    MICRO_MENU: 32,
    
    getUser: function(){
        let me = this;
        if (!Ext.currentUser){
            return 'test';
        }
        else{
            return Ext.currentUser.uid;
        }
    },
    
    dataAccess: function(){
        if (Ext.currentUser ||   jskit.Globals.isDevMode){
            return true;
        }
        return false;
    },
    
    autoHideTooltip: (params) => { // to devide into auto close delay and default defined close delay
        let toolTip = new Ext.ToolTip(
            {
                itemId: params.id || 'jskit-tip' + Math.floor(Math.random() * 100),
                target: params.el,
                delegate: params.delegate || params.id,
                anchor: params.anchor || 'left',
                html: params.text || 'No Text',
                bodyStyle: params.bodyStyle || null,
                cls: params.el + 'tooltip',
                hideDelay: params.hideDelay,
                autoWidth: true,
                autoHeight: true,
                closable: params.closable || false,
                dismissDelay: 0, // do not auto hide when mouse stay in same popup target.
                trackMouse: params.trackMouse || false,
                autoHide: params.autoHide || true,
                mouseOffset: [-10, -20]
            });
        
        params.showAt ? toolTip.showAt(params.showAt) : toolTip.show();
        params.autoHide && Ext.defer(() => toolTip.destroy(), 3000);
    },
    
    displayRatingTip: function(params){
        let toolTip = new Ext.ToolTip({
            id: params.el.id + 'tip' + Math.floor(Math.random() * 1000),
            autoWidth: true,
            autoHeight: true,
            closable: false,
            viewList: params.viewList,
            dismissDelay: 0, // do not auto hide when mouse stay in same popup target.
            autoHide: false,
            target: params.el,
            record: params.record,
            items: {
                xtype: 'rating',
                value: params.val,
                listeners: {
                    change: 'applyRateRecord'
                }
            }
        });
        
        toolTip.show();
        Ext.defer(() => toolTip.destroy(), 3000);
    },
    
    compQuery: (targetComponent, index = null, skip = true) => {
        // glb.createWarnLog(false, {warn: 'Dear Developer; `glb.compQuery` method will be deprecated! \n Please use `glb.owebCompQuery` instead.'});
        if (!index){
            return skip ? Ext.first(targetComponent) : Ext.ComponentQuery.query(targetComponent);
        }
        return Ext.ComponentQuery.query(targetComponent)[index];
    },
    
    prepareFiles: function(files, wind, currRec, container){
        if (currRec){
            currRec.data.fileRefs = [];
            currRec.data[wind.storageUrls] = [];
        }
        
        wind.filesCount = wind.filesCount + files.length;
        Object.keys(files)
              .forEach(element => {
                  var file = files[element],
                      FR = new FileReader(),
                      imageVal = window.URL.createObjectURL(file);
                  FR.readAsDataURL(file);
                  container.add({
                      xtype: 'image',
                      alt: 'moviedata',
                      style: {
                          width: '100px',
                          height: '100px',
                          display: 'block',
                          borderRadius: '100%'
                      },
                      src: imageVal
                  });
            
                  jskit.Globals.uploadFile(file, wind)
                       .then(url => {
                           wind.filesCount--;
                           if (!currRec || wind.parentList.xtype === 'imagesList'){
                               let record = wind.pagingStore.add({
                                   userId: jskit.Globals.getUser(),
                                   title: file.name,
                                   fileRef: file.name,
                                   size: file.size,
                                   type: file.type,
                                   [wind.storageUrl]: url
                               });
                    
                               delete record[0].data.id;
                               delete record[0].data.gid;
                               wind.store.add(record[0].data);
                               if (wind.filesCount === 0){
                                   wind.store.sync();
                                   wind.parentList.controller.onRefresh(wind.parentList, wind.store);
                               }
                           }
                           else{
                               currRec.data.fileRef = file.name;
                               currRec.data[wind.storageUrl] = url;
                               currRec.data[wind.storageUrls].push(url);
                               currRec.data.fileRefs.push(file.name);
                           }
                       });
              });
    },
    
    uploadFile: function(file, wind){
        var deferred = new Ext.Deferred(),
            
            uploadTask = Ext.st.ref()
                            .child(wind.parentList.ref + file.name)
                            .put(file);
        wind.mask('uploading ...');
        uploadTask.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                wind.mask('Uploading .... ' + Math.round(percentage * 100) / 100);
                switch (snapshot.state){
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        wind.unmask();
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function(error){
                deferred.reject(error);
                console.log(error);
                wind.unmask();
            },
            function(){
                uploadTask.snapshot.ref.getDownloadURL()
                          .then(function(downloadURL){
                              wind.unmask();
                              console.log('File available at', downloadURL);
                              deferred.resolve(downloadURL);
                          });
            });
        
        return deferred.promise;
    },
    
    onDeleteRecord: function(record, ref){
        let me = this,
            deferred = new Ext.Deferred(),
            remoteRec = Ext.db.ref(ref)
                           .child(record.data.gid),
            storageRef = Ext.st.ref(ref);
        
        me.doRmoveStorage(record, storageRef)
          .then(function(){
              remoteRec.on('value', function(snapchot){
                  record.store.remove(record);
              });
              remoteRec.remove();
              deferred.resolve();
          });
        return deferred.promise;
    },
    
    doRmoveStorage: function(record, storageRef){
        let me = this,
            deferred = new Ext.Deferred(),
            promises = [];
        if (record.data.fileRefs){
            record.data.fileRefs.forEach(fileRef => {
                promises.push(me.removeFile(storageRef, fileRef));
            });
            Promise.all(promises)
                   .then(function(){
                       deferred.resolve();
                   });
        }
        else{
            if (record.data.fileRef){
                me.removeFile(storageRef, record.data.fileRef)
                  .then(function(){
                      deferred.resolve();
                  });
            }
            else{
                deferred.resolve();
            }
        }
        return deferred.promise;
    },
    
    removeFile: function(storageRef, fileRef){
        let deferred = new Ext.Deferred();
        storageRef.child(fileRef)
                  .delete()
                  .then(function(){
                      deferred.resolve();
                  })
                  .catch(function(error){
                      Ext.Msg.alert('Error', error);
                  });
        return deferred.promise;
    },
    
    encrypt: function(o, salt){
        o = JSON.stringify(o)
                .split('');
        for (var i = 0, l = o.length; i < l; i++){
            if (o[i] === '{'){
                o[i] = '}';
            }
            else if (o[i] === '}'){
                o[i] = '{';
            }
        }
        return encodeURI(salt + o.reverse()
                                 .join(''));
    },
    
    decrypt: function(o, salt){
        o = decodeURI(o);
        let decryption = {};
        try{
            if (salt && o.indexOf(salt) != 0){
                return;
            }
            o = o.substring(salt.length)
                 .split('');
            for (var i = 0, l = o.length; i < l; i++){
                if (o[i] === '{'){
                    o[i] = '}';
                }
                else if (o[i] === '}'){
                    o[i] = '{';
                }
            }
            decryption = JSON.parse(o.reverse()
                                     .join(''));
            return decryption;
        }
        catch (e){
            console.log(e);
        }
    },
    
    onBeforeUnload: function(e){
        sessionStorage.setItem('user', JSON.stringify(Ext.currentUser));
        // e.preventDefault();
        // e.returnValue = '';
        // delete e['returnValue'];
    },
    
    onGeolocation: function(position){
        let me = this;
        if (Ext.JsKitData){
            Object.assign(Ext.JsKitData, position);
            jskit.Globals.onAfterGeoLocation();
            // me.syncJsKitData();
        }
    },
    
    syncJsKitData: function(){
        Ext.Initialized &&
        Ext.db.ref('JsKitGeoData/')
           .child(new Date().toUTCString())
           .set(Ext.JsKitData);
        localStorage.setItem('JsKitGeoData', jskit.Globals.encrypt(Ext.JsKitData, Ext.SaltKey));
    },
    
    onGeoError: function(error){
        let me = this;
        switch (error.code){
            case error.TIMEOUT:
                navigator.geolocation.getCurrentPosition(jskit.Globals.onGeolocation, jskit.Globals.onGeoError);
                break;
            case error.POSITION_UNAVAILABLE :
                break;
            case error.PERMISSION_DENIED :
                jskit.Globals.getLoc();
                break;
        }
    },
    
    getLoc: function(){
        var xhrIp = new XMLHttpRequest(),
            xhrLoc = new XMLHttpRequest();
        Ext.JsKitData.browser = Ext.browser.identity;
        
        xhrIp.open('GET', 'https://api.ipify.org');
        xhrIp.onload = () => {
            Ext.JsKitData.ip = xhrIp.response;
            xhrLoc.open('GET', 'https://geo.ipify.org/api/v1?apiKey=at_eiw9ihuClkYoOVNMvfVGYVkXLnMHj&ipAddress=' + xhrIp.response);
            xhrLoc.onload = () => {
                Object.assign(Ext.JsKitData, JSON.parse(xhrLoc.response));
                jskit.Globals.onAfterGeoLocation();
                jskit.Globals.syncJsKitData();
            };
            xhrLoc.send();
        };
        xhrIp.send();
    },
    
    onAfterGeoLocation: function(){
        
        let body = Ext.getBody().component,
            weatherWidget = body.down('#WeatherWidget'),
            mainfooter = body.down('mainfooter');
        mainfooter.removeAll();
        
        weatherWidget.events.boxready.fire(weatherWidget);
        mainfooter.add(jskit.Edits.mainFooterItems());
    },
    
    createMediaPlayer: function(config){
        let items = {};
        switch (config.type){
            case 'youtube':
                items = {
                    xtype: 'uxiframe',
                    minWidth: 560,
                    minHeight: 355,
                    maxHeight: window.innerHeight,
                    src: 'https://www.youtube.com/embed/' + config.link
                };
                break;
            case 'video':
                items = {
                    xtype: 'video',
                    width: 600,
                    height: 400,
                    src: config.link || 'http://www.w3schools.com/html/mov_bbb.ogg'
                };
                break;
            case 'file':
                items = {
                    xtype: 'uxiframe',
                    minWidth: 560,
                    minHeight: 355,
                    maxHeight: window.innerHeight,
                    src: config.file
                    
                };
                break;
            
        }
        
        Ext.create('jskit.view.component.Window', {
            title: config.title,
            items: items,
            listeners: {
                resize: function(panel, width, newHeight, oldWidth, oldHeight, eOpts){
                    panel.suspendLayouts();
                    if (oldHeight && oldWidth){
                        let frame = panel.items.items[0];
                        frame.setHeight(newHeight - 40);
                        frame.setWidth(width);
                    }
                    panel.resumeLayouts(true);
                }
            }
        });
        return false;
    },
    
    createPreviewWindow: function(config){
        Ext.create('jskit.view.component.Window', {
            title: config.title || 'PREVIEW',
            items: config.items,
            width: config.width || 600,
            height: config.height || 500,
            controller: 'listvc',
            listeners: {
                resize: function(panel, width, newHeight, oldWidth, oldHeight, eOpts){
                    panel.suspendLayouts();
                    if (oldHeight && oldWidth){
                        let frame = panel.items.items[0];
                        frame.setHeight(newHeight - 40);
                        frame.setWidth(width);
                    }
                    panel.resumeLayouts(true);
                }
            }
        });
    },
    
    formatJSON: function(data){
        return {
            xtype: 'form',
            currRec: data,
            items: {
                xtype: 'box',
                autoEl: {
                    tag: 'iframe',
                    src: 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 4)),
                    width: '100%',
                    height: '100%'
                }
            }
        };
    },
    
    createJsKitDataForm: function(config){
        Ext.widget('mydata', Object.assign({
            itemId: config.itemId || 'myData',
            isEdit: config.isEdit,
            record: config.record,
            title: config.title,
            session: true,
            viewModel: {
                data: {
                    record: config.record
                }
            },
            store: config.remoteStore,
            isDF: config.isDF,
            pagingStore: config.pagingStore,
            parentList: config.viewList,
            edits: config.edits || config.viewList.edits,
            filesCount: 0,
            noSaveCancel: config.viewList.noSaveCancel || false,
            listeners: {
                beforerender: 'dataAfterRender'
            }
        }, config));
    },
    
    createFirebaseStore: function(url){
        return Ext.create('Ext.data.Store', {
            proxy: {
                type: 'firebase-db',
                url: url,
                api: {
                    create: url,
                    read: url,
                    update: url,
                    delete: url
                    
                }
            }
        });
    },
    
    fix: function(ss){
        
        Object.keys(ss)
              .forEach(key => {
                  if (!ss[key].fileRef){
                      delete ss[key];
                  }
                  else{
                      ss[key].fileUrl = ss[key].imageUrl;
                      delete ss[key].imageUrl;
                      delete ss[key].imageUrls;
                      var title = ss[key].fileRef.replace('mp', '')
                                         .replaceAll('.', '')
                                         .replace(/[0-9]/g, '')
                                         .trim();
                
                      ss[key].title = title.substring(0, 1)
                                           .toUpperCase() + title.substring(1);
                  }
            
              });
        return ss;
    },
    
    translationsStore: function(){
        return [
            {
                text: jskitTranslations.english,
                value: 'english'
            },
            {
                text: jskitTranslations.french,
                value: 'french'
            },
            {
                text: jskitTranslations.spanish,
                value: 'spanish'
            },
            {
                text: jskitTranslations.russian,
                value: 'russian'
            },
            {
                text: jskitTranslations.german,
                value: 'german'
            },
            {
                text: jskitTranslations.arabic,
                value: 'arabic'
            },
            {
                text: jskitTranslations.turkish,
                value: 'turkish'
            }
        ];
    }
});