Ext.define('jskit.view.main.MyMoviesList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.mymoviesList',
    padding: 10,
    controller: 'mymovieslist',
    ref: 'movies/',
    items: [
        {
            xtype: 'mymoviesgrid'
        }
    ]
});