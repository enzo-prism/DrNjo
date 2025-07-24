import { Phone, Mail } from "lucide-react";

export default function Home() {
  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const handleEmail = () => {
    window.location.href = "mailto:contact@dentalstrategies.com";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 md:py-16 bg-white">
      <div className="max-w-2xl w-full">
        <div className="dental-card overflow-hidden opacity-0 translate-y-5 animate-in duration-600 fill-mode-forwards">
          {/* Professional Photo Section */}
          <div className="relative h-64 md:h-80 bg-gray-50">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Modern dental office reception area with clean professional design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 dental-gradient"></div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 text-center">
            {/* Company Name */}
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-tight">
              Dental Strategies
            </h1>

            {/* Body Text */}
            <div className="max-w-lg mx-auto mb-10">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                Comprehensive dental care with a focus on preventive treatment, 
                aesthetic enhancement, and patient comfort. Experience modern dentistry 
                in a welcoming, professional environment.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Call Button */}
              <button 
                onClick={handleCall}
                className="dental-button-primary inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call Now
              </button>

              {/* Email Button */}
              <button 
                onClick={handleEmail}
                className="dental-button-secondary inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-3" />
                Send Email
              </button>
            </div>

            {/* Subtle Professional Touch */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400 font-light">
                Professional dental care you can trust
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
