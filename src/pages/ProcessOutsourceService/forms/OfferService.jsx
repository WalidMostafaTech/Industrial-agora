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

// Validation Schema
const schema = yup.object({
  machine_name: yup.string().required("Machine name is required"),
  machine_specification: yup
    .string()
    .required("Machine specification is required"),
  material_types_compatible: yup
    .string()
    .required("Material types compatible is required"),
  material_specifications_accepted: yup
    .string()
    .required("Material specifications accepted is required"),
  main_applications_processes: yup
    .string()
    .required("Main applications/processes is required"),
  input_output: yup.string().required("Input / Output is required"),
  description: yup.string().required("Description is required"),
});

const OfferService = () => {
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

  // 1️⃣ Mutation لاضافة المنتج
  const addProductMutation = useMutation({
    mutationFn: addProductApi,
  });

  // 2️⃣ Mutation لإضافة البروموشن
  const addPromotionMutation = useMutation({
    mutationFn: addPromotionProduct,
    onSuccess: () => {
      setOpenSuccessModal(true);
      setImages([]);
      reset();
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError("Please upload at least one image.");
      return;
    }
    setImageError("");

    setFormDataValues(data);
    setIsModalOpen(true);
  };

  // Confirm Modal (months فقط)
  const handleConfirmModal = async ({ months }) => {
    if (!formDataValues) return;

    const formData = new FormData();

    // إضافة الحقول الأساسية
    Object.entries(formDataValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // type ثابت
    formData.append("type", "offer_service");

    // إضافة الصور
    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    try {
      // 1️⃣ أول API → إضافة المنتج
      const productResponse = await addProductMutation.mutateAsync(formData);

      const product_id = productResponse?.data?.id;

      if (!product_id) {
        console.error("❌ product_id is missing");
        return;
      }

      // 2️⃣ ثاني API → إضافة البروموشن
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
          label="Machine name"
          id="machine_name"
          {...register("machine_name")}
          error={errors.machine_name?.message}
        />
        <MainInput
          label="Machine specifications"
          id="machine_specification"
          {...register("machine_specification")}
          error={errors.machine_specification?.message}
        />
        <MainInput
          label="Machine types compatible"
          id="material_types_compatible"
          {...register("material_types_compatible")}
          error={errors.material_types_compatible?.message}
        />
        <MainInput
          label="Machine specifications accepted"
          id="material_specifications_accepted"
          {...register("material_specifications_accepted")}
          error={errors.material_specifications_accepted?.message}
        />

        {/* Images */}
        <ImageUploader
          label="Pictures"
          onChange={setImages}
          error={imageError}
          initialImages={images}
        />

        <MainInput
          label="Main applications / Process"
          id="main_applications_processes"
          {...register("main_applications_processes")}
          error={errors.main_applications_processes?.message}
        />
        <MainInput
          label="Input / Output"
          id="input_output"
          {...register("input_output")}
          error={errors.input_output?.message}
        />
        <MainInput
          label="Note"
          id="description"
          type="textarea"
          {...register("description")}
          error={errors.description?.message}
        />

        <FormBtn title="Submit" />
      </form>

      {/* Modal months */}
      <CommissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        error={addProductMutation.error || addPromotionMutation.error}
        loading={addProductMutation.isPending || addPromotionMutation.isPending}
      />

      {/* Success */}
      <SuccessModal
        openModal={openSuccessModal}
        msg="Offer submitted successfully!"
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
