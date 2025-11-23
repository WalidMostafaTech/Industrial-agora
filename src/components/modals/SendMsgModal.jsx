import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormBtn from "../form/FormBtn";
import MainInput from "../form/MainInput";
import FormError from "../form/FormError";
import { sendMsg } from "../../services/chatServices";
import { useTranslation } from "react-i18next";

// ✅ SendMsgModal with i18n
const SendMsgModal = ({ openModal, onClose, productId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    message: Yup.string().required(t("modals.SendMsgModal.messageRequired")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: sendMsg,
    onSuccess: (data) => {
      const chatId = data?.chat?.id;
      if (chatId) navigate(`/chat/${chatId}`);
      reset();
      onClose();
    },
  });

  const onSubmit = (formData) => {
    mutate({
      message: formData.message,
      product_id: productId,
    });
  };

  return (
    <dialog
      className={`modal ${openModal ? "modal-open" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal-box bg-base-100"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-xl text-myBlue-1 font-bold">
            {t("modals.SendMsgModal.title")}
          </h3>

          <MainInput
            type="textarea"
            placeholder={t("modals.SendMsgModal.placeholder")}
            {...register("message")}
            error={errors.message?.message}
          />

          <FormError errorMsg={error?.response?.data?.message} />

          <div className="flex justify-between gap-4">
            <FormBtn
              title={t("modals.SendMsgModal.send")}
              loading={isPending}
              margin={false}
            />

            <button
              onClick={onClose}
              type="button"
              className="animationBtn danger"
            >
              {t("modals.SendMsgModal.cancel")}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SendMsgModal;
