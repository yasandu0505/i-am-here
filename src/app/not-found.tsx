export default function NotFound() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">The page you are looking for does not exist.</p>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Go back home
        </a>
      </div>
    )
  }
  
  