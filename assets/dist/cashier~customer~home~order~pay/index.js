(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cashier~customer~home~order~pay"],{

/***/ "./src/js/actions/login/index.js":
/*!***************************************!*\
  !*** ./src/js/actions/login/index.js ***!
  \***************************************/
/*! exports provided: LOGGIN_USER, OPENING_AMOUNT, SHOW_SET_DRAWER_AMOUNT_POPUP_FILTER, SET_DEFAULT_OPENING_AMOUNT_FILTER, setCashier, checkLoginUser, setDrawerAmount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGGIN_USER", function() { return LOGGIN_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPENING_AMOUNT", function() { return OPENING_AMOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_SET_DRAWER_AMOUNT_POPUP_FILTER", function() { return SHOW_SET_DRAWER_AMOUNT_POPUP_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DEFAULT_OPENING_AMOUNT_FILTER", function() { return SET_DEFAULT_OPENING_AMOUNT_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCashier", function() { return setCashier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkLoginUser", function() { return checkLoginUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDrawerAmount", function() { return setDrawerAmount; });
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

var LOGGIN_USER = 'LOGGIN_USER';
var OPENING_AMOUNT = 'OPENING_AMOUNT';


var SHOW_SET_DRAWER_AMOUNT_POPUP_FILTER = 'wkwcpos_show_set_drawer_amount_popup';
var SET_DEFAULT_OPENING_AMOUNT_FILTER = 'wkwcpos_set_default_opening_amount_filter';
var setCashier = function setCashier(user) {
  return {
    type: LOGGIN_USER,
    user: user
  };
};
var checkLoginUser = function checkLoginUser() {
  return function (dispatch) {
    var user = apif_script.logged_in;
    var logout_url = apif_script.logout_url;

    if (user != "") {
      var newUser = {
        first_name: user.fname,
        last_name: user.lname,
        email: user.email,
        isLoggedIn: true,
        cashier_id: user.user_id,
        profile_pic: user.profile_pic,
        isFetching: 1,
        logout_url: logout_url,
        opening_amount: parseFloat(0)
      };
      dispatch(setCashier(newUser));
    }
  };
};
var setDrawerAmount = function setDrawerAmount() {
  return function (dispatch) {
    var user = apif_script.logged_in;
    var logout_url = apif_script.logout_url;

    if (user != "") {
      if (localStorage.cashdrawer === undefined) {
        if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])(SHOW_SET_DRAWER_AMOUNT_POPUP_FILTER, true)) {
          jQuery.confirm({
            title: _translation__WEBPACK_IMPORTED_MODULE_0__["translation"].drawer_text,
            content: '<div><div class="form-group"><input autofocus type="text" id="input-drawer" placeholder="' + _translation__WEBPACK_IMPORTED_MODULE_0__["translation"].validated_text + '" class="form-control"></div></div>',
            buttons: {
              apply: {
                text: _translation__WEBPACK_IMPORTED_MODULE_0__["translation"].okay_text,
                btnClass: 'btn-global',
                action: function action() {
                  var _poso_filter = /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/;
                  var input = this.$content.find('input#input-drawer');

                  if (!input.val().trim() || input.val().length > 15 || _poso_filter.test(input.val()) == false || parseFloat(input.val()) < 0) {
                    jQuery.alert({
                      content: _translation__WEBPACK_IMPORTED_MODULE_0__["translation"].drawer_validate_text,
                      type: 'red'
                    });
                    return false;
                  } else {
                    var popening_amt = input.val();

                    if (popening_amt) {
                      if (localStorage.cashdrawer == undefined || localStorage.cashdrawer == '' || localStorage.cashdrawer == '{}') {
                        // todayTransaction = [];
                        var todayTransaction = {};
                        todayTransaction['initialAmount'] = {
                          initialAmount: popening_amt
                        };
                        localStorage.cashdrawer = JSON.stringify(todayTransaction);

                        if (user != "") {
                          var newUser = {
                            first_name: user.fname,
                            last_name: user.lname,
                            email: user.email,
                            isLoggedIn: true,
                            cashier_id: user.user_id,
                            profile_pic: user.profile_pic,
                            isFetching: 1,
                            logout_url: logout_url,
                            opening_amount: popening_amt
                          };
                          dispatch(setCashier(newUser));
                        }
                      }
                    }
                  }
                }
              },
              later: {
                text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Later', 'wc_pos'),
                action: function action() {}
              }
            }
          });
        } else {
          var popening_amt = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])(SET_DEFAULT_OPENING_AMOUNT_FILTER, 0);

          if (popening_amt) {
            if (localStorage.cashdrawer == undefined || localStorage.cashdrawer == '' || localStorage.cashdrawer == '{}') {
              // todayTransaction = [];
              var todayTransaction = {};
              todayTransaction['initialAmount'] = {
                initialAmount: popening_amt
              };
              localStorage.cashdrawer = JSON.stringify(todayTransaction);

              if (user != "") {
                var newUser = {
                  first_name: user.fname,
                  last_name: user.lname,
                  email: user.email,
                  isLoggedIn: true,
                  cashier_id: user.user_id,
                  profile_pic: user.profile_pic,
                  isFetching: 1,
                  logout_url: logout_url,
                  opening_amount: popening_amt
                };
                dispatch(setCashier(newUser));
              }
            }
          }
        }
      }
    }
  };
};

/***/ }),

/***/ "./src/js/actions/orders/index.js":
/*!****************************************!*\
  !*** ./src/js/actions/orders/index.js ***!
  \****************************************/
/*! exports provided: POS_ORDERS, ADD_CUSTOM_ORDER_DETAILS, PRINT_INVOICE_SKIP_POPUP_AFTER_PAY, AFTER_CREATING_ORDER_ACTION, CLEAR_INDEXDB_SKIP_AFTER_PAY, setOrder, getAllOrdersWC, loadAllOrders, sendcustomemails, current_state, createWCOrder, loadSearchedOrder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_ORDERS", function() { return POS_ORDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CUSTOM_ORDER_DETAILS", function() { return ADD_CUSTOM_ORDER_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRINT_INVOICE_SKIP_POPUP_AFTER_PAY", function() { return PRINT_INVOICE_SKIP_POPUP_AFTER_PAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AFTER_CREATING_ORDER_ACTION", function() { return AFTER_CREATING_ORDER_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_INDEXDB_SKIP_AFTER_PAY", function() { return CLEAR_INDEXDB_SKIP_AFTER_PAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOrder", function() { return setOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllOrdersWC", function() { return getAllOrdersWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllOrders", function() { return loadAllOrders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendcustomemails", function() { return sendcustomemails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current_state", function() { return current_state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWCOrder", function() { return createWCOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSearchedOrder", function() { return loadSearchedOrder; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var locutus_php_var__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! locutus/php/var */ "./node_modules/locutus/php/var/index.js");
/* harmony import */ var locutus_php_var__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(locutus_php_var__WEBPACK_IMPORTED_MODULE_6__);







var POS_ORDERS = 'POS_ORDERS';
var ADD_CUSTOM_ORDER_DETAILS = 'wkwcpos_add_custom_order_details';
var PRINT_INVOICE_SKIP_POPUP_AFTER_PAY = 'wkwcpos_show_print_invoice_skip_popup_after_pay';
var AFTER_CREATING_ORDER_ACTION = 'wkwcpos_action_after_creating_order';
var CLEAR_INDEXDB_SKIP_AFTER_PAY = 'wkwcpos_indexdb_skip_after_order';
var setOrder = function setOrder(orders) {
  return {
    type: POS_ORDERS,
    orders: orders
  };
};
var getAllOrdersWC = function getAllOrdersWC() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      isOnlineOrderDataExists().then(function (res) {
        if (res.length <= 0) {
          AjAxGetAllOrderWC(dispatch).then(function (response) {});
        } else {
          isOrderDataExists().then(function (reslt) {
            var WCorders = {
              list: reslt,
              isFetching: 1,
              s: '',
              sorder: res
            };
            dispatch(setOrder(WCorders));
          });
        }
      });
    }
  };
};
var loadAllOrders = function loadAllOrders() {
  return function (dispatch) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_orders').toArray().then(function (orderData) {
      var orderObj = {
        list: orderData,
        isFetching: 1,
        s: '',
        sorder: orderData
      };
      dispatch(setOrder(orderObj));
    });
  };
};
var sendcustomemails = function sendcustomemails(order) {
  return function (dispatch) {
    var postData = {
      order: order
    };
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_CUSTOM_EMAILS, postData).then(function (json) {
      if (json.status == 'success') {
        jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].confirmation_text,
          icon: 'fa fa-question-circle',
          animation: 'scale',
          closeAnimation: 'scale',
          opacity: 0.5,
          content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].email_send,
          buttons: {
            'confirm': {
              text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].okay_text,
              btnClass: 'pos-btn-primary',
              action: function action() {
                jQuery(".pos-left-wrap ul li").eq(0).trigger("click");
              }
            }
          }
        });
      }
    });
  };
};

function AjAxGetAllOrderWC(dispatch) {
  return new Promise(function (resolve, reject) {
    var index = 0;
    recursive_ajax(index, dispatch).then(function (recur_res) {
      resolve(recur_res);
    });
  });
}

