import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormBtn from "../form/FormBtn";
import MainInput from "../form/MainInput";
import FormError from "../form/FormError";
import { sendMsg } from "../../services/chatServices";

// ✅ Yup validation schema
const schema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
});

const SendMsgModal = ({ openModal, onClose, productId }) => {
  const navigate = useNavigate();

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ React Query mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendMsg,
    onSuccess: (data) => {
      const chatId = data?.chat?.id;

      if (chatId) {
        navigate(`/chat/${chatId}`);
      }
      reset();
      onClose();
    },
  });

  // ✅ Submit handler
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-xl lg:text-3xl text-myBlue-1 font-bold">
            Send a message to the seller
          </h3>

          <MainInput
            type="textarea"
            placeholder="Write your message..."
            {...register("message")}
            error={errors.message?.message}
          />

          <FormError errorMsg={error?.response?.data?.message} />

          <div className="flex justify-between gap-4">
            <FormBtn title={"Send"} loading={isPending} margin={false} />

            <button
              onClick={onClose}
              type="button"
              className="animationBtn danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SendMsgModal;
