define(['uiComponent', 'ko'], function (uiComponent) {
    'use strict';

    return uiComponent.extend({
        defaults: {
            template: 'Magento_Theme/ui-import-export',

            // UPDATE SECOND ELEMENT
            // imports: {
            //     text: 'custom1:text'
            // },
            // CALLBACK
            listens: {
                text: 'onTextUpdate'
            },

            // UPDATE ALL ELEMENTS
            // links: {
            //         text: 'custom1:text'
            // },

            tracks : {
                text: true
            }
        },

        initialize: function () {
            this._super();

            setTimeout(() => {
                this.text= 'updated text second element';
            }, 4000);

            console.log('second element')
        },

        onTextUpdate(text) {
            console.log(text)
        },
    });
});
