Ext.define('jskit.view.main.ListVC', {
    extend: 'jskit.view.main.MainVC',
    alias: 'controller.listvc',
 
    
    listen: {
        controller: {
            listvc: {
                doPlayVideo: 'doPlayVideo'
            },
            movieslist: {
                doAddToMovies: 'doAddToMovies'
            },
            youtubelist: {
                doPlayVideo: 'doPlayVideo',
                doAddToVideos: 'doAddToVideos'
            },
            gbooklist: {
                doAddToBooks: 'doAddToBooks'
            }
        }
    },
    
    doAddToMovies: function(view, record, i){
        let me = this,
            records = view.getSelection(),
            url = Ext.DB_URL + '/movies.json',
            remoteStore = jskit.Globals.createFirebaseStore(url);
    
        records.forEach(item => {
            me.doAddNewRecord(item.data, remoteStore);
        });
        return false;
    },
    
    doAddToBooks: function(view, record, i){
        let me = this,
            records = view.getSelection(),
            url = Ext.DB_URL + '/books' + '.json',
            remoteStore = jskit.Globals.createFirebaseStore(url);
        records.forEach(item => {
            me.doAddNewRecord(item.data, remoteStore);
        });
        return false;
    },
    
    doAddToVideos: function(view, record, i){
        let me = this,
            records = view.getSelection(),
            url = Ext.DB_URL + '/videos' + '.json',
            remoteStore = jskit.Globals.createFirebaseStore(url);
    
        records.forEach(item => {
            me.doAddNewRecord(item.data, remoteStore);
        });
        return false;
    },
    
    doPlayVideo: function(view, record, i){
        let me = this,
            video = record.data,
            type = video.link.indexOf('://') > 0 ? 'video' : 'youtube';
        jskit.Globals.createMediaPlayer({
            type: type,
            link: video.link,
            title: video.title
        });
        return false;
    },
    
    onRefresh: function(arg){
        let me = this,
            viewList = arg.isButton ? arg.up('list') : arg,
            vm = viewList.getViewModel(),
            remoteStore = vm.get('remoteStore');
        
        me.onBeforeRefresh(viewList, remoteStore)
          .then(function(){
              remoteStore && me.doRefresh(remoteStore, viewList);
          });
    },
    
    doRefresh: function(store, view){
        let me = this,
            vm = view.getViewModel(),
            paginStore = vm.get('pagingStore');
        store.load({
            callback: function(records, operation, success){ // smart Store createRemoteList Store load event is here for All lists . except compactMode ...
                if (success){
                    me.setMemoryData(paginStore, view, records);
                }
            }
        });
    },
    
    onExport: function(arg){
        let me = this,
            viewList = arg.up('list'),
            grid = viewList.down('grid'),
            items = grid.store.getData().items,
            english = {},
            french = {},
            turkish = {},
            german = {},
            spanish = {},
            russian = {},
            arabic = {};
        // me.syncTranslations();
        grid.store.setConfig({pageSize: grid.store.totalCount});
        // grid.store.load();
        items.forEach(item => {
            english[item.data.key] = item.data.english || '****';
            french[item.data.key] = item.data.french || '****';
            turkish[item.data.key] = item.data.turkish || '****';
            arabic[item.data.key] = item.data.arabic || '****';
            spanish[item.data.key] = item.data.spanish || '****';
            german[item.data.key] = item.data.german || '****';
            russian[item.data.key] = item.data.russian || '****';
        });
        
        var data = {
            en: english,
            tr: turkish,
            fr: french,
            es: spanish,
            de: german,
            ru: russian,
            ar: arabic
        };
        
        jskit.Globals.createPreviewWindow({
            title: 'TRANSLATIONS',
            width: 800,
            height: 850,
            items: {
                xtype: 'fieldset',
                jsonData: data,
                width: 800,
                height: 800,
                listeners: {
                    afterrender: function(self){
                        var data = self.jsonData || {
                                'Array': [1, 2, 3],
                                'Boolean': true,
                                'Null': null,
                                'Number': 123,
                                'Object': {
                                    'a': 'b',
                                    'c': 'd'
                                },
                                'String': 'Hello World'
                            },
                            dom = self.getEl().dom,
                            options = {};
                        dom.innerHTML = '';
                        
                        self.editor = new JSONEditor(dom, options);
                        self.editor.set(data);
                    }
                }
            }
            
            // items: {
            //     xtype: 'box',
            //     autoEl: {
            //         tag: 'iframe',
            //         src: 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 4)),
            //         width: '100%',
            //         height: '100%'
            //     }
            // }
        });
    },
    
   
    showFilterBar: function(arg){
    },
    
    setMemoryData: function(paginStore, view, records){
        let me = this;
        records.forEach(record => {
            if (!record.data.title){
                if (record.data.fileRef){
                    record.data.title = record.data.fileRef;
                }
                else{
                    record.data.title = 'No Title';
                }
            }
        });
        
        paginStore.getProxy()
                  .setData(records);
        paginStore.load();
        view.storeLoaded = true;
        me.updateConfigs(view, paginStore, records);
    },
    
    refreshAfterCUD: function(view, store){
        let me = this;
        me.doRefresh(store, view);
    },
    
    onBeforeRefresh: function(viewList, store){
        let me = this;
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
    
    loadStores: function(){
        let me = this,
            view = me.view,
            store = view.getViewModel().data.remoteStore;
        me.onRefresh(view, store);
    },
    
    updateConfigs: function(view, pagingStore){
        let me = this,
            gridHeight = window.innerHeight - 125;
            // grid = view.down('mygrid');
        me.prepareTheGrid(false, gridHeight, pagingStore);
    },
    
    prepareTheGrid: function(grid, height, pagingStore){
        // grid.setHeight(height);
        // grid.setMaxHeight(height);
        // grid.setMinHeight(height);
        pagingStore.setPageSize(height / 40);
        pagingStore.load();
    },
    
    oItemContextMenu: function(view, rec, node, index, e){
        let me = this,
            target = e.target,
            itemClassName = e.item ? e.item.className : e.target.className,
            targetClass = target.getAttribute('class') || target.className;
        
        e.preventDefault();
    },
    
    onDelete: function(self){
        if (jskit.Globals.dataAccess()){
            var me = this,
                viewList = self.up('list'),
                ref = viewList.ref,
                grid = viewList.down('grid'),
                records = grid.getSelection();
            
            records.forEach(item => {
                grid.store.remove(item);
                jskit.Globals.onDeleteRecord(item, ref);
            });
            me.onRefresh(viewList);
        }
        else{
            Ext.Msg.alert('ALERT', 'LOGIN FIRST');
        }
    },

    onAddFooterItems: function(mainFooter){
        mainFooter.removeAll();
        mainFooter.add(jskit.Edits.mainFooterItems());
    },

    doLogout: function(){
        firebase.auth()
                .signOut()
                .then(function(){
                    Ext.GlobalEvents.fireEvent('firebase-auth-statechange', false);
                    sessionStorage.removeItem('user');
                }, function(error){
                    Ext.Msg.alert(errorCode, errorMessage);
                });
        
    },
    
});