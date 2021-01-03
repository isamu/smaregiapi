"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delete_func = exports.patch_func = exports.post_func = exports.get_func = exports.authentication = exports.updateAuthHost = exports.updateHost = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let hostName = null;
let authHostName = null;

const updateHost = name => {
  hostName = name;
};

exports.updateHost = updateHost;

const updateAuthHost = name => {
  authHostName = name;
};

exports.updateAuthHost = updateAuthHost;

const generateBody = obj => {
  if (obj === null || obj === undefined) {
    return "";
  }

  return Object.keys(obj).map(key => {
    return obj[key] === undefined || obj[key] === null ? null : Array.isArray(obj[key]) ? obj[key].map(ele => {
      return key + "[]=" + ele;
    }).join("&") : key + "=" + obj[key];
  }).filter(str => {
    return str !== null;
  }).join("&");
};

const authentication = async (clientId, clientSecret, contractId, scopes) => {
  const buff = Buffer.from([clientId, clientSecret].join(":"));
  const base64str = buff.toString('base64');
  const res = await (0, _nodeFetch.default)(`https://${authHostName}/app/${contractId}/token`, {
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

  if (res.status !== 200) {
    throw new Error("AuthenticationFailed");
  }

  return await res.json();
};

exports.authentication = authentication;

const actual_call = async (requst_url, options) => {
  const res = await (0, _nodeFetch.default)(requst_url, options);

  if (res.status === 200) {
    try {
      return await res.json();
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  const resres = await res.text(); // const response = await res.json();

  return {
    result: false,
    status: res.status //    payload: response,

  };
};

const api_call = async (contractId, path, access_token, method, data = {}) => {
  const full_path = `https://${hostName}/${contractId}/pos/`;
  let requst_url = full_path + path;
  const options = {
    method,
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': "application/json",
      'Accept': "application/json"
    }
  };

  if (method === "GET") {
    const query = Object.keys(data).map(k => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
    requst_url = requst_url + "?" + query;
  } else {
    options.body = JSON.stringify(data);
  }

  return await actual_call(requst_url, options);
};

const get_func = async (contractId, path, access_token, data) => {
  return await api_call(contractId, path, access_token, "GET", data);
};

exports.get_func = get_func;

const post_func = async (contractId, path, access_token, data) => {
  return await api_call(contractId, path, access_token, "POST", data);
};

exports.post_func = post_func;

const patch_func = async (contractId, path, access_token, data) => {
  return await api_call(contractId, path, access_token, "PATCH", data);
};

exports.patch_func = patch_func;

const delete_func = async (contractId, path, access_token, data) => {
  return await api_call(contractId, path, access_token, "DELETE", data);
};

exports.delete_func = delete_func;