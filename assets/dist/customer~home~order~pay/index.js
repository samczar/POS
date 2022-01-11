(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer~home~order~pay"],{

/***/ "./src/js/actions/currentcart/index.js":
/*!*********************************************!*\
  !*** ./src/js/actions/currentcart/index.js ***!
  \*********************************************/
/*! exports provided: POS_CURRENT_CART, setCurrentCart, getCurrentCart, updateCurrentCart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_CURRENT_CART", function() { return POS_CURRENT_CART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentCart", function() { return setCurrentCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentCart", function() { return getCurrentCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentCart", function() { return updateCurrentCart; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");

var POS_CURRENT_CART = 'POS_CURRENT_CART';
var setCurrentCart = function setCurrentCart(current_cart) {
  return {
    type: POS_CURRENT_CART,
    current_cart: current_cart
  };
};
var getCurrentCart = function getCurrentCart() {
  return function (dispatch) {
    var res = _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_current_cart').toArray().then(function (response) {
      if (response.length <= 0) {
        var current_cart = {
          id: 0,
          cart_id: 0
        };
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_current_cart').put(current_cart).then(function (response) {
          var cucart = 0;
          dispatch(setCurrentCart(cucart));
        });
      } else {
        var cart_id = response.map(function (val, i) {
          return val.cart_id;
        });
        dispatch(setCurrentCart(cart_id[0]));
      }
    });
  };
};
var updateCurrentCart = function updateCurrentCart(current_cart) {
  return function (dispatch) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_current_cart').update(0, {
      cart_id: parseInt(current_cart)
    }).then(function (response) {
      dispatch(setCurrentCart(parseInt(current_cart)));
    });
  };
};

/***/ }),

/***/ "./src/js/actions/discount/index.js":
/*!******************************************!*\
  !*** ./src/js/actions/discount/index.js ***!
  \******************************************/
/*! exports provided: POS_DISCOUNT, setDiscount, getAllDiscountWC, ModifyDiscount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_DISCOUNT", function() { return POS_DISCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDiscount", function() { return setDiscount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllDiscountWC", function() { return getAllDiscountWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyDiscount", function() { return ModifyDiscount; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");

var POS_DISCOUNT = 'POS_DISCOUNT';
var setDiscount = function setDiscount(discount) {
  return {
    type: POS_DISCOUNT,
    discount: discount
  };
};
var getAllDiscountWC = function getAllDiscountWC() {
  return function (dispatch) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_discount').toArray().then(function (response) {
      if (response) {
        var discount = {
          list: response,
          isFetching: 1
        };
      } else {
        var discount = {
          list: '',
          isFetching: 1
        };
      }

      dispatch(setDiscount(discount));
    });
  };
};
var ModifyDiscount = function ModifyDiscount(act, discount, current_cart) {
  return function (dispatch) {
    if (act == 'add') {
      var discObj = {
        id: current_cart,
        cart_id: current_cart,
        discount: discount
      };
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_discount').put(discObj).then(function (response) {
        var dis = {
          list: [discObj],
          isFetching: 1
        };
        dispatch(setDiscount(dis));
      });
    } else if (act == 'delete') {
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_discount').where("cart_id").equals(current_cart).delete().then(function (response) {
        var dis = {
          list: '',
          isFetching: 1
        };
        dispatch(setDiscount(dis));
      });
    }
  };
};

/***/ }),

/***/ "./src/js/actions/hold/index.js":
/*!**************************************!*\
  !*** ./src/js/actions/hold/index.js ***!
  \**************************************/
