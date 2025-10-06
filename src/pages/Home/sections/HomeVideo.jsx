const HomeVideo = () => {
  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="px-4 max-w-6xl mx-auto mb-8 lg:mb-12">
        <iframe
          src="https://www.youtube.com/embed/gxmOJ_yo7FE?si=VqdoqcBIwv8LtsuN"
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
