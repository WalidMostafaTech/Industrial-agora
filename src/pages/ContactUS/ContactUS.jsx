import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

import PageTitle from "../../components/common/PageTitle";
import contactUsImg from "../../assets/images/32bf46f5bdafd7f6d8d884b65fc96ab358e43f24.jpg";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import { LiaFaxSolid } from "react-icons/lia";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import FormError from "../../components/form/FormError";
import { sendContact } from "../../services/mainServices";

const ContactUs = () => {
  // ✅ Validation Schema
  const schema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .min(3, "Must be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    message: yup.string().required("Enquiry is required"),
  });

  // ✅ useForm hook
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
    mutationFn: sendContact,
    onSuccess: () => {
      console.log("Message sent successfully!");
      reset();
    },
    onError: (error) => {
      console.error(error.response?.data?.message || "Something went wrong");
    },
  });

  // ✅ Submit handler
  const onSubmit = (data) => {
    mutate(data);
  };

  const contactUsList = [
    {
      label: "Phone",
      value: "+88 123 456 789",
      icon: <TbPhoneCall />,
    },
    {
      label: "Email",
      value: "example6@example.com",
      icon: <HiOutlineMailOpen />,
    },
    {
      label: "Fax",
      value: "03 123 45",
      icon: <LiaFaxSolid />,
    },
  ];

  return (
    <article className="container pagePadding">
      <PageTitle title="Contact Us" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 whiteContainer">
        {/* ✅ Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <MainInput
            label="Full Name"
            id="name"
            {...register("name")}
            error={errors.name?.message}
          />

          <MainInput
            label="Email Address"
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <MainInput
            label="Enquiry"
            id="message"
            type="textarea"
            {...register("message")}
            error={errors.message?.message}
          />

          <FormError errorMsg={error?.response?.data?.message} />
          <FormBtn title="Submit" loading={isPending} />
        </form>

        {/* ✅ Contact Info Section */}
        <div>
          <img
            src={contactUsImg}
            alt="contact us"
            className="w-2/3 mb-8 mx-auto hidden xl:block"
          />

          <div className="flex flex-wrap justify-between gap-4">
            {contactUsList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-myBlue-1 group"
              >
                <span className="text-5xl group-hover:scale-130 duration-300">
                  {item.icon}
                </span>
                <div>
                  <p className="font-bold">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactUs;
