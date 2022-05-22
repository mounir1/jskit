Ext.define('jskit.view.main.GBookList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.gbooklist',
    controller: 'gbooklist',
    viewModel: 'gbooklist',
    padding: 10,
    autoSelect: true,
    items: [
        {
            xtype: 'gbookgrid'
        }
    ],
    edits: []
});