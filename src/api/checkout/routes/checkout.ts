module.exports = {
  routes: [
    {
      method: "POST",
      path: "/checkout",
      handler: "checkout.createSession",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/checkout/save-order",
      handler: "checkout.saveOrder",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
