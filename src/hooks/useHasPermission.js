import { useSelector } from "react-redux";

export default function useHasPermission(permission) {
  const permissions =
    useSelector((state) => state.profile.profile?.active_permissions) || [];

  return permissions.includes(permission);
}

// export function useHasAnyPermission(required) {
//   const permissions =
//     useSelector((state) => state.profile.profile?.active_permissions) || [];

//   return required.some((p) => permissions.includes(p));
// }

// export function useHasAllPermissions(required) {
//   const permissions =
//     useSelector((state) => state.profile.profile?.active_permissions) || [];

//   return required.every((p) => permissions.includes(p));
// }
