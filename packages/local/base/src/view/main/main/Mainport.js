Ext.define('jskit.view.main.MainPort', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.app-mainport',
    
    requires: [
        'Ext.plugin.Viewport',
        'Ext.container.Viewport',
        'Ext.list.Tree',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'Ext.tab.Panel',
        'Ext.list.Tree',
        'Ext.menu.Menu',
        'Ext.Container',
        'Ext.util.Format',
        'Ext.tip.QuickTipManager',
        'Ext.calendar.panel.Panel',
        'Ext.util.KeyMap',
        
        'Ext.layout.container.Border',
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.tree.Column',
        'Ext.tree.View',
        'Ext.selection.TreeModel',
        'Ext.tree.plugin.TreeViewDragDrop'
    
    ],
    itemId: 'mainPort',
    
    viewModel: 'main',
    controller: 'main',
    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'mainheader',
            region: 'north'
        },
        {
            xtype: 'mainmenu',
            region: 'west'
        },
        {
            xtype: 'app-maintabs',
            region: 'center'
            
        },
        
        // {
        //     xtype: 'app-tree',
        //     region: 'west'
        // },
        {
            xtype: 'mainfooter',
            region: 'south'
        }
    ],
    
    listeners: {
        resize: 'onMainPortResize',
        afterrender: 'onMinportBeforeRender',
        // boxready: function(){
        //     Ext.require([
        //         'jskit.Globals',
                
        //         'jskit.view.main.MainFooter',
        //         'jskit.view.main.MainHeader',
                
        //         'jskit.view.component.Window',
        //         'jskit.view.component.MyPanel',
        //         'jskit.view.component.MyGrid',
        //         'jskit.view.component.MainTabs',
        //         'jskit.view.component.RightMenu',
                
        //         'jskit.view.fields.ComboBoxFldClass',
        //         'jskit.view.fields.NumberFldClass',
        //         'jskit.view.fields.TextAreaFldClass',
        //         'jskit.view.fields.TextFldClass',
                
        //         'jskit.view.main.List',
        //         'jskit.view.main.ListVC',
        //         'jskit.view.main.ListVC',
                
        //         'jskit.view.main.ImagesList',
        //         'jskit.view.main.ImagesListVC',
        //         'jskit.view.main.ImagesListGrid',
                
        //         'jskit.view.main.MoviesList',
        //         'jskit.view.main.MoviesListVC',
        //         'jskit.view.main.MoviesListGrid',
        //         'jskit.view.main.MoviesListVM',
                
        //         'jskit.view.main.MyVideosList',
        //         'jskit.view.main.MyVideosGrid',
                
        //         'jskit.view.main.MyMusicList',
        //         'jskit.view.main.MyMusicListVC',
        //         'jskit.view.main.MyMusicGrid',
                
        //         'jskit.view.main.YoutubeList',
        //         'jskit.view.main.YoutubeListVC',
        //         'jskit.view.main.YoutubeListVM',
        //         'jskit.view.main.YoutubeGrid',
                
        //         'jskit.view.main.MyMoviesList',
        //         'jskit.view.main.MyMoviesGrid',
        //         'jskit.view.main.MyMoviesListVC',
                
        //         'jskit.view.main.ProductsList',
        //         'jskit.view.main.ProductsListGrid',
                
        //         'jskit.view.main.ItemsGrid',
        //         'jskit.view.main.ItemsList',
                
        //         'jskit.view.main.NewsList',
        //         'jskit.view.main.NewsGrid',
        //         'jskit.view.main.NewsListVC',
        //         'jskit.view.main.NewsListVM',
                
        //         'jskit.view.main.TaskList',
        //         'jskit.view.main.TaskListGrid',
        //         'jskit.view.Tasks.TaskDp',
                
        //         'jskit.view.main.peopleList',
        //         'jskit.view.main.PeopleGrid',
                
        //         'jskit.view.main.DoctorsList',
        //         'jskit.view.main.DoctorsGrid',
                
        //         'jskit.view.main.PatientList',
        //         'jskit.view.main.PatientGrid',
                
        //         'jskit.view.main.BookList',
        //         'jskit.view.main.BookListGrid',
        //         'jskit.view.main.BookDp',
        //         'jskit.view.main.BookListVC',
                
        //         'jskit.view.main.GBookList',
        //         'jskit.view.main.GBookListGrid',
        //         'jskit.view.main.GBookListVC',
        //         'jskit.view.main.GBookListVM',
                
        //         'jskit.Organizer.AlbumTree',
        //         'jskit.Organizer.ImageView',
        //         'jskit.Organizer.OrgPanelList',
        //         'jskit.view.main.OrganizerListVC',
                
        //         'jskit.view.main.TranslationsList',
        //         'jskit.view.main.TranslationsGrid',
        //         'jskit.view.main.TranslationsListVC',
                
        //         'jskit.view.main.CalendarList',
        //         'jskit.view.main.CalendarListVC',
        //         'jskit.view.main.CalendarListVM',
        //         'jskit.view.profile.Side',
        //         'jskit.view.profile.SideViewModel',
        //         'jskit.view.profile.SideController',
        //         'jskit.view.calendar.Panel'
        //     ]);
        // }
    }
});