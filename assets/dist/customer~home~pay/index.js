(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer~home~pay"],{

/***/ "./src/js/actions/coupon/index.js":
/*!****************************************!*\
  !*** ./src/js/actions/coupon/index.js ***!
  \****************************************/
/*! exports provided: POS_COUPON, setCoupon, getAllCouponWC, ApplyCoupon, RemoveCoupon, ApplyCustomerCoupon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_COUPON", function() { return POS_COUPON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCoupon", function() { return setCoupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCouponWC", function() { return getAllCouponWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplyCoupon", function() { return ApplyCoupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveCoupon", function() { return RemoveCoupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplyCustomerCoupon", function() { return ApplyCustomerCoupon; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cart */ "./src/js/actions/cart/index.js");



var POS_COUPON = 'POS_COUPON';
var setCoupon = function setCoupon(coupon) {
  return {
    type: POS_COUPON,
    coupon: coupon
  };
};
var getAllCouponWC = function getAllCouponWC() {
  return function (dispatch) {
    LoadCouponsIndexDB().then(function (result) {
      if (result.length > 0) {
        var coupon = {
          list: result,
          isFetching: 1
        };
      } else {
        var coupon = {
          list: '',
          isFetching: 1
        };
      }

      dispatch(setCoupon(coupon));
    });
  };
};

function LoadCouponsIndexDB() {
  return new Promise(function (resolve, reject) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').toArray().then(function (coData) {
      resolve(coData);
    });
  });
}

var ApplyCoupon = function ApplyCoupon(coupon) {
  return function (dispatch, getState) {
    var current_cart = getState().current_cart;
    LoadCouponsIndexDB().then(function (res) {
      if (res.length > 0) {
        var checkCouponAlreadyApplied = res[0].coupon.filter(function (obj) {
          return coupon.code == obj.code;
        });

        if (checkCouponAlreadyApplied.length == 0) {
          res[0].coupon.push(coupon);
          return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').where("cart_id").equals(current_cart).modify({
            coupon: res[0].coupon
          }).then(function (coData) {
            if (coData) {
              var coup = {
                list: res,
                isFetching: 1
              };
              jQuery.confirm({
                title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].success_text,
                content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].coupon_applied_text,
                autoClose: 'cancelAction|3000',
                type: 'green',
                escapeKey: 'cancelAction',
                buttons: {
                  cancelAction: {
                    text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].cancel_btn_text,
                    btnClass: 'btn-green'
                  }
                }
              });
              dispatch(setCoupon(coup));
              dispatch(Object(_cart__WEBPACK_IMPORTED_MODULE_2__["getAllCartProducts"])());
            }
          });
        } else {
          jQuery.confirm({
            title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].err_text,
            content: 'This coupon is already applied',
            autoClose: 'cancelAction|3000',
            type: 'red',
            escapeKey: 'cancelAction',
            buttons: {
              cancelAction: {
                text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].cancel_btn_text,
                btnClass: 'pos-btn-primary'
              }
            }
          });
        }
      } else {
        var letDbData = {
          id: current_cart,
          cart_id: current_cart,
          coupon: [coupon]
        };
        return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').put(letDbData).then(function (coData) {
          var coup = {
            list: [letDbData],
            isFetching: 1
          };
          jQuery.confirm({
            title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].success_text,
            content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].coupon_applied_text,
            autoClose: 'cancelAction|3000',
            type: 'green',
            escapeKey: 'cancelAction',
            buttons: {
              cancelAction: {
                text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].cancel_btn_text,
                btnClass: 'btn-green'
              }
            }
          });
          dispatch(setCoupon(coup));
          dispatch(Object(_cart__WEBPACK_IMPORTED_MODULE_2__["getAllCartProducts"])());
        });
      }
    });
  };
};
var RemoveCoupon = function RemoveCoupon(current_cart, couponcode) {
  return function (dispatch) {
    LoadCouponsIndexDB().then(function (res) {
      if (res.length > 0) {
        var latest_coupon = res[0].coupon.filter(function (coup) {
          return coup.code != couponcode;
        });
        return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').where("cart_id").equals(current_cart).modify({
          coupon: latest_coupon
        }).then(function (coData) {
          if (coData) {
            res[0].coupon = latest_coupon;
            var coup = {
              list: res,
              isFetching: 1
            };
            dispatch(setCoupon(coup));
            dispatch(Object(_cart__WEBPACK_IMPORTED_MODULE_2__["getAllCartProducts"])());
          }
        });
      }
    });
  };
};
var ApplyCustomerCoupon = function ApplyCustomerCoupon(coupon) {
  return function (dispatch, getState) {
    return new Promise(function (resolve, reject) {
      var current_cart = getState().current_cart;
      var result = LoadCouponsIndexDB().then(function (res) {
        if (!coupon) {
          return false;
        }

        if (res.length > 0) {
          var checkCouponAlreadyApplied = res[0].coupon.filter(function (obj) {
            return coupon.code == obj.code;
          });

          if (checkCouponAlreadyApplied.length == 0) {
            res[0].coupon.push(coupon);
            return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').where("cart_id").equals(current_cart).modify({
              coupon: res[0].coupon
            }).then(function (coData) {
              if (coData) {
                var coup = {
                  list: res,
                  isFetching: 1
                };
                dispatch(setCoupon(coup));
                dispatch(Object(_cart__WEBPACK_IMPORTED_MODULE_2__["getAllCartProducts"])());
              }
            });
          }
        } else {
          var letDbData = {
            id: current_cart,
            cart_id: current_cart,
            coupon: [coupon]
          };
          return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_coupon').put(letDbData).then(function (coData) {
            var coup = {
              list: [letDbData],
              isFetching: 1
            };
            dispatch(setCoupon(coup));
            dispatch(Object(_cart__WEBPACK_IMPORTED_MODULE_2__["getAllCartProducts"])());
          });
        }

        return false;
      });
      resolve(result);
    });
  };
};

/***/ }),

/***/ "./src/js/actions/customers/index.js":
/*!*******************************************!*\
  !*** ./src/js/actions/customers/index.js ***!
  \*******************************************/
/*! exports provided: CUSTOMER_OBJ_AFTER_SEARCH, POS_CUSTOMERS, setCustomer, getAllCustomersWC, loadSearchCustomers, updateDefaultCustomer, DeleteCustomer, SaveCustomer, loadAllCustomers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOMER_OBJ_AFTER_SEARCH", function() { return CUSTOMER_OBJ_AFTER_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_CUSTOMERS", function() { return POS_CUSTOMERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomer", function() { return setCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCustomersWC", function() { return getAllCustomersWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSearchCustomers", function() { return loadSearchCustomers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDefaultCustomer", function() { return updateDefaultCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteCustomer", function() { return DeleteCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveCustomer", function() { return SaveCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllCustomers", function() { return loadAllCustomers; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);





var CUSTOMER_OBJ_AFTER_SEARCH = 'wkwcpos_customer_obj_after_search';
var POS_CUSTOMERS = 'POS_CUSTOMERS';
var setCustomer = function setCustomer(customers) {
  return {
    type: POS_CUSTOMERS,
    customers: customers
  };
};
var getAllCustomersWC = function getAllCustomersWC() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      isCustomerDataExists().then(function (result) {
        if (result.length <= 0) {
          AjAxGetAllCustomerWC(dispatch).then(function (response) {
            if (response) {
              isCustomerDataExists().then(function (result) {
                var def_cus = [];

                if (result) {
                  result.forEach(function (cust, index) {
                    if (cust.is_true == '1') {
                      def_cus.push(cust);
                    }
                  });
                }

                var custObj = {
                  list: result,
                  isFetching: 1,
                  default: def_cus,
                  s: '',
                  scustomer: result
                };
                dispatch(setCustomer(custObj));
              });
            }
          });
        } else {
          var def_cus = [];

          if (result) {
            result.forEach(function (cust, index) {
              if (cust.is_true == '1') {
                def_cus.push(cust);
              }
            });
          }

          var custObj = {
            list: result,
            isFetching: 1,
            default: def_cus,
            s: '',
            scustomer: result
          };
          dispatch(setCustomer(custObj));
        }
      });
    }
  };
};
var loadSearchCustomers = function loadSearchCustomers(search, fakecustomers, fakedefault) {
  return function (dispatch) {
    if (search) {
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').where("first_name").startsWithIgnoreCase(search).or('email').startsWithIgnoreCase(search).toArray().then(function (customerData) {
        var customerObj = {
          list: fakecustomers,
          isFetching: 1,
          default: fakedefault,
          s: search,
          scustomer: customerData
        };
        customerObj = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__["applyFilters"])(CUSTOMER_OBJ_AFTER_SEARCH, customerObj, search, fakecustomers, fakedefault);
        dispatch(setCustomer(customerObj));
      });
    } else {
      var customerObj = {
        list: fakecustomers,
        isFetching: 1,
        default: fakedefault,
        s: '',
        scustomer: fakecustomers
      };
      dispatch(setCustomer(customerObj));
    }
  };
};
var updateDefaultCustomer = function updateDefaultCustomer(customer, fakecustomers) {
  return function (dispatch) {
    if (customer) {
      var customerObj = {
        list: fakecustomers,
        isFetching: 1,
        default: customer,
        s: '',
        scustomer: fakecustomers
      };
      fakecustomers.forEach(function (obj) {
        obj.is_true = false;
      });
      customer[0].is_true = true;
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').toCollection().modify(function (obj) {
        obj.is_true = false;
      });
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').update(customer[0].id, {
        is_true: true
      }).then(function (updated) {
        if (updated) dispatch(setCustomer(customerObj));
      });
    }
  };
};
var DeleteCustomer = function DeleteCustomer(customer_id) {
  return function (dispatch) {
    if (customer_id) {
      return DeleteCustomerViaAJAX(customer_id).then(function (response) {
        if (response) {
          _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').where("id").equals(parseInt(response)).delete().then(function (res) {
            if (res) {
              isCustomerDataExists().then(function (result) {
                var def_cus = [];

                if (result) {
                  result.forEach(function (cust, index) {
                    if (cust.is_true == '1') {
                      def_cus.push(cust);
                    }
                  });
                }

                var custObj = {
                  list: result,
                  isFetching: 1,
                  default: def_cus,
                  s: '',
                  scustomer: result
                };
                dispatch(setCustomer(custObj));
              });
            }
          });
        }
      });
    }
  };
};

function DeleteCustomerViaAJAX(customer_id) {
  var postData = {
    'customer': customer_id
  };
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].deleting_customer_title_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_DELETE_CUSTOMER_ENDPOINT, postData).then(function (response) {
      document.querySelector('#loader').style.display = 'none';

      if (response && response == customer_id) {
        resolve(response);
      }
    });
  });
}

var SaveCustomer = function SaveCustomer(customer, pos_customer_id) {
  return function (dispatch) {
    if (customer) {
      return CreateCustomerViaAJAX(customer, pos_customer_id).then(function (resposnse) {
        if (resposnse) {
          return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').put(resposnse).then(function (res) {
            if (res) {
              return res;
            }
          });
        }
      });
    }
  };
};

function CreateCustomerViaAJAX(customer, pos_customer_id) {
  var postData = {
    pos: customer
  };
  return new Promise(function (resolve, reject) {
    if (pos_customer_id) {
      document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].update_existing_customer_text;
    } else {
      document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].create_new_customer_text;
    }

    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_CREATE_CUSTOMER_ENDPOINT, postData).then(function (response) {
      document.querySelector('#loader').style.display = 'none';

      if (response) {
        if (response['error']) {
          jQuery.confirm({
            title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].err_text,
            content: response['msg'],
            autoClose: 'cancelAction|3000',
            type: 'red',
            escapeKey: 'cancelAction',
            buttons: {
              cancelAction: {
                text: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].cancel_btn_text,
                btnClass: 'pos-btn-primary'
              }
            }
          });
        } else if (response['success']) {
          resolve(response['data']);
        }
      }
    });
  });
}

var loadAllCustomers = function loadAllCustomers() {
  return function (dispatch) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').toArray().then(function (customerData) {
      var def_customer = [];

      if (customerData) {
        customerData.forEach(function (customer, index) {
          if (customer.is_true == '1') {
            def_customer.push(customer);
          }
        });
      }

      var customerObj = {
        list: customerData,
        isFetching: 1,
        default: def_customer,
        s: '',
        scustomer: customerData
      };
      dispatch(setCustomer(customerObj));
    });
  };
};

function AjAxGetAllCustomerWC(dispatch) {
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
      document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].text_loading_customers;
      document.querySelector('#loader').style.display = 'block';
    }

    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_CUSTOMERS_ENDPOINT, postData).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json != undefined) {
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').bulkPut(json).then(function (rsult) {
          isCustomerDataExists().then(function (result) {
            var def_cus = [];

            if (result) {
              result.forEach(function (cust, index) {
                if (cust.is_true == '1') {
                  def_cus.push(cust);
                }
              });
            }

            var custObj = {
              list: result,
              isFetching: 1,
              default: def_cus,
              s: '',
              scustomer: result
            };
            dispatch(setCustomer(custObj));
          });

          if (json.length >= 500) {
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

function isCustomerDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_customers').toArray().then(function (custData) {
    return custData;
  });
}

/***/ }),

