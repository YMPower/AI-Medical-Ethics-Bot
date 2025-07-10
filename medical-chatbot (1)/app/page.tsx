"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Stethoscope, Heart, Brain, Phone, Send, Scale, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MedicalKnowledgeBase } from "@/components/medical-knowledge-base"
import { ClinicalCalculator } from "@/components/clinical-calculator"

export default function MedicalChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm MedAssist AI, your medical ethics and diagnostic assistant.\n\nI specialize in helping healthcare professionals navigate complex ethical dilemmas while also providing clinical guidance. Whether you're facing difficult end-of-life decisions, consent issues, or need medication recommendations, I'm here to help.\n\n**How can I assist you today?**\n\n• Medical ethics consultation\n• Clinical diagnosis and treatment\n• Medication recommendations\n• Professional ethics guidance",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const raw = await res.text()
      let data: { reply?: string; error?: string }

      try {
        data = JSON.parse(raw)
      } catch {
        data = { error: raw || "Unknown server response." }
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = async (prompt: string) => {
    const userMessage = { role: "user", content: prompt }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const raw = await res.text()
      let data: { reply?: string; error?: string }

      try {
        data = JSON.parse(raw)
      } catch {
        data = { error: raw || "Unknown server response." }
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setIsLoading(false)
    }
  }

  const medicalCategories = [
    { name: "Medical Ethics", icon: Scale, color: "bg-purple-600" },
    { name: "End-of-Life Care", icon: Heart, color: "bg-red-500" },
    { name: "Professional Ethics", icon: Users, color: "bg-blue-500" },
    { name: "Clinical Diagnosis", icon: Stethoscope, color: "bg-green-500" },
    { name: "Pharmacology", icon: Brain, color: "bg-orange-500" },
    { name: "Emergency Ethics", icon: Phone, color: "bg-pink-500" },
  ]

  const quickPrompts = [
    "Patient refuses blood transfusion for religious reasons - how should I handle this ethically?",
    "Family wants to withhold terminal diagnosis from patient - what's the ethical approach?",
    "Teenage patient requests confidential contraception without parental consent",
    "Colleague making repeated medical errors - what are my reporting obligations?",
    "Resource allocation during crisis - ethical framework for difficult decisions",
    "Persistent cough with yellow phlegm for 5 days, mild fever, and chest tightness",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Scale className="h-8 w-8 text-purple-600" />
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">MedAssist AI</h1>
          </div>
          <p className="text-gray-600">Medical Ethics & Diagnostic Assistant</p>
        </div>

        {/* Critical Disclaimer */}
        <Alert className="mb-6 border-purple-200 bg-purple-50">
          <AlertTriangle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>Important:</strong> This AI provides educational guidance for medical ethics and clinical decisions.
            Always consult with ethics committees, legal counsel, and senior colleagues for complex cases.
          </AlertDescription>
        </Alert>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Medical Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {medicalCategories.map((category) => (
            <Card
              key={category.name}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.name ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <CardContent className="p-4 text-center">
                <category.icon className={`h-8 w-8 mx-auto mb-2 text-white p-1 rounded ${category.color}`} />
                <p className="text-sm font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Medical Knowledge Base */}
        <MedicalKnowledgeBase onSelectTopic={handleQuickPrompt} />

        {/* Clinical Calculator */}
        <ClinicalCalculator onCalculate={handleQuickPrompt} />

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto mb-6">
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-600" /> MedAssist AI Chat
              </CardTitle>
              <Badge variant="secondary" className="mt-2 w-fit">
                Medical Ethics & Diagnosis Bot
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap rounded-lg p-3 ${
                    m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
                  }`}
                >
                  <span className="block font-semibold">{m.role === "user" ? "You" : "MedAssist"}:</span>
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <span className="block font-semibold">MedAssist:</span>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex gap-2 border-t pt-4">
              <form onSubmit={handleSend} className="flex w-full gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a medical question..."
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        {/* Quick Prompts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Common Ethics & Clinical Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 bg-white text-gray-700 hover:bg-purple-50"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 MedAssist AI - Medical Ethics & Clinical Guidance</p>
          <p>Always consult ethics committees and senior colleagues for complex cases</p>
        </div>
      </div>
    </div>
  )
}
