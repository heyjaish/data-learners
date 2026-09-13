// Simple, reliable hardcoded admin credentials
export const ADMIN_CREDENTIALS = {
  email: "admin@datalearners.com",
  username: "admin",
  password: "adminpassword123",
};

const AUTH_KEY = "data_learners_admin_session";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuthenticated(val: boolean) {
  if (typeof window === "undefined") return;
  if (val) {
    localStorage.setItem(AUTH_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}
