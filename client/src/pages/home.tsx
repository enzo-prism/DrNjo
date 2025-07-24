import { Phone, Mail, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import drNjoHeadshot from "@assets/Dr. Njo_1753322899280.webp";
import drNjoClients from "@assets/dr njo clients_1753323486111.webp";

export default function Home() {
  const handleCall = () => {
    window.location.href = "tel:+16504362939";
  };

  const handleEmail = () => {
    window.location.href = "mailto:dentalstrategies@gmail.com";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 md:py-16 bg-white">
      <div className="max-w-4xl w-full">
        <div className="dental-card overflow-hidden opacity-0 translate-y-5 fade-in-up">
          {/* Professional Photo Section */}
          <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="relative">
              <img 
                src={drNjoHeadshot}
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
                  Dr. Michael Njo is an Author of{" "}
                  <a 
                    href="https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
                  >
                    Dental Practice Transitions Handbook
                  </a>, Director of the Dugoni 
                  Business Club, founded an educational company for transitions -{" "}
                  <a 
                    href="https://practicetransitionsinstitute.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
                  >
                    Practice Transitions Institute
                  </a>, 
                  he is part of the admission's team for UOP, serves on the Board of Directors at the Dugoni School 
                  of Dentistry, and the CDA Leadership Council.
                </p>
              </div>
            </div>

            {/* Education & Resources */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h3 className="text-xl font-light text-gray-800">Education & Resources</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Featured Publication */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                    <h4 className="text-lg font-medium text-gray-900">Published Book</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 mb-3">
                    Dental Practice Transitions Handbook
                  </h5>
                  <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
                    Comprehensive guide for navigating practice transitions, partnerships, and strategic planning.
                  </p>
                  <a 
                    href="https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Amazon
                  </a>
                </div>

                {/* Educational Institute */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 text-blue-600 mr-3" />
                    <h4 className="text-lg font-medium text-gray-900">Educational Institute</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 mb-3">
                    Practice Transitions Institute
                  </h5>
                  <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
                    Specialized education and training for dental professionals on practice transitions and growth strategies.
                  </p>
                  <a 
                    href="https://practicetransitionsinstitute.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Institute
                  </a>
                </div>
              </div>
            </div>

            {/* Client Success Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-light text-gray-800 mb-8 text-center">Working with Dental Professionals Nationwide</h3>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={drNjoClients}
                  alt="Dr. Michael Njo with dental professionals at a consulting workshop"
                  className="w-full h-auto object-cover client-success-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4 font-light">
                Dr. Njo conducting a practice transition workshop with dental professionals
              </p>
            </div>

            {/* Free Consultation CTA */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-light text-gray-800 mb-6">
                Schedule Your Free Consultation
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Call Button */}
                <button 
                  onClick={handleCall}
                  className="dental-button-primary inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call for Free Consultation
                </button>

                {/* Email Button */}
                <button 
                  onClick={handleEmail}
                  className="dental-button-secondary inline-flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Email for Free Consultation
                </button>
              </div>
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
