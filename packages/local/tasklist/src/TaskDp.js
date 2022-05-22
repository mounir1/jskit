Ext.define('jskit.view.Tasks.TaskDp', {
    extend: 'jskit.view.component.DpTabs',
    alias: 'widget.taskdp',
    xtype: 'taskdp',
    items: [
        {
            xtype: 'noteslist',
            title: jskitTranslations.notes
        }
    ]
});