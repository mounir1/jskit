Ext.define('jskit.view.main.MainVM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    requires: [
        'Ext.firebase.manager.FirebaseAuth',
        'Ext.firebase.data.EventStream',
        'Ext.firebase.data.proxy.FirebaseRealtimeDb'
    ],
    data: {
        appName: 'Admin Dashboard ',
        config: {},
        translations: {}
    },
    
    formulas: {
        createStores: function(){
            let me = this,
                ref = '/',
                view = me.getView();
    
            if (view.ref){
                if (view.compactMode && !view.adjusted){
                    let grid = view.up('grid'),
                        record = grid.getSelection()[0];
                    if (record){
                        view.ref = view.ref.replace('/', ':') + record.id + '/';
                        view.adjusted = true;
                    }
                    else{
                        console.warn('Select Record ');
                    }
                }
                ref = ref + view.ref.slice(0, -1);
                me.applyStores({
                    
                    filterVm: {
                        proxy: {
                            type: 'memory',
                            data: {}
                        }
                    },
                    remoteStore: {
                        autoLoad: false,
                        proxy: {
                            type: 'firebase-db',
                            // @sw-cache
                            api: {
                                create: Ext.DB_URL + ref + '.json',
                                read: Ext.DB_URL + ref + '.json',
                                update: Ext.DB_URL + ref + '.json',
                                delete: Ext.DB_URL + ref + '.json'
                            }
                        }
                    },
                    
                    pagingStore: {
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    }
                });
                Ext.Initialized && view.controller.loadStores();
            }
        }
    }
});