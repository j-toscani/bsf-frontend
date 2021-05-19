import { Context } from "@nuxt/types";
import { Ressource, RessourceType } from "@/types/derivedTypes";
// Based on https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/

const createBaseRepository = <T extends Ressource>(ctx: Context) => (
  ressource: T
) => {
  return {
    getAll(): Promise<RessourceType<T>[]> {
      return ctx.$axios.$get(`/${ressource}`);
    },
    getOne(query: string): Promise<RessourceType<T>> {
      return ctx.$axios.$get(`/${ressource}/${query}`);
    },
    create(payload: RessourceType<T>): Promise<RessourceType<T>> {
      return ctx.$axios.$post(`/${ressource}`, payload);
    },
    update(id: string, payload: any): Promise<RessourceType<T>> {
      return ctx.$axios.$put(`/${ressource}/${id}`, payload);
    },
    delete(id: string): Promise<RessourceType<T>> {
      return ctx.$axios.$delete(`/${ressource}/${id}`);
    }
  };
};

export default createBaseRepository;
