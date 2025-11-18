import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import RequestOutsourceService from "./forms/RequestOutsourceService";
import OfferService from "./forms/OfferService";
import useHasPermission from "../../hooks/useHasPermission";
import { PERMISSIONS } from "../../permissions";

const ProcessOutsourceService = () => {
  const [active, setActive] = useState("request");

  const canShareOffer = useHasPermission(PERMISSIONS.SHARE_POST_OFFER);
  const canShareOutsourceRequest = useHasPermission(
    PERMISSIONS.SHARE_OUTSOURCE_REQUEST
  );

  const titles = [
    {
      id: 1,
      title: "Request outsource service",
      link: "request",
      allowed: canShareOutsourceRequest,
    },
    {
      id: 2,
      title: "Offer Service",
      link: "offer",
      allowed: canShareOffer,
    },
  ];

  return (
    <section className="container pagePadding">
      <PageTitle title="Process Outsource" />

      <div className="whiteContainer max-w-xl mx-auto space-y-6">
        <hgroup className="text-center border-b border-gray-300 flex items-center justify-evenly">
          {titles
            .filter((t) => t.allowed) // ⛔ عرض التاب فقط لو له صلاحية
            .map((title) => (
              <h3
                key={title.id}
                className={`text-sm lg:text-lg font-bold border-b-3 pb-2 uppercase cursor-pointer translate-y-0.5 ${
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

        {/* ⛔ فورم Request فقط لو له صلاحية */}
        {active === "request" && canShareOutsourceRequest && (
          <RequestOutsourceService />
        )}

        {/* ⛔ فورم Offer فقط لو له صلاحية */}
        {active === "offer" && canShareOffer && <OfferService />}
      </div>
    </section>
  );
};

export default ProcessOutsourceService;
