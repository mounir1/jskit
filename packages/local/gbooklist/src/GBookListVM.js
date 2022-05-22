Ext.define('jskit.view.main.GBookListVM', {
    extend: 'jskit.view.main.MainVM',
    alias: 'viewmodel.gbooklist',
    
    stores: {
        
        remoteParams: {
            proxy: {
                type: 'memory',
                data: {
                    key: 'AIzaSyBvMYrqIonqKfW_YnanonZgYOW0vUYR8QE',
                    q: 'book',
                    maxResults: 40
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
                url: 'https://www.googleapis.com/books/v1/volumes'
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