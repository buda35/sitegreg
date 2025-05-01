# Service de Ramonage Website

A modern website for a chimney sweeping service built with Next.js, Tailwind CSS, and Supabase.

## Features

- Responsive design with mobile-first approach
- Modern UI components with animations
- Image optimization with Next.js Image component
- Supabase integration for backend services
- SEO optimized
- Smooth scrolling and transitions

## Tech Stack

- Next.js 13.4.12
- React 18.2.0
- Tailwind CSS 3.2.0
- Supabase
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/
├── app/                 # Pages and routes
├── components/          # Reusable UI components
├── public/             # Static assets
│   └── uploads/        # Image uploads directory
├── styles/             # Global styles
├── utils/              # Utility functions
├── supabase/           # Supabase configuration
└── admin/              # Admin interface
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 