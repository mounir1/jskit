Ext.define('jskit.view.component.SignUpWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.signupwindow',
    autoShow: true,
    itemId: 'signUpWind',
    title: 'SIGN UP FORM',
    viewModel: {
        data: {
            record: {}
        }
    },
    items: {
        xtype: 'form',
        width: 550,
        labelAlign: 'right',
        viewModel: true,
        frame: true,
        modelValidation: true,
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
                xtype: 'fieldset',
                title: 'User Info ',
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: '<b>UserName || Code</b>',
                        name: 'userName',
                        allowBlank: false,
                        msgTarget: 'side',
                        vtype: 'alphanum',
                        bind: '{record.code}',
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
                        bind: '{record.pass}',
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
                                bind: '{record.title}',
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
                                bind: '{record.firstname}',
                                name: 'firstName',
                                fieldLabel: 'First',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                flex: 1,
                                name: 'lastName',
                                bind: '{record.lastname}',
                                fieldLabel: 'Last',
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        fieldLabel: '<b>Email</b>',
                        itemId: 'email',
                        xtype: 'textfield',
                        bind: '{record.email}',
                        name: 'email',
                        allowBlank: false,
                        vtype: 'email',
                        msgTarget: 'side'
                    },
                    // {
                    //     fieldLabel: '<b>Age</b>',
                    //     xtype: 'numberfield',
                    //     name: 'age',
                    //     allowBlank: false,
                    //     msgTarget: 'side',
                    //     maxValue: 60,
                    //     bind: '{record.pass}',
                    //     minValue: 18,
                    //     value: 25
                    // },
                    {
                        xtype: 'datefield',
                        fieldLabel: '<b>Date of Birth</b>',
                        name: 'dob',
                        msgTarget: 'side',
                        allowBlank: false,
                        bind: '{record.birthdate}',
                        maxValue: new Date()
                    },
                    {
                        xtype: 'radiogroup',
                        fieldLabel: '<b>Gender</b>',
                        items: [
                            {
                                boxLabel: '<b>Male</b>',
                                name: 'gender',
                                inputValue: 'Male',
                                checked: true,
                                bind: '{record.male}',
                                width: 70
                            },
                            {
                                boxLabel: '<b>Female</b>',
                                bind: '{record.female}',
                                name: 'gender',
                                inputValue: 'Female'
                            },
                            {
                                boxLabel: '<b>Other</b>',
                                bind: '{record.other}',
                                name: 'gender',
                                inputValue: 'other'
                            }

                        ]
                    },
                    // {
                    //     xtype: 'tagfield',
                    //     name: 'Interested in',
                    //     fieldLabel: '<b>Select you interests</b>',
                    //     bind: '{record.hobies}',
                    //     store: {
                    //         fields: [
                    //             {
                    //                 name: 'interests',
                    //                 convert: undefined
                    //             }
                    //         ],
                    //         data: [
                    //             {
                    //                 interests: 'Books'
                    //             },
                    //             {
                    //                 interests: 'Outdoor Games'
                    //             },
                    //             {
                    //                 interests: 'Indoor Games'
                    //             },
                    //             {
                    //                 interests: 'Social Websites'
                    //             },
                    //             {
                    //                 interests: 'Entertainment'
                    //             },
                    //             {
                    //                 interests: 'Travelling'
                    //             },
                    //             {
                    //                 interests: 'Chit Chat with friends'
                    //             },
                    //             {
                    //                 interests: 'Listening'
                    //             }
                    //         ]
                    //     },
                    //     value: ['Entertainment'],
                    //     displayField: 'interests',
                    //     valueField: 'interests',
                    //     filterPickList: true,
                    //     queryMode: 'local',
                    //     publishes: 'value'
                    // },
                    //
                    // {
                    //     xtype: 'fieldcontainer',
                    //     layout: 'hbox',
                    //     defaultType: 'checkbox',
                    //     items: [
                    //         {
                    //             fieldLabel: '<b>I Have</b>',
                    //             boxLabel: 'Facebook',
                    //             name: 'Accounts',
                    //             flex: 1,
                    //             inputValue: 'Facebook'
                    //         },
                    //         {
                    //             boxLabel: 'Twitter',
                    //             name: 'Accounts',
                    //             width: 100,
                    //             inputValue: 'Twitter'
                    //         },
                    //         {
                    //             checked: true,
                    //             boxLabel: 'LinkedIn',
                    //             flex: 1,
                    //             name: 'Accounts',
                    //             inputValue: 'LinkedIn'
                    //         }
                    //     ]
                    // }
                    // {
                    //     xtype: 'filefield',
                    //     fieldLabel: '<b>Upload Resume</b>',
                    //     name: 'Resume file path',
                    //     width: 350,
                    //     reference: 'basicFile'
                    // },
                    // {
                    //     xtype: 'combo',
                    //     fieldLabel: '<b>Country</b>',
                    //     name: 'country',
                    //     reference: 'country',
                    //     displayField: 'name',
                    //     valueField: 'name',
                    //     publishes: 'value',
                    //     store: {
                    //         fields: [{
                    //             name: 'name',
                    //             convert: undefined
                    //         }],
                    //         data: [{
                    //                 name: 'France'
                    //             },
                    //             {
                    //                 name: 'Turkey'
                    //             },
                    //             {
                    //                 name: 'India'
                    //             },
                    //             {
                    //                 name: 'Algeria'
                    //             },
                    //             {
                    //                 name: 'Canada'
                    //             },
                    //             {
                    //                 name: 'Australia'
                    //             },
                    //             {
                    //                 name: 'China'
                    //             },
                    //             {
                    //                 name: 'USA'
                    //             },
                    //             {
                    //                 name: 'South Korea'
                    //             },
                    //             {
                    //                 name: 'Italy'
                    //             },
                    //         ]
                    //     }
                    // },
                    // {
                    //     xtype: 'combo',
                    //     fieldLabel: '<b>State</b>',
                    //     displayField: 'state',
                    //     valueField: 'abbr',
                    //     name: 'state',
                    //     queryMode: 'remote',
                    //     forceSelection: true,
                    //     bind: {
                    //         visible: '{country.value}',
                    //         filters: {
                    //             property: 'country',
                    //             value: '{country.value}'
                    //         }
                    //     },
                    //     store: {
                    //         fields: ['abbr', 'state', 'country'],
                    //         data: [
                    //             {
                    //                 abbr: 'ANDHRA',
                    //                 state: 'ANDHRA',
                    //                 country: 'India'
                    //             },
                    //             {
                    //                 abbr: 'TAMILNADU',
                    //                 state: 'TAMILNADU',
                    //                 country: 'India'
                    //             },
                    //             {
                    //                 abbr: 'KERALA',
                    //                 state: 'KERALA',
                    //                 country: 'India'
                    //             },
                    //             {
                    //                 abbr: 'MAHARASHTRA',
                    //                 state: 'MAHARASHTRA',
                    //                 country: 'India'
                    //             },
                    //             {
                    //                 abbr: 'VICTORIA',
                    //                 state: 'VICTORIA',
                    //                 country: 'Australia'
                    //             },
                    //             {
                    //                 abbr: 'QUEENSLAND',
                    //                 state: 'QUEENSLAND',
                    //                 country: 'Australia'
                    //             },
                    //             {
                    //                 abbr: 'KANSAS',
                    //                 state: 'KANSAS',
                    //                 country: 'USA'
                    //             },
                    //             {
                    //                 abbr: 'ARIZONA',
                    //                 state: 'ARIZONA',
                    //                 country: 'USA'
                    //             },
                    //             {
                    //                 abbr: 'TEXAS',
                    //                 state: 'TEXAS',
                    //                 country: 'USA'
                    //             },
                    //             {
                    //                 abbr: 'ONTARIO',
                    //                 state: 'ONTARIO',
                    //                 country: 'Canada'
                    //             },
                    //             {
                    //                 abbr: 'NEW BRUNSWICK',
                    //                 state: 'NEW BRUNSWICK',
                    //                 country: 'Canada'
                    //             }
                    //         ]
                    //     }
                    // },
                    // {
                    //     xtype: 'fieldcontainer',
                    //     fieldLabel: '<b>Phone</b>',
                    //     combineErrors: true,
                    //     msgTarget: 'under',
                    //     defaults: {
                    //         hideLabel: true,
                    //         enforceMaxLength: true
                    //     },
                    //     items: [
                    //         {
                    //             xtype: 'displayfield',
                    //             value: '+',
                    //             margin: '0 2 0 0'
                    //         },
                    //         {
                    //             xtype: 'numberfield',
                    //             fieldLabel: 'Code',
                    //             margin: '0 5 0 0',
                    //             name: 'code',
                    //             width: 35,
                    //             allowBlank: false,
                    //             maxLength: 2,
                    //             hideTrigger: true,
                    //             keyNavEnabled: false,
                    //             mouseWheelEnabled: false
                    //         },
                    //         {
                    //             xtype: 'numberfield',
                    //             fieldLabel: 'Number',
                    //             name: 'phone',
                    //             width: 140,
                    //             allowBlank: false,
                    //             margin: '0 5 0 0',
                    //             maxLength: 10,
                    //             minLength: 10,
                    //             hideTrigger: true,
                    //             keyNavEnabled: false,
                    //             mouseWheelEnabled: false
                    //         }
                    //     ]
                    // }
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