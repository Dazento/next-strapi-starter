import Navbar from "./components/Navbar/Navbar";
import { Inter } from "next/font/google";
import { fetchApi } from "./utils/fetchApi";
import { FALLBACK_SEO } from "./utils/constants";
import { getStrapiMedia, getStrapiUrl } from "./utils/apiHelpers";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

async function getGlobal() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      // "notificationBanner.link",
      "navbar.links",
      "navbar.button",
      "navbar.navbarLogo.logoImg",
      // "footer.footerLogo.logoImg",
      // "footer.menuLinks",
      // "footer.legalLinks",
      // "footer.socialLinks",
      // "footer.categories",
    ],
  };

  return await fetchApi(path, urlParamsObject, options);
}

export async function generateMetadata() {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiUrl())],
    },
  };
}

export default async function RootLayout({ children }) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
          linksBtn={navbar.button}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
