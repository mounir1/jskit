// Ext.define('jskit.overrides.TreeItem', {
//     override: 'Ext.list.TreeItem',
//     config: {
//         floaterConfig: {}
//     },
//
//     setFloated: function(floated){
//         var me = this,
//             el = me.element,
//             placeholder = me.placeholder,
//             node,
//             wasExpanded;
//
//         if (me.treeItemFloated !== floated){
//             if (floated){
//                 placeholder = el.clone(false, true); // shallow, asDom
//                 placeholder.id += '-placeholder'; // avoid duplicate id
//                 me.placeholder = Ext.get(placeholder);
//
//                 me.wasExpanded = me.getExpanded();
//                 me.setExpanded(true);
//
//                 el.addCls(me.floatedCls);
//                 el.dom && el.dom.parentNode.insertBefore(placeholder, el.dom);
//
//                 el.dom && (me.floater = me.createFloater()); // toolkit-specific
//             }
//             else if (placeholder){
//                 wasExpanded = me.wasExpanded;
//                 node = me.getNode();
//                 me.setExpanded(wasExpanded);
//
//                 if (!wasExpanded && node.isExpanded()){
//                     // If we have been floating and expanded a child, we may have been
//                     // expanded as part of the ancestors. Attempt to restore state.
//                     me.preventAnimation = true;
//                     node.collapse();
//                     me.preventAnimation = false;
//                 }
//
//                 me.floater.remove(me, false); // don't destroy
//                 el.removeCls(me.floatedCls);
//                 placeholder.dom.parentNode.insertBefore(el.dom, placeholder.dom);
//
//                 placeholder.destroy();
//                 me.floater.destroy();
//
//                 me.placeholder = me.floater = null;
//             }
//
//             // Use an internal property name. We are NOT really floated
//             me.treeItemFloated = floated;
//         }
//     },
//
//     privates: {
//         createFloater: function(){
//             var me = this,
//                 owner = me.getOwner(),
//                 ownerTree = me.up('treelist'),
//                 toolElement = me.getToolElement();
//             me.floater = new Ext.container.Container({
//                 cls: ownerTree.self.prototype.element.cls + ' ' + ownerTree.uiPrefix + ownerTree.getUi() + ' ' + Ext.baseCSSPrefix + 'treelist-floater',
//                 floating: true,
//                 shadow: true,
//                 hidden: true,
//                 scrollable: 'y',
//                 width: jskit.Globals.EXPAND_MENU,
//                 height: jskit.Globals.EXPAND_MENU,
//                 listeners: {
//                     element: 'el',
//                     click: function(e){
//                         return owner.onClick(e);
//                     }
//                 }
//             });
//             me.floater.add(me);
//             me.floater.show();
//             me.floater.el.alignTo(toolElement, 'tr?');
//
//             return me.floater;
//         }
//     },
//
// });