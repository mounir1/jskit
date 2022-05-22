Ext.define('jskit.view.main.PatientList', {
    extend: 'jskit.view.main.peopleList',
    alias: 'widget.patientlist',
    padding: 10,
    ref: 'paients/',
    items: [
        {
            xtype: 'patientgrid'
        }
    ]
});