Ext.define('jskit.view.main.ItemsList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.itemsList',
    padding: 10,
    ref: 'items/',
    items: [
        {
            xtype: 'itemsgrid'
        }
    
    ]
});