import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  const { messages, model, temperature, topP, topK, maxTokens } = await request.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m: Message) => ({
          role: m.role.toLowerCase(),
          content: m.content
        })),
        format: 'json',
        temperature,
        top_p: topP,
        top_k: topK,
        max_tokens: maxTokens,
        stream: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the response' }, { status: 500 });
  }
}
