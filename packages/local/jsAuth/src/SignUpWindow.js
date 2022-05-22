Ext.define('jskit.view.jsauth.SignUpWindow', {
    extend: 'Ext.window.Window',
    xtype: 'signupwindow',
    autoShow: true,
    itemId: 'signUpWind',
    title: 'SIGN UP FORM',
    viewModel: 'main',
    controller: 'authlogin',
    items: {
        xtype: 'form',
        width: 550,
        labelAlign: 'right',
        frame: true,
        modelValidation: true,
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
                xtype: 'fieldset',
                title: 'User Info',
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: '<b>UserName</b>',
                        name: 'userName',
                        allowBlank: false,
                        msgTarget: 'side',
                        vtype: 'alphanum',
                        maxLength: 10
                    },
                    {
                        fieldLabel: '<b>Password</b>',
                        inputType: 'password',
                        name: 'password',
                        msgTarget: 'side',
                        itemId: 'pass',
                        triggers: {
                            password: {
                                align: 'right',
                                tooltip: 'show password',
                                cls: 'x-fa fa-eye',
                                handler: function(comp, trigger){
                                    let showPassword = !trigger.showPassword;
                                    
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
                        },
                        allowBlank: false
                    },
                    {
                        fieldLabel: '<b>Confirm Password</b>',
                        inputType: 'password',
                        name: 'cfrm-Password',
                        allowBlank: false,
                        msgTarget: 'side',
                        triggers: {
                            password: {
                                align: 'right',
                                tooltip: 'show password',
                                cls: 'x-fa fa-eye',
                                handler: function(comp, trigger){
                                    let showPassword = !trigger.showPassword;
                                    
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
                        },
                        vtype: 'password',
                        initialPassField: 'pass'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Details',
                collapsible: true,
                defaults: {
                    labelWidth: 90,
                    layout: 'hbox'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        anchor: '100%',
                        layout: 'hbox',
                        combineErrors: true,
                        msgTarget: 'side',
                        fieldLabel: '<b>Full Name</b>',
                        defaults: {
                            hideLabel: true,
                            margin: '0 5 0 0'
                        },
                        items: [
                            {
                                width: 90,
                                xtype: 'combo',
                                queryMode: 'local',
                                value: 'mrs',
                                triggerAction: 'all',
                                forceSelection: true,
                                editable: false,
                                fieldLabel: 'Title',
                                name: 'title',
                                displayField: 'name',
                                valueField: 'value',
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {
                                            name: 'Mr',
                                            value: 'mr'
                                        },
                                        {
                                            name: 'Mrs',
                                            value: 'mrs'
                                        },
                                        {
                                            name: 'Miss',
                                            value: 'miss'
                                        }
                                    ]
                                }
                            }, {
                                xtype: 'textfield',
                                flex: 1,
                                name: 'firstName',
                                fieldLabel: 'First',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                flex: 1,
                                name: 'lastName',
                                fieldLabel: 'Last',
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        fieldLabel: '<b>Email</b>',
                        itemId: 'email',
                        xtype: 'textfield',
                        name: 'email',
                        allowBlank: false,
                        vtype: 'email',
                        msgTarget: 'side'
                    }
                
                ]
            }
        ],
        buttons: [
            {
                text: 'Save',
                disabled: true,
                formBind: true,
                handler: 'onCreateAccount'
            }, {
                text: 'Reset',
                handler: function(){
                    this.up('form')
                        .reset();
                }
            }
        ]
    }
});

Ext.define('SignUp.VType', {
    override: 'Ext.form.field.VTypes',
    password: function(val, field){
        if (field.initialPassField){
            var pwd = field.up('form')
                           .down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    
    passwordText: 'Passwords do not match'
});