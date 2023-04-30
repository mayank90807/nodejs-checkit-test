const dataObj = require("./data.json");

// Step 1 - Output the customers who has made a purchase with Leta and output the customer information.
function getCustomersWithPurchase({ customers, purchases }) {
  const customerWithPurchaseArr = purchases.map(({ customerId }) => customerId);
  return customers.filter(({ id }) => customerWithPurchaseArr.includes(id));
}

// Step 2 - Find the customers who have purchased any gaming product more than once and output the customer information.

function getCustomersWithMultiplePurchase({ customers, purchases }) {
  const customerWithMultiplePurchaseArr = [];
  purchases.forEach(({ customerId, purchases: purchasesArr }) => {
    if (purchasesArr.length > 1) {
      customerWithMultiplePurchaseArr.push(customerId);
    }
  });
  return customers.filter(({ id }) =>
    customerWithMultiplePurchaseArr.includes(id)
  );
}

// Step 3 - Output the number of purchases per each customer per each gaming product.

function getCustomersWithPurchases({ customers, products, purchases }) {
  const customersWithPurchasesArr = [];
  customers.forEach(({ id, firstname, lastname }) => {
    const purchaseByCustomerId =
      purchases.find((purchase) => purchase.customerId === id) || [];
    products.forEach(({ id, name: productName }) => {
      customersWithPurchasesArr.push({
        customerName: `${firstname} ${lastname}`,
        productName,
        numberOfPurchases: purchaseByCustomerId.purchases
          ? purchaseByCustomerId.purchases.filter(
              (purchase) => purchase.productId === id
            ).length
          : 0,
      });
    });
  });
  return customersWithPurchasesArr;
}

console.log(
  "\n\n Step 1 - Output the customers who has made a purchase with Leta and output the customer information. \n\n",
  getCustomersWithPurchase(dataObj)
);

console.log(
  "\n\nStep 2 - Find the customers who have purchased any gaming product more than once and output the customer information. \n\n",
  getCustomersWithMultiplePurchase(dataObj)
);

console.log(
  "\n\n Step 3 - Output the number of purchases per each customer per each gaming product.\n\n",
  getCustomersWithPurchases(dataObj)
);
