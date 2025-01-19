define(['uiComponent', 'uiEvents'], (uiComponent, uiEvents) => {
    'use strict';
    return uiComponent.extend({
        initialize() {
            this._super();

            uiEvents.trigger('childRender', this);
        }
    });
});