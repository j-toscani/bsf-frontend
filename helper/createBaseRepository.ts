import { Context } from "@nuxt/types";
import { Ressource, RessourceType } from "@/types/derivedTypes";

export type Repository<T extends Ressource> = {
  getAll(): Promise<RessourceType<T>[]>;
  getOne(query: string): Promise<RessourceType<T>>;
  create(payload: RessourceType<T>): Promise<RessourceType<T>>;
  update(
    id: string,
    payload: Partial<RessourceType<T>>
  ): Promise<RessourceType<T>>;
  delete(id: string): Promise<RessourceType<T>>;
};

// Based on https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/
function createBaseRepository(ctx: Context) {
  return <T extends Ressource>(ressource: T) => {
    ctx.$axios.setBaseURL("http://localhost:1337");
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
      update(
        id: string,
        payload: Partial<RessourceType<T>>
      ): Promise<RessourceType<T>> {
        return ctx.$axios.$put(`/${ressource}/${id}`, payload);
      },
      delete(id: string): Promise<RessourceType<T>> {
        return ctx.$axios.$delete(`/${ressource}/${id}`);
      }
    } as Repository<T>;
  };
}

export default createBaseRepository;
