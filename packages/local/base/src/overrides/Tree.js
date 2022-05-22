// Ext.define('jskit.overrides.Tree', {
//     override: 'Ext.list.Tree',
//     privates: {
//         checkForMouseLeave: function(e){
//             var floater = this.activeFloater,
//                 relatedTarget = e.getRelatedTarget();
//             if (floater && relatedTarget){//@HOTEDEV , EXTJS micro mode is not supposed to have a scroller maybe .
//                 if (relatedTarget !== floater.getToolElement().dom &&
//                     !floater.element.contains(relatedTarget) && !relatedTarget.className.includes('x-scroller')){ // related target has a scoll bar , and hence not equal the tool.dom anymore .
//                     this.unfloatAll();
//                 }
//             }
//         }
//     }
// });
