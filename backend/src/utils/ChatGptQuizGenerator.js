// quizGenerator.js
import OpenAI from "openai";

// ✅ Store API key securely in environment variables
const openai = new OpenAI({
    apiKey:`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  `
 // 👉 Set this in .env
});

const questionTemplates = {
  mcq: {
    questionText: "Q",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "E",
    marks: 5,
    type: "mcq"
  },
  true_false: {
    questionText: "Q",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "E",
    marks: 5,
    type: "true_false"
  },
  short_answer: {
    questionText: "Q",
    options: [],
    correctAnswer: "A",
    explanation: "E",
    marks: 5,
    type: "short_answer"
  }
};

export async function generateQuizQuestion(topic, details = '', difficulty = 'medium', questionType = 'mcq', count = 1) {
  const structure = questionTemplates[questionType];
  const format = JSON.stringify(count > 1 ? [structure] : structure);

  let prompt = `Generate ${count} ${difficulty} ${questionType} question${count > 1 ? 's' : ''} on the topic "${topic}"`;
  if (details) prompt += ` with context: "${details}"`;

  if (questionType === 'mcq') {
    prompt += `. Each question should have 4 options, one correct answer.`;
  } else if (questionType === 'true_false') {
    prompt += `. The answer must be "True" or "False".`;
  } else if (questionType === 'short_answer') {
    prompt += `. Keep the answer short and relevant.`;
  }

  prompt += `\nFormat the output strictly as JSON like this:\n${format}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // You can use "gpt-3.5-turbo" if "gpt-4" is not available
      messages: [
        { role: "system", content: "You are a quiz generator. Provide quiz questions in JSON format only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const content = response.choices[0].message.content;
    console.log("🎯 Raw AI Response:", content);

    let parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) parsed = [parsed];

    return parsed.map((q, i) => ({
      ...q,
      order: i + 1
    }));
  } catch (error) {
    console.error("❌ Failed to generate questions:", error.message);
    return [{
      ...structure,
      questionText: `Sample question about ${topic}`,
      correctAnswer: structure.correctAnswer,
      explanation: "This is a fallback question.",
      order: 1
    }];
  }
}
