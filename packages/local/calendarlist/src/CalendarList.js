Ext.define('jskit.view.main.CalendarList', {
    extend: 'Ext.Container',
    xtype: 'calendar-app',

    controller: 'calendar-app',
    viewModel: 'calendar-app',

    layout: 'fit',

    items: [{
        xtype: 'app-calendar',
        reference: 'calendar',
        views: {
            day: {
                startTime: 0,
                endTime: 24
            },
            week: {
                startTime: 0,
                endTime: 24
            }
        },
        bind: {
            store: '{calendars}'
        },
        sideBarHeader: {
            xtype: 'app-profile-side'
        }
    }]
});