define(['uiElement',
        'Magento_Theme/js/model/model',
        'Magento_Theme/js/action/action'
    ], (uiElement, model, action) => {
        'use strict';

        return uiElement.extend({
            defaults: {
                template: 'Magento_Theme/ui-get-set',
                items: [],
                discountCode: '',
                tracks: {
                    items: true,
                    discountCode: true
                }
            },

            initialize: function () {
                this._super();
                this.getData();

                return this;
            },

            getData() {
                this.items = model.get();
            },
            pushData() {
                action(this.discountCode);
            },
        });
    }
);
