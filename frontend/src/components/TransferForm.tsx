import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

interface TransferFormProps {
  recipientName: string;
  setRecipientName: (value: string) => void;
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  userBalance: number;
}

const TransferForm = ({
  recipientName,
  setRecipientName,
  accountNumber,
  setAccountNumber,
  amount,
  setAmount,
  description,
  setDescription,
  userBalance,
}: TransferFormProps) => {
  const transferAmount = parseFloat(amount || "0");
  const isAmountExceedingBalance = transferAmount > userBalance;

  return (
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
            className={`text-lg ${isAmountExceedingBalance ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {isAmountExceedingBalance && (
            <p className="text-red-500 text-sm mt-1">
              Amount exceeds available balance (${userBalance.toLocaleString()})
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Available balance: ${userBalance.toLocaleString()}
          </p>
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
  );
};

export default TransferForm;