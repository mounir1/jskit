Ext.define('jskit.view.col.MyBoolCol', {
    extend: 'Ext.grid.column.Boolean',
    xtype: 'myboolcol',
    labelAlign: 'top',
    align: 'top',
    displayField: 'text',
    valueField: 'value',
    editable: true
});

Ext.define('jskit.view.col.MyTxtCol', {
    extend: 'Ext.grid.column.Column',
    xtype: 'mytextcol',
    
    filter: {
        type: 'string',
        xtype: 'mytextfld'
    },
    editable: true
});

Ext.define('jskit.view.col.GridActionCol', {
    extend: 'Ext.grid.column.Action',
    xtype: 'actioncol',
    
    width: 60,
    sortable: false,
    menuDisabled: true,
    align: 'center',
    
    items: [
        {
            icon: 'https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/delete_16x16.gif',
            tooltip: 'Delete',
            handler: 'onDelete'
        }
    ]
});

Ext.define('jskit.view.col.GridWidgetActionCol', {
    extend: 'Ext.grid.column.Widget',
    xtype: 'widgetactioncol',
    width: 50,
    sortable: false,
    menuDisabled: true,
    align: 'center',
    
    widget: {
        xtype: 'button',
        menu: [
            {
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Item',
                handler: 'onUpdate'
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: 'onDelete'
            }
        ],
        listeners: {
            click: function(btn){
                let grid = btn.up('grid');
                if (Ext.isEmpty(grid.getSelection())){
                    grid.setSelection(btn.getWidgetRecord());
                }
            }
        }
    }
});


