Ext.define('jskit.view.main.NewsGrid', {
    extend: 'jskit.view.component.MyGrid',
    alias: 'widget.newsgrid',
    
    title: 'TOP News Headlines',
    iconCls: 'fa fa-newspaper',
    noAdd: true,
    dataTools: [
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
            filter: {
                type: 'string'
            },
            flex: 3
        }, {
            text: 'author',
            dataIndex: 'author',
            filter: {
                type: 'string'
            },
            flex: 1
        }, {
            text: 'description',
            dataIndex: 'description',
            displayTip: true,
            filter: {
                type: 'string'
            },
            flex: 4
        }, {
            text: 'link',
            dataIndex: 'url',
            renderer: function(value){
                var link = value;
                return '<a target="_blank" href=' + link + '>more</a>';
            },
            flex: 1
        }
    ],
    
    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl:
                '<h4><b>{title}</b></h4>' +
                '<h5>By: <b>{author}</b></h5>' +
                '<div>source :<b>{source.name}</b></div>' +
                '<img style="width:320px;height:200px " src="{urlToImage}" >' +
                '<div> {description} </div>' +
                '<div>Publish date : {publishedAt}</div>' +
                '<div><a  target="_blank" href={url} >read more</a></div>'
        }
    ]
});