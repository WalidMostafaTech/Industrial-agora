import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sendConsultationRequest } from "../../services/mainServices";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import { useTranslation } from "react-i18next";
import PermissionModal from "../../components/modals/PermissionModal";
import { useState } from "react";
import useHasPermission from "../../hooks/useHasPermission";
import { PERMISSIONS } from "../../permissions";

const ConsultationForm = ({ types }) => {
  const { t } = useTranslation();

  // ✅ Validation schema
  const schema = yup.object({
    company_name: yup
      .string()
      .required(t("consultationForm.companyNameRequired")),
    responsible_name: yup
      .string()
      .required(t("consultationForm.contactPersonRequired")),
    email: yup
      .string()
      .email(t("consultationForm.invalidEmail"))
      .required(t("consultationForm.emailRequired")),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, t("consultationForm.phoneNumeric"))
      .required(t("consultationForm.phoneRequired")),
    consultation_type: yup.string().required(t("consultationForm.selectType")),
    description: yup
      .string()
      .required(t("consultationForm.descriptionRequired")),
    accept_privacy_policy: yup
      .boolean()
      .oneOf([true], t("consultationForm.acceptPrivacy")),
  });

  // ✅ Form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendConsultationRequest,
    onSuccess: () => {
      console.log("✅ Consultation request sent successfully!");
      reset();
    },
    onError: (err) => {
      console.error(
        err.response?.data?.message || t("consultationForm.somethingWrong")
      );
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      accept_privacy_policy: data.accept_privacy_policy ? 1 : 0,
    };
    mutate(formattedData);
  };

  const canRequest = useHasPermission(PERMISSIONS.REQUEST_CONSULT);

  // ✅ Permission Modal State
  const [openModal, setOpenModal] = useState(false);

  const onClickForm = () => {
    if (!canRequest) setOpenModal(true);
  };

  return (
    <form
      className="whiteContainer space-y-4 lg:col-span-2"
      onSubmit={handleSubmit(onSubmit)}
      onClick={onClickForm}
    >
      <div className="flex items-center gap-2">
        <span className="bg-myBlue-1 text-white text-2xl font-bold shadow-md shadow-myBlue-1 w-8 h-8 flex items-center justify-center rounded-full">
          1
        </span>
        <p className="font-bold text-xl text-myBlue-1">
          {t("consultationForm.companyInformation")}
        </p>
      </div>

      <MainInput
        label={t("consultationForm.companyName")}
        id="company_name"
        {...register("company_name")}
        error={errors.company_name?.message}
      />

      <MainInput
        label={t("consultationForm.contactPerson")}
        id="responsible_name"
        {...register("responsible_name")}
        error={errors.responsible_name?.message}
      />

      <MainInput
        label={t("consultationForm.email")}
        id="email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <MainInput
        label={t("consultationForm.phone")}
        id="phone"
        type="number"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="flex items-center gap-2">
        <span className="bg-myBlue-1 text-white text-2xl font-bold shadow-md shadow-myBlue-1 w-8 h-8 flex items-center justify-center rounded-full">
          2
        </span>
        <p className="font-bold text-xl text-myBlue-1">
          {t("consultationForm.details")}
        </p>
      </div>

      <MainInput
        label={t("consultationForm.type")}
        id="consultation_type"
        type="select"
        placeholder={t("consultationForm.selectTypePlaceholder")}
        options={types?.map((type) => ({
          value: type.id,
          label: type.name,
        }))}
        {...register("consultation_type")}
        error={errors.consultation_type?.message}
      />

      <MainInput
        label={t("consultationForm.description")}
        id="description"
        type="textarea"
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-neutral checkbox-sm"
            {...register("accept_privacy_policy")}
          />
          <span className="text-sm text-gray-700">
            {t("consultationForm.iAgree")}{" "}
            <span className="text-myBlue-1 font-semibold cursor-pointer">
              {t("consultationForm.privacyPolicy")}
            </span>
          </span>
        </label>
        {errors.accept_privacy_policy && (
          <p className="text-red-700 text-sm">
            {errors.accept_privacy_policy.message}
          </p>
        )}
      </div>

      <FormError errorMsg={error?.response?.data?.message} />

      {canRequest ? (
        <button type="submit" className="mainBtn w-full" disabled={isPending}>
          {isPending
            ? t("consultationForm.submitting")
            : t("consultationForm.submit")}
          {isPending && (
            <span className="ml-2 spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
          )}
        </button>
      ) : (
        <button type="button" className="mainBtn w-full" onClick={onClickForm}>
          {t("consultationForm.submit")}
        </button>
      )}

      <p className="font-bold text-lg text-myBlue-1 text-center">
        {t("consultationForm.responseTime")}
      </p>

      <PermissionModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />
    </form>
  );
};

export default ConsultationForm;
