"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, TrendingDown, TrendingUp } from "lucide-react"

interface FormData {
  gender: string
  seniorCitizen: string
  partner: string
  dependents: string
  tenure: string
  phoneService: string
  multipleLines: string
  internetService: string
  onlineSecurity: string
  onlineBackup: string
  deviceProtection: string
  techSupport: string
  streamingTV: string
  streamingMovies: string
  contract: string
  paperlessBilling: string
  paymentMethod: string
  monthlyCharges: string
  totalCharges: string
}

interface PredictionResult {
  prediction: string
  probability: number
}

export default function ChurnPredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    seniorCitizen: "",
    partner: "",
    dependents: "",
    tenure: "",
    phoneService: "",
    multipleLines: "",
    internetService: "",
    onlineSecurity: "",
    onlineBackup: "",
    deviceProtection: "",
    techSupport: "",
    streamingTV: "",
    streamingMovies: "",
    contract: "",
    paperlessBilling: "",
    paymentMethod: "",
    monthlyCharges: "",
    totalCharges: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(formData).every((value) => value !== "")

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="bg-gray-900 border-violet-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Customer Churn Prediction</CardTitle>
            <CardDescription className="text-gray-300">
              Enter customer information to predict churn probability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Demographics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-violet-400">Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-200">
                      Gender
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Male" className="text-white hover:bg-violet-900">
                          Male
                        </SelectItem>
                        <SelectItem value="Female" className="text-white hover:bg-violet-900">
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seniorCitizen" className="text-gray-200">
                      Senior Citizen
                    </Label>
                    <Select
                      value={formData.seniorCitizen}
                      onValueChange={(value) => handleInputChange("seniorCitizen", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partner" className="text-gray-200">
                      Partner
                    </Label>
                    <Select value={formData.partner} onValueChange={(value) => handleInputChange("partner", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dependents" className="text-gray-200">
                      Dependents
                    </Label>
                    <Select
                      value={formData.dependents}
                      onValueChange={(value) => handleInputChange("dependents", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-violet-400">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenure" className="text-gray-200">
                      Tenure (months)
                    </Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="Enter tenure"
                      value={formData.tenure}
                      onChange={(e) => handleInputChange("tenure", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyCharges" className="text-gray-200">
                      Monthly Charges ($)
                    </Label>
                    <Input
                      id="monthlyCharges"
                      type="number"
                      step="0.01"
                      placeholder="Enter monthly charges"
                      value={formData.monthlyCharges}
                      onChange={(e) => handleInputChange("monthlyCharges", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalCharges" className="text-gray-200">
                      Total Charges ($)
                    </Label>
                    <Input
                      id="totalCharges"
                      type="number"
                      step="0.01"
                      placeholder="Enter total charges"
                      value={formData.totalCharges}
                      onChange={(e) => handleInputChange("totalCharges", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Phone Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-violet-400">Phone Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneService" className="text-gray-200">
                      Phone Service
                    </Label>
                    <Select
                      value={formData.phoneService}
                      onValueChange={(value) => handleInputChange("phoneService", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="multipleLines" className="text-gray-200">
                      Multiple Lines
                    </Label>
                    <Select
                      value={formData.multipleLines}
                      onValueChange={(value) => handleInputChange("multipleLines", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No phone service" className="text-white hover:bg-violet-900">
                          No phone service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Internet Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-violet-400">Internet Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="internetService" className="text-gray-200">
                      Internet Service
                    </Label>
                    <Select
                      value={formData.internetService}
                      onValueChange={(value) => handleInputChange("internetService", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="DSL" className="text-white hover:bg-violet-900">
                          DSL
                        </SelectItem>
                        <SelectItem value="Fiber optic" className="text-white hover:bg-violet-900">
                          Fiber optic
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="onlineSecurity" className="text-gray-200">
                      Online Security
                    </Label>
                    <Select
                      value={formData.onlineSecurity}
                      onValueChange={(value) => handleInputChange("onlineSecurity", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="onlineBackup" className="text-gray-200">
                      Online Backup
                    </Label>
                    <Select
                      value={formData.onlineBackup}
                      onValueChange={(value) => handleInputChange("onlineBackup", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deviceProtection" className="text-gray-200">
                      Device Protection
                    </Label>
                    <Select
                      value={formData.deviceProtection}
                      onValueChange={(value) => handleInputChange("deviceProtection", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="techSupport" className="text-gray-200">
                      Tech Support
                    </Label>
                    <Select
                      value={formData.techSupport}
                      onValueChange={(value) => handleInputChange("techSupport", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="streamingTV" className="text-gray-200">
                      Streaming TV
                    </Label>
                    <Select
                      value={formData.streamingTV}
                      onValueChange={(value) => handleInputChange("streamingTV", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="streamingMovies" className="text-gray-200">
                      Streaming Movies
                    </Label>
                    <Select
                      value={formData.streamingMovies}
                      onValueChange={(value) => handleInputChange("streamingMovies", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                        <SelectItem value="No internet service" className="text-white hover:bg-violet-900">
                          No internet service
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Billing Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-violet-400">Billing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contract" className="text-gray-200">
                      Contract
                    </Label>
                    <Select value={formData.contract} onValueChange={(value) => handleInputChange("contract", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Month-to-month" className="text-white hover:bg-violet-900">
                          Month-to-month
                        </SelectItem>
                        <SelectItem value="One year" className="text-white hover:bg-violet-900">
                          One year
                        </SelectItem>
                        <SelectItem value="Two year" className="text-white hover:bg-violet-900">
                          Two year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paperlessBilling" className="text-gray-200">
                      Paperless Billing
                    </Label>
                    <Select
                      value={formData.paperlessBilling}
                      onValueChange={(value) => handleInputChange("paperlessBilling", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Yes" className="text-white hover:bg-violet-900">
                          Yes
                        </SelectItem>
                        <SelectItem value="No" className="text-white hover:bg-violet-900">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="text-gray-200">
                      Payment Method
                    </Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Bank transfer (automatic)" className="text-white hover:bg-violet-900">
                          Bank transfer (automatic)
                        </SelectItem>
                        <SelectItem value="Credit card (automatic)" className="text-white hover:bg-violet-900">
                          Credit card (automatic)
                        </SelectItem>
                        <SelectItem value="Electronic check" className="text-white hover:bg-violet-900">
                          Electronic check
                        </SelectItem>
                        <SelectItem value="Mailed check" className="text-white hover:bg-violet-900">
                          Mailed check
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full md:w-auto px-8 py-2 bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Churn"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="bg-gray-900 border-violet-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {result.prediction === "Stays" ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                )}
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Prediction</div>
                  <div
                    className={`text-2xl font-bold ${
                      result.prediction === "Stays" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {result.prediction}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Confidence</div>
                  <div className="text-2xl font-bold text-violet-400">{(result.probability * 100).toFixed(1)}%</div>
                </div>
              </div>
              {/* Add this right after the existing grid in the Results Card */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-300">
                    📊 Churn Risk Score: {(result.probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${
                      result.probability < 0.4
                        ? "bg-green-500"
                        : result.probability <= 0.7
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(result.probability * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Card className="bg-gray-900 border-red-800">
            <CardContent className="pt-6">
              <div className="text-red-400 text-center">
                <strong>Error:</strong> {error}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
