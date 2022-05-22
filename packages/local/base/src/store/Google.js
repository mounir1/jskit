Ext.define('jskit.store.Google', {
    extend: 'Ext.calendar.store.Calendars',
    alias: 'store.calendar-google',

    requires: [
        // 'Ext.google.data.CalendarsProxy'  , //fails mainport on production
    ],

    autoSync: true,

    proxy: {
        type: 'google-calendars'
    }
});
