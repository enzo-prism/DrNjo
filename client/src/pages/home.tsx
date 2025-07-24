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
      <div className="max-w-4xl w-full">
        <div className="dental-card overflow-hidden opacity-0 translate-y-5 fade-in-up">
          {/* Professional Photo Section */}
          <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="relative">
              <img 
                src="/attached_assets/Dr. Njo_1753322899280.webp"
                alt="Dr. Michael Njo - Professional headshot"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-2xl ring-4 ring-white professional-headshot"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Company Name & Introduction */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight">
                Dr. Michael Njo
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-gray-600 mb-6">
                Dental Strategies
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Specialized consulting company coaching dentists to achieve and understand their goals
              </p>
            </div>

            {/* Professional Background */}
            <div className="max-w-3xl mx-auto mb-12 text-left">
              <h3 className="text-xl font-light text-gray-800 mb-6 text-center">Professional Background</h3>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Dr. Michael Njo is a proud graduate of UOP, School of Dentistry. After hibernating his disk, 
                  Dr. Njo founded Dental Strategies. Dental Strategies is a specialized consulting company which 
                  coaches Dentist to achieving and understanding their goals.
                </p>
                
                <p>
                  Just a few goals to mention range from, starting a practice whether a start-up or purchase, 
                  forming partnerships, expansions, retirement strategies, selling practices, valuations, 
                  malpractice, and conflict issues, introducing technology, team building, and implementing 
                  operating systems to achieve the maximum efficiency and profitability for their offices.
                </p>
                
                <p>
                  Dr. Michael Njo has been consulting for 25 years and has built his consulting company all by 
                  direct referral. Dental Strategies customizes his program for the specific needs of the doctor 
                  and practice. He will develop a program to implement and facilitate the goals you desire.
                </p>
                
                <p>
                  Dr. Michael Njo is an Author of Dental Practice Transitions Handbook, Director of the Dugoni 
                  Business Club, founded an educational company for transitions - www.practicetransitionsinstitute.com, 
                  he is part of the admission's team for UOP, serves on the Board of Directors at the Dugoni School 
                  of Dentistry, and the CDA Leadership Council.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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

            {/* Professional Touch */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400 font-light">
                25 years of consulting excellence • Direct referral based practice
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
