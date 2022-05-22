Ext.define('Ext.firebase.view.auth.AuthView', {
    extend: 'Ext.container.Container',
    xtype: 'firebase-authview',
    layout: 'hbox',

    //text literals, for overriding
    LOGOUT: 'Logout',
    NOT_SIGNED_IN: 'Not signed in.',
    LOGGED_IN: 'Logged in: ',

    //methods
    createLoggedInState: function(){
        var me = this,
            items = [];

        me.removeAll();

        items.push({
            xtype: 'component',
            flex: 1,
            html: me.NOT_SIGNED_IN
        });
        
        if(me.isComponent){
            me.add(items);
        }      
    },
    createLoggedOutState: function(){
        var me = this,
            items = [];

        me.removeAll();

        items.push({
            xtype: 'component',
            flex: 1,
            html:me.LOGGED_IN + firebase.auth().currentUser.email
        },
        {
            xtype: 'button',
            text: me.LOGOUT,
            handler: Ext.firebase.manager.FirebaseAuth.doLogout   
        });
        
        if(me.isComponent){
            me.add(items);
        }
    },
    listeners: {
        'added': function(){
            var me = this;
            me.createLoggedInState();
            Ext.on('firebase-auth-statechange', function(state){
                if(state){
                me.createLoggedOutState();
                } else {
                me.createLoggedInState();
                }
            });
        }
    }
});