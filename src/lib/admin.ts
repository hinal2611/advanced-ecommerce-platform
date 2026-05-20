export const ADMIN_EMAIL = "hinalsolanki1107@gmail.com";

export function isAdmin(email?: string | null) {
  return email === ADMIN_EMAIL;
}