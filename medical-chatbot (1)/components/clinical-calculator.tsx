"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Scale, Heart } from "lucide-react"

interface ClinicalCalculatorProps {
  onCalculate: (result: string) => void
}

export function ClinicalCalculator({ onCalculate }: ClinicalCalculatorProps) {
  const [calculatorType, setCalculatorType] = useState("ethics")
  const [ethicsScenario, setEthicsScenario] = useState("")
  const [stakeholders, setStakeholders] = useState("")

  // Medical calculator states
  const [creatinine, setCreatinine] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [isFemale, setIsFemale] = useState(false)

  const calculateEthics = () => {
    if (!ethicsScenario || !stakeholders) return

    const result = `MEDICAL ETHICS ANALYSIS:

SCENARIO: ${ethicsScenario}

STAKEHOLDERS INVOLVED: ${stakeholders}

ETHICAL PRINCIPLES TO CONSIDER:
• Autonomy: Patient's right to make informed decisions
• Beneficence: Acting in patient's best interest
• Non-maleficence: "Do no harm" principle
• Justice: Fair distribution of benefits and burdens

ETHICAL FRAMEWORK ANALYSIS:
1. Identify the ethical dilemma
2. Gather relevant facts and context
3. Consider all stakeholder perspectives
4. Apply ethical principles and professional guidelines
5. Explore alternative solutions
6. Choose ethically justified course of action
7. Implement with proper documentation
8. Monitor outcomes and reflect

RECOMMENDED APPROACH:
- Facilitate open communication between all parties
- Consult ethics committee if available
- Document decision-making process thoroughly
- Consider legal implications and institutional policies
- Ensure cultural sensitivity and respect for values

Would you like me to analyze this specific ethical scenario in more detail?`

    onCalculate(result)
  }

  const calculateCrCl = () => {
    if (!creatinine || !age || !weight) return

    const cr = Number.parseFloat(creatinine)
    const ageNum = Number.parseFloat(age)
    const weightNum = Number.parseFloat(weight)

    let crCl = ((140 - ageNum) * weightNum) / (72 * cr)
    if (isFemale) crCl *= 0.85

    const result = `CREATININE CLEARANCE CALCULATION:
    
Patient: ${ageNum} year old ${isFemale ? "female" : "male"}, ${weightNum} kg
Serum Creatinine: ${cr} mg/dL

Cockcroft-Gault Formula Result: ${crCl.toFixed(1)} mL/min

CLINICAL INTERPRETATION:
- Normal: >90 mL/min
- Mild impairment: 60-89 mL/min  
- Moderate impairment: 30-59 mL/min
- Severe impairment: 15-29 mL/min
- Kidney failure: <15 mL/min

MEDICATION DOSING IMPLICATIONS:
- Dose adjustments needed if CrCl <60 mL/min
- Monitor nephrotoxic medications closely
- Consider alternative drugs if severely impaired`

    onCalculate(result)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Clinical Tools & Ethics Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={calculatorType === "ethics" ? "default" : "outline"}
            onClick={() => setCalculatorType("ethics")}
            className="flex items-center gap-2"
          >
            <Scale className="h-4 w-4" />
            Ethics Framework
          </Button>
          <Button
            variant={calculatorType === "medical" ? "default" : "outline"}
            onClick={() => setCalculatorType("medical")}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Medical Calculator
          </Button>
        </div>

        {calculatorType === "ethics" ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="scenario">Ethical Scenario Description</Label>
              <Input
                id="scenario"
                value={ethicsScenario}
                onChange={(e) => setEthicsScenario(e.target.value)}
                placeholder="Describe the ethical dilemma..."
              />
            </div>
            <div>
              <Label htmlFor="stakeholders">Key Stakeholders</Label>
              <Input
                id="stakeholders"
                value={stakeholders}
                onChange={(e) => setStakeholders(e.target.value)}
                placeholder="Patient, family, healthcare team, etc."
              />
            </div>
            <Button onClick={calculateEthics} className="w-full">
              <Scale className="h-4 w-4 mr-2" />
              Analyze Ethical Framework
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="65" />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                />
              </div>
              <div>
                <Label htmlFor="creatinine">Creatinine (mg/dL)</Label>
                <Input
                  id="creatinine"
                  type="number"
                  step="0.1"
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  placeholder="1.2"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={calculateCrCl} className="w-full">
                  Calculate
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="female"
                checked={isFemale}
                onChange={(e) => setIsFemale(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="female">Female patient</Label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
