import { Context } from "@nuxt/types";
import { Ressource, RessourceType } from "@/types/derivedTypes";

export type BaseRepository<T extends Ressource> = {
  getMany(): Promise<RessourceType<T>[]>;
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
    ctx.$axios.setBaseURL(
      process.env?.BROWSER_BASE_URL || "http://localhost:1337"
    );
    return {
      getMany(query?: string): Promise<RessourceType<T>[]> {
        const path = query ? `/${ressource}/${query}` : `/${ressource}`;
        return ctx.$axios.$get(path);
      },
      getOne(id: string, query: string): Promise<RessourceType<T>> {
        const slug = query ? id + query : id;
        return ctx.$axios.$get(`/${ressource}/${slug}`);
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
    } as BaseRepository<T>;
  };
}

export default createBaseRepository;
