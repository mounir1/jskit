Ext.define('jskit.Organizer.AlbumTree', {
    extend: 'jskit.view.component.MyTree',
    alias: 'widget.albumtree',
    
    title: 'My Albums',
    animate: true,
    rootVisible: false,
    
    viewConfig: {
        plugins: {
            treeviewdragdrop: {
                ddGroup: 'organizerDD',
                displayField: 'title'
            }
        }
    },
    
    displayField: 'title',
    
    initComponent: function(){
        this.count = 1;
        
        this.tbar = [
            {
                text: 'New Album',
                iconCls: 'album-btn',
                scope: this,
                handler: this.addAlbum
            }
        ];
        
        this.store = Ext.create('Ext.data.TreeStore', {
            fields: ['title'],
            
            root: {
                title: 'Root',
                allowDrop: false,
                expanded: true,
                children: [
                    {
                        title: 'Album 1',
                        iconCls: 'album-btn',
                        children: []
                    }
                ]
            },
            listeners: {
            
            }
        });
        
        this.callParent();
    },
    
    /**
     * Adds a new album node to the root
     */
    addAlbum: function(){
        var root = this.store.getRoot();
        
        this.count++;
        
        root.appendChild({
            title: 'Album ' + this.count,
            iconCls: 'album-btn',
            children: []
        });
    }
});
