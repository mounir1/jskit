Ext.define('jskit.view.main.GBookListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'gbookgrid',
    
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-star',
            click: 'doAddToBooks'
        }
    ],
    
    dataTools: [
        
        {
            xtype: 'mytextfld',
            emptyText: 'Search ',
            fieldLabel: 'Search ',
            bind: '{filterVm.q}',
            listeners: {
                change: 'onChanneSearch'
            }
        },
      
    ],
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: ' Title ',
            dataIndex: 'title',
            width: 300
        },
        {
            text: 'Summary',
            dataIndex: 'description',
            displayTip: true,
            flex: 1
        },
        {
            text: 'Thumbnail ',
            dataIndex: 'thumbnail',
            flex: 1
        },
        {
            text: 'publisher',
            dataIndex: 'publisher',
            width: 300
        }, {
            text: 'infoLink',
            dataIndex: 'infoLink',
            width: 400
        },
        {
            text: 'Publish Date',
            dataIndex: 'publishedDate',
            width: 100
        },
        {
            text: 'printType',
            dataIndex: 'printType',
            width: 100
        }
    ]
});