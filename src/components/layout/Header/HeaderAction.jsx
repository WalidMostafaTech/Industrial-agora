import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutAct } from "../../../store/profile/profileSlice";
import useHasPermission from "../../../hooks/useHasPermission";
import { PERMISSIONS } from "../../../permissions";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { LuClipboardList } from "react-icons/lu";

const HeaderAction = ({ setOpenSearch, setActiveNav, setOpenLinks }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const canSearch = useHasPermission(PERMISSIONS.VIEW_SEARCH_LISTINGS);
  const canChat = useHasPermission(PERMISSIONS.CHAT_MEMBERS);

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 xl:gap-4">
      <LanguageSwitcher />

      {canSearch && (
        <span
          className="text-2xl text-myBlue-2 cursor-pointer pe-2 lg:pe-4 border-e"
          onClick={() => {
            setOpenSearch(true);
            setActiveNav(false);
            setOpenLinks(null);
          }}
        >
          <IoSearchOutline />
        </span>
      )}

      {profile ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="cursor-pointer">
            <Avatar name={profile?.name} size="md" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
          >
            <li>
              <Link
                to={`/profile`}
                className="flex gap-2 lg:gap-4 items-center"
              >
                <FaRegUserCircle className="text-2xl" />
                <p>{t("header_action.profile")}</p>
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            <li>
              <Link
                to={`/my-products`}
                className="flex gap-2 lg:gap-4 items-center"
              >
                <LuClipboardList className="text-2xl" />
                <p>{t("header_action.my_products")}</p>
              </Link>
            </li>

            {canChat && (
              <li>
                <Link to={`/chat`} className="flex gap-2 lg:gap-4 items-center">
                  <BsChatSquareText className="text-2xl" />
                  <p>{t("header_action.chat")}</p>
                </Link>
              </li>
            )}

            <li>
              <Link
                to={
                  profile?.subscription
                    ? `/subscription-details`
                    : `/subscription-packages`
                }
                className="flex gap-2 lg:gap-4 items-center"
              >
                <TbShoppingBagPlus className="text-2xl" />
                <p>{t("header_action.subscription")}</p>
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            <li className="hover:bg-red-100 rounded">
              <button
                onClick={() => dispatch(logoutAct())}
                className="flex gap-2 lg:gap-4 items-center text-red-700"
              >
                <HiOutlineLogout className="text-2xl" />
                <p>{t("header_action.log_out")}</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login" className="mainBtn !rounded-full">
          {t("header_action.join_us")}
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
