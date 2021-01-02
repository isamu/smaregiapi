import SmaregiApi from "../src/";

test('api test', async () => {
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

  const storesApi = api.stores();
  const storeList = await storesApi.list();
  expect(storeList).toBeInstanceOf(Array)
  
  const productsApi = api.products();
  const productList = await productsApi.list();
  expect(productList).toBeInstanceOf(Array)
  
});
