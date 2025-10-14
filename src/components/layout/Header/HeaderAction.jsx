import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../common/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../../services/authServices";
import Cookies from "js-cookie";

const HeaderAction = ({ setOpenSearch, setActiveNav, setOpenLinks }) => {
  const user = {
    id: 1,
    name: "John Doe",
  };

  const navigate = useNavigate();

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      Cookies.remove("tokenAG");
      navigate("/login");
    },
    onError: (err) => {
      console.error("❌ Logout failed:", err);
    },
  });

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-4">
      <span
        className="text-2xl lg:text-3xl text-myBlue-2 cursor-pointer pe-2 lg:pe-4 border-e"
        onClick={() => {
          setOpenSearch(true);
          setActiveNav(false);
          setOpenLinks(null);
        }}
      >
        <IoSearchOutline />
      </span>

      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0}>
            <Avatar name={user.name} size="md" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu lg:menu-lg bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
          >
            <li>
              <Link
                to={`/profile/${user.id}`}
                className="flex gap-4 items-center"
              >
                <FaRegUserCircle className="text-2xl" />
                <p>Profile</p>
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            <li>
              <Link to={`/chat`} className="flex gap-4 items-center">
                <BsChatSquareText className="text-2xl" />
                <p>Chat</p>
              </Link>
            </li>

            <li>
              <Link to={`/chat`} className="flex gap-4 items-center">
                <TbShoppingBagPlus className="text-2xl" />
                <p>Subscribe</p>
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            <li className="hover:bg-red-100 rounded">
              <button
                onClick={() => handleLogout()}
                disabled={isPending}
                className="flex gap-4 items-center text-red-600"
              >
                <HiOutlineLogout className="text-2xl" />
                <p>{isPending ? "Logging out..." : "Log Out"}</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/contact-us" className="mainBtn !rounded-full">
          Join us
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
