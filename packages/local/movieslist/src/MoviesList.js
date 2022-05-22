Ext.define('jskit.view.main.MoviesList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.moviesList',
    viewModel: 'movieslist',
    controller: 'movieslist',
    padding: 10,
    autoSelect: true,
    items: [
        {
            xtype: 'moviesgrid'
        }
    ],
    edits: []
});