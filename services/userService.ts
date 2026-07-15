import { apiFetch } from "@/lib/api";

interface SaveUserPayload {
  name: string;
  email: string;
  image?: string;
}

interface UserResponse {
  success: boolean;
  message?: string;
  insertedId?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "admin" | "student";
  createdAt: string;
}

interface GetUserResponse {
  success: boolean;
  data: User;
}

interface GetRoleResponse {
  success: boolean;
  role: "admin" | "student";
}

export async function saveUser(user: SaveUserPayload) {
  return apiFetch<UserResponse>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function getUser(email: string) {
  return apiFetch<GetUserResponse>(
    `/users/${encodeURIComponent(email)}`
  );
}

export async function getUserRole(email: string) {
  return apiFetch<GetRoleResponse>(
    `/users/role/${encodeURIComponent(email)}`
  );
}

export async function updateUser(
  email: string,
  data: {
    name: string;
    image: string;
  }
) {
  return apiFetch<UserResponse>(
    `/users/${encodeURIComponent(email)}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}