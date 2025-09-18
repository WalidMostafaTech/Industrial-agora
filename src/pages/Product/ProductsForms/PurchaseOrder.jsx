import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";

const PurchaseOrder = () => {
  return (
    <form className="space-y-6">
      <MainInput label="Company/Customer name" id="companyName" />

      <MainInput label="phone number" type="number" id="phone" />

      <MainInput label="email" type="email" id="email" />

      <MainInput label="quantity required" type="number" id="quantity" />

      <MainInput label="Address/Delivery Location" id="addressLocation" />

      <MainInput label="total price" id="totalPrice" type="number" />

      <MainInput
        label="payment method"
        id="paymentMethod"
        type="select"
        options={[
          { value: "", label: "select payment method" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
        ]}
      />

      <MainInput label="Additional Notes/Special Requests" id="notes" />

      <FormError />

      <FormBtn title="Submit" />
    </form>
  );
};

export default PurchaseOrder;
