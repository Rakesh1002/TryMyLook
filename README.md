# trymylook AI - Virtual Try-On Platform

An AI-powered virtual try-on solution that helps e-commerce businesses increase sales and reduce returns through immersive shopping experiences.

## Features

- 🎯 Virtual Try-On Technology

  - Real-time garment visualization
  - Support for multiple clothing categories
  - High-quality image processing

- 🖼️ Image Management

  - Pre-loaded model images
  - Custom image upload support
  - Before/After comparison slider

- 💫 Interactive UI
  - Responsive design
  - Smooth animations
  - Real-time preview

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **API Integration**: Microsoft Graph API, Kling AI API
- **Authentication**: JWT
- **Database**: Prisma

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/trymylook-ai.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
AZURE_TENANT_ID=your_tenant_id
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
KLING_ACCESS_KEY=your_kling_access_key
KLING_SECRET_KEY=your_kling_secret_key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── components/
│   └── ui/           # Reusable UI components
└── lib/              # Shared libraries
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For enterprise solutions and inquiries, please contact our sales team through the [contact form](https://trymylook.xyz/#contact) on our website.
