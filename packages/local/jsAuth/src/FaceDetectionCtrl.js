Ext.define('jskit.mixins.FaceDetectionCtrl', {
    
    FaceCameraRender: function(panel){
        let predictedAges = [];
        var wind = panel.up('window');
        var constraints = {
            video: true
        };
        var media = navigator.mediaDevices.getUserMedia(constraints);
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('resources/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('resources/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('resources/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('resources/models'),
            faceapi.nets.ageGenderNet.loadFromUri('resources/models')
        ])
               .then(startVideo);
        
        function startVideo(){
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
        
        var parentOffset = panel.getXY();
        var displaySize = {
            width: video.width + parentOffset [0],
            height: video.height + parentOffset[1]
        };
        video.addEventListener('playing', () => {
            var detectcanvas = faceapi.createCanvasFromMedia(video);
    
            detectcanvas.style.position = 'position: sticky;top: 30%;float: right;z-index: 2000;';
            document.body.append(detectcanvas);
            faceapi.matchDimensions(detectcanvas, displaySize);
            
            console.log(wind);
            setInterval(async() => {
                var detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender();
                var resizedDetections = faceapi.resizeResults(detections, displaySize);
                
                detectcanvas.getContext('2d')
                            .clearRect(0, 0, detectcanvas.width, detectcanvas.height);
                
                faceapi.draw.drawDetections(detectcanvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(detectcanvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(detectcanvas, resizedDetections);
                if (!Ext.isEmpty(resizedDetections[0])){
                    var age = resizedDetections[0].age;
                    var interpolatedAge = interpolateAgePredictions(age);
                    var bottomRight = {
                        x: resizedDetections[0].detection.box.bottomRight.x - 50,
                        y: resizedDetections[0].detection.box.bottomRight.y
                    };
                    
                    new faceapi.draw.DrawTextField(
                        [`${faceapi.utils.round(interpolatedAge, 0)} years`],
                        bottomRight
                    ).draw(detectcanvas);
                }
                
            }, 100);
        });
        // video.addEventListener('play', () => {
        //     const canvas = faceapi.createCanvasFromMedia(video);
        //     document.body.append(canvas);
        //     const displaySize = {
        //         width: video.width,
        //         height: video.height
        //     };
        //     faceapi.matchDimensions(canvas, displaySize);
        //     setInterval(async() => {
        //         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        //                                         .withFaceLandmarks()
        //                                         .withFaceExpressions();
        //         const resizedDetections = faceapi.resizeResults(detections, displaySize);
        //         canvas.getContext('2d')
        //               .clearRect(0, 0, canvas.width, canvas.height);
        //         faceapi.draw.drawDetections(canvas, resizedDetections);
        //         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        //         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        //     }, 100);
        // });
        
        function interpolateAgePredictions(age){
            predictedAges = [age].concat(predictedAges)
                                 .slice(0, 30);
            var avgPredictedAge =
                predictedAges.reduce((total, a) => total + a) / predictedAges.length;
            return avgPredictedAge;
        }
    },
    
    onCameraClose: function(wind){
        var video = document.getElementById('video');
        video.pause();
        video.src = '';
        video.load();
        video.removeEventListener('playing', () => {
        });
        video.remove();
        if (wind.videoStream){
            wind.videoStream.getVideoTracks()[0].stop();
        }
    }
});


