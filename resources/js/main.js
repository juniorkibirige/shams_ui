window.currency = window.currency || 'USH'
window.lang = window.lang || 'en-GB'
window.ipp = window.ipp || '32'
window.so = window.so || 'asc'
window.sb = window.sb || 'product'
window.slider = []
window.slider['left'] = window.slider.left || 0
window.slider['right'] = window.slider.right || 120
window.pages = window.pages || 0
window.ps = window.ps || 1
window.product = window.product || new Object()
window.product.currentuuid = window.product.currentuuid || ''
window.product.uuids = window.product.uuids || new Array()
window.product.index = window.product.index || 0
window.product.currency = window.currency || 'USH'
window.cartChange = window.cartChange || true
window.change = window.change || false
window.reorder = window.reorder || false
/*
Seting the selected values on reload
*/

if (window.location.pathname == '/food/' || window.location.pathname == '/food') {
    if (window.location.search) {
        var data = window.location.search
        let arr_data = data.trim().replace('?', '').split('&')
        arr_data.forEach(data_arr => {
            if (data_arr.split('=')[0] == 'currency' && data_arr.split('=')[1] != window.currency) {
                window.currency = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'items_per_page' && data_arr.split('=')[1] != window.currency) {
                window.ipp = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'sort_by' && data_arr.split('=')[1] != window.sb) {
                window.sb = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'sort_order' && data_arr.split('=')[1] != window.so) {
                window.so = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'page_show' && data_arr.split('=')[1] != window.ps) {
                window.ps = data_arr.split('=')[1]
                window.change = true
            }
        });
        if (window.location.search != '?currency=' + window.currency + '&lang=' + window.lang + '&items_per_page=' + window.ipp + '&sort_by=' + window.sb + '&sort_order=' + window.so + '&_rdr') {
            history.pushState(
                '',
                '',
                window.location.origin.concat(
                    '/food/?currency=' +
                    window.currency +
                    '&items_per_page=' +
                    window.ipp +
                    '&sort_by=' +
                    window.sb +
                    '&sort_order=' +
                    window.so +
                    '&page_show=' +
                    window.ps +
                    '&_rdr'
                )
            )
        }
    } else {
        history.pushState(
            '',
            '',
            window.location.href.concat(
                '?currency=' +
                window.currency +
                '&items_per_page=' +
                window.ipp +
                '&sort_by=' +
                window.sb +
                '&sort_order=' +
                window.so +
                '&page_show=' +
                window.ps +
                '&_rdr'
            )
        )
        window.change = true
    }
} else {
    if (window.location.search) {
        var data = window.location.search
        let arr_data = data.trim().replace('?', '').split('&')
        arr_data.forEach(data_arr => {
            if (data_arr.split('=')[0] == 'currency' && data_arr.split('=')[1] != window.currency) {
                window.currency = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'items_per_page' && data_arr.split('=')[1] != window.currency) {
                window.ipp = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'sort_by' && data_arr.split('=')[1] != window.sb) {
                window.sb = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'sort_order' && data_arr.split('=')[1] != window.so) {
                window.so = data_arr.split('=')[1]
                window.change = true
            } else if (data_arr.split('=')[0] == 'page_show' && data_arr.split('=')[1] != window.ps) {
                window.ps = data_arr.split('=')[1]
                window.change = true
            }
        });
    }
    window.change = true
}
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
var input = $('.validate-input .input100');

$('.login100-form-btn').on('click', () => {
    $('.validate-form-login').submit()
})
$('.login100-form-btn-signup').on('click', () => {
    $('.validate-form-signup').submit()
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

$('.validate-form-login').on('submit', function () {
    var check = true;
    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    return check;
});

$('.validate-form-signup').on('submit', function () {
    var check = true;
    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    return check;
});


$('.validate-form .input100').each(function () {
    $(this).focus(function () {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    } else if ($(input).attr('type') == 'text' && $(input).attr('name') == 'pNo') {
        if ($(input).val().trim().match(/^([0-9]){9}/) == null) {
            return false;
        }
    }
    else {
        if ($(input).val().trim() == '') {
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

/* Actions for Dropdown Box*/

$('.search-open-link').on('click', e => {
    e.preventDefault()
    $('.search_form').addClass('cm-processed-form').addClass('ls-visible').css({ 'z-index': 999999 })
    $('.ty-search-magnifier').css({ 'font-size': 12 + 'px' })
    $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999999 }).on('click', t => {
        $('.search_form').removeClass('cm-processed-form').removeClass('ls-visible').css({ 'z-index': 'unset' })
        $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' }).off('click')
    })
})

$('#sw_select_USD_wrap_currency').on('click', e => {
    e.preventDefault()
    $('#select_USD_wrap_currency').css({ 'z-index': 999999, 'display': 'block' })
    $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999999 }).on('click', t => {
        $('#select_USD_wrap_currency').css({ 'z-index': 'unset', 'display': 'none' })
        $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' }).off('click')
    })
})

$('#sw_select_enGB_wrap_language').on('click', e => {
    e.preventDefault()
})

$('.top-my-account').children(':first-child').on('click', e => {
    e.preventDefault()
    $('.top-my-account').children(':last-child').removeClass('hidden').css({ 'z-index': 999999 })
    $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999999 }).on('click', _ => {
        $('.top-my-account').children(':last-child').addClass('hidden').css({ 'z-index': 'unset' })
        $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' }).off('click')
    })
})

$('#cart_status_324').children(':first-child').on('click', e => {
    e.preventDefault()
    $('#cart_status_324').children(':last-child').removeClass('hidden').css({ 'z-index': 999999 })
    $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999999 }).on('click', t => {
        $('#cart_status_324').children(':last-child').addClass('hidden').css({ 'z-index': 'unset' })
        $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' }).off('click')
    })
})

