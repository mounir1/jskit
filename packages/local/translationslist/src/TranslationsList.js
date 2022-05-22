Ext.define('jskit.view.main.TranslationsList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.translations',
    controller: 'translationslist',
    ref: 'translations/',
    
    items: [
        {
            xtype: 'translationsgrid'
        }
    ],
    
    edits: [
        {
            xtype: 'mypanel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'mytextfld',
                    fieldLabel: 'Key',
                    allowBlank: false,
                    bind: '{record.key}'
                }
            ]
        },
        {
            xtype: 'mypanel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.english}',
                        fieldLabel: '{translations.english}'
                    }
                },
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.french}',
                        fieldLabel: '{translations.french}'
                    }
                },
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.arabic}',
                        fieldLabel: '{translations.arabic}'
                    }
                }
            ]
        }, {
            xtype: 'mypanel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.turkish}',
                        fieldLabel: '{translations.turkish}'
                    }
                }, {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.german}',
                        fieldLabel: '{translations.german}'
                    }
                },
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.russian}',
                        fieldLabel: '{translations.russian}'
                    }
                },
                {
                    xtype: 'mytextfld',
                    bind: {
                        value: '{record.spanish}',
                        fieldLabel: '{translations.spanish}'
                    }
                }
            
            ]
        }
    ]
});
