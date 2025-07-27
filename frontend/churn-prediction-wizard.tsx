"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import { StepIndicator } from "./components/step-indicator"
import { PersonalInfoStep } from "./components/personal-info-step"
import { ServicesStep } from "./components/services-step"
import { BillingStep } from "./components/billing-step"
import { ResultsDisplay } from "./components/results-display"

interface FormData {
  // Step 1 - Personal Info
  gender: string
  seniorCitizen: boolean
  partner: boolean
  dependents: boolean
  tenure: number
  // Step 2 - Services
  phoneService: boolean
  multipleLines: string
  internetService: string
  onlineSecurity: boolean
  onlineBackup: boolean
  deviceProtection: boolean
  techSupport: boolean
  streamingTV: boolean
  streamingMovies: boolean
  // Step 3 - Billing
  contract: string
  paymentMethod: string
  paperlessBilling: boolean
  monthlyCharges: string
}

interface PredictionResult {
  prediction: string
  probability: number
}

export default function ChurnPredictionWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    gender: "",
    seniorCitizen: false,
    partner: false,
    dependents: false,
    tenure: 12,
    // Services
    phoneService: true,
    multipleLines: "No",
    internetService: "",
    onlineSecurity: false,
    onlineBackup: false,
    deviceProtection: false,
    techSupport: false,
    streamingTV: false,
    streamingMovies: false,
    // Billing
    contract: "",
    paymentMethod: "",
    paperlessBilling: true,
    monthlyCharges: "",
  })

  const steps = ["Personal Info", "Services", "Billing"]
  const totalSteps = 3

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.gender !== ""
      case 2:
        return formData.internetService !== ""
      case 3:
        return formData.contract !== "" && formData.paymentMethod !== "" && formData.monthlyCharges !== ""
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const transformToModelFormat = (data: FormData) => {
    // Create the base object with all required fields
    const modelData: any = {
      gender: data.gender,
      SeniorCitizen: data.seniorCitizen ? 1 : 0,
      Partner: data.partner ? "Yes" : "No",
      Dependents: data.dependents ? "Yes" : "No",
      tenure: data.tenure,
      PhoneService: data.phoneService ? "Yes" : "No",
      PaperlessBilling: data.paperlessBilling ? "Yes" : "No",
      MonthlyCharges: Number.parseFloat(data.monthlyCharges),
      TotalCharges: Number.parseFloat(data.monthlyCharges) * data.tenure,
    }

    // One-hot encode MultipleLines
    modelData["MultipleLines_No"] = data.multipleLines === "No" ? 1 : 0
    modelData["MultipleLines_No phone service"] = data.multipleLines === "No phone service" ? 1 : 0
    modelData["MultipleLines_Yes"] = data.multipleLines === "Yes" ? 1 : 0

    // One-hot encode InternetService
    modelData["InternetService_DSL"] = data.internetService === "DSL" ? 1 : 0
    modelData["InternetService_Fiber optic"] = data.internetService === "Fiber optic" ? 1 : 0
    modelData["InternetService_No"] = data.internetService === "No" ? 1 : 0

    // Helper function for internet-dependent services
    const getServiceValue = (hasService: boolean, hasInternet: boolean) => {
      if (!hasInternet) return "No internet service"
      return hasService ? "Yes" : "No"
    }

    const hasInternet = data.internetService !== "No"

    // One-hot encode OnlineSecurity
    const onlineSecurityValue = getServiceValue(data.onlineSecurity, hasInternet)
    modelData["OnlineSecurity_No"] = onlineSecurityValue === "No" ? 1 : 0
    modelData["OnlineSecurity_No internet service"] = onlineSecurityValue === "No internet service" ? 1 : 0
    modelData["OnlineSecurity_Yes"] = onlineSecurityValue === "Yes" ? 1 : 0

    // One-hot encode OnlineBackup
    const onlineBackupValue = getServiceValue(data.onlineBackup, hasInternet)
    modelData["OnlineBackup_No"] = onlineBackupValue === "No" ? 1 : 0
    modelData["OnlineBackup_No internet service"] = onlineBackupValue === "No internet service" ? 1 : 0
    modelData["OnlineBackup_Yes"] = onlineBackupValue === "Yes" ? 1 : 0

    // One-hot encode DeviceProtection
    const deviceProtectionValue = getServiceValue(data.deviceProtection, hasInternet)
    modelData["DeviceProtection_No"] = deviceProtectionValue === "No" ? 1 : 0
    modelData["DeviceProtection_No internet service"] = deviceProtectionValue === "No internet service" ? 1 : 0
    modelData["DeviceProtection_Yes"] = deviceProtectionValue === "Yes" ? 1 : 0

    // One-hot encode TechSupport
    const techSupportValue = getServiceValue(data.techSupport, hasInternet)
    modelData["TechSupport_No"] = techSupportValue === "No" ? 1 : 0
    modelData["TechSupport_No internet service"] = techSupportValue === "No internet service" ? 1 : 0
    modelData["TechSupport_Yes"] = techSupportValue === "Yes" ? 1 : 0

    // One-hot encode StreamingTV
    const streamingTVValue = getServiceValue(data.streamingTV, hasInternet)
    modelData["StreamingTV_No"] = streamingTVValue === "No" ? 1 : 0
    modelData["StreamingTV_No internet service"] = streamingTVValue === "No internet service" ? 1 : 0
    modelData["StreamingTV_Yes"] = streamingTVValue === "Yes" ? 1 : 0

    // One-hot encode StreamingMovies
    const streamingMoviesValue = getServiceValue(data.streamingMovies, hasInternet)
    modelData["StreamingMovies_No"] = streamingMoviesValue === "No" ? 1 : 0
    modelData["StreamingMovies_No internet service"] = streamingMoviesValue === "No internet service" ? 1 : 0
    modelData["StreamingMovies_Yes"] = streamingMoviesValue === "Yes" ? 1 : 0

    // One-hot encode Contract
    modelData["Contract_Month-to-month"] = data.contract === "Month-to-month" ? 1 : 0
    modelData["Contract_One year"] = data.contract === "One year" ? 1 : 0
    modelData["Contract_Two year"] = data.contract === "Two year" ? 1 : 0

    // One-hot encode PaymentMethod
    modelData["PaymentMethod_Bank transfer (automatic)"] = data.paymentMethod === "Bank transfer (automatic)" ? 1 : 0
    modelData["PaymentMethod_Credit card (automatic)"] = data.paymentMethod === "Credit card (automatic)" ? 1 : 0
    modelData["PaymentMethod_Electronic check"] = data.paymentMethod === "Electronic check" ? 1 : 0
    modelData["PaymentMethod_Mailed check"] = data.paymentMethod === "Mailed check" ? 1 : 0

    return modelData
  }

  const handlePredict = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const modelData = transformToModelFormat(formData)

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modelData),
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={{
              gender: formData.gender,
              seniorCitizen: formData.seniorCitizen,
              partner: formData.partner,
              dependents: formData.dependents,
              tenure: formData.tenure,
            }}
            onUpdate={handleUpdate}
          />
        )
      case 2:
        return (
          <ServicesStep
            formData={{
              phoneService: formData.phoneService,
              multipleLines: formData.multipleLines,
              internetService: formData.internetService,
              onlineSecurity: formData.onlineSecurity,
              onlineBackup: formData.onlineBackup,
              deviceProtection: formData.deviceProtection,
              techSupport: formData.techSupport,
              streamingTV: formData.streamingTV,
              streamingMovies: formData.streamingMovies,
            }}
            onUpdate={handleUpdate}
          />
        )
      case 3:
        return (
          <BillingStep
            formData={{
              contract: formData.contract,
              paymentMethod: formData.paymentMethod,
              paperlessBilling: formData.paperlessBilling,
              monthlyCharges: formData.monthlyCharges,
              tenure: formData.tenure,
            }}
            onUpdate={handleUpdate}
          />
        )
      default:
        return null
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="mx-auto max-w-2xl space-y-6">
          <ResultsDisplay result={result} />
          <div className="text-center">
            <Button
              onClick={() => {
                setResult(null)
                setCurrentStep(1)
                setFormData({
                  gender: "",
                  seniorCitizen: false,
                  partner: false,
                  dependents: false,
                  tenure: 12,
                  phoneService: true,
                  multipleLines: "No",
                  internetService: "",
                  onlineSecurity: false,
                  onlineBackup: false,
                  deviceProtection: false,
                  techSupport: false,
                  streamingTV: false,
                  streamingMovies: false,
                  contract: "",
                  paymentMethod: "",
                  paperlessBilling: true,
                  monthlyCharges: "",
                })
              }}
              variant="outline"
              className="border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white"
            >
              🔄 New Prediction
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🚀 Churn Prediction</h1>
          <p className="text-gray-400">AI-powered customer retention insights</p>
        </div>

        <Card className="bg-gray-900 border-violet-800">
          <CardContent className="p-8">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={steps} />

            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="border-gray-600 text-gray-400 hover:bg-gray-700 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handlePredict}
                  disabled={!isStepValid(currentStep) || isLoading}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>🚀 Predict Churn</>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="bg-gray-900 border-red-800">
            <CardContent className="p-6">
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
