Ext.define('jskit.view.main.MyVideosList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.myvideosList',
    padding: 10,
    ref: 'videos/',
    items: [
        {
            xtype: 'myvideosgrid'
        }
    ]
});