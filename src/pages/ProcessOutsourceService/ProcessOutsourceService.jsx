import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import RequestOutsourceService from "./forms/RequestOutsourceService";
import OfferService from "./forms/OfferService";

const ProcessOutsourceService = () => {
  const [active, setActive] = useState("request");

  const titles = [
    {
      id: 1,
      title: "Request outsource service",
      link: "request",
    },
    {
      id: 2,
      title: "Offer Service",
      link: "offer",
    },
  ];

  return (
    <section className="container pagePadding">
      <PageTitle title="Process Outsource" />

      <div className="whiteContainer max-w-3xl mx-auto space-y-6">
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

        {active === "request" && <RequestOutsourceService />}
        {active === "offer" && <OfferService />}
      </div>
    </section>
  );
};

export default ProcessOutsourceService;
