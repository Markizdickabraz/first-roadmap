define(['uiComponent', 'ko'], function (uiComponent, ko) {
    'use strict';

    return uiComponent.extend({
        defaults: {
            isActive: ko.observable(false),
            template: 'Magento_Theme/ui-init-and-track',
            text: 'old text',
            tracks: {
                text: true
            }
        },

        initialize: function () {
            this._super();

            setTimeout(() => {
                this.text= 'new text'
            }, 1000);
        },

        toggleState() {
            this.isActive(!this.isActive());
        }
    });
});
