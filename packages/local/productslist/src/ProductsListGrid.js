Ext.define('jskit.view.main.ProductsListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'productsgrid',
    title: 'Products List',
    iconCls: 'fa fa-prodcut',
    
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            bind: {
                store: '{pagingStore}'
            },
            displayInfo: true,
            dock: 'bottom'
        }
    ],
    tools: [
        {
            type: 'refresh',
            handler: 'onRefresh'
        },
        {
            type: 'plus',
            handler: 'onAdd'
        }
    ],
    
    listeners: {
        itemdblclick: 'onUpdate'
    },
    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl:
                '<table >\n' +
                '  <tr>\n' +
                '    <td><img style="width:260px;height:350px " src="{imageUrl}" ></td>\n' +
                '    <td style="width:460px;align="right"> <b>Description :</b> <p>{description}</p></td>\n' +
                '  </tr>\n' +
                '</table>'
        }
    
    ],
    bind: {
        store: '{pagingStore}'
    },
    
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
            displayTip: true,
            flex: 1
        },
        {
            text: 'Image ',
            dataIndex: 'imageUrl',
            displayTip: true,
            flex: 1
    
        },
        {
            text: 'Category',
            dataIndex: 'category',
            width: 100
        },
        {
            text: 'Likes ',
            dataIndex: 'likesno',
            width: 100
        },
        {
            text: 'Favorit ',
            dataIndex: 'fave',
            width: 100
        },
        {
            text: 'Main Slider ',
            dataIndex: 'ismainslider',
            width: 100
        },
        {
            xtype: 'widgetactioncol'
          
        }
    ]
});