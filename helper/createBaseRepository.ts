import { Context } from "@nuxt/types";

// Based on https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/
const createBaseRepository = (ctx: Context) => (ressource: string) => ({
  getAll() {
    return ctx.$axios.$get(`/${ressource}`);
  },
  getOne(query: string) {
    return ctx.$axios.$get(`/${ressource}/${query}`);
  },
  create(payload: any) {
    return ctx.$axios.$post(`/${ressource}`, payload);
  },
  update(payload: any) {
    return ctx.$axios.$put(`/${ressource}`, payload);
  },
  delete(payload: any) {
    return ctx.$axios.$delete(`/${ressource}`, payload);
  }
});

export default createBaseRepository;
