Ext.define('Ext.firebase.view.auth.AuthForm', {
    extend: 'Ext.form.Panel',

    xtype: 'firebase-authform',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text'
    ],

    items: [{
        xtype: 'fieldset',
        title: 'Login',
        
        layout: {
            type: 'form'
        },

        defaults: {
            xtype: 'textfield',
            msgTarget: 'side'
        },

        items: [{
            fieldLabel: 'Email',
            vtype: 'email',
            name: 'email'
        }, {
            fieldLabel: 'Password',
            name: 'password',
            inputType: 'password',
            minLength: 6
        }]
    }],

    buttons: [{
        formBind: true,
        text: 'Login',
        handler: function(btn){
            var form = btn.up('form').getValues();
            var p = Ext.firebase.manager.FirebaseAuth.doLogin(form.email, form.password);
            p.catch(function(e){
                Ext.Msg.alert("Oops", e.message);
            });  
        }
    }]


});