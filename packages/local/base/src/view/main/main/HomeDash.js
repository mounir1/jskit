Ext.define('jskit.view.main.HomeDashList', {
    extend: 'jskit.view.component.MyPanel',
    xtype: 'homedash',
    closable: false,
    iconCls: 'fa fa-home fa-lg tabIcon',
    title: 'home',
    layout: 'responsivecolumn',
    requires: ['jskit.view.component.SteackyNote'],

    cls: 'dashboard',
    tbar: [

        {
            xtype: 'button',
            ui: 'default',
            iconCls: 'x-fa fa-sync',
            handler: function(btn){
                let me = this,
                    dash = me.up('homedash'),
                    notes = dash.down('stickynotes'),
                    remoteStore = notes.getStore();
                remoteStore.load();
            }
        },
    
        {
            xtype: 'button',
            ui: 'default',
            iconCls: 'x-fa fa-plus-square',
            handler: function(btn){
                let me = this,
                    dash = me.up('homedash'),
                    notes = dash.down('stickynotes');
                jskit.Globals.createJsKitDataForm({
                    itemId: 'DashNote',
                    remoteStore: notes.getStore(),
                    edits: jskit.Edits.NoteEdits(),
                    title: 'Add New Note',
                    viewList: {ref: 'myNotes'}
                });
    
            }
        },
        {
            xtype: 'component',
            html: '<a class="btn" href=\'https://ko-fi.com/W7W4DE7Y\' style="float: right" target=\'_blank\'><img height=\'36\' style=\'border:0px;height:36px;\' src=\'https://az743702.vo.msecnd.net/cdn/kofi4.png?v=0\' border=\'0\' alt=\'Buy Me a Coffee at ko-fi.com\'></a>'
        },
    ],
    items: [
        {
            xtype: 'stickynotes'
        },
        {
            xtype: 'button',
            text: 'Btn',
            floating: true,
            style: 'position: absolute; bottom: 10px; right: 10px;'
        },
        {
            xtype: 'panel',
            height: 300,
            itemId: 'WeatherWidget',
            width: 200,
            listeners: {
                boxready: function(panel){
                    // q=${inputVal}
                    if (Ext.JsKitData.location && Ext.JsKitData.location.lat){
                        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + Ext.JsKitData.location.lat + '&lon=' + Ext.JsKitData.location.lng + '&appid=4d8fb5b93d4af21d66a2948710284366&units=metric';
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                const {main, name, sys, weather} = data;
                                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;
                                console.log(data);
                            
                                const markup = `
                            <h2 class="city-name" data-name="${name},${sys.country}">
                              <span>${name}</span>
                              <sup>${sys.country}</sup>
                            </h2>
                            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                            <figure>
                              <img class="city-icon" src="${icon}" alt="${
                                    weather[0]['description']
                                    }">
                              <figcaption>${weather[0]['description']}</figcaption>
                            </figure>
                          `;
                                panel.setHtml(markup);
                            })
                            .catch(() => {
                                console.log('no data');
                            });
                    }
                }
            }
        }
    ]

    // items: [
    //     {
    //         xtype: 'mypanel',
    //         cls: 'admin-widget shadow',
    //         layout: 'responsivecolumn',
    //         items: [
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 200,
    //                 height: 150,
    //                 alt: 'aws-image',
    //                 src: 'resources/img/aws.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 200,
    //                 height: 150,
    //                 alt: 'azure-image',
    //                 src: 'resources/img/azure.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 250,
    //                 height: 150,
    //                 alt: 'gcp-image',
    //                 src: 'resources/img/gcp.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 150,
    //                 height: 150,
    //                 alt: 'docean-image',
    //                 src: 'resources/img/docean.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 200,
    //                 height: 150,
    //                 alt: 'fb-image',
    //                 src: 'resources/img/fb.png'
    //             }
    //
    //         ]
    //     },
    //     {
    //         xtype: 'mypanel',
    //         cls: 'admin-widget shadow',
    //         layout: 'responsivecolumn',
    //         items: [
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 200,
    //                 height: 250,
    //                 alt: 'extjs-image',
    //                 src: 'resources/img/extjs.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'animate blink',
    //                 width: 200,
    //                 height: 200,
    //                 alt: 'angular-image',
    //                 src: 'resources/img/angular.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 300,
    //                 height: 150,
    //                 alt: 'ionic-image',
    //                 src: 'resources/img/ionic.png'
    //             }
    //         ]
    //     },
    //     {
    //         xtype: 'mypanel',
    //         cls: 'admin-widget shadow',
    //         layout: 'responsivecolumn',
    //         items: [
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 200,
    //                 height: 200,
    //                 alt: 'moodle-image',
    //                 src: 'resources/img/moodle.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 150,
    //                 height: 150,
    //                 alt: 'wordpress-image',
    //                 src: 'resources/img/wordpress.png'
    //             },
    //             {
    //                 xtype: 'image',
    //                 cls: 'widget-top-container-first-img',
    //                 width: 150,
    //                 height: 150,
    //                 alt: 'drupal-image',
    //                 src: 'resources/img/drupal.png'
    //             }
    //         ]
    //     }
    // ]
    
});
