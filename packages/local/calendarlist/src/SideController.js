Ext.define('jskit.view.profile.SideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.app-side',

    onSignIn: function() {
        this.fireEvent('signin');
    },

    onSignOut: function() {
        this.fireEvent('signout');
    }
});
