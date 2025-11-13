import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sendConsultationRequest } from "../../services/mainServices";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";

const ConsultationForm = ({ types }) => {
  // ✅ Validation schema
  const schema = yup.object({
    company_name: yup.string().required("Company name is required"),
    responsible_name: yup.string().required("Contact person is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone must be numeric")
      .required("Phone number is required"),
    consultation_type: yup.string().required("Please select consultation type"),
    description: yup
      .string()
      .required("Please provide a brief description of the problem"),
    accept_privacy_policy: yup
      .boolean()
      .oneOf([true], "You must accept the privacy policy"),
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
      console.error(err.response?.data?.message || "Something went wrong");
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    // نحول boolean إلى 1 أو 0 قبل الإرسال
    const formattedData = {
      ...data,
      accept_privacy_policy: data.accept_privacy_policy ? 1 : 0,
    };
    mutate(formattedData);
  };

  return (
    <form
      className="whiteContainer space-y-4 lg:col-span-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-2">
        <span
          className="bg-myBlue-1 text-white text-2xl font-bold shadow-md shadow-myBlue-1 
              w-8 h-8 flex items-center justify-center rounded-full"
        >
          1
        </span>
        <p className="font-bold text-xl text-myBlue-1">Company information</p>
      </div>

      <MainInput
        label="Company name"
        id="company_name"
        {...register("company_name")}
        error={errors.company_name?.message}
      />

      <MainInput
        label="Contact person"
        id="responsible_name"
        {...register("responsible_name")}
        error={errors.responsible_name?.message}
      />

      <MainInput
        label="Email"
        id="email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <MainInput
        label="Phone"
        id="phone"
        type="number"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="flex items-center gap-2">
        <span
          className="bg-myBlue-1 text-white text-2xl font-bold shadow-md shadow-myBlue-1 
              w-8 h-8 flex items-center justify-center rounded-full"
        >
          2
        </span>
        <p className="font-bold text-xl text-myBlue-1">Consultation details</p>
      </div>

      <MainInput
        label="Type of consultation required"
        id="consultation_type"
        type="select"
        placeholder="Select consultation type"
        options={types?.map((type) => ({
          value: type.id,
          label: type.name,
        }))}
        {...register("consultation_type")}
        error={errors.consultation_type?.message}
      />

      <MainInput
        label="Brief description of the problem"
        id="description"
        type="textarea"
        {...register("description")}
        error={errors.description?.message}
      />

      {/* ✅ Privacy Policy Checkbox (DaisyUI) */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-neutral checkbox-sm"
            {...register("accept_privacy_policy")}
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-myBlue-1 font-semibold cursor-pointer">
              Privacy Policy
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

      <button type="submit" className="mainBtn w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Request"}
        {isPending && (
          <span className="ml-2 spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
        )}
      </button>

      <p className="font-bold text-lg text-myBlue-1 text-center">
        We’ll get back to you within 24 hours
      </p>
    </form>
  );
};

export default ConsultationForm;
