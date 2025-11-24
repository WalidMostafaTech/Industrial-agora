import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import FormBtn from "../../../components/form/FormBtn";
import MainInput from "../../../components/form/MainInput";
import ImageUploader from "../../../components/form/ImageUploader";
import CommissionModal from "../../../components/modals/CommissionModal";
import SuccessModal from "../../../components/modals/SuccessModal";

import {
  addProductApi,
  addPromotionProduct,
} from "../../../services/productServices";
import { useTranslation } from "react-i18next";

// Validation Schema
const schema = yup.object({
  machine_name: yup.string().required("offerService.machineNameRequired"),
  machine_specification: yup
    .string()
    .required("offerService.machineSpecificationRequired"),
  material_types_compatible: yup
    .string()
    .required("offerService.materialTypesRequired"),
  material_specifications_accepted: yup
    .string()
    .required("offerService.materialSpecAcceptedRequired"),
  main_applications_processes: yup
    .string()
    .required("offerService.mainApplicationsRequired"),
  input_output: yup.string().required("offerService.inputOutputRequired"),
  description: yup.string().required("offerService.descriptionRequired"),
});

const OfferService = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [formDataValues, setFormDataValues] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const addProductMutation = useMutation({ mutationFn: addProductApi });

  const addPromotionMutation = useMutation({
    mutationFn: addPromotionProduct,
    onSuccess: () => {
      setOpenSuccessModal(true);
      setImages([]);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError(t("offerService.uploadAtLeastOneImage"));
      return;
    }
    setImageError("");
    setFormDataValues(data);
    setIsModalOpen(true);
  };

  const handleConfirmModal = async ({ months }) => {
    if (!formDataValues) return;

    const formData = new FormData();
    Object.entries(formDataValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("type", "offer_service");

    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    try {
      const productResponse = await addProductMutation.mutateAsync(formData);
      const product_id = productResponse?.data?.id;
      if (!product_id) return;

      const promoForm = new FormData();
      promoForm.append("product_id", product_id);
      promoForm.append("months", months);

      await addPromotionMutation.mutateAsync(promoForm);
    } catch (error) {
      console.error("❌ Error in workflow:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <MainInput
          label={t("offerService.machineName")}
          id="machine_name"
          {...register("machine_name")}
          error={
            errors.machine_name?.message && t(errors.machine_name?.message)
          }
        />
        <MainInput
          label={t("offerService.machineSpecification")}
          id="machine_specification"
          {...register("machine_specification")}
          error={
            errors.machine_specification?.message &&
            t(errors.machine_specification?.message)
          }
        />
        <MainInput
          label={t("offerService.materialTypesCompatible")}
          id="material_types_compatible"
          {...register("material_types_compatible")}
          error={
            errors.material_types_compatible?.message &&
            t(errors.material_types_compatible?.message)
          }
        />
        <MainInput
          label={t("offerService.materialSpecAccepted")}
          id="material_specifications_accepted"
          {...register("material_specifications_accepted")}
          error={
            errors.material_specifications_accepted?.message &&
            t(errors.material_specifications_accepted?.message)
          }
        />
        <ImageUploader
          label={t("offerService.pictures")}
          onChange={setImages}
          error={imageError}
          initialImages={images}
        />
        <MainInput
          label={t("offerService.mainApplications")}
          id="main_applications_processes"
          {...register("main_applications_processes")}
          error={
            errors.main_applications_processes?.message &&
            t(errors.main_applications_processes?.message)
          }
        />
        <MainInput
          label={t("offerService.inputOutput")}
          id="input_output"
          {...register("input_output")}
          error={
            errors.input_output?.message && t(errors.input_output?.message)
          }
        />
        <MainInput
          label={t("offerService.description")}
          id="description"
          type="textarea"
          {...register("description")}
          error={errors.description?.message && t(errors.description?.message)}
        />
        <FormBtn title={t("offerService.submit")} />
      </form>

      <CommissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        error={addProductMutation.error || addPromotionMutation.error}
        loading={addProductMutation.isPending || addPromotionMutation.isPending}
      />

      <SuccessModal
        openModal={openSuccessModal}
        msg={t("offerService.successMsg")}
        onClose={() => {
          setOpenSuccessModal(false);
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setOpenSuccessModal(false);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default OfferService;
