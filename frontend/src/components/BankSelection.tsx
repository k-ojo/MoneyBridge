import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface Bank {
  id: string;
  name: string;
  region: string;
}

interface BankSelectionProps {
  banks: Bank[];
  selectedBank: string;
  setSelectedBank: (bankId: string) => void;
  recipientName: string;
  accountNumber: string;
  amount: string;
  onTransfer: () => void;
  isAmountExceedingBalance: boolean;
}

const BankSelection = ({
  banks,
  selectedBank,
  setSelectedBank,
  recipientName,
  accountNumber,
  amount,
  onTransfer,
  isAmountExceedingBalance,
}: BankSelectionProps) => {
  return (
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
          onClick={onTransfer}
          disabled={!recipientName || !accountNumber || !selectedBank || !amount || isAmountExceedingBalance}
          className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Continue Transfer
        </Button>
      </CardContent>
    </Card>
  );
};

export default BankSelection;