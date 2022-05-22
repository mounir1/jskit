Ext.define('jskit.view.main.CategoryList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.categorylist',
    padding: 10,
    ref: 'category/',
    items: [
        {
            xtype: 'categorygrid'
        }
    ],
    edits: jskit.Edits.category_edits()
});