$('#sw_elm_sort_fields').on('click', e => {
    e.preventDefault()
    $('#elm_sort_fields').removeClass('hidden').css({ 'z-index': 999999 })
    $('.ty-ajax-overlay').css({ 'display': 'block' }).on('click', t => {
        $('#elm_sort_fields').addClass('hidden').css({ 'z-index': 'unset' })
        $('.ty-ajax-overlay').css({ 'display': 'none' }).off('click')
    })
})

$('#elm_sort_fields').children().on('click', e => {
    e.preventDefault()
    let datar = e.target.href.split('?')[1].split('&')
    datar.forEach(data_item => {
        if (data_item.split('=')[0] == 'items_per_page') {
            window.ipp = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_by') {
            window.sb = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_order') {
            window.so = data_item.split('=')[1]
        }
    });
    $('#sw_elm_sort_fields')[0].firstChild.textContent = e.target.innerText
    window.ps = 1
    window.change = true
    $('.ty-ajax-overlay').click()
})

$('#sw_elm_pagination_steps').on('click', e => {
    e.preventDefault()
    $('#elm_pagination_steps').removeClass('hidden').css({ 'z-index': 999999 })
    $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999998 }).on('click', t => {
        $('#elm_pagination_steps').addClass('hidden').css({ 'z-index': 'unset' })
        $('.ty-ajax-overlay').css({ 'display': 'none' }).off('click')
    })
})

$('#elm_pagination_steps').children().on('click', e => {
    e.preventDefault()
    let datar = e.target.href.split('?')[1].split('&')
    datar.forEach(data_item => {
        if (data_item.split('=')[0] == 'items_per_page') {
            window.ipp = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_by') {
            window.sb = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_order') {
            window.so = data_item.split('=')[1]
        }
    });
    $('#sw_elm_pagination_steps')[0].firstChild.textContent = e.target.innerText
    window.ps = 1
    window.change = true
    $('.ty-ajax-overlay').click()
})

$('[data-ca-name]').on('click', e => {
    e.preventDefault()
    if ((e.target == $('[data-ca-name]')[0]) == true) {
        e.target.classList.add('is-active')
        window.currency = e.target.getAttribute('data-ca-name')
        $('#sw_select_USD_wrap_currency').children(':first-child').text(e.target.innerText)
        $('[data-ca-name]')[1].classList.remove('is-active')
        $('.ty-ajax-overlay').click()
        if(location.pathname == '/cart' || location.pathname == '/cart/') {
            if(location.search.includes('currency')) {
                history.pushState('','', window.location.origin.concat('/cart/').concat('?currency='.concat(window.currency)))
            }
            else history.pushState('','',window.location.href.concat('?currency='.concat(window.currency)))
        }
        window.change = true
    } else {
        e.target.classList.add('is-active')
        $('[data-ca-name]')[0].classList.remove('is-active')
        $('#sw_select_USD_wrap_currency').children(':first-child').text(e.target.innerText)
        window.currency = e.target.getAttribute('data-ca-name')
        $('.ty-ajax-overlay').click()
        if(location.pathname == '/cart' || location.pathname == '/cart/') {
            if(location.search.includes('currency')) {
                history.pushState('','', window.location.origin.concat('/cart/').concat('?currency='.concat(window.currency)))
            }
            else history.pushState('','',window.location.href.concat('?currency='.concat(window.currency)))
        }
        window.change = true
    }
})

$('[data-lg-name]').on('click', e => {
    e.preventDefault()
    if ((e.target == $('[data-lg-name]')[0]) == true) {
        e.target.classList.add('is-active')
        history.pushState('', '', window.location.href.concat('?lang=' + e.target.getAttribute('data-lg-name')))
        window.lang = e.target.getAttribute('data-lg-name')
        $('#sw_select_enGB_wrap_language').children(':first-child').text(e.target.innerText)
        $('[data-lg-name]')[1].classList.remove('is-active')
        $('.ty-ajax-overlay').click()
        window.change = true
    } else {
        e.target.classList.add('is-active')
        $('[data-lg-name]')[0].classList.remove('is-active')
        history.pushState('', '', window.location.href.concat('?lang=' + e.target.getAttribute('data-lg-name')))
        $('#sw_select_enGB_wrap_language').children(':first-child').text(e.target.innerText)
        window.lang = e.target.getAttribute('data-lg-name')
        $('.ty-ajax-overlay').click()
        window.change = true
    }
})

$('.search_form').on('submit', e => {
    e.preventDefault()
    e.preventPropagate()
    window.change = true
})

$('.ty-sort-container__views-a').on('click', e => {
    e.preventDefault()
    let data = window.location.href.replace('?', '').trim().split('&')
    data.forEach(data_item => {
        if (data_item.split('=')[0] == 'items_per_page') {
            window.ipp = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_by') {
            window.sb = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'sort_order') {
            window.so = data_item.split('=')[1]
        } else if (data_item.split('=')[0] == 'layout') {
            window.lo = data_item.split('=')[1]
        }
    });
    window.change = true
})

$('#sw_content_24_1').on('click', _ => {
    if (_.target.classList.contains('open')) {
        $('.ty-price-slider').addClass('hidden')
        $('#sw_content_24_1').removeClass('open')
    } else {
        $('.ty-price-slider').removeClass('hidden')
        $('#sw_content_24_1').addClass('open')

    }
})

$('.ty-product-filters__reset-button').on('click', e => {
    e.preventDefault()

    $('input#slider_24_1_right').val(120)
    $('input#slider_24_1_left').val(0)
    $('.ty-range-slider').slider(
        "option",
        "values",
        [$('input#slider_24_1_left').val(), $('input#slider_24_1_right').val()]
    )
    window.change = true
})

