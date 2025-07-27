import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ResultsDisplayProps {
  result: {
    prediction: string
    probability: number
  }
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const riskLevel = result.probability < 0.4 ? "Low" : result.probability <= 0.7 ? "Medium" : "High"
  const riskColor =
    result.probability < 0.4 ? "text-green-400" : result.probability <= 0.7 ? "text-orange-400" : "text-red-400"
  const barColor =
    result.probability < 0.4 ? "bg-green-500" : result.probability <= 0.7 ? "bg-orange-500" : "bg-red-500"

  return (
    <Card className="bg-gray-900 border-violet-800">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">🔮 Prediction Results</h3>
          <p className="text-gray-400">AI-powered churn analysis complete</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {result.prediction === "Stays" ? (
                <TrendingUp className="h-6 w-6 text-green-400" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-400" />
              )}
              <span className="text-sm text-gray-400">Prediction</span>
            </div>
            <div className={`text-3xl font-bold ${result.prediction === "Stays" ? "text-green-400" : "text-red-400"}`}>
              {result.prediction}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">💡 Confidence</div>
            <div className="text-3xl font-bold text-violet-400">{(result.probability * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Risk Meter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              📊 Churn Risk Score: {(result.probability * 100).toFixed(1)}%
            </span>
            <span className={`text-sm font-semibold ${riskColor}`}>{riskLevel} Risk</span>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ease-out ${barColor}`}
                style={{ width: `${Math.min(result.probability * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span className="text-orange-400">40%</span>
              <span className="text-red-400">70%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="mt-8 p-4 bg-gray-800 rounded-xl">
          <h4 className="text-sm font-semibold text-violet-400 mb-3">🎯 Key Contributing Factors</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              Contract type and tenure length
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              Monthly charges and payment method
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              Internet service and add-on features
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
