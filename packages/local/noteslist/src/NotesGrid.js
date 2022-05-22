Ext.define('jskit.view.main.NoesGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'notesgrid',
    iconCls: 'fa fa-user',
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'note',
            dataIndex: 'note',
            displayTip: true,
            flex: 2
        },
        {
            text: 'code',
            displayTip: true,
            dataIndex: 'code',
            flex: 1
        },
        {
            text: 'id',
            dataIndex: 'id',
            flex: 1
        },
        {
            text: 'parent Id',
            displayTip: true,
            dataIndex: 'parentId',
            flex: 1
        },
        {
            text: 'date Time',
            dataIndex: 'insertDT',
            displayTip: true,
            flex: 1
        },
        {xtype:'widgetactioncol'}
    ]
    
});