Ext.define('jskit.MenuDataCtrl', {
    singleton: true,
    
    dataRoot: function(){
        return [
            {
                text: jskitTranslations.tasks,
                iconCls: 'x-fa fa-edit',
                viewType: 'tasklist',
                leaf: true
            },
            {
                text: jskitTranslations.products,
                iconCls: 'x-fa fa-toolbox',
                viewType: 'productslist',
                leaf: true
            },
            {
                text: jskitTranslations.items,
                iconCls: 'x-fa fa-tools',
                viewType: 'itemsList',
                leaf: true
                
            },
            {
                text: jskitTranslations.images,
                iconCls: 'x-fa fa-image',
                data: [
                    {
                        text: jskitTranslations.images,
                        iconCls: 'x-fa fa-image',
                        viewType: 'imagesList',
                        leaf: true
                        
                    },
                    {
                        text: jskitTranslations.organizer,
                        iconCls: 'x-fa fa-cash-register',
                        viewType: 'organizerList',
                        leaf: true
                    }
                ]
            },
            {
                text: jskitTranslations.videos,
                iconCls: 'x-fa fa-video',
                data: [
                    {
                        text: jskitTranslations.videos,
                        iconCls: 'x-fa fa-video',
                        viewType: 'myvideosList',
                        leaf: true
                        
                    },
                    
                    {
                        text: ' Youtube ',
                        iconCls: 'x-fa fa-video',
                        viewType: 'youtubelist',
                        leaf: true
                    }
                ]
            },
            
            {
                text: jskitTranslations.movies,
                iconCls: 'x-fa fa-film',
                data: [
                    {
                        text: jskitTranslations.movies,
                        iconCls: 'x-fa fa-film',
                        viewType: 'moviesList',
                        leaf: true
                        
                    },
                    {
                        text: jskitTranslations.mymovies,
                        iconCls: 'x-fa fa-star',
                        viewType: 'mymoviesList',
                        leaf: true
                        
                    }
                ]
            },
            {
                text: jskitTranslations.mymusic,
                
                iconCls: 'x-fa fa-music',
                viewType: 'mymusicList',
                leaf: true
                
            },
            
            {
                text: jskitTranslations.news,
                iconCls: 'x-fa fa-newspaper',
                viewType: 'newslist',
                leaf: true
                
            },
            {
                text: jskitTranslations.books,
                iconCls: 'x-fa fa-book',
                data: [
                    
                    {
                        text: jskitTranslations.mybooks,
                        iconCls: 'x-fa fa-book',
                        viewType: 'booklist',
                        leaf: true
                    },
                    {
                        text: 'G Books',
                        iconCls: 'x-fa fa-book',
                        viewType: 'gbooklist',
                        leaf: true
                        
                    }
                ]
            }, {
                text: 'HR',
                iconCls: 'x-fa fa-users',
                data: [
                    
                    {
                        text: jskitTranslations.employees,
                        iconCls: 'x-fa fa-user',
                        viewType: 'peoplelist',
                        leaf: true
                    },
                    {
                        text: jskitTranslations.doctors,
                        iconCls: 'x-fa fa-user-md',
                        viewType: 'doctorlist',
                        leaf: true
                    }, {
                        text: jskitTranslations.patients,
                        iconCls: 'x-fa fa-user',
                        viewType: 'patientlist',
                        leaf: true
                    }
                ]
            },
            {
                text: jskitTranslations.translations,
                iconCls: 'x-fa fa-language',
                viewType: 'translations',
                leaf: true
            },
            {
                text: ' Calendar ',
                iconCls: 'x-fa fa-calendar',
                viewType: 'calendar-app',
                leaf: true
            },
            
            {
                text: '3D Test',
                iconCls: 'x-fa fa-cube',
                visible: false,
                viewType: 'mypanel',
                html: '<body style=\'margin:0px;\'><iframe id=\'emersyaIframe\' src=\'https://emersya.com/showcase/DT0STRJNW1\' allow=\'camera; gyroscope; accelerometer; magnetometer;\' frameborder=0 webkitallowfullscreen=\'\' mozallowfullscreen=\'\' allowfullscreen=\'\' width=\'100%\' height=\'490px\' style=\'border:none;display:block;\'></iframe><div class=\'configurationPanel\' style=\'position:absolute; top:20px; right:20px; background-color:rgba(0,0,0,0.1); padding:10px; box-sizing:border-box;border-radius: 30px;\'><div class=\'configurationPanelSubSectionChoiceSelector\' onmouseup=\'switchConfiguration("mat_black")\' style=\'margin:10px 5px; background-color:#070707; width:30px; height:30px; border-radius:15px; cursor:pointer\'></div><div class=\'configurationPanelSubSectionChoiceSelector\' onmouseup=\'switchConfiguration("glossy_teal")\' style=\'margin:10px 5px; background-color:#00b1ab; width:30px; height:30px; border-radius:15px; cursor:pointer\'></div></div><script type=\'text/javascript\'>var viewerIframe=null;var viewerActive=false;document.getElementById(\'emersyaIframe\').onload=function(){viewerIframe=document.getElementById(\'emersyaIframe\').contentWindow;window.removeEventListener(\'message\', viewerEventListener ,false);viewerIframe.postMessage({action : \'registerCallback\'}, \'*\');window.addEventListener(\'message\', viewerEventListener, false);viewerIframe.postMessage({action:\'getViewerState\'}, \'*\');};var viewerEventListener=function(event){if(event.data && event.data.action==\'onStateChange\'){if(event.data.state.viewerState==\'loaded\' || event.data.state.viewerState==\'fallbackloaded\'){viewerActive=true;}}if(event.data && event.data.action==\'onError\'){console.log(event);}};var switchConfiguration=function(configurationName){if(viewerActive){viewerIframe.postMessage({action:\'beginTransaction\'}, \'*\');viewerIframe.postMessage({action:\'setMaterialByName\',materialSettings : \'logo/\'+configurationName}, \'*\');viewerIframe.postMessage({action:\'endTransaction\'}, \'*\');}};</script></body>'
                ,
                leaf: true
                
            },
            {
                visible: false,
                text: '  Weather ',
                iconCls: 'x-fa fa-cloud',
                disabled: true,
                items: [
                    {
                        xtype: 'mainheader',
                        region: 'north'
                    },
                    {
                        html: '<b>TODO</b> April 2nd',
                        region: 'center'
                    }
                ]
            },
            
            {
                text: ' Scheduler Package',
                visible: false,
                disabled: true,
                iconCls: 'x-fa fa-list',
                items: [
                    {
                        xtype: 'mainheader',
                        region: 'north'
                    },
                    {
                        html: '<b>TODO</b> June 14th',
                        region: 'center'
                    }
                ]
            },
            {
                text: ' Calendar Package',
                iconCls: 'x-fa fa-calendar',
                visible: false,
                disabled: true,
                
                items: [
                    {
                        html: '<b>TODO</b> July 30th',
                        region: 'center'
                    }
                ]
            },
            {
                text: ' Currency Rates',
                iconCls: 'x-fa fa-money-bill-alt',
                visible: false,
                disabled: true,
                
                items: [
                    {
                        xtype: 'mainheader',
                        region: 'north'
                    },
                    {
                        html: '<b>TODO</b> August 3rd',
                        region: 'center'
                    }
                ]
            }
        
        ];
    }
});