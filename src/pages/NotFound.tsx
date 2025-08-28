import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 shadow-large max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow">Page Not Found</h2>
          <p className="text-white/80 mb-8 drop-shadow">
            Oops! The page you're looking for doesn't exist in the ACTIV System.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button variant="hero" size="lg" className="w-full">
                <Home className="w-5 h-5 mr-2" />
                Return to Dashboard
              </Button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
