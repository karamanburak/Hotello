// Auth
interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface IBearer {
  access: string;
  refresh: string;
}

interface IAuthState {
  currentUser: IUser | null;
  loading: boolean;
  error: boolean;
  bearer: IBearer | null;
}

interface IJwtPayload {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  exp: number;
}

// Terms Modal Type
interface ITermsModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
