Ext.define('jskit.view.component.MyGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'mygrid',
    requires: [
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.RowWidget',
        'Ext.grid.column.Number',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.toolbar.Paging',
        'Ext.Toolbar',
        'Ext.selection.CheckboxModel',
        'jskit.plugins.GridSearch',
        'jskit.plugins.FilterBar',
        'jskit.overrides.GridRowWidget'
    ],
    minHeight: 400,
    minWidth: 700,
    layout: 'fit',
    frame: true,
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
    
    dataTools: [],
    
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
    hoverActions: [],
    
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
        me.plugins = me.getGridPlugins();
        me.columns = me.getGridCols();
        // me.features = me.getGridFeatures(currUserSettings, parentList);
        // me.viewConfig = me.getGridViewConfig(currUserSettings, parentList);
        me.selModel = me.defineSelModel();
        //
        // me.expandedRows = {};
        // me.getCols(currUserSettings, parentList);
        // header configs . on mode .
        me.collapsible = false;
        me.title = '';
        me.tools = [];
        me.iconCls = '';
        //////
        me.tbar = me.getListDataTools(me, me.parentList);
        me.contextMenu = me.createContextMenu(me, me.recordActions);
        me.callParent(arguments);
    },
    
    getGridPlugins: function(){
        let me = this,
            defaultPlgins = [
                {
                    ptype: 'filterbar',
                    pluginId: 'filters',
                    dock: 'top'
                },
                {
                    ptype: 'gridsearch',
                    queryParam: 'search',
                    targetCt: 'toolbar[dock=bottom]',
                    mode: 'local'
                },
                {
                    ptype: 'gridexporter'
                }
            ];
        if (me.plugins){
            return me.plugins.concat(defaultPlgins);
        }
        else{
            return defaultPlgins;
        }
    },
    
    getGridCols: function(){
        let me = this;
        me.columns.forEach(col => {
            if (!col.xtype){
                col.xtype = 'mytextcol';
            }
        });
        return me.columns;
        
    },
    
    defineSelModel: function(){
        let me = this;
        
        return {
            pruneRemoved: false,
            selType: 'checkboxmodel'
        };
        
        // return {
        //     pruneRemoved: false,
        //     selType: 'rowmodel'
        // };
        //
    },
    
    getListDataTools: function(me){
        let filterVm = me.parentList.getViewModel()
                         .get('filterVm'),
            vmdata = filterVm ? filterVm
                .proxy
                .getData() : {},
            vm = {
                data: {
                    filterVm: vmdata
                }
            },
            items =
                [
                    {
                        type: 'refresh',
                        iconCls: 'x-fa fa-sync-alt',
                        itemId: 'refresh',
                        hidden: me.noRefresh,
                        handler: 'onRefresh'
                    },
                    {
                        type: 'plus',
                        hidden: me.noAdd,
                        iconCls: 'x-fa fa-plus',
                        itemId: 'add',
                        handler: 'onAdd'
                    },
                    {
                        type: 'export',
                        hidden: !me.export,
                        iconCls: 'x-fa fa-file-download',
                        itemId: 'export',
                        handler: 'onExport'
                    }
                    
                    // {
                    //     iconCls: 'fa fa-filter fa-lg',
                    //     width: 28,
                    //     height: 28,
                    //     tooltip: 'Show  filters',
                    //     handler: function(btn, e){
                    //         var filters;
                    //         filters = me.getFilterBar();
                    //         if (!filters){
                    //             console.warn('Cant find filter plugin for this grid');
                    //         }
                    //          filters.setVisible.call(me, !me.filterBarPluginData.visible);
                    //         // btn.setTooltip((!me._filterBarPluginData.visible ? me._filterBarPluginData.showHideButtonTooltipDo : me._filterBarPluginData.showHideButtonTooltipUndo));
                    //     }
                    // }
                ].concat(me.dataTools),
            tbar = {
                xtype: 'toolbar',
                defaultButtonUI: 'default',
                items: items
            };
        
        if (!Ext.isEmpty(me.dataTools)){
            tbar.viewModel = vm;
        }
        return tbar;
        
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
                // me.parentList.autoSelect && view.setSelection(record);
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
        let columnIdx = 3,
            parentList = view.up('list'),
            floating = document.createElement('float'),
            tablebody = item.getElementsByTagName('tbody')[0] || view.el.dom.getElementsByTagName('tbody')[0],
            onColumn = tablebody.getElementsByTagName('td')[columnIdx],
            wrapper = document.createElement('div'),
            button = document.createElement('button'),
            colwidth = onColumn.style.width.match(/\d+/)[0],
            hoverActions = view.grid.hoverActions,
            colors = ['red', 'green', 'blue', 'orange', 'black'];
        
        button.style.backgroundColor = 'Transparent';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.backgroundRepeat = 'no-repeat';
        button.style.overflow = 'hidden';
        button.style.outline = 'none';
        
        wrapper.style.backgroundColor = 'Transparent';
        wrapper.style.position = 'absolute';
        wrapper.style.top = '7px';
        // wrapper.style.right = '200px';
        wrapper.style.zIndex = '1';
        
        hoverActions.forEach(item => {
            let actionBtn = button.cloneNode(true),
                color = item.color || colors[Math.floor(Math.random() * colors.length)];
            actionBtn.innerHTML = '<a data-tip=' + '"' + item.text + '"' + 'style=' + '"' + 'font-size: 1.2em;padding:.2px; color:' + color + '"' + ' class=' + '"' + (item.iconCls) + '"' + '></a>';
            actionBtn.onclick = function(){
                parentList.controller.fireEventArgs(item.click, [view, record, index]);
            };
            wrapper.appendChild(actionBtn);
        });
        
        // let expanderbtn = button.cloneNode(true),
        //     elipsisbtn = button.cloneNode(true);
        //
        // expanderbtn.innerHTML = '<a style="color:blue;font-size: 1.5em;padding:1px" class="fa fa-share"></a>';
        //
        // expanderbtn.onclick = function(){
        // };
        // elipsisbtn.innerHTML = '<a style="color:black;font-size: 1.5em;padding:1px" class="fa fa-star"></a>';
        //
        // elipsisbtn.onclick = function(){
        // };
        
        // wrapper.appendChild(elipsisbtn);
        // wrapper.appendChild(expanderbtn);
        
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