
[![npm version](https://badge.fury.io/js/smaregiapi.svg)](https://badge.fury.io/js/smaregiapi)

# Smaregi API

Api tool for https://smaregi.jp/ 

# Install

```
npm install smaregiapi
```

# Usage

```node
import SmaregiApi from "smaregiapi";

const main = async () => {
  const config = {
    contractId: process.env.SmaregiContractId,
    clientId: process.env.SmaregiClientId,
    clientSecret: process.env.SmaregiClientSecret,
    hostName: "api.smaregi.dev",
    scopes: [
      "pos.stock:read", "pos.stock:write",
      "pos.stores:read", "pos.stores:write",
      "pos.customers:read", "pos.customers:write", 
      "pos.products:read", "pos.products:write"
    ]
  };
  
  const api = new SmaregiApi(config);
  await api.auth();

  // Get stores lists
  const storeList = await api.stores().storesApi.list();

  // Update store data
  const data = {
    storeName: "npm api module test"
  };
  await api.stores().id(1).update(data);

  // Get products lists
  const productList = await api.products().productsApi.list();
};

main();

```
