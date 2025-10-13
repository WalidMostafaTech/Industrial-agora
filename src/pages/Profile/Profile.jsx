import { useParams } from "react-router-dom";
import { useState } from "react";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";

const Profile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    id: 1,
    name: "walid mostafa",
    email: "walid@example.com",
    number: "0123456789",
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  // أول حرفين من الاسم (كابيتال)
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <article className="container pagePadding">
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-full bg-myBlue-1 text-white flex items-center justify-center text-4xl font-semibold shadow-lg">
            {initials}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {user.name}
          </h2>
          <button onClick={handleEditToggle} className="mainBtn">
            {isEditing ? "cancel" : "Edit"}
          </button>
        </div>

        {/* Form Section */}
        <form
          className="whiteContainer space-y-4 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <MainInput
            label="full name"
            id="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <MainInput
            label="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <MainInput
            label="number"
            id="number"
            value={user.number}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <FormError errorMsg="" />

          {isEditing && <FormBtn type="save" />}
        </form>
      </section>
    </article>
  );
};

export default Profile;