$(".ty-range-slider").slider({
    animate: 'slow',
    min: 0,
    max: 120,
    step: 1,
    range: true,
    values: [$('input#slider_24_1_left').val(), $('input#slider_24_1_right').val()],
    extra: "USD"
});
$('input#slider_24_1_left').on('keyup', _ => {
    if ($('input#slider_24_1_left').val() < $('input#slider_24_1_right').val()) {
        $('.ty-range-slider').slider(
            "option",
            "values",
            [$('input#slider_24_1_left').val(), $('input#slider_24_1_right').val()]
        )
        window.change = true
    } else {
        $('input#slider_24_1_left').val($('input#slider_24_1_right').val())
        $('.ty-range-slider').slider(
            "option",
            "values",
            [$('input#slider_24_1_right').val(), $('input#slider_24_1_right').val()]
        )
        window.change = true
    }
})
$('input#slider_24_1_right').on('keyup', _ => {
    if ($('input#slider_24_1_right').val() > $('input#slider_24_1_left').val()) {
        if ($('input#slider_24_1_right').val() > $('.ty-range-slider').slider("option", "max")) {
            $('input#slider_24_1_right').val(120)
            $('.ty-range-slider').slider(
                "option",
                "values",
                1,
                $('input#slider_24_1_right').val()
            )
            window.change = true
        } else {
            $('.ty-range-slider').slider(
                "values",
                1,
                $('input#slider_24_1_right').val()
            )
            window.change = true
        }
    } else {
        if ($('input#slider_24_1_right').val() != '') {
            $('input#slider_24_1_right').val($('input#slider_24_1_left').val())
            $('.ty-range-slider').slider(
                "values",
                1,
                $('input#slider_24_1_right').val()
            )
            window.change = true
        }
    }
})
$('.ty-range-slider').on('click', _ => {
    window.change = true
})
$('.ty-range-slider').children(':nth-child(3)').on('click', _ => {
    window.slider['left'] = $('.ty-range-slider').slider("values", 0)
    $('input#slider_24_1_left').val(window.slider['left'])
    window.change = true
})
$('.ty-range-slider').children(':nth-child(4)').on('click', _ => {
    window.slider['right'] = $('.ty-range-slider').slider("values", 1)
    $('input#slider_24_1_right').val(window.slider['right'])
    window.change = true
})
reloadOnWindowChange = () => {
    if (window.change) {
        window.product.currency = window.currency
        let srt =
            window.sb == 'product'
                ? window.so == 'asc'
                    ? 'Sort Alphabetically: A TO Z'
                    : 'Sort Alphabetically: Z TO A'
                : window.sb == 'price'
                    ? window.so == 'asc'
                        ? 'Sort by Price: Low to High'
                        : 'Sort by Price: High to Low'
                    : window.sb == 'popularity'
                        ? window.so == 'asc'
                            ? 'Sort by Popularity: Low to High'
                            : 'Sort by Popularity: High to Low'
                        : window.sb == 'on_sale'
                            ? window.so == 'asc'
                                ? 'Sort by Discount: High to Low'
                                : 'No Discounts'
                            : 'Random Order'
        let srt_ipp =
            window.ipp == 16
                ? '16 per Page'
                : window.ipp == 32
                    ? '32 per Page'
                    : window.ipp == 64
                        ? '64 per Page'
                        : window.ipp == 128
                            ? '126 Per Page'
                            : '32 per Page'
        let cur =
            window.currency == 'USH'
                ? '(' + window.currency.substring(0, 1).toUpperCase().concat(window.currency.substring(1).toLowerCase()) + ')'
                : '($)'
        if (window.location.pathname == '/food' || window.location.pathname == '/food/') {
            $('#sw_elm_sort_fields')[0].firstChild.textContent = srt
            $('#sw_elm_pagination_steps')[0].firstChild.textContent = srt_ipp
        }
        let url = ''
        $('#sw_select_USD_wrap_currency').children(':first-child').text(cur)
        if (window.location.search.includes('pid')) {
            if (window.location.search.includes('currency') != true) {
                url = window.location.origin.concat(window.location.pathname).concat(window.location.search).concat(
                    '&currency=' +
                    window.currency +
                    '&lang=' +
                    window.lang +
                    '&items_per_page=' +
                    window.ipp +
                    '&sort_by=' +
                    window.sb +
                    '&sort_order=' +
                    window.so +
                    '&page_show=' +
                    window.ps +
                    '&_rdr'
                ).concat(window.location.hash)
            } else {
                let ind = window.location.search.indexOf('currency')
                url = window.location.href.replace(window.location.search.substr(ind, 12), 'currency='.concat(window.currency))
            }
        } else {
            url = window.location.origin.concat(window.location.pathname).concat(
                '?currency=' +
                window.currency +
                '&lang=' +
                window.lang +
                '&items_per_page=' +
                window.ipp +
                '&sort_by=' +
                window.sb +
                '&sort_order=' +
                window.so +
                '&page_show=' +
                window.ps +
                '&_rdr'
            ).concat(window.location.hash)
        }
        if (window.location.search == '?currency=' + window.currency + '&lang=' + window.lang + '&items_per_page=' + window.ipp + '&sort_by=' + window.sb + '&sort_order=' + window.so + '&_rdr') {
            history.pushState(
                '',
                '',
                url
            )
        }
        $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': 999998 })
        $('.ty-ajax-loading-box').css({ 'display': 'block' })
        if (window.location.pathname == '/food/' || window.location.pathname == '/food') {
            $.ajax({
                url: '/resources/app_engine/main_processes/populate_products.php',
                method: 'get',
                data: {
                    'currency': window.currency,
                    'lang': window.lang,
                    'items_per_page': window.ipp,
                    'sort_by': window.sb,
                    'sort_order': window.so
                },
                dataType: 'json',
                success: (e) => {
                    let data = e
                    // console.log(data)
                    var gridList = $('#grid-list__2.grid-list')[0];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (key.toString() == 'status') { continue }
                            else if (key.toString() == 'num_pages') {
                                window.pages = data[key]
                            } else if (key.toString() == 'num_products') {
                                window.num_products = data[key]
                            } else if (key.toString() == '_uuids') {
                                for (const a in data[key]) {
                                    if (data[key].hasOwnProperty(a)) {
                                        const element = data[key][a];
                                        window.product.uuids[a] = element
                                    }
                                }
                                let date = new Date()
                                let exp_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
                                document.cookie = 'window.product=' + JSON.stringify(window.product) + '; expires=' + exp_date + '; secure=true; path=/'
                            }
                            else if (key.toString() == '_page'.concat(window.ps)) {
                                $(gridList).html('').css({ 'background-color': 'cornsilk' })
                                const page = data[key];
                                for (const prod in page) {
                                    if (data[key].hasOwnProperty(prod)) {
                                        const product = page[prod];
                                        if (product != null) {
                                            var pid = 'product_form_'.concat((product.puuid.split('-')[1]).toString())
                                            var column = document.createElement('div')
                                            $(column).addClass('ty-column4')
                                            var gridList_item = document.createElement('div')
                                            $(gridList_item).addClass('ty-grid-list__item ty-quick-view-button__wrapper')
                                                .css({ 'background-color': 'oldlace' })
                                            var gridList_item_form = document.createElement('form')
                                            $(gridList_item_form)
                                                .addClass('cm-disable-empty-files cm-ajax cm-ajax-full-render cm-ajax-status-middle')
                                                .attr('action', 'https://shopping.live/?product_view')
                                                .attr('method', 'post')
                                                .attr('name', pid)
                                                .attr('enctype', 'multipart/form-data')
                                            var resids = document.createElement('input')
                                            $(resids)
                                                .attr('type', 'hidden')
                                                .attr('name', 'result_ids')
                                                .attr('value', 'cart_status*, wish_list*, checkout*, account_info*')
                                            var rurl = document.createElement('input')
                                            $(rurl)
                                                .attr('type', 'hidden')
                                                .attr('name', 'redirect_url')
                                                .attr('value', '?dispatch=categories.view&category_id=' + product.puuid.split('-')[1])
                                            var pdata = document.createElement('input')
                                            $(pdata)
                                                .attr('type', 'hidden')
                                                .attr('name', 'product_data[' + product.puuid + '][product_id]')
                                                .attr('value', product.puuid.split('-')[1])
                                            var gridList_item_image = document.createElement('div')
                                            $(gridList_item_image)
                                                .addClass('ty-grid-list__image flip-container')
                                            let wishList_b_cell = document.createElement('div')
                                            $(wishList_b_cell).addClass('wishlist-button-cell')
                                            let wishlist_btn = document.createElement('a')
                                            $(wishlist_btn)
                                                .attr('id', 'button_wishlist_' + (product.puuid.split('-')[1]).toString())
                                                .addClass('ty-btn ty-btn__text ty-btn__primary cm-submit text-button')
                                                .attr('data-ca-dispatch', 'dispatch[wishlist.add..' + (product.puuid.split('-')[1]).toString() + ']')
                                                .on('click', _ => {
                                                    $(_.target.parentNode)
                                                        .css({
                                                            'opacity': 1,
                                                            'block': 'block'
                                                        })
                                                })
                                            let wish_list = document.createElement('i')
                                            $(wish_list)
                                                .addClass('ty-icon-heart-empty fa fa-heart')
                                                .css({ 'opacity': 0.3 })
                                            let txt = document.createTextNode('Add to wish list')
                                            wishlist_btn.appendChild(wish_list)
                                            wishlist_btn.appendChild(txt)
                                            wishList_b_cell.appendChild(wishlist_btn)
                                            let flipper = document.createElement('div')
                                            $(flipper).addClass('ty-thumbs-wrapper cm-image-gallery flipper')
                                                .on('click', e => {
                                                    let date = new Date()
                                                    let exp_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
                                                    document.cookie = 'window.product=' + JSON.stringify(window.product) + '; expires=' + exp_date + '; secure=true; path=/'
                                                    window.product.currentuuid = $(e.target).parent().attr('href').split('?')[1].split('=')[1]
                                                    window.product.uuids.forEach(v => {
                                                        if (v == window.product.currentuuid) {
                                                            window.product.index = window.product.uuids.indexOf(v)
                                                            document.cookie = 'window.product=' + JSON.stringify(window.product) + '; expires=' + exp_date + ';  secure=true; path=/'
                                                        }
                                                    });
                                                })
                                            let front = document.createElement('div')
                                            $(front).addClass('front')
                                            let aimg = document.createElement('a')
                                            $(aimg).attr('href', '/product_view?pid=' + product.puuid)
                                            let img = document.createElement('img')
                                            $(img).attr('id', 'det_img_' + product.puuid.split('-')[1])
                                                .attr('class', 'ty-pict cm-image')
                                                .attr('src', product.pImg)
                                                .attr('alt', product.alt)
                                                .attr('title', 'Image for raw food provided by Eshams Errand and Grocery Store')
                                            aimg.appendChild(img)
                                            front.appendChild(aimg)
                                            let back = document.createElement('div')
                                            $(back).addClass('back')
                                            let baimg = document.createElement('a')
                                            $(baimg).attr('href', '/product_view?pid=' + product.puuid)
                                            let bimg = document.createElement('img')
                                            $(bimg).attr('id', 'det_img_' + product.puuid.split('-')[1])
                                                .attr('class', 'ty-pict cm-image')
                                                .attr('src', product.pImg)
                                                .attr('alt', product.alt)
                                                .attr('title', 'Image for raw food provided by Eshams Errand and Grocery Store')
                                            baimg.appendChild(bimg)
                                            back.appendChild(baimg)
                                            flipper.appendChild(front)
                                            flipper.appendChild(back)
                                            let quickViewBtn = document.createElement('div')
                                            $(quickViewBtn).addClass('ty-quick-view-button')
                                            let abtn = document.createElement('a')
                                            $(abtn).addClass('ty-btn ty-btn__secondary ty-btn__big cm-dialog-opener cm-dialog-auto-size')
                                                .attr('data-ca-view', product.puuid.split('-')[1])
                                                .attr('data-ca-target-id', 'product_quick_view')
                                                .attr('href', '?dispatch=products.quick_view&product_id=' + product.puuid)
                                                .attr('data-ca-dialog-title', 'Quick Product Viewer')
                                                .attr('rel', 'nofollow')
                                            let qtxt = document.createTextNode('Quick View')
                                            abtn.appendChild(qtxt)
                                            quickViewBtn.appendChild(abtn)
                                            let gridList_item_rating = document.createElement('div')
                                            $(gridList_item_rating).addClass('grid-list__rating')
                                            gridList_item_image.appendChild(wishList_b_cell)
                                            gridList_item_image.appendChild(flipper)
                                            gridList_item_image.appendChild(quickViewBtn)
                                            gridList_item_image.appendChild(gridList_item_rating)
                                            var gridList_item_footer = document.createElement('div')
                                            $(gridList_item_footer)
                                                .addClass('ty-grid-list__item_footer')
                                            let gridList_item_name = document.createElement('div')
                                            $(gridList_item_name)
                                                .addClass('ty-grid-list__item-name')
                                            let aname = document.createElement('a')
                                            $(aname)
                                                .attr('href', '/product_view?pid=' + product.puuid)
                                                .attr('title', 'Image for ' + product.alt + ' provided by Eshams Errand and Grocery Store')
                                                .addClass('product-title')
                                            let productname = window.lang == 'en-GB' ? 'Fresh '.concat(product.name_enGB) : (product.name_lgUG).replace(/\+/g, ' ').replace(/\%92/g, "'")
                                            let txtgridList_item_name = document.createTextNode(productname)
                                            aname.appendChild(txtgridList_item_name)
                                            gridList_item_name.appendChild(aname)
                                            let div = document.createElement('div')
                                            $(div).addClass('divider')
                                            let list_control = document.createElement('div')
                                            $(list_control).addClass('ty-grid-list__control')
                                            let lcbtn = document.createElement('div')
                                            $(lcbtn).addClass('button-container')
                                            let atc = document.createElement('div')
                                            $(atc).addClass('cm-reload-' + product.puuid.split('-')[1])
                                                .attr('id', 'add_to_cart_update_' + product.puuid.split('-')[1])
                                            let a = document.createElement('input')
                                            $(a).attr('type', 'hidden')
                                                .attr('name', 'appearance[show_add_to_cart]')
                                                .attr('value', 1)
                                            let b = document.createElement('input')
                                            $(b).attr('type', 'hidden')
                                                .attr('name', 'appearance[show_list_buttons')
                                                .attr('value', '')
                                            let c = document.createElement('input')
                                            $(c).attr('type', 'hidden')
                                                .attr('name', 'appearance[but_role]')
                                                .attr('value', 'action')
                                            let d = document.createElement('input')
                                            $(d).attr('type', 'hidden')
                                                .attr('name', 'appearance[quick_view]')
                                                .attr('value', '')
                                            let e = document.createElement('a')
                                            $(e).addClass('ty-btn ty-btn__primary ty-btn__big')
                                                .attr('href', '/product_view?pid=' + product.puuid)
                                            let x = document.createElement('i')
                                            $(x).addClass('fa fa-list').css({ 'color': 'black' })
                                            e.appendChild(x)
                                            e.appendChild(document.createTextNode('Select options'))
                                            let h = document.createElement('a')
                                            $(h).addClass('cm-dialog-opener cm-dialog-auto-size ty-btn ty-btn__text ty-cr-product-button')
                                                .attr('id', 'opener_call_request_' + product.puuid.split('-')[1])
                                                .attr('href', '/product_view?pid=' + product.puuid)
                                                .attr('data-ca-target-id', 'content_call_request_' + product.puuid.split('-')[1])
                                                .attr('rel', 'nofollow')
                                            let z = document.createElement('span')
                                            z.appendChild(document.createTextNode('Buy now with 1-click'))
                                            h.appendChild(z)
                                            let g = document.createElement('div')
                                            $(g).addClass('hidden')
                                                .attr('id', 'content_call_request_' + product.puuid.split('-')[1])
                                                .attr('title', 'Buy now with 1-click')
                                            atc.appendChild(a)
                                            atc.appendChild(b)
                                            atc.appendChild(c)
                                            atc.appendChild(d)
                                            atc.appendChild(e)
                                            atc.appendChild(h)
                                            atc.appendChild(document.createTextNode(' '))
                                            atc.appendChild(g)
                                            lcbtn.appendChild(atc)
                                            list_control.appendChild(lcbtn)
                                            let list_price = document.createElement('div')
                                            $(list_price).addClass('ty-grid-list__price')
                                            let i = document.createElement('span')
                                            $(i).attr('id', 'price_update_' + product.puuid.split('-')[1])
                                                .addClass('cm-reload-' + product.puuid.split('-')[1] + ' ty-price-update')
                                            let j = document.createElement('input')
                                            $(j).attr('type', 'hidden')
                                                .attr('name', 'appearance[show_price_values')
                                                .attr('value', 1)
                                            let k = document.createElement('input')
                                            $(k).attr('type', 'hidden')
                                                .attr('name', 'appearance[show_price]')
                                                .attr('value', 1)
                                            let l = document.createElement('span')
                                            $(l).addClass('ty-price')
                                                .attr('id', 'line_discounted_price_' + product.puuid.split('-')[1])
                                            let m = document.createElement('span')
                                            $(m).addClass('ty-price-num')
                                            let cs = (window.currency == 'USD') ? '$' : 'Ush.';
                                            m.appendChild(document.createTextNode(cs))
                                            let n = document.createElement('span')
                                            $(n).addClass('ty-price-num')
                                                .attr('id', 'sec_discounted_price_' + product.puuid.split('-')[1])
                                            let pc = (window.currency == 'USD') ? product.price_USD : product.price_Ush;
                                            n.appendChild(document.createTextNode(pc))
                                            l.appendChild(m)
                                            l.appendChild(n)
                                            i.appendChild(j)
                                            i.appendChild(k)
                                            i.appendChild(l)
                                            let o = document.createElement('span')
                                            $(o).addClass('cm-reload-' + product.puuid.split('-')[1] + ' ty-price-update')
                                            list_price.appendChild(i)
                                            list_price.appendChild(o)
                                            gridList_item_footer.appendChild(gridList_item_name)
                                            gridList_item_footer.appendChild(div)
                                            gridList_item_footer.appendChild(list_control)
                                            gridList_item_footer.appendChild(list_price)
                                            gridList_item_form.appendChild(resids)
                                            gridList_item_form.appendChild(rurl)
                                            gridList_item_form.appendChild(pdata)
                                            gridList_item_form.appendChild(gridList_item_image)
                                            gridList_item_form.appendChild(gridList_item_footer)
                                            gridList_item.appendChild(gridList_item_form)
                                            column.appendChild(gridList_item)
                                            gridList.appendChild(column)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let navigation = $('.ty-pagination__bottom').find('.ty-pagination')[0]
                    $(navigation).html('')
                    if (window.pages > 1) {
                        if (window.ps == 1) {
                            let p = document.createElement('a')
                            $(p).addClass('ty-pagination__item ty-pagination__btn ty_pagination__prev')
                                .attr('data-ca-scroll', '.cm-naviagtion-container')
                                .css("background-color", "cornsilk")
                            let ps = document.createElement('span')
                            $(ps).addClass('ty_pagination__text')
                            let psi = document.createElement('i')
                            $(psi).addClass('fa fa-angle-left')
                            ps.appendChild(psi)
                            ps.appendChild(document.createTextNode('  Prev'))
                            p.appendChild(ps)
                            let q = document.createElement('div')
                            $(q).addClass('ty-pagination__items')
                            for (let i = 1; i <= window.pages; i++) {
                                if (i == window.ps) {
                                    let qs = document.createElement('span')
                                    $(qs).addClass('ty-pagination__selected')
                                    qs.appendChild(document.createTextNode(i))
                                    q.appendChild(qs)
                                } else {
                                    let qa = document.createElement('a')
                                    $(qa).addClass('cm-history ty-pagination__item cm-ajax')
                                        .attr('data-ca-scroll', '.cm-pagination-container')
                                        .attr('href', '?page='.concat(i))
                                        .attr('data-ca-page', i)
                                        .attr('data-ca-target-id', 'pagination_contents')
                                        .css("background-color", "cornsilk")
                                    qa.appendChild(document.createTextNode(i))
                                    $(qa).on('click', e => {
                                        e.preventDefault()
                                        window.ps = parseInt($(qa).attr('data-ca-page'))
                                        window.location.hash = '#'.concat($(qa).attr('data-ca-target-id'))
                                        window.change = true
                                    })
                                    q.appendChild(qa)
                                }
                            }
                            let r = document.createElement('a')
                            $(r).addClass('ty-pagination__item ty-pagination__btn ty-pagination__next cm-history cm-ajax')
                                .attr('data-ca-scroll', '.cm-pagination-container')
                                .attr('href', '?page='.concat(window.ps + 1))
                                .attr('data-ca-page', window.ps + 1)
                                .attr('data-ca-target-id', 'pagination_contents')
                                .css("background-color", "cornsilk")
                            $(r).on('click', _ => {
                                _.preventDefault()
                                window.ps = window.ps + 1
                                window.location.hash = '#'.concat($(r).attr('data-ca-target-id'))
                                window.change = true
                            })
                            let rs = document.createElement('span')
                            let rsi = document.createElement('i')
                            $(rsi).addClass('fa fa-angle-right')
                            rs.appendChild(document.createTextNode('Next  '))
                            $(rs).addClass('ty-pagination__text')
                            r.appendChild(rs)
                            rs.appendChild(rsi)
                            navigation.appendChild(p)
                            navigation.appendChild(q)
                            navigation.appendChild(r)
                        } else if (window.ps == window.pages) {
                            let s = document.createElement('a')
                            $(s).addClass('ty-pagination__item ty-pagination__btn ty_pagination__prev cm-history cm-ajax')
                                .attr('data-ca-scroll', '.cm-naviagtion-container')
                                .attr('data-ca-page', window.ps - 1)
                                .attr('data-ca-target-id', 'pagination-contents')
                                .attr('href', '?page='.concat(window.ps - 1))
                                .css("background-color", "cornsilk")
                            $(s).on('click', _ => {
                                _.preventDefault()
                                window.ps = window.ps - 1
                                window.location.hash = '#'.concat($(s).attr('data-ca-target-id'))
                                window.change = true
                            })
                            let ss = document.createElement('span')
                            $(ss).addClass('ty_pagination__text')
                            let ssi = document.createElement('i')
                            $(ssi).addClass('fa fa-angle-left')
                            ss.appendChild(ssi)
                            ss.appendChild(document.createTextNode('  Prev'))
                            s.appendChild(ss)
                            let t = document.createElement('div')
                            $(t).addClass('ty-pagination__items')
                            for (let i = 1; i <= window.pages; i++) {
                                if (i == window.ps) {
                                    let ts = document.createElement('span')
                                    $(ts).addClass('ty-pagination__selected')
                                    ts.appendChild(document.createTextNode(i))
                                    t.appendChild(ts)
                                } else {
                                    let ta = document.createElement('a')
                                    $(ta).addClass('cm-history ty-pagination__item cm-ajax')
                                        .attr('data-ca-scroll', '.cm-pagination-container')
                                        .attr('href', '?page='.concat(i))
                                        .attr('data-ca-page', i)
                                        .attr('data-ca-target-id', 'pagination_contents')
                                        .css("background-color", "cornsilk")
                                    ta.appendChild(document.createTextNode(i))
                                    $(ta).on('click', e => {
                                        e.preventDefault()
                                        window.ps = parseInt($(ta).attr('data-ca-page'))
                                        window.location.hash = '#'.concat($(ta).attr('data-ca-target-id'))
                                        window.change = true
                                    })
                                    t.appendChild(ta)
                                }
                            }
                            let u = document.createElement('a')
                            $(u).addClass('ty-pagination__item ty-pagination__btn ty-pagination__next')
                                .attr('data-ca-scroll', '.cm-pagination-container')
                                .css("background-color", "cornsilk")
                            let us = document.createElement('span')
                            let usi = document.createElement('i')
                            $(usi).addClass('fa fa-angle-right')
                            us.appendChild(document.createTextNode('Next  '))
                            $(us).addClass('ty-pagination__text')
                            u.appendChild(us)
                            us.appendChild(usi)
                            navigation.appendChild(s)
                            navigation.appendChild(t)
                            navigation.appendChild(u)
                        } else {
                            let s1 = document.createElement('a')
                            $(s1).addClass('ty-pagination__item ty-pagination__btn ty_pagination__prev cm-history cm-ajax')
                                .attr('data-ca-scroll', '.cm-naviagtion-container')
                                .attr('data-ca-page', window.ps - 1)
                                .attr('data-ca-target-id', 'pagination-contents')
                                .attr('href', '?page='.concat(window.ps - 1))
                            $(s1).on('click', _ => {
                                _.preventDefault()
                                window.ps = window.ps - 1
                                window.location.hash = '#'.concat($(s1).attr('data-ca-target-id'))
                                window.change = true
                            })
                            let s1s = document.createElement('span')
                            $(s1s).addClass('ty_pagination__text')
                            let s1si = document.createElement('i')
                            $(s1si).addClass('fa fa-angle-left')
                            s1s.appendChild(s1si)
                            s1s.appendChild(document.createTextNode('  Prev'))
                            s1.appendChild(s1s)
                            let t1 = document.createElement('div')
                            $(t1).addClass('ty-pagination__items')
                            for (let i = 1; i <= window.pages; i++) {
                                if (i == window.ps) {
                                    let t1s = document.createElement('span')
                                    $(t1s).addClass('ty-pagination__selected')
                                    t1s.appendChild(document.createTextNode(i))
                                    t1.appendChild(t1s)
                                } else {
                                    let t1a = document.createElement('a')
                                    $(t1a).addClass('cm-history ty-pagination__item cm-ajax')
                                        .attr('data-ca-scroll', '.cm-pagination-container')
                                        .attr('href', '?page='.concat(i))
                                        .attr('data-ca-page', i)
                                        .attr('data-ca-target-id', 'pagination_contents')
                                    t1a.appendChild(document.createTextNode(i))
                                    $(t1a).on('click', e => {
                                        e.preventDefault()
                                        window.ps = parseInt($(t1a).attr('data-ca-page'))
                                        window.location.hash = '#'.concat($(t1a).attr('data-ca-target-id'))
                                        window.change = true
                                    })
                                    t1.appendChild(t1a)
                                }
                            }
                            let u1 = document.createElement('a')
                            $(u1).addClass('ty-pagination__item ty-pagination__btn ty-pagination__next cm-history cm-ajax')
                                .attr('data-ca-scroll', '.cm-pagination-container')
                                .attr('href', '?page='.concat(window.ps + 1))
                                .attr('data-ca-page', window.ps + 1)
                                .attr('data-ca-target-id', 'pagination_contents')
                            $(u1).on('click', _ => {
                                _.preventDefault()
                                window.ps = window.ps + 1
                                window.location.hash = '#'.concat($(u1).attr('data-ca-target-id'))
                                window.change = true
                            })
                            let u1s = document.createElement('span')
                            let u1si = document.createElement('i')
                            $(u1si).addClass('fa fa-angle-right')
                            u1s.appendChild(document.createTextNode('Next  '))
                            $(u1s).addClass('ty-pagination__text')
                            u1.appendChild(u1s)
                            u1s.appendChild(u1si)
                            navigation.appendChild(s1)
                            navigation.appendChild(t1)
                            navigation.appendChild(u1)
                        }
                    }
                    $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' })
                    $('.ty-ajax-loading-box').css({ 'display': 'none' })
                },
                error: (e) => {
                    console.log('err: ' + e.responseText)
                    $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' })
                    $('.ty-ajax-loading-box').css({ 'display': 'none' })
                }
            })
        }
        else {
            if (window.location.pathname == '/product_view') {
                if (window.currency == "USD") {
                    $('[itemprop=priceCurrency]').attr('content', window.currency)
                    $('[itemprop=price]').attr('content', window.price_usd.toString())
                    $('#line_discounted_price_844').children(':first-child').text('$')
                    $('#line_discounted_price_844').children(':last-child').text(window.price_usd.toString())
                } else {
                    let prc = window.price_ush.toString().substr(0, (window.price_ush.toString().length - 3)) + ',' + window.price_ush.toString().substr(window.price_ush.toString().length - 3)
                    $('[itemprop=priceCurrency]').attr('content', window.currency)
                    $('[itemprop=price]').attr('content', window.price_ush.toString())
                    $('#line_discounted_price_844').children(':first-child').text(window.currency)
                    $('#line_discounted_price_844').children(':last-child').text(prc)
                }
            }
            $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' })
            $('.ty-ajax-loading-box').css({ 'display': 'none' })
        }
        window.slider['left'] = $('.ty-range-slider').slider("values", 0)
        window.slider['right'] = $('.ty-range-slider').slider("values", 1)
        window.change = false
        window.cartChange = true
        if (!window.loggedIn) {
            if(window.location.pathname == '/')
            window.location.href = window.location.origin.concat('/food')
        }
    }
    setTimeout(reloadOnWindowChange, 3000)
}
reloadOnWindowChange()
function toast(body = '', hide = false, t = 500) {
    log(body)
    if ($('toast_top_left').length != 0) {
        $('toast_top_left').html('')
    }
    let toast = document.createElement('div')
    $(toast)
        .attr('role', 'alert')
        .attr('aria-live', 'assertive')
        .attr('aria-atomic', 'true')
        .addClass('toast')
        .attr('data-autohide', hide)
        .attr('data-delay', t)
        .css({ 'width': 350 + 'px' })
    let toast_header = document.createElement('div')
    $(toast_header)
        .addClass('toast-header')
    let ticon = document.createElement('img')
    $(ticon)
        .addClass('rounded mr-2')
        .attr('alt', 'Shams Logo')
        .attr('src', '/favicon.ico')
        .css({
            'width': 25 + 'px',
            'height': 25 + 'px'
        })
    let ttitle = document.createElement('strong')
    $(ttitle)
        .addClass('mr-auto')
    ttitle.appendChild(document.createTextNode('Shams Errand'))
    let ttime = document.createElement('small')
    $(ttime).addClass('text-muted')
    ttime.appendChild(document.createTextNode('now'))
    let tclose = document.createElement('button')
    $(tclose).attr('type', 'button')
        .addClass('m1-2 mb-1 close')
        .attr('data-dismiss', 'toast')
        .attr('aria-label', 'Close')
    let tclose_btn = document.createElement('span').appendChild(document.createTextNode('x'))
    $(tclose_btn).attr('aria-hidden', 'true')
    tclose.appendChild(tclose_btn)
    toast_header.appendChild(ticon)
    toast_header.appendChild(ttitle)
    toast_header.appendChild(ttime)
    toast_header.appendChild(tclose)
    let tbody = document.createElement('div')
    $(tbody).addClass('toast-body')
    tbody.appendChild(document.createTextNode(body))
    toast.appendChild(toast_header)
    toast.appendChild(tbody)
    if ($('#toast_container').length != 0) {
        let toastcontainer = $('#toast_container')[0]
        if ($('toast_top_left').length != 0) {
            $('toast_top_left').html('')
            $('toast_top_left')[0].append(toast)
            toastcontainer.appendChild($('toast_top_left')[0])
        }
    } else {
        let toastcontainer = document.createElement('div')
        $(toastcontainer).attr('id', 'toast_container')
            .addClass('d-flex justify-content-center align-items-center')
            .css({
                'min-width': 200 + 'px',
                'style': 'relative',
                'z-index': 99999
            })
        let tc = document.createElement('div')
        $(tc).css({
            'position': 'fixed',
            'top': 10 + 'px',
            'right': 0,
            'z-index': 99999
        }).addClass('toast_top_left')
        tc.appendChild(toast)
        toastcontainer.appendChild(tc)
        $('#tygh_container')[0].appendChild(toastcontainer)
    }
    $('.toast').toast('show')
    $('.alert-sound').each(function(){
        this.play();
    })
}
log = (body) => {
    console.log('Jarvaang Statistics: ', body)
}
$('[data-ca-target-id="login_block325"').on('click', e => {
    e.preventDefault()
    var showId = $(e.target).attr('data-ca-target-id')
    $(e.target.nextElementSibling).attr('hidden', true)
    $(document.getElementById(showId)).removeClass('hidden')
    $('#ajax_overlay').on('click', _ => {
        $(e.target.nextElementSibling).attr('hidden', false)
        $(document.getElementById(showId)).addClass('hidden')
    })
})
isEmpty = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}
window.authT = ''
document.cookie.split(';').forEach(cookie => {
    let name = cookie.split('=')[0]
    let value = cookie.split('=')[1]
    if (name == 'authToken') {
        window.authT = value
        window.loggedIn = false
    }
});
for (const key in $('form')) {
    if ($('form').hasOwnProperty(key)) {
        const form = $('form')[key];
        try {
            var name = form.getAttribute('name')
            var ia = document.createElement('input')
            $(ia).addClass('hidden')
                .attr('name', 'Bearer Token')
            document.cookie.split(';').forEach(cookie => {
                let name = cookie.split('=')[0]
                let value = cookie.split('=')[1]
                if (cookie.includes('authT')) {
                    window.authT = value
                    $(ia)
                        .attr('value', value)
                    window.loggedIn = true
                }
            });
            ia.value = window.authT
            form.appendChild(ia)
        } catch (e) {
        }
    }
}

$(document).on('ready', _ => {
    log('Recaptcha Loaded')
    var re = document.createElement('div')
    var audio = document.createElement('audio')
    $(audio).addClass('alert-sound')
    $(audio).attr('autoplay', true)
    .attr('src', '/data/sounds/alert.ogg')
    var asrc = document.createElement('source')
    $(asrc).attr('src', '/data/sounds/alert.ogg')
    $(audio)[0].appendChild(asrc)
    $(re).addClass('recaptcha')
    $('body')[0].appendChild(re)
    $('body')[0].appendChild(audio)
    $('.recaptcha').load('/resources/app_engine/side_processes/recaptcha.html')
})

$('[name="dispatch[auth.login]"').on('click', event => {
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
    submitLoginTopBar(event)
})

var submitLoginTopBar = _ => {
    var input = $('.ty-login__input');
    _.preventDefault()
    var email = $(input[0]).val()
    var pass = $(input[1]).val()
    let ret = true
    $.ajax({
        // url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(pass),
        url: 'https://api.live:1443/auth/?email='.concat(email).concat('&password=').concat(pass),
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
            $('#ajax_overlay').click()
            window.location.reload(true)
        },
        error: (data) => {
            console.log(data)
            window.login_error = data.statusText
        }
    })
    return ret;
}