export default {
  routes: [
    {
      method: 'DELETE',
      path: '/carts/clear/:session_id',
      handler: 'cart.clearBySession',
      config: {
        auth: false, // or true if needed
      },
    },
  ],
};
