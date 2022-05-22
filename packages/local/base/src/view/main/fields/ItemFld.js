Ext.define('jskit.view.fields.ItemFldClass', {
    extend: 'Ext.menu.Item',
    controller: 'listvc',
    xtype: 'ooitem'
});

Ext.define('jskit.view.fields.addToFaveItem', {
    extend: 'jskit.view.fields.ItemFldClass',
    xtype:'addrecordtofaveitem',
    listeners: {
        click: 'addRecordToFave'
    }
});

Ext.define('jskit.view.fields.SocialShareItem', {
    extend: 'jskit.view.fields.ItemFldClass',
    xtype:'socialshareitem',
    listeners: {
        click: 'shareRecord'
    }
});
