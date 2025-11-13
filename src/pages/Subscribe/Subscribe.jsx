import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Avatar from "../../components/common/Avatar";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import SuccessModal from "../../components/modals/SuccessModal";
import { addSubscribe } from "../../services/subscriptionServices";

const Subscribe = () => {
  const { profile } = useSelector((state) => state.profile);
  const { setting } = useSelector((state) => state.setting);
  const [paymentType, setPaymentType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => addSubscribe(formData),
    onSuccess: () => {
      setOpenModal(true);
      console.log("Subscription added successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentType) {
      setErrorMsg("Please select a payment type.");
      return;
    }
    const formData = { payment_type: paymentType };
    mutate(formData);
  };

  return (
    <article className="container pagePadding">
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {!profile?.has_subscription && (
          <aside className="whiteContainer flex flex-col justify-between gap-8 w-full lg:w-1/3">
            <ul className="space-y-4">
              <li className="flex justify-between gap-2 text-lg font-bold">
                <p>Total</p>
                <span>{setting?.subscription_amount} $</span>
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment Type Radio Buttons */}
              <div className="flex gap-4">
                {["offline", "online"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    disabled={type !== "offline"}
                    onClick={() => setPaymentType(type)}
                    className={`flex-1 py-2 px-4 rounded-lg border font-semibold cursor-pointer transition-colors duration-200
                      ${
                        paymentType === type
                          ? "bg-myBlue-1 text-white border-myBlue-1"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {type === "offline" ? "Offline" : "Online"}
                  </button>
                ))}
              </div>
              {errorMsg && <p className="text-red-700">{errorMsg}</p>}

              <FormBtn title={"Membership renewal"} loading={isPending} />
              <FormError errorMsg={error?.response?.data?.message} />
            </form>
            <SuccessModal
              openModal={openModal}
              msg="Subscription successful!"
              onClose={() => setOpenModal(false)}
              onConfirm={() => setOpenModal(false)}
            />
          </aside>
        )}

        <section
          className={`whiteContainer space-y-4 ${
            profile?.has_subscription ? "w-full max-w-3xl mx-auto" : "flex-1"
          }`}
        >
          <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
            <div className="flex-1 flex items-center gap-2">
              <Avatar name={profile?.name} size="lg" />
              <div className="flex-1">
                <h4 className="text-lg lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
                  {profile?.name}
                </h4>
              </div>
            </div>
            <span className="text-myBlue-2 text-2xl font-semibold">
              {setting?.subscription_amount} $
            </span>
          </div>

          <div className="pb-4 border-b border-gray-300">
            <h3 className="text-2xl font-bold mb-2">Person Card:</h3>
            <ul>
              <li className="flex gap-2 lg:text-lg">
                <p>Name:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.name}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Phone:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.phone}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Email:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.email}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Company:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.company_name}
                </span>
              </li>
            </ul>
          </div>

          <div className="pb-4 border-b border-gray-300">
            <h3 className="text-2xl font-bold mb-2">Address Card:</h3>
            <ul>
              <li className="flex gap-2 lg:text-lg">
                <p>Address:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.city}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Tax Number:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.tax_number}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Subscribe Details:</h3>
            <ul>
              <li className="flex gap-2 lg:text-lg">
                <p>Subscription Name:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.subscription_name}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Subscription Status:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.subscription_status}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Subscription Start:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.subscription_start}
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Subscription End:</p>
                <span className="font-semibold text-myBlue-2">
                  {profile?.subscription_end}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Subscribe;
