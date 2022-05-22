Ext.define('jskit.view.main.YoutubeListVM', {
    extend: 'jskit.view.main.MainVM',
    alias: 'viewmodel.youtubelist',
    
    stores: {
        
        filterVm: {
            proxy: {
                type: 'memory',
                data: {
                    part: 'snippet',
                    key: 'AIzaSyBhKX_qM_kviXgD7--UOQL-j5uDn_TooLk',
                    channelId: {
                        key: 'UCoVKKQImX43NtAULA5PY8sQ',
                        email: 'mounir1badi@gmail.com'
                    },
                    playlistId: 'PLww2IRLa8ApROHwR9kJLQmomcIrim8IT_',
                    maxResults: 50
                }
            }
        },
        
        youTubeParams: {
            proxy: {
                type: 'memory',
                data: {
                    part: 'snippet',
                    key: 'AIzaSyBhKX_qM_kviXgD7--UOQL-j5uDn_TooLk',
                    playlistId: 'PLww2IRLa8ApROHwR9kJLQmomcIrim8IT_',
                    maxResults: 50
                }
            }
        },
        
        playListsRemoteStore: {
            enablePaging: true,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'ajax',
                useDefaultXhrHeader: false,
                url: 'https://www.googleapis.com/youtube/v3/playlists'
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
                url: 'https://www.googleapis.com/youtube/v3/playlistItems'
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