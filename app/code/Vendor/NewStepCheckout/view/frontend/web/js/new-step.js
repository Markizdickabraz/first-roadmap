define([
    'ko',
    'jquery',
    'uiComponent',
    'mage/storage',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Customer/js/model/customer',
    'Magento_Customer/js/customer-data',
    'Magento_Customer/js/action/login',
    'Magento_Ui/js/model/messageList',
    'mage/translate'
], function (ko, $, Component, storage, stepNavigator, customer, customerData, loginAction, messageList, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Vendor_NewStepCheckout/new-step'
        },

        isVisible: ko.observable(true),
        stepCode: 'authorization',
        stepTitle: 'Authorization',
        email: ko.observable(''),
        password: ko.observable(''),
        firstName: ko.observable(''),
        lastName: ko.observable(''),
        confirmPassword: ko.observable(''),
        showLoginFields: ko.observable(false),
        showRegistrationFields: ko.observable(false),
        isEmailAvailable: ko.observable(true),
        emailValidationInProgress: ko.observable(false),
        emailErrorMessage: ko.observable(''),

        initialize: function () {
            this._super();

            if (customer.isLoggedIn()) {
                stepNavigator.navigate('shipping');
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

        _bindEmailBlurEvent: function () {
            var self = this;
            $('#customer-email').on('blur', function () {
                self.checkEmailAvailability(self.email());
            });
        },

        navigate: function () {
            console.log('Navigating to Authorization Step');
        },

        checkEmailAvailability: function (email) {
            if (!email || email.length < 3) {
                this.isEmailAvailable(false);
                this.emailErrorMessage($t('Please enter a valid email address.'));
                this.showLoginFields(false);
                this.showRegistrationFields(false);
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
                        this.emailErrorMessage($t('This email is available for registration.'));
                        this.showRegistrationFields(true);
                        this.showLoginFields(false);
                    } else {
                        this.isEmailAvailable(false);
                        this.emailErrorMessage($t('This email is already in use.'));
                        this.showLoginFields(true);
                        this.showRegistrationFields(false);
                    }
                })
                .fail(() => {
                    this.isEmailAvailable(false);
                    this.emailErrorMessage($t('Error checking email availability. Try again later.'));
                    this.showLoginFields(false);
                    this.showRegistrationFields(false);
                })
                .always(() => {
                    this.emailValidationInProgress(false);
                });
        },

        login: function () {
            if (!this.isFormValid()) {
                this.emailErrorMessage($t('Email or password is missing!'));
                return;
            }

            const loginData = {
                username: this.email(),
                password: this.password(),
            };
            const baseUrl = window.location.origin;
            const redirectUrl = `${baseUrl}/checkout/`;

            loginAction(loginData, redirectUrl, true, messageList).fail(() => {
                this.emailErrorMessage($t('Invalid login credentials. Please try again.'));
            });
        },

        registration: function () {
            if (!this.isRegistrationFormValid()) {
                this.emailErrorMessage($t('Please fill in all required fields!'));
                return;
            }

            const registrationData = {
                customer: {
                    email: this.email(),
                    firstname: this.firstName(),
                    lastname: this.lastName()
                },
                password: this.password()
            };

            storage.post(
                '/rest/V1/customers',
                JSON.stringify(registrationData)
            )
                .done(() => {
                    console.log('Registration successful!');
                    customerData.reload(['customer'], true)
                        .done(() => {
                            console.log('Customer data reloaded successfully.');

                            const loginData = {
                                username: this.email(),
                                password: this.password()
                            };
                            const baseUrl = window.location.origin;
                            const redirectUrl = `${baseUrl}/checkout/`;

                            loginAction(loginData, redirectUrl, true, messageList).fail(() => {
                                this.emailErrorMessage($t('Failed to log in after registration.'));
                            });
                        })
                        .fail(() => {
                            this.emailErrorMessage($t('Failed to reload customer data.'));
                        });
                })
                .fail((error) => {
                    const errorMessage = error.responseJSON && error.responseJSON.message
                        ? error.responseJSON.message
                        : $t('Registration failed. Please try again later.');
                    this.emailErrorMessage(errorMessage);
                });
        },

        isFormValid: function () {
            return this.email() && this.password();
        },

        isRegistrationFormValid: function () {
            return this.email() && this.password() && this.firstName() && this.lastName() && (this.password() === this.confirmPassword());
        }
    });
});
