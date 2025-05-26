
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Deposit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const banks = [
    { id: "chase", name: "JPMorgan Chase", region: "US", logo: "🏦" },
    { id: "boa", name: "Bank of America", region: "US", logo: "🏦" },
    { id: "wells", name: "Wells Fargo", region: "US", logo: "🏦" },
    { id: "barclays", name: "Barclays", region: "EU", logo: "🏦" },
    { id: "hsbc", name: "HSBC", region: "EU", logo: "🏦" },
    { id: "deutsche", name: "Deutsche Bank", region: "EU", logo: "🏦" },
    { id: "bnp", name: "BNP Paribas", region: "EU", logo: "🏦" },
    { id: "santander", name: "Santander", region: "EU", logo: "🏦" },
  ];

  const handleDeposit = async () => {
    if (!selectedBank || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a bank and enter an amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate deposit processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Deposit Initiated",
        description: `$${parseFloat(amount).toLocaleString()} deposit from ${banks.find(b => b.id === selectedBank)?.name} has been initiated.`,
      });
      navigate("/dashboard");
    }, 2000);
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposit Funds</h1>
          <p className="text-gray-600">Choose your bank and deposit amount</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bank Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Select Your Bank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {banks.map((bank) => (
                  <div
                    key={bank.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedBank === bank.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedBank(bank.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{bank.logo}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{bank.name}</p>
                          <p className="text-sm text-gray-600">{bank.region}</p>
                        </div>
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

          {/* Deposit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Deposit Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              {selectedBank && amount && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Deposit Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>From:</span>
                      <span>{banks.find(b => b.id === selectedBank)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>${parseFloat(amount || "0").toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Processing Fee:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleDeposit}
                disabled={!selectedBank || !amount || isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isLoading ? "Processing..." : "Deposit Funds"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
