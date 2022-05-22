Ext.define('jskit.view.main.MainTabs', {
    extend: 'jskit.view.component.MainTabs',
    alias: 'widget.app-maintabs',
    
    controller: 'main',
    requires: [
        'Ext.ux.TabCloseMenu',
        'Ext.ux.TabReorderer'
    ],
    
    plugins: [
        'tabreorderer',
        'tabclosemenu'
    ],
    
    layout: {
        type: 'card',
        anchor: '100%'
    },
    activeTab: 0,
    
    items: [
        {xtype: 'homedash'}
    ],
    
    listeners: {
        tabchange: function(){
            let me = this,
                activeTab = me.activeTab,
                mainmenu = Ext.ComponentQuery.query('mainmenu')[0];
            document.title = (document.title.indexOf('|') > 0) ? (activeTab.title.toUpperCase() + document.title.substring(document.title.indexOf(' | '))) : activeTab.title.toUpperCase() + ' | ' + document.title;
            
            // activeTab.config.isFave && (document.title = '★' + document.title);
            // activeTab.config.deepLink && (document.title = '*' + document.title);
            mainmenu && activeTab.title !== 'home' && mainmenu.setSelection(activeTab.items.items[0]);
            //
            // location.hash = activeTab.routeId;
            // return false;
        }
    }
    
});