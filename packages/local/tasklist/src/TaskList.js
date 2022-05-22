Ext.define('jskit.view.main.TaskList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.tasklist',
    
    padding: 10,
    autoSelect: true,
    ref: 'tasks/',
    items: [
        {
            xtype: 'taskgrid'
        }
    ],
    edits: jskit.Edits.Task_Edits()
});