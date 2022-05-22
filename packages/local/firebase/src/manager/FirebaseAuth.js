Ext.define('Ext.firebase.manager.FirebaseAuth', {
    singleton: true,
    
    stateChange: function(){
        firebase.auth()
                .onAuthStateChanged(function(user){
                    if (user){
                        Ext.GlobalEvents.fireEvent('firebase-auth-statechange', user);
                    }
                    else{
                        Ext.GlobalEvents.fireEvent('firebase-auth-statechange', false);
                    }
                });
    },
    
    createAccount: function(email, password){
        var promise = firebase.auth()
                              .createUserWithEmailAndPassword(email, password);
        
        promise.then(function(user){
            Ext.GlobalEvents.fireEvent('firebase-auth-statechange', user);
        });
        
        promise.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            Ext.GlobalEvents.fireEvent('firebase-auth-error', errorMessage);
            //<debug>
            console.error(error);
            //</debug>
        });
        
        return promise;
    },
    
    doLogout: function(){
        if (firebase.auth().currentUser){
            var promise = firebase.auth()
                                  .signOut();
            promise.then(function(){
                Ext.GlobalEvents.fireEvent('firebase-auth-statechange', false);
            });
            
            promise.catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                Ext.GlobalEvents.fireEvent('firebase-auth-error', errorMessage);
                //<debug>
                console.error(error);
                //</debug>
            });
            
            return promise;
        }
        
    },
    
    doLogin: function(email, password){
        var promise;
        
        if (firebase.auth().currentUser){
            promise = firebase.auth()
                              .signOut();
        }
        else{
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
                Ext.GlobalEvents.fireEvent('firebase-auth-statechange', user);
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
                console.error(error);
                //</debug>
            });
        }
        return promise;
    },
    
    doLoginWithGoogle: function onSignIn(googleUser){
        //TODO
        
        //<debug>
        console.log('Google Auth Response', googleUser);
        //</debug>
        
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth()
                                  .onAuthStateChanged(function(firebaseUser){
                                      unsubscribe();
                                      // Check if we are already signed-in Firebase with the correct user.
                                      if (!isUserEqual(googleUser, firebaseUser)){
                                          // Build Firebase credential with the Google ID token.
                                          var credential = firebase.auth.GoogleAuthProvider.credential(
                                              googleUser.getAuthResponse().id_token);
                
                                          // Sign in with credential from the Google user.
                                          firebase.auth()
                                                  .signInWithCredential(credential)
                                                  .catch(function(error){
                                                      // Handle Errors here.
                                                      var errorCode = error.code;
                                                      var errorMessage = error.message;
                                                      var email = error.email;
                                                      // The firebase.auth.AuthCredential type that was used.
                                                      var credential = error.credential;
                                                      if (errorCode === 'auth/account-exists-with-different-credential'){
                                                          Ext.GlobalEvents.fireEvent('firebase-auth-error', 'You have already signed up with a different auth provider for that email.');
                                                          // If you are using multiple auth providers on your app you should handle linking
                                                          // the user's accounts here.
                                                      }
                                                      else{
                                                          //<debug>
                                                          console.error(error);
                                                          //</debug>
                                                          Ext.GlobalEvents.fireEvent('firebase-auth-error', error);
                                                      }
                                                  });
                                      }
                                      else{
                                          Ext.GlobalEvents.fireEvent('firebase-auth-error', 'User already signed-in Firebase.');
                                      }
                                  });
    }
    
});