function recursive_ajax(page, dispatch) {
  var postData = {
    page: page
  };
  return new Promise(function (resolve, reject) {
    if (page == 1) {
      document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].text_loading_orders;
      document.querySelector('#loader').style.display = 'block';
    }

    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_ORDERS_ENDPOINT, postData).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_orders.bulkPut(json).then(function (rsult) {
          isOrderDataExists().then(function (res) {
            var WCorders = {
              list: res,
              isFetching: 1,
              s: '',
              sorder: res
            };
            dispatch(setOrder(WCorders));
          });

          if (json.length > 0) {
            page = page + 1;
            recursive_ajax(page, dispatch);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}

function isOrderDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_orders').toArray().then(function (OrData) {
    return OrData;
  });
}

function isOnlineOrderDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_orders').where('order_type').equals('online').toArray().then(function (OrData) {
    return OrData;
  });
}

var current_state = function current_state(state_data) {
  return function (dispatch, getState) {
    var current_state = getState().current_cart;
    var products = state_data.order.products;
    var product_title_arr = [];
    var offline = false;

    if (products) {
      if (offline) {
        jQuery.each(products, function (i, val) {
          if (val.options !== "false") {
            product_title_arr.push({
              name: val.product_id,
              qty: val.quantity,
              var_id: val.options.var_id
            });
          } else {
            product_title_arr.push({
              name: val.product_id,
              qty: val.quantity,
              var_id: 0
            });
          }
        });
      } else {
        jQuery.each(products, function (i, val) {
          product_title_arr.push({
            name: val.product_id,
            qty: val.qty,
            var_id: val.variable_id
          });
        });
      }
    }

    _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_cart.where("cart_id").equals(current_state).delete().then(function (res) {
      if (res) {
        if (product_title_arr.length > 0) {
          jQuery.each(product_title_arr, function (i, Tproduct) {
            if (Tproduct.var_id == 0) {
              _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_products.where("product_id").equals(Tproduct.name).modify(function (product) {
                product.stock = product.stock - Tproduct.qty;
              }).then(function (res) {
                return res;
              });
            } else {
              _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_products.where("product_id").equals(Tproduct.name).modify(function (product) {
                product.variations.variation = product.variations.variation.map(function (val, key) {
                  if (val.var_id == Tproduct.var_id) {
                    val.stock = val.stock - Tproduct.qty;
                  }

                  return val;
                });
              }).then(function (res) {
                return res;
              });
            }
          });
        }

        _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_coupon.where("cart_id").equals(current_state).delete().then(function (res) {});
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_discount.where("cart_id").equals(current_state).delete().then(function (res) {});
      }
    });
  };
};
var createWCOrder = function createWCOrder(state_data) {
  return function (dispatch, getState) {
    var user = apif_script.logged_in;
    var tendered = state_data.tendered;
    var current_state = getState().current_cart;
    var payment_type = state_data.payment_mode;
    var order_note = state_data.note;
    var cashPay = state_data.cashEntry;
    var cardPay = state_data.cardEntry;
    var cart = getState().cart;
    var coupon = getState().coupon;
    var discount = getState().discount;
    var tax = getState().tax.list;
    var Scurrency = getState().currency.default;
    var customer = Array.from(getState().customers.default);
    var currency = Array.from(Scurrency);
    var order_currency_code = currency.map(function (sym) {
      return sym;
    });
    var def_customer = customer.map(function (cust) {
      return cust.id;
    });
    var customer_id = def_customer[0];
    order_currency_code = order_currency_code[0];
    var cart_obj = cart.list;
    var coupon_obj = coupon.list;
    var discount_obj = discount.list;
    var dcart_id = discount.list.length > 0 ? discount.list[0].cart_id : '';
    var cocart_id = coupon.list.length > 0 ? coupon.list[0].cart_id : '';
    var ccart_id = cart.list.length > 0 ? cart.list[0].cart_id : '';
    var total_obj = cart.total;
    var sub_total = total_obj.cart_subtotal;
    var total = total_obj.cart_total;
    var tax_total = total_obj.tax_total;

    if (current_state == ccart_id) {
      var pos_cart = cart_obj[0].cart;
      var local_cart = JSON.stringify(pos_cart);
    } else {
      var pos_cart = [];
      var local_cart = [];
    }

    if (current_state === cocart_id) {
      var pos_coupon = coupon_obj[0].coupon;
      var local_coupon = JSON.stringify(pos_coupon);
    } else {
      var pos_coupon = {};
      var local_coupon = {};
    }

    if (current_state === dcart_id) {
      var pos_discount = discount_obj[0].discount;
      var local_discount = JSON.stringify(pos_discount);
    } else {
      var pos_discount = {};
      var local_discount = {};
    }

    var payment_option = apif_script.logged_in.payment_option;
    var chosenPaymentMethod = payment_type;

    if (payment_type != 'cash' && payment_option != undefined && payment_option.length > 0) {
      chosenPaymentMethod = payment_option.filter(function (payment) {
        return payment.payment_slug == payment_type;
      });

      if (chosenPaymentMethod.length > 0) {
        chosenPaymentMethod = chosenPaymentMethod[0].payment_name;
      }
    }

    var customerOrderObject = {
      user_id: user.user_id,
      order_note: order_note,
      currency_code: order_currency_code,
      discount: local_discount,
      coupon: local_coupon,
      customer_id: customer_id,
      cart: local_cart,
      tendered: tendered,
      payment_mode: payment_type,
      payment_title: chosenPaymentMethod,
      cashPay: cashPay,
      cardPay: cardPay
    };
    var online = navigator.onLine;
    customerOrderObject = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(ADD_CUSTOM_ORDER_DETAILS, customerOrderObject, customer, cart_obj, state_data);
    var postData = {
      data: JSON.stringify(customerOrderObject)
    };

    if (apif_script.order_process_type == 'online' && online) {
      return new Promise(function (resolve, reject) {
        document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].processing_order_text;
        document.querySelector('#loader').style.display = 'block';
        Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_CREATE_ORDER_ENDPOINT, postData).then(function (order_data) {
          document.querySelector('#loader').style.display = 'none';

          if (order_data) {
            Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["doAction"])(AFTER_CREATING_ORDER_ACTION, order_data, _database__WEBPACK_IMPORTED_MODULE_0__["default"]);
            var bool = saveOrderToIndexDB(order_data);

            if (bool) {
              var final_res = clearIndexDB(order_data, current_state, false);

              if (final_res) {
                if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(PRINT_INVOICE_SKIP_POPUP_AFTER_PAY, true, order_data)) {
                  jQuery.confirm({
                    title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].success_text,
                    content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].text_order_success,
                    buttons: {
                      printinvoice: {
                        text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].printInvoice_text,
                        // text for button
                        btnClass: 'pos-btn-primary',
                        // class for the button
                        action: function action() {
                          resolve(order_data);
                        }
                      },
                      skip: {
                        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Skip', 'wc_pos'),
                        // text for button
                        btnClass: 'btn-default',
                        // class for the button
                        action: function action() {
                          resolve({
                            order: {},
                            message: 'skip'
                          });
                        }
                      }
                    }
                  });
                } else {
                  resolve(order_data);
                }
              }
            }
          }
        });
      });
    } else {
      var order = {};
      var d = new Date();
      var tr_id = Math.floor(Math.random() * 999999999 + 100000000);
      tr_id = '#' + tr_id;
      order['id'] = tr_id;
      order['order_id'] = tr_id;
      order['cart_subtotal'] = sub_total;
      order['coupons'] = pos_coupon;
      order['order_date'] = d;
      order['discount'] = pos_discount;
      order['currency'] = currency[0];
      order['order_total'] = total;
      order['order_html'] = total;
      order['order_note'] = order_note;
      order['products'] = pos_cart;
      order['payment_mode'] = payment_type;
      order['payment_title'] = chosenPaymentMethod;
      order['cashPay'] = cashPay;
      order['cardPay'] = cardPay;
      order['cashPay_html'] = cashPay;
      order['cardPay_html'] = cardPay;
      order['tendered'] = tendered;
      order['order_type'] = 'offline';
      order['email'] = customer_id;
      order['balance'] = '';
      order['billing'] = customer[0].billing;
      order['tax_lines'] = tax;
      order = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(ADD_CUSTOM_ORDER_DETAILS, order, customer, cart_obj, state_data);
      var osuccess = saveOrderToIndexDB(order);

      if (osuccess) {
        var final_res = clearIndexDB(order, current_state, true);

        if (final_res) {
          return new Promise(function (resolve, reject) {
            if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(PRINT_INVOICE_SKIP_POPUP_AFTER_PAY, true, order)) {
              jQuery.confirm({
                title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].success_text,
                content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].text_order_success,
                buttons: {
                  printinvoice: {
                    text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].printInvoice_text,
                    // text for button
                    btnClass: 'pos-btn-primary',
                    // class for the button
                    action: function action() {
                      resolve(order);
                    }
                  },
                  skip: {
                    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Skip', 'wc_pos'),
                    // text for button
                    btnClass: 'pos-btn-primary',
                    // class for the button
                    action: function action() {
                      resolve({
                        order: order,
                        message: 'skip'
                      });
                    }
                  }
                }
              });
            } else {
              resolve(order);
            }
          });
        }
      }
    }

    ;
  };
};

function saveOrderToIndexDB(data) {
  var new_order = data;

  if (data) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table("pos_orders").put(new_order);
    return true;
  } else {
    return false;
  }
}

