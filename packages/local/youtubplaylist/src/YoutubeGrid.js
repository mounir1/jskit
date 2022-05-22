Ext.define('jskit.view.main.YoutubeGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'youtubegrid',
    
    noAdd: true,
    
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-play',
            click: 'doPlayVideo'
        },
        {
            text: 'Play',
            iconCls: 'x-fa fa-star',
            click: 'doAddToVideos'
        }
    ],
    
    dataTools: [
        
        {
            xtype: 'myfbcombofield',
            emptyText: 'ChannelId ',
            fieldLabel: 'Channel Id',
            ref: '/channels',
            width: 300,
            defaultRecord: {
                key: 'UCoVKKQImX43NtAULA5PY8sQ',
                email: 'mounir1badi@gmail.com'
            },
            bind: '{filterVm.channelId}',
            listeners: {
                change: 'onChannelId',
                afterrender: 'onYoutubeChannels'
            }
        },
        {
            xtype: 'mycombofield',
            fieldLabel: 'Play Lists:',
            width: 350,
            itemId: 'playListCombo',
            displayField: 'title',
            valueField: 'id',
            listeners: {
                change: 'onPlayListChange',
                afterrender: 'onPlayListChange'
            }
            
        },
        '->', {
            type: 'gear',
            iconCls: 'x-fa fa-cogs',
            handler: 'settingsWindow'
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
            text: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            text: 'Thumbnail',
            dataIndex: 'imageUrl',
            displayTip: true,
            flex: 1
        },
        {
            text: 'Chanel Id',
            dataIndex: 'channelId',
            flex: 1
        },
        {
            text: 'Video Id',
            dataIndex: 'link',
            flex: 1
        }, {
            text: 'published ',
            dataIndex: 'publishedAt',
            flex: 1
        }
    ]
});