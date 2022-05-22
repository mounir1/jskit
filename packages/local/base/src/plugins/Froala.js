Ext.define('jskit.plugins.FroalaEditor', {
    extend: 'jskit.view.component.MyContainer',
    xtype: 'myfroalaeditor',
    scrollable: true,
    width: '100%',
    height: '100%',
    margin: '0 0 0 0',
    layout: 'fit',
    itemId: 'owebHtmlditor',
    listeners: {
        boxready: function(self){
           
            self.editor = new FroalaEditor('#' + self.id, {
                    // key: 'YNB3fJ3B7A7C6D6E3A-9UJHAEFZMUJOYGYQEa1c1ZJg1RAeF5C4C3D3E2C2C6D6D4B3==',
                    toolbarSticky: false,
                    autofocus: true,
                    videoResponsive: true,
                    iframe: true,
                    theme: 'dark',
                    zIndex: 2003,
                    attribution: false,
                    scrollableContainer: '#' + self.id,
                    quickInsertButtons: ['image', 'table', 'ol', 'ul', 'myButton'],
                    
                    toolbarButtons: {
                        // Key represents the more button from the toolbar.
                        moreText: {
                            // List of buttons used in the  group.
                            buttons: [
                                'bold',
                                'italic',
                                'underline',
                                'strikeThrough',
                                'subscript',
                                'superscript',
                                'fontFamily',
                                'fontSize',
                                'textColor',
                                'backgroundColor',
                                'inlineClass',
                                'inlineStyle',
                                'clearFormatting',
                            ],
                            
                            // Alignment of the group in the toolbar.
                            align: 'left',
                            
                            // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
                            buttonsVisible: 3
                        },
                        
                        moreParagraph: {
                            buttons: [
                                'alignLeft',
                                'alignCenter',
                                'formatOLSimple',
                                'alignRight',
                                'alignJustify',
                                'formatOL',
                                'formatUL',
                                'paragraphFormat',
                                'paragraphStyle',
                                'lineHeight',
                                'outdent',
                                'indent',
                                'quote'
                            ],
                            align: 'left',
                            buttonsVisible: 1
                        },
                        
                        moreRich: {
                            buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
                            align: 'left',
                            buttonsVisible: 1
                        },
                        
                        moreMisc: {
                            buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
                            align: 'right',
                            buttonsVisible: 1
                        },
                        my_dropdown: {
                            buttons: []
                        }
                    },
                    
                    linkAttributes: {
                        title: 'Title'
                    },
                    
                    heightMax: window.innerHeight - 300,
                    linkList: [
                        {
                            text: 'OTELLO',
                            href: 'http://beta.hotech.systems',
                            target: '_blank',
                            rel: 'nofollow'
                        },
                        {
                            displayText: 'Hotech',
                            href: 'https://hotech.systems',
                            target: '_blank'
                        }
                    ]
                },
                function(){
                    self.editor.html.set(self.valueEl);
                    self.editor.events.focus.call();
                }
            );
        }
    }
});