/*! exports provided: POS_HOLD, SetHold, getAllHoldCartProducts, addToHold, RemoveHoldData, RemoveCartProduct, ModifyCart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_HOLD", function() { return POS_HOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetHold", function() { return SetHold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllHoldCartProducts", function() { return getAllHoldCartProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToHold", function() { return addToHold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveHoldData", function() { return RemoveHoldData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveCartProduct", function() { return RemoveCartProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyCart", function() { return ModifyCart; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");


var POS_HOLD = 'POS_HOLD';
var SetHold = function SetHold(hold) {
  return {
    type: POS_HOLD,
    hold: hold
  };
};
var getAllHoldCartProducts = function getAllHoldCartProducts() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      loadHoldCartProducts().then(function (dbhold) {
        if (dbhold) {
          var holdcart = {
            list: dbhold,
            isFetching: 1
          };
        } else {
          var holdcart = {
            list: '',
            isFetching: 1
          };
        }

        dispatch(SetHold(holdcart));
      });
    }
  };
};

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  ; // add zero in front of numbers < 10

  return i;
}

function getCurrentDate() {
  var d = new Date();
  var date = d.getDate();
  var m = d.getMonth();
  var y = d.getFullYear();
  var month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var full_date = month_list[m] + ' ' + date + ' ' + y;
  return full_date;
}

function getCurrentTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var full_time = h + ":" + m + ":" + s;
  return full_time;
}

var addToHold = function addToHold(note, current_cart, cart_list) {
  return function (dispatch, getState) {
    if (cart_list) {
      var Hnote = note;
      var fake_cart = current_cart;
      var Hdate = getCurrentDate();
      var Htime = getCurrentTime();
      var holdObj = {
        id: fake_cart,
        cart_id: fake_cart,
        note: Hnote,
        date: Hdate,
        time: Htime
      };
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_holds').put(holdObj).then(function (bool) {
        loadHoldCartProducts().then(function (res) {
          if (res) {
            var holdData = {
              list: res,
              isFetching: 1
            };
            jQuery.confirm({
              title: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].success_text,
              content: _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].text_cart_add,
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
            dispatch(SetHold(holdData));
          }
        });
      });
    }
  };
};
var RemoveHoldData = function RemoveHoldData(ccart) {
  return function (dispatch) {
    _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_holds').where("id").equals(parseInt(ccart)).delete().then(function (result) {
      if (result) {
        loadHoldCartProducts().then(function (dbhold) {
          if (dbhold) {
            var holdcart = {
              list: dbhold,
              isFetching: 1
            };
          } else {
            var holdcart = {
              list: '',
              isFetching: 1
            };
          }

          dispatch(SetHold(holdcart));
          jQuery(".pos-left-wrap ul li").removeClass("pos-active").eq(0).addClass("pos-active");
          jQuery(".pos-body-wrapper > .pos-tabContent").removeClass("pos-active");
          jQuery(".pos-body-wrapper > .pos-tabContent#pos-home").addClass("pos-active");
          jQuery(".pos-body-wrapper > .pos-tabContent#pos-cart").addClass("pos-active");
          jQuery("#search-pos-product").attr("disabled", false);
          jQuery("#search-pos-product").css("cursor", "text");
        });
      }
    });
  };
};

function loadHoldCartProducts() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_holds').toArray();
}

var RemoveCartProduct = function RemoveCartProduct(current_cart, remove_id) {
  var modifiedWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return function (dispatch, getState) {
    if (remove_id) {
      var res = _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_cart').where("cart_id").equals(current_cart).toArray().then(function (response) {
        if (response) {
          if (response[0].cart != undefined) {
            var remover = response[0].cart;
            var final_object = remover.filter(function (item) {
              if (item.product_id == remove_id && modifiedWeight == item.boughtWeight) {
                return false;
              } else {
                return true;
              }
            });

            if (final_object) {
              Update_Cart(final_object, current_cart).then(function (updated) {
                if (updated) {
                  loadCartProducts().then(function (dbcart) {
                    if (dbcart) {
                      var final_total = get_cart_total(dbcart, getState());
                      var cart = {
                        list: dbcart,
                        isFetching: 1,
                        total: final_total
                      };
                    } else {
                      var _final_total = get_empty_cart_total(getState().currency.default.symbol);

                      var cart = {
                        list: '',
                        isFetching: 1,
                        total: _final_total
                      };
                    }

                    dispatch(SetHold(cart));
                  });
                }
              });
            }
          }
        }
      });
    }
  };
};

function UpdateHold(final_object, current_cart) {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_cart').where("cart_id").equals(current_cart).modify({
    cart: final_object
  });
}

var ModifyCart = function ModifyCart(qty, current_cart, product_id) {
  var var_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return function (dispatch, getState) {
    if (product_id) {
      _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_products').where("product_id").equals(product_id).toArray().then(function (dbproducts) {
        if (dbproducts) {
          loadCartProducts().then(function (data) {
            if (data.length <= 0) var send_data = [];else var send_data = data;
            var result = ModifyProductToIndexDb(send_data, current_cart, dbproducts[0], qty, var_id = '');

            if (result) {
              loadCartProducts().then(function (cdata) {
                if (cdata) {
                  var final_total = get_cart_total(cdata, getState());
                  var cart = {
                    list: cdata,
                    isFetching: 1,
                    total: final_total
                  };
                } else {
                  var _final_total2 = get_empty_cart_total(getState().currency.default.symbol);

                  var cart = {
                    list: cdata,
                    isFetching: 1,
                    total: _final_total2
                  };
                }

                dispatch(SetHold(cart));
              });
            }
          });
        }
      });
    }
  };
};

/***/ }),

/***/ "./src/js/actions/tax/index.js":
/*!*************************************!*\
  !*** ./src/js/actions/tax/index.js ***!
  \*************************************/
