import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, DollarSign, Building2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const apiUrl = import.meta.env.VITE_API_URL;

const PENDING_DURATION = 3000;
const SUBMIT_DELAY = 2000;


const Deposit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: bank selection, 2: pending, 3: contact form
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [showPendingDialog, setShowPendingDialog] = useState(false);

  // Contact form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const banks = [
    { id: "chase", name: "JPMorgan Chase", region: "US" },
    { id: "boa", name: "Bank of America", region: "US" },
    { id: "wells", name: "Wells Fargo", region: "US" },
    { id: "barclays", name: "Barclays", region: "EU" },
    { id: "hsbc", name: "HSBC", region: "EU" },
    { id: "deutsche", name: "Deutsche Bank", region: "EU" },
    { id: "bnp", name: "BNP Paribas", region: "EU" },
    { id: "santander", name: "Santander", region: "EU" },
  ];

  const handleBankSubmit = () => {
    if (!selectedBank || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a bank and enter deposit amount.",
        variant: "destructive",
      });
      return;
    }

    // Save deposit info to localStorage
    const depositInfo = {
      bank: selectedBank,
      amount: amount,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("depositInfo", JSON.stringify(depositInfo));

    setShowPendingDialog(true);

    // Keep the submit delay before moving on
    setTimeout(() => {
      setShowPendingDialog(false);
      setStep(3);
    }, PENDING_DURATION);
  };


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

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/deposits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          bank: selectedBank,
          amount: parseFloat(amount),
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save deposit information.");
      }

      const result = await response.json();

      toast({
        title: "Contact Request Submitted",
        description: "Thank you! Our security team will contact you within 24 hours to complete your deposit.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Submission Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBankName = banks.find(b => b.id === selectedBank)?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Money Bridge</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {step === 1 && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Deposit</h1>
              <p className="text-gray-600">Select your bank and deposit amount</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Amount Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Deposit Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="amount">Amount (USD) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg h-12"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bank Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Select Your Bank *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {banks.map((bank) => (
                      <div
                        key={bank.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedBank === bank.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                          }`}
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{bank.name}</p>
                            <p className="text-sm text-gray-600">{bank.region}</p>
                          </div>
                          {selectedBank === bank.id && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedBank && amount && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-900">Deposit Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Bank:</span>
                    <span>{selectedBankName}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Deposit Amount:</span>
                    <span>${parseFloat(amount || "0").toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleBankSubmit}
              disabled={!selectedBank || !amount}
              className="w-full mt-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Continue Deposit
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Verification</h1>
              <p className="text-gray-600">Please provide your contact details so our security team can verify and complete your deposit</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                  <h4 className="font-semibold mb-2 text-blue-900">Your Deposit Request</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Bank:</span>
                      <span>{selectedBankName}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Amount:</span>
                      <span>${parseFloat(amount || "0").toLocaleString()}</span>
                    </div>
                  </div>
                </div>

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
                    placeholder="Any specific requirements or questions about your deposit..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleContactSubmit}
                  disabled={!firstName || !lastName || !email || !phone || isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isLoading ? "Submitting Request..." : "Submit for Security Verification"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  * Required fields. Our security team will contact you within 24 hours to complete your deposit.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Pending Dialog */}
      <Dialog open={showPendingDialog} onOpenChange={setShowPendingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Processing Request
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait while we process your deposit request...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments for security verification.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deposit;
