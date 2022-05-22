Ext.define('jskit.model.Country', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'capital',
        type: 'string'
    }, {
        name: 'region',
        type: 'string'
    }, {
        name: 'subRegion',
        type: 'string'
    }]
});
