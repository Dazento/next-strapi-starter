import { getPageBySlug } from "./utils/getPageBySlug";
import { sectionRenderer } from "./utils/sectionRenderer";

export default async function PageRoute() {
  const page = await getPageBySlug("accueil");
  if (page.data.length === 0) return null; // remove null and add the Error page (404)
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section, index) =>
    sectionRenderer(section, index)
  );
}
