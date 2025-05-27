import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TransferForm from "@/components/TransferForm";
import BankSelection from "@/components/BankSelection";
import ContactForm from "@/components/ContactForm";
import PendingDialog from "@/components/PendingDialog";

const Transfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: transfer form, 2: pending, 3: contact form
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  
  // User's current balance - in a real app, this would come from a state management solution or API
  const userBalance = 920000.00;

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

    const transferAmount = parseFloat(amount);
    
    // Check if transfer amount exceeds balance
    if (transferAmount > userBalance) {
      toast({
        title: "Insufficient Funds",
        description: `Transfer amount ($${transferAmount.toLocaleString()}) exceeds your available balance ($${userBalance.toLocaleString()}).`,
        variant: "destructive",
      });
      return;
    }

    setShowPendingDialog(true);
    
    // Show pending for 3 seconds then move to contact form
    setTimeout(() => {
      setShowPendingDialog(false);
      setStep(3);
    }, 3000);
  };

  const transferAmount = parseFloat(amount || "0");
  const isAmountExceedingBalance = transferAmount > userBalance;
  const selectedBankName = banks.find(b => b.id === selectedBank)?.name || "";

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
        {step === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
              <p className="text-gray-600">Transfer funds to recipients worldwide</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <TransferForm
                recipientName={recipientName}
                setRecipientName={setRecipientName}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                amount={amount}
                setAmount={setAmount}
                description={description}
                setDescription={setDescription}
                userBalance={userBalance}
              />

              <BankSelection
                banks={banks}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                recipientName={recipientName}
                accountNumber={accountNumber}
                amount={amount}
                onTransfer={handleTransfer}
                isAmountExceedingBalance={isAmountExceedingBalance}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <ContactForm
            recipientName={recipientName}
            selectedBankName={selectedBankName}
            amount={amount}
            accountNumber={accountNumber}
          />
        )}
      </div>

      <PendingDialog 
        isOpen={showPendingDialog} 
        onOpenChange={setShowPendingDialog} 
      />
    </div>
  );
};

export default Transfer;