Ext.define('jskit.view.main.peopleList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.peoplelist',
    padding: 10,
    ref: 'employee/',
    items: [
        {
            xtype: 'peoplegrid'
        }
    ],
    edits: jskit.Edits.people_edits()
});