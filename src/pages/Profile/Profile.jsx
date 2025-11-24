import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import { updateProfile } from "../../services/authServices";
import { getProfileAct } from "../../store/profile/profileSlice";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  useEffect(() => {
    if (formData.password && !formData.password_confirmation) {
      setErrorMsg(t("profile.passwordConfirmationRequired"));
    } else if (
      formData.password &&
      formData.password_confirmation &&
      formData.password !== formData.password_confirmation
    ) {
      setErrorMsg(t("profile.passwordMismatch"));
    } else {
      setErrorMsg("");
    }
  }, [formData.password, formData.password_confirmation, t]);

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setInitialData(formData);
      setIsEditing(false);
      dispatch(getProfileAct());
      console.log(t("profile.updateSuccess"));
    },
    onError: () => {
      setErrorMsg(t("profile.updateError"));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMsg) return;
    if (!hasChanges) return;

    const payload = { ...formData };
    if (!formData.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    mutate(payload);
  };

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
          <div className="w-24 h-24 rounded-full bg-myBlue-1 text-white flex items-center justify-center text-4xl font-semibold shadow-lg">
            {initials}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {formData.name}
          </h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="mainBtn"
          >
            {isEditing ? t("profile.cancel") : t("profile.edit")}
          </button>
        </div>

        {/* Form Section */}
        <form
          className="whiteContainer space-y-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MainInput
              label={t("profile.fullName")}
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.email")}
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.phone")}
              id="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.companyName")}
              id="company_name"
              value={formData.company_name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.city")}
              id="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.taxNumber")}
              id="tax_number"
              type="number"
              value={formData.tax_number}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.password")}
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <MainInput
              label={t("profile.confirmPassword")}
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
              title={t("profile.save")}
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
