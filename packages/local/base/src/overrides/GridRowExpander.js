Ext.define('jskit.overrides.GridRowExpander', {
    override: 'Ext.grid.plugin.RowExpander',
    
    expandOnDblClick: true,
    
    init: function(grid){
        var me = this,
            // Plugin attaches to topmost grid if lockable
            ownerLockable = grid.lockable && grid,
            view,
            lockedView,
            normalView;
        
        if (ownerLockable){
            me.lockedGrid = ownerLockable.lockedGrid;
            me.normalGrid = ownerLockable.normalGrid;
            lockedView = me.lockedView = me.lockedGrid.getView();
            normalView = me.normalView = me.normalGrid.getView();
        }
        
        Ext.apply(grid, {
            expander: me,
            getExpanderRow: function(index, rec){
                me.toggleRow(index, rec);
            }
        });
        
        me.callParent([grid]);
        me.grid = grid;
        view = me.view = grid.getView();
        
        // If the owning grid is lockable, ensure the collapsed class is applied to the locked side by adding
        // a row processor to both views.
        if (ownerLockable){
            me.bindView(lockedView);
            me.bindView(normalView);
            me.addExpander(me.lockedGrid.headerCt.items.getCount() ? me.lockedGrid : me.normalGrid);
            
            // Add row processor which adds collapsed class.
            // Ensure tpl and view can access this plugin via a "rowExpander" property.
            lockedView.addRowTpl(me.addCollapsedCls).rowExpander =
                normalView.addRowTpl(me.addCollapsedCls).rowExpander =
                    lockedView.rowExpander =
                        normalView.rowExpander = me;
            
            // If our client grid part of a lockable grid, we listen to its ownerLockable's processcolumns
            ownerLockable.mon(ownerLockable, {
                processcolumns: me.onLockableProcessColumns,
                lockcolumn: me.onColumnLock,
                unlockcolumn: me.onColumnUnlock,
                scope: me
            });
        }
        // Add row processor which adds collapsed class
        else{
            me.bindView(view);
            // Ensure tpl and view can access this plugin
            view.addRowTpl(me.addCollapsedCls).rowExpander = view.rowExpander = me;
            me.addExpander(grid);
            grid.on('beforereconfigure', me.beforeReconfigure, me);
        }
    },
    
    addExpander: function(expanderGrid){
        
        var me = this,
            selModel = expanderGrid.getSelectionModel(),
            checkBoxPosition = selModel.injectCheckbox;
        // me.expanderColumn = expanderGrid.headerCt.insert(0, me.getHeaderConfig());
        
        // If a CheckboxModel, and it's position is 0, it must now go at position one because this
        // cell always gets in at position zero, and spans 2 columns.
        if (checkBoxPosition === 0 || checkBoxPosition === 'first'){
            checkBoxPosition = 1; // userInbox module with no numberer col ???
        }
        
        selModel.injectCheckbox = checkBoxPosition;
        
    },
    
    toggleRow: function(rowIdx, record){
        var me = this,
            // If we are handling a lockable assembly,
            // handle the normal view first
            view = me.normalView || me.view,
            fireView = view,
            rowNode = view.getNode(rowIdx),
            normalRow = Ext.fly(rowNode),
            lockedRow,
            nextBd,
            wasCollapsed,
            addOrRemoveCls,
            ownerLockable = me.grid.lockable && me.grid;
        
        if (!normalRow){
            return;
        }
        nextBd = normalRow.down(me.rowBodyTrSelector, true);
        wasCollapsed = normalRow.hasCls(me.rowCollapsedCls);
        addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls';
        normalRow[addOrRemoveCls](me.rowCollapsedCls);
        Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
        me.recordsExpanded[record.internalId] = wasCollapsed;
        Ext.suspendLayouts();
        
        // Sync the collapsed/hidden classes on the locked side
        if (ownerLockable){
            // It's the top level grid's LockingView that does the firing when there's a lockable assembly involved.
            fireView = ownerLockable.getView();
            
            // Only attempt to toggle lockable side if it is visible.
            if (me.lockedGrid.isVisible()){
                
                view = me.lockedView;
                
                // The other side must be thrown into the layout matrix so that
                // row height syncing can be done. If it is collapsed but floated,
                // it will not automatically be added to the layout when the top
                // level grid layout calculates its layout children.
                view.lockingPartner.updateLayout();
                
                // Process the locked side.
                lockedRow = Ext.fly(view.getNode(rowIdx));
                // Just because the grid is locked, doesn't mean we'll necessarily have a locked row.
                if (lockedRow){
                    lockedRow[addOrRemoveCls](me.rowCollapsedCls);
                    
                    // If there is a template for expander content in the locked side, toggle that side too
                    nextBd = lockedRow.down(me.rowBodyTrSelector, true);
                    Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
                }
            }
            // We're going to need a layout run to synchronize row heights
            ownerLockable.syncRowHeightOnNextLayout = true;
        }
        
        fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);
        view.refreshSize(true);
        
        Ext.resumeLayouts(true);
        
        if (me.scrollIntoViewOnExpand && wasCollapsed){
            me.grid.ensureVisible(rowIdx);
        }
    }
});