/***/ "./src/js/actions/invoice/index.js":
/*!*****************************************!*\
  !*** ./src/js/actions/invoice/index.js ***!
  \*****************************************/
/*! exports provided: POS_INVOICE, setInvoice, getInvoiceTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_INVOICE", function() { return POS_INVOICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInvoice", function() { return setInvoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvoiceTemplate", function() { return getInvoiceTemplate; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");




var POS_INVOICE = 'POS_INVOICE';
var setInvoice = function setInvoice(invoice) {
  return {
    type: POS_INVOICE,
    invoice: invoice
  };
};
var getInvoiceTemplate = function getInvoiceTemplate() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      isInvoiceDataExists().then(function (result) {
        if (result.length <= 0) {
          AjAxGetInvoiceWC().then(function (response) {
            if (response) {
              dispatch(setInvoice(response));
            }
          });
        } else {
          dispatch(setInvoice(result[0].invoice_html));
        }
      });
    }
  };
};

function AjAxGetInvoiceWC() {
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_tax_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_INVOICE_TEMPLATE_ENDPOINT, {}).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        var invoiceObj = {
          id: 1,
          invoice_html: json
        };
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_invoice.put(invoiceObj).then(function (res) {
          resolve(json);
        });
      }
    });
  });
}

function isInvoiceDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_invoice').toArray().then(function (invoiceData) {
    return invoiceData;
  });
}

/***/ }),

/***/ "./src/js/currency-format.js":
/*!***********************************!*\
  !*** ./src/js/currency-format.js ***!
  \***********************************/
/*! exports provided: wkwcpos_price */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wkwcpos_price", function() { return wkwcpos_price; });
// The library's settings configuration object. Contains default parameters for
// currency and number formatting
var settings = {
  currency: {
    symbol: "$",
    // default currency symbol is '$'
    format: "%s%v",
    // controls output: %s = symbol, %v = value (can be object, see docs)
    decimal: ".",
    // decimal point separator
    thousand: ",",
    // thousands separator
    precision: 2,
    // decimal places
    grouping: 3 // digit grouping (not implemented yet)

  },
  number: {
    precision: 0,
    // default precision on numbers is 0
    grouping: 3,
    // digit grouping (not implemented yet)
    thousand: ",",
    decimal: "."
  }
}; // Store reference to possibly-available ECMAScript 5 methods for later

var nativeMap = Array.prototype.map,
    nativeIsArray = Array.isArray,
    toString = Object.prototype.toString;
/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */

function formatMoney(number, symbol, precision, thousand, decimal, format) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, function (val) {
      return formatMoney(val, symbol, precision, thousand, decimal, format);
    });
  } // Clean up number:


  number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

  var opts = defaults(isObject(symbol) ? symbol : {
    symbol: symbol,
    precision: precision,
    thousand: thousand,
    decimal: decimal,
    format: format
  }, settings.currency),
      // Check format (returns object with pos, neg and zero):
  formats = checkCurrencyFormat(opts.format),
      // Choose which format to use for this value:
  useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero; // Return with currency symbol added:

  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
}

;
/**
 * Tests whether supplied parameter is a string
 * from underscore.js, delegates to ECMA5's native Array.isArray
 */

function isArray(obj) {
  return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
}
/**
 * Check and normalise the value of precision (must be positive integer)
 */


function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}
/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */


var toFixed = function toFixed(value, precision) {
  precision = checkPrecision(precision, settings.number.precision);
  var power = Math.pow(10, precision); // Multiply up by precision, round accurately, then divide and use native toFixed():

  return (Math.round(unformat(value) * power) / power).toFixed(precision);
};
/**
 * Tests whether supplied parameter is a string
 * from underscore.js
 */


function isString(obj) {
  return !!(obj === '' || obj && obj.charCodeAt && obj.substr);
}
/**
 * Tests whether supplied parameter is a true object
 */


function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}
/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */


function defaults(object, defs) {
  var key;
  object = object || {};
  defs = defs || {}; // Iterate over object non-prototype properties:

  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] == null) object[key] = defs[key];
    }
  }

  return object;
}
/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 */


var formatNumber = function formatNumber(number, precision, thousand, decimal) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, function (val) {
      return formatNumber(val, precision, thousand, decimal);
    });
  } // Clean up number:


  number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

  var opts = defaults(isObject(precision) ? precision : {
    precision: precision,
    thousand: thousand,
    decimal: decimal
  }, settings.number),
      // Clean up precision
  usePrecision = checkPrecision(opts.precision),
      // Do some calc:
  negative = number < 0 ? "-" : "",
      base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
      mod = base.length > 3 ? base.length % 3 : 0; // Format the number:

  return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
};
/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.number.decimal), so if the number uses a non-standard decimal
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
 *
 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
 */


var unformat = function unformat(value, decimal) {
  // Recursively unformat arrays:
  if (isArray(value)) {
    return map(value, function (val) {
      return unformat(val, decimal);
    });
  } // Fails silently (need decent errors):


  value = value || 0; // Return the value as-is if it's already a number:

  if (typeof value === "number") return value; // Default decimal point comes from settings, but could be set to eg. "," in opts:

  decimal = decimal || settings.number.decimal; // Build regex to strip out everything except digits, decimal point and minus sign:

  var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
      unformatted = parseFloat(("" + value).replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
  .replace(regex, '') // strip out any cruft
  .replace(decimal, '.') // make sure decimal point is standard
  ); // This will fail silently which may cause trouble, let's wait and see:

  return !isNaN(unformatted) ? unformatted : 0;
};
/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */


function checkCurrencyFormat(format) {
  var defaults = settings.currency.format; // Allow function as format parameter (should return string or object):

  if (typeof format === "function") format = format(); // Format can be a string, in which case `value` ("%v") must be present:

  if (isString(format) && format.match("%v")) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace("-", "").replace("%v", "-%v"),
      zero: format
    }; // If no format, or object is missing valid positive value, use defaults:
  } else if (!format || !format.pos || !format.pos.match("%v")) {
    // If defaults is a string, casts it to an object for faster checking next time:
    return !isString(defaults) ? defaults : settings.currency.format = {
      pos: defaults,
      neg: defaults.replace("%v", "-%v"),
      zero: defaults
    };
  } // Otherwise, assume format was fine:


  return format;
}

var wkwcpos_price = function wkwcpos_price(price) {
  var currencySymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return formatMoney(price, {
    symbol: currencySymbol ? currencySymbol : apif_script.currency_format_symbol,
    decimal: apif_script.currency_format_decimal_sep,
    thousand: apif_script.currency_format_thousand_sep,
    precision: apif_script.currency_format_num_decimals,
    format: apif_script.currency_format
  });
};

/***/ }),

