"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ServicesStepProps {
  formData: {
    phoneService: boolean
    multipleLines: string
    internetService: string
    onlineSecurity: boolean
    onlineBackup: boolean
    deviceProtection: boolean
    techSupport: boolean
    streamingTV: boolean
    streamingMovies: boolean
  }
  onUpdate: (field: string, value: any) => void
}

export function ServicesStep({ formData, onUpdate }: ServicesStepProps) {
  const internetOptions = [
    { value: "DSL", label: "DSL", icon: "🌐", description: "Standard internet connection" },
    { value: "Fiber optic", label: "Fiber Optic", icon: "⚡", description: "High-speed fiber connection" },
    { value: "No", label: "No Internet", icon: "❌", description: "No internet service" },
  ]

  const multipleLinesOptions = [
    { value: "Yes", label: "Yes", icon: "📞", description: "Multiple phone lines" },
    { value: "No", label: "No", icon: "📱", description: "Single phone line" },
    { value: "No phone service", label: "No Phone", icon: "🚫", description: "No phone service" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">📞 Phone & Internet Services</h3>

        {/* Phone Service */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">☎️</span>
              <div>
                <Label className="text-gray-300 font-medium">Phone Service</Label>
                <p className="text-sm text-gray-500">Do you have phone service?</p>
              </div>
            </div>
            <Switch
              checked={formData.phoneService}
              onCheckedChange={(checked) => {
                onUpdate("phoneService", checked)
                if (!checked) {
                  onUpdate("multipleLines", "No phone service")
                }
              }}
            />
          </div>
        </div>

        {/* Multiple Lines */}
        {formData.phoneService && (
          <div className="space-y-4 mb-6">
            <Label className="text-gray-300 text-sm font-medium">Multiple Lines</Label>
            <div className="grid grid-cols-2 gap-4">
              {multipleLinesOptions.slice(0, 2).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onUpdate("multipleLines", option.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.multipleLines === option.value
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
        )}

        {/* Internet Service Selection */}
        <div className="space-y-4 mb-6">
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

        {/* Internet Add-ons */}
        {formData.internetService !== "No" && (
          <div className="space-y-4">
            <Label className="text-gray-300 text-sm font-medium">Internet Add-on Services</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <Label className="text-gray-300 font-medium">Online Security</Label>
                    <p className="text-sm text-gray-500">Protect your devices</p>
                  </div>
                </div>
                <Switch
                  checked={formData.onlineSecurity}
                  onCheckedChange={(checked) => onUpdate("onlineSecurity", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💾</span>
                  <div>
                    <Label className="text-gray-300 font-medium">Online Backup</Label>
                    <p className="text-sm text-gray-500">Cloud storage service</p>
                  </div>
                </div>
                <Switch
                  checked={formData.onlineBackup}
                  onCheckedChange={(checked) => onUpdate("onlineBackup", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <Label className="text-gray-300 font-medium">Device Protection</Label>
                    <p className="text-sm text-gray-500">Hardware protection plan</p>
                  </div>
                </div>
                <Switch
                  checked={formData.deviceProtection}
                  onCheckedChange={(checked) => onUpdate("deviceProtection", checked)}
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
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📺</span>
                  <div>
                    <Label className="text-gray-300 font-medium">Streaming TV</Label>
                    <p className="text-sm text-gray-500">TV streaming service</p>
                  </div>
                </div>
                <Switch
                  checked={formData.streamingTV}
                  onCheckedChange={(checked) => onUpdate("streamingTV", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎬</span>
                  <div>
                    <Label className="text-gray-300 font-medium">Streaming Movies</Label>
                    <p className="text-sm text-gray-500">Movie streaming service</p>
                  </div>
                </div>
                <Switch
                  checked={formData.streamingMovies}
                  onCheckedChange={(checked) => onUpdate("streamingMovies", checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
