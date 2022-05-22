Ext.define('jskit.view.main.GBookListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.gbooklist',
    
    onBeforeRefresh: function(viewList, store){
        return new Promise((resolve, reject) => {
            let vm = viewList.getViewModel(),
                store = vm.get('remoteStore'),
                proxy = store.getProxy(),
                youTubeParams = vm.get('remoteParams')
                                  .getProxy()
                                  .getData();
            proxy.setExtraParams(youTubeParams);
            resolve();
        });
    },
    
    setMemoryData: function(paginStore, view, records){
        let me = this,
            data = [];
        records[0].data.items
                  .forEach(rec => {
                      rec = rec.volumeInfo;
                      rec.id = rec.id;
                      rec.thumbnail = rec.imageLinks.thumbnail;
                      data.push(rec);
                  });
        paginStore.getProxy()
                  .setData(data);
        paginStore.load();
    },
    
    onChanneSearch: function(fld, e){
        let list = fld.up('list'),
            vm = list.getViewModel(),
            remoteParams = vm.get('remoteParams'),
            params = remoteParams.proxy.getData();
        remoteParams.proxy.setData(Object.assign(params, {q: fld.value}));
    }
    
});