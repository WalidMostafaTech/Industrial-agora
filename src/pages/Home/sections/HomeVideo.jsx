import { useSelector } from "react-redux";
import EmptySection from "../../../components/sections/EmptySection";
import LoadingSection from "../../../components/loading/LoadingSection";

const HomeVideo = () => {
  const { setting, loading, error } = useSelector((state) => state.setting);

  if (loading) return <LoadingSection />;
  if (error || !setting) return <EmptySection />;
  const embedUrl = setting?.video_url?.replace("watch?v=", "embed/");


  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="px-4 max-w-6xl mx-auto">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>
    </section>
  );
};

export default HomeVideo;