/***/ 2:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9jb3Vwb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vc3JjL2pzL2FjdGlvbnMvY3VzdG9tZXJzL2luZGV4LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9hY3Rpb25zL2ludm9pY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vc3JjL2pzL2N1cnJlbmN5LWZvcm1hdC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vcmVhZGFibGUtc3RyZWFtIChpZ25vcmVkKSJdLCJuYW1lcyI6WyJQT1NfQ09VUE9OIiwic2V0Q291cG9uIiwiY291cG9uIiwidHlwZSIsImdldEFsbENvdXBvbldDIiwiZGlzcGF0Y2giLCJMb2FkQ291cG9uc0luZGV4REIiLCJ0aGVuIiwicmVzdWx0IiwibGVuZ3RoIiwibGlzdCIsImlzRmV0Y2hpbmciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGFiYXNlIiwidGFibGUiLCJ0b0FycmF5IiwiY29EYXRhIiwiQXBwbHlDb3Vwb24iLCJnZXRTdGF0ZSIsImN1cnJlbnRfY2FydCIsInJlcyIsImNoZWNrQ291cG9uQWxyZWFkeUFwcGxpZWQiLCJmaWx0ZXIiLCJvYmoiLCJjb2RlIiwicHVzaCIsIndoZXJlIiwiZXF1YWxzIiwibW9kaWZ5IiwiY291cCIsImpRdWVyeSIsImNvbmZpcm0iLCJ0aXRsZSIsInRyYW5zbGF0aW9uIiwic3VjY2Vzc190ZXh0IiwiY29udGVudCIsImNvdXBvbl9hcHBsaWVkX3RleHQiLCJhdXRvQ2xvc2UiLCJlc2NhcGVLZXkiLCJidXR0b25zIiwiY2FuY2VsQWN0aW9uIiwidGV4dCIsImNhbmNlbF9idG5fdGV4dCIsImJ0bkNsYXNzIiwiZ2V0QWxsQ2FydFByb2R1Y3RzIiwiZXJyX3RleHQiLCJsZXREYkRhdGEiLCJpZCIsImNhcnRfaWQiLCJwdXQiLCJSZW1vdmVDb3Vwb24iLCJjb3Vwb25jb2RlIiwibGF0ZXN0X2NvdXBvbiIsIkFwcGx5Q3VzdG9tZXJDb3Vwb24iLCJDVVNUT01FUl9PQkpfQUZURVJfU0VBUkNIIiwiUE9TX0NVU1RPTUVSUyIsInNldEN1c3RvbWVyIiwiY3VzdG9tZXJzIiwiZ2V0QWxsQ3VzdG9tZXJzV0MiLCJ1c2VyIiwiYXBpZl9zY3JpcHQiLCJsb2dnZWRfaW4iLCJpc0N1c3RvbWVyRGF0YUV4aXN0cyIsIkFqQXhHZXRBbGxDdXN0b21lcldDIiwicmVzcG9uc2UiLCJkZWZfY3VzIiwiZm9yRWFjaCIsImN1c3QiLCJpbmRleCIsImlzX3RydWUiLCJjdXN0T2JqIiwiZGVmYXVsdCIsInMiLCJzY3VzdG9tZXIiLCJsb2FkU2VhcmNoQ3VzdG9tZXJzIiwic2VhcmNoIiwiZmFrZWN1c3RvbWVycyIsImZha2VkZWZhdWx0Iiwic3RhcnRzV2l0aElnbm9yZUNhc2UiLCJvciIsImN1c3RvbWVyRGF0YSIsImN1c3RvbWVyT2JqIiwiYXBwbHlGaWx0ZXJzIiwidXBkYXRlRGVmYXVsdEN1c3RvbWVyIiwiY3VzdG9tZXIiLCJ0b0NvbGxlY3Rpb24iLCJ1cGRhdGUiLCJ1cGRhdGVkIiwiRGVsZXRlQ3VzdG9tZXIiLCJjdXN0b21lcl9pZCIsIkRlbGV0ZUN1c3RvbWVyVmlhQUpBWCIsInBhcnNlSW50IiwiZGVsZXRlIiwicG9zdERhdGEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJkZWxldGluZ19jdXN0b21lcl90aXRsZV90ZXh0Iiwic3R5bGUiLCJkaXNwbGF5IiwiUE9TUG9zdFJlcXVlc3QiLCJ3a3djcG9zX3ZhcmlhYmxlIiwiV0tfREVMRVRFX0NVU1RPTUVSX0VORFBPSU5UIiwiU2F2ZUN1c3RvbWVyIiwicG9zX2N1c3RvbWVyX2lkIiwiQ3JlYXRlQ3VzdG9tZXJWaWFBSkFYIiwicmVzcG9zbnNlIiwicG9zIiwidXBkYXRlX2V4aXN0aW5nX2N1c3RvbWVyX3RleHQiLCJjcmVhdGVfbmV3X2N1c3RvbWVyX3RleHQiLCJXS19DUkVBVEVfQ1VTVE9NRVJfRU5EUE9JTlQiLCJsb2FkQWxsQ3VzdG9tZXJzIiwiZGVmX2N1c3RvbWVyIiwicmVjdXJzaXZlX2FqYXgiLCJyZWN1cl9yZXMiLCJwYWdlIiwidGV4dF9sb2FkaW5nX2N1c3RvbWVycyIsIldLX0dFVF9DVVNUT01FUlNfRU5EUE9JTlQiLCJqc29uIiwidW5kZWZpbmVkIiwiYnVsa1B1dCIsInJzdWx0IiwiY3VzdERhdGEiLCJQT1NfSU5WT0lDRSIsInNldEludm9pY2UiLCJpbnZvaWNlIiwiZ2V0SW52b2ljZVRlbXBsYXRlIiwiaXNJbnZvaWNlRGF0YUV4aXN0cyIsIkFqQXhHZXRJbnZvaWNlV0MiLCJpbnZvaWNlX2h0bWwiLCJsb2FkaW5nX3RheF90ZXh0IiwiV0tfR0VUX0lOVk9JQ0VfVEVNUExBVEVfRU5EUE9JTlQiLCJpbnZvaWNlT2JqIiwicG9zX2ludm9pY2UiLCJpbnZvaWNlRGF0YSIsInNldHRpbmdzIiwiY3VycmVuY3kiLCJzeW1ib2wiLCJmb3JtYXQiLCJkZWNpbWFsIiwidGhvdXNhbmQiLCJwcmVjaXNpb24iLCJncm91cGluZyIsIm51bWJlciIsIm5hdGl2ZU1hcCIsIkFycmF5IiwicHJvdG90eXBlIiwibWFwIiwibmF0aXZlSXNBcnJheSIsImlzQXJyYXkiLCJ0b1N0cmluZyIsIk9iamVjdCIsImZvcm1hdE1vbmV5IiwidmFsIiwidW5mb3JtYXQiLCJvcHRzIiwiZGVmYXVsdHMiLCJpc09iamVjdCIsImZvcm1hdHMiLCJjaGVja0N1cnJlbmN5Rm9ybWF0IiwidXNlRm9ybWF0IiwibmVnIiwiemVybyIsInJlcGxhY2UiLCJmb3JtYXROdW1iZXIiLCJNYXRoIiwiYWJzIiwiY2hlY2tQcmVjaXNpb24iLCJjYWxsIiwiYmFzZSIsInJvdW5kIiwiaXNOYU4iLCJ0b0ZpeGVkIiwidmFsdWUiLCJwb3dlciIsInBvdyIsImlzU3RyaW5nIiwiY2hhckNvZGVBdCIsInN1YnN0ciIsIm9iamVjdCIsImRlZnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInVzZVByZWNpc2lvbiIsIm5lZ2F0aXZlIiwibW9kIiwic3BsaXQiLCJyZWdleCIsIlJlZ0V4cCIsInVuZm9ybWF0dGVkIiwicGFyc2VGbG9hdCIsIm1hdGNoIiwid2t3Y3Bvc19wcmljZSIsInByaWNlIiwiY3VycmVuY3lTeW1ib2wiLCJjdXJyZW5jeV9mb3JtYXRfc3ltYm9sIiwiY3VycmVuY3lfZm9ybWF0X2RlY2ltYWxfc2VwIiwiY3VycmVuY3lfZm9ybWF0X3Rob3VzYW5kX3NlcCIsImN1cnJlbmN5X2Zvcm1hdF9udW1fZGVjaW1hbHMiLCJjdXJyZW5jeV9mb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVPLElBQU1BLFVBQVUsR0FBRyxZQUFuQjtBQUdBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLE1BQUQsRUFBWTtBQUVqQyxTQUFPO0FBQ0hDLFFBQUksRUFBRUgsVUFESDtBQUVIRSxVQUFNLEVBQU5BO0FBRkcsR0FBUDtBQUtILENBUE07QUFTQSxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFFaERDLHNCQUFrQixHQUFHQyxJQUFyQixDQUEwQixVQUFDQyxNQUFELEVBQVk7QUFFcEMsVUFBSUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBRXJCLFlBQUlQLE1BQU0sR0FBRztBQUNYUSxjQUFJLEVBQUVGLE1BREs7QUFFWEcsb0JBQVUsRUFBRTtBQUZELFNBQWI7QUFLRCxPQVBELE1BT087QUFFTCxZQUFJVCxNQUFNLEdBQUc7QUFDWFEsY0FBSSxFQUFFLEVBREs7QUFFWEMsb0JBQVUsRUFBRTtBQUZELFNBQWI7QUFLRDs7QUFFRE4sY0FBUSxDQUFDSixTQUFTLENBQUNDLE1BQUQsQ0FBVixDQUFSO0FBRUQsS0FwQkQ7QUFzQkQsR0F4QjZCO0FBQUEsQ0FBdkI7O0FB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UUFBRixDQUFYLEdBQTRCQSxRQUE1QixHQUF1Q3JCLFFBQVEsQ0FBQ0MsUUFBVCxDQUFrQkUsTUFBbEIsR0FBMkI7QUFDckUvQixTQUFHLEVBQUdpRCxRQUQrRDtBQUVyRUssU0FBRyxFQUFHTCxRQUFRLENBQUNPLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUIsS0FBdkIsQ0FGK0Q7QUFHckVELFVBQUksRUFBR047QUFIOEQsS0FBekU7QUFNSCxHQTFCZ0MsQ0EyQmpDOzs7QUFDQSxTQUFPbEIsTUFBUDtBQUNIOztBQUVNLElBQU1zRCxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUVDLEtBQUYsRUFBa0M7QUFBQSxNQUF6QkMsY0FBeUIsdUVBQVIsRUFBUTtBQUMzRCxTQUFPMUMsV0FBVyxDQUFFeUMsS0FBRixFQUFTO0FBQ3ZCeEQsVUFBTSxFQUFLeUQsY0FBYyxHQUFHQSxjQUFILEdBQW9CdEksV0FBVyxDQUFDdUksc0JBRGxDO0FBRXZCeEQsV0FBTyxFQUFJL0UsV0FBVyxDQUFDd0ksMkJBRkE7QUFHdkJ4RCxZQUFRLEVBQUdoRixXQUFXLENBQUN5SSw0QkFIQTtBQUl2QnhELGFBQVMsRUFBRWpGLFdBQVcsQ0FBQzBJLDRCQUpBO0FBS3ZCNUQsVUFBTSxFQUFLOUUsV0FBVyxDQUFDMkk7QUFMQSxHQUFULENBQWxCO0FBT0gsQ0FSTSxDOzs7Ozs7Ozs7OztBQzlQUCxlIiwiZmlsZSI6Ii4vYXNzZXRzL2Rpc3QvY3VzdG9tZXJ+aG9tZX5wYXkvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi8uLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgeyBnZXRBbGxDYXJ0UHJvZHVjdHMgfSBmcm9tICcuLi9jYXJ0JztcclxuXHJcbmV4cG9ydCBjb25zdCBQT1NfQ09VUE9OID0gJ1BPU19DT1VQT04nO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDb3Vwb24gPSAoY291cG9uKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBQT1NfQ09VUE9OLFxyXG4gICAgICAgIGNvdXBvblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDb3Vwb25XQyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBMb2FkQ291cG9uc0luZGV4REIoKS50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgIHZhciBjb3Vwb24gPSB7XHJcbiAgICAgICAgbGlzdDogcmVzdWx0LFxyXG4gICAgICAgIGlzRmV0Y2hpbmc6IDFcclxuICAgICAgfTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIGNvdXBvbiA9IHtcclxuICAgICAgICBsaXN0OiAnJyxcclxuICAgICAgICBpc0ZldGNoaW5nOiAxXHJcbiAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKHNldENvdXBvbihjb3Vwb24pKTtcclxuXHJcbiAgfSk7XHJcblxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIExvYWRDb3Vwb25zSW5kZXhEQigpIHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBkYXRhYmFzZS50YWJsZSgncG9zX2NvdXBvbicpLnRvQXJyYXkoKS50aGVuKChjb0RhdGEpID0+IHtcclxuICAgICAgXHJcbiAgICAgIHJlc29sdmUoY29EYXRhKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFwcGx5Q291cG9uID0gKGNvdXBvbikgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG5cclxuICBsZXQgY3VycmVudF9jYXJ0ID0gZ2V0U3RhdGUoKS5jdXJyZW50X2NhcnQ7XHJcblxyXG4gIExvYWRDb3Vwb25zSW5kZXhEQigpLnRoZW4oKHJlcykgPT4ge1xyXG4gIFxyXG4gIGlmIChyZXMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgdmFyIGNoZWNrQ291cG9uQWxyZWFkeUFwcGxpZWQgPSByZXNbMF0uY291cG9uLmZpbHRlcihvYmogPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gY291cG9uLmNvZGUgPT0gb2JqLmNvZGU7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChjaGVja0NvdXBvbkFscmVhZHlBcHBsaWVkLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgIHJlc1swXS5jb3Vwb24ucHVzaChjb3Vwb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YWJhc2UudGFibGUoJ3Bvc19jb3Vwb24nKS53aGVyZShcImNhcnRfaWRcIikuZXF1YWxzKGN1cnJlbnRfY2FydCkubW9kaWZ5KHtcclxuICAgICAgICAgIGNvdXBvbjogcmVzWzBdLmNvdXBvblxyXG4gICAgICAgIH0pLnRoZW4oKGNvRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgIGlmIChjb0RhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VwID0ge1xyXG4gICAgICAgICAgICAgIGxpc3Q6IHJlcyxcclxuICAgICAgICAgICAgICBpc0ZldGNoaW5nOiAxXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcclxuICAgICAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uc3VjY2Vzc190ZXh0LFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLmNvdXBvbl9hcHBsaWVkX3RleHQsXHJcbiAgICAgICAgICAgICAgYXV0b0Nsb3NlOiAnY2FuY2VsQWN0aW9ufDMwMDAnLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICdncmVlbicsXHJcbiAgICAgICAgICAgICAgZXNjYXBlS2V5OiAnY2FuY2VsQWN0aW9uJyxcclxuICAgICAgICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb246IHtcclxuICAgICAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb24uY2FuY2VsX2J0bl90ZXh0LFxyXG4gICAgICAgICAgICAgICAgICBidG5DbGFzczogJ2J0bi1ncmVlbicsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldENvdXBvbihjb3VwKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENhcnRQcm9kdWN0cygpKTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBqUXVlcnkuY29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uZXJyX3RleHQsXHJcbiAgICAgICAgICBjb250ZW50OiAnVGhpcyBjb3Vwb24gaXMgYWxyZWFkeSBhcHBsaWVkJyxcclxuICAgICAgICAgIGF1dG9DbG9zZTogJ2NhbmNlbEFjdGlvbnwzMDAwJyxcclxuICAgICAgICAgIHR5cGU6ICdyZWQnLFxyXG4gICAgICAgICAgZXNjYXBlS2V5OiAnY2FuY2VsQWN0aW9uJyxcclxuICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb24uY2FuY2VsX2J0bl90ZXh0LFxyXG4gICAgICAgICAgICAgIGJ0bkNsYXNzOiAncG9zLWJ0bi1wcmltYXJ5JyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBsZXQgbGV0RGJEYXRhID0ge1xyXG4gICAgICAgIGlkOiBjdXJyZW50X2NhcnQsXHJcbiAgICAgICAgY2FydF9pZDogY3VycmVudF9jYXJ0LFxyXG4gICAgICAgIGNvdXBvbjogW2NvdXBvbl1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3NfY291cG9uJykucHV0KGxldERiRGF0YSkudGhlbigoY29EYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBjb3VwID0ge1xyXG4gICAgICAgICAgbGlzdDogW2xldERiRGF0YV0sXHJcbiAgICAgICAgICBpc0ZldGNoaW5nOiAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqUXVlcnkuY29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uc3VjY2Vzc190ZXh0LFxyXG4gICAgICAgICAgY29udGVudDogdHJhbnNsYXRpb24uY291cG9uX2FwcGxpZWRfdGV4dCxcclxuICAgICAgICAgIGF1dG9DbG9zZTogJ2NhbmNlbEFjdGlvbnwzMDAwJyxcclxuICAgICAgICAgIHR5cGU6ICdncmVlbicsXHJcbiAgICAgICAgICBlc2NhcGVLZXk6ICdjYW5jZWxBY3Rpb24nLFxyXG4gICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICBjYW5jZWxBY3Rpb246IHtcclxuICAgICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbi5jYW5jZWxfYnRuX3RleHQsXHJcbiAgICAgICAgICAgICAgYnRuQ2xhc3M6ICdidG4tZ3JlZW4nLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRpc3BhdGNoKHNldENvdXBvbihjb3VwKSk7XHJcbiAgICAgICAgZGlzcGF0Y2goZ2V0QWxsQ2FydFByb2R1Y3RzKCkpO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSZW1vdmVDb3Vwb24gPSAoY3VycmVudF9jYXJ0LCBjb3Vwb25jb2RlKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuICBcclxuICBMb2FkQ291cG9uc0luZGV4REIoKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICBpZiAocmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXHJcbiAgICAgIGxldCBsYXRlc3RfY291cG9uID0gcmVzWzBdLmNvdXBvbi5maWx0ZXIoKGNvdXApID0+IHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY291cC5jb2RlICE9IGNvdXBvbmNvZGU7XHJcbiAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICByZXR1cm4gZGF0YWJhc2UudGFibGUoJ3Bvc19jb3Vwb24nKS53aGVyZShcImNhcnRfaWRcIikuZXF1YWxzKGN1cnJlbnRfY2FydCkubW9kaWZ5KHtcclxuICAgICAgICBjb3Vwb246IGxhdGVzdF9jb3Vwb25cclxuICAgICAgfSkudGhlbigoY29EYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvRGF0YSkge1xyXG4gICAgICAgICAgcmVzWzBdLmNvdXBvbiA9IGxhdGVzdF9jb3Vwb247XHJcblxyXG4gICAgICAgICAgbGV0IGNvdXAgPSB7XHJcbiAgICAgICAgICAgIGxpc3Q6IHJlcyxcclxuICAgICAgICAgICAgaXNGZXRjaGluZzogMVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRpc3BhdGNoKHNldENvdXBvbihjb3VwKSk7XHJcbiAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDYXJ0UHJvZHVjdHMoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQXBwbHlDdXN0b21lckNvdXBvbiA9IChjb3Vwb24pID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBsZXQgY3VycmVudF9jYXJ0ID0gZ2V0U3RhdGUoKS5jdXJyZW50X2NhcnQ7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IExvYWRDb3Vwb25zSW5kZXhEQigpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgaWYoICFjb3Vwb24gKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgIHZhciBjaGVja0NvdXBvbkFscmVhZHlBcHBsaWVkID0gcmVzWzBdLmNvdXBvbi5maWx0ZXIob2JqID0+IHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gY291cG9uLmNvZGUgPT0gb2JqLmNvZGU7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tDb3Vwb25BbHJlYWR5QXBwbGllZC5sZW5ndGggPT0gMCkge1xyXG5cclxuICAgICAgICAgIHJlc1swXS5jb3Vwb24ucHVzaChjb3Vwb24pO1xyXG5cclxuICAgICAgICAgIHJldHVybiBkYXRhYmFzZS50YWJsZSgncG9zX2NvdXBvbicpLndoZXJlKFwiY2FydF9pZFwiKS5lcXVhbHMoY3VycmVudF9jYXJ0KS5tb2RpZnkoe1xyXG4gICAgICAgICAgICBjb3Vwb246IHJlc1swXS5jb3Vwb25cclxuICAgICAgICAgIH0pLnRoZW4oKGNvRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICBsZXQgY291cCA9IHtcclxuICAgICAgICAgICAgICAgIGxpc3Q6IHJlcyxcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IDFcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGRpc3BhdGNoKHNldENvdXBvbihjb3VwKSk7XHJcbiAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0QWxsQ2FydFByb2R1Y3RzKCkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGxldCBsZXREYkRhdGEgPSB7XHJcbiAgICAgICAgICBpZDogY3VycmVudF9jYXJ0LFxyXG4gICAgICAgICAgY2FydF9pZDogY3VycmVudF9jYXJ0LFxyXG4gICAgICAgICAgY291cG9uOiBbY291cG9uXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3NfY291cG9uJykucHV0KGxldERiRGF0YSkudGhlbigoY29EYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgbGV0IGNvdXAgPSB7XHJcbiAgICAgICAgICAgIGxpc3Q6IFtsZXREYkRhdGFdLFxyXG4gICAgICAgICAgICBpc0ZldGNoaW5nOiAxXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZGlzcGF0Y2goc2V0Q291cG9uKGNvdXApKTtcclxuICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENhcnRQcm9kdWN0cygpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzb2x2ZSggcmVzdWx0ICk7XHJcblxyXG4gIH0pO1xyXG5cclxufSIsImltcG9ydCBkYXRhYmFzZSBmcm9tICcuLy4uLy4uL2RhdGFiYXNlJztcclxuaW1wb3J0IHt0cmFuc2xhdGlvbn0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLy4uLy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFBPU1Bvc3RSZXF1ZXN0IH0gZnJvbSAnLi8uLi8uLi9oYXNoJztcclxuaW1wb3J0IHsgYXBwbHlGaWx0ZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9ob29rcyc7XHJcbmV4cG9ydCBjb25zdCBDVVNUT01FUl9PQkpfQUZURVJfU0VBUkNIID0gJ3drd2Nwb3NfY3VzdG9tZXJfb2JqX2FmdGVyX3NlYXJjaCc7XHJcblxyXG5leHBvcnQgY29uc3QgUE9TX0NVU1RPTUVSUyA9ICdQT1NfQ1VTVE9NRVJTJztcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDdXN0b21lciA9IChjdXN0b21lcnMpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogUE9TX0NVU1RPTUVSUyxcclxuICAgIGN1c3RvbWVyc1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDdXN0b21lcnNXQyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjtcclxuXHJcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG5cclxuICAgIGlzQ3VzdG9tZXJEYXRhRXhpc3RzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8PSAwKSB7XHJcblxyXG4gICAgICAgIEFqQXhHZXRBbGxDdXN0b21lcldDKGRpc3BhdGNoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICAgIGlmIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgaXNDdXN0b21lckRhdGFFeGlzdHMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGRlZl9jdXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChjdXN0LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKGN1c3QuaXNfdHJ1ZSA9PSAnMScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmX2N1cy5wdXNoKGN1c3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGxldCBjdXN0T2JqID0ge1xyXG4gICAgICAgICAgICAgICAgbGlzdDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGRlZl9jdXMsXHJcbiAgICAgICAgICAgICAgICBzOiAnJyxcclxuICAgICAgICAgICAgICAgIHNjdXN0b21lcjogcmVzdWx0XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBkaXNwYXRjaChzZXRDdXN0b21lcihjdXN0T2JqKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgdmFyIGRlZl9jdXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChjdXN0LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1c3QuaXNfdHJ1ZSA9PSAnMScpIHtcclxuXHJcbiAgICAgICAgICAgICAgZGVmX2N1cy5wdXNoKGN1c3QpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXN0T2JqID0ge1xyXG4gICAgICAgICAgbGlzdDogcmVzdWx0LFxyXG4gICAgICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgICAgIGRlZmF1bHQ6IGRlZl9jdXMsXHJcbiAgICAgICAgICBzOiAnJyxcclxuICAgICAgICAgIHNjdXN0b21lcjogcmVzdWx0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXNwYXRjaChzZXRDdXN0b21lcihjdXN0T2JqKSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZFNlYXJjaEN1c3RvbWVycyA9IChzZWFyY2gsIGZha2VjdXN0b21lcnMsIGZha2VkZWZhdWx0KSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgaWYgKHNlYXJjaCkge1xyXG5cclxuICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfY3VzdG9tZXJzJykud2hlcmUoXCJmaXJzdF9uYW1lXCIpLnN0YXJ0c1dpdGhJZ25vcmVDYXNlKHNlYXJjaCkub3IoJ2VtYWlsJykuc3RhcnRzV2l0aElnbm9yZUNhc2Uoc2VhcmNoKVxyXG4gICAgICAudG9BcnJheSgpLnRoZW4oKGN1c3RvbWVyRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgY3VzdG9tZXJPYmogPSB7XHJcbiAgICAgICAgICBsaXN0OiBmYWtlY3VzdG9tZXJzLFxyXG4gICAgICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgICAgIGRlZmF1bHQ6IGZha2VkZWZhdWx0LFxyXG4gICAgICAgICAgczogc2VhcmNoLFxyXG4gICAgICAgICAgc2N1c3RvbWVyOiBjdXN0b21lckRhdGFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1c3RvbWVyT2JqID0gYXBwbHlGaWx0ZXJzKENVU1RPTUVSX09CSl9BRlRFUl9TRUFSQ0gsIGN1c3RvbWVyT2JqLHNlYXJjaCwgZmFrZWN1c3RvbWVycywgZmFrZWRlZmF1bHQpO1xyXG5cclxuICAgICAgICBkaXNwYXRjaChzZXRDdXN0b21lcihjdXN0b21lck9iaikpO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgbGV0IGN1c3RvbWVyT2JqID0ge1xyXG4gICAgICBsaXN0OiBmYWtlY3VzdG9tZXJzLFxyXG4gICAgICBpc0ZldGNoaW5nOiAxLFxyXG4gICAgICBkZWZhdWx0OiBmYWtlZGVmYXVsdCxcclxuICAgICAgczogJycsXHJcbiAgICAgIHNjdXN0b21lcjogZmFrZWN1c3RvbWVyc1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKHNldEN1c3RvbWVyKGN1c3RvbWVyT2JqKSk7XHJcblxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZURlZmF1bHRDdXN0b21lciA9IChjdXN0b21lciwgZmFrZWN1c3RvbWVycykgPT4gKGRpc3BhdGNoKSA9PiB7XHJcblxyXG4gIGlmIChjdXN0b21lcikge1xyXG5cclxuICAgIGxldCBjdXN0b21lck9iaiA9IHtcclxuICAgICAgbGlzdDogZmFrZWN1c3RvbWVycyxcclxuICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgZGVmYXVsdDogY3VzdG9tZXIsXHJcbiAgICAgIHM6ICcnLFxyXG4gICAgICBzY3VzdG9tZXI6IGZha2VjdXN0b21lcnNcclxuICAgIH1cclxuXHJcbiAgICBmYWtlY3VzdG9tZXJzLmZvckVhY2goIGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICBvYmouaXNfdHJ1ZSA9IGZhbHNlO1xyXG4gICAgfSApXHJcblxyXG4gICAgY3VzdG9tZXJbMF0uaXNfdHJ1ZSA9IHRydWU7XHJcblxyXG4gICAgZGF0YWJhc2UudGFibGUoJ3Bvc19jdXN0b21lcnMnKS50b0NvbGxlY3Rpb24oKS5tb2RpZnkoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICBvYmouaXNfdHJ1ZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YWJhc2UudGFibGUoJ3Bvc19jdXN0b21lcnMnKS51cGRhdGUoY3VzdG9tZXJbMF0uaWQsIHtcclxuICAgICAgaXNfdHJ1ZTogdHJ1ZVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAodXBkYXRlZCkge1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZWQpXHJcbiAgICAgICAgZGlzcGF0Y2goc2V0Q3VzdG9tZXIoY3VzdG9tZXJPYmopKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERlbGV0ZUN1c3RvbWVyID0gKGN1c3RvbWVyX2lkKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgaWYgKGN1c3RvbWVyX2lkKSB7XHJcblxyXG4gICAgcmV0dXJuIERlbGV0ZUN1c3RvbWVyVmlhQUpBWChjdXN0b21lcl9pZCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2N1c3RvbWVycycpLndoZXJlKFwiaWRcIikuZXF1YWxzKHBhcnNlSW50KHJlc3BvbnNlKSkuZGVsZXRlKCkudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgaXNDdXN0b21lckRhdGFFeGlzdHMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIGRlZl9jdXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChjdXN0LCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKGN1c3QuaXNfdHJ1ZSA9PSAnMScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmX2N1cy5wdXNoKGN1c3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGxldCBjdXN0T2JqID0ge1xyXG4gICAgICAgICAgICAgICAgbGlzdDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGRlZl9jdXMsXHJcbiAgICAgICAgICAgICAgICBzOiAnJyxcclxuICAgICAgICAgICAgICAgIHNjdXN0b21lcjogcmVzdWx0XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBkaXNwYXRjaChzZXRDdXN0b21lcihjdXN0T2JqKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIERlbGV0ZUN1c3RvbWVyVmlhQUpBWChjdXN0b21lcl9pZCkge1xyXG5cclxuICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgICdjdXN0b21lcic6IGN1c3RvbWVyX2lkXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRpbmctdGV4dCcgKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi5kZWxldGluZ19jdXN0b21lcl90aXRsZV90ZXh0O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGVyJyApLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIFBPU1Bvc3RSZXF1ZXN0KCB3a3djcG9zX3ZhcmlhYmxlLldLX0RFTEVURV9DVVNUT01FUl9FTkRQT0lOVCwgcG9zdERhdGEgKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZSA9PSBjdXN0b21lcl9pZCkge1xyXG5cclxuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9ICk7XHJcblxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU2F2ZUN1c3RvbWVyID0gKGN1c3RvbWVyLCBwb3NfY3VzdG9tZXJfaWQpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBpZiAoY3VzdG9tZXIpIHtcclxuXHJcbiAgICByZXR1cm4gQ3JlYXRlQ3VzdG9tZXJWaWFBSkFYKGN1c3RvbWVyLCBwb3NfY3VzdG9tZXJfaWQpLnRoZW4oKHJlc3Bvc25zZSkgPT4ge1xyXG5cclxuICAgICAgaWYgKHJlc3Bvc25zZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YWJhc2UudGFibGUoJ3Bvc19jdXN0b21lcnMnKS5wdXQocmVzcG9zbnNlKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIENyZWF0ZUN1c3RvbWVyVmlhQUpBWChjdXN0b21lciwgcG9zX2N1c3RvbWVyX2lkKSB7XHJcblxyXG4gIGNvbnN0IHBvc3REYXRhID0ge1xyXG4gICAgcG9zOiBjdXN0b21lclxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgaWYoIHBvc19jdXN0b21lcl9pZCApIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkaW5nLXRleHQnICkuaW5uZXJIVE1MID0gdHJhbnNsYXRpb24udXBkYXRlX2V4aXN0aW5nX2N1c3RvbWVyX3RleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRpbmctdGV4dCcgKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi5jcmVhdGVfbmV3X2N1c3RvbWVyX3RleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfQ1JFQVRFX0NVU1RPTUVSX0VORFBPSU5ULCBwb3N0RGF0YSApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZVsnZXJyb3InXSkge1xyXG5cclxuICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLmVycl90ZXh0LFxyXG4gICAgICAgICAgICBjb250ZW50OiByZXNwb25zZVsnbXNnJ10sXHJcbiAgICAgICAgICAgIGF1dG9DbG9zZTogJ2NhbmNlbEFjdGlvbnwzMDAwJyxcclxuICAgICAgICAgICAgdHlwZTogJ3JlZCcsXHJcbiAgICAgICAgICAgIGVzY2FwZUtleTogJ2NhbmNlbEFjdGlvbicsXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgICBjYW5jZWxBY3Rpb246IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uLmNhbmNlbF9idG5fdGV4dCxcclxuICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiAncG9zLWJ0bi1wcmltYXJ5JyxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlWydzdWNjZXNzJ10pIHtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlWydkYXRhJ10pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSApO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbG9hZEFsbEN1c3RvbWVycyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBkYXRhYmFzZS50YWJsZSgncG9zX2N1c3RvbWVycycpLnRvQXJyYXkoKS50aGVuKChjdXN0b21lckRhdGEpID0+IHtcclxuXHJcbiAgICB2YXIgZGVmX2N1c3RvbWVyID0gW107XHJcblxyXG4gICAgaWYgKGN1c3RvbWVyRGF0YSkge1xyXG5cclxuICAgICAgY3VzdG9tZXJEYXRhLmZvckVhY2goKGN1c3RvbWVyLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoY3VzdG9tZXIuaXNfdHJ1ZSA9PSAnMScpIHtcclxuXHJcbiAgICAgICAgICBkZWZfY3VzdG9tZXIucHVzaChjdXN0b21lcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgY3VzdG9tZXJPYmogPSB7XHJcbiAgICAgIGxpc3Q6IGN1c3RvbWVyRGF0YSxcclxuICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgZGVmYXVsdDogZGVmX2N1c3RvbWVyLFxyXG4gICAgICBzOiAnJyxcclxuICAgICAgc2N1c3RvbWVyOiBjdXN0b21lckRhdGFcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaChzZXRDdXN0b21lcihjdXN0b21lck9iaikpO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBBakF4R2V0QWxsQ3VzdG9tZXJXQyhkaXNwYXRjaCkge1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIHZhciBpbmRleCA9IDA7XHJcblxyXG4gICAgcmVjdXJzaXZlX2FqYXgoaW5kZXgsIGRpc3BhdGNoKS50aGVuKChyZWN1cl9yZXMpID0+IHtcclxuXHJcbiAgICAgIHJlc29sdmUocmVjdXJfcmVzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiByZWN1cnNpdmVfYWpheChwYWdlLCBkaXNwYXRjaCkge1xyXG5cclxuICBsZXQgcG9zdERhdGEgPSB7XHJcbiAgICBwYWdlIDogcGFnZVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgaWYoIHBhZ2UgPT0gMSApIHtcclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGluZy10ZXh0JyApLmlubmVySFRNTCA9IHRyYW5zbGF0aW9uLnRleHRfbG9hZGluZ19jdXN0b21lcnM7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfR0VUX0NVU1RPTUVSU19FTkRQT0lOVCwgcG9zdERhdGEgKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYgKGpzb24gIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfY3VzdG9tZXJzJykuYnVsa1B1dChqc29uKS50aGVuKChyc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgIGlzQ3VzdG9tZXJEYXRhRXhpc3RzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmX2N1cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoY3VzdCwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VzdC5pc190cnVlID09ICcxJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgZGVmX2N1cy5wdXNoKGN1c3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VzdE9iaiA9IHtcclxuICAgICAgICAgICAgICBsaXN0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgaXNGZXRjaGluZzogMSxcclxuICAgICAgICAgICAgICBkZWZhdWx0OiBkZWZfY3VzLFxyXG4gICAgICAgICAgICAgIHM6ICcnLFxyXG4gICAgICAgICAgICAgIHNjdXN0b21lcjogcmVzdWx0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEN1c3RvbWVyKGN1c3RPYmopKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoanNvbi5sZW5ndGggPj0gNTAwKSB7XHJcblxyXG4gICAgICAgICAgICBwYWdlID0gcGFnZSArIDE7XHJcblxyXG4gICAgICAgICAgICByZWN1cnNpdmVfYWpheChwYWdlLCBkaXNwYXRjaCk7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9ICk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaXNDdXN0b21lckRhdGFFeGlzdHMoKSB7XHJcblxyXG4gIHJldHVybiBkYXRhYmFzZS50YWJsZSgncG9zX2N1c3RvbWVycycpLnRvQXJyYXkoKS50aGVuKChjdXN0RGF0YSkgPT4ge1xyXG5cclxuICAgIHJldHVybiBjdXN0RGF0YTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcbiIsIlxuIFxuaW1wb3J0IGRhdGFiYXNlIGZyb20gJy4vLi4vLi4vZGF0YWJhc2UnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbic7XG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBQT1NQb3N0UmVxdWVzdCB9IGZyb20gJy4vLi4vLi4vaGFzaCc7XG5cbmV4cG9ydCBjb25zdCBQT1NfSU5WT0lDRSA9ICdQT1NfSU5WT0lDRSc7IFxuIFxuZXhwb3J0IGNvbnN0IHNldEludm9pY2UgPSAoIGludm9pY2UgKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBQT1NfSU5WT0lDRSxcbiAgICBpbnZvaWNlXG4gIH1cbn07XG5cbiAgXG5leHBvcnQgY29uc3QgZ2V0SW52b2ljZVRlbXBsYXRlID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG5cbiAgbGV0IHVzZXIgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW47IFxuICBcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xuICAgIFxuICAgIGlzSW52b2ljZURhdGFFeGlzdHMoKS50aGVuKChyZXN1bHQpID0+IHtcblxuICAgICAgaWYoIHJlc3VsdC5sZW5ndGggPD0gMCApIHtcbiAgICAgIFxuICAgICAgICBBakF4R2V0SW52b2ljZVdDKCkudGhlbiggKHJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICBpZiggcmVzcG9uc2UgKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEludm9pY2UocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgXG4gICAgICAgIH0pO1xuICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZGlzcGF0Y2goc2V0SW52b2ljZShyZXN1bHRbMF0uaW52b2ljZV9odG1sKSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuICAgIFxuICB9XG4gIFxuIH07IFxuICBcbiBmdW5jdGlvbiBBakF4R2V0SW52b2ljZVdDKCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkaW5nLXRleHQnICkuaW5uZXJIVE1MID0gdHJhbnNsYXRpb24ubG9hZGluZ190YXhfdGV4dDtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGVyJyApLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfR0VUX0lOVk9JQ0VfVEVNUExBVEVfRU5EUE9JTlQsIHt9ICkudGhlbigoanNvbikgPT4ge1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBpZigganNvbiApIHtcblxuICAgICAgICBsZXQgaW52b2ljZU9iaiA9IHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgaW52b2ljZV9odG1sOiBqc29uXG4gICAgICAgIH07XG5cbiAgICAgICAgZGF0YWJhc2UucG9zX2ludm9pY2UucHV0KGludm9pY2VPYmopLnRoZW4oKHJlcykgPT57XG5cbiAgICAgICAgICAgIHJlc29sdmUoanNvbik7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIFxuICAgIH0gKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiBpc0ludm9pY2VEYXRhRXhpc3RzKCkge1xuXG4gIHJldHVybiBkYXRhYmFzZS50YWJsZSgncG9zX2ludm9pY2UnKS50b0FycmF5KCkudGhlbiggKGludm9pY2VEYXRhKSA9PiB7XG5cbiAgICByZXR1cm4gaW52b2ljZURhdGE7XG5cbiAgfSk7XG5cbn1cbiIsIi8vIFRoZSBsaWJyYXJ5J3Mgc2V0dGluZ3MgY29uZmlndXJhdGlvbiBvYmplY3QuIENvbnRhaW5zIGRlZmF1bHQgcGFyYW1ldGVycyBmb3Jcbi8vIGN1cnJlbmN5IGFuZCBudW1iZXIgZm9ybWF0dGluZ1xuY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgY3VycmVuY3k6IHtcbiAgICAgICAgc3ltYm9sIDogXCIkXCIsXHRcdC8vIGRlZmF1bHQgY3VycmVuY3kgc3ltYm9sIGlzICckJ1xuICAgICAgICBmb3JtYXQgOiBcIiVzJXZcIixcdC8vIGNvbnRyb2xzIG91dHB1dDogJXMgPSBzeW1ib2wsICV2ID0gdmFsdWUgKGNhbiBiZSBvYmplY3QsIHNlZSBkb2NzKVxuICAgICAgICBkZWNpbWFsIDogXCIuXCIsXHRcdC8vIGRlY2ltYWwgcG9pbnQgc2VwYXJhdG9yXG4gICAgICAgIHRob3VzYW5kIDogXCIsXCIsXHRcdC8vIHRob3VzYW5kcyBzZXBhcmF0b3JcbiAgICAgICAgcHJlY2lzaW9uIDogMixcdFx0Ly8gZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgZ3JvdXBpbmcgOiAzXHRcdC8vIGRpZ2l0IGdyb3VwaW5nIChub3QgaW1wbGVtZW50ZWQgeWV0KVxuICAgIH0sXG4gICAgbnVtYmVyOiB7XG4gICAgICAgIHByZWNpc2lvbiA6IDAsXHRcdC8vIGRlZmF1bHQgcHJlY2lzaW9uIG9uIG51bWJlcnMgaXMgMFxuICAgICAgICBncm91cGluZyA6IDMsXHRcdC8vIGRpZ2l0IGdyb3VwaW5nIChub3QgaW1wbGVtZW50ZWQgeWV0KVxuICAgICAgICB0aG91c2FuZCA6IFwiLFwiLFxuICAgICAgICBkZWNpbWFsIDogXCIuXCJcbiAgICB9XG59O1xuXG4vLyBTdG9yZSByZWZlcmVuY2UgdG8gcG9zc2libHktYXZhaWxhYmxlIEVDTUFTY3JpcHQgNSBtZXRob2RzIGZvciBsYXRlclxudmFyIG5hdGl2ZU1hcCA9IEFycmF5LnByb3RvdHlwZS5tYXAsXG5uYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcbnRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBGb3JtYXQgYSBudW1iZXIgaW50byBjdXJyZW5jeVxuICpcbiAqIFVzYWdlOiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KG51bWJlciwgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kc1NlcCwgZGVjaW1hbFNlcCwgZm9ybWF0KVxuICogZGVmYXVsdHM6ICgwLCBcIiRcIiwgMiwgXCIsXCIsIFwiLlwiLCBcIiVzJXZcIilcbiAqXG4gKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnMgYW5kIGZvcm1hdFxuICogU2Vjb25kIHBhcmFtIGNhbiBiZSBhbiBvYmplY3QgbWF0Y2hpbmcgYHNldHRpbmdzLmN1cnJlbmN5YCB3aGljaCBpcyB0aGUgZWFzaWVzdCB3YXkuXG4gKlxuICogVG8gZG86IHRpZHkgdXAgdGhlIHBhcmFtZXRlcnNcbiAqL1xuZnVuY3Rpb24gZm9ybWF0TW9uZXkobnVtYmVyLCBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmQsIGRlY2ltYWwsIGZvcm1hdCkge1xuICAgIC8vIFJlc3Vyc2l2ZWx5IGZvcm1hdCBhcnJheXM6XG4gICAgaWYgKGlzQXJyYXkobnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gbWFwKG51bWJlciwgZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb25leSh2YWwsIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZCwgZGVjaW1hbCwgZm9ybWF0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgbnVtYmVyOlxuICAgIG51bWJlciA9IHVuZm9ybWF0KG51bWJlcik7XG5cbiAgICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG4gICAgdmFyIG9wdHMgPSBkZWZhdWx0cyhcbiAgICAgICAgICAgIChpc09iamVjdChzeW1ib2wpID8gc3ltYm9sIDoge1xuICAgICAgICAgICAgICAgIHN5bWJvbCA6IHN5bWJvbCxcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gOiBwcmVjaXNpb24sXG4gICAgICAgICAgICAgICAgdGhvdXNhbmQgOiB0aG91c2FuZCxcbiAgICAgICAgICAgICAgICBkZWNpbWFsIDogZGVjaW1hbCxcbiAgICAgICAgICAgICAgICBmb3JtYXQgOiBmb3JtYXRcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2V0dGluZ3MuY3VycmVuY3lcbiAgICAgICAgKSxcblxuICAgICAgICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pOlxuICAgICAgICBmb3JtYXRzID0gY2hlY2tDdXJyZW5jeUZvcm1hdChvcHRzLmZvcm1hdCksXG5cbiAgICAgICAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWU6XG4gICAgICAgIHVzZUZvcm1hdCA9IG51bWJlciA+IDAgPyBmb3JtYXRzLnBvcyA6IG51bWJlciA8IDAgPyBmb3JtYXRzLm5lZyA6IGZvcm1hdHMuemVybztcblxuICAgIC8vIFJldHVybiB3aXRoIGN1cnJlbmN5IHN5bWJvbCBhZGRlZDpcbiAgICByZXR1cm4gdXNlRm9ybWF0LnJlcGxhY2UoJyVzJywgb3B0cy5zeW1ib2wpLnJlcGxhY2UoJyV2JywgZm9ybWF0TnVtYmVyKE1hdGguYWJzKG51bWJlciksIGNoZWNrUHJlY2lzaW9uKG9wdHMucHJlY2lzaW9uKSwgb3B0cy50aG91c2FuZCwgb3B0cy5kZWNpbWFsKSk7XG59O1xuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgc3VwcGxpZWQgcGFyYW1ldGVyIGlzIGEgc3RyaW5nXG4gKiBmcm9tIHVuZGVyc2NvcmUuanMsIGRlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUlzQXJyYXkgPyBuYXRpdmVJc0FycmF5KG9iaikgOiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogQ2hlY2sgYW5kIG5vcm1hbGlzZSB0aGUgdmFsdWUgb2YgcHJlY2lzaW9uIChtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIpXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJlY2lzaW9uKHZhbCwgYmFzZSkge1xuICAgIHZhbCA9IE1hdGgucm91bmQoTWF0aC5hYnModmFsKSk7XG4gICAgcmV0dXJuIGlzTmFOKHZhbCk/IGJhc2UgOiB2YWw7XG59XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdG9GaXhlZCgpIHRoYXQgdHJlYXRzIGZsb2F0cyBtb3JlIGxpa2UgZGVjaW1hbHNcbiAqXG4gKiBGaXhlcyBiaW5hcnkgcm91bmRpbmcgaXNzdWVzIChlZy4gKDAuNjE1KS50b0ZpeGVkKDIpID09PSBcIjAuNjFcIikgdGhhdCBwcmVzZW50XG4gKiBwcm9ibGVtcyBmb3IgYWNjb3VudGluZy0gYW5kIGZpbmFuY2UtcmVsYXRlZCBzb2Z0d2FyZS5cbiAqL1xudmFyIHRvRml4ZWQgPSBmdW5jdGlvbih2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gICAgcHJlY2lzaW9uID0gY2hlY2tQcmVjaXNpb24ocHJlY2lzaW9uLCBzZXR0aW5ncy5udW1iZXIucHJlY2lzaW9uKTtcbiAgICB2YXIgcG93ZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcblxuICAgIC8vIE11bHRpcGx5IHVwIGJ5IHByZWNpc2lvbiwgcm91bmQgYWNjdXJhdGVseSwgdGhlbiBkaXZpZGUgYW5kIHVzZSBuYXRpdmUgdG9GaXhlZCgpOlxuICAgIHJldHVybiAoTWF0aC5yb3VuZCh1bmZvcm1hdCh2YWx1ZSkgKiBwb3dlcikgLyBwb3dlcikudG9GaXhlZChwcmVjaXNpb24pO1xufTtcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIHN1cHBsaWVkIHBhcmFtZXRlciBpcyBhIHN0cmluZ1xuICogZnJvbSB1bmRlcnNjb3JlLmpzXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiAhIShvYmogPT09ICcnIHx8IChvYmogJiYgb2JqLmNoYXJDb2RlQXQgJiYgb2JqLnN1YnN0cikpO1xufVxuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgc3VwcGxpZWQgcGFyYW1ldGVyIGlzIGEgdHJ1ZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG4vKipcbiAqIEV4dGVuZHMgYW4gb2JqZWN0IHdpdGggYSBkZWZhdWx0cyBvYmplY3QsIHNpbWlsYXIgdG8gdW5kZXJzY29yZSdzIF8uZGVmYXVsdHNcbiAqXG4gKiBVc2VkIGZvciBhYnN0cmFjdGluZyBwYXJhbWV0ZXIgaGFuZGxpbmcgZnJvbSBBUEkgbWV0aG9kc1xuICovXG5mdW5jdGlvbiBkZWZhdWx0cyhvYmplY3QsIGRlZnMpIHtcbiAgICB2YXIga2V5O1xuICAgIG9iamVjdCA9IG9iamVjdCB8fCB7fTtcbiAgICBkZWZzID0gZGVmcyB8fCB7fTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IG5vbi1wcm90b3R5cGUgcHJvcGVydGllczpcbiAgICBmb3IgKGtleSBpbiBkZWZzKSB7XG4gICAgICAgIGlmIChkZWZzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdmFsdWVzIHdpdGggZGVmYXVsdHMgb25seSBpZiB1bmRlZmluZWQgKGFsbG93IGVtcHR5L3plcm8gdmFsdWVzKTpcbiAgICAgICAgICAgIGlmIChvYmplY3Rba2V5XSA9PSBudWxsKSBvYmplY3Rba2V5XSA9IGRlZnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIEZvcm1hdCBhIG51bWJlciwgd2l0aCBjb21tYS1zZXBhcmF0ZWQgdGhvdXNhbmRzIGFuZCBjdXN0b20gcHJlY2lzaW9uL2RlY2ltYWwgcGxhY2VzXG4gKiBBbGlhczogYGFjY291bnRpbmcuZm9ybWF0KClgXG4gKlxuICogTG9jYWxpc2UgYnkgb3ZlcnJpZGluZyB0aGUgcHJlY2lzaW9uIGFuZCB0aG91c2FuZCAvIGRlY2ltYWwgc2VwYXJhdG9yc1xuICogMm5kIHBhcmFtZXRlciBgcHJlY2lzaW9uYCBjYW4gYmUgYW4gb2JqZWN0IG1hdGNoaW5nIGBzZXR0aW5ncy5udW1iZXJgXG4gKi9cbnZhciBmb3JtYXROdW1iZXIgPSBmdW5jdGlvbihudW1iZXIsIHByZWNpc2lvbiwgdGhvdXNhbmQsIGRlY2ltYWwpIHtcbiAgICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuICAgIGlmIChpc0FycmF5KG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIG1hcChudW1iZXIsIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE51bWJlcih2YWwsIHByZWNpc2lvbiwgdGhvdXNhbmQsIGRlY2ltYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDbGVhbiB1cCBudW1iZXI6XG4gICAgbnVtYmVyID0gdW5mb3JtYXQobnVtYmVyKTtcblxuICAgIC8vIEJ1aWxkIG9wdGlvbnMgb2JqZWN0IGZyb20gc2Vjb25kIHBhcmFtIChpZiBvYmplY3QpIG9yIGFsbCBwYXJhbXMsIGV4dGVuZGluZyBkZWZhdWx0czpcbiAgICB2YXIgb3B0cyA9IGRlZmF1bHRzKFxuICAgICAgICAgICAgKGlzT2JqZWN0KHByZWNpc2lvbikgPyBwcmVjaXNpb24gOiB7XG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIDogcHJlY2lzaW9uLFxuICAgICAgICAgICAgICAgIHRob3VzYW5kIDogdGhvdXNhbmQsXG4gICAgICAgICAgICAgICAgZGVjaW1hbCA6IGRlY2ltYWxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2V0dGluZ3MubnVtYmVyXG4gICAgICAgICksXG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcHJlY2lzaW9uXG4gICAgICAgIHVzZVByZWNpc2lvbiA9IGNoZWNrUHJlY2lzaW9uKG9wdHMucHJlY2lzaW9uKSxcblxuICAgICAgICAvLyBEbyBzb21lIGNhbGM6XG4gICAgICAgIG5lZ2F0aXZlID0gbnVtYmVyIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgYmFzZSA9IHBhcnNlSW50KHRvRml4ZWQoTWF0aC5hYnMobnVtYmVyIHx8IDApLCB1c2VQcmVjaXNpb24pLCAxMCkgKyBcIlwiLFxuICAgICAgICBtb2QgPSBiYXNlLmxlbmd0aCA+IDMgPyBiYXNlLmxlbmd0aCAlIDMgOiAwO1xuXG4gICAgLy8gRm9ybWF0IHRoZSBudW1iZXI6XG4gICAgcmV0dXJuIG5lZ2F0aXZlICsgKG1vZCA/IGJhc2Uuc3Vic3RyKDAsIG1vZCkgKyBvcHRzLnRob3VzYW5kIDogXCJcIikgKyBiYXNlLnN1YnN0cihtb2QpLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCBcIiQxXCIgKyBvcHRzLnRob3VzYW5kKSArICh1c2VQcmVjaXNpb24gPyBvcHRzLmRlY2ltYWwgKyB0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIHVzZVByZWNpc2lvbikuc3BsaXQoJy4nKVsxXSA6IFwiXCIpO1xufTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZy9hcnJheSBvZiBzdHJpbmdzLCByZW1vdmVzIGFsbCBmb3JtYXR0aW5nL2NydWZ0IGFuZCByZXR1cm5zIHRoZSByYXcgZmxvYXQgdmFsdWVcbiAqIEFsaWFzOiBgYWNjb3VudGluZy5wYXJzZShzdHJpbmcpYFxuICpcbiAqIERlY2ltYWwgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGZsb2F0cyAoZGVmYXVsdHMgdG9cbiAqIGFjY291bnRpbmcuc2V0dGluZ3MubnVtYmVyLmRlY2ltYWwpLCBzbyBpZiB0aGUgbnVtYmVyIHVzZXMgYSBub24tc3RhbmRhcmQgZGVjaW1hbFxuICogc2VwYXJhdG9yLCBwcm92aWRlIGl0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gKlxuICogQWxzbyBtYXRjaGVzIGJyYWNrZXRlZCBuZWdhdGl2ZXMgKGVnLiBcIiQgKDEuOTkpXCIgPT4gLTEuOTkpXG4gKlxuICogRG9lc24ndCB0aHJvdyBhbnkgZXJyb3JzIChgTmFOYHMgYmVjb21lIDApIGJ1dCB0aGlzIG1heSBjaGFuZ2UgaW4gZnV0dXJlXG4gKi9cbnZhciB1bmZvcm1hdCA9IGZ1bmN0aW9uKHZhbHVlLCBkZWNpbWFsKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgdW5mb3JtYXQgYXJyYXlzOlxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWFwKHZhbHVlLCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmZvcm1hdCh2YWwsIGRlY2ltYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBGYWlscyBzaWxlbnRseSAobmVlZCBkZWNlbnQgZXJyb3JzKTpcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IDA7XG5cbiAgICAvLyBSZXR1cm4gdGhlIHZhbHVlIGFzLWlzIGlmIGl0J3MgYWxyZWFkeSBhIG51bWJlcjpcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gdmFsdWU7XG5cbiAgICAvLyBEZWZhdWx0IGRlY2ltYWwgcG9pbnQgY29tZXMgZnJvbSBzZXR0aW5ncywgYnV0IGNvdWxkIGJlIHNldCB0byBlZy4gXCIsXCIgaW4gb3B0czpcbiAgICBkZWNpbWFsID0gZGVjaW1hbCB8fCBzZXR0aW5ncy5udW1iZXIuZGVjaW1hbDtcblxuICAgICAgICAvLyBCdWlsZCByZWdleCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBleGNlcHQgZGlnaXRzLCBkZWNpbWFsIHBvaW50IGFuZCBtaW51cyBzaWduOlxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbXjAtOS1cIiArIGRlY2ltYWwgKyBcIl1cIiwgW1wiZ1wiXSksXG4gICAgICAgIHVuZm9ybWF0dGVkID0gcGFyc2VGbG9hdChcbiAgICAgICAgICAgIChcIlwiICsgdmFsdWUpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwoKC4qKVxcKS8sIFwiLSQxXCIpIC8vIHJlcGxhY2UgYnJhY2tldGVkIHZhbHVlcyB3aXRoIG5lZ2F0aXZlc1xuICAgICAgICAgICAgLnJlcGxhY2UocmVnZXgsICcnKSAgICAgICAgIC8vIHN0cmlwIG91dCBhbnkgY3J1ZnRcbiAgICAgICAgICAgIC5yZXBsYWNlKGRlY2ltYWwsICcuJykgICAgICAvLyBtYWtlIHN1cmUgZGVjaW1hbCBwb2ludCBpcyBzdGFuZGFyZFxuICAgICAgICApO1xuXG4gICAgLy8gVGhpcyB3aWxsIGZhaWwgc2lsZW50bHkgd2hpY2ggbWF5IGNhdXNlIHRyb3VibGUsIGxldCdzIHdhaXQgYW5kIHNlZTpcbiAgICByZXR1cm4gIWlzTmFOKHVuZm9ybWF0dGVkKSA/IHVuZm9ybWF0dGVkIDogMDtcbn07XG5cbi8qKlxuICogUGFyc2VzIGEgZm9ybWF0IHN0cmluZyBvciBvYmplY3QgYW5kIHJldHVybnMgZm9ybWF0IG9iaiBmb3IgdXNlIGluIHJlbmRlcmluZ1xuICpcbiAqIGBmb3JtYXRgIGlzIGVpdGhlciBhIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IChwb3NpdGl2ZSkgZm9ybWF0LCBvciBvYmplY3RcbiAqIGNvbnRhaW5pbmcgYHBvc2AgKHJlcXVpcmVkKSwgYG5lZ2AgYW5kIGB6ZXJvYCB2YWx1ZXMgKG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nXG4gKiBlaXRoZXIgYSBzdHJpbmcgb3Igb2JqZWN0KVxuICpcbiAqIEVpdGhlciBzdHJpbmcgb3IgZm9ybWF0LnBvcyBtdXN0IGNvbnRhaW4gXCIldlwiICh2YWx1ZSkgdG8gYmUgdmFsaWRcbiAqL1xuZnVuY3Rpb24gY2hlY2tDdXJyZW5jeUZvcm1hdChmb3JtYXQpIHtcbiAgICB2YXIgZGVmYXVsdHMgPSBzZXR0aW5ncy5jdXJyZW5jeS5mb3JtYXQ7XG5cbiAgICAvLyBBbGxvdyBmdW5jdGlvbiBhcyBmb3JtYXQgcGFyYW1ldGVyIChzaG91bGQgcmV0dXJuIHN0cmluZyBvciBvYmplY3QpOlxuICAgIGlmICggdHlwZW9mIGZvcm1hdCA9PT0gXCJmdW5jdGlvblwiICkgZm9ybWF0ID0gZm9ybWF0KCk7XG5cbiAgICAvLyBGb3JtYXQgY2FuIGJlIGEgc3RyaW5nLCBpbiB3aGljaCBjYXNlIGB2YWx1ZWAgKFwiJXZcIikgbXVzdCBiZSBwcmVzZW50OlxuICAgIGlmICggaXNTdHJpbmcoIGZvcm1hdCApICYmIGZvcm1hdC5tYXRjaChcIiV2XCIpICkge1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHBvc2l0aXZlLCBuZWdhdGl2ZSBhbmQgemVybyBmb3JtYXRzOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcG9zIDogZm9ybWF0LFxuICAgICAgICAgICAgbmVnIDogZm9ybWF0LnJlcGxhY2UoXCItXCIsIFwiXCIpLnJlcGxhY2UoXCIldlwiLCBcIi0ldlwiKSxcbiAgICAgICAgICAgIHplcm8gOiBmb3JtYXRcbiAgICAgICAgfTtcblxuICAgIC8vIElmIG5vIGZvcm1hdCwgb3Igb2JqZWN0IGlzIG1pc3NpbmcgdmFsaWQgcG9zaXRpdmUgdmFsdWUsIHVzZSBkZWZhdWx0czpcbiAgICB9IGVsc2UgaWYgKCAhZm9ybWF0IHx8ICFmb3JtYXQucG9zIHx8ICFmb3JtYXQucG9zLm1hdGNoKFwiJXZcIikgKSB7XG5cbiAgICAgICAgLy8gSWYgZGVmYXVsdHMgaXMgYSBzdHJpbmcsIGNhc3RzIGl0IHRvIGFuIG9iamVjdCBmb3IgZmFzdGVyIGNoZWNraW5nIG5leHQgdGltZTpcbiAgICAgICAgcmV0dXJuICggIWlzU3RyaW5nKCBkZWZhdWx0cyApICkgPyBkZWZhdWx0cyA6IHNldHRpbmdzLmN1cnJlbmN5LmZvcm1hdCA9IHtcbiAgICAgICAgICAgIHBvcyA6IGRlZmF1bHRzLFxuICAgICAgICAgICAgbmVnIDogZGVmYXVsdHMucmVwbGFjZShcIiV2XCIsIFwiLSV2XCIpLFxuICAgICAgICAgICAgemVybyA6IGRlZmF1bHRzXG4gICAgICAgIH07XG5cbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgZm9ybWF0IHdhcyBmaW5lOlxuICAgIHJldHVybiBmb3JtYXQ7XG59XG5cbmV4cG9ydCBjb25zdCB3a3djcG9zX3ByaWNlID0gKCBwcmljZSwgY3VycmVuY3lTeW1ib2wgPSAnJyApID0+IHtcbiAgICByZXR1cm4gZm9ybWF0TW9uZXkoIHByaWNlLCB7XG4gICAgICAgIHN5bWJvbDogICAgY3VycmVuY3lTeW1ib2wgPyBjdXJyZW5jeVN5bWJvbCA6IGFwaWZfc2NyaXB0LmN1cnJlbmN5X2Zvcm1hdF9zeW1ib2wsXG4gICAgICAgIGRlY2ltYWw6ICAgYXBpZl9zY3JpcHQuY3VycmVuY3lfZm9ybWF0X2RlY2ltYWxfc2VwLFxuICAgICAgICB0aG91c2FuZDogIGFwaWZfc2NyaXB0LmN1cnJlbmN5X2Zvcm1hdF90aG91c2FuZF9zZXAsXG4gICAgICAgIHByZWNpc2lvbjogYXBpZl9zY3JpcHQuY3VycmVuY3lfZm9ybWF0X251bV9kZWNpbWFscyxcbiAgICAgICAgZm9ybWF0OiAgICBhcGlmX3NjcmlwdC5jdXJyZW5jeV9mb3JtYXRcbiAgICB9ICk7XG59XG5cbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=