Ext.define('jskit.view.main.NotesList', {
    extend: 'jskit.view.main.List',
    alias: 'widget.noteslist',
    padding: 10,
    ref: 'notes/',
    items: [
        {
            xtype: 'notesgrid'
        }
    ],
    
    edits: jskit.Edits.NoteEdits()
});