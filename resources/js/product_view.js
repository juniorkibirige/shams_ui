function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/;secure=true;domain=shopping.live";
}

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

function checkCookie(token) {
    var user = getCookie(token);
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function deleteCookie(token) {
    document.cookie = token.concat("='';expires=Thu 01 Jan 1970; path=/;")
}
window.login = ''
/* Cart and Wishlist Functions */
var cart = (_ => {
    'use strict'
    if (!('indexedDB' in window)) {
        log('This Browser doesn\'t support the services!')
        toast('Please use another browser i.e. Firefox', false)
        return
    } else {
        log('This Browser supports the services!')
    }
    window.kilometerPrice = 2000
    var dbPromise = idb.open('shamseshop', 4, upgradeDB => {
        switch (upgradeDB.oldVersion) {
            case 0:
                toast('Setting up the shopping services ...', true)
                log('Initialising Services For User '.concat(uuidv4()))
                upgradeDB.createObjectStore('products', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('products')
                store.createIndex('puuid', 'puuid', { unique: true })
                store.createIndex('name_enGB', 'name_enGB')
                store.createIndex('category', 'category')
                store.createIndex('price_USD', 'price_USD')
                store.createIndex('price_Ush', 'price_Ush')
                upgradeDB.createObjectStore('cart', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('cart')
                store.createIndex('puuid', 'puuid', { unique: true })
                upgradeDB.createObjectStore('wishlist', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('wishlist')
                store.createIndex('puuid', 'puuid', { unique: true })
                upgradeDB.createObjectStore('users', { keyPath: 'id' })
                var store = upgradeDB.transaction.objectStore('users')
                store.createIndex('id', 'id', { unique: true })
                products()
            case 1:
                toast('Upgrading services', true, 3000)
                log('Upgrading services ...')
                upgradeDB.createObjectStore('products', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('products')
                store.createIndex('puuid', 'puuid', { unique: true })
                store.createIndex('name_enGB', 'name_enGB')
                store.createIndex('category', 'category')
                store.createIndex('price_USD', 'price_USD')
                store.createIndex('price_Ush', 'price_Ush')
                upgradeDB.createObjectStore('cart', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('cart')
                store.createIndex('puuid', 'puuid', { unique: true })
                upgradeDB.createObjectStore('wishlist', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('wishlist')
                store.createIndex('puuid', 'puuid', { unique: true })
                upgradeDB.createObjectStore('users', { keyPath: 'id' })
                var store = upgradeDB.transaction.objectStore('users')
                store.createIndex('id', 'id', { unique: true })
                products()
            case 2:
                log('Upgrading services')
                toast('Upgrading services', true, 3000)
                upgradeDB.createObjectStore('user_location', { keyPath: 'puuid' })
                var store = upgradeDB.transaction.objectStore('user_location')
                store.createIndex('puuid', 'puuid', { unique: true })
            case 3:
                log('Upgrading services')
                toast('Upgrading Services', true, 3000)
                upgradeDB.createObjectStore('user_orders', { keyPath: 'mr' })
                var store = upgradeDB.transaction.objectStore('user_orders')
                store.createIndex('mr', 'mr', { unique: true })
                store.createIndex('uuid', 'uuid')
            default:
                log('Services already initialised on this device!')
                $('.toast').toast('hide')
        }
    })

    function addProducts(prod) {
        dbPromise.then(db => {
            var tx = db.transaction('products', 'readwrite');
            var store = tx.objectStore('products');
            var items = prod;
            return Promise.all(items.map(function (item) {
                return store.add(item);
            })
            ).catch(function (e) {
                tx.abort();
                console.log(e);
            }).then(function () {
                $('.toast').toast('hide')
                log('All Products added successfully!');
            });
        });
    }

    function loginUser(user) {
        dbPromise.then(db => {
            var tx = db.transaction('users', 'readwrite')
            var store = tx.objectStore('users')
            var users = [user]
            window.login = user
            return Promise.all(users.map(item => {
                return store.add(item)
            })).catch(e => {
                tx.abort()
            }).then(_ => {
                log('User logged in')
            })
        })
    }

    function getUser() {
        var key = IDBKeyRange.only(window.authI)
        dbPromise.then(db => {
            var tx = db.transaction('users', 'readonly')
            var store = tx.objectStore('users')
            var index = store.index('id')
            return index.openCursor(key)
        }).then(function User(user) {
            if (typeof user == 'undefined') { return false; }
            if (user.value.id.toString() == window.authI) {
                window.login = user.value
                $('[name="reference"]').val(uuidv4())
                $('[name="first_name"]').val(window.login.firstName)
                $('[name="last_name"]').val(window.login.lastName)
                $('[name="email"].checkout_confirm').val('0'.concat(window.login.email))
                if (window.location.pathname == '/checkout/' || window.location.pathname == '/checkout') {
                    $('.step1')[0].textContent = 'Signed In as '.concat(login.firstName)
                }
                if (!isEmpty(window.login)) {
                    log('Done')
                    if ($('.logout').length == 0) {
                        var logout = document.createElement('a')
                        $(logout)
                            .addClass('cm-dialog-opener cm-dialog-auto-size ty-btn ty-btn__secondary logout')
                            .attr('data-ca-target-id', 'logout_block325')
                            .text('Logout '
                                .concat(login.firstName)
                            ).on('click', _ => {
                                if (undefined !== window.firebase)
                                    firebase.auth.signout()
                                window.authT = undefined
                                window.authI = undefined
                                delete (window.authI)
                                delete (window.authT)
                                deleteCookie('authToken')
                                deleteCookie('authId')
                                deleteCookie('refreshToken')
                                deleteCookie('active_page')
                                window.location.reload()
                            })
                        $('.ty-account-info__buttons').children(':first-child').before(logout)
                        $('.ty-account-info__buttons').children(':nth-child(2)').css({ 'display': 'none' }).attr('aria-hidden', true)
                        $('.ty-account-info__buttons').children(':nth-child(3)').css({ 'display': 'none' }).attr('aria-hidden', true)
                    }
                }
                return true;
            }
            return user.continue().then(User)
        }).then(_ => {
            return ''.concat(_)
        })
    }

    function addPostedOrder(uuid, mr) {
        $.ajax({
            url: 'https://api.live:1443/orders/',
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(getCookie('authToken'))
            },
            data: JSON.stringify([{
                uuid: uuid.toString(),
                transaction_tracker: null,
                merchant_reference: mr.toString(),
                order_status: null
            }]),
            success: e => {
                log(e)
                setCookie('oid', e.id, 0.125)
                dbPromise.then(db => {
                    var tx = db.transaction('user_orders', 'readwrite')
                    var store = tx.objectStore('user_orders')
                    var porder = [
                        {
                            'id': e.id,
                            'mr': mr,
                            'uuid': uuid,
                            'prt': '',
                            'ps': null
                        }
                    ]
                    return Promise.all(porder.map(po => {
                        return store.add(po)
                    })).then(_ => {
                        log('Order posted for payment')
                        processOrderCheckout()
                    }).catch(e => {
                        tx.abort()
                        log(e)
                    })
                })
            },
            error: e => {
                // var err = JSON.parse(e.responseJSON)
                // log(err)
                toast(e['responseJSON']['result']['errmsg'].includes('duplicate') ? 'This Order has already been Placed.\r\nIf you wish to reorder please use the provided button!' : e['responseJSON']['result']['errmsg'], false)
                var pb = $('.processor-buttons')
                $(pb).html('')
                pb.removeClass('hidden')
                    .css({
                        'padding': 1.25 + 'rem'
                    })
                var pbtn = $('.cm-checkout-place-order').clone(true)
                $('.cm-checkout-place-order').hide()
                pbtn[0].textContent = 'Re-Order'
                pbtn.css({
                    backgroundColor: 'darkolivegreen'
                })
                pbtn.removeClass('cm-checkout-place-order').addClass('cm-checkout-re-order')
                pbtn[0].setAttribute('id', 'place_reorder_tab3')
                $(pbtn).on('click', _ => {
                    window.reorder = true;
                })
                pb.append(pbtn)
            }
        })

    }

    function getPostedOrder(mr, uuid, prt, ps) {
        var key = IDBKeyRange.only(mr)
        var order;
        dbPromise.then(db => {
            var tx = db.transaction('user_orders', 'readonly')
            var store = tx.objectStore('user_orders')
            var index = store.index('mr')
            return index.openCursor(key)
        }).then(function PO(po) {
            if (typeof po == 'undefined') { return false; }
            else if (po.value.mr.toString() == mr && po.value.uuid.toString() == uuid) {
                console.log(po.value)
                order = po.value
                updatePostedOrder(order, ps, prt)
            } else {
                return po.continue().then(PO)
            }
        }).then(_ => {
            console.log(_)
        })
    }

    function updatePostedOrder(order, ps = null, prt) {
        dbPromise.then(db => {
            var tx = db.transaction('user_orders', 'readwrite')
            var store = tx.objectStore('user_orders')
            order.prt = prt
            order.ps = ps
            store.put(order)
            return tx.complete
        }).then(_ => {
            log(order)
            $.ajax({
                url: 'https://api.live:1443/orders/',
                type: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(getCookie('authToken'))
                },
                data: JSON.stringify(order),
                success: e => {
                    log(e)
                },
                error: e => {
                    log(e)
                }
            })
            log('po Was updated')
        })
    }

    function addOrder(order, oS) {
        dbPromise.then(db => {
            var tx = db.transaction(oS, 'readwrite')
            var store = tx.objectStore(oS)
            var orders = [order]
            return Promise.all(orders.map(item => {
                return store.add(item)
            })
            ).then(_ => {
                log(order.name_enGB.toString().concat(' added to '.concat(oS, ' list')))
            }).catch(e => {
                tx.abort()
                if (e.toString().includes('constrain')) {
                    toast('Product '.concat(order.name_enGB).concat(' already exists in your cart!\nTo change quantity please go to your cart!'), true, 5000)
                }
            })
        })
    }

    function confirmProductExists(uuid, oS, qty = 1, sto = 'products') {
        var key = uuid.toString()
        if (key === '') { return; }
        var range = IDBKeyRange.only(key)
        var s = null
        dbPromise.then(db => {
            var tx = db.transaction(sto, 'readonly')
            var store = tx.objectStore(sto)
            var index = store.index('puuid')
            return index.openCursor(range)
        }).then(function isObj(product) {
            if (!product) { return; }
            product.value.buyQty = qty
            s = product.value
            return product.continue().then(isObj)
        }).then(_ => {
            if (s === null) {
                log('Please reload the page products have changed on the server')
                toast('Please reload your page to refresh the products,\ndue to product update on the server', true, 5000)
            } else {
                if (sto == 'products') {
                    addOrder(s, oS)
                } else {
                    return true
                }
            }
        })
    }

    function getOrders(oS) {
        return dbPromise.then(db => {
            var tx = db.transaction(oS, 'readonly');
            var store = tx.objectStore(oS)
            return store.getAll()
        })
    }

    function deleteOrder(order) {
        confirmProductExists(order.puuid, '', 1, 'cart')
        confirmDelete(order, 'cart')
    }

    function removeOrder(order) {
        dbPromise.then(db => {
            var tx = db.transaction('cart', 'readwrite')
            var store = tx.objectStore('cart')
            var key = IDBKeyRange.only(order.puuid)
            store.delete(key)
            return tx.commplete
        }).then(e => {
            toast(order.name_enGB.concat(' has been removed from the cart!'), true, 3000)
            window.numCart -= 1
            window.cartChange = true
        })
    }

    function updateOrder(order) {
        dbPromise.then(db => {
            var tx = db.transaction('cart', 'readwrite');
            var store = tx.objectStore('cart')
            store.put(order)
            return tx.complete
        }).then(_ => {
            log('Order was updated')
        })
    }

    function getUserLoc(puuid) {
        dbPromise.then(db => {
            var tx = db.transaction('user_location', 'readonly')
            var store = tx.objectStore('user_location')
            var index = store.index('puuid')
            return index.openCursor(IDBKeyRange.only(puuid))
        }).then(function Loc(loc) {
            if (typeof loc == 'undefined') { return; }
            console.log(Loc)
            return loc.continue().then(Loc)
        }).then(function (a) {
            log('User location: '.concat(a))
        })
    }

    function addUserLoc(puuid, lat, long, town) {
        dbPromise.then(db => {
            var tx = db.transaction('user_location', 'readwrite')
            var store = tx.objectStore('user_location')
            var userLoc = [
                {
                    'puuid': puuid,
                    'lat': lat,
                    'long': long,
                    'town': town
                }
            ]
            return Promise.all(userLoc.map(loc => {
                return store.add(loc)
            })).then(_ => {
                log('User location added')
            }).catch(e => {
                tx.abort()
                log(e)
            })
        })
    }

    return {
        dbPromise: (dbPromise),
        addPostedOrder: (addPostedOrder),
        updatePostedOrder: (updatePostedOrder),
        getPostedOrder: (getPostedOrder),
        getUserLoc: (getUserLoc),
        addUserLoc: (addUserLoc),
        addProducts: (addProducts),
        confirmProductExists: (confirmProductExists),
        addOrder: (addOrder),
        getOrders: (getOrders),
        deleteOrder: (deleteOrder),
        removeOrder: (removeOrder),
        loginUser: (loginUser),
        updateOrder: (updateOrder),
        getUser: (getUser),
    }
})()

if (location.pathname == '/checkout/' && location.pathname == '/checkout') {
    if (getCookie('authId') != '' && getCookie('authToken') != '' && getCookie('refreshToken') != '') {
        location.href = location.origin.concat('/login?cont=/checkout')
    }
}

$('.checkout-confirm__submit-btn').on('click', _ => {
    // _.preventDefault()
    var mr = $('.checkout_confirm[name="reference"]').val()
    var uuid = getCookie('authId')
    cart.addPostedOrder(uuid, mr)
    toast(mr.concat('&uuid:').concat(uuid), true, 2000)
})

function upPO(prt, mr, ps) {
    cart.getPostedOrder(mr, getCookie('authId'), prt, ps)
}
function products() {
    var products = []
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
        success: e => {
            let data = e
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key.toString() == 'status') { }
                    else if (key.toString() == 'num_pages') {

                    } else if (key.toString() == 'num_products') {

                    } else if (key.toString() == '_uuids') {

                    } else if (key.toString().includes('_page')) {
                        const page = data[key]
                        for (const prod in page) {
                            if (data[key].hasOwnProperty(prod)) {
                                const product = page[prod]
                                products.push(product)
                            }
                        }
                    }
                }
            }
            cart.addProducts(products)
        }
    })
}

