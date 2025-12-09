import PageTitle from "../../components/common/PageTitle";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Terms = () => {
  const { t } = useTranslation();

  const { terms } = useSelector((state) => state.setting);

  return (
    <section className="container pagePadding">
      <PageTitle title={t("terms.title")} />

      <article className="text-gray-600 lg:text-lg">
        {terms && (
          <div
            className="htmlContent mb-4 lg:mb-8"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        )}
      </article>
    </section>
  );
};

export default Terms;
