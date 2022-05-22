Ext.define('jskit.view.main.MainVC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainvc',

    requires: [
        'Ext.exporter.text.CSV', 'Ext.exporter.text.TSV', 'Ext.exporter.text.Html', 'Ext.exporter.excel.Xml', 'Ext.exporter.excel.Xlsx'
    ],


    mixins: [
        'jskit.mixins.RemoteComboCtrl', 'jskit.mixins.DataCtrl'
    ],


    translaionComboAfterRender: function (combo) {
        combo.store.proxy.setData(jskit.Globals.translationsStore());
        combo.store.load();
    },

    onLanguageChange: function (combo, value) {
        let me = this,
            vm = me.getViewModel(),
            mainmenu = jskit.Globals.compQuery('mainmenu'),
            store = mainmenu.getStore();

        offlineSettings.lang = value.toLowerCase();

        localStorage.removeItem('currLang');
        window.getLocalTranslationFile(offlineSettings.lang)
            .then(file => {
                jskitTranslations = file;
                location.hostname !== 'localhost' && localStorage.setItem('currLang', JSON.stringify(jskitTranslations));
                vm.set('translations', jskitTranslations);
                combo.store.proxy.setData([]);
                combo.events.afterrender.fire(combo);
                store.getRootNode()
                    .removeAll();
                store.setRootNode({
                    expanded: true,
                    defaultRootProperty: 'data',
                    data: jskit.MenuDataCtrl.dataRoot()
                });
            });

    },




    doCreateView: function (node) {
        let me = this,
            deffered = new Ext.Deferred();
        deffered.resolve(Ext.create({
            xtype: node.get('viewType'),
            title: node.get('text'),
            iconCls: node.get('iconCls')
        }));

        return deffered.promise;
    },

    toggleMenu: function () {
        let mainPort = Ext.getBody().component,
            mianHeader = mainPort.down('mainheader'),
            mainMenu = mainPort.down('mainmenu'),
            zoomItem = mainPort.down('#zoomItem');
        if (mainPort.items.length === 4) {
            mainMenu.destroy();
            mianHeader.destroy();
            zoomItem.setHtml('<b>Exit Zoom</b>');
        } else {
            mainPort.add([{
                xtype: 'mainmenu',
                region: 'west'
            }, {
                xtype: 'mainheader',
                region: 'north'
            }]);
            zoomItem.setHtml('');
        }

    },

});