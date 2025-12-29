import { Link, useParams, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  const { lang } = useParams();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-7xl font-bold text-red-500">!</h1>

      <h2 className="text-2xl font-bold">{t("ErrorPage.title")}</h2>

      <p className="text-gray-500 max-w-md">
        {error?.message || t("ErrorPage.description")}
      </p>

      <div className="flex gap-3 mt-4">
        <button onClick={() => window.location.reload()} className="mainBtn">
          {t("ErrorPage.reload")}
        </button>

        <Link to={`/${lang}`} replace className="mainBtn outline">
          {t("ErrorPage.goHome")}
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
