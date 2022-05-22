Ext.define('jskit.plugins.FilterBar', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.filterbar',
    require: [
        'Ext.window.MessageBox',
        'Ext.container.Container',
        'Ext.util.DelayedTask',
        'Ext.layout.container.HBox',
        'Ext.data.ArrayStore',
        'jskit.view.base.ClearButton',
        'jskit.view.base.OperatorButton',
        'Ext.container.Container',
        'Ext.util.DelayedTask',
        'Ext.data.ArrayStore',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox'
    ],
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    updateBuffer: 1000, // buffer time to apply filtering when typing/selecting
    
    columnFilteredCls: Ext.baseCSSPrefix + 'column-filtered', // CSS class to apply to the filtered column header
    
    visible: false, // renders the filters hidden by default, use in combination with showShowHideButton
    
    showShowHideButton: true, // add show/hide button in actioncolumn header if found, if not a new small column is created
    showHideButtonTooltipDo: 'Show filter bar', // button tooltip show
    showHideButtonTooltipUndo: 'Hide filter bar', // button tooltip hide
    showHideButtonIconCls: 'filter', // button iconCls
    
    showClearButton: true, // use Ext.ux.form.field.ClearButton to allow user to clear each filter, the same as showShowHideButton
    showClearAllButton: true, // add clearAll button in actioncolumn header if found, if not a new small column is created
    clearAllButtonIconCls: 'clear-filters', // css class with the icon of the clear all button
    clearAllButtonTooltip: 'Clear all filters', // button tooltip
    
    autoStoresRemoteProperty: 'autoStores', // if no store is configured for a combo filter then stores are created automatically, if remoteFilter is true then use this property to return arrayStores
                                            // from the server
    autoStoresNullValue: '###NULL###', // value send to the server to expecify null filter
    autoStoresNullText: '[empty]', // NULL Display Text
    autoUpdateAutoStores: false, // if set to true combo autoStores are updated each time that a filter is applied
    
    enableOperators: true, // enable operator selection for number and date filters
    
    booleanTpl: {
        xtype: 'combo',
        queryMode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        editable: false,
        store: [
            [null, '(ALL)'],
            [true, 'Yes'],
            [false, 'No']
        ],
        operator: 'eq'
    },
    dateTpl: {
        xtype: 'datefield',
        editable: true,
        tooltip: '',//todo disable default tooltip ...
        submitFormat: 'Y-m-d',
        operator: 'eq'
    },
    floatTpl: {
        xtype: 'numberfield',
        allowDecimals: true,
        minValue: 0,
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
        operator: 'eq'
    },
    numberTpl: { //HOTDEV  intTpl
        xtype: 'numberfield',
        allowDecimals: false,
        minValue: 0,
        operator: 'eq'
    },
    stringTpl: {
        xtype: 'textfield',
        operator: 'like'
    },
    comboTpl: {
        xtype: 'combo',
        queryMode: 'local',
        forceSelection: true,
        editable: false,
        triggerAction: 'all',
        operator: 'eq'
    },
    listTpl: {
        xtype: 'combo',
        queryMode: 'local',
        forceSelection: true,
        editable: false,
        triggerAction: 'all',
        multiSelect: true,
        operator: 'in'
    },
    
    constructor: function(){
        let me = this;
        me.mixins.observable.constructor.call(me);
        me.callParent(arguments);
        
    },
    
    // private
    init: function(grid){
        var me = this;
        
        grid.on({
            columnresize: me.resizeContainer,
            columnhide: me.resizeContainer,
            columnshow: me.resizeContainer,
            beforedestroy: me.unsetup,
            reconfigure: me.resetup,
            scope: grid
        });
        
        // MIGRATION  It's no longer needed to add events before firing.
        // grid.addEvents('filterupdated');
        
        Ext.apply(grid, {
            filterBar: me,
            getFilterBar: function(){
                return this.filterBar;
            }
        });
        
        // me.boolTpl.store[0][1] = Ext.MessageBox.buttonText.yes;
        // me.boolTpl.store[1][1] = Ext.MessageBox.buttonText.no;
        
        me.setup.call(grid);
    },
    
    // private
    setup: function(){
        var grid = this,
            plugin = grid.getFilterBar();
        
        grid.filterBarPluginData = {};
        
        // configs from plugin, specific for grid and used in grid dcontext are stored in grid context
        grid.filterBarPluginData.updateBuffer = plugin.updateBuffer;
        grid.filterBarPluginData.columnFilteredCls = plugin.columnFilteredCls;
        grid.filterBarPluginData.showShowHideButton = plugin.showShowHideButton;
        grid.filterBarPluginData.showHideButtonTooltipDo = plugin.showHideButtonTooltipDo;
        grid.filterBarPluginData.showHideButtonTooltipUndo = plugin.showHideButtonTooltipUndo;
        grid.filterBarPluginData.showHideButtonIconCls = plugin.showHideButtonIconCls;
        grid.filterBarPluginData.showClearButton = plugin.showClearButton;
        grid.filterBarPluginData.showClearAllButton = plugin.showClearAllButton;
        grid.filterBarPluginData.clearAllButtonIconCls = plugin.clearAllButtonIconCls;
        grid.filterBarPluginData.clearAllButtonTooltip = plugin.clearAllButtonTooltip;
        grid.filterBarPluginData.autoStoresRemoteProperty = plugin.autoStoresRemoteProperty;
        grid.filterBarPluginData.autoStoresNullValue = plugin.autoStoresNullValue;
        grid.filterBarPluginData.autoStoresNullText = plugin.autoStoresNullText;
        grid.filterBarPluginData.autoUpdateAutoStores = plugin.autoUpdateAutoStores;
        grid.filterBarPluginData.enableOperators = plugin.enableOperators;
        grid.filterBarPluginData.booleanTpl = plugin.booleanTpl;
        grid.filterBarPluginData.dateTpl = plugin.dateTpl;
        grid.filterBarPluginData.floatTpl = plugin.floatTpl;
        grid.filterBarPluginData.numberTpl = plugin.numberTpl;
        grid.filterBarPluginData.stringTpl = plugin.stringTpl;
        grid.filterBarPluginData.comboTpl = plugin.comboTpl;
        grid.filterBarPluginData.listTpl = plugin.listTpl;
        grid.filterBarPluginData.visible = plugin.visible;
        grid.filterBarPluginData.autoStores = Ext.create('Ext.util.MixedCollection');
        grid.filterBarPluginData.autoStoresLoaded = false;
        grid.filterBarPluginData.columns = Ext.create('Ext.util.MixedCollection');
        grid.filterBarPluginData.containers = Ext.create('Ext.util.MixedCollection');
        grid.filterBarPluginData.fields = Ext.create('Ext.util.MixedCollection');
        grid.filterBarPluginData.actionColumn = grid.down('actioncolumn') || grid.down('actioncolumnpro');
        grid.filterBarPluginData.extraColumn = null;
        grid.filterBarPluginData.clearAllEl = null;
        grid.filterBarPluginData.showHideEl = null;
        grid.filterBarPluginData.filterArray = [];
        grid.filterBarPluginData.queries = '';
        grid.filterBarPluginData.params = {};
        // create task per grid too
        grid.filterBarPluginData.task = Ext.create('Ext.util.DelayedTask');
        
        // MIGARTION start
        // In Ext5 we cant override proxy method encodeProxy. And we dont need it!
        // me.overrideProxy();
        // MIGRATIN end
        
        plugin.parseFiltersConfig.call(grid); // sets me.columns and me.autoStores
        plugin.parseInitialFilters.call(grid); // sets me.filterArray with the store previous filters if any (adds operator and type if missing)
        // plugin.renderExtraColumn.call(grid); // sets me.extraColumn if applicable
        
        // renders the filter's bar
        if (grid.rendered){
            plugin.renderFilterBar.call(grid);
        }
        else{
            grid.on('afterrender', plugin.renderFilterBar, grid, {
                single: true
            });
        }
    },
    
    // private
    unsetup: function(){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar();
        grid.filterBarPluginData.params = {};
        grid.filterBarPluginData.queries = '';
        if (filterData.autoStores.getCount()){
            grid.store.un('load', plugin.fillAutoStores, grid);
        }
        
        filterData.autoStores.each(function(item){
            Ext.destroy(item);
        });
        
        filterData.autoStores.clear();
        filterData.autoStores = null;
        filterData.columns.each(function(column){
            if (column.rendered){
                if (column.getEl()
                          .hasCls(filterData.columnFilteredCls)){
                    column.getEl()
                          .removeCls(filterData.columnFilteredCls);
                }
            }
        });
        
        filterData.columns.clear();
        filterData.columns = null;
        filterData.fields.each(function(item){
            Ext.destroy(item);
        });
        
        filterData.fields.clear();
        filterData.fields = null;
        filterData.containers.each(function(item){
            Ext.destroy(item);
        });
        
        filterData.containers.clear();
        filterData.containers = null;
        if (filterData.clearAllEl){
            Ext.destroy(filterData.clearAllEl);
            filterData.clearAllEl = null;
        }
        
        if (filterData.showHideEl){
            Ext.destroy(filterData.showHideEl);
            filterData.showHideEl = null;
        }
        if (filterData.extraColumn){
            grid.headerCt.items.remove(filterData.extraColumn);
            Ext.destroy(filterData.extraColumn);
            filterData.extraColumn = null;
        }
        
        filterData.task = null;
        filterData.filterArray = null;
    },
    
    // private
    resetup: function(){
        let grid = this,
            plugin = grid.getFilterBar();
        grid.filterBarPluginData.params = {};
        plugin.unsetup.call(grid);
        plugin.setup.call(grid);
    },
    
    // private
    overrideProxy: function(){
        let grid = this,
            plugin = grid.getFilterBar();
        
        Ext.apply(grid.store.proxy, {
            encodeFilters: function(filters){
                let min = [],
                    length = filters.length,
                    i = 0;
                
                for (; i < length; i++){
                    min[i] = {
                        property: filters[i].property,
                        value: filters[i].value
                    };
                    if (filters[i].type){
                        min[i].type = filters[i].type;
                    }
                    if (filters[i].operator){
                        min[i].operator = filters[i].operator;
                    }
                }
                return this.applyEncoding(min);
            }
        });
    },
    
    // private
    parseFiltersConfig: function(){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar();
        
        let columns = grid.headerCt.getGridColumns();
        filterData.columns.clear();
        filterData.autoStores.clear();
        
        Ext.each(columns, function(column){
            if (column.filter){
                if (column.filter === true || column.filter === 'auto'){ // automatic types configuration (store based)
                    // MIGRATION start
                    // let type = me.grid.store.model.prototype.fields.get(column.dataIndex).type.type;
                    // model.fields.get(..) is incompatible with Ext5.
                    // field.type.type is incompatible with Ext5. We use field.getType().
                    let type;
                    Ext.each(grid.store.model.prototype.fields, function(field){
                        if (field.name === column.dataIndex){
                            type = field.getType();
                            return false;
                        }
                    });
                    // MIGARTION end
                    if (type === 'auto'){
                        type = 'string';
                    }
                    column.filter = type;
                }
                if (Ext.isString(column.filter)){
                    column.filter = {
                        type: column.filter // only set type to then use templates
                    };
                }
                if (column.filter.type){
                    column.filter = Ext.applyIf(column.filter, filterData[column.filter.type + 'Tpl']); // also use     templates but with user configuration
                    
                    // create store for boolean filter
                    if (column.filter.type === 'boolean' && !column.filter.store){
                        column.filter.store = [
                            [1, Ext.MessageBox.buttonText.yes],
                            [0, Ext.MessageBox.buttonText.no]
                        
                        ];
                        
                        if (column.filter.yesText){
                            column.filter.store[0][1] = column.filter.yesText;
                        }
                        
                        if (column.filter.noText){
                            column.filter.store[1][1] = column.filter.noText;
                        }
                    }
                }
                
                if (column.filter.xtype === 'combo' && !column.filter.store){
                    column.autoStore = true;
                    column.filter.store = Ext.create('Ext.data.ArrayStore', {
                        fields: [
                            {
                                name: 'text'
                            },
                            {
                                name: 'id'
                            }
                        ]
                    });
                    filterData.autoStores.add(column.dataIndex, column.filter.store);
                    column.filter = Ext.apply(column.filter, {
                        displayField: 'text',
                        valueField: 'id'
                    });
                }
                
                if (!column.filter.type && column.filter.xtype){
                    switch (column.filter.xtype){
                        case 'combo':
                            column.filter.type = (column.filter.multiSelect ? OWeb.EndPoints.LIST : 'combo');
                            break;
                        case 'datefield':
                            column.filter.type = 'date';
                            break;
                        case 'numberfield':
                            column.filter.type = (column.filter.allowDecimals ? 'float' : 'number');
                            break;
                        default:
                            if (!column.filter.type){
                                column.filter.type = 'string';
                            }
                    }
                }
                if (!column.filter.operator){
                    column.filter.operator = filterData[column.filter.type + 'Tpl'] ? filterData[column.filter.type + 'Tpl'].operator : 'like';
                }
                filterData.columns.add(column.dataIndex, column);
            }
        });
        
        if (filterData.autoStores.getCount()){
            if (grid.store.getCount() > 0){
                plugin.fillAutoStores.call(grid);
            }
            if (grid.store.remoteFilter){
                let autoStores = [];
                filterData.autoStores.eachKey(function(key, item){
                    autoStores.push(key);
                });
                grid.store.proxy.extraParams = grid.store.proxy.extraParams || {};
                grid.store.proxy.extraParams[filterData.autoStoresRemoteProperty] = autoStores;
            }
            grid.store.on('load', plugin.fillAutoStores, grid);
        }
    },
    
    // private
    fillAutoStores: function(){
        let grid = this,
            filterData = grid.filterBarPluginData;
        
        if (!filterData.autoUpdateAutoStores && filterData.autoStoresLoaded){
            return;
        }
        
        filterData.autoStores.eachKey(function(key, item){
            let field,
                data,
                record,
                records,
                fieldValue;
            
            field = filterData.fields.get(key);
            if (field){
                field.suspendEvents();
                fieldValue = field.getValue();
            }
            if (!grid.store.remoteFilter){ // values from local store
                data = grid.store.collect(key, true, false)
                           .sort();
                records = [];
                Ext.each(data, function(txt){
                    if (Ext.isEmpty(txt)){
                        Ext.Array.insert(records, 0, [
                            {
                                text: filterData.autoStoresNullText,
                                id: filterData.autoStoresNullValue
                            }
                        ]);
                    }
                    else{
                        records.push({
                            text: txt,
                            id: txt
                        });
                    }
                });
                item.loadData(records);
            }
            else{ // values from server
                if (grid.store.proxy.reader.rawData[filterData.autoStoresRemoteProperty]){
                    data = grid.store.proxy.reader.rawData[filterData.autoStoresRemoteProperty];
                    if (data[key]){
                        records = [];
                        Ext.each(data[key].sort(), function(txt){
                            if (Ext.isEmpty(txt)){
                                Ext.Array.insert(records, 0, [
                                    {
                                        text: filterData.autoStoresNullText,
                                        id: filterData.autoStoresNullValue
                                    }
                                ]);
                            }
                            else{
                                records.push({
                                    text: txt,
                                    id: txt
                                });
                            }
                        });
                        item.loadData(records);
                    }
                }
            }
            if (field){
                field.setValue(fieldValue);
                field.resumeEvents();
            }
        });
        
        filterData.autoStoresLoaded = true;
        if (grid.store.remoteFilter && !filterData.autoUpdateAutoStores){
            delete grid.store.proxy.extraParams[filterData.autoStoresRemoteProperty];
        }
    },
    
    // private
    parseInitialFilters: function(){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar();
        
        filterData.filterArray = [];
        //11.6.2015 Peter Sliacky
        //tuto podmienku som pridal po migracii z Ext JS 6.0.0.227 na 6.0.0.415, pretoze store.filters bol undifined
        //bolo by teda dobre toto opravit
        if (grid.store.filters){
            grid.store.filters.each(function(filter){
                // try to parse initial filters, for now filterFn is unsuported
                if (filter.property && !Ext.isEmpty(filter.value) && filterData.columns.get(filter.property)){
                    if (!filter.type){
                        filter.type = filterData.columns.get(filter.property).filter.type;
                    }
                    if (!filter.operator){
                        filter.operator = filterData.columns.get(filter.property).filter.operator;
                    }
                    filterData.filterArray.push(filter);
                }
            });
        }
    },
    
    // private
    renderFilterBar: function(){
        let grid = this,
            plugin = grid.getFilterBar(),
            filterData = grid.filterBarPluginData;
        filterData.columns.eachKey(function(key, column){
            if (!column.hidden){
                
                if (column.sortOption){
                    column.sort(column.sortOption);
                }
                
                let listConfig = column.filter.listConfig || {},
                    operator = {
                        click: {
                            // cls: OWeb.StyleList.CLS_NOTATIONS.FILTER_BAR.COLUMN_FILTER_TRIGGER
                        }
                    },
                    extraStyle = 'height:30px;padding:0px 0px 1px 20px !important';
                column.addCls('grid-Column');
                
                // switch (column.filter.type){
                //     case 'string':
                //         if (column.filter.xtype === 'ootextfld'){
                //             column.filter.opCls = [
                //                 'trgIcon-small column-trigger fa fa-plus ',
                //                 'trgIcon-small column-trigger fa fa-not-equal',
                //                 'trgIcon-small column-trigger fa fa-equals',
                //                 'trgIcon-small column-trigger fa fa-asterisk',
                //                 'trgIcon-small column-trigger fa fa-search'
                //             ];
                //             column.filter.opChar = ['+', '!', '=', '*', '&'];
                //             column.filter.owebOperators = true;
                //             operator.click.handler = function(comp, trigger){
                //                 let me = this,
                //                     fullText = (grid.xtype === 'tstransgrid' && column.xtype === 'descriptioncol') ? false : true;
                //                 new Ext.menu.Menu({
                //                     items: [
                //                         {
                //                             text: translations.matchText,
                //                             tooltip: translations.matchText,
                //                             iconCls: column.filter.opCls [2],
                //                             operator: column.filter.opChar[2],
                //                             disabled: (me.myVal === column.filter.opChar[2])
                //                         },
                //                         {
                //                             text: translations.containText,
                //                             tooltip: translations.containText,
                //                             iconCls: column.filter.opCls [3],
                //                             disabled: (me.myVal === column.filter.opChar[3]),
                //                             operator: column.filter.opChar[3]
                //                         },
                //                         {
                //                             text: translations.notEqual,
                //                             tooltip: translations.isNotEqualTo,
                //                             disabled: (me.myVal === column.filter.opChar[1]),
                //                             iconCls: column.filter.opCls [1],
                //                             operator: column.filter.opChar[1]
                //                         },
                //                         {
                //                             text: translations.fullText,
                //                             hidden: fullText,
                //                             disabled: (me.myVal === column.filter.opChar[0]),
                //                             iconCls: column.filter.opCls [0],
                //                             tooltip: translations.fullTextMsg,
                //                             operator: column.filter.opChar[0]
                //                         },
                //                         {
                //                             text: translations.startWith,
                //                             disabled: (me.myVal === column.filter.opChar[4]),
                //                             iconCls: column.filter.opCls [4],
                //                             tooltip: translations.startWithMsg,
                //                             operator: column.filter.opChar[4]
                //                         }
                //                     ],
                //                     listeners: {
                //                         click: plugin.applyTextSearchValues,
                //                         args: [me, grid, plugin]
                //                     }
                //                 }).showAt([comp.getX(), comp.getY() + 30]);
                //             };
                //         }
                //         break;
                //     case 'number':
                //         column.filter.opCls = [
                //             'trgIcon-small column-trigger fa fa-equals',
                //             'trgIcon-small column-trigger fa fa-not-equal',
                //             'trgIcon-small column-trigger fa fa-greater-than-equal',
                //             'trgIcon-small column-trigger fa fa-less-than-equal'
                //         ];
                //         column.filter.opChar = ['=', '!', '>', '<'];
                //         operator.click.cls = column.filter.opCls[0];
                //         column.filter.owebOperators = true;
                //         column.filter.operators = [
                //             {
                //                 text: translations.isEqualTo,
                //                 tooltip: translations.isEqualTo,
                //                 iconCls: column.filter.opCls[0],
                //                 operator: column.filter.opChar[0]
                //             },
                //             {
                //                 text: translations.isNotEqualTo,
                //                 tooltip: translations.isNotEqualTo,
                //                 iconCls: column.filter.opCls[1],
                //                 operator: column.filter.opChar[1]
                //             },
                //             {
                //                 text: translations.greaterThanOrEqual,
                //                 tooltip: translations.greaterThanOrEqual,
                //                 iconCls: column.filter.opCls[2],
                //                 operator: column.filter.opChar[2]
                //             },
                //             {
                //                 text: translations.lessThanOrEqual,
                //                 tooltip: translations.lessThanOrEqual,
                //                 iconCls: column.filter.opCls[3],
                //                 operator: column.filter.opChar[3]
                //             }
                //         ];
                //         operator.click.handler = (comp, trigger, e) => {
                //             let me = this;
                //             trigger.el.on('click', (e) => {
                //                 Ext.create('Ext.menu.Menu', {
                //                     scope: comp,
                //                     items: column.filter.operators,
                //                     listeners: {
                //                         click: plugin.applyTextSearchValues,
                //                         args: [comp, grid, plugin]
                //                     }
                //                 })
                //                    .showAt([e.getX(), e.getY() + 30]);
                //             });
                //
                //             e.stopPropagation(e);
                //
                //         };
                //         break;
                //     case 'datetime':
                //     case 'date':
                //         column.filter.opCls = [
                //             'trgIcon-small column-trigger fa fa-equals',
                //             'trgIcon-small column-trigger fa fa-not-equal',
                //             'trgIcon-small column-trigger fa fa-greater-than-equal',
                //             'trgIcon-small column-trigger fa fa-less-than-equal',
                //             'trgIcon-small column-trigger fa fa-exchange'
                //         ];
                //         column.filter.opChar = ['=', '!', '>', '<', '˜'];
                //         operator.click.cls = column.filter.opCls[0];
                //         column.filter.owebOperators = true;
                //         operator.click.handler = function(e){
                //             let me = this;
                //             me.tooltip = null;
                //             new Ext.menu.Menu({
                //                 items: [
                //                     {
                //                         text: translations.isEqualTo,
                //                         tooltip: translations.isEqualTo,
                //                         iconCls: column.filter.opCls[0]
                //                     },
                //                     {
                //                         text: translations.isNotEqualTo,
                //                         tooltip: translations.isNotEqualTo,
                //                         iconCls: column.filter.opCls[1],
                //                         operator: column.filter.opChar[1]
                //                     },
                //                     {
                //                         text: translations.greaterThanOrEqual,
                //                         tooltip: translations.greaterThanOrEqual,
                //                         iconCls: column.filter.opCls[2],
                //                         operator: column.filter.opChar[2]
                //                     },
                //                     {
                //                         text: translations.lessThanOrEqual,
                //                         tooltip: translations.lessThanOrEqual,
                //                         iconCls: column.filter.opCls[3],
                //                         operator: column.filter.opChar[3]
                //                     },
                //                     {
                //                         // hidden: true, // todo later .. range window need some chnages .
                //                         hidden: column.filter.type !== 'date', // todo later ..
                //                         text: translations.betweenRange,
                //                         tooltip: translations.betweenRange,
                //                         iconCls: column.filter.opCls[4],
                //                         operator: column.filter.opChar[4]
                //                     }
                //                 ],
                //                 listeners: {
                //                     click: plugin.applyDateValues,
                //                     args: [me, grid, plugin]
                //                 }
                //             }).showAt([e.getX(), e.getY() + 30]);
                //         };
                //         break;
                // }
                
                let field = Ext.widget(column.filter.xtype, Ext.apply(column.filter, {
                    dataIndex: key,
                    ownerColumn: column,
                    // cls: OWeb.StyleList.CLS_NOTATIONS.FILTER_BAR.COLUMN_FILTER_FIELD,
                    flex: 1,
                    margin: 0,
                    owebOperators: column.filter.owebOperators,
                    fieldStyle: extraStyle,
                    listConfig: listConfig,
                    preventMark: true,
                    msgTarget: 'none',
                    checkChangeBuffer: 50,
                    enableKeyEvents: true,
                    triggers: column.filter.owebOperators ? operator : {},
                    listeners: {
                        change: plugin.applyDelayedFilters,
                        keypress: function(fld, e){
                            if (e.getCharCode() === 13){
                                plugin.applyFilters(this, fld);
                            }
                            return false;
                        },
                        afterrender: plugin.applyDefaultOperators, // key backspace is impossible .
                        scope: grid
                    }
                }));
                filterData.fields.add(column.dataIndex, field);
                let container = Ext.create('jskit.view.component.MyPanel', {
                    dataIndex: key,
                    layout: 'hbox',
                    bodyStyle: 'background-color: "transparent";',
                    width: column.getWidth(),
                    items: [field],
                    listeners: {
                        scope: plugin,
                        element: 'el',
                        mousedown: function(e){
                            e.stopPropagation();
                        },
                        click: function(e){
                            e.stopPropagation();
                        },
                        dblclick: function(e){
                            e.stopPropagation();
                        },
                        keydown: function(e){
                            e.stopPropagation();
                        },
                        keypress: function(e){
                            e.stopPropagation();
                        },
                        keyup: function(e){
                            e.stopPropagation();
                        }
                    }
                });
                filterData.containers.add(column.dataIndex, container);
                container.render(Ext.get(column.id));
            }
        });
        
        let excludedCols = [];
        if (filterData.actionColumn){
            excludedCols.push(filterData.actionColumn.id);
        }
        
        if (filterData.extraColumn){
            excludedCols.push(filterData.extraColumn.id);
        }
        
        //Ext.each(me.grid.headerCt.getGridColumns(true), function(column) {
        // changed by Richard Laffers - the above is incompatible with Ext 4.2.1
        Ext.each(grid.headerCt.getGridColumns(), function(column){
            if (!Ext.Array.contains(excludedCols, column.id)){
                column.setPadding = Ext.Function.createInterceptor(column.setPadding, function(h){
                    if (column.hasCls(Ext.baseCSSPrefix + 'column-header-checkbox')){ //checkbox column
                        this.titleEl.setStyle({
                            paddingTop: '2px'
                        });
                    }
                    return false;
                });
            }
        });
        
        plugin.setVisible.call(grid, filterData.visible);
        plugin.showInitialFilters.call(grid);
    },
    
    // private
    showInitialFilters: function(){
        let grid = this,
            plugin = grid.getFilterBar(),
            filterData = grid.filterBarPluginData;
        
        Ext.each(filterData.filterArray, function(filter){
            let column = filterData.columns.get(filter.property);
            let field = filterData.fields.get(filter.property);
            if (!column.getEl()
                       .hasCls(filterData.columnFilteredCls)){
                column.getEl()
                      .addCls(filterData.columnFilteredCls);
            }
            field.suspendEvents();
            field.setValue(filter.value);
            field.resumeEvents();
        });
        
        if (filterData.filterArray.length && filterData.showClearAllButton){
            filterData.clearAllEl.show({
                duration: 1000
            });
        }
    },
    
    // private
    resizeContainer: function(headerCt, col){
        let grid = this,
            plugin = grid.getFilterBar(),
            filterData = grid.filterBarPluginData,
            item,
            itemWidth,
            colWidth,
            dataIndex = col.dataIndex;
        
        if (!dataIndex){
            return;
        }
        
        item = filterData.containers.get(dataIndex);
        if (item && item.rendered){
            itemWidth = item.getWidth();
            colWidth = filterData.columns.get(dataIndex)
                                 .getWidth();
            if (itemWidth !== colWidth){
                item.setWidth(filterData.columns.get(dataIndex)
                                        .getWidth());
                // MIGARTION start
                // doLayout() is deprecated in Ext5
                // item.doLayout();
                item.updateLayout();
                // MIGARTION end
            }
        }
    },
    
    applyDefaultOperator: function(field, index){
        let triggerIdx = field.triggerCell.elements.length - 1;
        field.triggerEl.elements[triggerIdx].removeCls(field.ownerColumn.filter.opCls.toString()
                                                            .split(' ')
                                                            .join(',')
                                                            .split(','));
        
        field.triggerEl.elements[triggerIdx].addCls(field.ownerColumn.filter.opCls [index]);
        field.opr = field.ownerColumn.filter.opChar[index];
        field.myVal = field.ownerColumn.filter.opChar[index];
    },
    
    applyTextSearchValues: function(me, grid, plugin, menu, item){
        if (!item.disabled){
            plugin.applyDefaultOperator(me, me.ownerColumn.filter.opChar.indexOf(item.operator));
            me.isDefaultOpSet = true;
            me.myVal = item.operator;
            plugin.applyDelayedFilters(me);
        }
    },
    
    applyDateValues: function(me, grid, plugin, menu, item){
        plugin.applyDefaultOperator(me, me.ownerColumn.filter.opCls.indexOf(item.iconCls));
        let value = '',
            column = me.ownerColumn,
            dom = me.getEl()
                .dom;
        // switch (item.text){
        //     case translations.isEqualTo :
        //         value = column.filter.type === 'datetime' ? OWeb.Globals.formatDate(me.value, OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') : OWeb.Globals.formatDate(me.value);
        //         grid.filterBarPluginData.params[me.dataIndex] = value;
        //         dom.setAttribute('data-qtip', 'All ' + me.dataIndex + ' records Equal To  <b>' + OWeb.Globals.formatDate(me.value) + '</b>');
        //         me.myVal = value;
        //         me.opr = '=';
        //         break;
        //     case translations.isNotEqualTo:
        //         value = column.filter.type === 'datetime' ? OWeb.Globals.formatDate(me.value, OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') : OWeb.Globals.formatDate(me.value);
        //         grid.filterBarPluginData.params[me.dataIndex] = value;
        //         dom.setAttribute('data-qtip', 'All ' + me.dataIndex + ' records Not Equal To  <b>' + OWeb.Globals.formatDate(me.value) + '</b>');
        //         me.myVal = item.operator + value;
        //         me.opr = item.operator;
        //         break;
        //     case translations.greaterThanOrEqual:
        //         value = column.filter.type === 'datetime' ? OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value, -1), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') :
        // OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value, -1)); grid.filterBarPluginData.params[me.dataIndex] = value; dom.setAttribute('data-qtip', 'All ' + me.dataIndex + ' records After
        // <b>' + OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value, -1)) + '</b>'); me.myVal = item.operator + value; me.opr = item.operator; me.myOldVal = me.value; break; case
        // translations.lessThanOrEqual: value = column.filter.type === 'datetime' ? OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') :
        // OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value)); grid.filterBarPluginData.params[me.dataIndex] = value; dom.setAttribute('data-qtip', 'All ' + me.dataIndex + ' records Before
        // <b>' + OWeb.Globals.formatDate(OWeb.Globals.dateAddDay(me.value)) + '</b>'); me.myVal = item.operator + value; me.opr = item.operator; me.myOldVal = me.value; break; case
        // translations.betweenRange: me.opr = null; Ext.create('OWeb.view.base.Oo.components.OoComponentsWindow', { title: 'Days Range' + me.dataIndex + ' column', itemId: 'oweb-date-range-filter',
        // column: column, grid: grid, field: me, width: OWeb.DataSizes.DATA_FORM_420, height: OWeb.DataSizes.DATA_FORM_200, items: [ { xtype: 'dataform', items: [ { xtype: 'oopanel', layout: 'hbox',
        // items: [ // {xtype: 'starttimefield'}, { labelWidth: 20, xtype: 'startdatefield', padding: 20, width: 150 }, { width: 40, margin: '20 0 0 0', xtype: 'rangeoptions' }, { xtype:
        // 'enddatefield', padding: 20, labelWidth: 20, width: 150 } // {xtype: 'endtimefield'} ] } ] } ] }); break; }
        me.setValue(me.value);
        plugin.applyDelayedFilters(me);
    },
    
    applyFilters: function(mgrid, field){
        let grid = mgrid,
            store = grid.getStore(),
            plugin = grid.getFilterBar(),
            listCtrl = grid.parentList.controller,
            filterCols = listCtrl.getOwebViewConfig().filterCols,
            filterColsFields = listCtrl.getOwebViewConfig().filterColsFields || {},
            value = field.type === 'time' || field.type === 'date' ? field.rawValue : field.value;
        // if (field.rawValue.length === 0){
        //     delete grid.filterBarPluginData.params[field.dataIndex];
        //     delete filterCols[field.dataIndex];
        //     delete filterColsFields[field.dataIndex];
        // }
        // else if (field.rawValue || field.value !== null && (field.value).toString().length > 0){
        //
        //     switch (field.type){
        //         case 'date':
        //             value = plugin.applyDateOperators(field, value);
        //             break;
        //         case 'time' :
        //             value = field.rawValue;
        //             break;
        //         case 'datetime':
        //             if (field.dataIndex === 'startdt'){
        //                 value = '>' + OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T');
        //             }
        //             else if (field.dataIndex === 'enddt'){
        //                 value = '<' + OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T');
        //             }
        //             else{
        //                 value = field.myVal || OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T');
        //             }
        //             break;
        //
        //         case 'string':
        //             value = plugin.applyStringOperators(field, value);
        //             break;
        //         case 'number':
        //             value = plugin.applyNumberOperators(field, value);
        //             break;
        //     }
        //     filterCols[field.dataIndex] = field.value;
        //     filterColsFields[field.dataIndex] = {
        //         value: value,
        //         type: field.xtype
        //
        //     };
        //     plugin.checkColParams(grid, listCtrl, filterCols, filterColsFields, field, value, true);
        // }
        // else{
        //     delete grid.filterBarPluginData.params[field.dataIndex];
        //     listCtrl.onRefresh();
        // }
        // if (!field.isValid() && field.type !== 'number'){ // on Enter to refresh comes to check the field validity . adding - to number makes the field unvalide .
        //     delete grid.filterBarPluginData.params[field.dataIndex];
        //     delete filterCols[field.dataIndex];
        //     delete filterColsFields[field.dataIndex];
        //     listCtrl.onRefresh();
        //     store.load();
        // }
    },
    
    applyDefaultOperators: function(field){
        // let grid = this,
        //     plugin = grid.getFilterBar();
        // if (field.owebOperators){
        //     field.getEl().dom.onmouseover = function onFldMouseOver(e){
        //         if (field.type === 'string' && !field.myVal){
        //             if (OWeb.OwebSettings.currSessionSettings.filter_text_contain){
        //                 plugin.applyDefaultOperator(field, 3);
        //             }
        //             else if (OWeb.OwebSettings.currSessionSettings.filter_text_match){
        //                 plugin.applyDefaultOperator(field, 2);
        //             }
        //             else{
        //                 plugin.applyDefaultOperator(field, 4);
        //             }
        //         }
        //         field.triggerEl.show();
        //     };
        //     field.getEl().dom.onmouseleave = function onFldMouseOver(e){
        //         !field.value && field.triggerEl.hide();
        //     };
        // }
    },
    
    applyStringOperators: function(field, value){
        // let plugin = this;
        // if (field.ownerColumn.filter.opChar.includes(field.value.charAt(0))){
        //     plugin.applyDefaultOperator(field, field.ownerColumn.filter.opChar.indexOf(field.value.charAt(0)));
        //     field.setValue(field.value.replace(field.value.slice(0, 1), ''));
        // }
        // switch (field.myVal){
        //     case OWeb.Globals.STR_ASTERIKS:
        //         value = '*' + field.value;
        //         break;
        //     case OWeb.Globals.STR_EQUAL :
        //         value = ':' + field.value;
        //         break;
        //     case OWeb.Globals.STR_PLUS:
        //         value = '%2B' + field.value;
        //         break;
        //     case '!' :
        //         value = '!' + field.value;
        //         break;
        //     default :
        //         value = field.value;
        //         break;
        // }
        // return value;
    },
    
    applyDateOperators: function(field, value){
        // let plugin = this;
        // if (field.ownerColumn.filter.opChar.includes(value.charAt(0))){
        //     plugin.applyDefaultOperator(field, field.ownerColumn.filter.opChar.indexOf(value.charAt(0)));
        //     field.setRawValue(value.replace(value.slice(0, 1), ''));
        // }
        // return (field.opr && field.opr === '=') ? OWeb.Globals.formatDate(field.rawDate) : (field.opr) ? field.opr + OWeb.Globals.formatDate(field.rawDate) : field.myVal ||
        // OWeb.Globals.formatDate(field.rawDate);
    },
    
    checkColParams: function(grid, listCtrl, filterCols, filterColsFields, field, value, doRefresh){
        let me = this;
        
        // grid.filterBarPluginData.params[field.dataIndex] = value;
        // // replace by view base ID .
        // if (grid.filterBarPluginData.params.hasOwnProperty(OWeb.FldNames.TRANSNO)){
        //     let IdValue = grid.filterBarPluginData.params[OWeb.FldNames.TRANSNO];
        //     if (typeof IdValue === 'number'){
        //         this.clearFilters(grid, OWeb.FldNames.TRANSNO);
        //         grid.filterBarPluginData.params = {} = {[OWeb.FldNames.TRANSNO]: IdValue};
        //         if (field.dataIndex !== OWeb.FldNames.TRANSNO){
        //             OWeb.Globals.showMessageBox('Info', 'Extra Filter not needed , please remove <b>' + OWeb.FldNames.TRANSNO + '  ' + IdValue + '</b> value first');
        //         }
        //     }
        // }
        //
        // // #1447867 https://www.evernote.com/l/ASL-zDo1cwtNf7Q9-lOyomEWTz8mbeoGYOoB/image.png
        // me.onSourcecodeGridSelection(field, value, grid);
        //
        // listCtrl.setOwebViewConfig({
        //     filterCols: grid.filterBarPluginData.params,
        //     filterColsFields: filterColsFields
        // });
        //
        // doRefresh && listCtrl.doRefresh();
    },
    
    // private hotedev
    getFirstField: function(){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar(),
            field;
        
        // changed by Richard Laffers - the above is incompatible with Ext 4.2.1
        //Ext.each(me.grid.headerCt.getGridColumns(true), function(col) {
        Ext.each(grid.headerCt.getGridColumns(), function(col){
            if (col.filter){
                field = filterData.fields.get(col.dataIndex);
                return false;
            }
        });
        
        return field;
    },
    
    //private
    focusFirstField: function(){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar(),
            field;
        
        field = plugin.getFirstField.call(grid);
        
        if (field){
            field.focus(false, 200);
        }
    },
    
    //private
    applyDelayedFilters: function(field){
        // let grid = this.cmp || this,
        //     name = field.dataIndex,
        //     column = field.ownerColumn,
        //     plugin = grid.getFilterBar(),
        //     listCtrl = grid.parentList.controller,
        //     filterCols = listCtrl.getOwebViewConfig().filterCols,
        //     filterColsFields = listCtrl.getOwebViewConfig().filterColsFields || {},
        //     value = field.type === 'time' || field.type === 'date' ? field.rawValue : field.value;
        //
        // if (value === null || (typeof value === 'undefined') || field.rawValue.length === 0){
        //     delete grid.filterBarPluginData.params[name];
        //     delete filterCols[field.dataIndex];
        //     delete filterColsFields[field.dataIndex];
        //     column.addCls('grid-Column');
        //     column.removeCls('dirty-Column ');
        //
        // }
        // else{
        //     column.addCls('dirty-Column');
        //     column.removeCls('grid-Column');
        //     // If GridFilterCombo has Remote.Proxy.Store
        //     // Sample usage {@link OWeb.view.room.RoomGrid.getListCols().roomstatecol.filters.roomstategridcombo}
        //     if (field.store && field.store.asynchronousLoad){
        //         field.type = 'remoteCombo';
        //     }
        //     else{
        //         switch (field.type){
        //             case 'date':
        //                 value = plugin.applyDateOperators(field, value);
        //                 break;
        //             case 'time' :
        //                 value = field.rawValue;
        //                 break;
        //             case 'datetime':
        //                 if (field.dataIndex === 'startdt'){
        //                     value = '>' + OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') + 'Z';
        //                 }
        //                 else if (field.dataIndex === 'enddt'){
        //                     value = '<' + OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') + 'Z';
        //                 }
        //                 else{
        //                     value = field.myVal || OWeb.Globals.formatDate(field.getValue(), OWeb.Globals.FORMAT_LOCAL_DATETIME, 'T') + 'Z';
        //                 }
        //                 break;
        //
        //             case 'string':
        //                 value = plugin.applyStringOperators(field, value);
        //                 break;
        //             case 'number':
        //                 value = plugin.applyNumberOperators(field, value);
        //                 break;
        //
        //         }
        //     }
        //
        //     filterCols[field.dataIndex] = value;
        //     filterColsFields[field.dataIndex] = {
        //         value: value,
        //         type: field.xtype
        //
        //     };
        //
        //     plugin.checkColParams(grid, listCtrl, filterCols, filterColsFields, field, value, false);
        // }
    },
    
    applyNumberOperators: function(field, value){
        // let plugin = this;
        // if (field.ownerColumn.filter.opChar.includes(field.value.toString()
        //                                                   .charAt(0))){
        //     plugin.applyDefaultOperator(field, field.ownerColumn.filter.opChar.indexOf(field.value.toString()
        //                                                                                     .charAt(0)));
        //     field.setValue(field.value.toString()
        //                         .replace(field.value.toString()
        //                                       .slice(0, 1), ''));
        // }
        // switch (field.myVal){
        //     case OWeb.Globals.STR_EQUAL :
        //         value = field.value;
        //         break;
        //     case '<':
        //         value = '<' + (parseInt(field.value + 1));
        //         break;
        //     case '>':
        //         value = '>' + (parseInt(field.value - 1));
        //         break;
        //     case '!' :
        //         value = '!' + field.value;
        //         break;
        //     default:
        //         value = field.value;
        //         break;
        // }
        // return value;
    },
    
    clearFilters: function(ownerGrid, paramKey){
        // let grid = ownerGrid || this,
        //     filterData = grid.filterBarPluginData,
        //     column;
        //
        // filterData.filterArray = [];
        // filterData.fields.eachKey(function(key, field){
        //     if (key !== paramKey){
        //         field.suspendEvents();
        //         field.reset();
        //         field.resumeEvents();
        //         field.ownerColumn.removeCls('dirty-Column');
        //     }
        //     // field.ownerColumn.removeCls('dirtyColumn');
        //     column = filterData.columns.get(key);
        //     // if (column.getEl()
        //     //           .hasCls(Ext.baseCSSPrefix + 'column-filtered')){
        //     //     column.getEl()
        //     //           .removeCls(Ext.baseCSSPrefix + 'column-filtered');
        //     // }
        // });
        //
        // // grid.store.clearFilter();
        // if (filterData.clearAllEl){
        //     filterData.clearAllEl.hide({
        //         duration: 1000
        //     });
        // }
        //
        // grid.fireEvent('filterupdated', filterData.filterArray);
    },
    
    setVisible: function(visible){
        let grid = this,
            filterData = grid.filterBarPluginData,
            plugin = grid.getFilterBar();
        Ext.suspendLayouts();
        
        filterData.containers.each(function(item){
            item.setVisible(visible);
        });
        
        if (visible){
            plugin.focusFirstField.call(grid);
            grid.headerCt.setHeight(null);
        }
        else{
            // grid.events.afterrender.firing && grid.headerCt.setHeight(32);
            // !grid.events.afterrender.firing && grid.headerCt.setHeight(null);
        }
        
        grid.headerCt.updateLayout();
        
        filterData.visible = visible;
        Ext.resumeLayouts(true);
        
    }
    //
    // onSourcecodeGridSelection: function(field, value, grid){
    //     let me = this;
    //
    //     if (field.xtype === 'sourcecodegridcombo'){
    //         let filteredData = field.store.data.filterBy(data => data.id === value);
    //         grid.filterBarPluginData.params[field.name] = filteredData.getAt(0).data.code;
    //
    //         return true;
    //     }
    //
    //     return false;
    // }
});
