"use client"
import React from "react"

interface StepperProps {
  currentStep: number
  steps: { number: number; label: string }[]
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex justify-center items-center mt-8">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
              ${step.number === currentStep
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-700"}`}
          >
            {step.number}
          </div>
          {i < steps.length - 1 && (
            <div className="w-24 h-1 bg-gray-300 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  )
}