function clearIndexDB(order_data, current_state) {
  var offline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(CLEAR_INDEXDB_SKIP_AFTER_PAY, false, order_data, current_state)) {
    return true;
  }

  var products = order_data.products;
  var product_title_arr = [];

  if (products) {
    if (offline) {
      jQuery.each(products, function (i, val) {
        if (val.options !== "false") {
          product_title_arr.push({
            name: val.product_id,
            qty: val.quantity,
            var_id: val.options.var_id
          });
        } else {
          product_title_arr.push({
            name: val.product_id,
            qty: val.quantity,
            var_id: 0
          });
        }
      });
    } else {
      jQuery.each(products, function (i, val) {
        product_title_arr.push({
          name: val.product_id,
          qty: val.qty,
          var_id: val.variable_id
        });
      });
    }
  }

  _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_cart.where("cart_id").equals(current_state).delete().then(function (res) {
    if (res) {
      if (product_title_arr.length > 0) {
        jQuery.each(product_title_arr, function (i, Tproduct) {
          if (Tproduct.var_id == 0) {
            _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_products.where("product_id").equals(Tproduct.name).modify(function (product) {
              product.stock = product.stock - Tproduct.qty;
            }).then(function (res) {
              return res;
            });
          } else {
            _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_products.where("product_id").equals(Tproduct.name).modify(function (product) {
              product.variations.variation = product.variations.variation.map(function (val, key) {
                if (val.var_id == Tproduct.var_id) {
                  val.stock = val.stock - Tproduct.qty;
                }

                return val;
              });
            }).then(function (res) {
              return res;
            });
          }
        });
      }

      _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_coupon.where("cart_id").equals(current_state).delete().then(function (res) {});
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_discount.where("cart_id").equals(current_state).delete().then(function (res) {});
    }
  });
  return true;
}

