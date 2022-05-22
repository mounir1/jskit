Ext.define('jskit.view.component.SteackyNote', {
    extend: 'jskit.view.component.MyView',
    alias: 'widget.stickynotes',
    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable: 'Ext.ux.DataView.Draggable'
    },
    tpl: [
        '<tpl for=".">',
        '<div class="sticky-wrap" >',
        '<div class="note-title">{code}</div>' +
        '<div class="note-text"> {note} </div>' +
        '<div class="note-tools">' +
        '<i class="fa fa-star">{rating}</i>' +
        '<button class="note-tool"><i class="fa fa-edit"></i></button>' +
        '<button class="note-tool"><i class="fa fa-trash-alt"></i></button>' +
        '<button class="note-tool""><i class="fa fa-ellipsis-v"></i></button>' +
        '</div>' +
        ' <i style="display: none" >{id}</i>' +
        '</div></tpl>'
    ],
    
    itemSelector: 'div.sticky-wrap',
    multiSelect: true,
    singleSelect: false,
    cls: 'x-image-view',
    scrollable: true,
    
    listeners: {
        el: { ///Ext.dom.Element.html#events
            click: (event, target, rec, tw, kl) => {
                if (target.tagName === 'BUTTON'){
                    onButtonClick(target.childNodes[0].className);
                }
                else if (target.parentNode.tagName === 'BUTTON'){
                    onButtonClick(target.className);
                }
    
                function onButtonClick(className){
                    let stickyNotes = Ext.fly(target.closest('.x-component')).component,
                        record = stickyNotes.selection;
                    switch (className){
                        case 'fa fa-trash-alt':
                            Ext.Msg.alert('ALERT ' + record.data.id, 'Are you Sure you want to delete this Note ? ', function(btn){
                                if (btn == 'ok'){
                                    jskit.Globals.onDeleteRecord(record, 'myNotes');
                                }
                            });
    
                            break;
                        case 'fa fa-edit':
                            jskit.Globals.createJsKitDataForm({
                                itemId: 'DashNote',
                                isEdit: true,
                                remoteStore: stickyNotes.getStore(),
                                record: record,
                                edits: jskit.Edits.NoteEdits(),
                                title: 'Edit Note',
                                iconCls: 'x-fa fa-edit',
                                viewList: {ref: 'myNotes'}
                            });
                            break;
                        case 'fa fa-tools':
                            break;
    
                    }
                }
            },
            mouseover: (event, target) => {
                // el.style.backgroundColor = 'green';
                if (target.classList.contains('sticky-wrap')){
                    let stickyNotes = Ext.fly(target.parentNode).component,
                        records = stickyNotes.store.data.items,
                        id = target.childNodes[4].innerText,
                        rate = target.childNodes[2].childNodes[0].innerText;
                    jskit.Globals.displayRatingTip({
                        el: target,
                        val: rate,
                        viewList: {ref: 'myNotes'},
                        record: records.find(item => item.id === id)
                    });
                }
        
            },
            mouseout: function(event, target){
                // target.style.backgroundColor = 'transparent';
            }
        }
    },
    initComponent: function(){
        let url = Ext.DB_URL + '/myNotes.json';
        this.store = jskit.Globals.createFirebaseStore(url);
        
        //
        this.mixins.dragSelector.init(this);
        this.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'organizerDD'
            }
        });
        
        this.callParent(arguments);
    }
});
