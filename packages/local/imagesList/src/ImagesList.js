Ext.define('jskit.view.main.ImagesList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.imagesList',
    controller: 'imageslist',
    padding: 10,
    scrollable: true,
    
    items: [
        {
            xtype: 'imagesgrid'
        }
    
    ],
    ref: 'images/',
    noSaveCancel: true,
    edits: jskit.Edits.DD_Field()
});