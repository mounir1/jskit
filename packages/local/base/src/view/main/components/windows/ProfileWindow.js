Ext.define('jskit.view.component.ProfileWindow', {
    extend: 'jskit.view.component.Window',
    alias: 'widget.profilewindow',
    width: 700,
    viewModel: 'main',
    
    title: 'Profile Setting',
    controller: 'main',
    autoShow: true,
    modal: true,
    
    height: 350,
    items: {
        xtype: 'form',
        layout: 'vbox',
        defaults: {
            defaults: {
                padding: 10
            }
        },
        items: [
                {
                    xtype: 'mypanel',
                    layout: 'hbox',
                    items: {
                        xtype: 'mytextareafld',
                        fieldLabel: 'Config ',
                        emptyText: 'Config',
                        height: 150,
                        maxHeight: 290,
                        value: !Ext.Object.isEmpty(config) ? JSON.stringify(config, null, 4) : {},
                        width: 600,
                        bind: '{config}'
                    }
                },
            {
            
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mycombofield',
                        fieldLabel: 'Themes',
                        value: theme || 'jskit-app',
                        displayField: 'text',
                        valueField: 'value',
                        store: {
                            data: [
                                {
                                    text: 'Theme 1',
                                    value: 'jskit-app'
                                },
                                {
                                    text: 'Theme 2',
                                    value: 'jskit-dark'
                                },
                                {
                                    text: 'Theme 3',
                                    value: 'jskit-white'
                                }
                            ]
                        },
                        listeners: {
                            change: function(combo, value){
                                Ext.util.CSS.swapStyleSheet(value, 'resources/' + value + '/' + value + '-all_1.css');
                                localStorage.setItem('appTheme', value);
                                // Ext.util.CSS.swapStyleSheet(value, 'resources/' + value + '/' + value + '-all_2.css');
                            }
                        }
                    },
                {
                    xtype: 'mycombofield',
                    fieldLabel: 'Projects Lists:',
                    itemId: 'ProjectsLists',
                    displayField: 'projectId',
                    valueField: 'projectId',
                    value: Ext.JsKitData.projectName,
                    store: {
                        data: jskit.ProjectList.getProjectList()
                    },
                    listeners: {
                        change: 'onProjectListChange'
                    }
                }
                ]
            }
            ],
            buttons: [
                {
                    xtype: 'button',
                    formBind: true,
                    disabled: true,
                    text: 'initialize App ',
                    handler: 'initializeApp'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'onCancel'
                }
            ]
        }
});