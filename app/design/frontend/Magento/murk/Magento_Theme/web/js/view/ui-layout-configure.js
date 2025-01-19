define(['uiElement'], uiElement => {
    'use strict';
    return uiElement.extend({
        defaults: {
            template: 'Magento_Theme/custom',
            imports: {
                items: '${ $.provider }:items'
            }
        },
        tracks: {
            items: true
        }
    })
})