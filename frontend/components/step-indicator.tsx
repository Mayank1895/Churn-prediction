interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index + 1 <= currentStep ? "bg-violet-600 text-white" : "bg-gray-700 text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-xs ${index + 1 <= currentStep ? "text-violet-400" : "text-gray-500"}`}>
              {step}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 transition-all ${index + 1 < currentStep ? "bg-violet-600" : "bg-gray-700"}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
