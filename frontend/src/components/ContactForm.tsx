import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Shield, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  recipientName: string;
  selectedBankName: string;
  amount: string;
  accountNumber: string;
}

const ContactForm = ({ recipientName, selectedBankName, amount, accountNumber }: ContactFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContactSubmit = async () => {
    if (!firstName || !lastName || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Contact Request Submitted",
        description: "Thank you! Our support team will contact you within 24 hours to complete your transfer.",
      });
      navigate("/dashboard");
    }, 2000);
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@moneytransfer.com";
  };

  const handlePhoneSupport = () => {
    window.location.href = "tel:+18005551234";
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Verification & Security Check</h1>
        <p className="text-gray-600">Your transfer requires additional verification and tax clearance</p>
      </div>

      <Card className="max-w-4xl mx-auto border-orange-200 shadow-lg">
        <CardHeader className="bg-orange-50 border-b border-orange-200">
          <CardTitle className="text-orange-800 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Transfer Verification & Tax Clearance Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-800 font-semibold mb-2">
              ⚠️ Your transfer has triggered a tax verification check.
            </p>
            <p className="text-gray-700">
              According to our compliance policy, large international transfers may require verification of tax clearance to comply with financial regulations.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 text-blue-900">Your Transfer Request</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <span className="text-blue-600">Recipient:</span>
                <p className="font-semibold">{recipientName}</p>
              </div>
              <div>
                <span className="text-blue-600">Bank:</span>
                <p className="font-semibold">{selectedBankName}</p>
              </div>
              <div>
                <span className="text-blue-600">Amount:</span>
                <p className="font-semibold text-lg">${parseFloat(amount || "0").toLocaleString()}</p>
              </div>
              <div>
                <span className="text-blue-600">Account:</span>
                <p className="font-semibold">{accountNumber}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Your Contact Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any specific requirements or questions about your transfer..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Tax Clearance Contact */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Our Tax Clearance Team</h3>
              <p className="text-gray-700 mb-6">
                To proceed with your transfer, please contact our specialized tax clearance team. 
                This process is mandatory for your security and in accordance with financial regulations.
              </p>

              <div className="space-y-4">
                <Card className="border-blue-200">
                  <CardContent className="p-4 text-center">
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
                  <CardContent className="p-4 text-center">
                    <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Speak directly with our team
                    </p>
                    <Button 
                      onClick={handlePhoneSupport}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      +1-800-555-1234
                    </Button>
                  </CardContent>
                </Card>
              </div>
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

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleContactSubmit}
              disabled={!firstName || !lastName || !email || !phone || isLoading}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? "Submitting Request..." : "Submit for Security Verification"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Return to Dashboard
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Required fields. Our support team will contact you within 24 hours to complete your transfer.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactForm;