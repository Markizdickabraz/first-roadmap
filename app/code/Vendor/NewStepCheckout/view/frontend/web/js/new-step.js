define([
    'ko',
    'jquery',
    'uiComponent',
    'mage/storage',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Customer/js/model/customer' // Додано для перевірки авторизації
], function (ko, $, Component, storage, stepNavigator, customer) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Vendor_NewStepCheckout/new-step'
        },

        isVisible: ko.observable(true),
        stepCode: 'authorization',
        stepTitle: 'Authorization',
        email: ko.observable(''),
        isEmailAvailable: ko.observable(true),
        emailValidationInProgress: ko.observable(false),
        emailErrorMessage: ko.observable(''),

        initialize: function () {
            this._super();

            if (customer.isLoggedIn()) {
                this.navigateToShippingStep();
            } else {
                this._bindEmailBlurEvent();
            }

            stepNavigator.registerStep(
                this.stepCode,
                null,
                this.stepTitle,
                this.isVisible,
                _.bind(this.navigate, this),
                5
            );

            return this;
        },

        navigateToShippingStep: function () {
            stepNavigator.gotoStep('shipping');
        },

        _bindEmailBlurEvent: function () {
            var self = this;
            $('#customer-email').on('blur', function () {
                self.checkEmailAvailability(self.email());
            });
        },

        navigate: function () {
            console.log('Navigating to Authorization Step');
        },

        navigateToNextStep: function () {
            stepNavigator.next();
        },

        checkEmailAvailability: function (email) {
            if (!email || email.length < 3) {
                this.isEmailAvailable(false);
                this.emailErrorMessage('Please enter a valid email address.');
                return;
            }

            this.emailValidationInProgress(true);
            this.isEmailAvailable(true);

            storage.post(
                '/rest/V1/customers/isEmailAvailable',
                JSON.stringify({ customerEmail: email })
            )
                .done((response) => {
                    if (response) {
                        this.isEmailAvailable(true);
                        this.emailErrorMessage('This email is available for registration.');
                    } else {
                        this.isEmailAvailable(false);
                        this.emailErrorMessage('This email is already in use.');
                    }
                })
                .fail(() => {
                    this.isEmailAvailable(false);
                    this.emailErrorMessage('Error checking email availability. Try again later.');
                })
                .always(() => {
                    this.emailValidationInProgress(false);
                });
        },

        login: function () {
            if (!this.email() || !this.isEmailAvailable()) {
                console.error('Email is unavailable or not entered!');
                return;
            }

            console.log('Logging in with email:', this.email());
        }
    });
});
