Ext.define('jskit.view.component.MyDataWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.mydata',
    
    width: 700,
    viewModel: 'main',
    controller: 'listvc',
    layout: 'fit',
    minHeight: 300,

    
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
                xtype: 'rating',
                tooltipText: 'Add Rating ',
                bind: '{record.rating}'
            },
            {
                xtype: 'tbfill'
            },
            {
                text: 'Save',
                handler: 'onSave'
            },
            {
                text: 'Cancel',
                handler: 'onCancel'
            },
           
        ]);
        me.callParent(arguments);
    },
    listeners: {
        beforerender: function(wind){
            let vm = wind.getViewModel();
            vm.set('translations', vm.getParent()
                                     .get('translations'));
        }
    }
});