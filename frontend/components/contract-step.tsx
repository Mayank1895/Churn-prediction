"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContractStepProps {
  formData: {
    contract: string
    paymentMethod: string
    monthlyCharges: string
    tenure?: number // Add tenure to calculate total charges
  }
  onUpdate: (field: string, value: any) => void
}

export function ContractStep({ formData, onUpdate }: ContractStepProps) {
  const contractOptions = [
    {
      value: "Month-to-month",
      label: "Month-to-Month",
      icon: "📅",
      description: "Flexible monthly billing",
      badge: "Most Popular",
    },
    {
      value: "One year",
      label: "One Year",
      icon: "📆",
      description: "12-month commitment",
      badge: "Save 10%",
    },
    {
      value: "Two year",
      label: "Two Year",
      icon: "🗓️",
      description: "24-month commitment",
      badge: "Save 20%",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">💳 Contract & Payment</h3>

        {/* Contract Type Selection */}
        <div className="space-y-4 mb-8">
          <Label className="text-gray-300 text-sm font-medium">Contract Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contractOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onUpdate("contract", option.value)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  formData.contract === option.value
                    ? "border-violet-500 bg-violet-500/10 text-violet-400"
                    : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                }`}
              >
                {option.badge && (
                  <div className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                    {option.badge}
                  </div>
                )}
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-medium mb-1">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4 mb-6">
          <Label className="text-gray-300 text-sm font-medium">Payment Method</Label>
          <Select value={formData.paymentMethod} onValueChange={(value) => onUpdate("paymentMethod", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="Electronic check" className="text-white hover:bg-violet-900">
                💳 Electronic Check
              </SelectItem>
              <SelectItem value="Credit card (automatic)" className="text-white hover:bg-violet-900">
                🏦 Credit Card (Auto)
              </SelectItem>
              <SelectItem value="Bank transfer (automatic)" className="text-white hover:bg-violet-900">
                🏧 Bank Transfer (Auto)
              </SelectItem>
              <SelectItem value="Mailed check" className="text-white hover:bg-violet-900">
                📮 Mailed Check
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Charges */}
        <div className="space-y-4 mb-6">
          <Label className="text-gray-300 text-sm font-medium">Monthly Charges</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.monthlyCharges}
              onChange={(e) => onUpdate("monthlyCharges", e.target.value)}
              className="pl-8 bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Total Charges Display */}
        {formData.monthlyCharges && (
          <div className="p-4 bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300 font-medium">Estimated Total Charges</Label>
                <p className="text-sm text-gray-500">Based on tenure and monthly charges</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-violet-400">
                  ${(Number.parseFloat(formData.monthlyCharges || "0") * (formData.tenure || 0)).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  ${formData.monthlyCharges} × {formData.tenure || 0} months
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
