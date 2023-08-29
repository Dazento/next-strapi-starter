import { FALLBACK_SEO } from "../utils/constants";
import { getPageBySlug } from "../utils/getPageBySlug";
import { sectionRenderer } from "../utils/sectionRenderer";

export async function generateMetadata(slug) {
  const page = await getPageBySlug(slug);
  if (!page.data[0].attributes.metadata) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.metadata;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PageRoute(slug) {
  const page = await getPageBySlug(slug);

  if (page.data.length === 0) return null; // remove null and add the Error page (404)
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section, index) =>
    sectionRenderer(section, index)
  );
}