function getAllCart() {
    cart.getOrders('cart').then(orders => {
        window.cartPriceUSD = 0
        window.cartPriceUsh = 0
        Promise.all(
            orders.map(order => {
                window.cartPriceUSD += parseFloat(order.price_USD) * parseInt(order.buyQty / parseInt(order.saleQty))
                window.cartPriceUsh += parseInt(order.price_Ush) * parseInt(order.buyQty / parseInt(order.saleQty))
            })
        )
        window.numCart = orders.length
        window.cartPriceUshNoComma = window.cartPriceUsh
        window.cartPriceUsh = window.cartPriceUsh.toString().substr(0, window.cartPriceUsh.toString().length - 3).concat(',').concat(window.cartPriceUsh.toString().substr(window.cartPriceUsh.toString().length - 3))
        return add2Cart(orders)
    })
}
function add2Cart(orders) {
    if (orders.length != 0) {
        var cartHeader = $('[id*="cart_status_"]').children(':first-child')
        var cartBody = $('[id*="cart_status_"]').children(':last-child')
        var cartTitle = $('.ty-minicart-title')
        cartTitle.removeClass('empty-cart')
        if (cartTitle.children('.visible-phone').length == 0) {
            var cT = document.createElement('span')
            $(cT).addClass('visible-phone')
            cartTitle.children('.hidden-phone').before(cT)
        }
        $('.ty-icon-basket').removeClass('empty').addClass('filled')
        cartTitle.children('.visible-phone')[0].textContent = 'Q:'
        if ($('.cartTitle').length == 0) {
            var ctTitle = document.createElement('span')
            $(ctTitle).addClass('cartTitle')
            ctTitle.appendChild(document.createTextNode(window.numCart))
            cartTitle.children('.visible-phone').after(ctTitle)
        } else {
            $('.cartTitle').text(window.numCart)
        }
        cartTitle.children('.hidden-phone').html('')
        if (window.currency == 'USD') {
            window.cSign = '$'
            cartTitle.children('.hidden-phone')[0].append(document.createTextNode(' item(s) for $'))
            var cTprice = document.createElement('span')
            cTprice.appendChild(document.createTextNode(window.cartPriceUSD))
            cartTitle.children('.hidden-phone')[0].append(cTprice)
        } else {
            window.cSign = 'Ush'
            cartTitle.children('.hidden-phone')[0].append(document.createTextNode(' item(s) for Ush. '))
            var cTprice = document.createElement('span')
            cTprice.appendChild(document.createTextNode(window.cartPriceUsh))
            cartTitle.children('.hidden-phone')[0].append(cTprice)
        }
        var cartItems = cartBody.find('.ty-cart-items')
        cartItems.html('')
        if ($('ul.ty-cart-items__list').length == 0) {
            var cartList = document.createElement('ul')
            $(cartList).addClass('ty-cart-items__list')
            cartItems[0].appendChild(cartList)
        }
        orders.forEach(order => {
            var cartitem = document.createElement('li')
            $(cartitem).addClass('ty-cart-items__list-item')
            var cartitemd1 = document.createElement('div')
            $(cartitemd1).addClass('ty-cart-items__list-item-image')
            let d1 = document.createElement('img')
            $(d1).addClass('ty-pict cm-image')
                .attr('src', order.pImg)
                .attr('alt', order.name_enGB)
                .attr('title', order.name_enGB)
                .css({
                    'width': 40 + 'px',
                    'height': 40 + 'px'
                })
            cartitemd1.appendChild(d1)
            var cartitemd2 = document.createElement('div')
            $(cartitemd2).addClass('ty-cart-items__list-item-desc')
            let d2a = document.createElement('a')
            $(d2a).attr('href', '/product_view?pid='.concat(order.puuid))
            d2a.appendChild(document.createTextNode(order.name_enGB))
            let d2p = document.createElement('p')
            let d2ps1 = document.createElement('span')
            let d2ps1t = document.createTextNode(parseInt(order.buyQty / parseInt(order.saleQty)))
            d2ps1.appendChild(d2ps1t)
            let d2ps2 = document.createElement('span')
            let d2ps2t = document.createTextNode(' x ')
            d2ps2.appendChild(d2ps2t)
            let d2psn = document.createElement('span')
            $(d2psn).addClass('none')
            let d2psnt = document.createTextNode(window.cSign.concat(''))
            d2psn.appendChild(d2psnt)
            let d2psni = document.createElement('span')
            $(d2psni).addClass('none').attr('sec_price_'.concat(order.puuid.split('-')[3]))
            let d2psnit;
            if (window.currency == 'USD')
                d2psnit = document.createTextNode(order.price_USD)
            else
                d2psnit = document.createTextNode(' '.concat(order.price_Ush.toString().substr(0, order.price_Ush.length - 3).concat(',').concat(order.price_Ush.toString().substr(order.price_Ush.toString().length - 3))))
            d2psni.appendChild(d2psnit)
            d2p.appendChild(d2ps1)
            d2p.appendChild(d2ps2)
            d2p.appendChild(d2psn)
            d2p.appendChild(d2psni)
            cartitemd2.appendChild(d2a)
            cartitemd2.appendChild(d2p)
            var cartitemd3 = document.createElement('div')
            $(cartitemd3).addClass('ty-cart-items__list-item-tools cm-cart-item-delete')
            cartitem.appendChild(cartitemd1)
            cartitem.appendChild(cartitemd2)
            cartitem.appendChild(cartitemd3)
            var x = document.createElement('i')
            $(x).addClass('fa fa-times-circle')
                .on('click', f => {
                    log('Item removed from cart', true, 2000)
                })
                .css({ 'cursor': 'pointer' })
            $(cartitem).children('.cm-cart-item-delete')[0].appendChild(x)
            $(cartitem).children('.cm-cart-item-delete').on('click', f => {
                cart.deleteOrder(order)
                log(order.name_enGB.concat(' removed from cart'))
            })
            $('.ty-cart-content__buttons').removeClass('hidden')
            $('.ty-cart-items__list')[0].appendChild(cartitem)
        })
    } else {
        $('.cartTitle').html('')
        $('.ty-cart-content__buttons').addClass('hidden')
        var cartTitle = $('.ty-minicart-title')
        cartTitle.addClass('empty-cart')
        cartTitle.children($('.cartTitle')).html('')
        $('.ty-icon-basket').removeClass('filled').addClass('empty')
        $('.ty-cart-items').html('<div class="ty-cart-items__empty ty-center">Cart is empty</div>')
    }
}
function getCartItems() {
    cart.getOrders('cart').then(orders => {
        window.ViewcartPriceUSD = 0
        window.ViewcartPriceUsh = 0
        Promise.all(
            orders.map(order => {
                window.ViewcartPriceUSD += parseFloat(order.price_USD) * parseInt(order.buyQty / parseInt(order.saleQty))
                window.ViewcartPriceUsh += parseInt(order.price_Ush) * parseInt(order.buyQty / parseInt(order.saleQty))
            })
        )
        window.numCart = orders.length
        window.ViewcartPriceUsh = window.ViewcartPriceUsh.toString().substr(0, window.ViewcartPriceUsh.toString().length - 3).concat(',').concat(window.ViewcartPriceUsh.toString().substr(window.ViewcartPriceUsh.toString().length - 3))
        return add2ViewCart(orders)
    })
}

