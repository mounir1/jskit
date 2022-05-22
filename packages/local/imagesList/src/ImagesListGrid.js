Ext.define('jskit.view.main.ImagesListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'imagesgrid',
    title: 'My Images List',
    // maxHeight: window.innerHeight - 800,
    plugins: [
            // {
        //     ptype: 'gridexporter'
        // },
        
        {
            ptype: 'rowexpander',
            rowBodyTpl:
                '<table >\n' +
                '  <tr>\n' +
                '    <td><img style="width:260px;height:350px " src="{imageUrl}" ></td>' +
                '  </tr>\n' +
                '</table>'
        }
        
        // {
        //     ptype: 'rowwidget',
        //     widget: {xtype: 'details-panel'}
        // }
    ],
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'Title',
            dataIndex: 'title',
            flex: 1
        },
        {
            text: 'imageUrl',
            dataIndex: 'imageUrl',
            displayTip: true,
            flex: 1
        },
        {
            text: 'Size',
            dataIndex: 'size',
            width: 100
        },
        {
          xtype:'widgetactioncol'
          
        }
    ]
});