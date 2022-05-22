Ext.define('jskit.Edits', {
    singleton: true,
    
    people_edits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        bind: {
                            fieldLabel: '{translations.firstname}',
                            value: '{record.firstname}'
                        }
                    },
                    {
                        xtype: 'mytextfld',
                        bind: {
                            fieldLabel: '{translations.lastname}',
                            value: '{record.lastname}'
                        }
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
                            fieldLabel: 'code',
                            value: '{record.code}'
                        }
                    },
                    {
                        xtype: 'mytextfld',
                        bind: {
                            fieldLabel: '{translations.email}',
                            value: '{record.email}'
                        }
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items:
                    {
                        xtype: 'mytextareafld',
                        flex: 1,
                        bind: {
                            value: '{record.address}',
                            fieldLabel: '{translations.address}'
                        }
                    }
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                
                items: [
                    {
                        xtype: 'mynumberfld',
                        bind: {
                            value: '{record.phone}',
                            fieldLabel: '{translations.phone}'
                        }
                    },
                    {
                        xtype: 'mydatefld',
                        bind: {
                            value: '{record.birthday}',
                            fieldLabel: '{translations.birthday}'
                        }
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                defaultType: 'checkbox',
                items: [
                    {
                        bind: {
                            value: '{record.smoke}',
                            fieldLabel: '{translations.smoke}'
                        }
                    },
                    {
                        bind: {
                            value: '{record.alcohol}',
                            fieldLabel: '{translations.alcohol}'
                        }
                    }
                ]
            }
        ];
    },
    
    default_List_Edits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Movie Title',
                        bind: '{record.title}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Author',
                        bind: '{record.author}'
                    }
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field()
            },
            {
                xtype: 'mytextareafld',
                fieldLabel: 'Description',
                width: 500,
                height: 300,
                bind: '{record.description}'
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'link ',
                        bind: '{record.link}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Deep Link',
                        bind: '{record.deeplink}'
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Downloads',
                        bind: '{record.downloadsNo}'
                    },
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Likes',
                        bind: '{record.likesNo}'
                    }
                ]
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'filefield',
                        name: 'movie',
                        fieldLabel: 'File upload'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        boxLabel: ' Copy Right',
                        bind: '{record.copyright}'
                    }
                ]
            }
        ];
    },
    
    Task_Edits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'task Title',
                        bind: '{record.title}'
                    },
                    {
                        xtype: 'myfbcombofield',
                        ref: '/users',
                        list: 'peoplelist',
                        displayValue: 'code',
                        valueField: 'code',
                        edits: jskit.Edits.people_edits(),
                        name: 'users',
                        bind: {
                            fieldLabel: '{translations.owner}',
                            value: '{record.owner}'
                        }
                    }
                ]
            }, {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Doc Link',
                        bind: '{record.doclink}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Release Link ',
                        bind: '{record.link}'
                    }
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field()
            },
            {
                xtype: 'mytextareafld',
                // fieldLabel: 'Description',
                width: '99%',
                minHeight: 160,
                emptyText: 'Description',
                bind: '{record.description}'
                
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Due Date',
                        bind: '{record.due}'
                    },
                    {
                        
                        xtype: 'myfbcombofield',
                        fieldLabel: 'Status',
                        displayValue: 'code',
                        valueField: 'code',
                        labelAlign: 'right',
                        ref: '/taskstats',
                        name: 'status',
                        bind: '{record.status}',
                        defaultRecords: {
                            code: 'PLAN',
                            value: 1
                        }
                    }
                ]
            }
        ];
    },
    
    NoteEdits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Note Code',
                        bind: '{record.code}'
                    }
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field()
            },
            {
                xtype: 'myhtmleditor',
                bind: {
                    value: '{record.note}'
                }
            }
        ];
        
    },
    
    book_edits: function(){
        
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'task Title',
                        bind: '{record.title}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Editor',
                        bind: '{record.editor}'
                    }
                ]
            }, {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'File Link',
                        bind: '{record.fileUrl}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: ' Link ',
                        bind: '{record.link}'
                    }
                ]
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    jskit.Edits.DD_Field(),
                    {
                        xtype: 'mytextareafld',
                        // fieldLabel: 'Description',
                        minHeight: 160,
                        emptyText: 'Description',
                        bind: '{record.description}'
                    }
                ]
            }
        ];
    },
    
    music_edits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Music Title',
                        bind: '{record.title}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Singer',
                        bind: '{record.singer}'
                    }
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field({
                    storageUrls: 'fileUrls',
                    storageUrl: 'fileUrl'
                })
            },
            {
                xtype: 'mytextareafld',
                fieldLabel: 'Description',
                width: 500,
                height: 300,
                bind: '{record.description}'
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        flex: 1,
                        fieldLabel: 'File Url',
                        bind: '{record.fileUrl}'
                    },
                    {
                        xtype: 'mytextfld',
                        flex: 1,
                        fieldLabel: 'Image Url',
                        bind: '{record.imageUrl}'
                    }
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field()
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'link ',
                        bind: '{record.link}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Deep Link',
                        bind: '{record.deeplink}'
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Downloads',
                        bind: '{record.downloadsNo}'
                    },
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Likes',
                        bind: '{record.likesNo}'
                    }
                ]
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        boxLabel: ' Copy Right',
                        bind: '{record.copyright}'
                    }
                ]
            }
        ];
    },
    
    DD_Field: function(type){
        let keys = type || {
            storageUrls: 'imageUrls',
            storageUrl: 'imageUrl'
        };
        return {
            xtype: 'container',
            height: 200,
            padding: 20,
            border: 2,
            layout: 'responsivecolumn',
            style: {
                borderColor: 'grey',
                borderStyle: 'dashed'
            },
            html: '<div>Drag file here</div>',
            items: [
                {
                    xtype: 'fileuploadfield',
                    buttonOnly: true,
                    hideLabel: true,
                    listeners: {
                        change: 'buttonOnlyChange'
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'filedropper',
                    overCls: 'foo',
                    callback: function(files){
                        let container = this.target,
                            wind = container.up('window'),
                            currRec = wind.getViewModel()
                                          .get('record');
                        Object.assign(wind, keys);
                        
                        jskit.Globals.prepareFiles(files, wind, currRec, container);
                    }
                }
            ]
        };
    },
    
    category_edits: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Category Title',
                        bind: '{record.title}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Code',
                        bind: '{record.code}'
                    }
                ]
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items:
                    {
                        xtype: 'mytextareafld',
                        fieldLabel: 'Description',
                        flex: 1,
                        height: 300,
                        bind: '{record.description}'
                    }
            }
        ];
    },
    
    product_list: function(){
        return [
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        bind: {
                            fieldLabel: '{translations.title}',
                            value: '{record.title}'
                        }
                    },
                    {
                        xtype: 'myfbcombofield',
                        ref: '/category',
                        list: 'categorylist',
                        displayValue: 'code',
                        valueField: 'code',
                        edits: jskit.Edits.category_edits(),
                        name: 'category',
                        bind: {
                            fieldLabel: '{translations.category}',
                            value: '{record.category}'
                        }
                    }
                
                ]
            },
            {
                xtype: 'myfieldset',
                collapsed: true,
                collapsible: true,
                items: jskit.Edits.DD_Field()
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items:
                    {
                        xtype: 'mytextareafld',
                        fieldLabel: 'Description',
                        flex: 1,
                        height: 300,
                        bind: '{record.description}'
                    }
            },
            
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'St link ',
                        bind: '{record.link}'
                    },
                    {
                        xtype: 'mytextfld',
                        fieldLabel: 'Link',
                        bind: '{record.deeplink}'
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Old Price',
                        bind: '{record.oldprice}'
                    },
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Price',
                        bind: '{record.price}'
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Downloads',
                        bind: '{record.downloadsNo}'
                    },
                    {
                        xtype: 'mynumberfld',
                        fieldLabel: 'Likes',
                        bind: '{record.likesNo}'
                    }
                ]
            },
            {
                xtype: 'mypanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Main Slider',
                        bind: '{record.ismainslider}'
                    },
                    
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Favorit Deals',
                        bind: '{record.fave}'
                    }
                ]
            }
        ];
    },
    
    mainFooterItems: function(){
        return [
            {
                itemId: 'zoomItem',
                listeners: {
                    el: {
                        click: 'toggleMenu'
                    }
                }
            },
            {
                bind: '{jsKit.projectName}'
                
            },
            '->',
            {
                xtype: 'rating',
                value: 5
            },
            '-',
            {
                bind: {
                    html: Ext.currentUser.email
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.ip}'
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.browser}'
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.isp}'
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.location.city}'
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.location.lat}'
                }
            },
            '-',
            {
                bind: {
                    html: '{jsKit.location.lng}'
                }
            },
            '-',
            {
                bind: {
                    html: '<b>' + '{APPTODAY}' + '</b>'
                }
            }
        ];
    }
});