Ext.define('jskit.mixins.DataCtrl', {
    
    onAdd: function(btn){
        if (jskit.Globals.dataAccess()){
            let me = this,
                viewList = btn.up('list'),
                vm = viewList.getViewModel(),
                pagingStore = vm.data.pagingStore,
                remoteStore = vm.data.remoteStore,
                record = pagingStore.add({})[0];
            me.doCreateDataForm(viewList, record, remoteStore, pagingStore, false);
        }
        else{
            Ext.Msg.alert('ALERT', 'LOGIN FIRST');
        }
    },
    
    onUpdate: function(grid, record, item, rowIndex, event, eOpts){
        let me = this,
            viewList = grid.up('list'),
            vm = viewList.getViewModel(),
            remoteStore = vm.data.remoteStore,
            pagingStore = vm.data.pagingStore,
            currRec = record.isEvent ? viewList.down('grid')
                                               .getSelection()[0] : record;
        !Ext.isEmpty(viewList.edits) &&
        me.doCreateDataForm(viewList, currRec, remoteStore, pagingStore, true);
        
    },
    
    doCreateDataForm: function(viewList, record, remoteStore, pagingStore, isEdit){
        jskit.Globals.createJsKitDataForm({
            viewList: viewList,
            store: remoteStore,
            record: record,
            pagingStore: pagingStore,
            isEdit: isEdit,
            isDF: true
        });
    },
    
    dataAfterRender: function(wind){
        if (wind.isDF){
            let vm = wind.getViewModel();
            if (wind.isEdit){
                wind.setTitle(jskitTranslations.edit + ' ' + wind.parentList.getTitle());
            }
            else{
                wind.setTitle(jskitTranslations.new + ' ' + wind.parentList.getTitle());
            }
            
            vm.set('translations', vm.getParent()
                                     .get('translations'));
        }
    },
    
    onExpand: function(evt, toolEl, header, tool){
        let me = this,
            dataform = header.ownerCt;
        tool.setConfig({
            hidden: true
        });
        dataform.expand('', false);
        dataform.setWidth(me.initlWidth);
        dataform.setHeight(me.initHeight);
        
        header.items.items[1].setHidden(true);
        header.items.items[2].setHidden(false);
        header.items.items[3].setHidden(false);
        // dataform.center();
    },
    
    onMinimize: function(self, toolEl, header, tool){
        let me = this,
            dataform = header.ownerCt;
        
        tool.setConfig({
            hidden: true
        });
        me.initlWidth = dataform.getWidth();
        me.initHeight = dataform.getHeight();
        
        if (Ext.prevMinimizedWindow != null){
            dataform.setPosition(Ext.prevMinimizedWindow.getPosition()[0], Ext.prevMinimizedWindow.getPosition()[1] + 50);
        }
        else{
            dataform.setPosition(window.innerWidth - me.initialWidth - 20, 40);
        }
        
        header.items.items[2].setHidden(true);
        header.items.items[1].setHidden(false);
        
        dataform.collapse();
        dataform.isMinimized = true;
        Ext.prevMinimizedWindow = dataform;
        Ext.activeWindows.push(dataform);
        
    },
    
    rearrangeWindows: function(windowIndex){
        var windows = Ext.activeWindows.filter(function(wind){
            return wind.isMinimized === true;
        });
        for (var i = windowIndex; i < windows.length; i++){
            windows[i].setPosition(10, (windows[i].getPosition()[1] - 100));
        }
    },
    
    getWindowIndex: function(window){
        var me = this;
        Ext.windowIndex = Ext.activeWindows.indexOf(window);
        if (Ext.windowIndex !== -1){
            Ext.activeWindows.splice(Ext.windowIndex, 1);
            me.rearrangeWindows(Ext.windowIndex);
        }
    },
    
    onMaximize: function(){
        //todo
    },
    
    onSave: function(button, arg){
        let me = this,
            wind = button.type === 'keydown' ? arg : button.up('window');
        switch (wind.itemId){
            case 'myData':
                me.doSaveDataForm(wind);
    
                break;
            case 'loginWind':
                me.onLogin(wind);
                break;
            case 'comboDataForm':
            case 'DashNote':
                me.doSaveComboRecord(wind);
                break;
            case 'comboListDataForm':
                me.doSaveComboList(wind);
                break;
            case 'signUpWind':
                me.onSignUp(wind);
                break;
        }
    },
    
    doSaveComboList: function(wind){
        let me = this;
        me.onCancel(wind);
    },
    
    doSaveDataForm: function(wind){
        let me = this,
            vm = wind.getViewModel(),
            remoteStore = wind.store,
            viewList = wind.parentList,
            record = vm.get('record');
        if (wind.isEdit){
            me.onEditRecord({
                wind: wind,
                record: record,
                viewList: viewList
            });
        }
        else{
            me.doAddNewRecord(record.data, remoteStore);
            remoteStore.load();
            if (wind.parentList && !wind.parentList.ignoreRefreshAfterCUD){
                wind.parentList.controller.refreshAfterCUD(wind.parentList, remoteStore);
            }
            me.onCancel(wind);
    
        }
    },
    
    onEditRecord: function(config){
        let me = this,
            wind = config.wind,
            record = config.record,
            viewList = config.viewList,
            remoteRec = Ext.db.ref(viewList.ref)
                           .child(record.data.gid);
        record.set('updateDT', new Date().toISOString());
        remoteRec.once('value', function(snapchot){
            var values = snapchot.val();
            if (values){
                remoteRec.transaction(function(Remotedata){
                    if (Remotedata){
                        Remotedata = record.data;
                        record.commit();
                        wind && wind.destroy();
                    }
                    return Remotedata;
                })
                         .then(function(){
                             console.log('record updated ');
                         })
                         .catch(function(error){
                             alert(error);
                         });
            }
        });
    },
    
    applyRateRecord: function(self, value){
        let me = this,
            tip = self.up(),
            record = tip.record;
        record.set('rating', value);
        me.onEditRecord({
            record: record,
            viewList: tip.viewList
        });
    },
    
    doSaveComboRecord: function(wind){
        let me = this,
            vm = wind.getViewModel(),
            remoteStore = wind.store,
            record = vm.get('record');
        if (wind.isEdit){
            me.onEditRecord({
                wind: wind,
                record: record,
                viewList: wind.parentList
            });
        }
        else{
            me.doAddNewRecord(record, remoteStore);
            remoteStore.load();
        }
        me.onCancel(wind);
    },
    
    doAddNewRecord: function(rec, store){
        delete rec.gid;
        delete rec.id;
        rec.updateDT = rec.insertDT = new Date();
        store.add(rec);
        store.sync();
        return false;
    },
    
    onCancel: function(button, args){
        let me = this,
            wind = (button.componentCls === 'x-window') ? button : (button.componentCls === 'x-btn') ? button.up('window') : args.isWindow ? args : me.view;
        Ext.destroy(wind);
    }
    
});