function delOrder(order) {
    cart.deleteOrder(order)
}

function upOrder(order) {
    cart.updateOrder(order)
}
var clearC = $('.ty-cart-content__top-buttons').children(':first-child').children(':last-child')
clearC.on('click', _ => {
    _.preventDefault()
    if (confirm('Would you like to clear your cart?'))
        cart.getOrders('cart').then(orders => {
            orders.forEach(order => {
                cart.deleteOrder(order)
            })
            log('Your cart has been cleared')
            toast('You have cleared your cart!', false)
        })
})

function add2ViewCart(orders) {
    if (orders.length != 0) {
        let cart = $('.ty-cart-content').children(':last-child')
        $(cart).html('')
        let cartSubTotal = $('.ty-cart-statistic').children(':first-child').children(':last-child').contents()
        let del = $('.ty-cart-statistic').children(':last-child').children(':last-child').contents()
        let cartTotal = $('.ty-cart-statistic__total-list').children(':first-child').children(':last-child')
        let delSymbol = del[0]
        let delPrice = del[1]
        let curSymbol = cartSubTotal[0]
        let curPrice = cartSubTotal[1]
        let curTotalSymbol = cartTotal.children(':first-child').contents()[0]
        let curTotalPrice = cartTotal.children(':last-child')[0]
        if (window.currency == 'USD') {
            curSymbol.textContent = '$ '
            curTotalSymbol.textContent = '$ '
            delSymbol.textContent = '$ '
            curPrice.textContent = window.cartPriceUSD
            curTotalPrice.textContent = window.cartPriceUSD
        } else {
            curSymbol.textContent = 'Ush '
            curTotalSymbol.textContent = 'Ush '
            delSymbol.textContent = 'Ush '
            curPrice.textContent = window.cartPriceUsh
            curTotalPrice.textContent = window.cartPriceUsh
        }
        var orderItems = Array()
        var count = 0
        orders.forEach(order => {
            orderItems[count++] = order.name_enGB.concat(' => ').concat(order.buyQty)
            let cartElem = document.createElement('tr')
            let t1 = document.createElement('td')
            $(t1).addClass('ty-cart-content__product-elem ty-cart-content__image-block')
            let t1d = document.createElement('div')
            $(t1d).attr('id', 'product_image_update_'.concat(order.puuid.split('-')[3]))
                .addClass('ty-cart-content__image cm-reload-'.concat(order.puuid.split('-')[3]))
            let t1da = document.createElement('a')
            $(t1da).attr('href', '/product_view?pid='.concat(order.puuid))
            let t1dai = document.createElement('img')
            $(t1dai).addClass('ty-pict cm-image')
                .attr('id', 'det_img_'.concat(order.puuid.split('-')[3]))
                .attr('src', order.pImg)
                .attr('alt', order.name_enGB)
                .attr('title', order.name_enGB)
            t1da.appendChild(t1dai)
            t1d.appendChild(t1da)
            t1.appendChild(t1d)
            let t2 = document.createElement('td')
            $(t2).addClass('ty-cart-content__product-elem ty-cart-content__description')
                .css({
                    'width': 50 + '%'
                })
            let t2a1 = document.createElement('a')
            $(t2a1).addClass('ty-cart-content__product-title')
                .attr('href', '/product_view?pid='.concat(order.puuid))
            t2a1.appendChild(document.createTextNode(order.saleQty.toUpperCase().concat(' - ').concat(order.name_enGB.toUpperCase())))
            t2.appendChild(t2a1)
            let t2a2 = document.createElement('a')
            $(t2a2).addClass('ty-cart-content__product-delete ty-delete-big')
                .attr('data-ca-target-id', 'cart_items,checkout_totals,cart_status*,checkout_steps,checkout_cart')
                .attr('href', '?dispatch=[order.delete]&cart_id='.concat(order.puuid))
                .attr('title', 'Remove Order')
            let t2a2i = document.createElement('i')
            $(t2a2i).addClass('ty-delete-big__icon ty-icon-cancel-circle')
                .on('click', f => {
                    f.preventDefault()
                    delOrder(order)
                    log(order.name_enGB.concat(' removed from cart'))
                })
            t2a2.appendChild(t2a2i)
            t2.appendChild(t2a2)
            let t2d = document.createElement('div')
            $(t2d).attr('id', 'sku_'.concat(order.puuid.split('-')[3]))
                .addClass('ty-cart-content__sku ty-sku')
            t2d.appendChild(document.createTextNode('CODE: '))
            let t2ds = document.createElement('span')
            $(t2ds).addClass('cm-reload-'.concat(order.puuid.split('-')[3]))
                .attr('id', 'product_code_update_'.concat(order.puuid.split('-')[3]))
            t2ds.appendChild(document.createTextNode(order.puuid.split('-')[1].toUpperCase()))
            t2d.appendChild(t2ds)
            t2.appendChild(t2d)
            let t3 = document.createElement('td')
            $(t3).addClass('ty-cart-content__product-elem ty-cart-content__price cm-reload-'.concat(order.puuid.split('-')[3]))
                .attr('id', 'price-display-update_'.concat(order.puuid.split('-')[3]))
            var price
            if (window.currency == 'USD') {
                window.cSign = '$'
                price = order.price_USD
            } else {
                window.cSign = 'Ush'
                price = order.price_Ush
            }
            let t3s = document.createElement('span')
            $(t3s).addClass('ty-sub-price')
            t3s.appendChild(document.createTextNode(window.cSign.concat(' ')))
            t3.appendChild(t3s)
            let t3s2 = document.createElement('span')
            $(t3s2).addClass('ty-sub-price')
                .attr('id', 'sec_product_price_'.concat(order.puuid.split('-')[3]))
            t3s2.appendChild(document.createTextNode(price))
            t3.appendChild(t3s2)
            let t4 = document.createElement('td')
            $(t4).addClass('ty-cart-content__product-elem ty-cart-content__qty')
            let t4d = document.createElement('div')
            $(t4d).attr('id', 'quantity_update_'.concat(order.puuid.split('-')[3]))
                .addClass('quantity cm-reload-'.concat(order.puuid.split('-')[3]).concat(' changer'))
            let t4dl = document.createElement('label')
            t4dl.setAttribute('for', 'amount_'.concat(order.puuid.split('-')[3]))
            t4d.appendChild(t4dl)
            let t4dd = document.createElement('div')
            $(t4dd).addClass('ty-center ty-value-changer cm-value-changer')
            let t4dda = document.createElement('a')
            $(t4dda).addClass('cm-increase ty-value-changer__increase')
                .attr('step', parseInt(order.saleQty))
                .on('click', e => {
                    let curQty = parseInt($(e.target).parent().children('.ty-value-changer__input').val())
                    let stepValue = parseInt($(e.target).attr('step'))
                    curQty += stepValue
                    $(e.target).parent().children('.ty-value-changer__input').val(curQty)
                    order.buyQty = curQty
                    upOrder(order)
                    window.cartChange = true
                })
            t4dda.appendChild(document.createTextNode('+'))
            let t4ddi = document.createElement('input')
            $(t4ddi).attr('id', 'amount_'.concat(order.puuid.split('-')[3]))
                .addClass('ty-value-changer__input cm-amount')
                .attr('type', 'text')
                .attr('size', parseInt(order.saleQty))
                .attr('name', 'cart_products['.concat(order.puuid.split('-')[3]).concat('][amount]'))
                .attr('value', parseInt(order.buyQty))
                .attr('data-ca-min-qty', parseInt(order.saleQty))
                .attr('min', parseInt(order.saleQty))
                .attr('step', parseInt(order.saleQty))
            let t4dda1 = document.createElement('a')
            $(t4dda1).addClass('cm-decrease ty-value-changer__decrease')
                .attr('step', parseInt(order.saleQty))
                .on('click', e => {
                    var minValue = parseInt($(e.target).parent().children('.ty-value-changer__input').attr('data-ca-min-qty'))
                    let curQty = $(e.target).parent().children('.ty-value-changer__input').val()
                    if (curQty <= minValue) {

                    } else {
                        let stepValue = parseInt($(e.target).attr('step'))
                        curQty -= stepValue
                        $(e.target).parent().children('.ty-value-changer__input').val(curQty)
                        order.buyQty = curQty
                        upOrder(order)
                        window.cartChange = true
                    }
                })
            t4dda1.appendChild(document.createTextNode('-'))
            t4d.appendChild(t4dd)
            t4dd.appendChild(t4dda)
            t4dd.appendChild(t4ddi)
            t4dd.appendChild(t4dda1)
            t4.appendChild(t4d)
            let t5 = document.createElement('td')
            $(t5).attr('id', 'price_subtotal_update_'.concat(order.puuid.split('-')[3]))
                .addClass('ty-cart-content__product-elem ty-cart-content__price cm-reload-'.concat(order.puuid.split('-')[3]))
            let t5s = document.createElement('span')
            $(t5s).addClass('price')
            t5s.appendChild(document.createTextNode(window.cSign.concat(' ')))
            t5.appendChild(t5s)
            let id = ('#amount_'.concat(order.puuid.split('-')[3])).toString()
            let curQty = $(t4ddi).val()
            let t5s1 = document.createElement('span')
            $(t5s1).attr('id', 'sec_product_update_'.concat(order.puuid.split('-')[3]))
                .addClass('price')
            t5s1.appendChild(document.createTextNode(price * (curQty / parseInt(order.saleQty))))
            t5.appendChild(t5s1)
            cartElem.appendChild(t1)
            cartElem.appendChild(t2)
            cartElem.appendChild(t3)
            cartElem.appendChild(t4)
            cartElem.appendChild(t5)
            cart[0].appendChild(cartElem)
        })
        setCookie('orders', orderItems, 0.125)
    }
    else {
        if (confirm('Your cart is empty, please add some items first')) {
            window.location.href = window.location.origin.concat('/food')
        } else {
            alert('You can\'t view an empty cart')
            window.location.href = window.location.origin.concat('/food')
        }
    }
}

