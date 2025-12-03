import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { verifyEmail } from "../../../services/verifiedEmailServices";
import { useNavigate } from "react-router-dom";

const OTP = ({ setStep }) => {
  const { t } = useTranslation();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.profile);

  // ⏳ STATE للعدّاد
  const [timer, setTimer] = useState(60); // 3 دقائق

  // 🔁 Mutation لإعادة إرسال الكود
  const resendMutation = useMutation({
    mutationFn: () => verifyEmail({ email: profile?.email }),
    onSuccess: () => {
      setTimer(60); // إعادة العدّاد
      setOtp(Array(length).fill(""));
      inputsRef.current[0]?.focus();
    },
  });

  // 🔥 عدّاد الـ 3 دقائق
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Mutation للتحقق من الكود
  const {
    mutate,
    isPending,
    isError,
    error: apiError,
  } = useMutation({
    mutationFn: ({ otp, email }) => verifyEmail({ otp, email }),
    onSuccess: () => {
      navigate("/subscription-packages", { replace: true });
    },
  });

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

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) {
      setError(t("otp.onlyNumbers"));
      return;
    }
    const newOtp = pasted.split("").slice(0, length);
    while (newOtp.length < length) newOtp.push("");
    setOtp(newOtp);
  };

  const handleFocus = (index) => {
    const firstEmptyIndex = otp.findIndex((val) => val === "");
    if (firstEmptyIndex === -1) return;
    if (index > firstEmptyIndex) {
      inputsRef.current[firstEmptyIndex].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");

    if (joinedOtp.length !== length) {
      setError(t("otp.enterAllDigits"));
      return;
    }

    mutate({ otp: joinedOtp, email: profile?.email });
  };

  // ⏱ عرض الوقت بشكل mm:ss
  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="max-w-sm mx-auto">
        {t("otp.sentToEmail")}{" "}
        <span className="text-myGreen font-bold">{profile?.email}</span>{" "}
        <span
          className="text-myBlue-2 text-sm hover:underline cursor-pointer"
          onClick={() => setStep("email")}
        >
          {t("otp.changeEmail")}
        </span>
      </p>

      <div className="flex justify-between max-w-sm mx-auto gap-2" dir="ltr">
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

      {/* ⏳ عرض العدّاد أو زر إعادة الإرسال */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            {t("otp.resendIn")}{" "}
            <span className="font-semibold">{formatTime()}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => resendMutation.mutate()}
            className="text-myBlue-2 text-sm font-semibold hover:underline cursor-pointer"
          >
            {t("otp.resendCode")}
          </button>
        )}
      </div>

      <FormError
        errorMsg={
          error ||
          (isError ? apiError?.response?.data?.message || t("otp.invalid") : "")
        }
      />

      <FormBtn title={t("otp.checkBtn")} loading={isPending} />
    </form>
  );
};

export default OTP;
