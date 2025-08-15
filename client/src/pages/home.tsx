import { Phone, Mail, BookOpen, ExternalLink, GraduationCap, MessageCircle, Star, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import drNjoHeadshot from "@assets/Dr. Njo_1753322899280.webp";
import drNjoClients from "@assets/dr njo clients_1753323486111.webp";

export default function Home() {
  const handleCall = () => {
    window.location.href = "tel:+16504362939";
  };

  const handleEmail = () => {
    window.location.href = "mailto:dentalstrategies@gmail.com";
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-4xl w-full">
        <div className="dental-card overflow-hidden opacity-0 translate-y-5 fade-in-up">
          {/* Professional Photo Section */}
          <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
            <div className="relative">
              <img 
                src={drNjoHeadshot}
                alt="Dr. Michael Njo - Professional headshot"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-2xl ring-4 ring-white dark:ring-gray-800 professional-headshot transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Company Name & Introduction */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 dark:text-gray-100 mb-6 tracking-tight transition-colors duration-300 opacity-0 animate-[fadeInStagger_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]">
                Dr. Michael Njo
              </h1>
              <div className="mb-8">
                <p className="text-base text-gray-500 dark:text-gray-400 mb-4 font-light uppercase tracking-wider transition-colors duration-300">
                  Founder:
                </p>
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-100 transition-colors duration-300 stagger-fade-in">
                    Dental Strategies
                  </h2>
                  <h3 className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-200 transition-colors duration-300 stagger-fade-in">
                    HealthcareStrategiesMD
                  </h3>
                  <h3 className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-200 transition-colors duration-300 stagger-fade-in">
                    Business Strategies
                  </h3>
                  <h3 className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-200 transition-colors duration-300 stagger-fade-in">
                    Practice Transitions Institute
                  </h3>
                </div>
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed transition-colors duration-300">
                  Specialized consulting company coaching dentists, MDs, Podiatrists, Osteopaths, and general business owners to achieve and understand their goals
                </p>
                <div className="mt-6">
                  <a 
                    href="https://practicetransitionsinstitute.com/client-testimonials/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                  >
                    <Star className="w-4 h-4 mr-1 fill-current animate-[starSparkle_2s_ease-in-out_infinite]" />
                    <span className="hover-underline">Trusted by hundreds of healthcare professionals</span>
                    <ExternalLink className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="max-w-3xl mx-auto mb-12 text-left scroll-fade-in">
              <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300">Professional Background</h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                <p>
                  Dr. Michael Njo is a proud graduate of UOP, School of Dentistry. After herniating his disc, 
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
                  and practice. He will develop a program to implement and facilitate the goals you desire.{" "}
                  <a 
                    href="https://practicetransitionsinstitute.com/client-testimonials/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    <span className="underline">Read what clients are saying</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
                
                <p>
                  Dr. Michael Njo is an Author of{" "}
                  <a 
                    href="https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                  >
                    Dental Practice Transitions Handbook
                  </a>, Director of the Dugoni 
                  Business Club, founded an educational company for transitions -{" "}
                  <a 
                    href="https://practicetransitionsinstitute.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
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
                <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 transition-colors duration-300">Education & Resources</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Featured Publication */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">Published Book</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                    Dental Practice Transitions Handbook
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">Educational Institute</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                    Practice Transitions Institute
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
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
              <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300 scroll-fade-in">Working with Dental Professionals Nationwide</h3>
              <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 scroll-fade-in">
                <img 
                  src={drNjoClients}
                  alt="Dr. Michael Njo with dental professionals at a consulting workshop"
                  className="w-full h-auto object-cover client-success-image parallax-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 font-light transition-colors duration-300">
                Dr. Njo conducting a practice transition workshop with dental professionals
              </p>
              
              {/* Testimonials Call to Action */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-800 transition-all duration-300 scroll-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 opacity-0 animate-[fadeInStagger_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{animationDelay: `${1.5 + i * 0.1}s`}} />
                    ))}
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                  Trusted by Healthcare Professionals for 25+ Years
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-light transition-colors duration-300">
                  Discover how Dr. Njo has helped hundreds of dentists, physicians, and healthcare professionals achieve their practice goals.
                </p>
                <a 
                  href="https://practicetransitionsinstitute.com/client-testimonials/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Read Client Testimonials
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Free Consultation CTA */}
            <div className="text-center mb-8 scroll-fade-in">
              <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
                Schedule Your Free Consultation
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Call Button */}
                <button 
                  onClick={handleCall}
                  className="dental-button-primary inline-flex items-center justify-center magnetic-button"
                >
                  <Phone className="w-5 h-5 mr-3 transition-transform group-hover:rotate-12" />
                  Call for Free Consultation
                </button>

                {/* Email Button */}
                <button 
                  onClick={handleEmail}
                  className="dental-button-secondary inline-flex items-center justify-center magnetic-button"
                >
                  <Mail className="w-5 h-5 mr-3 transition-transform group-hover:translate-x-1" />
                  Email for Free Consultation
                </button>
              </div>
            </div>

            {/* Professional Touch */}
            <div className="text-center pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-sm text-gray-400 dark:text-gray-500 font-light transition-colors duration-300">
                25 years of consulting excellence • Direct referral based practice
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
