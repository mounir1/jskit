Ext.define('jskit.view.main.CalendarListVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calendar-app',

    requires: [
        'jskit.store.Google',
        'jskit.store.Remote',
        'jskit.util.Google',
        'jskit.util.Remote'
    ],

    listen: {
        controller: {
            '*': {
                signin: 'onSignIn',
                signout: 'onSignOut'
            }
        }
    },

    settings: Ext.util.LocalStorage.get('settings'),

    init: function() {
        this.callParent(arguments);
        this.initAuth();
    },

    onSignIn: function() {
        var me = this;

        jskit.util.Google.signIn()
            .then(function() {
                me.loadAuth('google');
            });
    },

    onSignOut: function() {
        var me = this;
    
        jskit.util.Google.signOut()
            .then(function() {
                me.loadAuth('guest');
            });
    },

    privates: {
        initAuth: function() {
            var me = this;

            // Interesting reading about Google OAuth workflow
            // http://stackoverflow.com/a/12909563
            switch (me.settings.getItem('auth')) {
                case 'google':
                    jskit.util.Google.checkAuth()
                    .then(function(signedIn) {
                        me.loadAuth(signedIn ? 'google' : 'guest');
                    });
                    break;
                case 'guest':
                default:
                    this.loadAuth('guest');
                    break;
            }
        },

        /**
         * @param {string} type Type of auth to load (google or guest)
         */
        loadAuth: function(type) {
            var me = this,
                vm = me.getViewModel(),
                getter = 'get' + Ext.String.capitalize(type);

            Ext.Deferred.resolved(me[getter + 'User']())
                .then(function(user) {
                    vm.set('user', user);

                    return me[getter + 'Store']();
                })
                .then(function(store) {
                    me.settings.setItem('auth', type);
                    vm.set('calendars', store);
                    store.load();
                });
        },

        getGuestUser: function() {
            return null;
        },

        getGuestStore: function() {
            return Ext.getStore({ type: 'calendar-remote' });
        },

        getGoogleUser: function() {
            return jskit.util.Google.getProfile()
                .then(function(profile) {
                    var details = profile.names[0] || {},
                        photo = profile.photos[0] || {};

                    return {
                        name: details.displayName || null,
                        icon: photo.url || null,
                        guest: false
                    };
                });
        },

        getGoogleStore: function() {
            return Ext.getStore({ type: 'calendar-google' });
        }
    }
});
