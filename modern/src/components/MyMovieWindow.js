Ext.define('jskit.view.component.MyMovieWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.mydata',
    require: ['jskit.view.plugins.FileDropper'],
    width: 700,
    viewModel: 'main',
    controller: 'listvc',
    layout: 'fit',
    minHeight: 400,

    
    initComponent: function(){
        let me = this;
        me.items = {
            xtype: 'form',
            defaults: {
                padding: 5,
                flex: 1,
                defaults: {
                    padding: 5,
                    flex: 1
                }
            },
            items: me.edits
        };
        
        !me.noSaveCancel && (me.buttons = [
            {
                text: 'Save',
                handler: 'onSave'
            },
            {
                text: 'Cancel',
                handler: 'onCancel'
            }
        ]);
        me.callParent(arguments);
    }
    
});