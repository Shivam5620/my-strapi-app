import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  async clearBySession(ctx) {
    const { session_id } = ctx.params;

    if (!session_id) {
      return ctx.badRequest("Missing session_id");
    }

    // Fetch cart items
    const items = await strapi.entityService.findMany('api::cart.cart', {
      filters: { session_id },
      fields: ['id'],
    });

    // Delete each
    for (const item of items) {
      await strapi.entityService.delete('api::cart.cart', item.id);
    }

    return ctx.send({ message: `Deleted ${items.length} cart items.` });
  },
}));
