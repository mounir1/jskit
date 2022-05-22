Ext.define('jskit.view.main.NewsListVM', {
    extend: 'jskit.view.main.MainVM',
    alias: 'viewmodel.newslist',
    
    stores: {
        newsParams: {
            proxy: {
                type: 'memory',
                data: {
                    country: 'us',
                    category: 'business',
                    apiKey: '115451f06bb6435db7f2d9cb1bef2c9d'
                }
            }
        },
        remoteStore: {
            enablePaging: true,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                url: 'https://newsapi.org/v2/top-headlines',
                reader: {
                    rootProperty: 'articles',
                    totalProperty: 'totalResults',
                    type: 'json'
                }
            }
        },
        
        pagingStore: {
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    rootProperty: 'articles',
                    totalProperty: 'totalResults'
                }
            }
        }
    }
});