'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = () => ({
  async createStripeSession(products) {
    const line_items = products.map((product) => {
      const price = Number(product.price);
      const quantity = Number(product.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        throw new Error(`Invalid product data: ${JSON.stringify(product)}`);
      }

      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return session;
  },

  async saveOrder({ email, products, amount, stripeSessionId }) {
    return await strapi.entityService.create('api::checkout.checkout', {
      data: {
        email,
        products,
        amount,
        stripeSessionId,
        status: 'pending',
      },
    });
  },
});
