Ext.define('jskit.mixins.RemoteComboCtrl', {
    
    onRemoteComboAfterRender: function(combo){
        let url = Ext.DB_URL + combo.config.ref + '.json';
        combo.setStore(Ext.create('Ext.data.Store', {
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
        }));
    },
    
    onClearTrigger: function(combo, triger){
        combo.clearValue();
    },
    
    onAddTrigger: function(combo, trigger){
        if (jskit.Globals.dataAccess()){
            let me = this,
                record = combo.defaultRecord;
            me.doCreateComboDataForm(combo, record);
        }
        else{
            Ext.Msg.alert('ALERT', 'LOGIN FIRST');
        }
    },
    
    onListTrigger: function(combo, trigger){
    
        let config = {
            itemId: 'comboListDataForm',
            record: combo.defaultRecord,
            session: true,
            title: combo.name,
            store: combo.store,
            combo: combo,
            edits: {
                xtype: combo.list || 'list',
                ref: combo.ref.substr(1) + combo.ref.substr(0, 1)
            }
        };
        if (!combo.list){
            Object.assign(config, {
                edits: combo.edits,
                items: {
                    xtype: 'mygrid',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            text: ' Title ',
                            dataIndex: 'code',
                            flex: 1
                        },
                        {
                            text: 'Description',
                            dataIndex: 'description',
                            flex: 1
                        },
                        {
                            text: 'value',
                            dataIndex: 'value',
                            flex: 1
                        },
                        {
                            text: 'updateDt',
                            dataIndex: 'channelId',
                            flex: 1
                        },
                        {
                            text: 'Insert DT',
                            dataIndex: 'insertDT',
                            flex: 1
                        },
                        {
                            text: 'update DT',
                            dataIndex: 'updateDT',
                            flex: 1
                        },
                        {xtype:'widgetactioncol'}

                    ]
                }
            })
        }
        Ext.widget('mydata', config);
    },
    
    doCreateComboDataForm: function(combo, record, store){
        Ext.widget('mydata', {
            itemId: 'comboDataForm',
            record: combo.defaultRecord,
            session: true,
            viewModel: {
                data: {
                    record: combo.defaultRecord
                }
            },
            bind: {title: '{translations.new}'},
            store: combo.store,
            combo: combo,
            edits: combo.edits
        });
    }
});