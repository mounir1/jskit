Ext.define('jskit.view.main.DoctorsList', {
    extend: 'jskit.view.main.peopleList',
    alias: 'widget.doctorlist',
    padding: 10,
    ref: 'doctors/',
    items: [
        {
            xtype: 'doctorgrid'
        }
    ]
});