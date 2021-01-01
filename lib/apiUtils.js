"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch_func = exports.get_func = exports.authentication = exports.updateAuthHost = exports.updateHost = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var hostName = null;
var authHostName = null;

var updateHost = function updateHost(name) {
  hostName = name;
};

exports.updateHost = updateHost;

var updateAuthHost = function updateAuthHost(name) {
  authHostName = name;
};

exports.updateAuthHost = updateAuthHost;

var generateBody = function generateBody(obj) {
  if (obj === null || obj === undefined) {
    return "";
  }

  return Object.keys(obj).map(function (key) {
    return obj[key] === undefined || obj[key] === null ? null : Array.isArray(obj[key]) ? obj[key].map(function (ele) {
      return key + "[]=" + ele;
    }).join("&") : key + "=" + obj[key];
  }).filter(function (str) {
    return str !== null;
  }).join("&");
};

var authentication = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clientId, clientSecret, contractId, scopes) {
    var buff, base64str, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buff = Buffer.from([clientId, clientSecret].join(":"));
            base64str = buff.toString('base64');
            _context.next = 4;
            return (0, _nodeFetch["default"])("https://".concat(authHostName, "/app/").concat(contractId, "/token"), {
              method: 'post',
              headers: {
                "Authorization": "Basic " + base64str,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: generateBody({
                "grant_type": "client_credentials",
                "scope": scopes.join(" ")
              })
            });

          case 4:
            res = _context.sent;

            if (!(res.status !== 200)) {
              _context.next = 7;
              break;
            }

            throw new Error("AuthenticationFailed");

          case 7:
            _context.next = 9;
            return res.json();

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authentication(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.authentication = authentication;

var actual_call = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(requst_url, options) {
    var res, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _nodeFetch["default"])(requst_url, options);

          case 2:
            res = _context2.sent;

            if (!(res.status === 200)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return res.json();

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            _context2.next = 9;
            return res.json();

          case 9:
            response = _context2.sent;
            return _context2.abrupt("return", {
              result: false,
              status: res.status,
              payload: response
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function actual_call(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var api_call = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(contractId, path, access_token, method) {
    var data,
        full_path,
        requst_url,
        options,
        query,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : {};
            full_path = "https://".concat(hostName, "/").concat(contractId, "/pos/");
            requst_url = full_path + path;
            options = {
              method: method,
              headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': "application/json",
                'Accept': "application/json"
              }
            };

            if (method === "GET") {
              query = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
              }).join('&');
              requst_url = requst_url + "?" + query;
            } else {
              options.body = JSON.stringify(data);
            }

            _context3.next = 7;
            return actual_call(requst_url, options);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function api_call(_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var get_func = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contractId, path, access_token, data) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return api_call(contractId, path, access_token, "GET", data);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function get_func(_x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

exports.get_func = get_func;

var patch_func = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(contractId, path, access_token, data) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return api_call(contractId, path, access_token, "PATCH", data);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function patch_func(_x15, _x16, _x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}();

exports.patch_func = patch_func;