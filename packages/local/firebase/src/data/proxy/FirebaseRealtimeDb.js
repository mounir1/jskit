/**
 * @class Ext.firebase.data.proxy.FirebaseRealtimeDb
 * @extends
 *
 */
Ext.define('Ext.firebase.data.proxy.FirebaseRealtimeDb', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.firebase-db',
    
    requires: [
        'Ext.firebase.data.EventStream'
    ],
    
    config: {
        
        /**
         * @property {Boolean} realtime
         * Realtime database or just REST. Defaults to false.
         */
        realtime: false,
        
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
         * @property {Object} api
         * Datatabase api urls to connect to. Defaults to null and looks into url.
         */
        api: null,
        
        /**
         * @property {String} url
         * Datatabase url to connect to. Defaults to root of Firebase database.
         */
        url: Ext.DB_URL + '/.json'
    },
    
    /**
     * Return paging Configuration
     * @private
     */
    getPager: function(params){
        var pager = null;
        
        //if the following GET parameters will be send
        //start=0&page=1&limit=25
        //then we need to enable paging
        if (params.start === 0 && params.page && params.limit){
            pager = {};
            if (params.page > 1){
                pager.startAt = params.start;
            }
            else{
                pager.startAt = (params.page - 1) * params.limit;
            }
            pager.limitToFirst = (params.page * params.limit);
        }
        
        return pager;
    },
    
    /**
     * Return OrderBy Configuration
     * @private
     */
    setOrderByConfig: function(){
        var me = this,
            oConfig = null,
            orderBy = me.getOrderBy(),
            lTF = me.getLimitToFirst(),
            lTL = me.getLimitToLast();
        
        if (lTF || lTL){
            if (!orderBy){
                //<debug>
                console.log('NOTE: The orderBy setting is required in order to use limitToFirst or limitToLast parameters.');
                //</debug>
            }
        }
        
        if (orderBy){
            oConfig = {};
            oConfig.orderBy = orderBy;
            
            if (lTF && lTL){
                //<debug>
                console.log('NOTE: You can\'t set both; limitToFirst and limitToLast parameters.');
                //</debug>
            }
            else if (lTF){
                oConfig.limitToFirst = lTF;
            }
            else if (lTL){
                oConfig.limitToLast = lTL;
            }
        }
        
        return oConfig;
    },
    
    /**
     * Make an Ext.firebase.data.EventStream.request (or Ext.Ajax.request)
     * Process the response to fill a store.
     */
    doRequest: function(operation){
        var me = this,
            request = me.buildRequest(operation),
            realtime = me.getRealtime(),
            params = request.getParams(),
            requestObj = {},
            api = me.getApi(),
            method = 'GET',
            jsonData = null,
            url = me.getUrl();
        
        if (request.getAction() === 'create'){
            //in case api was passed in we get different urls
            if (api !== null){
                url = api.read;
            }
            method = 'POST';
            
            // var recs = request.getRecords();
            // var dataArray = [],
            //     i = 0;
            
            // for (i; i < recs.length; i++){
            //     dataArray.push(recs[i].data);
            // }
            // jsonData = dataArray;
            jsonData = request.getRecords()[0].data;
            //the store model  creates this id that we won't need .
            //TODO Note the post went well, but firebase creates it own keys.
            //We probably want to start from here
            //or is there a way how we can modify the key creation?
            
        }
        else if (request.getAction() === 'delete'){
            //in case api was passed in we get different urls
            if (api !== null){
                url = api.read;
            }
            
            method = 'DELETE';
        }
        else if (request.getAction() === 'update'){
            //in case api was passed in we get different urls
            if (api !== null){
                url = api.read;
            }
            
            method = 'PATCH';
        }
        else{
            
            //in case api was passed in we get different urls
            if (api !== null){
                url = api.read;
            }
            
        }
        
        requestObj = {
            url: url,
            method: method,
            realtime: realtime,
            jsonData: jsonData,
            success: function(response){
                if (response){
                    Ext.isArray(response) && response.forEach(element => {
                        (element.id = element.gid);
                    });
                    me.processResponse(true, operation, request, response);
                    me.afterRequest(request, true);
                }
                else{
                    me.fireEvent('exception', me, response, operation);
                }
                
            },
            failure: function(e){
                //<debug>
                console.error(e);
                //</debug>
                me.fireEvent('exception', me, e, operation);
            }
        };
        
        if (request.getAction() == 'read'){
            // var oConfig = me.setOrderByConfig(requestObj);
            // Ext.apply(requestObj, {});
            // var pager = me.getPager(params);
            Ext.apply(requestObj, {});
        }
        Ext.firebase.data.EventStream.request(requestObj);
    }
});