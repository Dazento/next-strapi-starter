import Hero from "../components/Hero/Hero";

export function sectionRenderer(section, index) {
  switch (section.__component) {
    case "sections.hero-section":
      return <Hero key={index} data={section} />;

    default:
      return null;
  }
}
