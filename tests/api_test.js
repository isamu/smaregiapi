import SmaregiApi from "../src/";

test('store api test', async () => {
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
  expect(storeList).toBeInstanceOf(Array);

  const storeName = "npm api module test"
  const storeUpdateData = {
    storeName
  };

  const storeUpdateDataRes = await storesApi.id(1).update(storeUpdateData);
  expect(storeUpdateDataRes.storeName).toBe(storeName);

});


test('product api test', async () => {
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

  const categoriesApi = api.categories();
  const categoryList = await categoriesApi.list();
  expect(categoryList).toBeInstanceOf(Array);

  const categoryName = "test cat";
  const newCategory = await categoriesApi.create({categoryName});
  expect(newCategory.categoryName).toBe(categoryName);
  const categoryId = newCategory.categoryId;
  console.log(categoryId);
  
  const productsApi = api.products();
  const productList = await productsApi.list();
  expect(productList).toBeInstanceOf(Array)


  
  // delete data
  const categoryList2 = await categoriesApi.list();

  for (let i = 0; i < categoryList2.length; i = i + 1) {
    await api.categories().id(categoryList2[i].categoryId).delete();
  }
  
  
});
