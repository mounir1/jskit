Ext.define('jskit.view.jsauth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authlogin',
    
    mixins: [
        'jskit.mixins.LoginAuthCtrl', 'jskit.mixins.FaceDetectionCtrl'
    ]
    
});
