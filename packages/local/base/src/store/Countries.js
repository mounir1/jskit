Ext.define('jskit.store.Countries', {
    extend: 'Ext.data.Store',
    requires: [
        'jskit.model.Country'
    ],
    model: 'jskit.model.Country',
    storeId: 'CountriesStore',
    proxy: {
        type: 'memory',
        url: 'resources/Countries.json',
        reader: {
            type: 'json',
            rootProperty: 'countries'
        }
    },
    autoLoad: true
});