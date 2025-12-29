import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const PermissionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pagePadding p-4 h-screen flex flex-col items-center justify-center gap-4 text-center">
      <IoWarningOutline className="text-[100px] text-yellow-500" />
      <h2 className="text-2xl font-bold max-w-sm">
        {t("PermissionSection.title")}
      </h2>
      <Link to="subscription-packages" className="animationBtn">
        {t("PermissionSection.upgrade")}
      </Link>
    </section>
  );
};

export default PermissionSection;
