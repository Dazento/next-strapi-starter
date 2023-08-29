import { fetchApi } from "./fetchApi";

export async function getPageBySlug(params) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  let slug = params;
  if (params.params) slug = params.params.slug;
  const path = `/pages`;
  const urlParamsObject = { filters: { slug }, populate: "*" };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchApi(path, urlParamsObject, options);
}
