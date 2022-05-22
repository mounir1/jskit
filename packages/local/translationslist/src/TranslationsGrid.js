Ext.define('jskit.view.main.TranslationsGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'translationsgrid',
    export: true,
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: ' Key ',
            dataIndex: 'key',
            flex: 1
        },
        {
            text: 'English',
            dataIndex: 'english',
            flex: 1
        },
        {
            text: 'Arabic',
            dataIndex: 'arabic',
            flex: 1
        },
        {
            text: 'French',
            dataIndex: 'french',
            flex: 1
        },
        {
            text: 'Turkish',
            dataIndex: 'turkish',
            flex: 1
        },
        {
            text: 'German',
            dataIndex: 'german',
            flex: 1
        },
        {
            text: 'Spanish',
            dataIndex: 'spanish',
            flex: 1
        }, {
            text: 'Russian',
            dataIndex: 'russian',
            flex: 1
        },
        {xtype:'widgetactioncol'}
    ]
    
});