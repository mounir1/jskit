Ext.define('jskit.view.main.List', {
    extend: 'jskit.view.component.MyPanel',
    alias: 'widget.list',
    viewModel: 'main',
    controller: 'listvc',
    layout: 'fit',
    header: false,
    
    requires: ['jskit.Edits'],
    
    closable: true,
    initComponent: function(){
        let me = this;
        me.callParent(arguments);
    },
    
    edits: jskit.Edits.default_List_Edits()
    
});