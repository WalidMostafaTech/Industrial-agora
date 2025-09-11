const PageTitle = ({ title }) => {
  return (
    <hgroup
      className="mb-4 lg:mb-10 text-center border-b border-gray-300 pb-4 lg:pb-6 relative
    after:content-[''] after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1/5 after:h-1 after:bg-myBlue-2"
    >
      <h2 className="text-3xl lg:text-5xl font-bold">{title}</h2>
    </hgroup>
  );
};

export default PageTitle;
