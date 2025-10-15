import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutAct } from "../../../store/profile/profileSlice";

const HeaderAction = ({ setOpenSearch, setActiveNav, setOpenLinks }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

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

      {profile ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0}>
            <Avatar name={profile?.name} size="md" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu lg:menu-lg bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
          >
            <li>
              <Link
                to={`/profile/${profile?.id}`}
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
                onClick={() => dispatch(logoutAct())}
                className="flex gap-4 items-center text-red-600"
              >
                <HiOutlineLogout className="text-2xl" />
                <p>Log Out</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login" className="mainBtn !rounded-full">
          Join us
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
