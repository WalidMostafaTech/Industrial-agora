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
import CommissionModal from "./CommissionModal";

// ✅ Validation Schema
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Mutation for API
const { mutate, isPending, error } = useMutation({
  mutationFn: addProductApi,
  onSuccess: () => {
    alert("✅ Offer submitted successfully!");
    setImages([]); // 🧹 امسح الصور
    reset(); // 🧹 ريّسِت كل الحقول
    setIsModalOpen(false); // 🧹 اقفل المودال بعد النجاح
  },
  onError: (error) => {
    console.error("❌ Failed to submit offer: " + error.message);
  },
});

  // ✅ onSubmit Handler
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError("Please upload at least one image.");
      return;
    }
    setImageError("");

    setFormDataValues(data); // ✅ خزّن بيانات الفورم هنا
    setIsModalOpen(true); // افتح المودال بعد الفاليديشن
  };

  const handleConfirmModal = ({ duration, durationType }) => {
    setIsModalOpen(false);

    if (!formDataValues) return; // safety check

    const formData = new FormData();

    // 🟢 أضف كل الحقول اللي من الفورم
    Object.entries(formDataValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // 🟢 أضف القيم الإضافية
    formData.append("duration", duration);
    formData.append("duration_type", durationType);
    formData.append("type", "offer_service");

    // 🟢 أضف الصور
    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    // 🟢 استدعاء الـ API
    mutate(formData);
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

        {/* ✅ Image Uploader */}
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

      <CommissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        error={error}
        loading={isPending}
      />
    </>
  );
};

export default OfferService;
