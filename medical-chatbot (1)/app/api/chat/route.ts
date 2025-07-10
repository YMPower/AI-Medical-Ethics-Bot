import { NextResponse } from "next/server"

// Helper – calls OpenAI with a plain fetch
async function callOpenAI(messages: { role: string; content: string }[]) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: false,
      content: "⚠️ Server-side OpenAI key not configured. Please set OPENAI_API_KEY in your environment.",
    }
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // economical & fast; change if you prefer
      messages,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    return { ok: false, content: `OpenAI error: ${text}` }
  }

  const json = (await res.json()) as {
    choices: { message: { content: string } }[]
  }

  return { ok: true, content: json.choices[0].message.content }
}

export async function POST(req: Request) {
  try {
    const { messages = [] } = await req.json()

    // Add / ensure our system prompt is prepended
    const systemPrompt = {
      role: "system",
      content: `You are MedAssist AI, a friendly but authoritative medical-ethics assistant. 
Respond with clear, structured guidance grounded in the four principles 
(autonomy, beneficence, non-maleficence, justice). 
Always remind users that responses are educational, not a substitute for professional advice.`,
    }

    const { ok, content } = await callOpenAI([systemPrompt, ...messages])

    // Always return JSON so the client never crashes on bad mime types
    return NextResponse.json(ok ? { reply: content } : { error: content })
  } catch (err) {
    console.error("Route error:", err)
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}
