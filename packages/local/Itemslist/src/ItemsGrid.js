Ext.define('jskit.view.main.ItemsGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'itemsgrid',
    iconCls: 'fa fa-film',
    title: 'My Items List',
    
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
            Text: 'Summary',
            dataIndex: 'summary',
            displayTip:true,
            flex: 2
        },
        {
            text: 'year',
            dataIndex: 'year',
            width: 100
        },
        {
            text: 'language',
            dataIndex: 'language',
            width: 100
        },
        {
            text: 'imdb_code',
            dataIndex: 'imdb_code',
            width: 100
        },
        {
            text: 'Released Year ',
            dataIndex: 'year',
            width: 100
        },
        {
            text: 'Rating',
            dataIndex: 'rating',
            width: 100
        },
        {
            xtype: 'widgetactioncol'
        }
    ]
});