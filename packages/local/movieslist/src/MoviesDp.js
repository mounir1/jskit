Ext.define('jskit.view.Movies.MoviesDp', {
    extend: 'jskit.view.component.MyPanel',
    alias: 'widget.moviesdp',
    height: 400,
    resizable: true,
    frame: true,
    layout: 'hbox',
    initComponent: function(){
        let me = this,
            grid = me.up(),
            data = grid.selection.data,
            description = data.description_full,
            image = data.large_cover_image,
            date = data.date_uploaded,
            torrent1 = data.torrents[0],
            torrent2 = data.torrents[1],
            width = grid.getWidth();
        
        me.items = [
            {
                xtype: 'mypanel',
                frame: true,
                height: 400,
                layout: 'hbox',
                defaults: {margin: 10},
                maxWidth: 700,
                flex: 1,
                items: [
                    {
                        xtype: 'mypanel',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'textarea',
                                labelAlign: 'top',
                                readOnly: true,
                                scrollable: true,
                                fieldLabel: '<b class="animated fadeInDown" > Summary :</b>',
                                width: 400,
                                height: 320,
                                value: description
                            },
                            {
                                xtype: 'mypanel',
                                html: '<b> Publish date : ' + date + ' </b>'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        items: []
                    }
                ]
            },
            
            {
                xtype: 'mypanel',
                items: {
                    xtype: 'image',
                    width: 400,
                    height: 400,
                    src: image
                }
            }
        ];
        
        let actions = me.items[0].items[1].items;
        if (torrent1 && torrent1.size){
            actions.push(
                {
                    xtype: 'fieldset',
                    hidden: Ext.isEmpty(torrent1),
                    disabled: !torrent1,
                    items: [
                        {
                            xtype: 'component',
                            html: '<b class="animated fadeInDown"> Size :' + torrent1.size + '</b>' + '<b> Seeds :' + torrent1.seeds + ' </b><b> Peers :' + torrent1.peers + '</b>'
                        },
                        {
                            xtype: 'button',
                            text: torrent1.quality,
                            iconCls: 'x-fas fa-magnet'
                        }
                    ]
                });
        }
        
        if (torrent2 && torrent2.size){
            actions.push(
                {
                    xtype: 'fieldset',
                    hidden: Ext.isEmpty(torrent2),
                    disabled: !torrent2,
                    items: [
                        {
                            xtype: 'component',
                            html: '<b> Size :' + torrent2.size + '</b>' + '<b> Seeds :' + torrent2.seeds + ' </b><b> Peers :' + torrent2.peers + '</b>'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-magnet',
                            text: torrent2.quality
                        }
                    ]
                });
        }
        
        actions.push(
            {
                xtype: 'button',
                iconCls: 'x-fa fa-play',
                text: 'PLAY',
                handler:function(){
                    jskit.Globals.createMediaPlayer({type:'video'});
                }
            }
        );
        me.callParent(arguments);
    }
    
});