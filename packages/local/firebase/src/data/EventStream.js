/* 
 * A singleton instance of an `{@link Ext.data.Connection}`. This class is used to
 * communicate with your server side code. It can be used as follows:
 *
 *       Ext.firebase.data.EventStream.request({
 *          url: 'https://s-usc1c-nss-117.firebaseio.com/results/data.json?ns=myapp-ab8c4&sse=true',
 *          limit: 5,
 *          start: 5,
 *          order: "DESC",
 *          sort: "playcount",
 *          params: {
 *            foo: 5
 *          },
 *          success: function(response){
 *            console.log(response)
 *          },
 *          failure; function(e){
 *            console.log(e);
 *          } 
 });
 */
Ext.define('Ext.firebase.data.EventStream', {
    singleton: true,
    
    /**
     * @property {Object} jsonData
     * jsonData to POST, Defaults to null.
     */
    jsonData: null,
    
    /**
     * @property {String} method
     * When EventStreams are allowed, Defaults to "PUT", else Defaults to "GET"
     */
    method: !!window.EventSource ? 'PUT' : 'GET',
    
    /**
     * @property {Boolean} realtime
     * Enable realtime streaming vs. simple AJAX calls. Defaults to true.
     */
    realtime: true,
    
    /**
     * @property {String} orderBy
     * https://firebase.google.com/docs/database/rest/retrieve-data#orderby
     *
     * It queries records from the database.
     * For example: https://dinosaur-facts.firebaseio.com/dinosaurs.json?orderBy=%22weight%22&limitToLast=2&print=pretty
     * Means: from the dino database, select the last 2 dinos on weight. (select the 2 heaviest dinos)
     *
     * You need to enable the fields you want to index on in your database rules, for example:
     *  "dinosaurs": {
     *   ".indexOn": ["height", "weight"]
     *  }
     */
    orderBy: null,
    
    /**
     * @property {Number} limitToFirst
     * https://firebase.google.com/docs/database/rest/retrieve-data#limit-queries
     *
     * NOTE: This setting requires the orderBy par to be set.
     *
     * The limitToFirst and limitToLast parameter is used to set a maximum number of children for which to receive data.
     * If we set a limit of 100, we will only receive up to 100 matching children.
     * If we have less than 100 messages stored in our database, we will receive every child.
     * limitToFirst selects the records from the database in an ASC direction.
     */
    limitToFirst: null,
    
    /**
     * @property {Number} limitToLast
     * https://firebase.google.com/docs/database/rest/retrieve-data#limit-queries
     *
     * NOTE: This setting requires the orderBy par to be set.
     *
     * The limitToFirst and limitToLast parameter is used to set a maximum number of children for which to receive data.
     * If we set a limit of 100, we will only receive up to 100 matching children.
     * If we have less than 100 messages stored in our database, we will receive every child.
     * limitToLast selects the records from the database in an DESC direction.
     */
    limitToLast: null,
    
    /**
     * Set paging parameters
     * @private
     */
    setPager: function(options, requestObj){
        if ('orderBy' in requestObj){
            //can't use these arguments without orderBy
            requestObj.startAt = options.startAt;
            requestObj.limitToFirst = options.limitToFirst;
        }
    },
    
    /**
     * Set OrderBy Configuration
     * @private
     */
    setOrderByConfig: function(options, params){
        var orderBy = options.orderBy,
            lTF = options.limitToFirst,
            lTL = options.limitToLast;
        
        if (lTF || lTL){
            if (!orderBy){
                //<debug>
                console.log('NOTE: The orderBy setting is required in order to use limitToFirst or limitToLast parameters.');
                //</debug>
            }
        }
        
        if (orderBy){
            params.orderBy = orderBy;
            
            if (lTF && lTL){
                //<debug>
                console.log('NOTE: You can\'t set both; limitToFirst and limitToLast parameters.');
                //</debug>
            }
            else if (lTF){
                params.limitToFirst = lTF;
            }
            else if (lTL){
                params.limitToLast = lTL;
            }
        }
    },
    
    /**
     * @property {Number} limit
     * The total amount of data sent. Defaults to null.
     */
    request: function(options){
        options = Ext.apply({}, options);
        
        //<debug> 
        if (!options.url){
            Ext.raise('A url must be specified for a EventStream.');
        }
        //</debug> 
        
        var me = this,
            realtime = Ext.isDefined(options.realtime) ? options.realtime : me.realtime,
            method = Ext.isDefined(options.method) ? options.method : me.method,
            jsonData = Ext.isDefined(options.jsonData) ? options.jsonData : me.jsonData,
            params = Ext.isDefined(options.params) ? options.params : {},
            
            orderBy = options.orderBy,
            limitToFirst = options.limitToFirst,
            limitToLast = options.limitToLast;
        
        me.setOrderByConfig(options, params);
        me.setPager(options, params);
        
        if (realtime && !!window.EventSource){
            var url = options.url;
            params.sse = true;
            
            url = options.url + '?' + Ext.Object.toQueryString(params);
            
            var source = new EventSource(url);
            
            //TODO ALLOW POST AND DELETE CALLS
            
            source.addEventListener('put', function(e){
                var data = JSON.parse(event.data),
                    keyName = Object.keys(data)[1],
                    i = 0,
                    arrResults = [];
                
                for (prop in data[keyName]){
                    data[keyName][prop].gid = prop;
                    arrResults.push(data[keyName][prop]);
                }
                options.success(arrResults);
                
            }, false);
            
            source.addEventListener('open', function(e){
                //TODO
            }, false);
            
            source.addEventListener('error', function(e){
                options.failure(e);
                if (e.readyState == EventSource.CLOSED){
                    //<debug>
                    console.error(e);
                    //</debug>
                }
            }, false);
            
        }
        else{
            //<debug>
            if (!window.EventSource){
                console.error('Your browser doesn\'t support Server-Sent-Events. Fall back to AJAX, no streaming data');
            }
            //</debug>
            
            Ext.Ajax.request({
                url: options.url,
                method: method, //TODO when posting is allowed too
                params: params,
                jsonData: jsonData,
                success: function(response){
                    if (response.responseText){
                        var data = JSON.parse(response.responseText),
                            i = 0,
                            arrResults = [];
                        
                        for (key in data){
                            if (data[key]){
                                data[key].gid = key;
                            }
                            else{
                                delete data[key];
                                continue;
                            }
                            arrResults.push(data[key]);
                        }
                        options.success(arrResults);
                    }
                    else{
                        console.log(options);
                    }
                    // options.success(data);
                },
                failure: options.failure
            });
        }
    }
});