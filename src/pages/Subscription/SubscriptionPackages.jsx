import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSubscribe,
  getSubscribeType,
} from "../../services/subscriptionServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import { MdOutlineDone } from "react-icons/md";
import { useState } from "react";
import SuccessModal from "../../components/modals/SuccessModal";
import FormError from "../../components/form/FormError";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../store/profile/profileSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubscriptionPackages = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: subscriptions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscribeType,
  });

  const {
    mutate: handleSubscribe,
    isPending,
    error,
  } = useMutation({
    mutationFn: addSubscribe,
    onSuccess: () => {
      setConfirmModalOpen(false);
      setOpenModal(true);
    },
  });

  const handleSuccess = () => {
    dispatch(getProfileAct());
    setOpenModal(false);
    navigate("/subscription-details");
  };

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const confirmSubscribe = () => {
    if (selectedId) {
      handleSubscribe({ subscription_type_id: selectedId });
    }
  };

  if (isLoading) return <LoadingSection />;
  if (isError || !subscriptions || subscriptions.length === 0) return null;

  return (
    <section
      className={`pagePadding container relative transition-opacity duration-300 space-y-4 ${
        isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subscriptions?.map((item) => (
          <SubscriptionCard
            key={item.id}
            item={item}
            onSubscribe={() => {
              setSelectedId(item.id);
              setConfirmModalOpen(true);
            }}
            t={t}
          />
        ))}
      </div>

      <FormError errorMsg={error?.response?.data?.message} />

      <SuccessModal
        openModal={openModal}
        msg={t("subscriptionPackages.success")}
        onClose={handleSuccess}
        onConfirm={handleSuccess}
      />

      {confirmModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              {t("subscriptionPackages.confirmTitle")}
            </h3>
            <p className="py-2">{t("subscriptionPackages.confirmMessage")}</p>

            <div className="modal-action flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setConfirmModalOpen(false)}
              >
                {t("subscriptionPackages.cancel")}
              </button>
              <button
                className="btn bg-myGreen text-white hover:bg-green-600"
                onClick={() => {
                  confirmSubscribe();
                  setConfirmModalOpen(false);
                }}
              >
                {t("subscriptionPackages.confirm")}
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setConfirmModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}

      {isPending && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold rounded-xl">
          {t("subscriptionPackages.processing")}
        </div>
      )}
    </section>
  );
};

const SubscriptionCard = ({ item, onSubscribe, t }) => {
  const [showAll, setShowAll] = useState(false);
  const featuresToShow = showAll ? item.features : item.features?.slice(0, 3);

  return (
    <div className="whiteContainer flex flex-col items-center gap-2">
      <span className="w-16 h-16 overflow-hidden">
        <img
          src={item.icon_url}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </span>

      <h3 className="text-2xl font-bold">{item.name}</h3>
      <p className="text-center font-medium">{item.description}</p>

      <p className="text-lg">
        {t("subscriptionPackages.price")}:{" "}
        <span className="text-myGreen font-bold text-xl">
          {item.price === 0 || item.price === null
            ? t("subscriptionPackages.free")
            : `${item.price}$`}
        </span>
      </p>

      {item?.features?.length > 0 && (
        <div className="w-full p-4 rounded-xl bg-gray-100 text-black flex-1">
          {featuresToShow?.map((feature, index) => (
            <div key={index} className="flex flex-row gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-myGreen mt-1 text-white">
                <MdOutlineDone />
              </span>
              <p className="flex-1 font-semibold">{feature.description}</p>
            </div>
          ))}

          {item.features.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-2 text-sm font-semibold underline text-center block w-fit mx-auto cursor-pointer"
            >
              {showAll
                ? t("subscriptionPackages.showLess")
                : t("subscriptionPackages.readMore")}
            </button>
          )}
        </div>
      )}

      <button onClick={onSubscribe} className="animationBtn mt-4">
        {t("subscriptionPackages.subscribe")}
      </button>
    </div>
  );
};

export default SubscriptionPackages;
