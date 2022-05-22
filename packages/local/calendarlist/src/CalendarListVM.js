Ext.define('jskit.view.main.CalendarListVM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.calendar-app',

    data: {
        user: null,         // { name, icon }
        calendars: null
    }
});
