import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { verifyOtp } from "../../../services/forgotPasswordServices";

const OTP = ({ goNext, parentData, setParentData }) => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  // ✅ Mutation to verify OTP
  const {
    mutate,
    isPending,
    isError,
    error: apiError,
  } = useMutation({
    mutationFn: ({ otp, email }) => verifyOtp({ otp, email }),
    onSuccess: (res, variables) => {
      setParentData((prev) => ({ ...prev, otp: variables.otp }));
      console.log("✅ OTP verified successfully:", res);
      goNext();
    },
    onError: (err) => {
      console.error("❌ Error verifying OTP:", err);
    },
  });

  // ✅ handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      setError("");

      if (value && index < length - 1) {
        setTimeout(() => {
          inputsRef.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  // ✅ handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) {
      setError("OTP must contain only numbers");
      return;
    }
    const newOtp = pasted.split("").slice(0, length);
    while (newOtp.length < length) newOtp.push("");
    setOtp(newOtp);
  };

  // ✅ handle focus
  const handleFocus = (index) => {
    const firstEmptyIndex = otp.findIndex((val) => val === "");
    if (firstEmptyIndex === -1) return;
    if (index > firstEmptyIndex) {
      inputsRef.current[firstEmptyIndex].focus();
    }
  };

  // ✅ handle submit (verify OTP)
  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");

    if (joinedOtp.length !== length) {
      setError("Please enter all digits of the OTP.");
      return;
    }

    mutate({ otp: joinedOtp, email: parentData.email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* OTP Inputs */}
      <div className="flex justify-between max-w-sm mx-auto gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-myBlue-2 focus:border-myBlue-2 transition-all"
          />
        ))}
      </div>

      {/* ✅ عرض الخطأ من API أو من التحقق */}
      <FormError
        errorMsg={
          error ||
          (isError
            ? apiError?.response?.data?.message ||
              "Invalid OTP, please try again."
            : "")
        }
      />

      {/* ✅ زر التحقق */}
      <FormBtn title={"Check"} loading={isPending} />
    </form>
  );
};

export default OTP;
