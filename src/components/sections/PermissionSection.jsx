import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const PermissionSection = () => {
  return (
    <section className="pagePadding p-4 h-screen flex flex-col items-center justify-center gap-4 text-center">
      <IoWarningOutline className="text-[100px] text-yellow-500" />
      <h2 className="text-2xl font-bold max-w-sm">
        you do not have permission for this page.
      </h2>
      <Link to="/subscription-packages" className="animationBtn">
        Upgrade Permissions
      </Link>
    </section>
  );
};

export default PermissionSection;
