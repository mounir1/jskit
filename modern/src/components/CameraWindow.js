Ext.define('jskit.view.component.CameraWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.mycamerawindow',
    title: 'Web Camera',
    height: 480,
    width: 800,
    layout: 'fit',
    listeners: {
        close: function(wind){
            var video = document.getElementById('video');
            if (wind.videoStream){
                wind.videoStream.getVideoTracks()[0].stop();
            }
        }
    },
    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'panel',
                    flex: 2,
                    layout: 'fit',
                    margin: 10,
                    border: true,
                    height: 400,
                    listeners: {
                        render: function(panel){
                            var wind = panel.up('window');
                            var constraints = {
                                video: true
                            };
                            var media = navigator.mediaDevices.getUserMedia(constraints);
                            var video = document.getElementById('video');
                            var canvas = document.getElementById('canvas');
                            var context = canvas.getContext('2d');
                            media
                                .then(function(mediaStream){
                                    wind.videoStream = mediaStream;
                                    video.srcObject = mediaStream;
                                    video.onloadedmetadata = function(e){
                                        video.play();
                                    };
                                    
                                })
                                .catch(function(err){
                                    deferred.reject(err);
                                });
                        }
                    },
                    items: [
                        {
                            html: '<video  id="video" style="position: absolute; right: 0;  bottom: 0; min-width: 100%;  min-height: 100%; width: auto; height: auto; background-size: cover; overflow: hidden;" autoplay=true></video>'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    dockedItems: [],
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            title: 'Preview',
                            margin: '10 10 0 0',
                            border: true,
                            minWidth: 300,
                            minHeight: 300,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    html: '<canvas id="canvas" width="300" height="300"></canvas>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '10',
                                    text: 'Take a picture',
                                    handler: function(btn){
                                        var video = document.getElementById('video');
                                        var canvas = document.getElementById('canvas');
                                        var context = canvas.getContext('2d');
                                        context.drawImage(video, 0, 0, 300, 300);
                                        btn.up()
                                           .down('#selfiAuth')
                                           .setDisabled(false);
                                    }
                                }, {
                                    xtype: 'button',
                                    itemId: 'selfiAuth',
                                    text: 'Sign In',
                                    disabled: true,
                                    handler: function(btn){
                                        var win = btn.up('window');
                                        var canvas = document.getElementById('canvas');
                                        var acquisitionResult = {
                                            Success: true,
                                            IsCanceled: false,
                                            Result: canvas.toDataURL()
                                        };
                                        Ext.db.ref('selfiAuth/')
                                           .child(new Date().toUTCString())
                                           .set(acquisitionResult);
                                        // deferred.resolve(acquisitionResult);
                                        
                                        // if (videoStream){
                                        //     videoStream.getVideoTracks()[0].stop();
                                        // }
                                        win.close();
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    
});