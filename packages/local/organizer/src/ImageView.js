Ext.define('jskit.Organizer.ImageView', {
    extend: 'jskit.view.component.MyView',
    alias: 'widget.imageview',
    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable: 'Ext.ux.DataView.Draggable'
    },
    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<div class="thumb">',
        '<img width="340px" height= "250px" src="{imageUrl}" />',
        '</div>',
        '<span>{title}</span>',
        '</div>',
        '</tpl>'
    ],
    
    itemSelector: 'div.thumb-wrap',
    multiSelect: true,
    singleSelect: false,
    cls: 'x-image-view',
    scrollable: true,
    initComponent: function(){
        
        this.store = new Ext.data.Store({});
        
        this.mixins.dragSelector.init(this);
        this.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'organizerDD'
            }
        });
        
        this.callParent(arguments);
    }
});