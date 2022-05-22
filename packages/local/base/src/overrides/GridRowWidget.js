Ext.define('jskit.overrides.GridRowWidget', {
    override: 'Ext.grid.plugin.RowWidget',
    
    privates: {
        viewOverrides: {
        
            // handleEvent: function(e){
            //     // An override applied to the client view so that it ignores events from within the expander row
            //     // Ignore all events from within our rowwidget
            //     if (e.getTarget('.' + this.rowExpander.rowIdCls, this.body)){
            //         return;
            //     }
            //
            //     this.callParent([e]);
            // },
        
            // onFocusEnter: function(e){
            //     //     // An override applied to the client view so that it ignores focus moving into the expander row
            //     if (e.event.getTarget('.' + this.rowExpander.rowIdCls, this.body)){
            //         return;
            //     }
            //
            //     this.callParent([e]);
            // },
            toggleChildrenTabbability: function(enableTabbing){
                // An override applied to the client view so that it does not interfere
                // with tabbability of elements within the expander rows.
                var focusEl = this.getTargetEl(),
                    rows = this.all,
                    restoreOptions = {skipSelf: true},
                    saveOptions = {
                        skipSelf: true,
                        includeSaved: false
                    },
                    i;
            
                for (i = rows.startIndex; i <= rows.endIndex; i++){
                    // Extract the data row from each row.
                    // We do not interfere with tabbing in the the expander row.
                    focusEl = Ext.fly(this.getRow(rows.item(i)));
                
                    if (!focusEl){
                        continue;
                    }
                
                    if (enableTabbing){
                        focusEl.restoreTabbableState(restoreOptions);
                    }
                    else{
                        // Do NOT includeSaved
                        // Once an item has had tabbability saved, do not increment its save level
                        focusEl.saveTabbableState(saveOptions);
                    }
                }
            }
        },
    
        toggleRow: function(rowIdx, record){
            var me = this,
                view = me.normalView || me.view,
                rowNode = view.getNode(rowIdx),
                normalRow = Ext.fly(rowNode),
                nextBd,
                wasCollapsed,
                addOrRemoveCls,
                widget,
                recId = record.id,
                records = me.grid.store.data.items,
                vm;
         
            view.grid.setSelection(record);
            if (!normalRow){
                return;
            }
        
            nextBd = normalRow.down(me.rowBodyTrSelector, true);
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls);
            addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls';
        
            normalRow[addOrRemoveCls](me.rowCollapsedCls);
        
            Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
        
            Ext.suspendLayouts();
            if (wasCollapsed){ // old fixes results multiple requests ,, the issue with pagination and row number on filter . (afterrender event)
                me.recordsExpanded[record.internalId] = true;
                widget = me.addWidget(view, record);
                vm = widget.lookupViewModel();
                widget.renderedDp = true;
                // view.grid.expandedRows[recId] = {};
            }
            else{
                delete me.recordsExpanded[record.internalId];
                // delete view.grid.expandedRows[recId];
                widget = me.getWidget(view, record);
                widget.renderedDp = false;
            }
            me.view.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd, widget);
        
            if (vm){
                vm.notify();
            }
            Ext.resumeLayouts(true);
        
            if (me.scrollIntoViewOnExpand && wasCollapsed){
                me.grid.ensureVisible(rowIdx);
            }
        
            // if (wasCollapsed && !currUserSettings.multi_row_widget){
            //     collapseAll();
            // }
            //
            // function collapseAll(){
            //     for (var i = 0; i < view.all.count; i++){
            //         if (rowIdx !== i){
            //             record = records[i];
            //             rowNode = view.all.elements[i];
            //             normalRow = Ext.fly(rowNode);
            //             nextBd = normalRow.down(me.rowBodyTrSelector, true);
            //             wasCollapsed = normalRow.hasCls(me.rowCollapsedCls);
            //             if (!wasCollapsed){
            //                 addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls';
            //                 normalRow[addOrRemoveCls](me.rowCollapsedCls);
            //                 Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
            //                 Ext.suspendLayouts();
            //                 delete me.recordsExpanded[record.internalId];
            //                 widget = me.getWidget(view, record);
            //                 me.view.fireEvent('collapsebody', rowNode, record, nextBd, widget);
            //                 view.updateLayout();
            //                 if (vm){
            //                     vm.notify();
            //                 }
            //                 Ext.resumeLayouts(true);
            //
            //                 if (me.scrollIntoViewOnExpand && wasCollapsed){
            //                     me.grid.ensureVisible(rowIdx);
            //                 }
            //             }
            //         }
            //     }
            // }
        },
    
    }
});