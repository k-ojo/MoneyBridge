
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Transfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const balance = user.balance;

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

  const handleTransfer = () => {
    if (!recipientName || !accountNumber || !selectedBank || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Navigate to tax verification page
    navigate("/tax-verification", {
      state: {
        recipientName,
        accountNumber,
        selectedBank: banks.find(b => b.id === selectedBank)?.name,
        amount: parseFloat(amount),
        description,
      }
    });
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
                <span className="text-white font-bold text-sm">MT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MoneyTransfer</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
          <p className="text-gray-600">Transfer funds to recipients worldwide</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transfer Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  placeholder="Enter recipient's full name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number / IBAN *</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number or IBAN"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (USD) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Payment description or memo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Recipient's Bank *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {banks.map((bank) => (
                  <div
                    key={bank.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedBank === bank.id
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

              {recipientName && accountNumber && selectedBank && amount && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Transfer Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>To:</span>
                      <span>{recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bank:</span>
                      <span>{banks.find(b => b.id === selectedBank)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>${parseFloat(amount || "0").toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Transfer Fee:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleTransfer}
                disabled={!recipientName || !accountNumber || !selectedBank || !amount}
                className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Continue Transfer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
