Ext.define('jskit.view.main.OrganizerListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.organizerlist',
    
    setMemoryData: function(paginStore, view, records){
        let me = this;
        view.down('imageview')
            .store
            .setData(records);
    }
});