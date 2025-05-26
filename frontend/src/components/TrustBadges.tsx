
import { Shield, CreditCard, Building2, CheckCircle } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption"
    },
    {
      icon: CheckCircle,
      title: "Licensed & Regulated",
      description: "FCA & FinCEN approved"
    },
    {
      icon: Building2,
      title: "Trusted Partners",
      description: "Wise, Plaid, Stripe"
    },
    {
      icon: CreditCard,
      title: "PCI Compliant",
      description: "Secure payment processing"
    }
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 text-center">
        Your security is our priority
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <badge.icon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-semibold text-sm text-gray-900">{badge.title}</p>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
