define(['uiElement'], uiElement => {
    'use strict';

    return uiElement.extend({
        defaults: {
            template: 'Magento_Theme/ui-literal',
            var1: 'var1',
            var2: '${ $.var1 }'
        },
        initialize() {
            this._super();

            console.log(this.var1);
            console.log(`${this.var1}`);

            const $ = this;
            console.log(`${$.var1}`);

            console.log(this.var2, 'var2');
        }
    })
})