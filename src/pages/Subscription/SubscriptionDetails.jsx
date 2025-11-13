import { useSelector } from "react-redux";
import Avatar from "../../components/common/Avatar";
import { Link } from "react-router-dom";

const SubscriptionDetails = () => {
  const { profile } = useSelector((state) => state.profile);
  const { setting } = useSelector((state) => state.setting);

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
          <span className="text-myBlue-2 text-xl font-bold">
            {setting?.subscription_amount} $
          </span>
        </div>

        <div className="pb-4 border-b border-gray-300">
          <h3 className="text-xl font-bold mb-1">Person Card:</h3>
          <ul>
            <li className="flex gap-2">
              <p>Name:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.name}
              </span>
            </li>
            <li className="flex gap-2">
              <p>Phone:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.phone}
              </span>
            </li>
            <li className="flex gap-2">
              <p>Email:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.email}
              </span>
            </li>
            <li className="flex gap-2">
              <p>Company:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.company_name}
              </span>
            </li>
          </ul>
        </div>

        <div className="pb-4 border-b border-gray-300">
          <h3 className="text-xl font-bold mb-1">Address Card:</h3>
          <ul>
            <li className="flex gap-2">
              <p>Address:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.city}
              </span>
            </li>
            <li className="flex gap-2">
              <p>Tax Number:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.tax_number}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1">Subscribe Details:</h3>
          <ul>
            <li className="flex gap-2">
              <p>Subscription Name:</p>
              <span className="font-semibold text-myBlue-2 flex-1 flex items-center gap-1">
                {profile?.subscription.subscription_name}
                <Link
                  to="/subscription-packages"
                  className="px-2 py-1 bg-myGreen text-white text-xs rounded-md cursor-pointer"
                >
                  Change
                </Link>
              </span>
            </li>
            <li className="flex gap-2">
              <p>Subscription Description:</p>
              <span className="font-semibold text-myBlue-2 flex-1">
                {profile?.subscription.subscription_description}
              </span>
            </li>
            {profile?.subscription.status === "pending" ? (
              <li className="flex gap-2">
                <p>Subscription Status:</p>
                <span className="font-semibold text-myBlue-2 flex-1">
                  {profile?.subscription.status}
                </span>
              </li>
            ) : (
              <>
                <li className="flex gap-2">
                  <p>Subscription Start:</p>
                  <span className="font-semibold text-myBlue-2 flex-1">
                    {profile?.subscription.subscription_start}
                  </span>
                </li>
                <li className="flex gap-2">
                  <p>Subscription End:</p>
                  <span className="font-semibold text-myBlue-2 flex-1">
                    {profile?.subscription.subscription_end}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default SubscriptionDetails;