function confirmDelete(order, store) {
    $('#ajax_overlay').click()
    let dia = document.createElement('div')
    $(dia).addClass('confirm')
        .attr('title', 'Confirm removal')
    let diap = document.createElement('p')
    let diaps = document.createElement('span')
    $(diaps).addClass('fa fa-exclamation-triangle')
        .css({
            'float': 'left',
            'margin': 0 + 'px ' + 12 + 'px ' + 20 + 'px ' + 0
        })
    diap.appendChild(diaps)
    let diat = document.createTextNode('Please confirm removal of '.concat(order.name_enGB).concat(' from the ').concat(store))
    $(diap).css({
        'font-size': 1 + 'rem',
        'padding': 1 + 'rem'
    })
    diap.appendChild(diat)
    dia.appendChild(diap)

    $('#tygh_container')[0].appendChild(dia)
    $(".confirm").dialog({
        show: {
            effect: 'blind',
            duration: 1000
        },
        hide: {
            effect: 'explode',
            duration: 1000
        },
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Remove from Cart": function () {
                cart.removeOrder(order)
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $('.confirm').dialog('open')
    $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons.ui-draggable').css({
        'background-color': 'burlywood'
    })
    $($('.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only')[0]).css({
        'background-color': 'crimson'
    })
}
document.cookie.split(';').forEach(cookie => {
    let name = cookie.split('=')[0]
    let value = cookie.split('=')[1]
    if (cookie.includes('authI')) {
        window.authI = value
        var settings = {
            "url": "https://api.live:1443/users/".concat(value),
            // "url": "https://api.live:1443/users/".concat(value),
            "method": "GET",
            "timeout": 0,
            'cache': 'no-cache',
            "headers": {
                "Authorization": "Bearer ".concat(window.authT)
            },
        };
        $.ajax(
            settings
        ).done(data => {
            if ((typeof cart.getUser() == 'undefined' ? false : true) == false) {
                cart.loginUser(data)
            }
        })
    }
});


