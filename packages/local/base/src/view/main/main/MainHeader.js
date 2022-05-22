Ext.define('jskit.view.main.MainHeader', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'mainheader',
    
    ui: 'footer',
    itemId: 'mainHeader',
    items: [
        {
            style: {
                backgroundColor: 'transparent'
            },
            width: jskit.Globals.EXPAND_MENU,
            bind: {html: '<div class="animated infinite pulse">{appName}</div>'},
            handler: 'toggleMenu'
        },
        {
            xtype: 'button',
            itemId: 'install-button',
            text: 'Install',
            handler: 'install'
        },
        {
            xtype: 'mycombofield',
            bind: {
                // fieldLabel: '{translations.language}',
                emptyText:'{translations.language}'
            },
            labelAlign: 'left',
            displayField: 'text',
            value: offlineSettings.lang,
            valueField: 'value',
            store: {},
            listeners: {
                afterrender: 'translaionComboAfterRender',
                change: 'onLanguageChange'
            }
        },
    
        // {
        //     xtype: 'button',
        //     iconCls: 'fa fa-bars',
        //     handler: 'toggleMenu'
        // },
        // {
        //     xtype: 'button',
        //     text: 'Froala Editor',
        //     handler: function(){
        //         Ext.widget('froalaeditorwindow');
        //     }
        // },
        // {
        //     xtype: 'button',
        //     text: 'Image Preview',
        //     handler: function(){
        //         Ext.widget('imagepreview');
        //     }
        // },
        // {
        //     xtype: 'button',
        //     text: 'Video Player',
        //     handler: function(){
        //         jskit.Globals.createMediaPlayer();
        //     }
        // },
        // {
        //     xtype: 'combo',
        //     hidden: true,
        //     fieldLabel: 'Theme',
        //     displayField: 'name',
        //     valueField: 'value',
        //     queryMode: 'local',
        //     store: Ext.create('Ext.data.Store', {
        //         fields: ['value', 'name'],
        //         data: [
        //             {
        //                 value: 'classic',
        //                 name: 'Classic triton'
        //             },
        //             {
        //                 value: 'classic-triton',
        //                 name: 'Classic Triton'
        //             },
        //             {
        //                 value: 'classic-material',
        //                 name: 'Classic Material'
        //             },
        //             {
        //                 value: 'classic-crisp',
        //                 name: 'Classic Crisp'
        //             },
        //             {
        //                 value: 'classic-gray',
        //                 name: 'Classic Gray'
        //             },
        //             {
        //                 value: 'classic-neptune-touch',
        //                 name: 'Classic Neptune Touch'
        //             },
        //             {
        //                 value: 'classic-neptune',
        //                 name: 'Classic Neptune '
        //             }
        //         ]
        //     }),
        //
        //     listeners: {
        //         change: function(combo, value){
        //             localStorage.setItem('appTheme', value);
        //         }
        //         // select: function(combo){
        //         //     var s = window.location.search;
        //         //     var h = window.location.hash;
        //         //     s = s.replace(s, '')
        //         //          .replace(/^\?/, '');
        //         //
        //         //     window.location.search = ('?' + combo.value + '&' + s).replace(/&$/, '');
        //         // }
        //     }
        // },
        '->',
       
        {
            bind: {
                text: '{translations.login}'
            },
            itemId: 'loginBtn',
            handler: 'renderLoginWindow'
        },
        {
            bind: {
                text: '{translations.logout}'
            },
            itemId: 'logOutBtn',
            handler: 'doLogout'
        },
        
        {
            xtype: 'image',
            cls: 'circular small-image',
            width: 32,
            height: 32,
            margin: '0 10 0 30',
            alt: 'profile-picture',
            listeners: {
                el: {
                    click: 'onProfileClick'
                }
            }
        }
    ],
    
    listeners: {
        beforerender: 'onBeforeHeaderRender',
        afterrender: 'onAfterHeaderRender'
    }
});