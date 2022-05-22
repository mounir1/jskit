Ext.define('jskit.model.Image', {
    extend: 'Ext.data.Model',
    idProperty: 'title',
    fields: [
        'title', 'imageUrl', {
            name: 'leaf',
            defaultValue: true
        }
    ]
});