import { getProcessOutsourcePage } from "../../services/mainServices";
import ProcessOutSourceHero from "./sections/ProcessOutSourceHero";
import ProcessOutSourceSlider from "./sections/ProcessOutSourceSlider";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/Loading/LoadingPage";

const ProcessOutSource = () => {
  const { data: processOutsourceData, isLoading } = useQuery({
    queryKey: ["process-outsource-page"],
    queryFn: getProcessOutsourcePage,
  });

  if (isLoading) return <LoadingPage />;

  return (
    <article>
      <ProcessOutSourceHero image={processOutsourceData?.bg_banner} />
      <ProcessOutSourceSlider list={processOutsourceData?.data} />
    </article>
  );
};

export default ProcessOutSource;
