Ext.define('jskit.Application', {
    extend: 'Ext.app.Application',
    
    name: 'jskit',
   controllers:["main"],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    
    onAppUpdate: function(arg){
        
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice){
                if (choice === 'yes'){
                    window.location.reload();
                }
            }
        );
 
    },
    
    defaultToken: 'home',
     
});
