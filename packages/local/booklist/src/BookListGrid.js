Ext.define('jskit.view.main.BookListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'bookgrid',
    
    scrollable: true,
    
    hoverActions: [
        {
            text: 'Read',
            iconCls: 'x-fa fa-book',
            click: 'doReadBook'
        }
    ],
    
    plugins: [
        
        {
            ptype: 'rowwidget',
            widget: {xtype: 'bookdp'}
        }
    ],
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
             text: ' Title ',
            dataIndex: 'title',
            flex: 1
        },
        
        {
            text: 'Summary',
            dataIndex: 'description',
            displayTip: true,
            flex: 1
        },
        {
            text: 'File Url',
            dataIndex: 'fileUrl',
            flex: 1
        },
        {
            text: 'Owner',
            dataIndex: 'owner',
            width: 300
        },
        {
            text: 'Publish Date',
            dataIndex: 'due',
            width: 100
        },
        {xtype:'widgetactioncol'}
    ]
});