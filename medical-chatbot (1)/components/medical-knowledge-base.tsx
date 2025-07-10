"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Pill, Activity, Scale, Users, Heart } from "lucide-react"

interface MedicalReferenceProps {
  onSelectTopic: (topic: string) => void
}

export function MedicalKnowledgeBase({ onSelectTopic }: MedicalReferenceProps) {
  const clinicalScenarios = [
    {
      category: "Medical Ethics",
      icon: Scale,
      scenarios: [
        "Patient refuses life-saving treatment due to religious beliefs - how should I proceed?",
        "Family wants to withhold diagnosis from terminally ill patient - ethical approach?",
        "Teenage patient requests confidential treatment without parental consent",
        "Resource allocation during pandemic - who gets the ventilator?",
        "Physician-assisted suicide request from competent patient",
        "Informed consent challenges with cognitively impaired elderly patient",
      ],
    },
    {
      category: "End-of-Life Care",
      icon: Heart,
      scenarios: [
        "Family disagrees about continuing life support for brain-dead patient",
        "Patient wants to stop dialysis but family objects - ethical guidance needed",
        "DNR order conflicts - patient vs family wishes",
        "Palliative care vs aggressive treatment decision-making framework",
        "Withdrawing vs withholding treatment - ethical distinction",
        "Advance directive interpretation when patient cannot communicate",
      ],
    },
    {
      category: "Professional Ethics",
      icon: Users,
      scenarios: [
        "Colleague making medical errors - reporting obligations and approach",
        "Pharmaceutical company gifts and potential conflicts of interest",
        "Social media boundaries with patients - professional guidelines",
        "Treating family members - when is it appropriate?",
        "Medical student witnessing unethical behavior during rotation",
        "Dual relationships with patients outside medical setting",
      ],
    },
    {
      category: "Clinical Diagnosis",
      icon: Activity,
      scenarios: [
        "Chest pain differential diagnosis in 45-year-old with risk factors",
        "Fever and altered mental status in elderly patient",
        "Shortness of breath with leg swelling - cardiac vs pulmonary",
        "Abdominal pain with nausea in young female patient",
        "Headache with visual changes - neurological emergency?",
        "Joint pain and morning stiffness - rheumatological workup",
      ],
    },
    {
      category: "Pharmacology",
      icon: Pill,
      scenarios: [
        "Drug interactions in polypharmacy elderly patient",
        "Antibiotic selection for resistant organism infection",
        "Pain management in patient with addiction history",
        "Medication reconciliation after hospital discharge",
        "Dosing adjustments for renal impairment",
        "Adverse drug reaction reporting and management",
      ],
    },
    {
      category: "Emergency Ethics",
      icon: AlertCircle,
      scenarios: [
        "Unconscious patient needs emergency surgery - consent issues",
        "Jehovah's Witness refusing blood transfusion in emergency",
        "Psychiatric patient threatening self-harm - involuntary commitment?",
        "Minor brought to ER by non-custodial parent for treatment",
        "Suspected child abuse - reporting vs patient confidentiality",
        "Emergency contraception request from minor without parental knowledge",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {clinicalScenarios.map((category) => (
        <Card key={category.category} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <category.icon className="h-5 w-5" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {category.scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => onSelectTopic(scenario)}
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm border border-gray-200 transition-colors"
              >
                {scenario}
              </button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
