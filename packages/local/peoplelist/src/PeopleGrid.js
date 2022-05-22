Ext.define('jskit.view.main.PeopleGrid', {
    extend: 'jskit.view.component.MyGrid',
    xtype: 'peoplegrid',
    iconCls: 'fa fa-person',
    title: 'Employee List',
    
    columns: [
        {
            xtype: 'rownumberer'
        },
        {
            text: 'First Name ',
            dataIndex: 'firstname',
            displayTip: true,
            width: 140
        },
        {
            text: 'Last Name',
            displayTip: true,
            dataIndex: 'lastname',
            width: 140
        },
        {
            text: 'Birthday',
            dataIndex: 'birthday',
            width: 120
        },
        {
            text: 'E mail',
            displayTip: true,
            dataIndex: 'email',
            width: 160
        },
        {
            text: 'Address',
            dataIndex: 'adresse',
            displayTip: true,
            width: 150
        },
        {
            text: 'Tel',
            displayTip: true,
            dataIndex: 'tel',
            width: 120
        },
        {
            xtpe: 'myboolcol',
            text: 'Fumez',
            dataIndex: 'smoker',
            width: 60
        },
        {
            xtpe: 'myboolcol',
            text: 'Alcohol',
            dataIndex: 'alcohol',
            width: 60
        },
        {xtype:'widgetactioncol'}
    ]
});