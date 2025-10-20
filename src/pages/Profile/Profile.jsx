import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import { updateProfile } from "../../services/authServices";
import { getProfileAct } from "../../store/profile/profileSlice";

const Profile = () => {
  const { profile } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ البيانات المبدئية
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    company_name: profile?.company_name || "",
    city: profile?.city || "",
    tax_number: profile?.tax_number || "",
    password: "",
    password_confirmation: "",
  });

  // ✅ نحتفظ بالنسخة الأصلية للمقارنة
  const [initialData, setInitialData] = useState(formData);

  useEffect(() => {
    if (profile) {
      const newData = {
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        company_name: profile?.company_name || "",
        city: profile?.city || "",
        tax_number: profile?.tax_number || "",
        password: "",
        password_confirmation: "",
      };
      setFormData(newData);
      setInitialData(newData);
    }
  }, [profile]);

  // ✅ دالة التغيير في الحقول
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ التحقق من وجود تغييرات
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  // ✅ التحقق من الباسورد
  useEffect(() => {
    if (formData.password && !formData.password_confirmation) {
      setErrorMsg("يرجى تأكيد كلمة المرور.");
    } else if (
      formData.password &&
      formData.password_confirmation &&
      formData.password !== formData.password_confirmation
    ) {
      setErrorMsg("كلمة المرور غير متطابقة.");
    } else {
      setErrorMsg("");
    }
  }, [formData.password, formData.password_confirmation]);

  const dispatch = useDispatch();

  // ✅ React Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setInitialData(formData);
      setIsEditing(false);
      dispatch(getProfileAct());
      console.log("تم تحديث الملف الشخصي بنجاح ✅");
    },
    onError: () => {
      setErrorMsg("حدث خطأ أثناء التحديث، حاول مرة أخرى.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errorMsg) return; // لو فيه خطأ في الباسورد
    if (!hasChanges) return; // لو مفيش تغييرات

    const payload = { ...formData };
    if (!formData.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    mutate(payload);
  };

  // ✅ أول حرفين من الاسم
  const initials = formData.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <article className="container pagePadding">
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full bg-myBlue-1 text-white flex items-center justify-center text-4xl font-semibold shadow-lg">
            {initials}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {formData.name}
          </h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="mainBtn"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Form Section */}
        <form
          className="whiteContainer space-y-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MainInput
              label="Full Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Phone"
              id="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Company Name"
              id="company_name"
              value={formData.company_name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="City"
              id="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Tax Number"
              id="tax_number"
              type="number"
              value={formData.tax_number}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label="Confirm Password"
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <FormError errorMsg={errorMsg} />

          {isEditing && (
            <FormBtn
              title="Save"
              disabled={!hasChanges || !!errorMsg}
              loading={isPending}
            />
          )}
        </form>
      </section>
    </article>
  );
};

export default Profile;
