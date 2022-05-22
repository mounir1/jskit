Ext.define('jskit.view.main.MyVideosGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'myvideosgrid',
    iconCls: 'fa fa-film',
    title: 'My Videos List',
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-play',
            click: 'doPlayVideo'
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
            text: 'description',
            dataIndex: 'description',
            flex: 2
        },
        {
            text: 'imageUrl',
            dataIndex: 'imageUrl',
            displayTip: true,
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