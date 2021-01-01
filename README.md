
# Smaregi API

Api tool for https://smaregi.jp/ 

# Install

```
npm install https://github.com/isamu/smaregiapi.git
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
  const storesApi = api.stores();
  const storeList = await storesApi.list();

  // Update store data
  const data = {
    storeName: "npm api module test"
  };
  await storesApi.id(1).update(data);

  // Get products lists
  const productsApi = api.products();
  const productList = await productsApi.list();
  
```
