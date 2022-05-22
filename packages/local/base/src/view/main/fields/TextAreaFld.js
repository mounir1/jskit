Ext.define('jskit.view.fields.TextAreaFldClass', {
    extend: 'Ext.form.field.TextArea',
    xtype: 'mytextareafld',
    labelAlign: 'top',
    enforceMaxLength: true,
    height: 90,
    maxHeight: 90,
    isTextAreaFld: true,
    renderingDelay: 3000,
    ignoreAutoResizer: false,
    recognizing: false,
    triggers: {
        search: {
            cls: 'fa fa-microphone',
            handler: function(self, trigger, event){
                var triggerDom = trigger.getEl().dom;
                
                if (self.recognizing){
                    self.recognition.stop();
                    triggerDom.style.color = 'black';
                    triggerDom.classList.remove('animated', 'infinite', 'pulse');
                    
                    self.setValue(self.final_transcript);
                    return;
                }
                triggerDom.style.color = 'red';
                triggerDom.classList.add('animated', 'infinite', 'pulse');
                self.recognition.lang = 'en-US';
                self.recognition.start();
                self.final_transcript = '';
                self.ignore_onend = false;
                self.start_timestamp = event.timeStamp;
            }
        }
    },
    listeners: {
        beforerender: function(self){
            self.final_transcript = '';
            self.recognizing = false;
            
            //
            self.two_line = /\n\n/g;
            self.one_line = /\n/g;
            self.first_char = /\S/;
            
            //
            function linebreak(s){
                return s.replace(self.two_line, '<p></p>')
                        .replace(self.one_line, '<br>');
            }
            
            function capitalize(s){
                return s.replace(self.first_char, function(m){
                    return m.toUpperCase();
                });
            }
            
            self.recognition = new webkitSpeechRecognition();
            self.recognition.continuous = true;
            self.recognition.interimResults = true;
            
            self.recognition.onstart = function(){
                self.recognizing = true;
                showInfo('info_speak_now');
            };
            
            self.recognition.onerror = function(event){
                if (event.error === 'no-speech'){
                    showInfo('info_no_speech');
                    self.ignore_onend = true;
                }
                if (event.error === 'audio-capture'){
                    showInfo('info_no_microphone');
                    self.ignore_onend = true;
                }
                if (event.error === 'not-allowed'){
                    if (event.timeStamp - self.start_timestamp < 100){
                        showInfo('info_blocked');
                    }
                    else{
                        showInfo('info_denied');
                    }
                    self.ignore_onend = true;
                }
            };
            
            self.recognition.onend = function(){
                self.recognizing = false;
                if (self.ignore_onend){
                    return;
                }
                if (!self.final_transcript){
                    showInfo('info_start');
                    return;
                }
                showInfo('');
                
            };
            
            self.recognition.onresult = function(event){
                var interim_transcript = '';
                if (typeof (event.results) == 'undefined'){
                    self.recognition.onend = null;
                    self.recognition.stop();
                    upgrade();
                    return;
                }
                for (var i = event.resultIndex; i < event.results.length; ++i){
                    if (event.results[i].isFinal){
                        self.final_transcript += event.results[i][0].transcript;
                    }
                    else{
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
                self.final_transcript = capitalize(self.final_transcript);
                linebreak(self.final_transcript);
                self.setValue(linebreak(interim_transcript));
                if (self.final_transcript || interim_transcript){
                    // showButtons('inline-block');
                }
            };
            
            function showInfo(s){
                // todo
                console.log(s);
            }
            
        }
    }
});