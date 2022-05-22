Ext.define('jskit.view.main.NewsListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.newslist',
    
    requires: [
        'jskit.store.Countries'
    ],
    
    onBeforeRefresh: function(viewList, store){
        return new Promise((resolve, reject) => {
            let vm = viewList.getViewModel(),
                store = vm.get('remoteStore'),
                proxy = store.getProxy(),
                params = vm.get('newsParams')
                           .getProxy()
                           .getData();
            proxy.setExtraParams(params);
            resolve();
        });
    },
    
    saveNewSettings: function(btn){
        var me = this,
            wind = btn.up('window'),
            list = wind.parentList,
            windVm = wind.getViewModel(),
            vm = list.getViewModel(),
            params = vm.get('newsParams');
        params.getProxy()
              .setData(windVm.getData().newsParams);
        wind.destroy();
    },
    
    settingsWindow: function(btn){
        let
            parentList = btn.up('list'),
            vm = parentList.getViewModel(),
            newsParams = vm.get('newsParams')
                           .getProxy()
                           .getData();
        
        new Ext.window.Window({
            autoShow: true,
            title: 'News Setting',
            parentList: parentList,
            modal: true,
            viewModel: {
                data: {
                    newsParams: newsParams
                }
            },
            controller: this,
            width: 350,
            height: 250,
            layout: 'vbox',
            items: [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country :',
                            labelAlign: 'right',
                            bind: '{newsParams.country}',
                            margin: '10 0 10 0 ',
                            displayField: 'name',
                            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {
                                        'name': 'USA',
                                        'value': 'us'
                                    },
                                    {
                                        'name': 'China',
                                        'value': 'ch'
                                    },
                                    {
                                        'name': 'Algeria',
                                        'value': 'dz'
                                    },
                                    {
                                        'name': 'Turkey',
                                        'value': 'tr'
                                    },
                                    {
                                        'name': 'France',
                                        'value': 'fr'
                                    },
                                    {
                                        'name': 'Germany',
                                        'value': 'gr'
                                    },
                                    {
                                        'name': 'England',
                                        'value': 'en'
                                    }
                                ]
                            }),
                            valueField: 'value',
                            queryMode: 'local'
                            
                        },
                        
                        {
                            // Create the combo box, attached to the states data store
                            xtype: 'combo',
                            fieldLabel: 'Category :',
                            bind: '{newsParams.category}',
                            labelAlign: 'right',
                            
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {
                                        'name': 'Business',
                                        'value': 'business'
                                    },
                                    {
                                        'name': 'Entertainment',
                                        'value': 'entertainment'
                                    },
                                    {
                                        'name': 'Health',
                                        'value': 'health'
                                    },
                                    {
                                        'name': 'Science',
                                        'value': 'science'
                                    },
                                    {
                                        'name': 'Sports',
                                        'value': 'sports'
                                    },
                                    {
                                        'name': 'Technology',
                                        'value': 'technology'
                                    }
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                            
                        },
                        {
                            xtype: 'textfield',
                            reference: 'apikey',
                            bind: '{newsParams.apiKey}',
                            fieldLabel: 'ApiKey :',
                            labelAlign: 'right',
                            emptyText: 'get api key from newsapi.org'
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
    
    onSwitchToModern: function(){
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
            this.onSwitchToModernConfirmed, this);
    },
    
    onSwitchToModernConfirmed: function(choice){
        if (choice === 'yes'){
            var s = window.location.search;
            
            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '')
                 .replace(/^\?/, '');
            
            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },
    
    onItemSelected: function(sender, record){
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    
    onConfirm: function(choice){
        if (choice === 'yes'){
            //
        }
    },
    
    onVerifyTap: function(btn){
        console.log(btn);
        Ext.Msg.alert('todo', 'TODO ' + btn);
    },
    
    onLinkTap: function(btn){
        console.log(btn);
        Ext.Msg.alert('todo', 'TODO ' + btn);
    },
    
    exportTo: function(){
        var me = this;
        
        me.exportSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: 'Excel xlsx (all items)',
                    handler: me.exportToXlsx,
                    scope: me
                }, {
                    text: 'Excel xml (all items)',
                    handler: me.exportToXml,
                    scope: me
                }, {
                    text: 'CSV (all items)',
                    handler: me.exportToCSV,
                    scope: me
                }, {
                    text: 'TSV (all items)',
                    handler: me.exportToTSV,
                    scope: me
                }, {
                    text: 'HTML (all items)',
                    handler: me.exportToHtml,
                    scope: me
                }, {
                    text: 'Cancel',
                    ui: 'confirm',
                    handler: me.closeExportTo,
                    scope: me
                }
            ]
        });
        Ext.Viewport.add(me.exportSheet);
        me.exportSheet.show();
    },
    
    closeExportTo: function(){
        this.exportSheet = Ext.destroy(this.exportSheet);
    },
    
    exportToXml: function(){
        this.doExport({
            type: 'excel03',
            title: 'Pivot grid export demo',
            fileName: 'GridExport.xml'
        });
    },
    
    exportToCSV: function(){
        this.doExport({
            type: 'csv',
            title: 'Pivot grid export demo',
            fileName: 'GridExport.csv'
        });
    },
    
    exportToTSV: function(){
        this.doExport({
            type: 'tsv',
            title: 'Pivot grid export demo',
            fileName: 'GridExport.csv'
        });
    },
    
    exportToHtml: function(){
        this.doExport({
            type: 'html',
            title: 'Pivot grid export demo',
            fileName: 'GridExport.html'
        });
    },
    
    exportToXlsx: function(){
        this.doExport({
            type: 'excel07',
            title: 'Pivot grid export demo',
            fileName: 'GridExport.xlsx'
        });
    },
    
    doExport: function(config){
        this.closeExportTo();
        this.getView()
            .saveDocumentAs(config);
    },
    
    onBeforeDocumentSave: function(view){
        view.mask({
            xtype: 'loadmask',
            message: 'Document is prepared for export. Please wait ...'
        });
    },
    
    onDocumentSave: function(view){
        view.unmask();
    },
    onSwitchToClassic: function(){
        Ext.Msg.confirm('Switch to Classic', 'Are you sure you want to switch toolkits?',
            'onSwitchToClassicConfirmed', this);
    },
    onSwitchToClassicConfirmed: function(choice){
        if (choice === 'yes'){
            var obj = Ext.Object.fromQueryString(location.search);
            
            delete obj.modern;
            
            obj.classic = '';
            
            location.search = '?' + Ext.Object.toQueryString(obj)
                                       .replace('classic=', 'classic');
        }
        else{
            var button = this.lookup('toolkitSwitch');
            
            button.setValue(Ext.isModern ? 'modern' : 'classic');
        }
    }
    
});