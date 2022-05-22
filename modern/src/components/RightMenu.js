Ext.define('jskit.view.component.RightMenu', {
    extend: 'Ext.list.Tree',
    xtype: 'app-tree',
    ui: 'nav',
    store: {
        root: {
            expanded: true,
            children: [
                {
                    text: 'Movies',
                    leaf: false,
                    iconCls: 'x-fa fa-film',
                    children: [
                        {
                            text: 'Movies List',
                            leaf: true,
                            iconCls: 'x-fa fa-film'
                        }, {
                            text: 'My Fave Movies',
                            leaf: true,
                            iconCls: 'x-fa fa-star'
                        }
                    ]
                }
            ]
        }
    },
    rootVisible: false,
    listeners: {
        itemclick: 'menuItemClick'
    },
    expanderFirst: false,
    expanderOnly: false
});