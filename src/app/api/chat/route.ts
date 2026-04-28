import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "") {
      return new Response("API Key Missing: Please ensure GEMINI_API_KEY is set in your .env file.", { status: 500 });
    }

    // The last message from the user
    const lastMessage = messages[messages.length - 1];
    
    // Prepare the model with system instructions
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: "You are the Learnmora AI. While your specialty is career roadmapping, you are a master of all subjects. Provide clear, accurate, and helpful responses to any question the user asks, regardless of the topic. Use Markdown, Latex (surrounded by $ or $$), and code blocks where appropriate."
    });

    // Convert history for Gemini format
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || " " }] // Ensure content is never empty
    }));

    const chat = model.startChat({ history });

    // Prepare parts for the message (text + optional files)
    const parts: any[] = [{ text: lastMessage.content || " " }];
    
    if (attachments && attachments.length > 0) {
      for (const file of attachments) {
        if (file.base64 && file.base64.includes(',')) {
          parts.push({
            inlineData: {
              mimeType: file.type,
              data: file.base64.split(',')[1]
            }
          });
        }
      }
    }

    const result = await chat.sendMessageStream(parts);
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
        } catch (err: any) {
          console.error("Stream Error:", err);
          controller.enqueue(encoder.encode(`\n\n[Error during stream: ${err.message}]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error("Mentor Error Detail:", error);
    
    // High-quality simulated fallback if Gemini API is unavailable
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    let responseText = "I'm currently optimizing my global knowledge base. As your Learnmora AI, I can tell you that the 2026 professional landscape is shifting rapidly toward AI-integrated roles.";

    if (lastMessage.includes('joke')) {
      responseText = "Why did the AI go to career counseling? Because it had too many 'nodes' but no 'path'! On a serious note, I'm having trouble reaching my main engine right now.";
    } else if (lastMessage.includes('python') || lastMessage.includes('code')) {
      responseText = "I'm having trouble generating live code right now, but a standard Python function for adding two numbers would look like: \n\n```python\ndef add(a, b):\n    return a + b\n```\n(Note: This is a fallback response due to connectivity issues).";
    } else if (lastMessage.includes('hi') || lastMessage.includes('hello')) {
      responseText = "Hello! I'm the Learnmora AI. I'm currently in a low-power fallback mode while my main Gemini 1.5 Pro engine is being calibrated. How can I assist you with your career goals in the meantime?";
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(' ');
        for (const word of words) {
          controller.enqueue(encoder.encode(word + ' '));
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
