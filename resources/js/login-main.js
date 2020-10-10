function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    // var input = $('.validate-input .input100');

    $('.login100-form-btn').on('click', async (e) => {
        $('#ajax_overlay').css({
            'display': 'block',
            'z-index': 99999,
            'height': 100 + '%'
        })
        $('#ajax_loading_box').css({
            'display': 'block',
            'z-index': 99999,
        })
        window.login_error = 'undefined'
        submitLogin(e)
        var authT = getCookie('authToken')
        if (authT != '') {
            if (location.search.includes('cont=/cart/')) {
                window.location.href = window.location.origin.concat('/cart/')
            } else
                window.location.href = window.location.origin.concat('/food')
        }
        if (window.login_error !== 'undefined') {
            var err = $('.alert-error')[0]
            if ($(err).length == 0) {
                err = document.createElement('div')
                $(err).addClass('alert alert-danger alert-error text-center')
                    .css({
                        'margin-top': 2 + 'rem'
                    })
            } else {
                $('.alert-error').html('')
            }
            err.appendChild(document.createTextNode(window.login_error))
            $('.root').after(err)
        }
    })
    $('.login100-form-btn-signup').on('click', async (e) => {
        $('#ajax_overlay').css({
            'display': 'block',
            'z-index': 99999,
            'height': 100 + '%'
        })
        $('#ajax_loading_box').css({
            'display': 'block',
            'z-index': 99999,
        })
        window.login_error = 'undefined'
        submitSignUp(e)
    })

    $('.signup100-form-btn').on('click', _ => {
        _.preventDefault()
        history.pushState('', '', window.location.href.replace('tab=login', 'tab=signup'))
        $('.login').hide()
        $('.signup').show()
        $('.login').attr('disabled', true)
        $('.signup').attr('disabled', false)
    })

    $('.login100-form-btn-back').on('click', _ => {
        _.preventDefault()
        history.pushState('', '', window.location.href.replace('tab=signup', 'tab=login'))
        $('.login').show()
        $('.signup').hide()
        $('.login').attr('disabled', false)
        $('.signup').attr('disabled', true)
    })

    var submitLogin = _ => {
        var input = $('.validate-input .input100.inputlogin');
        _.preventDefault()
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check == false) {
            console.log(check)
            $('#ajax_overlay').css({
                'display': 'none',
                'z-index': 'unset',
                'height': 'unset'
            })
            $('#ajax_loading_box').css({
                'display': 'none',
                'z-index': 'unset',
            })
            return;
        }
        var email = $(input[0]).val()
        var pass = $(input[1]).val()
        let ret = true
        $.ajax({
            url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(pass),
            // url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(pass),
            method: 'POST',
            dataType: 'json',
            async: false,
            success: (e) => {
                let data = e
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const property = data[key];
                        if (key.toString() == 'accessId') {
                            ret = true
                            document.cookie = 'authId=' + property + ';  secure=true; path=/'
                        } else if (key.toString() == 'accessToken') {
                            ret = true
                            document.cookie = 'authToken=' + property + '; secure=true; path=/'
                        } else if (key.toString() == 'refreshToken') {
                            ret = true
                            document.cookie = 'refreshToken=' + property + ';  secure=true; path=/'
                        } else if (key.toString() == 'errors') {
                            window.login_error = data.errors
                        }
                    }
                }
            },
            error: (data) => {
                console.log(data)
                window.login_error = data.responseJSON.errors
            }
        })
        $('#ajax_overlay').css({
            'display': 'none',
            'z-index': 'unset',
            'height': 'unset'
        })
        $('#ajax_loading_box').css({
            'display': 'none',
            'z-index': 'unset',
        })
        return ret;
    }

    var submitSignUp = _ => {
        _.preventDefault()
        var input = $('.validate-input .input100.inputsignup');
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check == false) {
            $('#ajax_overlay').css({
                'display': 'none',
                'z-index': 'unset',
                'height': 'unset'
            })
            $('#ajax_loading_box').css({
                'display': 'none',
                'z-index': 'unset',
            })
            return;
        }
        let email = $(input[2]).val()
        let firstName = $(input[0]).val()
        let lastName = $(input[1]).val()
        let password = $(input[3]).val()
        let ret = true

        var phoneNumber = '+256'.concat(email)
        var appVerifier = window.recaptchaVerifier
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(confirmationResult => {
                var c = null
                c = prompt('Please enter code received on your phone')
                if (c == null) {
                    c = prompt('Please enter code received on your phone')
                }
                confirmationResult.confirm(c)
                    .then(function (result) {
                        $.ajax({
                            url: 'https://api.live:1443/users/?email='.concat(email).concat('&firstName=').concat(firstName).concat('&lastName=').concat(lastName).concat('&password=').concat(password),
                            // url: 'https://api.live:1443/users/?email='.concat(email).concat('&firstName=').concat(firstName).concat('&lastName=').concat(lastName).concat('&password=').concat(password),
                            type: 'post',
                            dataType: 'json',
                            async: false,
                            success: e => {
                                let data = e
                                for (const key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        const property = data[key];
                                        if (key.toString() == 'id') {
                                            ret = true
                                            document.cookie = 'authId=' + property + ';  secure=true; path=/'
                                        } else if (key.toString() == 'errors') {
                                            window.login_error = property
                                        }
                                    }
                                }
                                $.ajax({
                                    url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(password),
                                    // url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(password),
                                    method: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    success: (e) => {
                                        let data = e
                                        for (const key in data) {
                                            if (data.hasOwnProperty(key)) {
                                                const property = data[key];
                                                if (key.toString() == 'accessId') {
                                                    ret = true
                                                    document.cookie = 'authId=' + property + ';  secure=true; path=/'
                                                } else if (key.toString() == 'accessToken') {
                                                    ret = true
                                                    document.cookie = 'authToken=' + property + '; secure=true; path=/'
                                                } else if (key.toString() == 'refreshToken') {
                                                    ret = true
                                                    document.cookie = 'refreshToken=' + property + ';  secure=true; path=/'
                                                } else if (key.toString() == 'errors') {
                                                    window.login_error = data.errors
                                                }
                                            }
                                        }
                                    },
                                    error: (data) => {
                                        window.login_error = data.responseJSON.errors
                                    }
                                })
                            },
                            error: e => {
                                let data = e
                                console.log(data)
                            }
                        })
                        log('Firebase has authenticated user')
                        $('#ajax_overlay').css({
                            'display': 'none',
                            'z-index': 'unset',
                            'height': 'unset'
                        })
                        $('#ajax_loading_box').css({
                            'display': 'none',
                            'z-index': 'unset',
                        })
                        var authT = getCookie('authToken')
                        if (authT != '') {
                            window.location.href = window.location.origin.concat('/food')
                        }
                        if (window.login_error !== 'undefined') {
                            var err = $('.alert-error')[0]
                            if ($(err).length == 0) {
                                err = document.createElement('div')
                                $(err).addClass('alert alert-danger alert-error text-center')
                                    .css({
                                        'margin-top': 2 + 'rem'
                                    })
                            } else {
                                $('.alert-error').html('')
                            }
                            err.appendChild(document.createTextNode(window.login_error))
                            $('.root').after(err)
                        }
                    })
            }).catch(error => {
                console.log('Please check your internet connection '.concat(error))
                window.login_error = error
                var err = $('.alert-error')[0]
                if ($(err).length == 0) {
                    err = document.createElement('div')
                    $(err).addClass('alert alert-danger alert-error text-center')
                        .css({
                            'margin-top': 2 + 'rem'
                        })
                } else {
                    $('.alert-error').html('')
                }
                err.appendChild(document.createTextNode(error))
                $('.root').after(err)
                window.recaptchaVerifier.render().then(function (widgetId) {
                    grecaptcha.reset(widgetId)
                })
                $('#ajax_overlay').css({
                    'display': 'none',
                    'z-index': 'unset',
                    'height': 'unset'
                })
                $('#ajax_loading_box').css({
                    'display': 'none',
                    'z-index': 'unset',
                })
            })
        return ret;
    }

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([0-9]){9}/) == null) {
                console.log('email err')
                return false;
            }
        } else if ($(input).attr('type') == 'text' && $(input).attr('name') == 'pNo') {
            if ($(input).val().trim().match(/^([0-9]){9}/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                console.log('email err1')
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);