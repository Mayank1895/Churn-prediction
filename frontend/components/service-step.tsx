"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ServiceStepProps {
  formData: {
    internetService: string
    onlineSecurity: boolean
    techSupport: boolean
    streamingTV: boolean
  }
  onUpdate: (field: string, value: any) => void
}

export function ServiceStep({ formData, onUpdate }: ServiceStepProps) {
  const internetOptions = [
    { value: "DSL", label: "DSL", icon: "🌐", description: "Standard internet connection" },
    { value: "Fiber optic", label: "Fiber Optic", icon: "⚡", description: "High-speed fiber connection" },
    { value: "No", label: "No Internet", icon: "❌", description: "No internet service" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">🌐 Internet & Services</h3>

        {/* Internet Service Selection */}
        <div className="space-y-4 mb-8">
          <Label className="text-gray-300 text-sm font-medium">Internet Service Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {internetOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onUpdate("internetService", option.value)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.internetService === option.value
                    ? "border-violet-500 bg-violet-500/10 text-violet-400"
                    : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-medium mb-1">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Service Toggles */}
        <div className="space-y-4">
          <Label className="text-gray-300 text-sm font-medium">Additional Services</Label>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <div>
                  <Label className="text-gray-300 font-medium">Online Security</Label>
                  <p className="text-sm text-gray-500">Protect your devices online</p>
                </div>
              </div>
              <Switch
                checked={formData.onlineSecurity}
                onCheckedChange={(checked) => onUpdate("onlineSecurity", checked)}
                disabled={formData.internetService === "No"}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛠️</span>
                <div>
                  <Label className="text-gray-300 font-medium">Tech Support</Label>
                  <p className="text-sm text-gray-500">24/7 technical assistance</p>
                </div>
              </div>
              <Switch
                checked={formData.techSupport}
                onCheckedChange={(checked) => onUpdate("techSupport", checked)}
                disabled={formData.internetService === "No"}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">📺</span>
                <div>
                  <Label className="text-gray-300 font-medium">Streaming TV</Label>
                  <p className="text-sm text-gray-500">Access to TV streaming services</p>
                </div>
              </div>
              <Switch
                checked={formData.streamingTV}
                onCheckedChange={(checked) => onUpdate("streamingTV", checked)}
                disabled={formData.internetService === "No"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
