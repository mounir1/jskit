Ext.define('jskit.Organizer.OrgPanelList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.organizerList',
    controller: 'organizerlist',
    height: window.innerHeight - 120,
    ref: 'images/',
    requires: [
        'jskit.model.Image',
        'jskit.Organizer.ImageView',
        'jskit.Organizer.AlbumTree'
    ],
    
    layout: 'border',
    
    initComponent: function(){
        this.items = [
            {
                xtype: 'albumtree',
                region: 'west',
                padding: 5,
                width: 260
            },
            {
                xtype: 'panel',
                title: 'My Images',
                tools: [
                    {
                        type: 'refresh',
                        handler: 'onRefresh'
                    }
                ],
                layout: 'fit',
                region: 'center',
                padding: '5 5 5 0',
                items: {
                    xtype: 'imageview',
                    /*  (add a '/' at the front of this line to turn this on)
                     listeners: {
                     containermouseout: function (view, e) {
                     Ext.log('ct', e.type);
                     },
                     containermouseover: function (view, e) {
                     Ext.log('ct', e.type);
                     },
                     itemmouseleave: function (view, record, item, index, e) {
                     Ext.log('item', e.type, ' id=', record.id);
                     },
                     itemmouseenter: function (view, record, item, index, e) {
                     Ext.log('item', e.type, ' id=', record.id);
                     }
                     },/* */
                    trackOver: true
                }
            }
        ];
        
        this.callParent(arguments);
    }
});
