/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('jskit.Application', {
    extend: 'Ext.app.Application',
    
    name: 'JsKit',

    defaultToken : 'dashboard',

    mainView: 'Admin.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ]
});
