Ext.define('jskit.view.main.menu.MainMenu', {
    extend: 'Ext.list.Tree',
    xtype: 'mainmenu',
    listeners: {
        itemclick: 'onNavigationItemClick'
    },
    
    expanderFirst: false,
    
    expanderOnly: true,
    
    store: {
        type: 'tree',
        root: {
            expanded: true,
            data: jskit.MenuDataCtrl.dataRoot()
        },
        associatedEntity: null,
        asynchronousLoad: false,
        autoDestroy: undefined,
        autoLoad: undefined,
        defaultRootProperty: 'data',
        autoSort: null,
        autoSync: false,
        batchUpdateMode: 'operation',
        clearOnLoad: true,
        clearOnPageLoad: true,
        storeId: 'OtellOModules'
        
    },
    
    width: jskit.Globals.EXPAND_MENU
    
});