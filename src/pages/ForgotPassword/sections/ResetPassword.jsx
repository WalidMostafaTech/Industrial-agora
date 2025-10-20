import React from "react";
import FormTitle from "../../../components/form/FormTitle";
import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";

const ResetPassword = () => {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormTitle
        title="Step 3: Reset Password"
        subtitle="Please enter your new password below."
      />

      <MainInput label="Email" id="email" />

      <FormError errorMsg={""} />

      <FormBtn title={"Continue"} />
    </form>
  );
};

export default ResetPassword;
