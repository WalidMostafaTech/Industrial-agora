import { useState, useRef } from "react";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import FormTitle from "../../../components/form/FormTitle";

const OTP = ({ goNext }) => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  // ✅ تغيير القيمة في الخانة
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      setError("");

      // ✅ التركيز التلقائي على الحقل التالي بعد التحديث
      if (value && index < length - 1) {
        setTimeout(() => {
          inputsRef.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  // ✅ عند الضغط على Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ لصق الكود بالكامل مرة واحدة
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

  // ✅ عند الضغط على أي حقل
  const handleFocus = (index) => {
    const firstEmptyIndex = otp.findIndex((val) => val === "");
    // لو كل الخانات مليانة، مفيش داعي نحرك التركيز
    if (firstEmptyIndex === -1) return;

    // لو المستخدم ضغط على خانة بعد الخانة الفاضية الأولى → رجّع التركيز للخانة اللي عليها الدور
    if (index > firstEmptyIndex) {
      inputsRef.current[firstEmptyIndex].focus();
    }
  };

  // ✅ التحقق من الـ OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== length) {
      setError("Please enter all digits of the OTP.");
      return;
    }
    console.log("Entered OTP:", joinedOtp);
    goNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormTitle
        title="Step 2: Enter OTP"
        subtitle="We have sent a One-Time Password (OTP) to your email address."
      />

      {/* ✅ OTP Inputs */}
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
            className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myBlue-2 focus:border-myBlue-2 transition-all"
          />
        ))}
      </div>

      <FormError errorMsg={error} />
      <FormBtn title={"Check"} />
    </form>
  );
};

export default OTP;
