Ext.define('jskit.view.component.FroalaEditorWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.froalaeditorwindow',
    // header: false,
    // draggable: true,
    maxWidth: window.innerWidth - 200,
    maxHeight: window.innerHeight - 200,
    minWidth: 850,
    minHeight: 620,
    layout: 'fit',
    title: 'Froala Editor ',
    autoShow: true,
    resizable: true,
    scrollable: true,
    items: {
        xtype: 'form',
        items: {
            valueEl: '<b>Froala Editor </b>',
            xtype: 'myfroalaeditor'
        },
        buttons:[
            {
                text: 'SAVE'
            },
            {
                text:'CANCEL'
            }
        ]
    }
});