/* Buy Quantity Changing BUttons */
var minValue = parseInt($('.ty-product-block-title').text().split(' ')[0])
var buyQty = $('.ty-value-changer__input').val(minValue).attr('value', minValue)
$('.ty-value-changer__input').attr('data-ca-min-qty', minValue).attr('min', minValue)
$('[class*=ty-value-changer__]').attr('step', minValue)
var decreaseBtn = $('.ty-value-changer__decrease')
var increaseBtn = $('.ty-value-changer__increase')
decreaseBtn.on('click', e => {
    let curQty = $('.ty-value-changer__input').val()
    if (curQty <= minValue) {
    } else {
        let stepValue = parseInt($(e.target).attr('step'))
        curQty -= stepValue
        $('.ty-value-changer__input').val(curQty)
    }
})
increaseBtn.on('click', e => {
    let curQty = parseInt($('.ty-value-changer__input').val())
    let stepValue = parseInt($(e.target).attr('step'))
    curQty += stepValue
    $('.ty-value-changer__input').val(curQty)
})
$('form[name*=product_form_]').on('submit', e => {
    e.preventDefault()
    var action = e.target.action.split('?')[1]
    var pid = e.target.baseURI.split('?')[1].split('&')[0].split('=')[1]
    var Qty = parseInt($(e.target[28]).val())
    if (action.includes('add2cart')) {
        cart.confirmProductExists(pid, 'cart', Qty)
        window.location.replace(window.location.origin.concat('/food'))
    } else toast('Unknown operation', true, 700)
})
$('[id*="button_wishlist_"]').on('click', e => {
    e.preventDefault()
    var action = e.target.href.split('?')[1]
    var pid = e.target.baseURI.split('?')[1].split('&')[0].split('=')[1]
    if (action.includes('add2wishlist')) {
        cart.confirmProductExists(pid, 'wishlist')
    }
    console.log(pid)
})
$('.location').on('click', _ => {
    _.preventDefault()
    var puuid = getCookie('authId')
    if (puuid == '') {
        window.location.href = location.origin.concat('/login?tab=login&cont=/cart/')
    } else {
        $('#ajax_overlay').css({ 'display': 'block', 'z-index': '99998' })
        $('#ajax_loading_box').css({ 'display': 'block', 'z-index': '99998' })
        geoLocker()
        setTimeout(_ => {
            if (getCookie('location_data') != '') {
                showDeliveryPrice(getCookie('location_data'))
                window.change = true
            }
        }, 3000)
        $('#ajax_overlay').css({ 'display': 'none', 'z-index': 'unset' })
        $('#ajax_loading_box').css({ 'display': 'none', 'z-index': 'unset' })
        window.change = true
    }
})
function showDeliveryPrice(locData) {
    var ld = JSON.parse(locData)
    var custLoc = ld.destination_addresses[0]
    var custDist = ld.rows[0].elements[0].distance.value
    var custDistCost;
    var cpk;
    var custDC = $('.ty-cart-statistic__total-list').children(':first-child').children(':last-child').children(':last-child')[0]
    if (window.currency == 'USD') {
        cpk = (parseFloat(kilometerPrice * 0.00026)).toFixed(2)
        custDistCost = custDist * cpk
        custDC.textContent = window.cartPriceUSD + custDistCost
        window.totalCartPrice = window.cartPriceUSD + custDistCost
    } else {
        cpk = kilometerPrice
        custDistCost = parseFloat(custDist * cpk).toFixed(2)
        var CDC = parseFloat(window.cartPriceUshNoComma) + parseFloat(custDistCost)
        custDC.textContent = CDC
        window.totalCartPrice = CDC
    }
    $('.location').parent().attr('hidden', true)
    $('.location').parent().next().attr('hidden', false)
    window.localStorage.setItem('distanceCost', custDistCost)
    $('.location').parent().next().contents()[1].textContent = custDistCost
    $('.ty-cart-total__delivery-location').text('('.concat(custLoc).concat(')')).css({ 'display': 'block' })
    $('[name="amount"]').val(window.totalCartPrice)
    $('[name="description"]').val(getCookie('orders'))
    enableCheckOut()
}
function enableCheckOut() {
    let buttons = $('.ty-float-right.ty-cart-content__right-buttons')
    for (const key in buttons) {
        if (buttons.hasOwnProperty(key)) {
            const button = buttons[key];
            $(button).children('.ty-btn.ty-btn__primary')
                .attr('href', '/checkout/')
                .on('click', _ => {
                    _.preventDefault()
                    $('#ty_confirm_checkout').dialog({
                        resizable: false,
                        height: 'auto',
                        width: 600,
                        modal: true,
                        buttons: {
                            Cancel: _ => {
                                $(this).dialog('close')
                            }
                        }
                    })
                })
        }
    }
}
if (location.pathname == '/checkout/' || location.pathname == '/checkout') {
    $('#payment_tab2').on('click', _ => {
        _.preventDefault()
        if (!$(_.delegateTarget).hasClass('active')) {
            $(_.delegateTarget.parentNode).children(':last-child').removeClass('active')
            $(_.delegateTarget).addClass('active')
            $(_.delegateTarget.parentNode.parentNode.parentNode).children(':last-child').find('#content_payment_tab2').removeClass('hidden')
            $(_.delegateTarget.parentNode.parentNode.parentNode).children(':last-child').find('#content_payment_tab3').addClass('hidden')
        }
    })

    $('#payment_tab3').on('click', _ => {
        _.preventDefault()
        if (!$(_.delegateTarget).hasClass('active')) {
            $(_.delegateTarget.parentNode).children(':first-child').removeClass('active')
            $(_.delegateTarget).addClass('active')
            $(_.delegateTarget.parentNode.parentNode.parentNode).children(':last-child').find('#content_payment_tab2').addClass('hidden')
            $(_.delegateTarget.parentNode.parentNode.parentNode).children(':last-child').find('#content_payment_tab3').removeClass('hidden')
        }
    })
    payload = new Object()

    $('[name="payments_form_tab2"]').on('submit', _ => {
        _.preventDefault()
        if (window.reorder) {
            var ans = confirm('Do you wish to place a reorder?')
            if (!ans)
                return;
            else
                _.target[0].value = uuidv4()
        }
        if (window.loggedIn == false) return;
        var ref, pid, addinfo, amt, desc, names, tel, bt, payload;
        ref = _.target[0].value
        pid = _.target[1].checked ? _.target[1].value : _.target[2].value
        addinfo = _.target[3].value
        amt = _.target[4].value
        desc = _.target[5].value
        names = _.target[6].value
        tel = _.target[7].value
        bt = _.target[9].value
        this.payload.ref = ref
        this.payload.pid = pid
        this.payload.addinfo = addinfo
        this.payload.amt = amt
        this.payload.desc = desc
        this.payload.names = names
        this.payload.tel = tel
        this.payload.bt = bt
        cart.addPostedOrder(getCookie('authId'), ref.toString())
    })
}
processOrderCheckout = () => {
    'uuid, transaction_tracker, merchant_reference, order_status'
    this.payload.oid = getCookie('oid')
    var tt1 = uuidv4().toString().split('-').slice(0, 2)
    var tt2 = uuidv4().toString().split('-').slice(0, 2)
    tt1.slice(0, 2)
    tt1.push(tt2.slice(0, 2)[0], tt2.slice(0, 2)[1])
    this.payload.tt = tt1.join('-')
    $.ajax({
        url: '/resources/app_engine/main_processes/submit_order.update.php',
        type: 'POST',
        data: payload,
        dataType: 'json',
        success: e => {
            upPO(e.prt, e.mr, 'PENDING')
            toast('Your payment status is pending, Please wait for a call!', true, 10000);
        },
        error: e => {
            console.log(e)
            return 1
        }
    })
    // upPO()
}