/*! exports provided: POS_TAX, setTax, taxAccount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_TAX", function() { return POS_TAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTax", function() { return setTax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taxAccount", function() { return taxAccount; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");




var POS_TAX = 'POS_TAX';
var setTax = function setTax(tax) {
  return {
    type: POS_TAX,
    tax: tax
  };
};
var taxAccount = function taxAccount() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      isTaxDataExists().then(function (result) {
        if (result.length <= 0) {
          AjAxGetAllTaxWC().then(function (response) {
            if (response) {
              var Tax = {
                list: response,
                isFetching: 1
              };
              dispatch(setTax(Tax));
            }
          });
        } else {
          var Tax = {
            list: result,
            isFetching: 1
          };
          dispatch(setTax(Tax));
        }
      });
    }
  };
};

function AjAxGetAllTaxWC() {
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_tax_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_TAX_DETAILS_ENDPOINT, {}).then(function (json) {
      document.querySelector('#loader').style.display = 'none';
      var taxObj = {};

      if (json) {
        jQuery.each(json, function (i, val) {
          taxObj = {
            id: i,
            rate: val.rate,
            shipping: val.shipping,
            label: val.label,
            compound: val.compound
          };

          if (Object.entries(taxObj).length > 0) {
            _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_tax.put(taxObj).then(function (res) {
              resolve(json);
            });
          }
        });
      }
    });
  });
}

function isTaxDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_tax').toArray().then(function (taxData) {
    return taxData;
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9jdXJyZW50Y2FydC9pbmRleC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9kaXNjb3VudC9pbmRleC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9ob2xkL2luZGV4LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9hY3Rpb25zL3RheC9pbmRleC5qcyJdLCJuYW1lcyI6WyJQT1NfQ1VSUkVOVF9DQVJUIiwic2V0Q3VycmVudENhcnQiLCJjdXJyZW50X2NhcnQiLCJ0eXBlIiwiZ2V0Q3VycmVudENhcnQiLCJkaXNwYXRjaCIsInJlcyIsImRhdGFiYXNlIiwidGFibGUiLCJ0b0FycmF5IiwidGhlbiIsInJlc3BvbnNlIiwibGVuZ3RoIiwiaWQiLCJjYXJ0X2lkIiwicHV0IiwiY3VjYXJ0IiwibWFwIiwidmFsIiwiaSIsInVwZGF0ZUN1cnJlbnRDYXJ0IiwidXBkYXRlIiwicGFyc2VJbnQiLCJQT1NfRElTQ09VTlQiLCJzZXREaXNjb3VudCIsImRpc2NvdW50IiwiZ2V0QWxsRGlzY291bnRXQyIsImxpc3QiLCJpc0ZldGNoaW5nIiwiTW9kaWZ5RGlzY291bnQiLCJhY3QiLCJkaXNjT2JqIiwiZGlzIiwid2hlcmUiLCJlcXVhbHMiLCJkZWxldGUiLCJQT1NfSE9MRCIsIlNldEhvbGQiLCJob2xkIiwiZ2V0QWxsSG9sZENhcnRQcm9kdWN0cyIsInVzZXIiLCJhcGlmX3NjcmlwdCIsImxvZ2dlZF9pbiIsImxvYWRIb2xkQ2FydFByb2R1Y3RzIiwiZGJob2xkIiwiaG9sZGNhcnQiLCJjaGVja1RpbWUiLCJnZXRDdXJyZW50RGF0ZSIsImQiLCJEYXRlIiwiZGF0ZSIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtb250aF9saXN0IiwiZnVsbF9kYXRlIiwiZ2V0Q3VycmVudFRpbWUiLCJ0b2RheSIsImgiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsImZ1bGxfdGltZSIsImFkZFRvSG9sZCIsIm5vdGUiLCJjYXJ0X2xpc3QiLCJnZXRTdGF0ZSIsIkhub3RlIiwiZmFrZV9jYXJ0IiwiSGRhdGUiLCJIdGltZSIsImhvbGRPYmoiLCJ0aW1lIiwiYm9vbCIsImhvbGREYXRhIiwialF1ZXJ5IiwiY29uZmlybSIsInRpdGxlIiwidHJhbnNsYXRpb24iLCJzdWNjZXNzX3RleHQiLCJjb250ZW50IiwidGV4dF9jYXJ0X2FkZCIsImF1dG9DbG9zZSIsImVzY2FwZUtleSIsImJ1dHRvbnMiLCJjYW5jZWxBY3Rpb24iLCJ0ZXh0IiwiY2FuY2VsX2J0bl90ZXh0IiwiYnRuQ2xhc3MiLCJSZW1vdmVIb2xkRGF0YSIsImNjYXJ0IiwicmVzdWx0IiwicmVtb3ZlQ2xhc3MiLCJlcSIsImFkZENsYXNzIiwiYXR0ciIsImNzcyIsIlJlbW92ZUNhcnRQcm9kdWN0IiwicmVtb3ZlX2lkIiwibW9kaWZpZWRXZWlnaHQiLCJjYXJ0IiwidW5kZWZpbmVkIiwicmVtb3ZlciIsImZpbmFsX29iamVjdCIsImZpbHRlciIsIml0ZW0iLCJwcm9kdWN0X2lkIiwiYm91Z2h0V2VpZ2h0IiwiVXBkYXRlX0NhcnQiLCJ1cGRhdGVkIiwibG9hZENhcnRQcm9kdWN0cyIsImRiY2FydCIsImZpbmFsX3RvdGFsIiwiZ2V0X2NhcnRfdG90YWwiLCJ0b3RhbCIsImdldF9lbXB0eV9jYXJ0X3RvdGFsIiwiY3VycmVuY3kiLCJkZWZhdWx0Iiwic3ltYm9sIiwiVXBkYXRlSG9sZCIsIm1vZGlmeSIsIk1vZGlmeUNhcnQiLCJxdHkiLCJ2YXJfaWQiLCJkYnByb2R1Y3RzIiwiZGF0YSIsInNlbmRfZGF0YSIsIk1vZGlmeVByb2R1Y3RUb0luZGV4RGIiLCJjZGF0YSIsIlBPU19UQVgiLCJzZXRUYXgiLCJ0YXgiLCJ0YXhBY2NvdW50IiwiaXNUYXhEYXRhRXhpc3RzIiwiQWpBeEdldEFsbFRheFdDIiwiVGF4IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJsb2FkaW5nX3RheF90ZXh0Iiwic3R5bGUiLCJkaXNwbGF5IiwiUE9TUG9zdFJlcXVlc3QiLCJ3a3djcG9zX3ZhcmlhYmxlIiwiV0tfR0VUX1RBWF9ERVRBSUxTX0VORFBPSU5UIiwianNvbiIsInRheE9iaiIsImVhY2giLCJyYXRlIiwic2hpcHBpbmciLCJsYWJlbCIsImNvbXBvdW5kIiwiT2JqZWN0IiwiZW50cmllcyIsInBvc190YXgiLCJ0YXhEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxJQUFNQSxnQkFBZ0IsR0FBRyxrQkFBekI7QUFFQSxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUVDLFlBQUYsRUFBb0I7QUFFaEQsU0FBTztBQUNMQyxRQUFJLEVBQUVILGdCQUREO0FBRUxFLGdCQUFZLEVBQVpBO0FBRkssR0FBUDtBQUtELENBUE07QUFTQSxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFFOUMsUUFBSUMsR0FBRyxHQUFHQyxpREFBUSxDQUFDQyxLQUFULENBQWUsa0JBQWYsRUFBbUNDLE9BQW5DLEdBQTZDQyxJQUE3QyxDQUFrRCxVQUFDQyxRQUFELEVBQWM7QUFFdEUsVUFBSUEsUUFBUSxDQUFDQyxNQUFULElBQWtCLENBQXRCLEVBQTBCO0FBRXRCLFlBQUlWLFlBQVksR0FBRztBQUNqQlcsWUFBRSxFQUFHLENBRFk7QUFFakJDLGlCQUFPLEVBQUc7QUFGTyxTQUFuQjtBQUtBUCx5REFBUSxDQUFDQyxLQUFULENBQWUsa0JBQWYsRUFBbUNPLEdBQW5DLENBQXVDYixZQUF2QyxFQUFxRFEsSUFBckQsQ0FBMkQsVUFBRUMsUUFBRixFQUFnQjtBQUV2RSxjQUFJSyxNQUFNLEdBQUcsQ0FBYjtB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QUFFM0JzSSxnQkFBTSxHQUFHO0FBQ1AzSSxjQUFFLEVBQUdNLENBREU7QUFFUHVJLGdCQUFJLEVBQUd4SSxHQUFHLENBQUN3SSxJQUZKO0FBR1BDLG9CQUFRLEVBQUd6SSxHQUFHLENBQUN5SSxRQUhSO0FBSVBDLGlCQUFLLEVBQUcxSSxHQUFHLENBQUMwSSxLQUpMO0FBS1BDLG9CQUFRLEVBQUczSSxHQUFHLENBQUMySTtBQUxSLFdBQVQ7O0FBUUEsY0FBSUMsTUFBTSxDQUFDQyxPQUFQLENBQWVQLE1BQWYsRUFBdUI1SSxNQUF2QixHQUFnQyxDQUFwQyxFQUF3QztBQUV0Q0wsNkRBQVEsQ0FBQ3lKLE9BQVQsQ0FBaUJqSixHQUFqQixDQUFxQnlJLE1BQXJCLEVBQTZCOUksSUFBN0IsQ0FBa0MsVUFBQ0osR0FBRCxFQUFRO0FBRXhDc0kscUJBQU8sQ0FBQ1csSUFBRCxDQUFQO0FBRUQsYUFKRDtBQU1EO0FBRUYsU0FwQkQ7QUFzQkQ7QUFFRixLQWhDRDtBQWtDRCxHQXhDTSxDQUFQO0FBMENEOztBQUVELFNBQVNmLGVBQVQsR0FBMkI7QUFFekIsU0FBT2pJLGlEQUFRLENBQUNDLEtBQVQsQ0FBZSxTQUFmLEVBQTBCQyxPQUExQixHQUFvQ0MsSUFBcEMsQ0FBMEMsVUFBQ3VKLE9BQUQsRUFBYTtBQUU1RCxXQUFPQSxPQUFQO0FBRUQsR0FKTSxDQUFQO0FBTUQsQyIsImZpbGUiOiIuL2Fzc2V0cy9kaXN0L2N1c3RvbWVyfmhvbWV+b3JkZXJ+cGF5L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRhdGFiYXNlIGZyb20gJy4vLi4vLi4vZGF0YWJhc2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU19DVVJSRU5UX0NBUlQgPSAnUE9TX0NVUlJFTlRfQ0FSVCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Q3VycmVudENhcnQgPSAoIGN1cnJlbnRfY2FydCApID0+IHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBPU19DVVJSRU5UX0NBUlQsXHJcbiAgICBjdXJyZW50X2NhcnRcclxuICB9XHJcbiAgXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENhcnQgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHsgXHJcblxyXG4gICAgbGV0IHJlcyA9IGRhdGFiYXNlLnRhYmxlKCdwb3NfY3VycmVudF9jYXJ0JykudG9BcnJheSgpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGlmKCByZXNwb25zZS5sZW5ndGggPD0wICkgeyBcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB7XHJcbiAgICAgICAgICAgICAgaWQgOiAwLFxyXG4gICAgICAgICAgICAgIGNhcnRfaWQgOiAwLFxyXG4gICAgICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfY3VycmVudF9jYXJ0JykucHV0KGN1cnJlbnRfY2FydCkudGhlbiggKCByZXNwb25zZSApID0+IHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGN1Y2FydCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0Q3VycmVudENhcnQoY3VjYXJ0KSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBsZXQgY2FydF9pZCA9IHJlc3BvbnNlLm1hcCggKHZhbCxpKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdmFsLmNhcnRfaWQ7XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZGlzcGF0Y2goc2V0Q3VycmVudENhcnQoY2FydF9pZFswXSkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59OyBcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDdXJyZW50Q2FydCA9IChjdXJyZW50X2NhcnQpID0+IChkaXNwYXRjaCkgPT4geyBcclxuXHJcbiAgZGF0YWJhc2UudGFibGUoJ3Bvc19jdXJyZW50X2NhcnQnKS51cGRhdGUoMCwgeyBjYXJ0X2lkIDogcGFyc2VJbnQoY3VycmVudF9jYXJ0KX0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICBkaXNwYXRjaChzZXRDdXJyZW50Q2FydChwYXJzZUludChjdXJyZW50X2NhcnQpKSk7XHJcblxyXG4gIH0pO1xyXG5cclxufTsgIiwiaW1wb3J0IGRhdGFiYXNlIGZyb20gJy4vLi4vLi4vZGF0YWJhc2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU19ESVNDT1VOVCA9ICdQT1NfRElTQ09VTlQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldERpc2NvdW50ID0gKCBkaXNjb3VudCApID0+IHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBPU19ESVNDT1VOVCxcclxuICAgIGRpc2NvdW50XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxEaXNjb3VudFdDID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XHJcblxyXG4gICAgZGF0YWJhc2UudGFibGUoJ3Bvc19kaXNjb3VudCcpLnRvQXJyYXkoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cclxuICAgICAgICBpZiggcmVzcG9uc2UgKSB7XHJcblxyXG4gICAgICAgICAgdmFyIGRpc2NvdW50ID0ge1xyXG4gICAgICAgICAgICBsaXN0IDogcmVzcG9uc2UsXHJcbiAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxXHJcbiAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICB2YXIgZGlzY291bnQgPSB7XHJcbiAgICAgICAgICAgIGxpc3QgOiAnJyxcclxuICAgICAgICAgICAgaXNGZXRjaGluZyA6IDFcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGRpc3BhdGNoKHNldERpc2NvdW50KGRpc2NvdW50KSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59OyBcclxuXHJcbmV4cG9ydCBjb25zdCBNb2RpZnlEaXNjb3VudCA9ICggYWN0LCBkaXNjb3VudCwgY3VycmVudF9jYXJ0ICkgPT4gKCBkaXNwYXRjaCApID0+IHtcclxuXHJcbiAgaWYoIGFjdCA9PSAnYWRkJyApIHtcclxuXHJcbiAgICB2YXIgZGlzY09iaiA9IHtcclxuICAgICAgaWQgOiBjdXJyZW50X2NhcnQsIFxyXG4gICAgICBjYXJ0X2lkIDogY3VycmVudF9jYXJ0LFxyXG4gICAgICBkaXNjb3VudCA6IGRpc2NvdW50IFxyXG4gICAgfSBcclxuXHJcbiAgICBkYXRhYmFzZS50YWJsZSgncG9zX2Rpc2NvdW50JykucHV0KGRpc2NPYmopLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBkaXMgPSB7XHJcbiAgICAgICAgICBsaXN0IDogW2Rpc2NPYmpdLCBcclxuICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxIFxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGRpc3BhdGNoKHNldERpc2NvdW50KCBkaXMgKSk7IFxyXG5cclxuICAgIH0pO1xyXG5cclxuICB9IGVsc2UgaWYoIGFjdCA9PSAnZGVsZXRlJyApIHtcclxuXHJcbiAgICBkYXRhYmFzZS50YWJsZSgncG9zX2Rpc2NvdW50Jykud2hlcmUoXCJjYXJ0X2lkXCIpLmVxdWFscyhjdXJyZW50X2NhcnQpLmRlbGV0ZSgpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBkaXMgPSB7XHJcbiAgICAgICAgICBsaXN0IDogJycsIFxyXG4gICAgICAgICAgaXNGZXRjaGluZyA6IDEgXHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZGlzcGF0Y2goc2V0RGlzY291bnQoIGRpcyApKTsgXHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi8uLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU19IT0xEID0gJ1BPU19IT0xEJzsgIFxyXG5cclxuZXhwb3J0IGNvbnN0IFNldEhvbGQgPSAoIGhvbGQgKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBQT1NfSE9MRCxcclxuICAgICAgICBob2xkXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbEhvbGRDYXJ0UHJvZHVjdHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjsgXHJcblxyXG4gICAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG5cclxuICAgICAgICBsb2FkSG9sZENhcnRQcm9kdWN0cygpLnRoZW4oIChkYmhvbGQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGRiaG9sZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBob2xkY2FydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0IDogZGJob2xkLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgeyBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaG9sZGNhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGlzcGF0Y2goU2V0SG9sZChob2xkY2FydCkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59OyBcclxuXHJcbmZ1bmN0aW9uIGNoZWNrVGltZShpKSB7XHJcbiAgICBpZiAoaSA8IDEwKSB7aSA9IFwiMFwiICsgaX07ICAvLyBhZGQgemVybyBpbiBmcm9udCBvZiBudW1iZXJzIDwgMTBcclxuICAgIHJldHVybiBpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZSgpIHtcclxuICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgIHZhciBkYXRlID0gZC5nZXREYXRlKCk7XHJcbiAgICB2YXIgbSA9IGQuZ2V0TW9udGgoKTtcclxuICAgIHZhciB5ID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG1vbnRoX2xpc3QgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcbiAgICB2YXIgZnVsbF9kYXRlID0gbW9udGhfbGlzdFttXSArICcgJyArIGRhdGUgKyAnICcgKyB5O1xyXG4gICAgcmV0dXJuIGZ1bGxfZGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUoKSB7XHJcbiAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGggPSB0b2RheS5nZXRIb3VycygpO1xyXG4gICAgdmFyIG0gPSB0b2RheS5nZXRNaW51dGVzKCk7XHJcbiAgICB2YXIgcyA9IHRvZGF5LmdldFNlY29uZHMoKTtcclxuICAgIG0gPSBjaGVja1RpbWUobSk7XHJcbiAgICBzID0gY2hlY2tUaW1lKHMpO1xyXG4gICAgdmFyIGZ1bGxfdGltZSA9IGggKyBcIjpcIiArIG0gKyBcIjpcIiArIHM7XHJcbiAgICByZXR1cm4gZnVsbF90aW1lO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkVG9Ib2xkID0gKCBub3RlLCBjdXJyZW50X2NhcnQsIGNhcnRfbGlzdCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4geyBcclxuXHJcbiAgICBpZiggY2FydF9saXN0ICkge1xyXG5cclxuICAgICAgICBsZXQgSG5vdGUgPSBub3RlO1xyXG4gICAgICAgIGxldCBmYWtlX2NhcnQgPSBjdXJyZW50X2NhcnQ7XHJcbiAgICAgICAgbGV0IEhkYXRlID0gZ2V0Q3VycmVudERhdGUoKTtcclxuICAgICAgICBsZXQgSHRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xyXG5cclxuICAgICAgICB2YXIgaG9sZE9iaiA9IHsgXHJcbiAgICAgICAgICAgIGlkIDogZmFrZV9jYXJ0LFxyXG4gICAgICAgICAgICBjYXJ0X2lkOiBmYWtlX2NhcnQsXHJcbiAgICAgICAgICAgIG5vdGU6IEhub3RlLFxyXG4gICAgICAgICAgICBkYXRlOiBIZGF0ZSxcclxuICAgICAgICAgICAgdGltZTogSHRpbWUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2hvbGRzJykucHV0KGhvbGRPYmopLnRoZW4oIChib29sKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsb2FkSG9sZENhcnRQcm9kdWN0cygpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCByZXMgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob2xkRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA6IHJlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGZXRjaGluZyA6IDFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi5zdWNjZXNzX3RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLnRleHRfY2FydF9hZGQgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6ICdjYW5jZWxBY3Rpb258MzAwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdncmVlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZUtleTogJ2NhbmNlbEFjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uLmNhbmNlbF9idG5fdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ2J0bi1ncmVlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goIFNldEhvbGQoaG9sZERhdGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlbW92ZUhvbGREYXRhID0gKGNjYXJ0KSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgICBkYXRhYmFzZS50YWJsZSgncG9zX2hvbGRzJykud2hlcmUoXCJpZFwiKS5lcXVhbHMocGFyc2VJbnQoY2NhcnQpKS5kZWxldGUoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBpZiggcmVzdWx0ICkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbG9hZEhvbGRDYXJ0UHJvZHVjdHMoKS50aGVuKCAoZGJob2xkKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGJob2xkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBob2xkY2FydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA6IGRiaG9sZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGZXRjaGluZyA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBob2xkY2FydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0ZldGNoaW5nIDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChTZXRIb2xkKGhvbGRjYXJ0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLnBvcy1sZWZ0LXdyYXAgdWwgbGlcIikucmVtb3ZlQ2xhc3MoXCJwb3MtYWN0aXZlXCIpLmVxKDApLmFkZENsYXNzKFwicG9zLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5wb3MtYm9keS13cmFwcGVyID4gLnBvcy10YWJDb250ZW50XCIpLnJlbW92ZUNsYXNzKFwicG9zLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5wb3MtYm9keS13cmFwcGVyID4gLnBvcy10YWJDb250ZW50I3Bvcy1ob21lXCIpLmFkZENsYXNzKFwicG9zLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5wb3MtYm9keS13cmFwcGVyID4gLnBvcy10YWJDb250ZW50I3Bvcy1jYXJ0XCIpLmFkZENsYXNzKFwicG9zLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShcIiNzZWFyY2gtcG9zLXByb2R1Y3RcIikuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShcIiNzZWFyY2gtcG9zLXByb2R1Y3RcIikuY3NzKFwiY3Vyc29yXCIsIFwidGV4dFwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIFxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEhvbGRDYXJ0UHJvZHVjdHMoKSB7XHJcblxyXG4gICAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3NfaG9sZHMnKS50b0FycmF5KCk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUmVtb3ZlQ2FydFByb2R1Y3QgPSAoIGN1cnJlbnRfY2FydCwgcmVtb3ZlX2lkLCBtb2RpZmllZFdlaWdodCA9ICcnICkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4geyBcclxuXHJcbiAgICBpZiggcmVtb3ZlX2lkICkge1xyXG5cclxuICAgICAgICBsZXQgcmVzID0gZGF0YWJhc2UudGFibGUoJ3Bvc19jYXJ0Jykud2hlcmUoXCJjYXJ0X2lkXCIpLmVxdWFscyhjdXJyZW50X2NhcnQpLnRvQXJyYXkoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIHJlc3BvbnNlWzBdLmNhcnQgIT0gdW5kZWZpbmVkICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlciA9IHJlc3BvbnNlWzBdLmNhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbF9vYmplY3QgPSByZW1vdmVyLmZpbHRlcigoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGl0ZW0ucHJvZHVjdF9pZCA9PSByZW1vdmVfaWQgJiYgbW9kaWZpZWRXZWlnaHQgPT0gaXRlbS5ib3VnaHRXZWlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGZpbmFsX29iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVwZGF0ZV9DYXJ0KGZpbmFsX29iamVjdCwgY3VycmVudF9jYXJ0KS50aGVuKGZ1bmN0aW9uICh1cGRhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHVwZGF0ZWQgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZENhcnRQcm9kdWN0cygpLnRoZW4oIChkYmNhcnQpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRiY2FydCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbF90b3RhbCA9IGdldF9jYXJ0X3RvdGFsKGRiY2FydCwgZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgOiBkYmNhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGZXRjaGluZyA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwgOiBmaW5hbF90b3RhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluYWxfdG90YWwgPSBnZXRfZW1wdHlfY2FydF90b3RhbChnZXRTdGF0ZSgpLmN1cnJlbmN5LmRlZmF1bHQuc3ltYm9sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsIDogZmluYWxfdG90YWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goU2V0SG9sZChjYXJ0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBVcGRhdGVIb2xkKCBmaW5hbF9vYmplY3QsIGN1cnJlbnRfY2FydCApIHtcclxuXHJcbiAgICByZXR1cm4gZGF0YWJhc2UudGFibGUoJ3Bvc19jYXJ0Jykud2hlcmUoXCJjYXJ0X2lkXCIpLmVxdWFscyhjdXJyZW50X2NhcnQpLm1vZGlmeSggeyBjYXJ0IDogZmluYWxfb2JqZWN0IH0gKTtcclxufVxyXG4gXHJcblxyXG5leHBvcnQgY29uc3QgTW9kaWZ5Q2FydCA9ICggcXR5LCBjdXJyZW50X2NhcnQsIHByb2R1Y3RfaWQsIHZhcl9pZCA9ICcnICkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4geyBcclxuICBpZiggcHJvZHVjdF9pZCApIHtcclxuXHJcbiAgICBkYXRhYmFzZS50YWJsZSgncG9zX3Byb2R1Y3RzJykud2hlcmUoXCJwcm9kdWN0X2lkXCIpLmVxdWFscyhwcm9kdWN0X2lkKS50b0FycmF5KCkudGhlbiggKGRicHJvZHVjdHMpID0+IHtcclxuICAgICAgXHJcbiAgICAgICAgaWYoIGRicHJvZHVjdHMgKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgbG9hZENhcnRQcm9kdWN0cygpLnRoZW4oIChkYXRhKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5sZW5ndGggPD0gMCApXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRfZGF0YSA9IFtdOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kX2RhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gTW9kaWZ5UHJvZHVjdFRvSW5kZXhEYiggc2VuZF9kYXRhLCBjdXJyZW50X2NhcnQsIGRicHJvZHVjdHNbMF0sIHF0eSwgdmFyX2lkID0gJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiggcmVzdWx0ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZENhcnRQcm9kdWN0cygpLnRoZW4oKGNkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbF90b3RhbCA9IGdldF9jYXJ0X3RvdGFsKGNkYXRhLCBnZXRTdGF0ZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgOiBjZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGZXRjaGluZyA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsIDogZmluYWxfdG90YWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbF90b3RhbCA9IGdldF9lbXB0eV9jYXJ0X3RvdGFsKGdldFN0YXRlKCkuY3VycmVuY3kuZGVmYXVsdC5zeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0IDogY2RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCA6IGZpbmFsX3RvdGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChTZXRIb2xkKGNhcnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiBcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICB9KTtcclxuICBcclxuICAgIH1cclxuICAgIFxyXG59O1xyXG5cclxuICAiLCIgXHJcbmltcG9ydCBkYXRhYmFzZSBmcm9tICcuLy4uLy4uL2RhdGFiYXNlJztcclxuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbic7XHJcbmltcG9ydCB3a3djcG9zX3ZhcmlhYmxlIGZyb20gJy4vLi4vLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUE9TUG9zdFJlcXVlc3QgfSBmcm9tICcuLy4uLy4uL2hhc2gnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU19UQVggPSAnUE9TX1RBWCc7IFxyXG4gXHJcbmV4cG9ydCBjb25zdCBzZXRUYXggPSAoIHRheCApID0+IHtcclxuIFxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQT1NfVEFYLFxyXG4gICAgdGF4XHJcbiAgfVxyXG59O1xyXG5cclxuICBcclxuZXhwb3J0IGNvbnN0IHRheEFjY291bnQgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgbGV0IHVzZXIgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW47IFxyXG4gIFxyXG4gIGlmICh1c2VyICE9IFwiXCIpIHtcclxuICAgIFxyXG4gICAgaXNUYXhEYXRhRXhpc3RzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICBpZiggcmVzdWx0Lmxlbmd0aCA8PSAwICkge1xyXG4gICAgICBcclxuICAgICAgICBBakF4R2V0QWxsVGF4V0MoKS50aGVuKCAocmVzcG9uc2UpID0+IHtcclxuICBcclxuICAgICAgICAgIGlmKCByZXNwb25zZSApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBUYXggPSB7XHJcblxyXG4gICAgICAgICAgICAgIGxpc3QgOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICBpc0ZldGNoaW5nIDogMSxcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldFRheChUYXgpKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGxldCBUYXggPSB7XHJcblxyXG4gICAgICAgICAgbGlzdCA6IHJlc3VsdCxcclxuICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3BhdGNoKHNldFRheChUYXgpKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH1cclxuICBcclxuIH07IFxyXG4gIFxyXG4gZnVuY3Rpb24gQWpBeEdldEFsbFRheFdDKCkge1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRpbmctdGV4dCcgKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi5sb2FkaW5nX3RheF90ZXh0O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGVyJyApLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIFBPU1Bvc3RSZXF1ZXN0KCB3a3djcG9zX3ZhcmlhYmxlLldLX0dFVF9UQVhfREVUQUlMU19FTkRQT0lOVCwge30gKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgbGV0IHRheE9iaiA9IHt9O1xyXG5cclxuICAgICAgaWYoIGpzb24gKSB7XHJcblxyXG4gICAgICAgIGpRdWVyeS5lYWNoKGpzb24sIChpLHZhbCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0YXhPYmogPSB7XHJcbiAgICAgICAgICAgIGlkIDogaSxcclxuICAgICAgICAgICAgcmF0ZSA6IHZhbC5yYXRlLFxyXG4gICAgICAgICAgICBzaGlwcGluZyA6IHZhbC5zaGlwcGluZyxcclxuICAgICAgICAgICAgbGFiZWwgOiB2YWwubGFiZWwsXHJcbiAgICAgICAgICAgIGNvbXBvdW5kIDogdmFsLmNvbXBvdW5kLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiggT2JqZWN0LmVudHJpZXModGF4T2JqKS5sZW5ndGggPiAwICkge1xyXG5cclxuICAgICAgICAgICAgZGF0YWJhc2UucG9zX3RheC5wdXQodGF4T2JqKS50aGVuKChyZXMpID0+e1xyXG5cclxuICAgICAgICAgICAgICByZXNvbHZlKGpzb24pO1xyXG5cclxuICAgICAgICAgICAgfSk7IFxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfSApO1xyXG5cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVGF4RGF0YUV4aXN0cygpIHtcclxuXHJcbiAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3NfdGF4JykudG9BcnJheSgpLnRoZW4oICh0YXhEYXRhKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIHRheERhdGE7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9