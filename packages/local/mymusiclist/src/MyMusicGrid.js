Ext.define('jskit.view.main.MyMusicGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'mymusicgrid',
    
    iconCls: 'fa fa-music',
    title: 'My Music List',
    height: 500,
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-play',
            click: 'doPlayMusic'
        }
    ],
    dataTools: [
        {
            iconCls: 'x-fa fa-step-backward',
            itemId: 'preSong',
            handler: 'playPreviousMusic'
        },
        {
            iconCls: 'x-fa fa-play',
            itemId: 'playSong',
            handler: 'playMusic'
        },
        {
            iconCls: 'x-fa fa-step-forward',
            itemId: 'nextSong',
            ariaLabel: 'Next',
            handler: 'playNextMusic'
        },
        {
            xtype: 'mypanel',
            itemId: 'currentTime',
            html: '<div class="current-time">00:00</div>'
        },
        {
            xtype: 'mypanel',
            itemId: 'seek-slider',
            html: '<input type="range" min="1" max="100" value="0" class="seek_slider">'
        },
        {
            xtype: 'mypanel',
            itemId: 'total-time',
            html: '<div class="total-duration">00:00</div>'
        },
        {
            xtype: 'mypanel',
            itemId: 'seek-volume',
            html: '<i class="fa fa-volume-down"></i><input type="range" min="1" max="100" value="99" class="volume_slider" ><i class="fa fa-volume-up"></i>'
        },
        {
            xtype: 'mypanel',
            itemId: 'colorSelect',
            html: '        <select id="colorSelect" >' +
                '            <option value="0">Color Spectrum</option>\n' +
                '            <option value="1">Red</option>\n' +
                '            <option value="2">Orange</option>\n' +
                '            <option value="3">Yellow</option>\n' +
                '            <option value="4">Green</option>\n' +
                '            <option value="5">Blue</option>\n' +
                '            <option value="6">Purple</option>\n' +
                '        </select>'
        },
        {
            xtype: 'mypanel',
            draggable: true,
            itemId: 'visual-canvas',
            html: '<canvas height="50"  class="visualizer" id="cnv1" ></canvas>'
        },
        {
            xtype: 'mypanel',
            html: '<canvas id="circlecnv"></canvas>'
        }
    ],
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Loaded',
            dataIndex: 'loaded',
            width: 50
        },
        {
            text: ' Title ',
            dataIndex: 'title',
            flex: 2
        },
        {
            text: 'Singer',
            dataIndex: 'singer',
            flex: 1
        },
        {
            text: 'commentsNo',
            dataIndex: 'commentsNo',
            flex: 1
        },
        {
            text: 'file',
            dataIndex: 'fileRef',
            flex: 1
        },
        {
            text: 'likesNo',
            dataIndex: 'likesNo',
            flex: 1
        },
        {
            text: 'Url',
            dataIndex: 'fileUrl',
            flex: 1
        },
        {
            text: 'link',
            dataIndex: 'link',
            flex: 1
            
        },
        {
            xtype: 'widgetactioncol'
            
        }
    ]
});