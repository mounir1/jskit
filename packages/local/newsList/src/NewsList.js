Ext.define('jskit.view.main.NewsList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.newslist',
    padding: 10,
    controller: 'newslist',
    viewModel: 'newslist',
    items: {
        xtype: 'newsgrid'
    },
    listeners: {
        afterrender: 'loadStores'
    },
    edits: []
    // parts: {
    //     widget1: {
    //         viewTemplate: {
    //             xtype: 'newsgrid'
    //             xtype: 'newsgrid'
    //             xtype: 'newsgrid'
    //             xtype: 'newsgrid'
    //             xtype: 'newsgrid'
    //         }
    //     },
    //     widget2: {
    //         viewTemplate: {
    //             title: 'Al Jazeera English'
    //             // html: ' <iframe class="iframe" src="https://www.youtube.com/embed/RjIjKNcr_fk?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"
    //             // allowfullscreen></iframe>'
    //         }
    //     },
    //     widget3: {
    //         viewTemplate: {
    //             title: 'France 24 Live'
    //             // html: '<iframe class="iframe" src="https://www.youtube.com/embed/RjIjKNcr_fk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    //         }
    //     },
    //     widget4: {
    //         viewTemplate: {
    //             title: 'euronews Live'
    //             // html: '<iframe class="iframe" src="https://www.youtube.com/embed/9Auq9mYxFEE?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"
    //             // allowfullscreen></iframe>'
    //         }
    //     },
    //     widget5: {
    //         viewTemplate: {
    //             title: ' ABC News Live'
    //             // html: '<iframe class="iframe" src="https://www.youtube.com/embed/sSTH5sBWcVQ?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"
    //             // allowfullscreen></iframe>'
    //         }
    //     },
    
    //     widget6: {
    //         viewTemplate: {
    //             title: 'Bloomberg Global News Live'
    //             // html: '<iframe class="iframe" src="https://www.youtube.com/embed/dp8PhLsUcFE?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"
    //             // allowfullscreen></iframe>'
    //         }
    //     }
    
    // },
    // defaultContent: [
    //     {
    //         type: 'widget1', //maps to the parts key
    //         columnIndex: 0
    //     },
    //     {
    //         type: 'widget3',
    //         columnIndex: 0
    //     },
    //     {
    //         type: 'widget2',
    //         columnIndex: 0
    //     },
    //     {
    //         type: 'widget4',
    //         columnIndex: 0
    //     },
    //     {
    //         type: 'widget5',
    //         columnIndex: 0
    //     },
    //     {
    //         type: 'widget6',
    //         columnIndex: 0
    //     }
    // ]
});