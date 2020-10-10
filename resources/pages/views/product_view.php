<?php
include_once('/var/www/shopping.live/resources/app_engine/main_processes/database_connection.php');
if ((isset($_COOKIE['window_product']) && !isset($_ENV['curIndex']))) {
  $data = json_decode($_COOKIE['window_product'], true);
  $_ENV['data'] = $data;
  $init = 'select * from products where product_uuid = "' . mysqli_real_escape_string($con, $_ENV['data']['currentuuid']) . '"';
  $init = mysqli_query($con, $init);
  if (!$init) {
    $res['status'] = 404;
    $res['error'] = 'An error has occured on the server side.\n' . mysqli_error($con);
  } else {
    $init_data = mysqli_fetch_assoc($init);
    $res['puuid'] = $init_data['product_uuid'];
    $res['name_enGB'] = $init_data['pName_enGB'];
    $res['name_lgUG'] = urlencode($init_data['pName_lgUG']);
    $res['price_USD'] = $init_data['pPrice_USD'];
    $res['price_Ush'] = $init_data['pPrice_Ush'];
    $res['category'] = $init_data['ProdCategory'];
    $res['availability'] = $init_data['pAvail'];
    $res['saleQty'] = $init_data['saleQty'];
    $img = urldecode($init_data['pImg_loc']) . strtolower($init_data['pImg_name']);
    $res['pImg'] = $img;
    $res['alt'] = $init_data['pImg_name'];
    $pusd = $res["price_USD"];
    $push = $res["price_Ush"];
    echo '<script>window.price_usd = ' . $pusd . '</script>';
    echo '<script>window.price_ush = ' . $push . '</script>';
    echo '<script>window.product = JSON.parse(document.cookie.split("=")[1]) </script>';
  }
  $_ENV['curIndex'] = $_ENV['data']['index'];
  $_ENV['prod2View'] = json_encode($res);
  if (intval($_ENV['curIndex']) == 1) {
    $prev = 'disabled';
    $next = intval($_ENV['curIndex']) + 1;
  } else if (intval($_ENV['curIndex']) == count($_ENV['data']['uuids']) - 1) {
    $prev = intval($_ENV['curIndex']) - 1;
    $next = 'disabled';
  } else {
    $prev = intval($_ENV['curIndex']) - 1;
    $next = intval($_ENV['curIndex']) + 1;
  }
} else {
  echo ('Missing cookie parameters');
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <title>Order for Matooke, Meat, Chicken, Peas, Rice - Sham's Shop Online => <?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" data-ca-mode="" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <meta name="description" content="" />
  <meta name="keywords" content="Order for Matooke, Meat, Chicken, Peas, Rice - Sham's Shop Online" />
  <meta property="og:title" content="Order for Matooke, Meat, Chicken, Peas, Rice - Sham's Shop Online => <?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?>" />
  <meta property="og:url" content="product_view?pid=<?php echo json_decode($_ENV['prod2View'], true)['puuid']; ?>" />
  <meta property="og:image" content="<?php echo json_decode($_ENV['prod2View'], true)['pImg']; ?>" />
  <meta property="og:image:width" content="1444" />
  <meta property="og:image:height" content="960" />
  <meta property="og:site_name" content="shamseshop." />
  <meta property="og:type" content="activity" />
  <meta property="og:image:alt" content="<?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?>">
  </meta>
  <link rel="canonical" href="index.html" />
  <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
  <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
  <link type="text/css" rel="stylesheet" href="/resources/css/standalone.css" />
  <style>
    body {
      background-color: #fff !important;
    }
    [class*="icon-social"] {
      padding-top:4px;
    }
  </style>
</head>

<body>
  <div class="ty-tygh" id="tygh_container">
    <div id="ajax_overlay" class="ty-ajax-overlay"></div>
    <div id="ajax_loading_box" class="ty-ajax-loading-box"></div>
    <div class="cm-notification-container notification-container">
    </div>
    <div class="ty-helper-container" id="tygh_main_container">
      <div class="tygh-top-panel clearfix">
        <div class="container-fluid  top-grid cp-top-panel">
          <div class="row-fluid ">
            <div class="span6 top-links-grid t-left">
              <div class="ty-float-left">
                <div class="ty-wysiwyg-content">
                  <div class="top-contacts">
                    <a href="mailto:nshamie5@gmail.com">
                      <nobr><i class="fa fa-at ty-icon-mail"></i> nshamie5@gmail.com</nobr>
                    </a>
                    <a href="https://www.facebook.com/shamserrand-online/">
                      <nobr><i class="fab fa-facebook-f ty-icon-skype" style="color: blue;"></i> Facebook</nobr>
                    </a>
                    <span>
                      <nobr><i class="ty-icon-phone"></i> +256751379687 <i class="ty-icon-phone"></i> +256786730164</nobr>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="span6 top-links-grid t-right">
              <div class=" top-cart-content ty-float-right">
                <div class="ty-dropdown-box" id="cart_status_324">
                  <div id="sw_dropdown_324" class="ty-dropdown-box__title cm-combination">
                    <a href="/cart/">
                      <i class="fa fa-shopping-cart ty-minicart__icon ty-icon-basket empty"></i>
                      <span class="ty-minicart-title empty-cart ty-hand"><span class="hidden-phone">Cart is
                          empty</span></span>
                      <i class="fa fa-angle-down ty-icon-down-micro"></i>
                    </a>
                  </div>
                  <div id="dropdown_324" class="cm-popup-box ty-dropdown-box__content hidden">
                    <div class="cm-cart-content cm-cart-content-thumb cm-cart-content-delete">
                      <div class="ty-cart-items">
                        <div class="ty-cart-items__empty ty-center">Cart is empty</div>
                      </div>
                      <div class="cm-cart-buttons ty-cart-content__buttons buttons-container hidden">
                        <div class="ty-float-left">
                          <a href="/cart/" rel="nofollow" class="ty-btn ty-btn__secondary">View
                            cart</a>
                        </div>
                        <div class="ty-float-right">
                          <a href="/checkout/" rel="nofollow" class="ty-btn ty-btn__primary">Checkout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--cart_status_324-->
                </div>
              </div>
              <div class="ty-dropdown-box  top-my-account ty-float-right">
                <div id="sw_dropdown_325" class="ty-dropdown-box__title cm-combination unlogged">
                  <a class="ty-account-info__title" href="/profiles-update/">
                    <i class="fa fa-user ty-icon-user"></i>&nbsp;
                    <span class="ty-account-info__title-txt hidden-phone">My Account</span>
                    <i class="fa fa-angle-down ty-icon-down-micro ty-account-info__user-arrow"></i>
                  </a>
                </div>
                <div id="dropdown_325" class="cm-popup-box ty-dropdown-box__content hidden">
                  <div id="account_info_325">
                    <ul class="ty-account-info">
                      <li class="ty-account-info__item ty-dropdown-box__item"><a class="ty-account-info__a underlined" href="/index.php?dispatch=orders.search" rel="nofollow">Orders</a>
                      </li>
                      <li class="ty-account-info__item ty-dropdown-box__item"><a class="ty-account-info__a" href="/wishlist/" rel="nofollow">Wish
                          list</a></li>
                    </ul>
                    <div class="ty-account-info__buttons buttons-container">
                      <a href="/login/?return_url=index.php%3Fdispatch%3Dcategories.view%26category_id%3D446" data-ca-target-id="login_block325" class="cm-dialog-opener cm-dialog-auto-size ty-btn ty-btn__secondary" rel="nofollow">
                        Sign in
                      </a>
                      <a href="/profiles-add/" rel="nofollow" class="ty-btn ty-btn__primary">Register</a>
                      <div id="login_block325" class="hidden" title="Sign in">
                        <div class="ty-login-popup">
                          <form name="popup325_form" action="/" method="post" class="cm-processed-form">
                            <input type="hidden" name="return_url" value="index.php?dispatch=categories.view&amp;category_id=446">
                            <input type="hidden" name="redirect_url" value="index.php?dispatch=categories.view&amp;category_id=446">
                            <div class="ty-control-group">
                              <label for="login_popup325" class="ty-login__filed-label ty-control-group__label cm-required cm-trim cm-email">Email</label>
                              <input type="text" id="login_popup325" name="user_login" size="30" value="" class="ty-login__input cm-focus">
                            </div>
                            <div class="ty-control-group ty-password-forgot">
                              <label for="psw_popup325" class="ty-login__filed-label ty-control-group__label ty-password-forgot__label cm-required">Password</label><a href="/index.php?dispatch=auth.recover_password" class="ty-password-forgot__a" tabindex="5">Forgot your
                                password?</a>
                              <input type="password" id="psw_popup325" name="password" size="30" value="" class="ty-login__input" maxlength="32">
                            </div>
                            <div class="ty-login-reglink ty-center">
                              <a class="ty-login-reglink__a" href="/profiles-add/" rel="nofollow">Register for a new account</a>
                            </div>
                            <!-- <div class="captcha ty-control-group">
                              <label for="recaptcha_5e84c0803274a" class="cm-required cm-recaptcha ty-captcha__label">Anti-bot
                                validation</label>
                              <div id="recaptcha_5e84c0803274a" class="cm-recaptcha">
                                <div style="width: 304px; height: 78px;">
                                  <div><iframe src="https://www.google.com/recaptcha/api2/anchor?ar=2&amp;k=6LcvAQMTAAAAAMQUQ0MkfvGbAB7-sWWN89dRIho6&amp;co=aHR0cHM6Ly93d3cuZXNob3B1Z2FuZGEuY29tOjQ0Mw..&amp;hl=en&amp;v=P6KLRNy7h3K160ZmYNUOAce7&amp;theme=light&amp;size=normal&amp;cb=5ks275bui7f0" role="presentation" name="a-z1kbwotsszs0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" width="304" height="78" frameborder="0"></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea>
                                </div>
                              </div>
                            </div> -->
                            <div class="buttons-container clearfix">
                              <div class="ty-float-right">
                                <button class="ty-btn__login ty-btn__secondary ty-btn" type="submit" name="dispatch[auth.login]">Sign
                                  in</button>
                              </div>
                              <div class="ty-login__remember-me">
                                <label for="remember_me_popup325" class="ty-login__remember-me-label"><input class="checkbox" type="checkbox" name="remember_me" id="remember_me_popup325" value="Y">Remember
                                  me</label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <!--account_info_325-->
                  </div>
                </div>
              </div>
              <div class=" top-languages ty-float-right">
                <div id="languages_7">
                  <div class="ty-select-wrapper">
                    <a id="sw_select_enGB_wrap_language" class="ty-select-block__a cm-combination">
                      <span class="ty-select-block__a-item">English</span>
                      <i class="fa fa-angle-down ty-select-block__arrow ty-icon-down-micro"></i>
                    </a>
                    <div id="select_enGB_wrap_language" class="ty-select-block cm-popup-box" style="display:none">
                      <ul class="cm-select-list ty-select-block__list ty-flags">
                        <li class="ty-select-block__list-item">
                          <a class="ty-select-block__list-a" rel="nofollow" href="/?lang=enGB" data-lg-name="enGB">English</a>
                        </li>
                        <li class="ty-select-block__list-item">
                          <a class="ty-select-block__list-a" rel="nofollow" href="/?lang=lgUG" data-lg-name="lgUG">Luganda</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--languages_7-->
              </div>
              <div class=" top-currencies ty-float-right">
                <div id="currencies_8">
                  <div class="ty-select-wrapper">
                    <a class="ty-select-block__a cm-combination" id="sw_select_USD_wrap_currency">
                      <span class="ty-select-block__a-item "> ($)</span>
                      <i class="fa fa-angle-down ty-select-block__arrow ty-icon-down-micro"></i>
                    </a>
                    <div id="select_USD_wrap_currency" class="ty-select-block cm-popup-box" style="display: none;">
                      <ul class="cm-select-list ty-select-block__list ty-flags">
                        <li class="ty-select-block__list-item">
                          <a rel="nofollow" href="/?currency=USH" class="ty-select-block__list-a  " data-ca-name="USH">
                            (Ush) </a>
                        </li>
                        <li class="ty-select-block__list-item">
                          <a rel="nofollow" href="/?currency=USD" class="ty-select-block__list-a is-active " data-ca-name="USD">
                            ($) </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" top-search ty-float-right">
                <div class="ty-search-block">
                  <a href="#" class="search-open-link">
                    <span class="ty-icon-search fa fa-search"></span>
                  </a>
                  <form class="search_form" action="" name="search_form" method="get">
                    <input type="hidden" name="subcats" value="Y">
                    <input type="hidden" name="status" value="A">
                    <input type="hidden" name="pshort" value="Y">
                    <input type="hidden" name="pfull" value="Y">
                    <input type="hidden" name="pname" value="Y">
                    <input type="hidden" name="pkeywords" value="Y">
                    <input type="hidden" name="search_performed" value="Y">
                    <div id="live_reload_box">
                      <input type="hidden" class="search_input" name="search_id" value="">
                    </div>
                    <input type="text" name="q" value="" id="search_input" title="Search products" placeholder="Search products" class="ty-search-block__input cm-hint" autocomplete="off"><button title="Search" class="ty-search-magnifier" type="submit"><i class="fa fa-search ty-icon-search"></i></button>
                    <input type="hidden" name="dispatch" value="products.search">
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tygh-header clearfix">
        <div class="container-fluid header-grid">
          <div class="row-fluid">
            <div class="span12 clearfix">
              <div class="row-fluid">
                <div class="span3 top-logo-grid span4-m">
                  <div class="top-logo ty-float-left">
                    <div class="ty-logo-container">
                      <a href="/" title="Order for Matooke, Meat, Chicken, Peas, Rice - Sham's Shop Online">
                        <img class="ty-logo-container__image" src="/favicon.ico" alt="Order for Matooke, Meat, Chicken, Peas, Rice - Sham's Shop Online" style="width: 150px; height: 100px;">
                      </a>
                    </div>
                  </div>
                </div>
                <div class="span9 main-menu-block-grid span8-m">
                  <div class="top-menu cp-top-menu ty-float-right">
                    <ul class="ty-menu__items cm-responsive-menu">
                      <li class="ty-menu__item ty-menu__menu-btn visible-phone open-menu-button">
                        <a class="ty-menu__item-link">
                          <i class="ty-icon-short-list fa fa-list"></i>
                          <span>Menu</span>
                        </a>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Occasion Flowers
                        </a>
                        <div class="ty-menu__submenu" id="topmenu_67_d41d8cd98f00b204e9800998ecf8427e">
                          <ul class="ty-menu__submenu-items cm-responsive-menu-submenu">
                            <li class="ty-top-mine__submenu-col">
                              <div class="ty-menu__submenu-item-header ">
                                <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/" class="ty-menu__submenu-link">Celebrations</a>
                              </div>
                              <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                                <i class="ty-menu__icon-open ty-icon-plus"></i>
                              </a>
                              <div class="ty-menu__submenu">
                                <ul class="ty-menu__submenu-list cm-responsive-menu-submenu">
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/birthdays/" class="ty-menu__submenu-link">Birthdays</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/anniversary/" class="ty-menu__submenu-link">Anniversary</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/pregnancy/" class="ty-menu__submenu-link">Pregnancy</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/new-baby/" class="ty-menu__submenu-link">New Baby</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/new-home/" class="ty-menu__submenu-link">New Home</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/christening/" class="ty-menu__submenu-link">Christening</a>
                                  </li>
                                  <li class="ty-menu__submenu-item ty-menu__submenu-alt-link">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/celebrations/" class="ty-menu__submenu-link">View more <i class="text-arrow">→</i></a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li class="ty-top-mine__submenu-col">
                              <div class="ty-menu__submenu-item-header ">
                                <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/" class="ty-menu__submenu-link">Seasonal</a>
                              </div>
                              <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                                <i class="ty-menu__icon-open ty-icon-plus"></i>
                              </a>
                              <div class="ty-menu__submenu">
                                <ul class="ty-menu__submenu-list cm-responsive-menu-submenu">
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/christmas/" class="ty-menu__submenu-link">Christmas</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/mothers-day/" class="ty-menu__submenu-link">Mother's Day</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/fathers-day/" class="ty-menu__submenu-link">Father's Day</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/thanksgiving/" class="ty-menu__submenu-link">Thanksgiving</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/national-days/" class="ty-menu__submenu-link">National Days</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/newyear/" class="ty-menu__submenu-link">New Year</a>
                                  </li>
                                  <li class="ty-menu__submenu-item ty-menu__submenu-alt-link">
                                    <a href="https://www.eshopuganda.com/occasional-flowers/seasonal/" class="ty-menu__submenu-link">View more <i class="text-arrow">→</i></a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Love &amp; Romance Flowers
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/love-bouquets/">Love Bouquets</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/sweet-reminders/">Sweet Reminders</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/im-sorry/">I'm Sorry</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/i-love-you/">I love You</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/thinking-of-you/">Thinking of You</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/love-and-romance-flowers/valentines-day-roses/">Valentines Day Roses</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Sympathy Flowers
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/sympathy-bouquets/">Sympathy Bouquets</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/funeral-flowers/">Funeral Flowers</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/get-well/">Get Well</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/sympathy-gifts/">Sympathy Gifts</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/sympathy-food-basket/">Sympathy Food Basket</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/remembrace/">Remembrace</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/sympathy-for-home/">Sympathy for Home</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/sympathy-flowers/sympathy-for-office/">Sympathy For Office</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Congratulations Flowers
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/engagement/">Engagement</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/graduation/">Graduation</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/promotion/">Promotion</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/driving-test-and-exams/">Driving Test &amp; Exams</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/new-job-contract/">New Job/Contract</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/new-home/">New Home</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/retirement/">Retirement</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/house-completion/">House Completion</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/anniversary/">Anniversary</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/congratulations-flowers/new-baby/">New Baby</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  ty-menu__item-nodrop ">
                        <a href="https://www.eshopuganda.com/pay-bills-fees/" class="ty-menu__item-link">
                          Pay Bill/Fees
                        </a>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Valentines Day
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/valentines-roses/">Valentines Roses</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/fruit-baskets-and-gifts/">Fruit Baskets &amp; Gifts</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/i-love-you/">I love You</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/thinking-of-you/">Thinking of You</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/vals-bouquets/">Vals Bouquets</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/vals-best-sellers/">Val's Best Sellers</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/same-day-delivery/">Same day Delivery</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/just-because/">Just Because</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/valentines-day/because-i-care/">Because I Care</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a href="https://www.eshopuganda.com/wine-and-spirits/" class="ty-menu__item-link">
                          Wine &amp; Spirits
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/white-wine/">White Wine</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/red-wine/">Red Wine</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/sparkling/">Sparkling</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/dessert/">Dessert</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/brandy/">Spirits &amp; More</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/liqueur/">Liquors/Whiskey</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/wine-and-spirits/beer/">Beer, Beers</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a class="ty-menu__item-link">
                          Food &amp; Groceries
                        </a>
                        <div class="ty-menu__submenu" id="topmenu_67_d41d8cd98f00b204e9800998ecf8427e">
                          <ul class="ty-menu__submenu-items cm-responsive-menu-submenu">
                            <li class="ty-top-mine__submenu-col">
                              <div class="ty-menu__submenu-item-header ">
                                <a href="https://www.eshopuganda.com/food-and-more/food-and-more/" class="ty-menu__submenu-link">Food &amp; More</a>
                              </div>
                              <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                                <i class="ty-menu__icon-open ty-icon-plus"></i>
                              </a>
                              <div class="ty-menu__submenu">
                                <ul class="ty-menu__submenu-list cm-responsive-menu-submenu">
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/burgers/" class="ty-menu__submenu-link">Burgers</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/chicken/" class="ty-menu__submenu-link">Chicken</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/pizzas/" class="ty-menu__submenu-link">Pizzas</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/bakery-and-bread/" class="ty-menu__submenu-link">Bakery &amp; Bread</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/breakfast-and-cereal/" class="ty-menu__submenu-link">Snacks, Cereal &amp; More</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/food-and-more/raw-food/" class="ty-menu__submenu-link">Raw Food</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li class="ty-top-mine__submenu-col">
                              <div class="ty-menu__submenu-item-header ">
                                <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/" class="ty-menu__submenu-link">Groceries &amp; More</a>
                              </div>
                              <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                                <i class="ty-menu__icon-open ty-icon-plus"></i>
                              </a>
                              <div class="ty-menu__submenu">
                                <ul class="ty-menu__submenu-list cm-responsive-menu-submenu">
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/beverages/" class="ty-menu__submenu-link">Beverages</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/meat-sea-food-and-poultry/" class="ty-menu__submenu-link">Meat, Sea Food &amp; Poultry</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/fruits-and-vegetables/" class="ty-menu__submenu-link">Fruits &amp; Vegetables</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/household-essentials/" class="ty-menu__submenu-link">Household Items</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/diary-and-eggs/" class="ty-menu__submenu-link">Dairy &amp; Eggs</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/groceries-and-more/general-items/" class="ty-menu__submenu-link">General Items</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li class="ty-top-mine__submenu-col">
                              <div class="ty-menu__submenu-item-header ">
                                <a href="https://www.eshopuganda.com/food-and-more/more-shopping/" class="ty-menu__submenu-link">More Shopping</a>
                              </div>
                              <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                                <i class="ty-menu__icon-open ty-icon-plus"></i>
                              </a>
                              <div class="ty-menu__submenu">
                                <ul class="ty-menu__submenu-list cm-responsive-menu-submenu">
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/more-shopping/stationary/" class="ty-menu__submenu-link">Stationary </a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/more-shopping/juices-and-more/" class="ty-menu__submenu-link">Juices &amp; More</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/more-shopping/newspapers-magazines/" class="ty-menu__submenu-link">Newspapers/Magazines</a>
                                  </li>
                                  <li class="ty-menu__submenu-item">
                                    <a href="https://www.eshopuganda.com/food-and-more/more-shopping/toiletry-and-laundry/" class="ty-menu__submenu-link">Toiletry &amp; Laundry</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a href="https://www.eshopuganda.com/cakes-and-chocolates/" class="ty-menu__item-link">
                          Cakes &amp; Chocolates
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/cakes-and-chocolates/cakes/">Cakes</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/cakes-and-chocolates/cakes-en/">Chocolates</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a href="https://www.eshopuganda.com/fruit-gift-baskets/" class="ty-menu__item-link">
                          Fruit Gift Baskets
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/fruit-gift-baskets/wine-basket/">Wine Basket</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/fruit-gift-baskets/fruits-basket/">Fruits Basket</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/fruit-gift-baskets/food-basket/">Food Basket</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/fruit-gift-baskets/vegetables-basket/">Vegetables Basket</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/fruit-gift-baskets/eshop-custom-basket/">Eshop Custom Basket</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="ty-menu__item  cm-menu-item-responsive ">
                        <a class="ty-menu__item-toggle visible-phone cm-responsive-menu-toggle">
                          <i class="ty-menu__icon-open ty-icon-plus"></i>
                        </a>
                        <a href="https://www.eshopuganda.com/gifts-and-more/" class="ty-menu__item-link">
                          Gifts &amp; More
                        </a>
                        <div class="ty-menu__submenu">
                          <ul class="ty-menu__submenu-items ty-menu__submenu-items-simple cm-responsive-menu-submenu">
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/perfumes/">Perfumes &amp; More</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/body-sprays/">Body Sprays</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/art-and-crafts/">Art &amp; Crafts</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/shampoo/">Skin Care &amp; Shampoo</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/shower-gels/">Beauty &amp; More</a>
                            </li>
                            <li class="ty-menu__submenu-item">
                              <a class="ty-menu__submenu-link" href="https://www.eshopuganda.com/gifts-and-more/baby-kids-toys/">Baby/Kids Toys</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tygh-content clearfix">
        <div class="container-fluid  content-grid">
          <div class="row-fluid ">
            <div class="span12 breadcrumbs-grid">
              <div id="breadcrumbs_1">
                <div class="ty-breadcrumbs clearfix">
                  <a href="/" class="ty-breadcrumbs__a">Home</a>
                  <span class="ty-breadcrumbs__slash">/</span>
                  <a href="/food" class="ty-breadcrumbs__a">Food</a>
                  <span class="ty-breadcrumbs__slash">/</span>
                  <a href="/product_view?pid=<?php echo json_decode($_ENV['prod2View'], true)['puuid']; ?>" class="ty-breadcrumbs__current"><?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?></a> </div>
                <!--breadcrumbs_1-->
              </div>
            </div>
          </div>
          <div class="row-fluid ">
            <div class="span12 main-content-grid">
              <!-- Inline script moved to the bottom of the page -->
              <div class="ty-product-block product-main-info">
                <div class="ty-product-block__wrapper clearfix">
                  <div itemscope itemtype="http://schema.org/Product">
                    <meta itemprop="sku" content="<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" />
                    <meta itemprop="name" content="<?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?>" />
                    <meta itemprop="description" content="&lt;p&gt;<?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?>&lt;br&gt;&lt;br&gt;&lt;/p&gt;" />
                    <div itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                      <link itemprop="availability" href="https://schema.org/InStock" />
                      <meta itemprop="priceCurrency" content="" />
                      <meta itemprop="price" content="" />
                    </div>
                  </div>
                  <div class="ty-product-block__img-wrapper">
                    <div class="ty-product-block__img cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="product_images_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_update">
                      <div class="ty-product-img cm-preview-wrapper">
                        <a id="det_img_link_<?php echo explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]; ?>_2299" data-ca-image-id="preview[product_images_<?php echo explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]; ?>]" class="cm-image-previewer cm-previewer ty-previewer" data-ca-image-width="700" data-ca-image-height="500" href="<?php echo json_decode($_ENV['prod2View'], true)['pImg']; ?>" title="<?php echo json_decode($_ENV['prod2View'], true)['alt']; ?>">
                          <img id="det_img_<?php echo explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]; ?>_2299" class="ty-pict cm-image" src="<?php echo json_decode($_ENV['prod2View'], true)['pImg']; ?>" alt="<?php echo json_decode($_ENV['prod2View'], true)['alt']; ?>">
                          <span class="ty-previewer__icon hidden-phone"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="ty-product-block__left">
                    <div class="product-top-nav">
                      <div class="ty-product-switcher">
                        <a class="ty-product-switcher__a ty-product-switcher__a-left " href="<?php if ($prev != 'disabled') echo '/product_view?pid=' . $_ENV["data"]["uuids"][$prev] . '';
                                                                                              else echo 'javascript:void(0)'; ?>" title="Prev"><i class="ty-product-switcher__icon ty-icon-left-circle"></i></a>
                        <a class="ty-product-switcher__a ty-product-switcher__a-right " href="<?php if ($next != 'disabled') echo '/product_view?pid=' . $_ENV["data"]["uuids"][$next] . '';
                                                                                              else echo 'javascript:void(0)'; ?>" title="Next"><i class="ty-product-switcher__icon ty-icon-right-circle"></i></a>
                      </div>
                    </div>
                    <form action="/product_view?product.action=add2cart" method="post" name="product_form_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" enctype="multipart/form-data" class="cm-disable-empty-files  cm-ajax cm-ajax-full-render cm-ajax-status-middle ">
                      <input type="hidden" name="result_ids" value="cart_status*,wish_list*,checkout*,account_info*" />
                      <input type="hidden" name="redirect_url" value="?selected_section=discussion&amp;currency=USH&amp;dispatch=products.view&amp;product_id=<?php echo json_decode($_ENV['prod2View'], true)['puuid']; ?>" />
                      <input type="hidden" name="product_data[<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>][product_id]" value="<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" />
                      <h1 class="ty-product-block-title"><?php echo json_decode($_ENV['prod2View'], true)['saleQty']; ?> <?php echo json_decode($_ENV['prod2View'], true)['name_enGB']; ?></h1>
                      <div class="brand">
                      </div>
                      <div class="ty-product-block__note"></div>
                      <div class="prices-container price-wrap">
                        <div class="ty-product-prices">
                          <span class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="old_price_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>"></span>
                          <div class="ty-product-block__price-actual">
                            <span class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?> ty-price-update" id="price_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <input type="hidden" name="appearance[show_price_values]" value="1" />
                              <input type="hidden" name="appearance[show_price]" value="1" />
                              <span class="ty-price" id="line_discounted_price_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>"><span class="ty-price-num"></span> <span id="sec_discounted_price_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" class="ty-price-num"></span></span>
                              <!--price_update_844-->
                            </span>
                          </div>
                          <span class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="line_discount_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                            <input type="hidden" name="appearance[show_price_values]" value="1" />
                            <input type="hidden" name="appearance[show_list_discount]" value="1" />
                            <!--line_discount_update_844--></span>
                        </div>
                      </div>
                      <div class="ty-product-block__option">
                        <div class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="product_options_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                          <input type="hidden" name="appearance[show_product_options]" value="1" />
                          <input type="hidden" name="appearance[details_page]" value="1" />
                          <input type="hidden" name="additional_info[info_type]" value="D" />
                          <input type="hidden" name="additional_info[get_icon]" value="1" />
                          <input type="hidden" name="additional_info[get_detailed]" value="1" />
                          <input type="hidden" name="additional_info[get_additional]" value="" />
                          <input type="hidden" name="additional_info[get_options]" value="1" />
                          <input type="hidden" name="additional_info[get_discounts]" value="1" />
                          <input type="hidden" name="additional_info[get_features]" value="" />
                          <input type="hidden" name="additional_info[get_extra]" value="" />
                          <input type="hidden" name="additional_info[get_taxed_prices]" value="1" />
                          <input type="hidden" name="additional_info[get_for_one_product]" value="1" />
                          <input type="hidden" name="additional_info[detailed_params]" value="1" />
                          <input type="hidden" name="additional_info[features_display_on]" value="C" />
                          <div id="option_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_AOC">
                            <div class="cm-picker-product-options ty-product-options" id="opt_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <div class="ty-control-group ty-product-options__item product-list-field clearfix" id="opt_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_1727">
                                <div class="ty-control-group ty-product-options__item product-list-field clearfix" id="opt_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_1758">
                                  <label id="option_description_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_1758" for="option_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_1758" class="ty-control-group__label ty-product-options__item-label cm-required">Delivery
                                    Date:</label>
                                  <input id="option_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>_1758" type="text" name="product_data[<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>][product_options][1758]" value="" class="ty-valign ty-input-text" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="ty-product-block__advanced-option">
                            <div class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="advanced_options_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <div class="ty-control-group product-list-field">
                                <label class="ty-control-group__label">Return period:</label>
                                <span class="ty-control-group__item">1&nbsp;day</span>
                              </div>
                              <input type="hidden" name="appearance[dont_show_points]" value="true" />
                              <div class="ty-control-group hidden">
                                <span class="ty-control-group__label product-list-field">Price
                                  in points:</span>
                                <span class="ty-control-group__item" id="price_in_points_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">48&nbsp;points</span>
                              </div>
                              <div class="ty-control-group product-list-field hidden">
                                <span class="ty-control-group__label">Reward points:</span>
                                <span class="ty-control-group__item" id="reward_points_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">&nbsp;points</span>
                              </div>
                              <!--advanced_options_update_844-->
                            </div>
                          </div>
                          <div class="ty-product-block__sku">
                            <div class="ty-control-group ty-sku-item cm-hidden-wrapper" id="sku_update_844">
                              <input type="hidden" name="appearance[show_sku]" value="1" />
                              <label class="ty-control-group__label" id="sku_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">CODE:</label>
                              <span class="ty-control-group__item cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="product_code_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>"><?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>
                              </span>
                            </div>
                          </div>
                          <div class="ty-product-block__field-group">
                            <div class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?> stock-wrap" id="product_amount_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <input type="hidden" name="appearance[show_product_amount]" value="1" />
                              <div class="ty-control-group product-list-field">
                                <label class="ty-control-group__label">Availability:</label>
                                <span class="ty-qty-in-stock ty-control-group__item" id="in_stock_info_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">In
                                  stock</span>
                              </div>
                              <!--product_amount_update_844-->
                            </div>
                            <div class="hidden">
                              <input type="hidden" name="selected_section" value="product_packages" />
                              <table class="cp-product-package"></table>
                            </div>
                            <div class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" id="qty_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <input type="hidden" name="appearance[show_qty]" value="1" />
                              <input type="hidden" name="appearance[capture_options_vs_qty]" value="" />
                              <div class="ty-qty clearfix changer" id="qty_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                                <label class="ty-control-group__label" for="qty_count_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">Quantity:</label>
                                <div class="ty-center ty-value-changer cm-value-changer">
                                  <a class="cm-decrease ty-value-changer__decrease">&minus;</a>
                                  <input type="text" size="5" class="ty-value-changer__input cm-amount" id="qty_count_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" name="product_data[<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>][amount]" value="1" data-ca-min-qty="1" />
                                  <a class="cm-increase ty-value-changer__increase">&#43;</a>
                                </div>
                              </div>
                              <!--qty_update_844-->
                            </div>
                          </div>
                          <div class="ty-product-block__button">
                            <div class="cm-reload-<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?> " id="add_to_cart_update_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>">
                              <button id="button_cart_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" class="ty-btn__primary ty-btn__big ty-btn__add-to-cart cm-form-dialog-closer ty-btn" type="submit" name="dispatch[checkout.add..<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>]">Add to
                                cart</button>
                              <a id="opener_call_request_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" class="cm-dialog-opener cm-dialog-auto-size ty-btn ty-btn__text ty-cr-product-button" href="?dispatch=call_requests.request&amp;product_id=<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>&amp;obj_prefix=" data-ca-target-id="content_call_request_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" rel="nofollow"><span><i class="fa fa-shopping-bag"></i>&MediumSpace;Buy now with
                                  1-click</span></a>
                              <div class="hidden" id="content_call_request_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" title="Buy now with 1-click">
                              </div>
                              <style>
                                .ty-product-block__button .ty-btn[data-ca-dispatch*='wishlist.add']::before {
                                  content: '';
                                }

                                .ty-product-block__button .ty-btn[data-ca-target-id*=content_call_request_]::before,
                                #opener_call_request_844::before {
                                  content: '';
                                }
                              </style>
                              <a class="ty-btn ty-btn__text  ty-btn__primary cm-submit text-button " id="button_wishlist_<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>" href="/product_view?product.action=add2wishlist" data-ca-dispatch="dispatch[wishlist.add..<?php echo strtoupper(explode('-', json_decode($_ENV['prod2View'], true)['puuid'])[1]); ?>]"><i class="fa fa-cart-plus"></i>&MediumSpace;Add to wish
                                list</a>
                            </div>
                          </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="product-details"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tygh-footer clearfix" id="tygh_footer">
        <div class="container-fluid ty-footer-grid">
          <div class="row-fluid">
            <div class="span12">
              <div class="row-fluid">
                <div class="span4">
                  <div class="ty-wysiwyg-content">
                    <style>
                      div {
                        text-align: justify;
                        text-justify: inter-word;
                      }
                    </style>
                    <h3>About Shams Errand and Grocery Store</h3>
                    <p>
                      Since opening our doors, we've been committed to providing services of the highest quality, paying
                      particular
                      attention to working efficiently while keeping the lines of communication with our clients
                      clear and concise.<br /><br />
                      Our Mission at Sham's Errand and Grocery Services is simple:-<br>
                      <ul>
                        <li>To provide high-quality services in a timely manner. Our team caters to each project's
                          specific needs
                          to ensure excellence.</li>
                      </ul>
                      Our team caters to each project's specific needs to ensure excellence. We hope you'll find what
                      your looking for.
                      <hr>
                      For more information or general inquiries, feel free to get in touch today.
                    </p>
                  </div>
                  <div class="ty-wysiwyg-content">
                    <div>
                      <ul class="social-networks">
                        <li>
                          <a href="https://www.facebook.com/shamserrand-online" class="icon-social-facebook"
                            target="_blank">
                            <i class="ty-icon-facebook fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.twitter.com/shamserrand-online" class="icon-social-twitter"
                            target="_blank">
                            <i class="ty-icon-twitter fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.google.com/+shamserrand-online" class="icon-social-gplus">
                            <i class="ty-icon-gplus fab fa-google-plus-g"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#linkedin" class="icon-social-linkedin" target="_blank">
                            <i class="ty-icon-linkedin fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://dribble.com/" class="icon-social-dribble">
                            <i class="ty-icon-dribble fab fa-dribbble"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.pinterest.com/" target="_blank" class="icon-social-pinterest">
                            <i class="ty-icon-pinterest fab fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtube.com/" class="icon-social-play" target="_blank">
                            <i class="ty-icon-right-dir fab fa-youtube"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="span4">
                  <div class="mainbox2-container">
                    <h3 class="mainbox2-title clearfix">
                      TAGS
                    </h3>
                    <div class="mainbox2-body">
                      <div class="ty-tag-cloud">
                        <a href="?dispatch=tags.view&amp;tag=apple" class="ty-tag-cloud__item ty-tag-level-0">apple</a>
                        <a href="?dispatch=tags.view&amp;tag=Beef" class="ty-tag-cloud__item ty-tag-level-2">Beef</a>
                        <a href="?dispatch=tags.view&amp;tag=Broccoli"
                          class="ty-tag-cloud__item ty-tag-level-0">Broccoli</a>
                        <a href="?dispatch=tags.view&amp;tag=chicken"
                          class="ty-tag-cloud__item ty-tag-level-0">chicken</a>
                        <a href="?dispatch=tags.view&amp;tag=Chicken+Breast"
                          class="ty-tag-cloud__item ty-tag-level-0">Chicken Breast</a>
                        <a href="?dispatch=tags.view&amp;tag=Cooking+Oil"
                          class="ty-tag-cloud__item ty-tag-level-0">Cooking
                          Oil</a>
                        <a href="?dispatch=tags.view&amp;tag=Fruit+Baskets"
                          class="ty-tag-cloud__item ty-tag-level-2">Fruit
                          Baskets</a>
                        <a href="?dispatch=tags.view&amp;tag=Fruits+%26+Vegetables"
                          class="ty-tag-cloud__item ty-tag-level-2">Fruits &amp; Vegetables</a>
                        <a href="?dispatch=tags.view&amp;tag=Raw+Food" class="ty-tag-cloud__item ty-tag-level-3">Raw
                          Food</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="span4">
                  <div class="ty-footer-form-block">
                    <form action="https://shopping.live:423/" method="post" name="subscribe_form">
                      <input type="hidden" name="redirect_url"
                        value="index.php?items_per_page=32&amp;dispatch=categories.view&amp;category_id=446">
                      <input type="hidden" name="newsletter_format" value="2">
                      <h3 class="ty-footer-form-block__title">Stay Connected</h3>
                      <p>Win a coupon of 20% by subscribing to our newsletter, it's easy just enter your e-mail below:
                      </p>
                      <div class="ty-footer-form-block__form ty-control-group ty-input-append">
                        <label class="cm-required cm-email hidden" for="subscr_email11">Email</label>
                        <input type="text" name="subscribe_email" id="subscr_email11" size="20"
                          value="Enter e-mail address" class="cm-hint ty-input-text">
                        <button title="Subscribe" class="ty-btn-go" type="submit">Subscribe</button>
                        <input type="hidden" name="dispatch" value="newsletters.add_subscriber">
                      </div>
                    </form>
                  </div>
                  <div class="ty-wysiwyg-content">
                    <div class="top-contacts">
                      <a href="mailto:nshamie5@gmail.com">
                        <nobr><i class="fa fa-at ty-icon-mail"></i> nshamie5@gmail.com</nobr>
                      </a>
                      <a href="https://www.facebook.com/shamserrand-online/">
                        <nobr><i class="fab fa-facebook-f ty-icon-skype" style="color: blue;"></i> Facebook</nobr>
                      </a>
                      <span>
                        <nobr><i class="ty-icon-phone"></i> +256751379687 <i class="ty-icon-phone"></i> +256786730164
                        </nobr>
                      </span>
                    </div>
                  </div>
                  <div class="ty-wysiwyg-content">
                    <div class="ty-social-link-block">
                      <h3 class="ty-social-link__title">Get social</h3>
                      <div class="ty-social-link facebook">
                        <a href="http://www.facebook.com/"><i class="ty-icon-facebook fab fa-facebook"
                            style="color: blue; font-size: 16px"></i> Facebook</a>
                      </div>
                      <div class="ty-social-link twitter">
                        <a href="https://twitter.com/"><i class="ty-icon-twitter fab fa-twitter"
                            style="color: aqua;"></i>
                          Twitter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row-fluid">
            <div class="span12 ">
              <div class="ty-wysiwyg-content">
                <hr class="divider">
                <ul class="footer-menu">
                  <li><a href="https://www.shopping.live/about-our-company/">About us</a></li>
                  <li><a href="https://shopping.live:423/contact-us/">Contact us</a></li>
                  <li><a
                      href="https://shopping.live:423/index.php?dispatch=product_features.view_all&amp;filter_id=10">Our
                      brands</a></li>
                  <li><a href="https://shopping.live:423/sitemap/">Sitemap</a></li>
                  <li><a href="https://shopping.live:423/privacy-policy/">Privacy Policy</a></li>
                  <li><a href="https://shopping.live:423/terms-of-use/">Terms of Use</a></li>
                  <li><a href="https://shopping.live:423/faqs/">FAQs</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row-fluid">
            <div class="span12 ">
              <div class="row-fluid ">
                <div class="span6 ">
                  <p class="bottom-copyright">&copy; 2021 Shams Errand And Groceries.
                  </p>
                </div>
                <div class="span6 ">
                  <ul class="payment-icons">
                    <li class="payment-icon payment-icon-visa"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                    <li class="payment-icon payment-icon-master"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                    <li class="payment-icon payment-icon-paypal"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                    <li class="payment-icon payment-icon-skrill"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                    <li class="payment-icon payment-icon-mtn"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                    <li class="payment-icon payment-icon-airtel"><span class="gray-color"></span><span
                        class="normal-color"></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="/resources/js/jquery-3.4.1.min.js"></script>
  <script src="/resources/font-awesome/js/all.js"></script>
  <script src="/resources/js/bootstrap.min.js"></script>
  <script src="/resources/jquery-ui-1.12.1/jquery-ui.custom.min.js"></script>
  <script src="/resources/js/main.js"></script>
  <script src="/resources/pages/cart/attribs/idb.js"></script>
  <script src="/resources/app_engine/side_processes/uuid-v4.js"></script>
  <script src="/resources/js/product_view.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>
  <script>
    var firebaseConfig = {
      apiKey: "AIzaSyB22aWkqYPpC_6qd0KUrfyd-_rKkUUO7NQ",
      authDomain: "shams-eshop.firebaseapp.com",
      databaseURL: "https://shams-eshop.firebaseio.com",
      projectId: "shams-eshop",
      storageBucket: "shams-eshop.appspot.com",
      messageSenderId: "1037093454649",
      appId: "1:1037093454649:web:fb84cb1fed8ce139529ee8",
      measurementId: "G-Q1WWP5VXWZ"
    }
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    firebase.auth().useDeviceLanguage()
  </script>
  <script src="https://www.google.com/recaptcha/api.js?render=6LeDeOkUAAAAAD0kXJ91jKsBzdaNHPT2ZFkFlTmd"></script>
  <script>
    grecaptcha.ready(function() {
      grecaptcha.execute('6LeDeOkUAAAAAD0kXJ91jKsBzdaNHPT2ZFkFlTmd', {
        action: 'homepage'
      }).then(function(token) {

      });
    });
  </script>
  <script>
    if (window.currency == "USD") {
      $('[itemprop=priceCurrency]').attr('content', window.currency)
      $('[itemprop=price]').attr('content', window.price_usd.toString())
      $('[id*="line_discounted_price_"]').children(':first-child').text('$')
      $('[id*="line_discounted_price_"]').children(':last-child').text(window.price_usd.toString())
    } else {
      $('[itemprop=priceCurrency]').attr('content', window.currency)
      $('[itemprop=price]').attr('content', window.price_ush.toString())
      $('[id*="line_discounted_price_"]').children(':first-child').text(window.currency)
      $('[id*="line_discounted_price_"]').children(':last-child').text(window.price_ush.toString())
    }
    $('.ty-product-switcher').children('.ty-product-switcher__a-left').on('click', e => {
      e.preventDefault()
      var prod = e.delegateTarget.href.split('?')[1].split('=')[1]
      console.log(window.product.currentuuid)
      console.log(prod)
      window.location.replace(window.location.origin.concat(window.location.pathname).concat('?pid='.concat(prod)))
      window.product.currentuuid = prod
      window.product.index -= 1
      <?php unset($_ENV['curIndex']); ?>
      let date = new Date()
      let exp_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
      document.cookie = 'window.product=' + JSON.stringify(window.product) + '; expires=' + exp_date + '; secure=true'
    })
    $('.ty-product-switcher').children('.ty-product-switcher__a-right').on('click', e => {
      e.preventDefault()
      var prod = e.delegateTarget.href.split('?')[1].split('=')[1]
      console.log(window.product.currentuuid)
      console.log(prod)
      window.location.replace(window.location.origin.concat(window.location.pathname).concat('?pid='.concat(prod)))
      log(window.location.href)
      window.product.currentuuid = prod
      window.product.index += 1
      <?php unset($_ENV['curIndex']); ?>
      let date = new Date()
      let exp_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
      document.cookie = 'window.product=' + JSON.stringify(window.product) + '; expires=' + exp_date + '; secure=true'
      // window.location.reload(true)
    })
  </script>
  <script>
    var age_not_verified = "Unfortunately, your age is not verified";
    var age_verified = "Thank you! Verification is passed";
    var terms_accepted = "Terms and Conditions have been successfully accepted";
    var terms_no_accepted = "Terms and Conditions have not been accepted";
    var use_calendar = "N";
    $('.open-power-popup').on('click', function() {
      $.ceAjax('request', fn_url('power_popup.open_popup&popup=' + $(this).attr('class')), {
        callback: function(data) {
          if (data != 'false') {
            if (!$("#cp_power_popup_" + data.popup_id).html()) {
              $('body').append(data.text);
            }
            var popup = data.popup;
            popup_auto_size = popup.auto_size;
            popup_effect = popup.popup_effect;
            popup_userclass = popup.userclass;
            popup_auto_close = popup.auto_close;
            $.commonInit();
            if (popup_auto_size != 'N') {
              if (popup_auto_close > 0) {
                $.magnificPopup.open({
                  mainClass: 'cp_main_popup__global cp_main_popup__global--auto ' + popup_userclass + ' ' + popup_effect,
                  items: {
                    src: '#cp_power_popup_' + data.popup_id,
                    type: 'inline',
                    midClick: true,
                    closeBtnInside: true,
                  },
                  callbacks: {
                    open: function() {
                      setTimeout(function() {
                        $('#cp_power_popup_' + data.popup_id).magnificPopup('close');
                      }, auto_close);
                    }
                  }
                });
              } else {
                $.magnificPopup.open({
                  mainClass: 'cp_main_popup__global cp_main_popup__global--auto ' + popup_userclass + ' ' + popup_effect,
                  items: {
                    src: '#cp_power_popup_' + data.popup_id,
                    type: 'inline',
                    midClick: true,
                    closeBtnInside: true,
                  }
                });
              }
            } else {
              if (popup_auto_close > 0) {
                $.magnificPopup.open({
                  mainClass: 'cp_main_popup__global cp_main_popup__global--size ' + popup_userclass + ' ' + popup_effect,
                  items: {
                    src: '#cp_power_popup_' + data.popup_id,
                    type: 'inline',
                    midClick: true,
                    closeBtnInside: true,
                  },
                  callbacks: {
                    open: function() {
                      setTimeout(function() {
                        $('#cp_power_popup_' + data.popup_id).magnificPopup('close');
                      }, auto_close);
                    }
                  }
                });
              } else {
                $.magnificPopup.open({
                  mainClass: 'cp_main_popup__global cp_main_popup__global--size ' + popup_userclass + ' ' + popup_effect,
                  items: {
                    src: '#cp_power_popup_' + data.popup_id,
                    type: 'inline',
                    midClick: true,
                    closeBtnInside: true,
                  }
                });
              }
            }
          }
        }
      });
    });
  </script>
  <script type="text/javascript">
    // Animation blocks
    $(document).ready(function() {
      cp_animated_classes = new Array('bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'fadeIn',
        'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'flip', 'flipInX', 'flipInY', 'lightSpeedIn',
        'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rollIn', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp');
      var deactivateWidth = 0;

      function fn_cp_animation_effect() {
        if ($(window).width() > deactivateWidth) {
          $('.cp-power-effect-block').each(function() {
            var h = $(window).height();
            if ($(this).offset().top - ($(window).scrollTop() + h) <= -100) {
              $(this).children('.animated').css('opacity', '1');
            } else if ($(this).offset().top - ($(window).scrollTop() + h) <= -40) {
              $(this).children('.animated').css('opacity', '0');
            }
            if ($(this).offset().top - ($(window).scrollTop() + h) <= -100) {
              for (var i = 0; i < cp_animated_classes.length; i++) {
                if ($(this).children('.animated').hasClass('cp-' + cp_animated_classes[i])) {
                  $(this).children('.animated').addClass(cp_animated_classes[i]);
                }
              }
            } else {
              for (var i = 0; i < cp_animated_classes.length; i++) {
                if ($(this).children('.animated').hasClass('cp-' + cp_animated_classes[i])) {
                  $(this).children('.animated').removeClass(cp_animated_classes[i]);
                }
              }
            }
          });
        }
      }
      $('.animated').each(function(i, elm) {
        $(elm).before("<div class='cp-power-effect-block'></div>");
        $(elm).appendTo($(elm).prev());
      });
      fn_cp_animation_effect();
      $(window).scroll(function() {
        fn_cp_animation_effect();
      });
    });
  </script>
  <script>
    equalheight = function(container) {
      var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
      $(container).each(function() {
        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
          for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
          }
          rowDivs.length = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
        } else {
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
      });
    }
    setHeight = function() {
      equalheight('.grid-list .ty-grid-list__item-name');
      equalheight('.grid-list .ty-grid-list__item');
    };
    $(window).load(function() {
      setHeight();
    });
    $(window).resize(function() {
      setHeight();
    });
    $(document).ajaxComplete(function(event, request, settings) {
      var imgs = $('.ty-grid-list__image .ty-pict', this).length;
      var loaded = 2;
      $('.ty-grid-list__image .ty-pict', this).load(function() {
        if (loaded >= imgs) {
          setHeight();
        } else {
          loaded += 1;
        }
      });
    });
  </script>
  <!-- Inline scripts -->
  <script>
    var letters_to_start = 3;
  </script>
  <script type="text/javascript">
    $(window).scroll(function() {
      if ($(window).width() > 767) {
        fn_cp_float_meu();
      }
    });
    $(window).resize(function() {
      if ($(window).width() > 767) {
        fn_cp_float_meu();
      } else {
        fn_usual_menu();
      }
    });

    function fn_cp_float_meu() {
      if ($(window).scrollTop() > 50) {
        $('.cp-top-panel').parent('div').addClass('cp-floating-menu-qm');
        if (!$('.cm-responsive-menu').children('li:first').hasClass('pm-logo')) {
          var elm_img = $('div.top-logo').children('div').children('a').children('img');
          if ($(elm_img).css('width')) {
            var elm_w = $(elm_img).css('width').replace('px', '');
          }
          if ($(elm_img).css('height')) {
            var elm_h = $(elm_img).css('height').replace('px', '');
          }
          var li_height = $('li.cm-menu-item-responsive').css('height');
          $('.cm-responsive-menu').children('li:first').before("<li class='ty-menu__item  cm-menu-item-responsive pm-logo'><div class='vertcenterwrap'><div class='vertcentercentered'>" + $('div.top-logo').children('div').html() + "</div></div></li>");
          $('.pm-logo').css('height', '100%');
          if (elm_h > 34) {
            $('li.pm-logo').children('div').children('div').children('a').children('img').css('height', '100px');
            var coef = elm_h / 34;
            $('li.pm-logo').children('div').children('div').children('a').children('img').css('width', '150px');
          }
        }
        $('.cp-top-menu').parent('div').addClass('cp-shadow');
        $('.cp-top-menu').parent('div').addClass('cp-floating-menu');
        $('.cp-top-menu').parent('div').children('div.top-menu').addClass('cp-floating-menu-sub');
        $('.cp-top-menu').addClass('cp-no-padding');
        $('.top-menu').children('ul').addClass('cp-center-content');
        $('.top-menu').css('display', 'inline-block');
        $('.cp-floating-menu').css('height', $('.top-menu').children('ul').height() + 'px');
        if ($('.cp-top-panel').length == 0) {
          $('.cp-floating-menu').css('top', '0');
        }
      } else {
        fn_usual_menu();
      }
    }

    function fn_usual_menu() {
      $('.cp-top-panel').parent('div').removeClass('cp-floating-menu-qm');
      $('.cp-top-menu').parent('div').removeClass('cp-shadow');
      $('.cp-top-menu').parent('div').removeClass('cp-floating-menu');
      $('.cp-top-menu').parent('div').children('div.top-menu').removeClass('cp-floating-menu-sub');
      $('.cp-top-menu').parent('div').css('height', '');
      $('.cm-responsive-menu').children('li.pm-logo').remove();
      $('.cp-top-menu').removeClass('cp-no-padding');
      $('.top-menu').children('ul').removeClass('cp-center-content');
      $('.top-menu').css('display', '');
    }
  </script>
</body>

</html>