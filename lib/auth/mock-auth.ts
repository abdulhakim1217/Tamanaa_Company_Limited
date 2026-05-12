// Mock authentication for standalone mode (no Supabase)

export interface MockUser {
  id: string
  email: string
  user_metadata: {
    first_name?: string
    last_name?: string
    avatar_url?: string
  }
}

// Mock user for development
const mockUser: MockUser = {
  id: 'mock-user-123',
  email: 'demo@tamanaa.com',
  user_metadata: {
    first_name: 'Demo',
    last_name: 'User',
  }
}

export async function getMockUser(): Promise<MockUser | null> {
  // Always return mock user in standalone mode
  return mockUser
}

export async function signOut() {
  // Mock sign out - does nothing in standalone mode
  return { error: null }
}

export async function signIn(email: string, password: string) {
  // Mock sign in - always succeeds
  return { data: { user: mockUser }, error: null }
}

export async function signUp(email: string, password: string, metadata?: any) {
  // Mock sign up - always succeeds
  return { data: { user: { ...mockUser, user_metadata: metadata } }, error: null }
}

// Mock client for compatibility
export function createClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: mockUser }, error: null }),
      signOut: signOut,
      signInWithPassword: signIn,
      signUp: signUp,
    }
  }
}
