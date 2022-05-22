Ext.define('Ext.firebase.view.auth.SignupForm', {
    extend: 'Ext.form.Panel',
    
    xtype: 'firebase-signup',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text'
    ],
    
    items: [
        {
            xtype: 'fieldset',
            title: 'Create account',
            
            layout: {
                type: 'form'
            },
            
            defaults: {
                xtype: 'textfield',
                msgTarget: 'side'
            },
            
            items: [
                {
                    fieldLabel: 'Email',
                    vtype: 'email',
                    name: 'email'
                }, {
                    fieldLabel: 'Password',
                    name: 'password',
                    inputType: 'password',
                    minLength: 6
                }, {
                    fieldLabel: 'Retype Password',
                    name: 'retypepassword',
                    inputType: 'password',
                    minLength: 6,
                    validator: function(value){
                        var p = this.up('form')
                                    .getValues().password;
                        if (value !== p){
                            return 'Passwords don\'t match.';
                        }
                        else{
                            return true;
                        }
                    }
                }
            ]
        }
    ],
    
    buttons: [
        {
            text: 'Create',
            formBind: true,
            handler: function(btn){
                var form = btn.up('form')
                              .getValues();
                var p = Ext.firebase.manager.FirebaseAuth.createAccount(form.email, form.password);
                p.then(function(){
                    //firebase-auth-statechange event has been fired.
                });
                p.catch(function(e){
                    Ext.Msg.alert('Oops', e.message);
                });
            }
        }
    ]
});