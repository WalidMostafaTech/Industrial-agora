import { useState } from "react";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";
import { FiCamera, FiX } from "react-icons/fi";

const RequestOutsourceService = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <form className="space-y-6">
      <MainInput label="Company name" id="companyName" />

      <MainInput label="location" id="location" />

      <MainInput label="Material Specifications 1" id="materialSpecs1" />
      <MainInput label="Material Specifications 2" id="materialSpecs2" />
      <MainInput label="Material Specifications 3" id="materialSpecs3" />

      <MainInput
        label="Process Description"
        id="processDescription"
        type="textarea"
      />

      <MainInput
        label="Preferred / Expected Machine or Technology"
        id="preferredMachineOrTechnology"
      />

      <MainInput
        label="Quality Standard / Tolerance (if any)"
        id="qualityStandardOrTolerance"
      />

      <MainInput label="QTY" id="qty" />

      <MainInput label="Special Instructions" id="specialInstructions" />

      <MainInput label="Note" id="note" type="textarea" />

      <div>
        <p className="font-medium text-gray-900 mb-2">
          Attach file or pictures
        </p>

        {!image ? (
          <label
            htmlFor="image"
            className="w-40 h-40 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-myBlue-2 hover:bg-gray-50 transition"
          >
            <FiCamera className="text-3xl text-gray-500" />
            <span className="text-gray-500 text-sm">Upload Image</span>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <div className="relative w-40 h-40">
            <img
              src={image}
              alt="Product preview"
              className="w-full h-full object-cover rounded-xl border border-myBlue-2"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-500 cursor-pointer"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        )}
      </div>

      <FormError />
      <FormBtn title="Continue" />
    </form>
  );
};

export default RequestOutsourceService;
