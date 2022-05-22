// /**
//  * Created by hamido on 8.11.2017.
//  */

// var requests = [];
// Ext.define('jskit.view.main.AjxRequest', {
    
//        singleton: true,
    
//     doReq: function(reqMethod, reqParams, jsonData, apiUrl, timeout){
//         var deferred = new Ext.Deferred();
//         var meth = reqMethod || 'GET';
//         var par = reqParams || {};
//         var reqData = jsonData || {};
        
//         Ext.Ajax.request({
//             url: apiUrl,
//             timeout: timeout,
//             method: meth,
//             jsonData: reqData,
//             params: par,
            
//             success: function(response){
//                 var data = Ext.decode(response.responseText);
//                 console.log('Response Data:');
//                 console.log(data);
//                 deferred.resolve(data, response);
                
//             },
            
//             failure: function(response){
//                 console.log('Failure Response...');
//                 console.log(response);
//                 var restext = response.responseText;
//                     var data = Ext.decode(restext);
//                     console.log('Response failure data...:');
//                     console.log(data);
//                     deferred.reject(data, response);
                
//             }
//         });
        
//         return deferred.promise;
//     },
    
//     reqPost: function(reqKey, reqParams, jsonData){
//         return this.doReq(reqKey, 'POST', reqParams, jsonData);
//     },
    
//     reqGet: function(reqKey, reqParams){
//         return this.doReq(reqKey, 'GET', reqParams);
//     },
    
//     reqPut: function(reqKey, reqParams){
//         return this.doReq(reqKey, 'PUT', reqParams);
//     },
    
//     reqDel: function(reqKey, reqParams){
//         return this.doReq(reqKey, 'DELETE', reqParams);
//     }
    
// }, function(){
//     Ext.Ajax.on('beforerequest', function(req, options){
//         Ext.Ajax.setUseDefaultXhrHeader(false);
//         Ext.Ajax.setDefaultPostHeader('application/json; charset=UTF-8');
//         options.headers = options.headers || {};
//         options.headers['Content-Type'] = 'application/json';
//         options.headers['Access-Control-Allow-Origin'] = '*';
//         options.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS';
//         options.headers['Access-Control-Allow-Headers'] = 'Content-Type,x-prototype-version,x-requested-with';
//         glb.showRequestSpinner(options.timeout, glb.getFocusedView());
//         requests.push(req);
//         if (Ext.getBody().isLoggedIn){
//             options.headers['Authorization'] = 'Bearer ' + authToken;
//             options.timeout = options.timeout > glb.OREST_SERVER_TIMEOUT ? options.timeout : glb.OREST_SERVER_TIMEOUT;
//             if (options.params && options.params.usesuperhotel){
//                 delete options.params.allhotels;
//             }
//             else if (options.params && !options.params.allhotels){
//                 options.params.hotelrefno = currUserInfo.hotelrefno;
//             }
//         }
//     });
    
//     // Ext.Ajax.on('requestcomplete', OWeb.Globals.OwebRequestComplete);
//     //
//     // // NEXT: Providing event listener for any type of XHR request (not only ExtJS!) failure.
//     // Ext.Ajax.on('requestexception', OWeb.Globals.OwebRequestException);
//     //
//     // // Inject handler for rejected promises.
//  });
