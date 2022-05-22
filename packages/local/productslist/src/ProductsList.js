Ext.define('jskit.view.main.ProductsList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.productslist',
    padding: 10,
    scrollable: true,
    ref: 'items/',
    items: [
        {
            xtype: 'productsgrid'
        }
    ],
    edits: jskit.Edits.product_list()
});