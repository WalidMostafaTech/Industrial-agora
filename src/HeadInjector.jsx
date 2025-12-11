import { useEffect } from "react";
import { useSelector } from "react-redux";

function HeadInjector() {
  const { setting } = useSelector((state) => state.setting);
  const header_code = setting?.header_code || "";

  useEffect(() => {
    if (!header_code) return;

    const container = document.createElement("div");
    container.innerHTML = header_code;

    const nodes = Array.from(container.childNodes);
    const addedNodes = [];

    nodes.forEach((node) => {
      let newNode;
      if (node.tagName === "SCRIPT") {
        newNode = document.createElement("script");
        // copy attributes
        Array.from(node.attributes).forEach((attr) =>
          newNode.setAttribute(attr.name, attr.value)
        );
        newNode.text = node.textContent;
      } else {
        newNode = node.cloneNode(true);
      }
      document.head.appendChild(newNode);
      addedNodes.push(newNode);
    });

    return () => {
      addedNodes.forEach((node) => document.head.removeChild(node));
    };
  }, [header_code]);

  return null;
}

export default HeadInjector;
