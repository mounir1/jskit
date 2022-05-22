Ext.define('jskit.plugins.GridSearch', {
    extend: 'Ext.AbstractPlugin',
    alternateClassName: 'Mounir.plugins.GridSearch',
    alias: ['plugin.gridsearch', 'plugin.mounir-gridsearch'],
    targetCtScope: 'grid',
    autoCreate: true,
    searchPosition: 'tbfill',
    triggerHidden: false,
    beforeSeparator: true,
    triggerSearch: 'auto',
    minChars: 2,
    focusOnLoad: false,
    buttonHidden: false,
    buttonCls: 'mounir-plugin-btn',
    textCls: 'mounir-plugin-txt',
    tooltip: 'Show  filters',
    buttonGlyph: 'fa fa-filter fa-lg',
    mode: 'remote',
    queryParam: 'query',
    fieldsParam: 'fields',
    checkIndexes: 'all',
    disableIndexes: [],
    buffer: 400,
    inputType: 'search',
    showSelectAll: true,
    noCtText: 'Target container was not found. Check values of autoCreate and targetCt config options.',
    searchText: 'Search',
    selectAllText: 'Select all',
    autoTipText: 'Type at least {0} characters',
    manualTipText: 'Type a text and press Enter',
    
    init: function(cmp){
        var me = this,
            targetCt;
        me.callParent(arguments);
        me.targetCt = targetCt = me.getTargetCt();
        if (!targetCt){
            Ext.Error.raise(me.noCtText);
        }
        me.disableIndexes = Ext.Array.slice(me.disableIndexes);
        me.createField();
        cmp.on('reconfigure', me.reconfigure, me);
    },
    
    doSearch: function(query){
        var me = this,
            menu = me.menu,
            field = me.field,
            grid = me.getCmp().normalGrid || me.getCmp(),
            store = grid.getStore(),
            proxy = store.getProxy(),
            queryParam = me.queryParam,
            fieldsParam = me.fieldsParam,
            fields = menu.getFields();
        if (query){
            field.setRawValue(query);
        }
        else{
            query = field.getValue();
        }
        
        if ('remote' === me.mode){
            delete proxy.extraParams[queryParam];
            delete proxy.extraParams[fieldsParam];
            
            if (query){
                proxy.extraParams[queryParam] = query;
            }
            if (fields){
                proxy.extraParams[fieldsParam] = Ext.encode(fields);
            }
            store.loadPage(1);
        }
        else if (fields){
            store.clearFilter();
            if (query){
                store.pageSize = store.totalCount;
                store.load();
                store.filterBy(function(record){
                    var retval = false,
                        recordVal,
                        re,
                        dateFormat = me.dateFormat;
                    
                    Ext.each(fields, function(field){
                        if (retval){
                            return;
                        }
                        recordVal = record.get(field);
                        
                        if (Ext.isBoolean(recordVal)){
                            return;
                        }
                        if (Ext.isNumeric(recordVal)){
                            return;
                        }
                        if (Ext.isDate(recordVal)){
                            
                            return;
                        }
                        re = new RegExp(me.escapeRegExp(query), 'gi');
                        retval = re.test(recordVal);
                    });
                    return !!retval;
                });
                
            }
            else{
                store.pageSize = 4;
                store.load();
            }
        }
    },
    reconfigure: function(){
        var me = this,
            grid = me.getCmp().normalGrid || me.getCmp(),
            store = grid.getStore(),
            columns = grid.headerCt.items,
            menu = me.menu,
            group = 'radio' === me.menuStyle ? 'g' + (new Date()).getTime() : undefined;
        menu.removeAll();
        
        if (me.showSelectAll){
            menu.add([
                {
                    xtype: 'menucheckitem',
                    text: me.selectAllText,
                    checked: 'all' === me.checkIndexes,
                    group: group,
                    handler: function(item){
                        item.parentMenu.items.each(function(mi){
                            if (mi.setChecked && !mi.isDisabled() && mi !== item){
                                mi.setChecked(item.checked, true);
                            }
                        });
                    }
                }, '-'
            ]);
        }
        columns.each(function(col){
            var checked = 'all' === me.checkIndexes || Ext.Array.contains(me.checkIndexes, col.dataIndex);
            if (col.text && col.dataIndex && !Ext.Array.contains(me.disableIndexes, col.dataIndex)){
                menu.add({
                    xtype: 'menucheckitem',
                    text: col.text,
                    group: group,
                    checked: checked,
                    dataIndex: col.dataIndex
                });
            }
        });
        
        if (me.focusOnLoad){
            store.on({
                load: {
                    fn: function(){
                        me.field.focus();
                    },
                    delay: 100
                }
            });
        }
        store.setProxy(store.getProxy()
                            .clone());
    },
    createField: function(){
        var me = this,
            targetCt = me.targetCt,
            position = me.searchPosition,
            add = me.createAdder(),
            cfg = [];
        
        if ('last' === position && 'right' === me.searchAlign){
            cfg.push('->');
        }
        if (me.beforeSeparator){
            cfg.push('-');
        }
        me.menu = Ext.widget({
            xtype: 'menu',
            listeners: {
                scope: me,
                hide: me.onMenuHide,
                show: me.onMenuShow
            },
            getFields: function(){
                var me = this,
                    fields = [];
                me.items.each(function(mi){
                    if (mi.checked && mi.dataIndex){
                        fields.push(mi.dataIndex);
                    }
                });
                return fields;
            }
        });
        cfg.push({
            xtype: 'button',
            text: me.searchText,
            menu: me.menu,
            hidden: me.buttonHidden,
            // cls: me.buttonCls,
            tooltip: me.tooltip,
            iconCls: me.buttonGlyph
        });
        cfg.push({
            xtype: 'textfield',
            inputType: me.inputType,
            cls: me.textCls,
            inputCls: 'x-form-text x-form-text-default',
            
            isFormField: false,
            fieldStyle: '-webkit-appearance:textfield',
            hideTrigger: me.triggerHidden || 'auto' === me.triggerSearch,
            
            onTriggerClick: Ext.Function.bind(me.doSearch, me, []),
            listeners: {
                scope: me,
                buffer: me.buffer,
                change: me.onChange,
                specialkey: me.onSpecialKey,
                render: me.onFieldRender
            }
        });
        
        if (me.afterSeparator){
            cfg.push('-');
        }
        
        add(cfg);
        
        Ext.apply(me, {
            field: targetCt.down('textfield[cls=' + me.textCls + ']'),
            button: targetCt.down('button[cls=' + me.buttonCls + ']')
        });
        
        me.reconfigure();
    },
    
    onFieldRender: function(field){
        var me = this;
        if (!me.disableTip){
            Ext.tip.QuickTipManager.register({
                target: field.inputEl.dom,
                text: 'auto' === me.triggerSearch ? Ext.String.format(me.autoTipText, me.minChars) : me.manualTipText
            });
        }
        if ('search' === me.inputType){
            //    field.inputEl.set({results:5});
        }
    },
    
    onMenuHide: function(menu){
        var me = this,
            fields = menu.getFields();
        
        if (Ext.encode(me.lastFields) !== Ext.encode(fields) && fields.length && me.field.getValue()){
            me.doSearch();
        }
        me.setFieldDisabled(!fields.length);
    },
    
    onMenuShow: function(menu){
        this.lastFields = menu.getFields();
    },
    
    onSpecialKey: function(field, e){
        if (e.getKey() == e.ENTER){
            this.doSearch();
        }
    },
    
    onChange: function(field){
        var me = this,
            query = field.getValue(),
            minChars = me.minChars;
        if ('auto' === me.triggerSearch && minChars && query.length >= minChars || 0 === query.length){
            me.doSearch();
        }
    },
    
    createAdder: function(){
        var me = this,
            position = me.searchPosition,
            targetCt = me.targetCt,
            beforeItem,
            beforeItemIndex;
        
        if (Ext.isNumber(position)){
            return Ext.Function.bind(targetCt.insert, targetCt, [position], 0);
        }
        if ('first' === position){
            return Ext.Function.bind(targetCt.insert, targetCt, [0], 0);
        }
        if ('last' === position){
            return Ext.Function.bind(targetCt.add, targetCt);
        }
        beforeItem = targetCt.down(position);
        if (beforeItem){
            beforeItemIndex = targetCt.items.indexOf(beforeItem);
            return Ext.Function.bind(targetCt.insert, targetCt, [beforeItemIndex], 0);
        }
        else{
            return Ext.Function.bind(targetCt.add, targetCt);
        }
        
    },
    
    getTargetCt: function(){
        var me = this,
            grid = me.getCmp(),
            targetCt = 'global' === me.targetCtScope ? Ext.ComponentQuery.query(me.targetCt)[0] : grid.down(me.targetCt),
            position;
        
        if (!targetCt && me.autoCreate){
            position = me.targetCt.match(/(top|left|bottom|right)/);
            position = position ? position[0] : 'bottom';
            
            targetCt = grid.dockedItems.add(
                Ext.widget({
                    xtype: 'toolbar',
                    dock: position
                })
            );
        }
        return targetCt;
    },
    
    isDisabled: function(){
        return this.field.isDisabled();
    },
    
    isVisible: function(){
        return this.field.isVisible();
    },
    
    setButtonDisabled: function(disable){
        this.button.setDisabled(disable);
    },
    
    disableButton: function(){
        this.button.disable();
    },
    
    enableButton: function(){
        this.button.enable();
    },
    
    setFieldDisabled: function(disable){
        this.field.setDisabled(disable);
    },
    
    disableField: function(){
        this.field.disable();
    },
    
    enableField: function(){
        this.field.enable();
    },
    
    setDisabled: function(disable){
        var me = this;
        me.setButtonDisabled(disable);
        me.setFieldDisabled(disable);
    },
    
    disable: function(){
        var me = this;
        me.disableButton();
        me.disableField();
    },
    
    enable: function(){
        var me = this;
        me.enableButton();
        me.enableField();
    },
    
    setHidden: function(hidden){
        var me = this;
        me.setButtonHidden(hidden);
        me.setFieldHidden(hidden);
    },
    
    hide: function(){
        this.setHidden(true);
    },
    
    show: function(){
        this.setHidden(false);
    },
    
    setButtonHidden: function(hidden){
        var me = this;
        if (hidden){
            me.button.hide();
        }
        else{
            me.button.show();
        }
    },
    
    hideButton: function(){
        this.setButtonHidden(true);
    },
    
    showButton: function(){
        this.setButtonHidden(false);
    },
    
    setFieldHidden: function(hidden){
        var me = this;
        if (hidden){
            me.field.hide();
        }
        else{
            me.field.show();
        }
    },
    
    hideField: function(){
        this.setFieldHidden(true);
    },
    
    showField: function(){
        this.setFieldHidden(false);
    },
    
    escapeRegExp: function(s){
        if ('string' !== typeof s){
            return s;
        }
        return s.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1');
    }
});