Ext.define('jskit.overrides.GridRowNumberer', {
    override: 'Ext.grid.column.RowNumberer',
    
    align: 'center',
    width: 64,
    text: null,
    
    onAdded: function(){
        var me = this;
        
        // Coalesce multiple item mutation events by routing them to a buffered function
        me.renumberRows = Ext.Function.createBuffered(me.renumberRows, 1, me);
        
        me.callParent(arguments);
        
        me.storeListener = me.getView()
                             .on({
                                 itemadd: me.renumberRows,
                                 itemremove: me.renumberRows,
                                 destroyable: true
                             });
    },
    
    onRemoved: function(){
        var me = this;
        
        me.callParent(arguments);
        
        if (me.storeListener){
            me.storeListener = me.storeListener.destroy();
        }
        
        if (me.renumberRows.timer){
            Ext.undefer(me.renumberRows.timer);
        }
        
        me.renumberRows = null;
        delete me.renumberRows;
    },
    
    constructor: function(config){
        let me = this,
            grid = config.$initParent.grid,
            list = grid.parentList;
        
        me.sortable = false;
        me.scope = me;
        
        
            me.listeners = {
                afterrender: function(){
                    this.titleEl.removeCls('x-column-header-inner');
                }
            };
            
            me.getStdListRowNumberItems(grid);
     
        
        me.callParent(arguments);
    },
    
    getStdListRowNumberItems: function(grid){
        let me = this;
        
        return [
            {
                xtype: 'button',
                iconCls: 'fa fa-filter fa-lg',
                width: 16,
                height: 20,
                listeners: {
                    click: 'showFilterBar',
                    arg: [grid]
                }
            }
        
        ];
    },
    
    defaultRenderer: function(value, metaData, record, rowIdx, colIdx, dataSource, view){
        var me = this,
            rowspan = me.rowspan,
            page = dataSource.currentPage,
            result = record ? view.store.indexOf(record) : value - 1;
        
        if (metaData && rowspan){
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }
        
        if (page > 1){
            result += (page - 1) * dataSource.pageSize;
        }
        return result + 1;
    },
    
    updater: function(cell, value, record, view, dataSource){
        var cellInner = cell && cell.querySelector(this.getView().innerSelector);
        
        if (cellInner){
            cellInner.innerHTML =
                this.defaultRenderer(value, null, record, null, null, dataSource, view);
        }
    },
    
    renumberRows: function(){
        if (this.destroying || this.destroyed){
            return;
        }
        
        // eslint-disable-next-line vars-on-top
        var me = this,
            view = me.getView(),
            dataSource = view.dataSource,
            recCount = dataSource.getCount(),
            context = new Ext.grid.CellContext(view).setColumn(me),
            rows = me.getView().all,
            index = rows.startIndex;
        
        while (index <= rows.endIndex && index < recCount){
            context.setRow(index);
            me.updater(context.getCell(true), ++index, null, view, dataSource);
        }
    }
    
});
