Ext.define('jskit.view.component.ImagePreviewWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.imagepreview',
    title: 'Image Preview',
    draggable: true,
    width: 600,
    height: 400,
    layout: {
        type: 'fit',
        align: 'center'
    },
    items: {
        xtype: 'image',
        src: 'https://www.arvixe.com/images/landing_pages/sencha_hosting.png',
        draggable: true,
        bodyPadding: 5,
        listeners: {
            afterrender: function(image){
                var imageEl = image.getEl(),
                    zoomOffset = 30,
                    imageBox;
                imageEl.on('mousewheel', function(ev){
                    var delta = ev.getWheelDelta();
                    imageBox = image.getBox();
                    
                    imageEl.setBox({
                        width: imageBox.width + delta * zoomOffset,
                        height: imageBox.height + delta * zoomOffset
                    });
                });
            }
        }
    }
});