reloadCartOnWindowChange = () => {
    if (window.cartChange) {
        $('.ty-ajax-overlay').css({ 'display': 'block', 'z-index': '99998' })
        $('.ty-ajax-loading-box').css({ 'display': 'block' })
        getAllCart()
        window.cartChange = false
        if (window.location.pathname == '/cart' || location.pathname == '/cart/') {
            getCartItems()
            setTimeout(_ => {
                if (getCookie('location_data') != '') {
                    showDeliveryPrice(getCookie('location_data'))
                }
            }, 500)
        } else if (window.location.pathname == '/checkout' || location.pathname == '/checkout/') {
            setTimeout(_ => {
                if (getCookie('location_data') != '') {
                    var lt = JSON.parse(getCookie('location_data'))
                    var custLoc = lt.destination_addresses[0]
                    $('.step2')[0].textContent = 'Billing and Shipping Address: '.concat(custLoc)
                    $('.step3')[0].textContent = 'Shipping Cost: '.concat(localStorage.getItem('distanceCost'))
                }
            }, 500)
        }
        $('.ty-ajax-overlay').css({ 'display': 'none', 'z-index': 'unset' })
        $('.ty-ajax-loading-box').css({ 'display': 'none' })
    }
    setTimeout(reloadCartOnWindowChange, 2000)
}
getAllCart()
reloadCartOnWindowChange()
