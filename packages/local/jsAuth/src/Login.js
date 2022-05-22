Ext.define('jskit.view.jsauth.Login', {
    extend: 'Ext.window.Window',
    xtype: 'authlogin',
    
    itemId: 'loginWind',
    width: 500,
    modal: true,
    resizable: false,
    draggable: false,
    bodyPadding: 10,
    closable: false,
    autoShow: true,
    style: 'border-color:#E6E6E6;border-width: 2px;',
    
    controller: 'authlogin',
    
    cls: 'auth-login',
    
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    
    defaultFocus: 'txtUserName',
    
    items: [
        {
            xtype: 'form', // buttonAlign: 'center',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            
            reference: 'form',
            autoEl: {
                tag: 'form'
            },
            items: [
                // {
                //     xtype: 'image', logo
                //     src: 'Scripts/extjs5/resources/images/enservio-logo.png',
                //     width: '45%',
                //     height: 52
                // },
                {
                    xtype: 'label',
                    margin: '15 0 25 0',
                    text: 'please sign in Or Create an Account.',
                    style: 'font: normal 19px Arial !important;color:gray'
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    width: 220,
                    height: 35,
                    name: 'username',
                    itemId: 'username',
                    emptyText: 'Email',
                    'inputAttrTpl': ['autocomplete="on"']
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    margin: '20 0 20 0',
                    width: 220,
                    height: 35,
                    name: 'password',
                    itemId: 'password',
                    inputType: 'password',
                    emptyText: 'Password',
                    'inputAttrTpl': ['autocomplete="on"'],
                    triggers: {
                        password: {
                            align: 'right',
                            tooltip: 'show password',
                            frame: false,
                            cls: 'x-fa fa-eye',
                            handler: function(comp, trigger){
                                
                                if (!trigger.showPassword){
                                    
                                    comp.inputEl.dom.type = 'text';
                                    trigger.getEl()
                                           .removeCls('x-fa fa-eye');
                                    trigger.getEl()
                                           .addCls('x-fa fa-eye-slash');
                                    trigger.setTooltip('hide password');
                                    
                                }
                                else{
                                    comp.inputEl.dom.type = 'password';
                                    trigger.getEl()
                                           .addCls('x-fa fa-eye');
                                    trigger.getEl()
                                           .removeCls('x-fa fa-eye-slash');
                                    trigger.setTooltip('show password');
                                    
                                }
                                trigger.showPassword = !trigger.showPassword;
                                
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    margin: '0 0 25 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            
                            name: 'rememberme',
                            xtype: 'checkbox',
                            boxLabel: 'Remember Me'
                        }, {
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'label',
                            width: 120,
                            text: 'Forgot password',//todo
                            cls: 'clear-button',
                            listeners: {
                                el: {
                                    click: function(){
                                        var wind = Ext.WindowManager.front;
                                        var emailFld = wind.down('#username');
                                        if (emailFld.isValid()){
                                            var auth = firebase.auth();
                                            auth.sendPasswordResetEmail(emailFld.value)
                                                .then(function(res){
                                                    Ext.Msg.alert('Success', 'Check Your Email For Reset ');
                                                })
                                                .catch(function(error){
                                                    Ext.Msg.alert('Failure', +error);
                                                });
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }, {
                    xtype: 'panel',
                    layout: 'hbox',
                  
                    defaults: {
                        xtype: 'button',
                        margin: '0 20 10 20'
                    },
                    items: [
                        {
                            iconCls: 'fab fa-github',
                            handler: 'doLoginWithGithub'
                        },
                        {
                            iconCls: 'fab fa-facebook',
                            handler: 'doLoginWithFacebook'
                        },
                        {
                            iconCls: 'fab fa-google',
                            handler: 'doLoginWithGoogle'
                        }
                    ]
                }
            
            ],
            buttons: [
                {
                    text: 'Face Id',
                    handler: 'signInWithCamera',
                    hidden: true
                },
                {
                    formBind: true,
                    text: 'Login',
                    handler: 'onLogin'
                },
                {
                    text: 'Sign Up',
                    handler: 'onSignUp'
                }
            ]
            
        }
    ]
});
