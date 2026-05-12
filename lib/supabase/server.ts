// Mock Supabase server client for standalone mode
import { getMockUser } from '@/lib/auth/mock-auth'

export async function createClient() {
  return {
    auth: {
      getUser: async () => ({
        data: { user: await getMockUser() },
        error: null
      }),
    }
  }
}
