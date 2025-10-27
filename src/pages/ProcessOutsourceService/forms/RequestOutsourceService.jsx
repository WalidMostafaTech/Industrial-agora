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

// ✅ Validation Schema
const schema = yup.object({
  company_name: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  material_specification_1: yup
    .string()
    .required("Material Specification 1 is required"),
  material_specification_2: yup.string().nullable(),
  material_specification_3: yup.string().nullable(),
  process_description: yup.string().required("Process description is required"),
  preferred_expected_machine_or_technology: yup
    .string()
    .required("Preferred Machine or Technology is required"),
  quality_standard_tolerance: yup.string().nullable(),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  special_instructions: yup.string().nullable(),
  description: yup.string().required("Note/Description is required"),
});

const RequestOutsourceService = () => {
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

  // ✅ Mutation using React Query
  const { mutate, isPending, error } = useMutation({
    mutationFn: addProductApi, // نفس الـ API
    onSuccess: () => {
      setImages([]);
      reset();
      setOpenModal(true);
    },
    onError: (error) => {
      console.error("❌ Failed to submit request: " + error.message);
    },
  });

  // ✅ onSubmit Handler
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError("Please upload at least one image.");
      return;
    }
    setImageError("");

    const formData = new FormData();

    // 🟢 إضافة باقي الحقول
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // 🟢 type = outsource
    formData.append("type", "outsource");

    // 🟢 إضافة الصور بالشكل المطلوب (images[0], images[1], ...)
    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <MainInput
        label="Company name"
        id="company_name"
        {...register("company_name")}
        error={errors.company_name?.message}
      />

      <MainInput
        label="Location"
        id="location"
        {...register("location")}
        error={errors.location?.message}
      />

      <MainInput
        label="Material Specifications 1"
        id="material_specification_1"
        {...register("material_specification_1")}
        error={errors.material_specification_1?.message}
      />

      <MainInput
        label="Material Specifications 2"
        id="material_specification_2"
        {...register("material_specification_2")}
        error={errors.material_specification_2?.message}
      />

      <MainInput
        label="Material Specifications 3"
        id="material_specification_3"
        {...register("material_specification_3")}
        error={errors.material_specification_3?.message}
      />

      <MainInput
        label="Process Description"
        id="process_description"
        type="textarea"
        {...register("process_description")}
        error={errors.process_description?.message}
      />

      <MainInput
        label="Preferred / Expected Machine or Technology"
        id="preferred_expected_machine_or_technology"
        {...register("preferred_expected_machine_or_technology")}
        error={errors.preferred_expected_machine_or_technology?.message}
      />

      <MainInput
        label="Quality Standard / Tolerance (if any)"
        id="quality_standard_tolerance"
        {...register("quality_standard_tolerance")}
        error={errors.quality_standard_tolerance?.message}
      />

      <MainInput
        label="QTY"
        id="quantity"
        type="number"
        {...register("quantity")}
        error={errors.quantity?.message}
      />

      <MainInput
        label="Special Instructions"
        id="special_instructions"
        {...register("special_instructions")}
        error={errors.special_instructions?.message}
      />

      <MainInput
        label="Note"
        id="description"
        type="textarea"
        {...register("description")}
        error={errors.description?.message}
      />

      <ImageUploader
        label="Pictures"
        onChange={setImages}
        error={imageError}
        initialImages={images}
      />

      {/* ✅ Server Error */}
      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn title="Submit" loading={isPending} disabled={isPending} />

      <SuccessModal
        openModal={openModal}
        msg="Request submitted successfully!"
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
      />
    </form>
  );
};

export default RequestOutsourceService;
