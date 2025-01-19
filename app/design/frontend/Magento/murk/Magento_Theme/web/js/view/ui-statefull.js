define(['uiElement'], uiElement => {
    'use strict';

    return uiElement.extend({
        defaults: {
            template: 'Magento_Theme/ui-statefull',
            customerName: '',
            tracks: {
                customerName: true
            },
            statefull: {
                customerName: true
            }
        }
    })
})