var loadSearchedOrder = function loadSearchedOrder(search, fakeorders) {
  return function (dispatch) {
    if (search) {
      var orderData = fakeorders.filter(function (order) {
        if (order.order_id.toString().indexOf(search) != -1 || order.offline_id && order.offline_id.indexOf(search) != -1 || order.billing.fname.indexOf(search) != -1) {
          return order;
        }
      });
      var orderObj = {
        list: fakeorders,
        isFetching: 1,
        s: search,
        sorder: orderData
      };
      dispatch(setOrder(orderObj));
    } else {
      var _orderObj = {
        list: fakeorders,
        isFetching: 1,
        s: '',
        sorder: fakeorders
      };
      dispatch(setOrder(_orderObj));
    }
  };
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9sb2dpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9vcmRlcnMvaW5kZXguanMiXSwibmFtZXMiOlsiTE9HR0lOX1VTRVIiLCJPUEVOSU5HX0FNT1VOVCIsIlNIT1dfU0VUX0RSQVdFUl9BTU9VTlRfUE9QVVBfRklMVEVSIiwiU0VUX0RFRkFVTFRfT1BFTklOR19BTU9VTlRfRklMVEVSIiwic2V0Q2FzaGllciIsInVzZXIiLCJ0eXBlIiwiY2hlY2tMb2dpblVzZXIiLCJkaXNwYXRjaCIsImFwaWZfc2NyaXB0IiwibG9nZ2VkX2luIiwibG9nb3V0X3VybCIsIm5ld1VzZXIiLCJmaXJzdF9uYW1lIiwiZm5hbWUiLCJsYXN0X25hbWUiLCJsbmFtZSIsImVtYWlsIiwiaXNMb2dnZWRJbiIsImNhc2hpZXJfaWQiLCJ1c2VyX2lkIiwicHJvZmlsZV9waWMiLCJpc0ZldGNoaW5nIiwib3BlbmluZ19hbW91bnQiLCJwYXJzZUZsb2F0Iiwic2V0RHJhd2VyQW1vdW50IiwibG9jYWxTdG9yYWdlIiwiY2FzaGRyYXdlciIsInVuZGVmaW5lZCIsImFwcGx5RmlsdGVycyIsImpRdWVyeSIsImNvbmZpcm0iLCJ0aXRsZSIsInRyYW5zbGF0aW9uIiwiZHJhd2VyX3RleHQiLCJjb250ZW50IiwidmFsaWRhdGVkX3RleHQiLCJidXR0b25zIiwiYXBwbHkiLCJ0ZXh0Iiwib2theV90ZXh0IiwiYnRuQ2xhc3MiLCJhY3Rpb24iLCJfcG9zb19maWx0ZXIiLCJpbnB1dCIsIiRjb250ZW50IiwiZmluZCIsInZhbCIsInRyaW0iLCJsZW5ndGgiLCJ0ZXN0IiwiYWxlcnQiLCJkcmF3ZXJfdmFsaWRhdGVfdGV4dCIsInBvcGVuaW5nX2FtdCIsInRvZGF5VHJhbnNhY3Rpb24iLCJpbml0aWFsQW1vdW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImxhdGVyIiwiX18iLCJQT1NfT1JERVJTIiwiQUREX0NVU1RPTV9PUkRFUl9ERVRBSUxTIiwiUFJJTlRfSU5WT0lDRV9TS0lQX1BPUFVQX0FGVEVSX1BBWSIsIkFGVEVSX0NSRUFUSU5HX09SREVSX0FDVElPTiIsIkNMRUFSX0lOREVYREJfU0tJUF9BRlRFUl9QQVkiLCJzZXRPcmRlciIsIm9yZGVycyIsImdldEFsbE9yZGVyc1dDIiwiaXNPbmxpbmVPcmRlckRhdGFFeGlzdHMiLCJ0aGVuIiwicmVzIiwiQWpBeEdldEFsbE9yZGVyV0MiLCJyZXNwb25zZSIsImlzT3JkZXJEYXRhRXhpc3RzIiwicmVzbHQiLCJXQ29yZGVycyIsImxpc3QiLCJzIiwic29yZGVyIiwibG9hZEFsbE9yZGVycyIsImRhdGFiYXNlIiwidGFibGUiLCJ0b0FycmF5Iiwib3JkZXJEYXRhIiwib3JkZXJPYmoiLCJzZW5kY3VzdG9tZW1haWxzIiwib3JkZXIiLCJwb3N0RGF0YSIsIlBPU1Bvc3RSZXF1ZXN0Iiwid2t3Y3Bvc192YXJpYWJsZSIsIldLX0NVU1RPTV9FTUFJTFMiLCJqc29uIiwic3RhdHVzIiwiY29uZmlybWF0aW9uX3RleHQiLCJpY29uIiwiYW5pbWF0aW9uIiwiY2xvc2VBbmltYXRpb24iLCJvcGFjaXR5IiwiZW1haWxfc2VuZCIsImVxIiwidHJpZ2dlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW5kZXgiLCJyZWN1cnNpdmVfYWpheCIsInJlY3VyX3JlcyIsInBhZ2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJ0ZXh0X2xvYWRpbmdfb3JkZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiV0tfR0VUX09SREVSU19FTkRQT0lOVCIsInBvc19vcmRlcnMiLCJidWxrUHV0IiwicnN1bHQiLCJPckRhdGEiLCJ3aGVyZSIsImVxdWFscyIsImN1cnJlbnRfc3RhdGUiLCJzdGF0ZV9kYXRhIiwiZ2V0U3RhdGUiLCJjdXJyZW50X2NhcnQiLCJwcm9kdWN0cyIsInByb2R1Y3RfdGl0bGVfYXJyIiwib2ZmbGluZSIsImVhY2giLCJpIiwib3B0aW9ucyIsInB1c2giLCJuYW1lIiwicHJvZHVjdF9pZCIsInF0eSIsInF1YW50aXR5IiwidmFyX2lkIiwidmFyaWFibGVfaWQiLCJwb3NfY2FydCIsImRlbGV0ZSIsIlRwcm9kdWN0IiwicG9zX3Byb2R1Y3RzIiwibW9kaWZ5IiwicHJvZHVjdCIsInN0b2NrIiwidmFyaWF0aW9ucyIsInZhcmlhdGlvbiIsIm1hcCIsImtleSIsInBvc19jb3Vwb24iLCJwb3NfZGlzY291bnQiLCJjcmVhdGVXQ09yZGVyIiwidGVuZGVyZWQiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X21vZGUiLCJvcmRlcl9ub3RlIiwibm90ZSIsImNhc2hQYXkiLCJjYXNoRW50cnkiLCJjYXJkUGF5IiwiY2FyZEVudHJ5IiwiY2FydCIsImNvdXBvbiIsImRpc2NvdW50IiwidGF4IiwiU2N1cnJlbmN5IiwiY3VycmVuY3kiLCJkZWZhdWx0IiwiY3VzdG9tZXIiLCJBcnJheSIsImZyb20iLCJjdXN0b21lcnMiLCJvcmRlcl9jdXJyZW5jeV9jb2RlIiwic3ltIiwiZGVmX2N1c3RvbWVyIiwiY3VzdCIsImlkIiwiY3VzdG9tZXJfaWQiLCJjYXJ0X29iaiIsImNvdXBvbl9vYmoiLCJkaXNjb3VudF9vYmoiLCJkY2FydF9pZCIsImNhcnRfaWQiLCJjb2NhcnRfaWQiLCJjY2FydF9pZCIsInRvdGFsX29iaiIsInRvdGFsIiwic3ViX3RvdGFsIiwiY2FydF9zdWJ0b3RhbCIsImNhcnRfdG90YWwiLCJ0YXhfdG90YWwiLCJsb2NhbF9jYXJ0IiwibG9jYWxfY291cG9uIiwibG9jYWxfZGlzY291bnQiLCJwYXltZW50X29wdGlvbiIsImNob3NlblBheW1lbnRNZXRob2QiLCJmaWx0ZXIiLCJwYXltZW50IiwicGF5bWVudF9zbHVnIiwicGF5bWVudF9uYW1lIiwiY3VzdG9tZXJPcmRlck9iamVjdCIsImN1cnJlbmN5X2NvZGUiLCJwYXltZW50X3RpdGxlIiwib25saW5lIiwibmF2aWdhdG9yIiwib25MaW5lIiwiZGF0YSIsIm9yZGVyX3Byb2Nlc3NfdHlwZSIsInByb2Nlc3Npbmdfb3JkZXJfdGV4dCIsIldLX0NSRUFURV9PUkRFUl9FTkRQT0lOVCIsIm9yZGVyX2RhdGEiLCJkb0FjdGlvbiIsImJvb2wiLCJzYXZlT3JkZXJUb0luZGV4REIiLCJmaW5hbF9yZXMiLCJjbGVhckluZGV4REIiLCJzdWNjZXNzX3RleHQiLCJ0ZXh0X29yZGVyX3N1Y2Nlc3MiLCJwcmludGludm9pY2UiLCJwcmludEludm9pY2VfdGV4dCIsInNraXAiLCJtZXNzYWdlIiwiZCIsIkRhdGUiLCJ0cl9pZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJpbGxpbmciLCJvc3VjY2VzcyIsIm5ld19vcmRlciIsInB1dCIsImxvYWRTZWFyY2hlZE9yZGVyIiwic2VhcmNoIiwiZmFrZW9yZGVycyIsIm9yZGVyX2lkIiwidG9TdHJpbmciLCJpbmRleE9mIiwib2ZmbGluZV9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJTyxJQUFNQSxXQUFXLEdBQUcsYUFBcEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsZ0JBQXZCO0FBQ1A7QUFDQTtBQUNPLElBQU1DLG1DQUFtQyxHQUFHLHNDQUE1QztBQUNBLElBQU1DLGlDQUFpQyxHQUFHLDJDQUExQztBQUVBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLElBQUQsRUFBVTtBQUNsQyxTQUFPO0FBQ0xDLFFBQUksRUFBRU4sV0FERDtBQUVMSyxRQUFJLEVBQUpBO0FBRkssR0FBUDtBQUlELENBTE07QUFPQSxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFFaEQsUUFBSUgsSUFBSSxHQUFHSSxXQUFXLENBQUNDLFNBQXZCO0FBQ0EsUUFBSUMsVUFBVSxHQUFHRixXQUFXLENBQUNFLFVBQTdCOztBQUdBLFFBQUlO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a0IsVUFBQzlHLEtBQUQsRUFBVztBQUU1QyxZQUFJQSxLQUFLLENBQUNxSixRQUFOLENBQWVDLFFBQWYsR0FBMEJDLE9BQTFCLENBQWtDSixNQUFsQyxLQUE2QyxDQUFDLENBQTlDLElBQXFEbkosS0FBSyxDQUFDd0osVUFBUCxJQUFzQnhKLEtBQUssQ0FBQ3dKLFVBQU4sQ0FBaUJELE9BQWpCLENBQXlCSixNQUF6QixLQUFvQyxDQUFDLENBQS9HLElBQXFIbkosS0FBSyxDQUFDOEksT0FBTixDQUFjdE4sS0FBZCxDQUFvQitOLE9BQXBCLENBQTRCSixNQUE1QixLQUF1QyxDQUFDLENBQWpLLEVBQW9LO0FBQy9KLGlCQUFPbkosS0FBUDtBQUNMO0FBRUYsT0FOaUIsQ0FBaEI7QUFRRixVQUFJRixRQUFRLEdBQUc7QUFDYlIsWUFBSSxFQUFFOEosVUFETztBQUVicE4sa0JBQVUsRUFBRSxDQUZDO0FBR2J1RCxTQUFDLEVBQUU0SixNQUhVO0FBSWIzSixjQUFNLEVBQUVLO0FBSkssT0FBZjtBQU9BM0UsY0FBUSxDQUFDeUQsUUFBUSxDQUFDbUIsUUFBRCxDQUFULENBQVI7QUFFRCxLQW5CRCxNQW1CTztBQUVMLFVBQUlBLFNBQVEsR0FBRztBQUNiUixZQUFJLEVBQUU4SixVQURPO0FBRWJwTixrQkFBVSxFQUFFLENBRkM7QUFHYnVELFNBQUMsRUFBRSxFQUhVO0FBSWJDLGNBQU0sRUFBRTRKO0FBSkssT0FBZjtBQU9BbE8sY0FBUSxDQUFDeUQsUUFBUSxDQUFDbUIsU0FBRCxDQUFULENBQVI7QUFFRDtBQUVGLEdBbENnQztBQUFBLENBQTFCLEMiLCJmaWxlIjoiLi9hc3NldHMvZGlzdC9jYXNoaWVyfmN1c3RvbWVyfmhvbWV+b3JkZXJ+cGF5L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICB0cmFuc2xhdGlvblxyXG59IGZyb20gXCIuLi8uLi90cmFuc2xhdGlvblwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPR0dJTl9VU0VSID0gJ0xPR0dJTl9VU0VSJztcclxuZXhwb3J0IGNvbnN0IE9QRU5JTkdfQU1PVU5UID0gJ09QRU5JTkdfQU1PVU5UJztcclxuaW1wb3J0IHsgYXBwbHlGaWx0ZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9ob29rcyc7XHJcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcclxuZXhwb3J0IGNvbnN0IFNIT1dfU0VUX0RSQVdFUl9BTU9VTlRfUE9QVVBfRklMVEVSID0gJ3drd2Nwb3Nfc2hvd19zZXRfZHJhd2VyX2Ftb3VudF9wb3B1cCc7XHJcbmV4cG9ydCBjb25zdCBTRVRfREVGQVVMVF9PUEVOSU5HX0FNT1VOVF9GSUxURVIgPSAnd2t3Y3Bvc19zZXRfZGVmYXVsdF9vcGVuaW5nX2Ftb3VudF9maWx0ZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldENhc2hpZXIgPSAodXNlcikgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBMT0dHSU5fVVNFUixcclxuICAgIHVzZXJcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tMb2dpblVzZXIgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgbGV0IHVzZXIgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW47XHJcbiAgbGV0IGxvZ291dF91cmwgPSBhcGlmX3NjcmlwdC5sb2dvdXRfdXJsO1xyXG5cclxuXHJcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG5cclxuICAgIGxldCBuZXdVc2VyID0ge1xyXG4gICAgICBmaXJzdF9uYW1lOiB1c2VyLmZuYW1lLFxyXG4gICAgICBsYXN0X25hbWU6IHVzZXIubG5hbWUsXHJcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICBpc0xvZ2dlZEluOiB0cnVlLFxyXG4gICAgICBjYXNoaWVyX2lkOiB1c2VyLnVzZXJfaWQsXHJcbiAgICAgIHByb2ZpbGVfcGljOiB1c2VyLnByb2ZpbGVfcGljLFxyXG4gICAgICBpc0ZldGNoaW5nOiAxLFxyXG4gICAgICBsb2dvdXRfdXJsOiBsb2dvdXRfdXJsLFxyXG4gICAgICBvcGVuaW5nX2Ftb3VudDogcGFyc2VGbG9hdCgwKVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKHNldENhc2hpZXIobmV3VXNlcikpO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldERyYXdlckFtb3VudCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjtcclxuICBsZXQgbG9nb3V0X3VybCA9IGFwaWZfc2NyaXB0LmxvZ291dF91cmw7XHJcblxyXG4gIGlmICh1c2VyICE9IFwiXCIpIHtcclxuXHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuY2FzaGRyYXdlciA9PT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICBpZiAoYXBwbHlGaWx0ZXJzKFNIT1dfU0VUX0RSQVdFUl9BTU9VTlRfUE9QVVBfRklMVEVSLCB0cnVlKSkge1xyXG4gICAgICBqUXVlcnkuY29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLmRyYXdlcl90ZXh0LFxyXG4gICAgICAgIGNvbnRlbnQ6ICc8ZGl2PjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGlucHV0IGF1dG9mb2N1cyB0eXBlPVwidGV4dFwiIGlkPVwiaW5wdXQtZHJhd2VyXCIgcGxhY2Vob2xkZXI9XCInICsgdHJhbnNsYXRpb24udmFsaWRhdGVkX3RleHQgKyAnXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L2Rpdj48L2Rpdj4nLFxyXG4gICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgIGFwcGx5OiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uLm9rYXlfdGV4dCxcclxuICAgICAgICAgICAgYnRuQ2xhc3M6ICdidG4tZ2xvYmFsJyxcclxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF9wb3NvX2ZpbHRlciA9IC9eLT8oPzpcXGQrfFxcZHsxLDN9KD86W1xcc1xcLixdXFxkezN9KSspKD86W1xcLixdXFxkKyk/JC87XHJcbiAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy4kY29udGVudC5maW5kKCdpbnB1dCNpbnB1dC1kcmF3ZXInKTtcclxuICAgICAgICAgICAgICBpZiAoIWlucHV0LnZhbCgpLnRyaW0oKSB8fCBpbnB1dC52YWwoKS5sZW5ndGggPiAxNSB8fCBfcG9zb19maWx0ZXIudGVzdChpbnB1dC52YWwoKSkgPT0gZmFsc2UgfHwgcGFyc2VGbG9hdChpbnB1dC52YWwoKSkgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmFsZXJ0KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLmRyYXdlcl92YWxpZGF0ZV90ZXh0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlZCdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcGVuaW5nX2FtdCA9IGlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwb3BlbmluZ19hbXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuY2FzaGRyYXdlciA9PSB1bmRlZmluZWQgfHwgbG9jYWxTdG9yYWdlLmNhc2hkcmF3ZXIgPT0gJycgfHwgbG9jYWxTdG9yYWdlLmNhc2hkcmF3ZXIgPT0gJ3t9Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZGF5VHJhbnNhY3Rpb24gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kYXlUcmFuc2FjdGlvbiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b2RheVRyYW5zYWN0aW9uWydpbml0aWFsQW1vdW50J10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQW1vdW50OiBwb3BlbmluZ19hbXRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2FzaGRyYXdlciA9IEpTT04uc3RyaW5naWZ5KHRvZGF5VHJhbnNhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlciAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1VzZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IHVzZXIuZm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogdXNlci5sbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9nZ2VkSW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2hpZXJfaWQ6IHVzZXIudXNlcl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZV9waWM6IHVzZXIucHJvZmlsZV9waWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ291dF91cmw6IGxvZ291dF91cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pbmdfYW1vdW50OiBwb3BlbmluZ19hbXRcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRDYXNoaWVyKG5ld1VzZXIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGF0ZXI6IHtcclxuICAgICAgICAgICAgdGV4dDogX18oICdMYXRlcicsICd3Y19wb3MnICksXHJcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHZhciBwb3BlbmluZ19hbXQgPSBhcHBseUZpbHRlcnMoU0VUX0RFRkFVTFRfT1BFTklOR19BTU9VTlRfRklMVEVSLCAwKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcGVuaW5nX2FtdCkge1xyXG5cclxuICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuY2FzaGRyYXdlciA9PSB1bmRlZmluZWQgfHwgbG9jYWxTdG9yYWdlLmNhc2hkcmF3ZXIgPT0gJycgfHwgbG9jYWxTdG9yYWdlLmNhc2hkcmF3ZXIgPT0gJ3t9Jykge1xyXG4gICAgICAgICAgICAvLyB0b2RheVRyYW5zYWN0aW9uID0gW107XHJcbiAgICAgICAgICAgIGxldCB0b2RheVRyYW5zYWN0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICB0b2RheVRyYW5zYWN0aW9uWydpbml0aWFsQW1vdW50J10gPSB7XHJcbiAgICAgICAgICAgICAgaW5pdGlhbEFtb3VudDogcG9wZW5pbmdfYW10XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2FzaGRyYXdlciA9IEpTT04uc3RyaW5naWZ5KHRvZGF5VHJhbnNhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICBsZXQgbmV3VXNlciA9IHtcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IHVzZXIuZm5hbWUsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6IHVzZXIubG5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgIGlzTG9nZ2VkSW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjYXNoaWVyX2lkOiB1c2VyLnVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX3BpYzogdXNlci5wcm9maWxlX3BpYyxcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IDEsXHJcbiAgICAgICAgICAgICAgICBsb2dvdXRfdXJsOiBsb2dvdXRfdXJsLFxyXG4gICAgICAgICAgICAgICAgb3BlbmluZ19hbW91bnQ6IHBvcGVuaW5nX2FtdFxyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGRpc3BhdGNoKHNldENhc2hpZXIobmV3VXNlcikpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgfVxyXG5cclxufTtcclxuIiwiaW1wb3J0IGRhdGFiYXNlIGZyb20gJy4vLi4vLi4vZGF0YWJhc2UnO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGlvbiB9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IHdrd2Nwb3NfdmFyaWFibGUgZnJvbSAnLi8uLi8uLi9jb25maWcnO1xyXG5pbXBvcnQgeyBQT1NQb3N0UmVxdWVzdCB9IGZyb20gJy4vLi4vLi4vaGFzaCc7XHJcbmltcG9ydCB7IGFwcGx5RmlsdGVycywgZG9BY3Rpb24gfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcclxuaW1wb3J0IHsgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xyXG5pbXBvcnQgeyBwcmludF9yIH0gZnJvbSAnbG9jdXR1cy9waHAvdmFyJztcclxuXHJcbmV4cG9ydCBjb25zdCBQT1NfT1JERVJTID0gJ1BPU19PUkRFUlMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFERF9DVVNUT01fT1JERVJfREVUQUlMUyA9ICd3a3djcG9zX2FkZF9jdXN0b21fb3JkZXJfZGV0YWlscydcclxuXHJcbmV4cG9ydCBjb25zdCBQUklOVF9JTlZPSUNFX1NLSVBfUE9QVVBfQUZURVJfUEFZID0gJ3drd2Nwb3Nfc2hvd19wcmludF9pbnZvaWNlX3NraXBfcG9wdXBfYWZ0ZXJfcGF5JztcclxuZXhwb3J0IGNvbnN0IEFGVEVSX0NSRUFUSU5HX09SREVSX0FDVElPTiA9ICd3a3djcG9zX2FjdGlvbl9hZnRlcl9jcmVhdGluZ19vcmRlcic7XHJcbmV4cG9ydCBjb25zdCBDTEVBUl9JTkRFWERCX1NLSVBfQUZURVJfUEFZID0gJ3drd2Nwb3NfaW5kZXhkYl9za2lwX2FmdGVyX29yZGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRPcmRlciA9IChvcmRlcnMpID0+IHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBPU19PUkRFUlMsXHJcbiAgICBvcmRlcnNcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbE9yZGVyc1dDID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XHJcblxyXG4gIGxldCB1c2VyID0gYXBpZl9zY3JpcHQubG9nZ2VkX2luO1xyXG5cclxuICBpZiAodXNlciAhPSBcIlwiKSB7XHJcblxyXG4gICAgaXNPbmxpbmVPcmRlckRhdGFFeGlzdHMoKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgIGlmIChyZXMubGVuZ3RoIDw9IDApIHtcclxuXHJcbiAgICAgICAgQWpBeEdldEFsbE9yZGVyV0MoZGlzcGF0Y2gpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgaXNPcmRlckRhdGFFeGlzdHMoKS50aGVuKChyZXNsdCkgPT4ge1xyXG5cclxuICAgICAgICAgIGxldCBXQ29yZGVycyA9IHtcclxuXHJcbiAgICAgICAgICAgIGxpc3Q6IHJlc2x0LFxyXG4gICAgICAgICAgICBpc0ZldGNoaW5nOiAxLFxyXG4gICAgICAgICAgICBzOiAnJyxcclxuICAgICAgICAgICAgc29yZGVyOiByZXMsXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZGlzcGF0Y2goc2V0T3JkZXIoV0NvcmRlcnMpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZEFsbE9yZGVycyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBkYXRhYmFzZS50YWJsZSgncG9zX29yZGVycycpLnRvQXJyYXkoKS50aGVuKChvcmRlckRhdGEpID0+IHtcclxuXHJcbiAgICBsZXQgb3JkZXJPYmogPSB7XHJcbiAgICAgIGxpc3Q6IG9yZGVyRGF0YSxcclxuICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgczogJycsXHJcbiAgICAgIHNvcmRlcjogb3JkZXJEYXRhLFxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKHNldE9yZGVyKG9yZGVyT2JqKSk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRjdXN0b21lbWFpbHMgPSAob3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xyXG4gICAgbGV0IHBvc3REYXRhID0ge1xyXG4gICAgICAgIG9yZGVyOiBvcmRlclxyXG4gICAgfVxyXG4gICAgUE9TUG9zdFJlcXVlc3Qod2t3Y3Bvc192YXJpYWJsZS5XS19DVVNUT01fRU1BSUxTLCBwb3N0RGF0YSkudGhlbigoanNvbikgPT4ge1xyXG4gICAgICAgIGlmIChqc29uLnN0YXR1cyA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmNvbmZpcm0oe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLmNvbmZpcm1hdGlvbl90ZXh0LFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhIGZhLXF1ZXN0aW9uLWNpcmNsZScsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246ICdzY2FsZScsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUFuaW1hdGlvbiA6ICdzY2FsZScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5lbWFpbF9zZW5kLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgICAnY29uZmlybSc6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbi5va2F5X3RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuQ2xhc3M6ICdwb3MtYnRuLXByaW1hcnknLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLnBvcy1sZWZ0LXdyYXAgdWwgbGlcIikuZXEoMCkudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gQWpBeEdldEFsbE9yZGVyV0MoZGlzcGF0Y2gpIHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG5cclxuICAgIHJlY3Vyc2l2ZV9hamF4KGluZGV4LCBkaXNwYXRjaCkudGhlbigocmVjdXJfcmVzKSA9PiB7XHJcblxyXG4gICAgICByZXNvbHZlKHJlY3VyX3Jlcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiByZWN1cnNpdmVfYWpheChwYWdlLCBkaXNwYXRjaCkge1xyXG5cclxuICBsZXQgcG9zdERhdGEgPSB7XHJcbiAgICBwYWdlOiBwYWdlXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGlmIChwYWdlID09IDEpIHtcclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkaW5nLXRleHQnKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi50ZXh0X2xvYWRpbmdfb3JkZXJzO1xyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBQT1NQb3N0UmVxdWVzdCh3a3djcG9zX3ZhcmlhYmxlLldLX0dFVF9PUkRFUlNfRU5EUE9JTlQsIHBvc3REYXRhKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgIGlmIChqc29uKSB7XHJcblxyXG4gICAgICAgIGRhdGFiYXNlLnBvc19vcmRlcnMuYnVsa1B1dChqc29uKS50aGVuKChyc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgIGlzT3JkZXJEYXRhRXhpc3RzKCkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgV0NvcmRlcnMgPSB7XHJcblxyXG4gICAgICAgICAgICAgIGxpc3Q6IHJlcyxcclxuICAgICAgICAgICAgICBpc0ZldGNoaW5nOiAxLFxyXG4gICAgICAgICAgICAgIHM6ICcnLFxyXG4gICAgICAgICAgICAgIHNvcmRlcjogcmVzLFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXNwYXRjaChzZXRPcmRlcihXQ29yZGVycykpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChqc29uLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIHBhZ2UgPSBwYWdlICsgMTtcclxuXHJcbiAgICAgICAgICAgIHJlY3Vyc2l2ZV9hamF4KHBhZ2UsIGRpc3BhdGNoKTtcclxuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT3JkZXJEYXRhRXhpc3RzKCkge1xyXG5cclxuICByZXR1cm4gZGF0YWJhc2UudGFibGUoJ3Bvc19vcmRlcnMnKS50b0FycmF5KCkudGhlbigoT3JEYXRhKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIE9yRGF0YTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBpc09ubGluZU9yZGVyRGF0YUV4aXN0cygpIHtcclxuXHJcbiAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3Nfb3JkZXJzJykud2hlcmUoJ29yZGVyX3R5cGUnKS5lcXVhbHMoJ29ubGluZScpLnRvQXJyYXkoKS50aGVuKChPckRhdGEpID0+IHtcclxuXHJcbiAgICByZXR1cm4gT3JEYXRhO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjdXJyZW50X3N0YXRlID0gKHN0YXRlX2RhdGEpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICB2YXIgY3VycmVudF9zdGF0ZSA9IGdldFN0YXRlKCkuY3VycmVudF9jYXJ0O1xyXG4gIHZhciBwcm9kdWN0cyA9IHN0YXRlX2RhdGEub3JkZXIucHJvZHVjdHM7XHJcbiAgdmFyIHByb2R1Y3RfdGl0bGVfYXJyID0gW107XHJcbiAgdmFyIG9mZmxpbmUgPSBmYWxzZTtcclxuICBpZiAocHJvZHVjdHMpIHtcclxuXHJcbiAgICBpZiAob2ZmbGluZSkge1xyXG5cclxuICAgICAgalF1ZXJ5LmVhY2gocHJvZHVjdHMsIChpLCB2YWwpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHZhbC5vcHRpb25zICE9PSBcImZhbHNlXCIpIHtcclxuXHJcbiAgICAgICAgICBwcm9kdWN0X3RpdGxlX2Fyci5wdXNoKHsgbmFtZTogdmFsLnByb2R1Y3RfaWQsIHF0eTogdmFsLnF1YW50aXR5LCB2YXJfaWQ6IHZhbC5vcHRpb25zLnZhcl9pZCB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgIHByb2R1Y3RfdGl0bGVfYXJyLnB1c2goeyBuYW1lOiB2YWwucHJvZHVjdF9pZCwgcXR5OiB2YWwucXVhbnRpdHksIHZhcl9pZDogMCB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBqUXVlcnkuZWFjaChwcm9kdWN0cywgKGksIHZhbCkgPT4ge1xyXG5cclxuICAgICAgICBwcm9kdWN0X3RpdGxlX2Fyci5wdXNoKHsgbmFtZTogdmFsLnByb2R1Y3RfaWQsIHF0eTogdmFsLnF0eSwgdmFyX2lkOiB2YWwudmFyaWFibGVfaWQgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkYXRhYmFzZS5wb3NfY2FydC53aGVyZShcImNhcnRfaWRcIikuZXF1YWxzKGN1cnJlbnRfc3RhdGUpLmRlbGV0ZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0X3RpdGxlX2Fyci5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgIGpRdWVyeS5lYWNoKHByb2R1Y3RfdGl0bGVfYXJyLCAoaSwgVHByb2R1Y3QpID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAoVHByb2R1Y3QudmFyX2lkID09IDApIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGFiYXNlLnBvc19wcm9kdWN0cy53aGVyZShcInByb2R1Y3RfaWRcIikuZXF1YWxzKFRwcm9kdWN0Lm5hbWUpLm1vZGlmeSgocHJvZHVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICBwcm9kdWN0LnN0b2NrID0gcHJvZHVjdC5zdG9jayAtIFRwcm9kdWN0LnF0eTtcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhYmFzZS5wb3NfcHJvZHVjdHMud2hlcmUoXCJwcm9kdWN0X2lkXCIpLmVxdWFscyhUcHJvZHVjdC5uYW1lKS5tb2RpZnkoKHByb2R1Y3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgcHJvZHVjdC52YXJpYXRpb25zLnZhcmlhdGlvbiA9IHByb2R1Y3QudmFyaWF0aW9ucy52YXJpYXRpb24ubWFwKCh2YWwsIGtleSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWwudmFyX2lkID09IFRwcm9kdWN0LnZhcl9pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFsLnN0b2NrID0gdmFsLnN0b2NrIC0gVHByb2R1Y3QucXR5O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsXHJcblxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiByZXM7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBkYXRhYmFzZS5wb3NfY291cG9uLndoZXJlKFwiY2FydF9pZFwiKS5lcXVhbHMoY3VycmVudF9zdGF0ZSkuZGVsZXRlKCkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRhdGFiYXNlLnBvc19kaXNjb3VudC53aGVyZShcImNhcnRfaWRcIikuZXF1YWxzKGN1cnJlbnRfc3RhdGUpLmRlbGV0ZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlV0NPcmRlciA9IChzdGF0ZV9kYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcblxyXG4gIGxldCB1c2VyID0gYXBpZl9zY3JpcHQubG9nZ2VkX2luO1xyXG5cclxuICB2YXIgdGVuZGVyZWQgPSBzdGF0ZV9kYXRhLnRlbmRlcmVkO1xyXG4gIHZhciBjdXJyZW50X3N0YXRlID0gZ2V0U3RhdGUoKS5jdXJyZW50X2NhcnQ7XHJcbiAgdmFyIHBheW1lbnRfdHlwZSA9IHN0YXRlX2RhdGEucGF5bWVudF9tb2RlO1xyXG4gIHZhciBvcmRlcl9ub3RlID0gc3RhdGVfZGF0YS5ub3RlO1xyXG4gIHZhciBjYXNoUGF5ID0gc3RhdGVfZGF0YS5jYXNoRW50cnk7XHJcbiAgdmFyIGNhcmRQYXkgPSBzdGF0ZV9kYXRhLmNhcmRFbnRyeTtcclxuXHJcbiAgdmFyIGNhcnQgPSBnZXRTdGF0ZSgpLmNhcnQ7XHJcbiAgdmFyIGNvdXBvbiA9IGdldFN0YXRlKCkuY291cG9uO1xyXG4gIHZhciBkaXNjb3VudCA9IGdldFN0YXRlKCkuZGlzY291bnQ7XHJcbiAgdmFyIHRheCA9IGdldFN0YXRlKCkudGF4Lmxpc3Q7XHJcbiAgdmFyIFNjdXJyZW5jeSA9IGdldFN0YXRlKCkuY3VycmVuY3kuZGVmYXVsdDtcclxuICB2YXIgY3VzdG9tZXIgPSBBcnJheS5mcm9tKGdldFN0YXRlKCkuY3VzdG9tZXJzLmRlZmF1bHQpO1xyXG4gIHZhciBjdXJyZW5jeSA9IEFycmF5LmZyb20oU2N1cnJlbmN5KTtcclxuXHJcbiAgdmFyIG9yZGVyX2N1cnJlbmN5X2NvZGUgPSBjdXJyZW5jeS5tYXAoKHN5bSkgPT4ge1xyXG4gICAgcmV0dXJuIHN5bTtcclxuICB9KTtcclxuXHJcbiAgdmFyIGRlZl9jdXN0b21lciA9IGN1c3RvbWVyLm1hcCgoY3VzdCkgPT4ge1xyXG4gICAgcmV0dXJuIGN1c3QuaWQ7XHJcbiAgfSk7XHJcblxyXG4gIHZhciBjdXN0b21lcl9pZCA9IGRlZl9jdXN0b21lclswXTtcclxuXHJcbiAgb3JkZXJfY3VycmVuY3lfY29kZSA9IG9yZGVyX2N1cnJlbmN5X2NvZGVbMF07XHJcbiAgdmFyIGNhcnRfb2JqID0gY2FydC5saXN0O1xyXG4gIHZhciBjb3Vwb25fb2JqID0gY291cG9uLmxpc3Q7XHJcbiAgdmFyIGRpc2NvdW50X29iaiA9IGRpc2NvdW50Lmxpc3Q7XHJcblxyXG4gIHZhciBkY2FydF9pZCA9IGRpc2NvdW50Lmxpc3QubGVuZ3RoID4gMCA/IGRpc2NvdW50Lmxpc3RbMF0uY2FydF9pZCA6ICcnO1xyXG4gIHZhciBjb2NhcnRfaWQgPSBjb3Vwb24ubGlzdC5sZW5ndGggPiAwID8gY291cG9uLmxpc3RbMF0uY2FydF9pZCA6ICcnO1xyXG4gIHZhciBjY2FydF9pZCA9IGNhcnQubGlzdC5sZW5ndGggPiAwID8gY2FydC5saXN0WzBdLmNhcnRfaWQgOiAnJztcclxuICB2YXIgdG90YWxfb2JqID0gY2FydC50b3RhbDtcclxuICB2YXIgc3ViX3RvdGFsID0gdG90YWxfb2JqLmNhcnRfc3VidG90YWw7XHJcbiAgdmFyIHRvdGFsID0gdG90YWxfb2JqLmNhcnRfdG90YWw7XHJcbiAgdmFyIHRheF90b3RhbCA9IHRvdGFsX29iai50YXhfdG90YWw7XHJcblxyXG4gIGlmIChjdXJyZW50X3N0YXRlID09IGNjYXJ0X2lkKSB7XHJcblxyXG4gICAgdmFyIHBvc19jYXJ0ID0gY2FydF9vYmpbMF0uY2FydDtcclxuICAgIHZhciBsb2NhbF9jYXJ0ID0gSlNPTi5zdHJpbmdpZnkocG9zX2NhcnQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIHZhciBwb3NfY2FydCA9IFtdO1xyXG4gICAgdmFyIGxvY2FsX2NhcnQgPSBbXTtcclxuXHJcbiAgfVxyXG5cclxuICBpZiAoY3VycmVudF9zdGF0ZSA9PT0gY29jYXJ0X2lkKSB7XHJcblxyXG4gICAgdmFyIHBvc19jb3Vwb24gPSBjb3Vwb25fb2JqWzBdLmNvdXBvbjtcclxuICAgIHZhciBsb2NhbF9jb3Vwb24gPSBKU09OLnN0cmluZ2lmeShwb3NfY291cG9uKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICB2YXIgcG9zX2NvdXBvbiA9IHt9O1xyXG4gICAgdmFyIGxvY2FsX2NvdXBvbiA9IHt9O1xyXG5cclxuICB9XHJcblxyXG4gIGlmIChjdXJyZW50X3N0YXRlID09PSBkY2FydF9pZCkge1xyXG5cclxuICAgIHZhciBwb3NfZGlzY291bnQgPSBkaXNjb3VudF9vYmpbMF0uZGlzY291bnQ7XHJcbiAgICB2YXIgbG9jYWxfZGlzY291bnQgPSBKU09OLnN0cmluZ2lmeShwb3NfZGlzY291bnQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIHZhciBwb3NfZGlzY291bnQgPSB7fTtcclxuICAgIHZhciBsb2NhbF9kaXNjb3VudCA9IHt9O1xyXG5cclxuICB9XHJcblxyXG4gIHZhciBwYXltZW50X29wdGlvbiA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbi5wYXltZW50X29wdGlvbjtcclxuXHJcbiAgbGV0IGNob3NlblBheW1lbnRNZXRob2QgPSBwYXltZW50X3R5cGU7XHJcblxyXG4gIGlmIChwYXltZW50X3R5cGUgIT0gJ2Nhc2gnICYmIHBheW1lbnRfb3B0aW9uICE9IHVuZGVmaW5lZCAmJiBwYXltZW50X29wdGlvbi5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgY2hvc2VuUGF5bWVudE1ldGhvZCA9IHBheW1lbnRfb3B0aW9uLmZpbHRlcigocGF5bWVudCkgPT4gcGF5bWVudC5wYXltZW50X3NsdWcgPT0gcGF5bWVudF90eXBlKTtcclxuXHJcbiAgICBpZiAoY2hvc2VuUGF5bWVudE1ldGhvZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNob3NlblBheW1lbnRNZXRob2QgPSBjaG9zZW5QYXltZW50TWV0aG9kWzBdLnBheW1lbnRfbmFtZTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB2YXIgY3VzdG9tZXJPcmRlck9iamVjdCA9IHtcclxuICAgIHVzZXJfaWQ6IHVzZXIudXNlcl9pZCxcclxuICAgIG9yZGVyX25vdGU6IG9yZGVyX25vdGUsXHJcbiAgICBjdXJyZW5jeV9jb2RlOiBvcmRlcl9jdXJyZW5jeV9jb2RlLFxyXG4gICAgZGlzY291bnQ6IGxvY2FsX2Rpc2NvdW50LFxyXG4gICAgY291cG9uOiBsb2NhbF9jb3Vwb24sXHJcbiAgICBjdXN0b21lcl9pZDogY3VzdG9tZXJfaWQsXHJcbiAgICBjYXJ0OiBsb2NhbF9jYXJ0LFxyXG4gICAgdGVuZGVyZWQ6IHRlbmRlcmVkLFxyXG4gICAgcGF5bWVudF9tb2RlOiBwYXltZW50X3R5cGUsXHJcbiAgICBwYXltZW50X3RpdGxlOiBjaG9zZW5QYXltZW50TWV0aG9kLFxyXG4gICAgY2FzaFBheTogY2FzaFBheSxcclxuICAgIGNhcmRQYXk6IGNhcmRQYXlcclxuICB9O1xyXG5cclxuICB2YXIgb25saW5lID0gbmF2aWdhdG9yLm9uTGluZTtcclxuXHJcbiAgY3VzdG9tZXJPcmRlck9iamVjdCA9IGFwcGx5RmlsdGVycyhBRERfQ1VTVE9NX09SREVSX0RFVEFJTFMsIGN1c3RvbWVyT3JkZXJPYmplY3QsIGN1c3RvbWVyLCBjYXJ0X29iaiwgc3RhdGVfZGF0YSlcclxuXHJcbiAgbGV0IHBvc3REYXRhID0ge1xyXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY3VzdG9tZXJPcmRlck9iamVjdClcclxuICB9O1xyXG5cclxuICBpZiAoYXBpZl9zY3JpcHQub3JkZXJfcHJvY2Vzc190eXBlID09ICdvbmxpbmUnICYmIG9ubGluZSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGluZy10ZXh0JykuaW5uZXJIVE1MID0gdHJhbnNsYXRpb24ucHJvY2Vzc2luZ19vcmRlcl90ZXh0O1xyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgUE9TUG9zdFJlcXVlc3Qod2t3Y3Bvc192YXJpYWJsZS5XS19DUkVBVEVfT1JERVJfRU5EUE9JTlQsIHBvc3REYXRhKS50aGVuKChvcmRlcl9kYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBpZiAob3JkZXJfZGF0YSkge1xyXG5cclxuICAgICAgICAgIGRvQWN0aW9uKEFGVEVSX0NSRUFUSU5HX09SREVSX0FDVElPTiwgb3JkZXJfZGF0YSwgZGF0YWJhc2UpO1xyXG5cclxuICAgICAgICAgIGxldCBib29sID0gc2F2ZU9yZGVyVG9JbmRleERCKG9yZGVyX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGlmIChib29sKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmluYWxfcmVzID0gY2xlYXJJbmRleERCKG9yZGVyX2RhdGEsIGN1cnJlbnRfc3RhdGUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaW5hbF9yZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGFwcGx5RmlsdGVycyhQUklOVF9JTlZPSUNFX1NLSVBfUE9QVVBfQUZURVJfUEFZLCB0cnVlLCBvcmRlcl9kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi5zdWNjZXNzX3RleHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi50ZXh0X29yZGVyX3N1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICBidXR0b25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByaW50aW52b2ljZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uLnByaW50SW52b2ljZV90ZXh0LCAvLyB0ZXh0IGZvciBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ3Bvcy1idG4tcHJpbWFyeScsIC8vIGNsYXNzIGZvciB0aGUgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9yZGVyX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF9fKCdTa2lwJywgJ3djX3BvcycpLCAvLyB0ZXh0IGZvciBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ2J0bi1kZWZhdWx0JywgLy8gY2xhc3MgZm9yIHRoZSBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnc2tpcCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvcmRlcl9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgdmFyIG9yZGVyID0ge307XHJcblxyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGxldCB0cl9pZCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiA5OTk5OTk5OTkpICsgMTAwMDAwMDAwKTtcclxuXHJcbiAgICB0cl9pZCA9ICcjJyArIHRyX2lkO1xyXG5cclxuICAgIG9yZGVyWydpZCddID0gdHJfaWQ7XHJcbiAgICBvcmRlclsnb3JkZXJfaWQnXSA9IHRyX2lkO1xyXG4gICAgb3JkZXJbJ2NhcnRfc3VidG90YWwnXSA9IHN1Yl90b3RhbDtcclxuICAgIG9yZGVyWydjb3Vwb25zJ10gPSBwb3NfY291cG9uO1xyXG4gICAgb3JkZXJbJ29yZGVyX2RhdGUnXSA9IGQ7XHJcbiAgICBvcmRlclsnZGlzY291bnQnXSA9IHBvc19kaXNjb3VudDtcclxuICAgIG9yZGVyWydjdXJyZW5jeSddID0gY3VycmVuY3lbMF07XHJcbiAgICBvcmRlclsnb3JkZXJfdG90YWwnXSA9IHRvdGFsO1xyXG4gICAgb3JkZXJbJ29yZGVyX2h0bWwnXSA9IHRvdGFsO1xyXG4gICAgb3JkZXJbJ29yZGVyX25vdGUnXSA9IG9yZGVyX25vdGU7XHJcbiAgICBvcmRlclsncHJvZHVjdHMnXSA9IHBvc19jYXJ0O1xyXG4gICAgb3JkZXJbJ3BheW1lbnRfbW9kZSddID0gcGF5bWVudF90eXBlO1xyXG4gICAgb3JkZXJbJ3BheW1lbnRfdGl0bGUnXSA9IGNob3NlblBheW1lbnRNZXRob2Q7XHJcbiAgICBvcmRlclsnY2FzaFBheSddID0gY2FzaFBheVxyXG4gICAgb3JkZXJbJ2NhcmRQYXknXSA9IGNhcmRQYXlcclxuICAgIG9yZGVyWydjYXNoUGF5X2h0bWwnXSA9IGNhc2hQYXlcclxuICAgIG9yZGVyWydjYXJkUGF5X2h0bWwnXSA9IGNhcmRQYXlcclxuXHJcbiAgICBvcmRlclsndGVuZGVyZWQnXSA9IHRlbmRlcmVkO1xyXG4gICAgb3JkZXJbJ29yZGVyX3R5cGUnXSA9ICdvZmZsaW5lJztcclxuXHJcbiAgICBvcmRlclsnZW1haWwnXSA9IGN1c3RvbWVyX2lkO1xyXG4gICAgb3JkZXJbJ2JhbGFuY2UnXSA9ICcnO1xyXG4gICAgb3JkZXJbJ2JpbGxpbmcnXSA9IGN1c3RvbWVyWzBdLmJpbGxpbmc7XHJcbiAgICBvcmRlclsndGF4X2xpbmVzJ10gPSB0YXg7XHJcblxyXG4gICAgb3JkZXIgPSBhcHBseUZpbHRlcnMoQUREX0NVU1RPTV9PUkRFUl9ERVRBSUxTLCBvcmRlciwgY3VzdG9tZXIsIGNhcnRfb2JqLCBzdGF0ZV9kYXRhKVxyXG5cclxuICAgIGxldCBvc3VjY2VzcyA9IHNhdmVPcmRlclRvSW5kZXhEQihvcmRlcik7XHJcblxyXG4gICAgaWYgKG9zdWNjZXNzKSB7XHJcblxyXG4gICAgICBsZXQgZmluYWxfcmVzID0gY2xlYXJJbmRleERCKG9yZGVyLCBjdXJyZW50X3N0YXRlLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmIChmaW5hbF9yZXMpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAoYXBwbHlGaWx0ZXJzKFBSSU5UX0lOVk9JQ0VfU0tJUF9QT1BVUF9BRlRFUl9QQVksIHRydWUsIG9yZGVyKSkge1xyXG5cclxuICAgICAgICAgICAgalF1ZXJ5LmNvbmZpcm0oe1xyXG5cclxuICAgICAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uc3VjY2Vzc190ZXh0LFxyXG5cclxuICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi50ZXh0X29yZGVyX3N1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmludGludm9pY2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uLnByaW50SW52b2ljZV90ZXh0LCAvLyB0ZXh0IGZvciBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiAncG9zLWJ0bi1wcmltYXJ5JywgLy8gY2xhc3MgZm9yIHRoZSBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9yZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHNraXA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF9fKCdTa2lwJywgJ3djX3BvcycpLCAvLyB0ZXh0IGZvciBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiAncG9zLWJ0bi1wcmltYXJ5JywgLy8gY2xhc3MgZm9yIHRoZSBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBvcmRlcixcclxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdza2lwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKG9yZGVyKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZU9yZGVyVG9JbmRleERCKGRhdGEpIHtcclxuXHJcbiAgbGV0IG5ld19vcmRlciA9IGRhdGE7XHJcblxyXG4gIGlmIChkYXRhKSB7XHJcblxyXG4gICAgZGF0YWJhc2UudGFibGUoXCJwb3Nfb3JkZXJzXCIpLnB1dChuZXdfb3JkZXIpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJJbmRleERCKG9yZGVyX2RhdGEsIGN1cnJlbnRfc3RhdGUsIG9mZmxpbmUgPSAnJykge1xyXG5cclxuICBpZiAoYXBwbHlGaWx0ZXJzKENMRUFSX0lOREVYREJfU0tJUF9BRlRFUl9QQVksIGZhbHNlLCBvcmRlcl9kYXRhLCBjdXJyZW50X3N0YXRlKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHZhciBwcm9kdWN0cyA9IG9yZGVyX2RhdGEucHJvZHVjdHM7XHJcbiAgdmFyIHByb2R1Y3RfdGl0bGVfYXJyID0gW107XHJcblxyXG4gIGlmIChwcm9kdWN0cykge1xyXG5cclxuICAgIGlmIChvZmZsaW5lKSB7XHJcblxyXG4gICAgICBqUXVlcnkuZWFjaChwcm9kdWN0cywgKGksIHZhbCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAodmFsLm9wdGlvbnMgIT09IFwiZmFsc2VcIikge1xyXG5cclxuICAgICAgICAgIHByb2R1Y3RfdGl0bGVfYXJyLnB1c2goeyBuYW1lOiB2YWwucHJvZHVjdF9pZCwgcXR5OiB2YWwucXVhbnRpdHksIHZhcl9pZDogdmFsLm9wdGlvbnMudmFyX2lkIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgcHJvZHVjdF90aXRsZV9hcnIucHVzaCh7IG5hbWU6IHZhbC5wcm9kdWN0X2lkLCBxdHk6IHZhbC5xdWFudGl0eSwgdmFyX2lkOiAwIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGpRdWVyeS5lYWNoKHByb2R1Y3RzLCAoaSwgdmFsKSA9PiB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RfdGl0bGVfYXJyLnB1c2goeyBuYW1lOiB2YWwucHJvZHVjdF9pZCwgcXR5OiB2YWwucXR5LCB2YXJfaWQ6IHZhbC52YXJpYWJsZV9pZCB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGFiYXNlLnBvc19jYXJ0LndoZXJlKFwiY2FydF9pZFwiKS5lcXVhbHMoY3VycmVudF9zdGF0ZSkuZGVsZXRlKCkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgaWYgKHByb2R1Y3RfdGl0bGVfYXJyLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmVhY2gocHJvZHVjdF90aXRsZV9hcnIsIChpLCBUcHJvZHVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgIGlmIChUcHJvZHVjdC52YXJfaWQgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgZGF0YWJhc2UucG9zX3Byb2R1Y3RzLndoZXJlKFwicHJvZHVjdF9pZFwiKS5lcXVhbHMoVHByb2R1Y3QubmFtZSkubW9kaWZ5KChwcm9kdWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgIHByb2R1Y3Quc3RvY2sgPSBwcm9kdWN0LnN0b2NrIC0gVHByb2R1Y3QucXR5O1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiByZXM7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGFiYXNlLnBvc19wcm9kdWN0cy53aGVyZShcInByb2R1Y3RfaWRcIikuZXF1YWxzKFRwcm9kdWN0Lm5hbWUpLm1vZGlmeSgocHJvZHVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICBwcm9kdWN0LnZhcmlhdGlvbnMudmFyaWF0aW9uID0gcHJvZHVjdC52YXJpYXRpb25zLnZhcmlhdGlvbi5tYXAoKHZhbCwga2V5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC52YXJfaWQgPT0gVHByb2R1Y3QudmFyX2lkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YWwuc3RvY2sgPSB2YWwuc3RvY2sgLSBUcHJvZHVjdC5xdHk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxcclxuXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRhdGFiYXNlLnBvc19jb3Vwb24ud2hlcmUoXCJjYXJ0X2lkXCIpLmVxdWFscyhjdXJyZW50X3N0YXRlKS5kZWxldGUoKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGF0YWJhc2UucG9zX2Rpc2NvdW50LndoZXJlKFwiY2FydF9pZFwiKS5lcXVhbHMoY3VycmVudF9zdGF0ZSkuZGVsZXRlKCkudGhlbigocmVzKSA9PiB7XHJcblxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaGVkT3JkZXIgPSAoc2VhcmNoLCBmYWtlb3JkZXJzKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgaWYgKHNlYXJjaCkge1xyXG5cclxuICAgICAgbGV0IG9yZGVyRGF0YSA9IGZha2VvcmRlcnMuZmlsdGVyKChvcmRlcikgPT4ge1xyXG5cclxuICAgICAgIGlmIChvcmRlci5vcmRlcl9pZC50b1N0cmluZygpLmluZGV4T2Yoc2VhcmNoKSAhPSAtMSB8fCAoKG9yZGVyLm9mZmxpbmVfaWQpICYmIG9yZGVyLm9mZmxpbmVfaWQuaW5kZXhPZihzZWFyY2gpICE9IC0xKSB8fCBvcmRlci5iaWxsaW5nLmZuYW1lLmluZGV4T2Yoc2VhcmNoKSAhPSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3JkZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgb3JkZXJPYmogPSB7XHJcbiAgICAgIGxpc3Q6IGZha2VvcmRlcnMsXHJcbiAgICAgIGlzRmV0Y2hpbmc6IDEsXHJcbiAgICAgIHM6IHNlYXJjaCxcclxuICAgICAgc29yZGVyOiBvcmRlckRhdGFcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaChzZXRPcmRlcihvcmRlck9iaikpO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGxldCBvcmRlck9iaiA9IHtcclxuICAgICAgbGlzdDogZmFrZW9yZGVycyxcclxuICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgczogJycsXHJcbiAgICAgIHNvcmRlcjogZmFrZW9yZGVyc1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKHNldE9yZGVyKG9yZGVyT2JqKSk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==