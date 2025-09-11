import { useState } from "react";
import Disclaimer from "./Disclaimer";
import RequestQuotation from "./RequestQuotation";

const ProductsForms = () => {
  const [active, setActive] = useState("request");
  return (
    <div className="whiteContainer max-w-3xl mx-auto space-y-4">
      <hgroup className="text-center border-b border-gray-300 flex items-center justify-evenly">
        <h3
          className={`lg:text-xl font-bold border-b-3 pb-2 uppercase cursor-pointer translate-y-0.5 ${
            active === "request"
              ? "text-myBlue-2 border-myBlue-2"
              : "text-gray-400 border-transparent"
          }`}
          onClick={() => setActive("request")}
        >
          Request Quotation
        </h3>
        <h3
          className={`lg:text-xl font-bold border-b-3 pb-2 uppercase cursor-pointer translate-y-0.5 ${
            active === "disclaimer"
              ? "text-myBlue-2 border-myBlue-2"
              : "text-gray-400 border-transparent"
          }`}
          onClick={() => setActive("disclaimer")}
        >
          Disclaimer
        </h3>
      </hgroup>

      {active === "request" && <RequestQuotation />}
      {active === "disclaimer" && <Disclaimer />}
    </div>
  );
};

export default ProductsForms;
