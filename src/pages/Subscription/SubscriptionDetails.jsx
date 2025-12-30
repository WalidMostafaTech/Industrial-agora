import { useSelector } from "react-redux";
import Avatar from "../../components/common/Avatar";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubscriptionDetails = () => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const { lang } = useParams();
  // const { setting } = useSelector((state) => state.setting);

  return (
    <section className="pagePadding container">
      <article className="whiteContainer w-full max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
          <div className="flex-1 flex items-center gap-2">
            <Avatar name={profile?.name} size="md" />
            <div className="flex-1">
              <h4 className="text-lg font-bold capitalize line-clamp-1 flex-1 break-all">
                {profile?.name}
              </h4>
            </div>
          </div>
          {/* <span className="text-myBlue-2 text-xl font-bold">
            {setting?.subscription_amount} $
          </span> */}
        </div>

        {/* Person Card */}
        <div className="pb-4 border-b border-gray-300">
          <h3 className="text-xl font-bold mb-1">
            {t("subscriptionDetails.personCard")}
          </h3>
          <ul>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.name")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.name}
              </span>
            </li>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.phone")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.phone}
              </span>
            </li>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.email")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.email}
              </span>
            </li>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.company")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.company_name}
              </span>
            </li>
          </ul>
        </div>

        {/* Address Card */}
        <div className="pb-4 border-b border-gray-300">
          <h3 className="text-xl font-bold mb-1">
            {t("subscriptionDetails.addressCard")}
          </h3>
          <ul>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.address")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.city}
              </span>
            </li>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.taxNumber")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.tax_number}
              </span>
            </li>
          </ul>
        </div>

        {/* Subscription Details */}
        <div>
          <h3 className="text-xl font-bold mb-1">
            {t("subscriptionDetails.details")}
          </h3>
          <ul>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.name")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1 flex items-center gap-1">
                {profile?.subscription?.subscription_name}
                <Link
                  to={`/${lang}/subscription-packages`}
                  className="px-2 py-1 bg-myGreen text-white text-xs rounded-md cursor-pointer"
                >
                  {t("subscriptionDetails.change")}
                </Link>
              </span>
            </li>
            <li className="flex gap-2">
              <p>{t("subscriptionDetails.description")}:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.subscription?.subscription_description}
              </span>
            </li>
            {profile?.subscription?.status === "pending" ? (
              <li className="flex gap-2">
                <p>{t("subscriptionDetails.status")}:</p>
                <span className="font-semibold text-myBlue-2 flex-1">
                  {profile?.subscription?.status}
                </span>
              </li>
            ) : (
              <>
                {profile?.subscription?.subscription_start && (
                  <li className="flex gap-2">
                    <p>{t("subscriptionDetails.start")}:</p>
                    <span className="font-semibold text-myBlue-2 flex-1">
                      {profile?.subscription?.subscription_start}
                    </span>
                  </li>
                )}
                {profile?.subscription?.subscription_end && (
                  <li className="flex gap-2">
                    <p>{t("subscriptionDetails.end")}:</p>
                    <span className="font-semibold text-myBlue-2 flex-1">
                      {profile?.subscription?.subscription_end}
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default SubscriptionDetails;
