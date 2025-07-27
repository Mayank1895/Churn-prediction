"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface BasicInfoStepProps {
  formData: {
    gender: string
    seniorCitizen: boolean
    tenure: number
  }
  onUpdate: (field: string, value: any) => void
}

export function BasicInfoStep({ formData, onUpdate }: BasicInfoStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">👋 Tell us about yourself</h3>

        {/* Gender Selection */}
        <div className="space-y-4">
          <Label className="text-gray-300 text-sm font-medium">Gender</Label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onUpdate("gender", "Male")}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                formData.gender === "Male"
                  ? "border-violet-500 bg-violet-500/10 text-violet-400"
                  : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
              }`}
            >
              <div className="text-2xl mb-2">👨</div>
              <div className="font-medium">Male</div>
            </button>
            <button
              type="button"
              onClick={() => onUpdate("gender", "Female")}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                formData.gender === "Female"
                  ? "border-violet-500 bg-violet-500/10 text-violet-400"
                  : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
              }`}
            >
              <div className="text-2xl mb-2">👩</div>
              <div className="font-medium">Female</div>
            </button>
          </div>
        </div>

        {/* Senior Citizen Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
            <div>
              <Label className="text-gray-300 font-medium">Senior Citizen</Label>
              <p className="text-sm text-gray-500">Are you 65 years or older?</p>
            </div>
            <Switch
              checked={formData.seniorCitizen}
              onCheckedChange={(checked) => onUpdate("seniorCitizen", checked)}
            />
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-300 font-medium">Tenure</Label>
            <span className="text-violet-400 font-semibold">{formData.tenure} months</span>
          </div>
          <div className="px-4">
            <Slider
              value={[formData.tenure]}
              onValueChange={(value) => onUpdate("tenure", value[0])}
              max={72}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0 months</span>
              <span>72 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
