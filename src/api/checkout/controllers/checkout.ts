'use strict';

module.exports = {
  async create(ctx) {
    const { data } = ctx.request.body;
    console.log("Received data:", data);
    try {
      const entry = await strapi.service('api::checkout.checkout').create(data);
      ctx.send(entry);
    } catch (err) {
      console.error("Error creating entry:", err);
      ctx.throw(500, "Internal server error");
    }
  },

  async createSession(ctx) {
    const { cart, totalPrice } = ctx.request.body;

    try {
      const session = await strapi.service('api::checkout.checkout').createStripeSession(cart);
      ctx.send({ url: session.url });
    } catch (err) {
      console.error("createSession error:", err.message);
      ctx.throw(500, err.message);
    }
  },

  async saveOrder(ctx) {
    const { email, products, amount, stripeSessionId } = ctx.request.body;

    try {
      const entry = await strapi.service('api::checkout.checkout').saveOrder({
        email,
        products,
        amount,
        stripeSessionId,
      });

      ctx.send(entry);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};
