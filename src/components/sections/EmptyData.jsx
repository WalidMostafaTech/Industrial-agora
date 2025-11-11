import emptyIcon from "../../assets/icons/folder-empty@3x.png";

const EmptyData = () => {
  return (
    <div>
      <img
        src={emptyIcon}
        alt="No Data"
        className="mx-auto mb-4 w-32 lg:w-36"
      />
      <p className="text-center text-gray-500 text-lg font-semibold">
        No Data Available
      </p>
    </div>
  );
};

export default EmptyData;
