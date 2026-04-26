# Tamanaa Company Limited - Rice Processing Management System

A comprehensive rice processing factory management system built with Next.js, featuring Production, Inventory, Sales, Finance, and HR modules specifically designed for rice processing operations.

## Features

### 🏭 Production Management
- Production line monitoring and control
- Raw material processing tracking
- Quality control and testing
- Processing stage management
- Production efficiency analytics

### 📦 Inventory Management
- Raw rice paddy inventory
- Finished rice products
- Packaging materials tracking
- Stock level monitoring
- Supplier management

### 💰 Sales & Distribution
- Customer relationship management
- Order processing and tracking
- Distributor network management
- Sales analytics and reporting

### 💳 Finance
- Chart of accounts
- Transaction management
- Invoice generation
- Cost analysis for rice processing
- Financial reporting

### 👥 Human Resources
- Employee management
- Department organization
- Attendance tracking
- Leave management
- Payroll processing

### 🔐 Authentication & Security
- Supabase authentication
- Role-based access control
- Secure session management

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Authentication**: Supabase Auth
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel-ready

## Rice Processing Specific Features

### Production Lines
- **Line A**: Premium Basmati Processing (2,000 kg/hour)
- **Line B**: Standard Rice Processing (3,000 kg/hour)
- **Line C**: Parboiled Rice Processing (2,500 kg/hour)
- **Line D**: Broken Rice Processing (1,500 kg/hour)

### Rice Varieties Supported
- Premium Basmati (Super Basmati, Kainat, etc.)
- Standard Rice (IRRI-6, IRRI-9)
- Parboiled Rice (PK-386, KS-282)
- Broken Rice and By-products

### Quality Control
- Moisture content monitoring
- Grain quality grading (A+, A, B+, B, C)
- Foreign matter detection
- Color sorting and classification

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Neon PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tamanaa-rice-processing
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `DATABASE_URL`: Your Neon PostgreSQL connection string

4. **Set up the database**
   
   Run the SQL scripts in order:
   ```bash
   # Connect to your Neon database and run:
   # 1. scripts/001_create_schema.sql
   # 2. scripts/002_seed_data.sql
   ```

5. **Configure Supabase Authentication**
   
   In your Supabase dashboard:
   - Go to Authentication > Settings
   - Add your site URL: `http://localhost:3000` (development)
   - Add redirect URLs: `http://localhost:3000/auth/callback`

6. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── production/    # Production management
│   │   ├── inventory/     # Inventory management
│   │   ├── sales/         # Sales & distribution
│   │   ├── finance/       # Financial management
│   │   └── hr/           # Human resources
│   ├── auth/             # Authentication pages
│   └── api/              # API routes
├── components/           # Reusable UI components
│   └── ui/              # Base UI components
├── lib/                 # Utility libraries
│   ├── database.ts      # Database functions
│   ├── db.ts           # Database connection
│   └── supabase/       # Supabase clients
└── scripts/            # Database scripts
```

## Key Features Implemented

### ✅ Production Management
- Real-time production line monitoring
- Raw material tracking and quality control
- Processing stage management
- Production efficiency analytics

### ✅ Rice-Specific Inventory
- Raw rice paddy management with quality grades
- Finished rice products categorization
- Packaging materials tracking
- Moisture content and quality monitoring

### ✅ Sales & Distribution
- Customer and distributor management
- Order processing for rice products
- Sales analytics and reporting
- Distribution network tracking

### ✅ Quality Control System
- Grain quality grading (A+, A, B+, B, C)
- Moisture content monitoring
- Foreign matter detection
- Batch tracking and traceability

### ✅ Financial Management
- Rice processing cost analysis
- Supplier payment management
- Customer invoicing
- Profitability analysis by rice variety

### ✅ Dashboard & Analytics
- Production line status monitoring
- Daily output tracking
- Quality metrics
- Sales performance indicators

## Rice Processing Workflow

1. **Raw Material Intake**
   - Quality inspection and grading
   - Moisture content testing
   - Storage allocation

2. **Processing**
   - Cleaning and sorting
   - Hulling and milling
   - Polishing and grading
   - Quality control checkpoints

3. **Packaging**
   - Weight verification
   - Packaging material selection
   - Labeling and batch coding

4. **Distribution**
   - Order fulfillment
   - Quality certificates
   - Delivery scheduling

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Optional |

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the database schema in `scripts/`

---

Built with ❤️ for Tamanaa Company Limited - Leading Rice Processing Excellence