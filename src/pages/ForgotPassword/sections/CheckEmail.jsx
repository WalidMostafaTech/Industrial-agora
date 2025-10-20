import FormTitle from "../../../components/form/FormTitle";
import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";

const CheckEmail = ({ goNext }) => {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <FormTitle
        title="Step 1: Check your email"
        subtitle="We have sent a password reset link to your email address."
      />

      <MainInput label="Email" id="email" />

      <FormError errorMsg={""} />

      <FormBtn title={"Continue"} />
    </form>
  );
};

export default CheckEmail;
