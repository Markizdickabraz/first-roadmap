define(['uiCollection', 'uiLayout', 'uiEvents'], (
    uiCollection,
    uiLayout,
    uiEvents
) => {
    'use Strict';
    return uiCollection.extend({
        defaults: {
            template: 'Magento_Theme/ui-parent'
        },

        initialize() {
            this._super();
            uiEvents.on('childRender', this.onChildRender.bind(this));
        },

        addChild() {
            uiLayout([{
                parent: this.name,
                name: `child-${new Date().getTime()}`,
                component: 'Magento_Theme/js/view/ui-child',
                template: 'Magento_Theme/ui-child',
                displayArea: this.elems.getLength() % 2 ? 'right' : 'left'
            }])
        },
        onChildRender(child) {
            console.log(child.name);
        }
    })
})