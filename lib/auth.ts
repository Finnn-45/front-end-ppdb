export interface AdminUser {
  id: string
  username: string
  name: string
  role: "admin" | "super_admin"
}

// Mock admin users
const mockAdmins: (AdminUser & { password: string })[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    name: "Administrator",
    role: "admin",
  },
  {
    id: "2",
    username: "superadmin",
    password: "super123",
    name: "Super Administrator",
    role: "super_admin",
  },
]

export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const admin = mockAdmins.find((a) => a.username === username && a.password === password)
  if (admin) {
    const { password: _, ...adminUser } = admin
    return adminUser
  }
  return null
}

export function getStoredAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("ppdb_admin")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export function storeAdmin(admin: AdminUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("ppdb_admin", JSON.stringify(admin))
  }
}

export function clearStoredAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ppdb_admin")
  }
}
