Ext.define('jskit.view.main.MoviesListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.movieslist',
    
    setMemoryData: function(paginStore, view, records){
        let me = this;
        paginStore.getProxy()
                  .setData(records[0].data.movies);
        paginStore.load();
        me.updateConfigs(view, paginStore, records);
        
    },
    
    onBeforeRefresh: function(viewList, store){
        return new Promise((resolve, reject) => {
            
            let filterBar = viewList.down('toolbar'),
                proxy = store.getProxy(),
                params = proxy.getExtraParams();
            
            filterBar.items.items.forEach(fld => {
                if (fld.value && fld.value !== fld.defaultValue){
                    params[fld.name] = fld.value;
                }
            });
            proxy.setExtraParams(params);
            
            resolve();
        });
    },
    
    updateConfigs: function(view, pagingStore){
        let me = this,
            gridHeight = window.innerHeight - 200,
            grid = view.down('mygrid');
        grid.store.load();
        me.prepareTheGrid(grid, gridHeight, pagingStore);
    }
});