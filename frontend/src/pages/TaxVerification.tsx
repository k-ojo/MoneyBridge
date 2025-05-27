import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Mail, Shield } from "lucide-react";

const TaxVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transferData = location.state;

  const handleContactSupport = () => {
    window.location.href = "mailto:support@moneytransfer.com";
  };

  const handlePhoneSupport = () => {
    window.location.href = "tel:+18005551234";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Verification Required</h1>
          <p className="text-lg text-gray-600">Your transfer requires additional verification</p>
        </div>

        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-orange-800 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Transfer Verification Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-800 font-semibold mb-2">
                  ⚠️ Your transfer has triggered a tax verification check.
                </p>
                <p className="text-gray-700">
                  According to our compliance policy, large international transfers may require verification of tax clearance to comply with financial regulations.
                </p>
              </div>

              {transferData && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Transfer Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Recipient:</span>
                      <p className="font-semibold">{transferData.recipientName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Bank:</span>
                      <p className="font-semibold">{transferData.selectedBank}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <p className="font-semibold text-lg">${transferData.amount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account:</span>
                      <p className="font-semibold">{transferData.accountNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Our Tax Clearance Team</h3>
                <p className="text-gray-700 mb-6">
                  To proceed with your transfer, please provide the required details in the form below. Our tax clearance team will review your information and contact you within 24 hours. For any questions or assistance, feel free to reach out to our support team.                </p>

                {/* Moved submit buttons here */}
                <div className="flex space-x-4 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    Return to Dashboard
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => navigate("/transfer")}
                    className="flex-1"
                  >
                    Submit for Security Verification
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Send us details about your transfer
                      </p>
                      <Button 
                        onClick={handleContactSupport}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        support@moneytransfer.com
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardContent className="p-6 text-center">
                      <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Speak directly with our team
                        Currently unavailable
                      </p>
                      <Button 
                        onClick={handlePhoneSupport}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        +44-XXX-XXX-XXXX
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🔒 Security & Compliance</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• This verification protects you and complies with international banking laws</li>
                  <li>• Your transfer is secure and will be processed once verification is complete</li>
                  <li>• All customer data is encrypted and handled according to privacy regulations</li>
                  <li>• Processing typically takes 1-2 business days after verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxVerification;
