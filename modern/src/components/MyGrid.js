Ext.define('jskit.view.component.MyGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'mygrid',
    requires: [
        // 'Ext.grid.plugin.RowExpander',
        // 'Ext.grid.plugin.RowWidget',
        // 'Ext.grid.column.Number',
        // 'Ext.grid.plugin.RowEditing',
        // 'Ext.grid.selection.SpreadsheetModel',
        // 'Ext.toolbar.Paging',
        'Ext.Toolbar',
        // 'Ext.selection.CheckboxModel',
        // 'jskit.plugins.GridSearch',
        // 'jskit.plugins.FilterBar'
    ],
    minHeight: 400,
    minWidth: 700,
    layout: 'fit',
    frame: true,
    collapsible: true,
    multiSelect: true,
    columnLines: true,
    viewConfig: {
        stripeRows: true,
        trackOver: false,
        preserveScrollOnRefresh: true,
        deferEmptyText: true,
        emptyText: 'No Data'
    },
    bind: {
        store: '{pagingStore}'
    },
    
    tools: [
        {
            type: 'refresh',
            handler: 'onRefresh'
        },
        {
            type: 'plus',
            handler: 'onAdd'
        }
    ],
    
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            bind: {
                store: '{pagingStore}'
            },
            displayInfo: true,
            dock: 'bottom'
        }
    ],
    
    contextMenu: [],
    
    recordActions: [
        {
            xtype: 'addrecordtofaveitem'
        },
        {
            xtype: 'socialshareitem'
        }
    ],
    
    initComponent: function(){
        let me = this;
        
        me.parentList = me.up('list');
        
        me.listeners = me.setMyGridListeners();
        // me.reference = glb.getCurrentSMO(me, true) + 'Grid';
        // me.columns = me.getThisGridCols(currUserSettings, parentList);
        // me.plugins = me.getGridPlugins(currUserSettings, parentList); //plugin settings ...
        // me.features = me.getGridFeatures(currUserSettings, parentList);
        // me.viewConfig = me.getGridViewConfig(currUserSettings, parentList);
        // me.selModel = me.defineSelModel(currUserSettings, parentList);
        //
        // me.expandedRows = {};
        // me.getCols(currUserSettings, parentList);
        me.contextMenu = me.createContextMenu(me, me.recordActions);
        me.callParent(arguments);
    },
    
    createContextMenu: function(recordActions){
        return Ext.create('Ext.menu.Menu', {
            currGrid: this,
            items: recordActions
        });
    },
    
    setMyGridListeners: function(){
        let me = this;
        return {
            itemmouseenter: function(view, record, item, index, e, options){
                me.displayFloatingButtons(me, view, record, item, index, e);
                me.parentList.autoSelect && view.setSelection(record);
                e.position.column && e.position.column.displayTip && me.displayColumnCellTip(me, record, e.position.getCell(), e.position.column.dataIndex, item);
            },
            
            itemmouseleave: function(view, record, item, index, e, options){
                var tablebody = item.getElementsByTagName('tbody')[0],
                    tip = jskit.Globals.compQuery('#grid-tip'),
                    actionsButtons = tablebody.getElementsByTagName('float')[0];
                if (actionsButtons){
                    actionsButtons.remove();
                }
                
                if (actionsButtons){
                    actionsButtons.remove();
                }
                if (tip || item.tip){
                    try{
                        tip = jskit.Globals.compQuery('#grid-tip') && tip.destroy();
                    }
                    catch (e){
                        console.log(e);
                    }
                }
            },
            
            itemcontextmenu: 'oItemContextMenu',
            itemdblclick: 'onUpdate'
        };
    },
    
    callContextMenu: function(self, event, compactMode, view, record){
        let me = this,
            ownerCtxMenu = view.up().ownerGrid.contextMenu,
            multiSelect = view.up()
                              .getSelection() && view.up()
                                                     .getSelection().length > 1;
        
        self.contextMenu && !Ext.isEmpty(self.contextMenu) ? self.contextMenu.showAt(event.getXY()) : null;
    },
    
    displayFloatingButtons: function(me, view, record, item, index, e){
        let columnIdx = 1,
            floating = document.createElement('float'),
            tablebody = item.getElementsByTagName('tbody')[0] || view.el.dom.getElementsByTagName('tbody')[0],
            onColumn = tablebody.getElementsByTagName('td')[columnIdx],
            wrapper = document.createElement('div'),
            button = document.createElement('button'),
            colwidth = onColumn.style.width.match(/\d+/)[0];
        
        button.style.backgroundColor = 'Transparent';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.backgroundRepeat = 'no-repeat';
        button.style.overflow = 'hidden';
        button.style.outline = 'none';
        
        wrapper.style.backgroundColor = 'seashell';
        wrapper.style.position = 'absolute';
        wrapper.style.top = '7px';
        wrapper.style.zIndex = '1';
        
        let expanderbtn = button.cloneNode(true),
            elipsisbtn = button.cloneNode(true);
        
        expanderbtn.innerHTML = '<a style="color:blue;font-size: 1.5em;padding:1px" class="fa fa-share"></a>';
        
        expanderbtn.onclick = function(){
        };
        elipsisbtn.innerHTML = '<a style="color:black;font-size: 1.5em;padding:1px" class="fa fa-star"></a>';
        
        elipsisbtn.onclick = function(){
        };
        
        wrapper.appendChild(elipsisbtn);
        wrapper.appendChild(expanderbtn);
        
        let wrapperWidth = wrapper.childElementCount * 36;
        wrapper.style.width = wrapperWidth.toString() + 'px';
        floating.appendChild(wrapper);
        (+colwidth) < wrapperWidth && view.grid.columns[columnIdx].setWidth(wrapperWidth);
        onColumn.appendChild(floating);
    },
    
    displayColumnCellTip: function(me, record, cell, dataIndex, item){
        let text = record.get(dataIndex),
            display = text && text.includes('https://') ? '<img width="500" height="500" src="' + text + '">' : text;
        jskit.Globals.autoHideTooltip({
            el: cell.el,
            delegate: dataIndex,
            id: 'grid-tip',
            trackMouse: true,
            autoHide: false,
            hideDelay: 3000000, // auto close to infinity 5 minute., // hide delay, when mouse move outside target (target is grid all area)
            text: display,
            anchor: 'center'
        });
        item.tip = true;
        
        // https://cloud.mail.ru/public/22Tt/3AoXcNopj
    }
    
});