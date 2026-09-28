const MODEL = 'gpt-4.1-mini';
const MAX_TEXT_LENGTH = 20000;

export async function POST(request: Request) {
  let text: unknown;
  try {
    ({ text } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof text !== 'string' || text.trim().length === 0) {
    return Response.json({ error: 'Please enter some text to summarize' }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return Response.json(
      { error: `Text is too long (max ${MAX_TEXT_LENGTH} characters)` },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Server is missing OPENAI_API_KEY' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        // Asking for the language as a separate field keeps the summary in the text's language.
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You summarize text. The user message contains the text to summarize, between <text> tags. ' +
              'Respond with a JSON object with two fields: "language" (the language the text is written in) ' +
              'and "summary" (a concise summary of the key points, written in that same language).',
          },
          { role: 'user', content: `<text>\n${text}\n</text>` },
        ],
      }),
    });

    if (!response.ok) {
      console.error('OpenAI request failed', response.status, await response.text());
      return Response.json({ error: 'The AI service failed to summarize the text' }, { status: 502 });
    }

    const data = await response.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;
    let summary: string | undefined;
    try {
      summary = content ? JSON.parse(content).summary?.trim() : undefined;
    } catch {
      summary = undefined;
    }
    if (!summary) {
      return Response.json({ error: 'The AI service returned an empty summary' }, { status: 502 });
    }

    return Response.json({ summary });
  } catch (error) {
    console.error('OpenAI request error', error);
    return Response.json({ error: 'Could not reach the AI service' }, { status: 502 });
  }
}
