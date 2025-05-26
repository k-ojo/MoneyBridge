
import { LoginForm } from "@/components/LoginForm";
import { TrustBadges } from "@/components/TrustBadges";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { SecurityFeatures } from "@/components/SecurityFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MoneyBridge</span>
          </div>
          <div className="text-sm text-gray-600">
           Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Send Money <span className="text-blue-600">Worldwide</span>
              </h1>
              <p className="text-lg text-gray-600">
                Fast, secure, and affordable transfers to over 100 countries
              </p>
            </div>
            
            <LoginForm />
            
            <SecurityFeatures />
          </div>

          {/* Right Side - Trust Building */}
          <div className="space-y-8">
            <TestimonialCarousel />
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2024 MoneyTransfer. All rights reserved. | Licensed and regulated in the US and EU</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
