Ext.define('jskit.view.component.DpTabs', {
    extend: 'jskit.view.component.MainTabs',
    xtype: 'dptabs',
    autoSelect: true,
    scrollable: true,
    height: 400,
    resizable: true,
    frame: true,
    listeners: {
        beforerender: function(tabs){
            let grid = tabs.up('grid');
            tabs.items.items.forEach(tab => {
                tab.setConfig({compactMode: true});
                tab.setConfig({closable: false});
            });
        }
    }
});