define([
    'jquery',
    'jquery/validate',
    'mage/translate'
], function ($) {
    "use strict";
    return function (config, element) {
        $.validator.addMethod(
            'validateName',
            function (value) {
                return /^[а-яА-ЯёЁіІїЇєЄґҐ-]+$/.test(value);
            },
            $.mage.__('Введіть тільки кириличні символи і дефіси')
        );

        function checkEmailAvailability(email) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: '/graphql',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        query: `
                            query {
                                isEmailAvailable(email: "${email}") {
                                    is_email_available
                                }
                            }
                        `
                    }),
                    success: function (response) {
                        resolve(response.data.isEmailAvailable.is_email_available);
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
            });
        }

        $(document).ready(function () {
            var $lastname = $(element).find('input[name="lastname"]');
            var $firstname = $(element).find('input[name="firstname"]');
            var $email = $(element).find('input[name="email"]');

            if ($lastname.length) {
                $lastname.rules('add', {
                    'validateName': true
                });
                $lastname.on('keyup', function () {
                    $(this).valid();
                });
            }
            if ($firstname.length) {
                $firstname.rules('add', {
                    'validateName': true
                });
                $firstname.on('keyup', function () {
                    $(this).valid();
                });
            }
            if ($email.length) {
                $email.on('blur', function () {
                    var email = $(this).val();
                    if (email) {
                        checkEmailAvailability(email).then(function (isAvailable) {
                            if (!isAvailable) {
                                window.location.href = '/customer/account/login/';
                            }
                        }).catch(function (error) {
                            console.error('Error checking email availability:', error);
                        });
                    }
                });
            }
        });

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            input.valid {
                border-color: green !important;
            }
            input.error {
                border-color: red !important;
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
});
