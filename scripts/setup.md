# Tamanaa MIS Setup Guide

## Prerequisites

1. **Node.js 18+** and **pnpm** installed
2. **Supabase account** (free tier available)
3. **Neon PostgreSQL database** (free tier available)

## Step-by-Step Setup

### 1. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the required environment variables in `.env.local`:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Neon Database Configuration
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   
   # Development Configuration
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

### 2. Supabase Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Configure Authentication:**
   - In Supabase Dashboard → Authentication → Settings
   - Add Site URL: `http://localhost:3000` (for development)
   - Add Redirect URLs: `http://localhost:3000/auth/callback`
   - Enable Email authentication

3. **Optional: Configure Email Templates**
   - Customize signup confirmation and password reset emails
   - Add your company branding

### 3. Neon Database Setup

1. **Create a Neon Database:**
   - Go to [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **Run Database Scripts:**
   - Connect to your Neon database using the SQL Editor or a PostgreSQL client
   - Execute the scripts in order:
     1. `scripts/001_create_schema.sql` - Creates all tables and indexes
     2. `scripts/002_seed_data.sql` - Adds initial data (departments, roles, accounts, etc.)

### 4. Install Dependencies and Run

1. **Install packages:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Open the application:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should be redirected to the login page

### 5. Create Your First Admin User

1. **Sign up through the UI:**
   - Go to `/auth/sign-up`
   - Create an account with your email
   - Check your email for verification

2. **Promote to Admin (via database):**
   ```sql
   -- Connect to your Neon database and run:
   UPDATE users SET role_id = 'r1000000-0000-0000-0000-000000000001' 
   WHERE email = 'your-email@example.com';
   ```

### 6. Verify Setup

1. **Test Authentication:**
   - Sign in with your credentials
   - Should redirect to dashboard

2. **Test Database Connection:**
   - Navigate to different modules (HR, Finance, etc.)
   - Data should load from the database
   - If you see mock data, check your DATABASE_URL

3. **Test CRUD Operations:**
   - Try adding a new employee
   - Create a customer record
   - Verify data persists

## Production Deployment

### Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Update Supabase redirect URLs to include your production domain

3. **Update Environment Variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_neon_connection_string
   ```

### Other Deployment Options

- **Docker:** Use the included Dockerfile
- **Railway:** Connect GitHub repository
- **Netlify:** Configure build settings for Next.js

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Verify DATABASE_URL format
   - Check Neon database is running
   - Ensure SSL mode is enabled

2. **Authentication Issues:**
   - Verify Supabase URLs and keys
   - Check redirect URLs configuration
   - Ensure email verification is working

3. **Build Errors:**
   - Run `pnpm install` to ensure all dependencies
   - Check TypeScript errors with `pnpm build`
   - Verify environment variables are set

### Getting Help

1. **Check the logs:**
   - Browser console for frontend errors
   - Server logs for API errors
   - Supabase logs for auth issues

2. **Database debugging:**
   - Use Neon SQL Editor to test queries
   - Check table structure matches schema
   - Verify seed data was inserted

3. **Environment issues:**
   - Double-check all environment variables
   - Ensure no trailing spaces or quotes
   - Restart development server after changes

## Next Steps

After successful setup:

1. **Customize the system:**
   - Update company branding
   - Modify department and role structures
   - Configure email templates

2. **Add users:**
   - Create employee accounts
   - Assign appropriate roles
   - Set up department structure

3. **Configure modules:**
   - Set up chart of accounts
   - Add product categories
   - Import customer data

4. **Security:**
   - Review and configure RLS policies
   - Set up backup procedures
   - Configure monitoring

## Support

For additional help:
- Check the main README.md
- Review the database schema in `scripts/`
- Create an issue in the repository