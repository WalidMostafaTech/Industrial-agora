import { useState } from "react";
import Disclaimer from "./Disclaimer";
import RequestQuotation from "./RequestQuotation";
import PurchaseOrder from "./PurchaseOrder";

const ProductsForms = () => {
  const [active, setActive] = useState("request");

  const titles = [
    {
      id: 1,
      title: "Purchase Order",
      link: "purchase",
    },
    // {
    //   id: 2,
    //   title: "Request Quotation",
    //   link: "request",
    // },
    // {
    //   id: 3,
    //   title: "Disclaimer",
    //   link: "disclaimer",
    // },
  ];
  return (
    <div className="whiteContainer max-w-3xl mx-auto space-y-4">
      <hgroup className="text-center border-b border-gray-300 flex items-center justify-evenly">
        {titles.map((title) => (
          <h3
            key={title.id}
            className={`lg:text-xl font-bold border-b-3 pb-2 uppercase cursor-pointer translate-y-0.5 ${
              active === title.link
                ? "text-myBlue-2 border-myBlue-2"
                : "text-gray-400 border-transparent"
            }`}
            onClick={() => setActive(title.link)}
          >
            {title.title}
          </h3>
        ))}
      </hgroup>

      {active === "purchase" && <PurchaseOrder />}
      {active === "request" && <RequestQuotation />}
      {active === "disclaimer" && <Disclaimer />}
    </div>
  );
};

export default ProductsForms;
