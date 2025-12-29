import { useEffect } from "react";

const SeoManager = ({ title, description, keywords, canonical, ogImage }) => {
  useEffect(() => {
    // Title
    document.title = title || "Industrial Agora";

    // Meta Description
    let desc = document.querySelector("meta[name='description']");
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", description || "");

    // Meta Keywords
    let keys = document.querySelector("meta[name='keywords']");
    if (!keys) {
      keys = document.createElement("meta");
      keys.setAttribute("name", "keywords");
      document.head.appendChild(keys);
    }
    keys.setAttribute(
      "content",
      keywords ? (Array.isArray(keywords) ? keywords.join(", ") : keywords) : ""
    );

    // Canonical
    if (canonical) {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Open Graph Image
    if (ogImage) {
      let ogImg = document.querySelector("meta[property='og:image']");
      if (!ogImg) {
        ogImg = document.createElement("meta");
        ogImg.setAttribute("property", "og:image");
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute("content", ogImage);
    }

    // Open Graph Title
    let ogTitle = document.querySelector("meta[property='og:title']");
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title || "");

    // Open Graph Description
    let ogDesc = document.querySelector("meta[property='og:description']");
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description || "");
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};

export default SeoManager;
