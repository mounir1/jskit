Ext.define('jskit.view.main.CategoryGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'categorygrid',
    iconCls: 'fa fa-person',
    title: 'Employee List',
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Category Title',
            dataIndex: 'title',
            flex: 1
        }, {
            text: 'Category Code',
            dataIndex: 'code',
            flex: 1
        },
        {
            text: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        
        {xtype: 'widgetactioncol'}
    ]
});