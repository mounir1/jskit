Ext.define('jskit.view.main.YoutubeListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.youtubelist',
    
    onBeforeRefresh: function(viewList, store){
        return new Promise((resolve, reject) => {
            let vm = viewList.getViewModel(),
                store = vm.get('remoteStore'),
                proxy = store.getProxy(),
                youTubeParams = vm.get('youTubeParams')
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
                  .forEach(video => {
                      if (video.snippet.title !== 'Private video'){
                          video.snippet.imageUrl = video.snippet.thumbnails.default && video.snippet.thumbnails.default.url;
                          video.snippet.link = video.snippet.resourceId.videoId;
                          delete video.snippet.thumbnails;
                      }
                      data.push(video.snippet);
                  });
        paginStore.getProxy()
                  .setData(data);
        paginStore.load();
    },
    
    onYoutubeChannels: function(combo){
        combo.store.load({
            callback: function(records, operation, success){
                if (!success || !Ext.isEmpty(records)){
                    combo.setValue({
                        value: 'UCoVKKQImX43NtAULA5PY8sQ',
                        code: 'mounir1badi@gmail.com'
                    });
                }
            }
        });
    },
    
    onChannelId: function(fld, e){
        let list = fld.up('list'),
            vm = list.getViewModel(),
            youTubeParams = vm.get('filterVm'),
            playListsCombo = list.down('#playListCombo'),
            params = youTubeParams.proxy.getData(),
            selection = fld.getSelection();
        if (selection && selection.data){
            params.channelId = fld.getSelection().data.value;
            youTubeParams.proxy.setData(params);
            playListsCombo.events.afterrender.fire(playListsCombo);
        }
    },
    
    onPlayListChange: function(combo, value){
        let me = this,
            list = combo.up('list'),
            vm = list.getViewModel(),
            youTubeFilterVm = vm.get('filterVm'),
            youTubeParams = vm.get('youTubeParams'),
            playListsStore = vm.get('playListsRemoteStore'),
            params = youTubeFilterVm.proxy.getData();
        if (combo.events.afterrender.firing){
            if (combo.checked){
                combo.store.load();
            }
            else{
                combo.setStore(playListsStore);
                delete params.playlistId;
                playListsStore.proxy.setExtraParams(params);
                playListsStore.setListeners({
                    load: me.loadPlayLists,
                    args: [combo]
                });
                combo.checked = true;
            }
        }
        else{
            delete params.channelId;
            params.playlistId = value;
            youTubeParams.getProxy()
                         .setData(params);
        }
    },
    
    loadPlayLists: function(combo, store, records, success){
        let data = [];
        if (records){
            
            records[0].data.items.forEach(list => {
                data.push({
                    id: list.id,
                    title: list.snippet.title
                });
            });
            combo.store.setData(data);
        }
    },
    
    settingsWindow: function(btn){
        let            parentList = btn.up('list'),
            vm = parentList.getViewModel(),
            youTubeParams = vm.get('youTubeParams')
                              .getProxy()
                              .getData();
        
        new Ext.window.Window({
            autoShow: true,
            title: 'Play List Setting',
            parentList: parentList,
            modal: true,
            viewModel: {
                data: {
                    youTubeParams: youTubeParams
                }
            },
            controller: this,
            width: 350,
            height: 250,
            layout: 'vbox',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'apikey',
                            fieldLabel: 'ApiKey :',
                            bind: '{youTubeParams.key}',
                            labelAlign: 'right',
                            emptyText: 'Api key '
                        },
                        {
                            xtype: 'textfield',
                            reference: 'PlayList',
                            bind: '{youTubeParams.playlistId}',
                            fieldLabel: 'PlayList Id:',
                            labelAlign: 'right',
                            emptyText: 'Play List'
                        },
                        {
                            xtype: 'numberfield',
                            bind: '{youTubeParams.maxResults}',
                            fieldLabel: 'Limit :',
                            labelAlign: 'right',
                            emptyText: ' Limit'
                        }
                    ],
                    buttons: [
                        {
                            xtype: 'button',
                            text: 'Save',
                            margin: '10 0 0 200',
                            iconCls: 'x-fa fa-save',
                            handler: 'saveNewSettings'
                        }
                    ]
                }
            ]
        });
    },
    
    saveNewSettings: function(btn){
        var me = this,
            wind = btn.up('window'),
            list = wind.parentList,
            windVm = wind.getViewModel(),
            vm = list.getViewModel(),
            youTubeParams = vm.get('youTubeParams');
        youTubeParams.getProxy()
                     .setData(windVm.getData().youTubeParams);
        wind.destroy();
    }
});


