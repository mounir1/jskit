Ext.define('jskit.view.main.MyMoviesListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.mymovieslist',
    
    listen: {
        controller: {
            mymovieslist: {
                doPlayMovie: 'doPlayMovie'
            }
        }
    },
    
    doPlayMovie: function(view, record, i){
        let me = this,
            movie = record.data,
            parentList = view.up('list');
        jskit.Globals.createMediaPlayer({type:'video',link:movie.link});
    }
    
});