import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";
import { fetchSetting } from "../../store/setting/setting";

const SettingRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { setting, loading } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch]);

  if (loading || !setting) return <LoadingPage />;

  return children;
};

export default SettingRoute;
