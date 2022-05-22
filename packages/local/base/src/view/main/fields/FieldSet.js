Ext.define('jskit.view.fields.FieldSetClass', {
    extend: 'Ext.form.FieldSet',
    controller: 'listvc',
    xtype: 'myfieldset'
});

Ext.define('OWeb.view.base.MyHtmlEditorFld', {
    extend: 'Ext.form.field.HtmlEditor',
    xtype: 'myhtmleditor',
    enableFont: false,
    frame: true,
    focusableContainer: true
    
});