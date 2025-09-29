import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar";
import { useRef, useState } from "react";
import DropDown from "../../common/DropDown";

const HeaderAction = ({ setOpenSearch, setActiveNav, setOpenLinks }) => {
  const user = {
    name: "John Doe",
  };

  const profileBtnRef = useRef();

  const [openProfile, setOpenProfile] = useState(false);

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
        <div
          ref={profileBtnRef}
          onClick={() => setOpenProfile((prev) => !prev)}
          className="flex items-center gap-2 relative cursor-pointer"
        >
          <Avatar name={user.name} size="md" active={openProfile} />

          <DropDown
            onClose={() => setOpenProfile(false)}
            buttonRef={profileBtnRef}
            openDropdown={openProfile}
          >
            <div className="bg-white min-w-32 lg:min-w-52 p-2">
              <p>{user.name}</p>
            </div>
          </DropDown>
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
