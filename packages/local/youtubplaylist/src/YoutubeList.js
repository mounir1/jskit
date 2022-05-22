Ext.define('jskit.view.main.YoutubeList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.youtubelist',
    padding: 10,
    viewModel: 'youtubelist',
    controller: 'youtubelist',
    items: [
        {
            xtype: 'youtubegrid'
        }
    ]
});