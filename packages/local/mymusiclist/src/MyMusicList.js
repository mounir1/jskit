Ext.define('jskit.view.main.MyMusicList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.mymusicList',
    padding: 10,
    ref: 'music/',
    controller: 'mymusiclist',
    items: [
        {
            xtype: 'mymusicgrid'
        }
        
        // {
        //     xtype: 'mypanel',
        //     html: '<div class="player">\n' +
        //         '    <div class="details">\n' +
        //         '      <div class="now-playing">PLAYING x OF y</div>\n' +
        //         '      <div class="track-art"></div>\n' +
        //         '      <div class="track-name">Track Name</div>\n' +
        //         '      <div class="track-artist">Track Artist</div>\n' +
        //         '    </div>' +
        //         '    <div class="buttons">\n' +
        //         '      <div class="prev-track" onclick="prevTrack()"><i class="fa fa-step-backward fa-2x"></i></div>\n' +
        //         '      <div class="playpause-track" onclick="playpauseTrack()"><i class="fa fa-play-circle fa-5x"></i></div>\n' +
        //         '      <div class="next-track" onclick="nextTrack()"><i class="fa fa-step-forward fa-2x"></i></div>\n' +
        //         '    </div>\n' +
        //         '    <div class="slider_container">\n' +
        //         '      <div class="current-time">00:00</div>\n' +
        //         '      <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">\n' +
        //         '      <div class="total-duration">00:00</div>\n' +
        //         '    </div>\n' +
        //         '    <div class="slider_container">\n' +
        //         '      <i class="fa fa-volume-down"></i>\n' +
        //         '      <input type="range" min="1" max="100" value="55" class="volume_slider" onchange="setVolume()">\n' +
        //         '      <i class="fa fa-volume-up"></i>\n' +
        //         '    </div>'
        //
        // },
        // {
        //     xtype: 'buttongroup',
        //     columns: 3,
        //     items: [
        //         {
        //             text: '',
        //             cls: 'prev-track',
        //             iconCls: 'step-backward fa-2x',
        //             handler: 'prevTrack'
        //         },
        //         {
        //             text: '',
        //             cls: 'playpause-track',
        //             handler: 'playpauseTrack',
        //             iconCls: 'play-circle fa-5x'
        //         }
        //     ]
        // }
    ],
    edits:jskit.Edits.music_edits(),
    // '    <div class="buttons">\n' +
    // '      <div class="prev-track" onclick="prevTrack()"><i class="fa fa-step-backward fa-2x"></i></div>\n' +
    // '      <div class="playpause-track" onclick="playpauseTrack()"><i class="fa fa-play-circle fa-5x"></i></div>\n' +
    // '      <div class="next-track" onclick="nextTrack()"><i class="fa fa-step-forward fa-2x"></i></div>\n' +
    // '    </div>\n' +
    // '    <div class="slider_container">\n' +
    // '      <div class="current-time">00:00</div>\n' +
    // '      <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">\n' +
    // '      <div class="total-duration">00:00</div>\n' +
    // '    </div>\n' +
    // '    <div class="slider_container">\n' +
    // '      <i class="fa fa-volume-down"></i>\n' +
    // '      <input type="range" min="1" max="100" value="99" class="volume_slider" onchange="setVolume()">\n' +
    // '      <i class="fa fa-volume-up"></i>\n' +
    // '    </div>'
    // },
    listeners: {
        afterrender: 'initAudioEl'
    }
});

// Object.keys(ss)
//       .forEach(key => {
//           var title = ss[key].fileRef.replace('.', '')
//                              .replace(/[0-9]/g, '')
//                              .replace('mp', '')
//                              .trim();
//           title = title.substring(0, 1)
//                        .toUpperCase() + title.substring(1);
//           ss[key].title = title;
//       });