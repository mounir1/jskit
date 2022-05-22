Ext.define('jskit.view.fields.ComboBoxFldClass', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'mycombofield',
    labelAlign: 'top',
    align: 'top',
    displayField: 'text',
    valueField: 'value'
});

Ext.define('jskit.view.fields.FbRemoteComboBoxFld', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'myfbcombofield',
    labelAlign: 'top',
    align: 'top',
    displayField: 'code',
    valueField: 'value',
    defaultRecord: {
        text: 'TEXT',
        value: 1
    },
    triggers: {
        clear: {
            cls: 'fa fa-times',
            handler: 'onClearTrigger',
            scope: 'controller'
        },
        plus: {
            cls: 'fa fa-plus',
            handler: 'onAddTrigger',
            scope: 'controller'
        },
        list: {
            cls: 'fa fa-list',
            handler: 'onListTrigger',
            scope: 'controller'
        }
    },
    edits: [
        {
            xtype: 'mypanel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'mytextfld',
                    fieldLabel: 'Value',
                    bind: '{record.value}'
                },
                {
                    xtype: 'mytextfld',
                    fieldLabel: ' Code',
                    bind: '{record.code}'
                }
            ]
        }
    ],
    listeners: {
        beforerender: 'onRemoteComboAfterRender'
    }
});