Ext.define('jskit.view.main.MyMusicListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.mymusiclist',
    
    listen: {
        controller: {
            mymusiclist: {
                doPlayMusic: 'doPlayMusic'
            }
        }
    },
    
    doPlayMusic: function(view, record, i){
        let me = this,
            music = record.data,
            parentList = view.up('list'),
            playBtn = parentList.down('#playSong'),
            curr_track = parentList.audioEl;
        parentList.songSrc = music.fileUrl;
        
        function playMusic(){
            loadItems();
            parentList.isPlaying = true;
            if (record.fileData){
                if (record.playing){
                    Ext.Msg.alert('ALERT', ' PLAYING ....');
                }
                else{
                    initSound(record.fileData);
                }
            }
            else{
                getMusicFile(parentList.songSrc);
            }
        }
        
        function getMusicFile(url){
            fetch(url)
                .then(CheckError)
                .then((res) => {
                    res.blob()
                       .then((blob) => {
                           switch (blob.type){
                               case  'application/json':
                                   console.log(' eee');
                                   break;
                               default:
                                   var reader = new FileReader();
                                   reader.addEventListener('loadend', function(){
                                       record.set('loaded', true);
                                       initSound(record.fileData = reader.result);
                                   });
                                   reader.readAsDataURL(blob);
                                   break;
                           }
                       });
                })
                .catch((error) => {
                    record.set('loaded', false);
                    Ext.Msg.alert('ALERT', error);
                });
        }
        
        function CheckError(response){
            if (response.status >= 200 && response.status <= 299){
                return response;
            }
            else{
                throw Error(response.statusText);
            }
        }
        
        function initSound(src){
            curr_track.src = src;
            curr_track.controls = true;
            curr_track.load();
            curr_track.addEventListener('canplaythrough', soundLoaded, false);
        }
        
        function soundLoaded(){
            curr_track.play();
            record.playing = true;
            
            parentList.audioContext.resume();
            curr_track.addEventListener('ended', nextTrack);
        }
        
        function loadItems(){
            let seek_slider = document.querySelector('.seek_slider');
            let volume_slider = document.querySelector('.volume_slider');
            let curr_time = document.querySelector('.current-time');
            let total_duration = document.querySelector('.total-duration');
            let colorSelect = document.getElementById('colorSelect');
            
            if (record.playing === undefined){
                resetValues();
                setInterval(seekUpdate, 1000);
            }
            colorSelect.onchange = function(){
                if (colorSelect.selectedIndex === 0){
                    parentList.colorStyle = 0;
                }
                else if (colorSelect.selectedIndex === 1){
                    parentList.colorStyle = 1;
                }
                else if (colorSelect.selectedIndex === 2){
                    parentList.colorStyle = 2;
                }
                else if (colorSelect.selectedIndex === 3){
                    parentList.colorStyle = 3;
                }
                else if (colorSelect.selectedIndex === 4){
                    parentList.colorStyle = 4;
                }
                else if (colorSelect.selectedIndex === 5){
                    parentList.colorStyle = 5;
                }
                else{
                    parentList.colorStyle = 6;
                }
            };
            seek_slider.onchange = function(){
                curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
            };
            volume_slider.onchange = function(){
                curr_track.volume = volume_slider.value / 100;
            };
            
            window.requestAnimationFrame(draw);
            
            function resetValues(){
                curr_time.textContent = '00:00';
                total_duration.textContent = '00:00';
                seek_slider.value = 0;
            }
            
            function seekUpdate(){
                let seekPosition = 0;
                
                // Check if the current track duration is a legible number
                if (!isNaN(curr_track.duration)){
                    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                    seek_slider.value = seekPosition;
                    
                    // Calculate the time left and the total duration
                    let currentMinutes = Math.floor(curr_track.currentTime / 60);
                    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                    let durationMinutes = Math.floor(curr_track.duration / 60);
                    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
                    
                    // Adding a zero to the single digit time values
                    if (currentSeconds < 10){
                        currentSeconds = '0' + currentSeconds;
                    }
                    if (durationSeconds < 10){
                        durationSeconds = '0' + durationSeconds;
                    }
                    if (currentMinutes < 10){
                        currentMinutes = '0' + currentMinutes;
                    }
                    if (durationMinutes < 10){
                        durationMinutes = '0' + durationMinutes;
                    }
                    
                    curr_time.textContent = currentMinutes + ':' + currentSeconds;
                    total_duration.textContent = durationMinutes + ':' + durationSeconds;
                }
                
            }
            
            parentList.audioContext.resume();
            
            function drawSides(){
                //this is for the circular colors that come in from the sides of the screen
                parentList.grd1 = parentList.contextC.createRadialGradient(window.innerWidth / 2, window.innerHeight / 2, 800 - (parentList.bigBars * 40), window.innerWidth / 2, window.innerHeight / 2, 2400);
                if (parentList.colorStyle === 0){
                    parentList.grd1.addColorStop(1, 'fuchsia');
                    parentList.grd1.addColorStop(0, 'black'); //ORIGINAL rgb color cycle
                }
                else if (parentList.colorStyle === 1){
                    parentList.grd1.addColorStop(1, 'red');
                    parentList.grd1.addColorStop(0, 'black'); //red color gradient depending on height of bar
                }
                else if (parentList.colorStyle === 2){
                    parentList.grd1.addColorStop(1, 'orange');
                    parentList.grd1.addColorStop(0, 'black'); //orange color gradient depending on height of bar
                }
                else if (parentList.colorStyle === 3){
                    parentList.grd1.addColorStop(1, 'yellow');
                    parentList.grd1.addColorStop(0, 'black'); //yellow color gradient depending on height of bar
                }
                else if (parentList.colorStyle === 4){
                    parentList.grd1.addColorStop(1, 'LightGreen');
                    parentList.grd1.addColorStop(0, 'black'); //green color gradient depending on height of bar
                }
                else if (parentList.colorStyle === 5){
                    parentList.grd1.addColorStop(1, 'DodgerBlue');
                    parentList.grd1.addColorStop(0, 'black'); //blue color gradient depending on height of bar
                }
                else{
                    parentList.grd1.addColorStop(1, 'fuchsia');
                    parentList.grd1.addColorStop(0, 'black'); //purple color gradient depending on height of bar
                }
                
                parentList.contextC.fillStyle = parentList.grd1;
                parentList.contextC.fillRect(0, 0, window.innerWidth, window.innerHeight);
            }
            
            function draw(){
                if (!curr_track.paused){
                    parentList.bigBars = 0;
                    r = 0;
                    g = 0;
                    b = 255;
                    x = 0;
                    parentList.ctx.clearRect(0, 0, parentList.WIDTH, parentList.HEIGHT);
                    parentList.analyser.getByteFrequencyData(parentList.freqArr);
                    for (var i = 0; i < parentList.INTERVAL; i++){
                        if (/*i <= 50 &&*/ parentList.barHeight >= (240 /* currVol*/)){
                            parentList.bigBars++;
                        }
                        //max = 900; //default placeholder
                        var num = i;
                        parentList.barHeight = ((parentList.freqArr [num] - 128) * 2) + 2;
                        if (parentList.barHeight <= 1){
                            parentList.barHeight = 2;
                        }
                        
                        r = r + 10; //this is for the color spectrum
                        if (r > 255){
                            r = 255;
                        }
                        g = g + 1;
                        if (g > 255){
                            g = 255;
                        }
                        b = b - 2;
                        if (b < 0){
                            b = 0;
                        }
                        
                        if (parentList.colorStyle === 0){
                            parentList.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; //rgb color cycle
                        }
                        else if (parentList.colorStyle === 1){
                            parentList.ctx.fillStyle = 'rgb(' + ((2 / 3) * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ')'; //red color
                                                                                                                                                                                    // gradient
                                                                                                                                                                                    // depending on
                                                                                                                                                                                    // height of
                                                                                                                                                                                    // bar
                        }
                        else if (parentList.colorStyle === 2){
                            parentList.ctx.fillStyle = 'rgb(' + (1 * (parentList.barHeight)) + ',' + (.6 * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ')'; //orange color
                                                                                                                                                                               // gradient
                                                                                                                                                                               // depending on
                                                                                                                                                                               // height of bar
                        }
                        else if (parentList.colorStyle === 3){
                            parentList.ctx.fillStyle = 'rgb(' + (.95 * (parentList.barHeight)) + ',' + (.85 * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ')'; //yellow color
                                                                                                                                                                                  // gradient
                                                                                                                                                                                  // depending on
                                                                                                                                                                                  // height of bar
                        }
                        else if (parentList.colorStyle === 4){
                            parentList.ctx.fillStyle = 'rgb(' + (0 * (parentList.barHeight)) + ',' + ((2 / 3) * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ')'; //green color
                                                                                                                                                                                    // gradient
                                                                                                                                                                                    // depending on
                                                                                                                                                                                    // height of
                                                                                                                                                                                    // bar
                        }
                        else if (parentList.colorStyle === 5){
                            parentList.ctx.fillStyle = 'rgb(' + (.58 * (parentList.barHeight / 10)) + ',' + (0 * (parentList.barHeight)) + ',' + (1 * (parentList.barHeight)) + ')'; //blue color
                                                                                                                                                                                     // gradient
                                                                                                                                                                                     // depending
                                                                                                                                                                                     // on height
                                                                                                                                                                                     // of bar
                        }
                        else{
                            parentList.ctx.fillStyle = 'rgb(' + (1 * (parentList.barHeight)) + ',' + (0 * (parentList.barHeight)) + ',' + (1 * (parentList.barHeight)) + ')'; //purple color
                                                                                                                                                                              // gradient depending
                                                                                                                                                                              // on height of bar
                        }
                        
                        parentList.ctx.fillRect(x, parentList.HEIGHT - parentList.barHeight, (parentList.WIDTH / parentList.INTERVAL) - 1, parentList.barHeight);
                        x = x + (parentList.WIDTH / parentList.INTERVAL);
                    }
                }
                
                if (parentList.bigBars >= 1){
                    drawSides();
                }
                else{
                    parentList.contextC.clearRect(0, 0, window.innerWidth, window.innerHeight);
                }
                window.requestAnimationFrame(draw);
            }
            
        }
        
        function nextTrack(){
            record.playing = false;
            let currRec;
            if (i === view.store.data.items.length){
                if (view.store.totalCount > i){
                    view.store.nextPage();
                }
                else{
                    view.store.currentPage = 0;
                }
                i = 0;
            }
            else{
                i = i + 1;
            }
            currRec = view.store.data.items[i];
            parentList.songSrc = currRec.data.fileUrl;
            view.setSelection(currRec);
            me.doPlayMusic(view, currRec, view.store.indexOf(currRec));
        }
        
        me.initActions(parentList, false);
        view.setSelection(record);
        playBtn.setIconCls('x-fa fa-pause');
        playMusic();
        
    },
    
    playMusic: function(btn){
        let me = this,
            parentList = btn.up('list'),
            grid = parentList.down('mygrid'),
            selection = grid.getSelection()[0];
        if (parentList.isPlaying){
            if (selection){
            
            }
            btn.setIconCls('x-fa fa-play');
            parentList.audioEl.pause();
            parentList.songSrc = '';
            parentList.isPlaying = false;
        }
        else{
            if (selection){
                if (selection.playing){
                    parentList.isPlaying = true;
                    btn.setIconCls('x-fa fa-pause');
                    parentList.audioEl.play();
                }
                else{
                    me.doPlayMusic(grid, selection, grid.store.indexOf(selection));
                }
            }
            else{
                me.doPlayMusic(grid, grid.store.data.items[0], 0);
            }
        }
    },
    
    initActions: function(list, onPlay){
        let me = this,
            nextBtn = list.down('#nextSong'),
            preBtn = list.down('#preSong'),
            seekSlider = list.down('#seek-slider'),
            totalTime = list.down('#total-time'),
            seekVolume = list.down('#seek-volume'),
            visualCanvas = list.down('#visual-canvas'),
            currentTime = list.down('#currentTime'),
            colorSelect = list.down('#colorSelect');
        if (onPlay && list.audioContext){
            list.canvas = document.querySelector('.visualizer');
            list.analyser = list.audioContext.createAnalyser();
            
            list.ctx = list.canvas.getContext('2d');
            
            //audio.src = document.getElementById("audioFile");
            
            list.analyser.fftSize = 4096;
            
            list.oscillator = list.audioContext.createOscillator();
            list.oscillator.connect(list.audioContext.destination);
            
            list.source = list.audioContext.createMediaElementSource(list.audioEl);
            list.source.connect(list.analyser);
            list.source.connect(list.audioContext.destination);
            
            list.freqArr = new Uint8Array(list.analyser.frequencyBinCount);
            
            list.barHeight = 60;
            /////////////////////////////////////////////////////////////////////
            list.canvasC = document.getElementById('circlecnv');
            list.canvasC.style.width = '190px';
            list.contextC = list.canvasC.getContext('2d');
            
            list.canvasC.width = window.innerWidth;
            list.canvasC.height = window.innerHeight;
            
            list.WIDTH = 500;
            list.HEIGHT = 50;
            
            list.bigBars = 0;
            list.grd1;
            list.INTERVAL = 256; //256;\
            list.colorStyle = 0;
            
        }
        
        seekSlider.setHidden(onPlay);
        colorSelect.setHidden(onPlay);
        totalTime.setHidden(onPlay);
        currentTime.setHidden(onPlay);
        seekVolume.setHidden(onPlay);
        visualCanvas.setHidden(onPlay);
        nextBtn.setHidden(onPlay);
        preBtn.setHidden(onPlay);
    },
    
    initAudioEl: function(panel){
        let me = this,
            mainheader = jskit.Globals.compQuery('mainheader');
        panel.audioEl = new Audio();
        panel.audioEl.controls = true;
        
        //fix browser vender for AudioContext and requestAnimationFrame
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try{
            panel.audioContext = new (AudioContext || webkitAudioContext)();
        }
        catch (e){
            console.log(e);
        }
        
        me.initActions(panel, true);
    },
    
    playNextMusic: function(btn){
        let me = this,
            parentList = btn.up('list'),
            grid = parentList.down('mygrid'),
            nextIdx = grid.store.indexOf(grid.getSelection()[0]) + 1;
        if (nextIdx === grid.store.data.items.length){
            nextIdx = 0;
        }
        me.doPlayMusic(grid, grid.store.data.items[nextIdx], nextIdx);
    },
    
    playPreviousMusic: function(btn){
        let me = this,
            parentList = btn.up('list'),
            grid = parentList.down('mygrid'),
            currentPage = grid.store.currentPage,
            preIdx = grid.store.indexOf(grid.getSelection()[0]) - 1;
        if (preIdx < 0){
            if (currentPage > 1){
                grid.store.previousPage();
            }
            else{
                grid.store.loadPage(Math.floor(grid.store.totalCount / grid.store.pageSize));
            }
            preIdx = grid.store.data.items.length - 1;
        }
        me.doPlayMusic(grid, grid.store.data.items[preIdx], preIdx);
    }
    
});
