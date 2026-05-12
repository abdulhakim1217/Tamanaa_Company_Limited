// Mock Supabase client for standalone mode
import { getMockUser, signOut as mockSignOut } from '@/lib/auth/mock-auth'

export function createClient() {
  return {
    auth: {
      getUser: async () => ({
        data: { user: await getMockUser() },
        error: null
      }),
      signOut: mockSignOut,
      signInWithPassword: async ({ email, password }: any) => ({
        data: { user: await getMockUser() },
        error: null
      }),
      signUp: async ({ email, password, options }: any) => ({
        data: { user: await getMockUser() },
        error: null
      }),
    }
  }
}
