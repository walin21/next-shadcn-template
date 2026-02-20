interface AuthUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    reset: () => void;
  };
}

export type { AuthUser, AuthState };