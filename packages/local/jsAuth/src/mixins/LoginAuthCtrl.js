Ext.define('jskit.mixins.LoginAuthCtrl', {
    
    onSignUp: function(btn){
        Ext.widget('signupwindow');
    },
    
    onLogin: function(btn){
        
        let me = this,
            wind = btn.isWindow ? btn : btn.up('window'),
            username = wind.down('#username').value,
            password = wind.down('#password').value;
        me.doLogin(username, password, wind);
    },
    
    onLogout: function(){
        var me = this,
            view = me.getView(),
            session = me.session;
        
        if (!session || !session.isValid()){
            return false;
        }
        
        view.setMasked({xtype: 'loadmask'});
        // session.logout()
        //        .catch(function(){
        //            // TODO handle errors
        //        })
        //        .then(function(){
        //            me.originalRoute = Ext.History.getToken();
        //            me.terminateSession();
        //            view.setMasked(false);
        //            me.redirectTo('login', {replace: true});
        //        });
    },
    
    signInWithCamera: function(btn){
        btn.up('window')
           .destroy();
        Ext.widget('mycamerawindow');
    },
    
    onCreateAccount: function(btn){
        var me = this,
            wind = btn.up('window'),
            form = wind.down('form'),
            encode = Ext.String.htmlEncode,
            s = '';
        
        if (form.isValid()){
            let email = form.down('#email').value,
                pass = form.down('#pass').value;
            
            me.createAccount(email, pass, wind);
            wind.mask('Creating User ...');
        }
    },
    
    createAccount: function(email, password, wind){
        var me = this,
            promise = firebase.auth()
                              .createUserWithEmailAndPassword(email, password);
        
        promise.then(function(user){
            // let vm = wind.getViewModel(),
            //     record = {
            //         uid : user.user.uid,
            //         displayName : user.user.displayName,
            //         email : user.user.email,
            //         photoURL : user.user.photoURL,
            //     },
            //     url = Ext.DB_URL + '/users.json',
            //     remoteStore = Ext.create('Ext.data.Store', {
            //         proxy: {
            //             type: 'firebase-db',
            //             url: url,
            //             api: {
            //                 create: url,
            //                 read: url,
            //                 update: url,
            //                 delete: url
            //             }
            //         }
            //     });

            // me.doAddNewRecord(record, remoteStore);
            
            wind.destroy();
        });
        
        promise.catch(function(error){
            wind.unmask();
            var errorCode = error.code;
            var errorMessage = error.message;
            Ext.Msg.alert(errorCode, errorMessage);
            Ext.GlobalEvents.fireEvent('firebase-auth-error', errorMessage);
            //<debug>
            console.error(error);
            //</debug>
        });
        
        return promise;
    },
    
    doLogin: function(email, password, wind){
        var me = this,
            promise;
        
        if (email.length < 4){
            Ext.GlobalEvents.fireEvent('firebase-auth-error', 'Please enter an email address.');
            return;
        }
        if (password.length < 4){
            Ext.GlobalEvents.fireEvent('firebase-auth-error', 'Please enter a password.');
            return;
        }
        
        // Sign in with email and pass.
        promise = firebase.auth()
                          .signInWithEmailAndPassword(email, password);
        
        promise.then(function(user){
            Ext.currentUser = user;
            me.redirectTo('home', {replace: true});
            wind.destroy();
            
        });
        
        promise.catch(function(error){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password'){
                Ext.GlobalEvents.fireEvent('firebase-auth-error', 'Wrong password.');
            }
            else{
                Ext.GlobalEvents.fireEvent('firebase-auth-error', errorMessage);
            }
            //<debug>
            Ext.Msg.alert(errorCode, errorMessage);
            console.error(error);
            //</debug>
        });
        return false;
    },


    doLoginWithGoogle: function(){
        
        var me = this,
            provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
                .signInWithRedirect(provider);
        // .signInWithPopup(provider)
        // .then(function(result){
        //     debugger;
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     // ...
        // })
        // .catch(function(error){
        //     debugger
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        // });
    },
    
    doLoginWithFacebook: function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            // .signInWithRedirect(provider);
                .signInWithPopup(provider);
    },
    doLoginWithGithub: function(){
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth()
            .signInWithRedirect(provider);
            //     .signInWithPopup(provider);
    },
    
    afterLoginPopup: function(result){
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        
        // ...
        
    },
    
    log: function(t, e){
        console.log(t, e);
    }
});