import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import PageTitle from "../../components/common/PageTitle";
import contactUsImg from "../../assets/images/contact-img.jpeg";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import { LiaFaxSolid } from "react-icons/lia";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import FormError from "../../components/form/FormError";
import { sendContact } from "../../services/mainServices";
import { useSelector } from "react-redux";

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

  const { setting } = useSelector((state) => state.setting);

  const contactUsList = [
    {
      label: "Phone",
      value: setting?.whatsapp,
      link: `https://wa.me/${(setting?.whatsapp || "").replace(/\s/g, "")}`,
      icon: <TbPhoneCall />,
    },
    {
      label: "Email",
      value: setting?.site_email,
      link: `mailto:${setting?.site_email || ""}`,
      icon: <HiOutlineMailOpen />,
    },
    {
      label: "Fax",
      value: setting?.site_fax,
      icon: <LiaFaxSolid />,
    },
  ];

  return (
    <article className="container pagePadding">
      <PageTitle title="Contact Us" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 whiteContainer">
        {/* ✅ Contact Form */}
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            className="w-full xl:w-4/5 mb-8 mx-auto hidden md:block rounded-md shadow-md"
          />

          {/* <div className="flex flex-col lg:flex-row justify-evenly gap-4 lg:gap-2">
            {contactUsList.map(
              (item, index) =>
                item.value && (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-myBlue-1 group"
                  >
                    <span className="text-3xl group-hover:scale-120 duration-300">
                      {item.icon}
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-xs">{item.value}</p>
                    </div>
                  </div>
                )
            )}
          </div> */}
          
          <div className="flex flex-col lg:flex-row justify-evenly gap-4 lg:gap-2">
            {contactUsList.map(
              (item, index) =>
                item.value && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="flex items-center gap-2 text-myBlue-1 group"
                  >
                    <span className="text-3xl group-hover:scale-120 duration-300">
                      {item.icon}
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-xs">{item.value}</p>
                    </div>
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactUs;
