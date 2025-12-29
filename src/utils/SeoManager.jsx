import { useEffect } from "react";

const DEFAULT_SEO = {
  title: "Industrial Agora",
  description: "Industrial Agora official website",
  keywords: "",
  ogImage: "",
  canonical: "",
};

const SeoManager = ({ title, description, keywords, canonical, ogImage }) => {
  useEffect(() => {
    const finalTitle = title || DEFAULT_SEO.title;
    const finalDesc = description || DEFAULT_SEO.description;
    const finalKeywords = keywords || DEFAULT_SEO.keywords;

    // Title
    document.title = finalTitle;

    // ===== Description =====
    let desc = document.querySelector("meta[name='description']");
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", finalDesc);

    // ===== Keywords =====
    let keys = document.querySelector("meta[name='keywords']");
    if (!keys) {
      keys = document.createElement("meta");
      keys.setAttribute("name", "keywords");
      document.head.appendChild(keys);
    }
    keys.setAttribute(
      "content",
      Array.isArray(finalKeywords) ? finalKeywords.join(", ") : finalKeywords
    );

    // ===== Canonical =====
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    } else if (canonicalLink) {
      canonicalLink.remove(); // 🔥 امسح القديم
    }

    // ===== OG Image =====
    let ogImg = document.querySelector("meta[property='og:image']");
    if (ogImage) {
      if (!ogImg) {
        ogImg = document.createElement("meta");
        ogImg.setAttribute("property", "og:image");
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute("content", ogImage);
    } else if (ogImg) {
      ogImg.remove(); // 🔥 امسح القديم
    }

    // ===== OG Title =====
    let ogTitle = document.querySelector("meta[property='og:title']");
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", finalTitle);

    // ===== OG Description =====
    let ogDesc = document.querySelector("meta[property='og:description']");
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", finalDesc);
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};

export default SeoManager;
