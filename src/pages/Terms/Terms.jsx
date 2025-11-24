import PageTitle from "../../components/common/PageTitle";
import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <section className="container pagePadding">
      <PageTitle title={t("terms.title")} />

      <article className="text-gray-600 lg:text-lg">
        {t("terms.content")}
      </article>
    </section>
  );
};

export default Terms;
