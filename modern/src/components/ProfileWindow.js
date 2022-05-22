Ext.define('jskit.view.component.ProfileWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.profilewindow',
    require: ['jskit.view.plugins.FileDropper'],
    width: 700,
    viewModel: 'main',
    
    title: 'Profile Setting',
    controller: 'main',
    autoShow: true,
    modal: true,
    
    height: 350,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            defaults: {
                padding: 5
            },
            items: [
                {
                    xtype: 'textarea',
                    fieldLabel: 'Config ',
                    emptyText: 'Config',
                    value: JSON.stringify(config, null, 4) || {},
                    width: 600,
                    bind: '{config}'
                }
            
            ],
            buttons: [
                {
                    xtype: 'button',
                    formBind: true,
                    text: 'initialize App ',
                    handler: 'initializeApp'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'onCancel'
                }
            ]
        }
    ]
});