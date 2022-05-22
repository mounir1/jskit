Ext.define('jskit.view.main.MoviesListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'moviesgrid',
    
    title: 'Movies List',
    iconCls: 'fa fa-film',
    scrollable: true,
    noAdd: true,
    tools: [
        {
            type: 'refresh',
            handler: 'onRefresh'
        }
    ],
    
    hoverActions: [
        {
            text: 'Play',
            iconCls: 'x-fa fa-star',
            click: 'doAddToMovies'
        }
    ],
    
    dataTools: [
        {
            xtype: 'mytextfld',
            emptyText: 'Term ',
            name: 'query_term',
            fieldLabel: 'Search ',
            defaultValue: 0
        },
        {
            xtype: 'mycombofield',
            fieldLabel: 'Quality:',
            name: 'quality',
            defaultValue: 1,
            value: {
                text: 'All',
                value: 1
            },
            store: {
                data: [
                    {
                        text: 'All',
                        value: 1
                    },
                    {
                        text: '1080 P',
                        value: 2
                    },
                    {
                        text: '720 P',
                        value: 3
                    },
                    {
                        text: '216 P',
                        value: 4
                    },
                    {
                        text: '3 D',
                        value: 5
                    }
                ]
            }
        },
        {
            xtype: 'mycombofield',
            fieldLabel: 'Genre:',
            name: 'genre',
            value: {
                value: 'all',
                text: 'All'
            },
            defaultValue: 'all',
            store: {
                data: [
                    {
                        value: 'all',
                        selected: true,
                        text: 'All'
                    },
                    {
                        value: 'action',
                        text: 'Action'
                    },
                    {
                        value: 'adventure',
                        text: 'Adventure'
                    },
                    {
                        value: 'animation',
                        text: 'Animation'
                    },
                    {
                        value: 'biography',
                        text: 'Biography'
                    },
                    {
                        value: 'comedy',
                        text: 'Comedy'
                    },
                    {
                        value: 'crime',
                        text: 'Crime'
                    },
                    {
                        value: 'documentary',
                        text: 'Documentary'
                    },
                    {
                        value: 'drama',
                        text: 'Drama'
                    },
                    {
                        value: 'family',
                        text: 'Family'
                    },
                    {
                        value: 'fantasy',
                        text: 'Fantasy '
                    },
                    {
                        value: 'film-noir',
                        text: 'Film-Noir '
                    },
                    {
                        value: 'game-show',
                        text: ' Game-Show '
                    },
                    {
                        value: 'history',
                        text: 'History '
                    },
                    {
                        value: 'horror',
                        text: 'Horror '
                    },
                    {
                        value: 'music',
                        text: 'Music '
                    },
                    {
                        value: 'musical',
                        text: 'Musical '
                    },
                    {
                        value: 'mystery',
                        text: 'Mystery '
                    },
                    {
                        value: 'news',
                        text: 'News '
                    },
                    {
                        value: 'reality-tv',
                        text: 'Reality-TV '
                    },
                    {
                        value: 'romance',
                        text: 'Romance '
                    },
                    {
                        value: 'sci-fi',
                        text: 'Sci-Fi '
                    },
                    {
                        value: 'sport',
                        text: 'Sport '
                    },
                    {
                        value: 'talk-show',
                        text: 'Talk-Show '
                    },
                    {
                        value: 'thriller',
                        text: 'Thriller'
                    },
                    {
                        value: 'war',
                        text: 'War '
                    },
                    {
                        value: 'western',
                        text: 'Western'
                    }
                ]
            }
        },
        {
            xtype: 'mycombofield',
            fieldLabel: 'Rating:',
            name: 'minimum_rating',
            defaultValue: 0,
            value: 0,
            store: {
                data: [
                    {
                        value: 0,
                        selected: 'selected',
                        text: '0'
                    },
                    {
                        value: 9,
                        text: '9+'
                    },
                    {
                        value: 8,
                        text: '8+'
                    },
                    {
                        value: 7,
                        text: '7+'
                    },
                    {
                        value: 6,
                        text: '6+'
                    },
                    {
                        value: 5,
                        text: '5+'
                    },
                    {
                        value: 4,
                        text: '4+'
                    },
                    {
                        value: 3,
                        text: '3+'
                    },
                    {
                        value: 2,
                        text: '2+'
                    },
                    {
                        value: 1,
                        text: '1+'
                    }
                ]
            }
            
        },
        {
            xtype: 'mycombofield',
            fieldLabel: 'Order By:',
            name: 'order_by',
            defaultValue: 'latest',
            value: {
                value: 'latest',
                text: 'Latest'
            },
            store: {
                data: [
                    {
                        value: 'latest',
                        selected: 'selected',
                        text: 'Latest'
                    },
                    {
                        value: 'oldest',
                        text: 'Oldest'
                    },
                    {
                        value: 'seeds',
                        text: 'Seeds'
                    },
                    {
                        value: 'peers',
                        text: 'Peers'
                    },
                    {
                        value: 'year',
                        text: 'Year'
                    },
                    {
                        value: 'rating',
                        text: 'Rating'
                    },
                    {
                        value: 'likes',
                        text: 'Likes'
                    },
                    {
                        value: 'alphabetical',
                        text: 'Alphabetical '
                    },
                    {
                        value: 'downloads',
                        text: 'Downloads '
                    }
                ]
            }
        }
    
    ],
    
    plugins: [
        
        {
            ptype: 'rowwidget',
            
            widget: {xtype: 'moviesdp'}
        }
    ],
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
             text: ' Title ',
            dataIndex: 'title_long',
            flex: 1
        },
        {
            Text: 'Summary',
            dataIndex: 'summary',
            displayTip: true,
            flex: 2
        },
        {
            text: 'year',
            dataIndex: 'year',
            width: 100
        },
        {
            text: 'language',
            dataIndex: 'language',
            width: 100
            
        },
        {
            text: 'imdb_code',
            dataIndex: 'imdb_code',
            width: 100
        },
        {
            text: 'Released Year ',
            dataIndex: 'year',
            width: 100
        },
        {
            text: 'Rating',
            dataIndex: 'rating',
            width: 100,
            renderer: function(va, rec, el){
            }
        }
    ]
});