define([
    'jquery',
    'mage/storage'
], function ($, storage) {
    'use strict';

    return function (originalWidget) {
        $.widget('mage.collapsible', originalWidget, {
            _create: function () {
                this._super();
                this._bindSearchTop();
            },

            _bindSearchTop: function () {
                const titleElement = this.element.find('[data-role="title"]');
                const resultList = $('.collapsible-content');
                titleElement.on('click', () => {
                    const colTitle = $('.collapsible__title').attr('aria-selected');
                    if (colTitle === 'false') {
                        return;
                    } else {
                        this._fetchTopResults(resultList);
                    }
                });
            },

            _fetchTopResults: function (resultList) {
                resultList.empty().append('<li>Loading...</li>');

                const query = 'top';
                const url = `search/ajax/suggest/?q=${query}`;

                storage.get(url)
                    .done((response) => {
                        resultList.empty();

                        if (response && response.results && response.results.length) {
                            response.results.forEach(item => {
                                resultList.append('<li>' + item + '</li>');
                            });
                        } else {
                            resultList.append('<li>No results found</li>');
                        }
                    })
                    .fail(() => {
                        resultList.empty().append('<li>Error fetching results</li>');
                    });
            }
        });

        return $.mage.collapsible;
    };
});
