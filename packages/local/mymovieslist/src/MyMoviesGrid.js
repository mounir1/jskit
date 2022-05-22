Ext.define('jskit.view.main.MyMoviesGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'mymoviesgrid',
    
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-play',
            click: 'doPlayMovie'
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
            text: 'author',
            dataIndex: 'author',
            flex: 1
        },
        {
            text: 'commentsNo',
            dataIndex: 'commentsNo',
            flex: 1
        },
        {
            text: 'description',
            dataIndex: 'description',
            flex: 2
        },
        {
            text: 'imageUrl',
            dataIndex: 'imageUrl',
            displayTip:true,
            flex: 1
        },
        {
            text: 'likesNo',
            dataIndex: 'likesNo',
            flex: 1
        },
        {
            text: 'link',
            dataIndex: 'link',
            flex: 1
            
        },
        {
          xtype:'widgetactioncol'
          
        }
    ]
});