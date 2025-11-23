import { useTranslation } from "react-i18next";
import emptyIcon from "../../assets/icons/folder-empty@3x.png";

const EmptyData = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img
        src={emptyIcon}
        alt="No Data"
        className="mx-auto mb-4 w-32 lg:w-36"
      />
      <p className="text-center text-gray-500 text-lg font-semibold">
        {t("noDataAvailable")}
      </p>
    </div>
  );
};

export default EmptyData;
