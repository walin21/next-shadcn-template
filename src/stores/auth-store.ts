import { create } from "zustand";
import { getCookie, setCookie, removeCookie } from "@/lib/cookies";
import { AuthState } from "@/types/user.type";
import { APP_CONSTANTS } from "@/lib/constants";

const USER_INFO = APP_CONSTANTS.USER_INFO;

export const useAuthStore = create<AuthState>()((set) => {
  const cookieUser = getCookie(USER_INFO);
  const initUser = cookieUser ? JSON.parse(cookieUser) : "";
  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => {
          setCookie(USER_INFO, JSON.stringify(user));
          return { ...state, auth: { ...state.auth, user } };
        }),
      reset: () =>
        set((state) => {
          removeCookie(USER_INFO);
          return {
            ...state,
            auth: { 
              ...state.auth,
              user: null,
            },
          };
        }),
    },
  };
});
