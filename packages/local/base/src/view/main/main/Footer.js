Ext.define('jskit.view.main.MainFooter', {
    extend: 'Ext.ux.StatusBar',
    xtype: 'mainfooter',
    controller: 'listvc',
    viewModel: 'main',
    ui: 'footer',
    
    height: 30,
    defaults: {
        cls: 'animated bounce',
        xtype: 'component'
    },
    listeners: {
        boxready: 'onAddFooterItems'
    }
});