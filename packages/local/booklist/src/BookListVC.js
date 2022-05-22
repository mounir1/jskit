Ext.define('jskit.view.main.BookListVC', {
    extend: 'jskit.view.main.ListVC',
    alias: 'controller.booklist',
    
    listen: {
        controller: {
            booklist: {
                doReadBook: 'doReadBook'
            }
        }
    },
    
    doReadBook: function(view, record, i){
        let me = this,
            book = record.data;
        if (record.fileData){
            openBook(record.fileData);
        }
        else{
            getFile(book.fileUrl);
        }
        
        function getFile(url){
            fetch(url)
                .then(function(res){
                    res.blob()
                       .then(function(blob){
                           var reader = new FileReader();
                           reader.addEventListener('loadend', function(){
                               openBook(record.fileData = reader.result);
                           });
                           reader.readAsDataURL(blob);
                       });
                });
        }
        
        function openBook(data){
            jskit.Globals.createMediaPlayer({type:'file',file:data, title:book.title});
        }
    }
});