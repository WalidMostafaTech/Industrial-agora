import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import FormBtn from "../../../components/form/FormBtn";
import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import ImageUploader from "../../../components/form/ImageUploader";
import { addProductApi } from "../../../services/productServices";
import SuccessModal from "../../../components/modals/SuccessModal";
import { useTranslation } from "react-i18next";

// ✅ Validation Schema
const schema = yup.object({
  company_name: yup.string().required("requestOutsource.companyNameRequired"),
  location: yup.string().required("requestOutsource.locationRequired"),
  material_specification_1: yup
    .string()
    .required("requestOutsource.materialSpec1Required"),
  material_specification_2: yup.string().nullable(),
  material_specification_3: yup.string().nullable(),
  process_description: yup
    .string()
    .required("requestOutsource.processDescRequired"),
  preferred_expected_machine_or_technology: yup
    .string()
    .required("requestOutsource.preferredMachineRequired"),
  quality_standard_tolerance: yup.string().nullable(),
  quantity: yup
    .number()
    .typeError("requestOutsource.quantityNumber")
    .positive("requestOutsource.quantityPositive")
    .integer("requestOutsource.quantityInteger")
    .required("requestOutsource.quantityRequired"),
  special_instructions: yup.string().nullable(),
  description: yup.string().required("requestOutsource.noteRequired"),
});

const RequestOutsourceService = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      setImages([]);
      reset();
      setOpenModal(true);
    },
    onError: (error) => {
      console.error("❌ Failed to submit request: " + error.message);
    },
  });

  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError(t("requestOutsource.uploadAtLeastOneImage"));
      return;
    }
    setImageError("");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    formData.append("type", "outsource");

    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <MainInput
        label={t("requestOutsource.companyName")}
        id="company_name"
        {...register("company_name")}
        error={errors.company_name?.message && t(errors.company_name?.message)}
      />

      <MainInput
        label={t("requestOutsource.location")}
        id="location"
        {...register("location")}
        error={errors.location?.message && t(errors.location?.message)}
      />

      <MainInput
        label={t("requestOutsource.materialSpec1")}
        id="material_specification_1"
        {...register("material_specification_1")}
        error={
          errors.material_specification_1?.message &&
          t(errors.material_specification_1?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.materialSpec2")}
        id="material_specification_2"
        {...register("material_specification_2")}
        error={
          errors.material_specification_2?.message &&
          t(errors.material_specification_2?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.materialSpec3")}
        id="material_specification_3"
        {...register("material_specification_3")}
        error={
          errors.material_specification_3?.message &&
          t(errors.material_specification_3?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.processDesc")}
        id="process_description"
        type="textarea"
        {...register("process_description")}
        error={
          errors.process_description?.message &&
          t(errors.process_description?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.preferredMachine")}
        id="preferred_expected_machine_or_technology"
        {...register("preferred_expected_machine_or_technology")}
        error={
          errors.preferred_expected_machine_or_technology?.message &&
          t(errors.preferred_expected_machine_or_technology?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.qualityStandard")}
        id="quality_standard_tolerance"
        {...register("quality_standard_tolerance")}
        error={
          errors.quality_standard_tolerance?.message &&
          t(errors.quality_standard_tolerance?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.quantity")}
        id="quantity"
        type="number"
        {...register("quantity")}
        error={errors.quantity?.message && t(errors.quantity?.message)}
      />

      <MainInput
        label={t("requestOutsource.specialInstructions")}
        id="special_instructions"
        {...register("special_instructions")}
        error={
          errors.special_instructions?.message &&
          t(errors.special_instructions?.message)
        }
      />

      <MainInput
        label={t("requestOutsource.note")}
        id="description"
        type="textarea"
        {...register("description")}
        error={errors.description?.message && t(errors.description?.message)}
      />

      <ImageUploader
        label={t("requestOutsource.pictures")}
        onChange={setImages}
        error={imageError}
        initialImages={images}
      />

      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn
        title={t("requestOutsource.submit")}
        loading={isPending}
        disabled={isPending}
      />

      <SuccessModal
        openModal={openModal}
        msg={t("requestOutsource.successMsg")}
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
      />
    </form>
  );
};

export default RequestOutsourceService;
