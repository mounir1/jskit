Ext.define('jskit.view.main.BookList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.booklist',
    controller: 'booklist',
    padding: 10,
    autoSelect: true,
    ref: 'books/',
    items: [
        {
            xtype: 'bookgrid'
        }
    ],
    edits: jskit.Edits.book_edits()
});