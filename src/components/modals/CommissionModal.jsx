// import { useState, useEffect } from "react";
// import MainInput from "../form/MainInput";
// import FormError from "../form/FormError";
// import { useSelector } from "react-redux";

// const CommissionModal = ({ isOpen, onClose, onConfirm, error, loading }) => {
//   const [duration, setDuration] = useState("");
//   const [durationType, setDurationType] = useState("");
//   const [durationError, setDurationError] = useState("");
//   const [durationTypeError, setDurationTypeError] = useState("");
//   const [days, setDays] = useState(0);
//   const [commission, setCommission] = useState(0);

//   const { setting } = useSelector((state) => state.setting);

//   // 🧮 حساب الأيام والعمولة تلقائيًا
//   useEffect(() => {
//     if (!duration) {
//       setDays(0);
//       setCommission(0);
//       return;
//     }

//     let totalDays = 0;
//     switch (durationType) {
//       case "days":
//         totalDays = Number(duration);
//         break;
//       case "months":
//         totalDays = Number(duration) * 30;
//         break;
//       case "years":
//         totalDays = Number(duration) * 365;
//         break;
//       default:
//         totalDays = 0;
//     }

//     setDays(totalDays);
//     setCommission(totalDays * Number(setting?.price_per_day || 0));
//   }, [duration, durationType, setting]);

//   // ✅ عند التأكيد
//   const handleConfirm = () => {
//     let hasError = false;

//     if (!duration) {
//       setDurationError("Please enter a duration");
//       hasError = true;
//     } else {
//       setDurationError("");
//     }

//     if (!durationType) {
//       setDurationTypeError("Please select a duration type");
//       hasError = true;
//     } else {
//       setDurationTypeError("");
//     }

//     if (hasError) return;

//     onConfirm({ duration, durationType, days, commission });

//     // 🧹 بعد التأكيد امسح القيم
//     setDuration("");
//     setDurationType("");
//     setCommission(0);
//     setDays(0);
//     setDurationError("");
//     setDurationTypeError("");
//   };

//   // ✅ عند الإغلاق
//   const handleClose = () => {
//     if (!loading) {
//       // 🧹 امسح القيم لما يقفل المودال
//       setDuration("");
//       setDurationType("");
//       setCommission(0);
//       setDays(0);
//       setDurationError("");
//       setDurationTypeError("");
//       onClose();
//     }
//   };

//   return (
//     <dialog
//       id="commission_modal"
//       className={`modal ${isOpen ? "modal-open" : ""}`}
//       onClick={(e) => {
//         // منع الإغلاق عند الضغط خارج الصندوق أثناء التحميل
//         if (e.target === e.currentTarget && !loading) {
//           onClose();
//         }
//       }}
//     >
//       <div className="modal-box max-w-md space-y-4">
//         <h3 className="font-bold text-lg text-center">
//           Specify the period to know the commission value
//         </h3>

//         {/* ✅ Duration Input باستخدام MainInput */}
//         <MainInput
//           label="Duration (number)"
//           id="duration"
//           type="number"
//           min="1"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           error={durationError}
//         />

//         {/* ✅ Duration Type Buttons */}
//         <div className="flex justify-center gap-3">
//           {[
//             { type: "days", label: "Day" },
//             { type: "months", label: "Month" },
//             { type: "years", label: "Year" },
//           ].map(({ type, label }) => (
//             <button
//               key={type}
//               type="button"
//               disabled={loading}
//               onClick={() => {
//                 setDurationType(type);
//                 setDurationTypeError("");
//               }}
//               className={`px-3 py-1 text-sm border rounded-lg font-medium transition-all cursor-pointer
//                 ${
//                   durationType === type
//                     ? "bg-myBlue-2 text-white border-myBlue-2"
//                     : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                 }
//                 ${loading ? "opacity-60 cursor-not-allowed" : ""}
//               `}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* 🟥 Error message for duration type */}
//         {durationTypeError && (
//           <p className="text-red-700 text-sm text-center">
//             {durationTypeError}
//           </p>
//         )}

//         {/* ✅ Preview Calculation */}
//         {duration && durationType && (
//           <div className="bg-gray-100 p-4 rounded-md text-center text-base">
//             <p>
//               Duration: {duration} {durationType} → {days} days
//             </p>
//             <p className="font-semibold mt-1">
//               Calculated commission:{" "}
//               <span className="font-bold text-sm text-myBlue-1">
//                 {commission}
//               </span>{" "}
//               riyals
//             </p>
//           </div>
//         )}

//         {/* ✅ Server Error */}
//         <FormError errorMsg={error?.response?.data?.message} />

//         {/* ✅ Buttons */}
//         <div className="flex justify-between gap-3">
//           <button
//             onClick={handleClose}
//             type="button"
//             className={`mainBtn danger ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             type="button"
//             className="mainBtn success flex items-center justify-center"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="mr-2">Loading...</span>
//                 <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
//               </>
//             ) : (
//               "Confirm"
//             )}
//           </button>
//         </div>
//       </div>
//     </dialog>
//   );
// };

// export default CommissionModal;

import { useState } from "react";
import MainInput from "../form/MainInput";
import FormError from "../form/FormError";

const CommissionModal = ({ isOpen, onClose, onConfirm, error, loading }) => {
  const [months, setMonths] = useState("");
  const [monthsError, setMonthsError] = useState("");

  const handleConfirm = () => {
    if (!months) {
      setMonthsError("Please enter number of months");
      return;
    }

    setMonthsError("");

    // نرجّع الشهور فقط
    onConfirm({ months });

    // reset
    setMonths("");
  };

  const handleClose = () => {
    if (!loading) {
      setMonths("");
      setMonthsError("");
      onClose();
    }
  };

  return (
    <dialog
      id="commission_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="modal-box max-w-md space-y-4">
        <h3 className="font-bold text-lg text-center">
          Enter the subscription period in months
        </h3>

        {/* Months Input */}
        <MainInput
          label="Duration in Months"
          id="months"
          type="number"
          min="1"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          error={monthsError}
        />

        {/* Server Error */}
        <FormError errorMsg={error?.response?.data?.message} />

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handleClose}
            type="button"
            className={`mainBtn danger ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            type="button"
            className="mainBtn success flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="mr-2">Loading...</span>
                <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CommissionModal;
