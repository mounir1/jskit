Ext.define('jskit.view.main.BookDp', {
    extend: 'jskit.view.component.DpTabs',
    alias: 'widget.bookdp',
    xtype: 'bookdp',
    items: [
        {
            xtype: 'mymusicList',
            title: jskitTranslations.music,
        }
    ]
});