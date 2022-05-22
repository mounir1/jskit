Ext.define('jskit.view.main.ImagesListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.imageslist',
    
    // onBeforeRefresh: function(viewList, store){
    //     return new Promise((resolve, reject) => {
    //         let viewer = viewList.items.items[1];
    //         viewer && viewer.destroy();
    //         resolve();
    //     });
    // },
    

    
    // updateConfigs: function(view, pagingStore, records){
    //     let me = this,
    //         gridHeight = window.innerHeight - 750,
    //         grid = view.down('mygrid');
    //     me.prepareTheGrid(grid, gridHeight, pagingStore);
    //     // me.upadateImageViewer(view, records);
    // },
    
    upadateImageViewer: function(viewlist, records){
        
        var urls = [];
        var pages = [];
        records.forEach(rec => {
            urls.push(rec.data.imageUrl);
        });
        var maxImagesPerPage = 4;
        var zoomedImage = Ext.create('Ext.Img', {
            src: null,
            id: 'large-image',
            height: 600,
            border: 1,
            style: {
                borderColor: '#D9E6F6',
                borderStyle: 'solid'
            }
        });
        
        pages.push([]);
        
        for (var urlIndex = 0, imagesInPage = 0, currentPageIndex = 0; urlIndex < urls.length; urlIndex++, imagesInPage++){
            if (imagesInPage == maxImagesPerPage){
                pages.push([]);
                
                currentPageIndex++;
                imagesInPage = 0;
            }
            pages[currentPageIndex].push(Ext.create('Object', {
                src: urls[urlIndex]
            }));
        }
        
        var imagesStore = Ext.create('Ext.data.Store', {
            
            data: pages[0]
        });
        
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div align="center" style="border:1px solid #D9E6F6;height:100px; width:200px;">',
            '<img  style="height: 600px; width: 100%; object-fit: contain" onmouseover= Ext.getCmp(\'large-image\').setSrc(\'{src}\') src="{src}" />',
            '</div>',
            '</tpl>'
        );
        
        var view = Ext.create('Ext.view.View', {
            height: 500,
            width: 200,
            store: imagesStore,
            tpl: imageTpl,
            id: 'imageView',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images available'
        });
        
        var bottomBar = {
            layout: {
                pack: 'center'
            },
            items: [
                {
                    text: '<<',
                    disabled: true,
                    id: 'specimen-left',
                    handler: function(){
                        changePage('previous');
                    }
                }, {
                    text: '>> ',
                    id: 'specimen-right',
                    disabled: !pages && pages[0] && pages[0][0] && pages[0][0].src,
                    handler: function(){
                        changePage('next');
                    }
                },
                '->',
                {
                    id: 'specimen-title',
                    text: 'Pagina <b>1</b> di <b>' + pages.length + '</b>',
                    xtype: 'title'
                }
            ]
        };
        
        if (pages && pages[0] && pages[0][0] && pages[0][0].src){
            zoomedImage
                .setSrc(pages[0][0].src);
        }
        
        window.changePage = function(type){
            var zoomedView = Ext.getCmp('specimen'),
                currentPage = zoomedView.currentPage,
                pages = zoomedView.pages;
            
            if (type === 'next' && !Ext.isEmpty(pages[0])){
                currentPage = nextPage(currentPage, pages);
            }
            else if (type === 'previous'){
                currentPage = previousPage(currentPage, pages);
            }
            Ext.getCmp('imageView')
               .getStore()
               .setData(pages[currentPage]);
            zoomedView.currentPage = currentPage;
            zoomedImage
                .setSrc(pages[currentPage][0].src);
            Ext.getCmp('specimen-title')
               .setText('Pagina <b>' + (currentPage + 1) + '</b> di <b>' + pages.length + '</b>');
        };
        
        window.nextPage = function(currentPage, pages){
            handlePagingButtons(++currentPage, pages);
            return currentPage;
        };
        
        window.previousPage = function(currentPage, pages){
            handlePagingButtons(--currentPage, pages);
            return currentPage;
        };
        
        window.handlePagingButtons = function(currentPage, pages){
            if (currentPage == 0){
                Ext.getCmp('specimen-left')
                   .setDisabled(true);
            }
            else if (currentPage == 1){
                Ext.getCmp('specimen-left')
                   .setDisabled(false);
            }
            if (currentPage == pages.length - 2){
                Ext.getCmp('specimen-right')
                   .setDisabled(false);
            }
            else if (currentPage == pages.length - 1){
                Ext.getCmp('specimen-right')
                   .setDisabled(true);
            }
        };
        viewlist.add({
            xtype: 'mypanel',
            currentPage: 0,
            pages: pages,
            height: 600,
            id: 'specimen',
            layout: 'hbox',
            items: [
                view,
                zoomedImage
            ],
            bbar: bottomBar
        });
    }
});