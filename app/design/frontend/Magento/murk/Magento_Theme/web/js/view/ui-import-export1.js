define(['uiComponent', 'ko'], function (uiComponent) {
    'use strict';

    return uiComponent.extend({
        defaults: {
            template: 'Magento_Theme/ui-import-export',
            text: 'default text first element',
            tracks: {
                text: true
            },
            // EXPORTS
            exports: {
                text: 'custom2:text'
            },
        },

        initialize: function () {
            this._super();

            setTimeout(() => {
                this.text= 'updated text first element';
            }, 2000);

            console.log('first element')
        }
    });
});
