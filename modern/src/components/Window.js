Ext.define('jskit.view.component.Window', {
    extend: 'Ext.window.Window',
    require: ['Ext.form.FormPanel'],
    autoShow: true,
    draggable: true,
    closable: true,
    maximizable: true,
    modal: false,
    viewModel: 'main',
    tools: [
        {
            type: 'restore',
            hidden: true,
            handler: 'onExpand'
        },
        {
            type: 'help'
        },
        {
            type: 'minimize',
            handler: 'onMinimize'
        }
        // {
        //     type: 'maximize',
        //     handler: 'onMaximize'
        // }
    ],
    controller: 'main',
    keyMap: {
        'Ctrl+ENTER': 'onSave',
        ESC: 'onCancel'
    }
});