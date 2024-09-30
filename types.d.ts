// Auth
interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  isActive: boolean;
  isStaff: boolean;
  isAdmin: boolean;
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
