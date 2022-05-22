Ext.define('jskit.view.main.TranslationsListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.translationslist',
    
    setMemoryData: function(paginStore, view, records){
        let me = this,
            keys = [],
            languages = ['english', 'arabic', 'french', 'german', 'turkish', 'spanish', 'russian'];
        me.localRecords = [];
        window.getLocalTranslationFile()
              .then(res => {
            
                  records.forEach(ob => {
                      res.forEach(item => {
                          if (!keys.includes(ob.data.key) && item.key === ob.data.key){
                              applyLanguages(ob.data, item);
                              keys.push(item.key);
                          }
                    
                      });
                      if (!keys.includes(ob.data.key)){
                          applyLanguages(ob.data, {}, false, true);
                          ob.commit();
                      }
                  });
            
                  paginStore.getProxy()
                            .setData(records);
                  paginStore.load();
            
                  res.forEach(item => {
                      records.forEach(ob => {
                          if (item.key === ob.data.key){
                              applyLanguages(ob.data, item);
                              keys.push(item.key);
                          }
                      });
                      if (!keys.includes(item.key)){
                          applyLanguages({}, item, true);
                      }
                  });
            
                  function applyLanguages(record, item, sync, remote){
                      if (remote){
                          assignLanguages(record, record);
                      }
                      else if (sync){
                          record.key = item.key;
                          assignLanguages(record, item);
                          me.localRecords.push(paginStore.add(record));
                      }
                      else{
                          assignLanguages(record, item);
                      }
                  }
            
                  function assignLanguages(record, localRecord){
                      for (let i = 0; i < languages.length; i++){
                          record[languages[i]] = localRecord[languages[i]] || '****';
                      }
                  }
            
                  me.updateLocaTranslations(paginStore);
              });
        
    },
    
    updateLocaTranslations: function(localStore){
        localStore.data.items.forEach(item => {
            jskitTranslations[item.data.key] = item.data.english;
        });
    },
    
    syncTranslations: function(){
        let me = this,
            view = me.view,
            vm = view.getViewModel(),
            remoteStore = vm.data.remoteStore;
        if (me.localRecords.length > 0){
            for (let i = 0; i < me.localRecords.length; i++){
                me.doAddNewRecord(me.localRecords[i][0].data, remoteStore);
            }
        }
        me.localRecords = [];
        remoteStore.load();
    }
});