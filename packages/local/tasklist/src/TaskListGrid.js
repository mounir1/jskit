Ext.define('jskit.view.main.TaskListGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'taskgrid',
    
    title: 'Tasks List',
    iconCls: 'fa fa-film',
    scrollable: true,
    
    plugins: [
       
        {
            ptype: 'rowwidget',
            widget: {xtype: 'taskdp'}
        }
    ],
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            xtype: 'mytextcol',
            text: ' Title ',
            dataIndex: 'title',
            flex: 1
        },
        {
            xtype: 'mytextcol',
            text: 'Status',
            dataIndex: 'status'
        },
        {
            xtype: 'mytextcol',
            text: 'Summary',
            dataIndex: 'description',
            displayTip: true,
            flex: 1
        },
        {
            xtype: 'mytextcol',
            text: 'Owner',
            dataIndex: 'owner',
            flex: 1
        },
        {
            xtype: 'mytextcol',
            text: 'Hours ',
            dataIndex: 'hours',
            width: 100
        },
        {
            xtype: 'mytextcol',
            text: 'Attempts',
            dataIndex: 'attempts',
            width: 100
        },
        {
            xtype: 'mytextcol',
            text: 'Due Date',
            dataIndex: 'due',
            width: 100
        },
        {
            xtype: 'widgetactioncol',
          
        }
    ]
});