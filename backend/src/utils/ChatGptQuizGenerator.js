import GPT from "openai";

const client = new GPT({
  apiKey:
  "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"
});

// Define common JSON structures to avoid repetition in prompts
const questionStructures = {
  mcq: '{"questionText":"Q","options":["A","B","C","D"],"correctAnswer":"A","explanation":"E","marks":5,"type":"mcq"}',
  true_false: '{"questionText":"Q","options":["True","False"],"correctAnswer":"True/False","explanation":"E","marks":5,"type":"true_false"}',
  short_answer: '{"questionText":"Q","options":[],"correctAnswer":"A","explanation":"E","marks":5,"type":"short_answer"}'
};

export const generateQuizQuestion = async (topic, details, difficulty, questionType = 'mcq', count = 1) => {
  try {
    console.log(`Generating ${count} ${questionType} question(s) about ${topic}...`);
    
    // Create a concise prompt to minimize token usage
    const structure = questionStructures[questionType];
    const arrayFormat = count > 1 ? `[${structure}]` : structure;
    
    // Build a compact prompt that includes all necessary information but uses fewer tokens
    let prompt = `Create ${count} ${difficulty} ${questionType} question${count > 1 ? 's' : ''} about "${topic}"`;    
    if (details) {
      prompt += ` with context: "${details}"`;
    }
    
    // Add specific instructions based on question type
    if (questionType === 'mcq') {
      prompt += `. Each question must have 4 options with exactly one correct answer.`;
    } else if (questionType === 'true_false') {
      prompt += `. Each answer must be exactly "True" or "False".`;
    } else if (questionType === 'short_answer') {
      prompt += `. Keep answers concise.`;
    }
    
    // Add format instructions
    prompt += ` Format: ${arrayFormat}`;
    
    // Add critical instruction for correctAnswer
    if (questionType === 'mcq' || questionType === 'true_false') {
      prompt += ` The correctAnswer MUST exactly match one of the options.`;
    }

    // Call the OpenAI API with optimized parameters to minimize costs
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // Using the standard model for reliability
      messages: [
        {
          role: "system",
          content: "Generate educational quiz questions in valid JSON format. Be concise."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5, // Lower temperature for more predictable outputs
      max_tokens: 500,  // Reduced from 800 to save costs
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    console.log('Raw API response:', content);
    
    let parsedData;
    try {
      parsedData = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      // Create a default response if parsing fails
      const defaultId = Date.now();
      return {
        questionText: `Question about ${topic}`,
        options: [
          { id: defaultId, text: 'Option 1' },
          { id: defaultId + 1, text: 'Option 2' }
        ],
        correctAnswer: defaultId.toString(),
        explanation: 'No explanation available',
        marks: 5,
        type: questionType,
        order: 1
      };
    }
    
    // Function to format a single question to match database structure
    const formatQuestion = (question) => {
      try {
        // Ensure options is an array
        const options = Array.isArray(question.options) ? question.options : [];
        
        // Create options with proper id and text format
        const formattedOptions = options.map(option => ({
          id: Date.now() + Math.floor(Math.random() * 10000), // Generate unique IDs
          text: option
        }));
        
        // Find the correct answer option and get its ID
        let correctAnswerId = null;
        if (formattedOptions.length > 0 && question.correctAnswer) {
          const correctOption = formattedOptions.find(opt => opt.text === question.correctAnswer);
          correctAnswerId = correctOption ? correctOption.id : null;
        }
        
        // For short answer questions, create a single option with the correct answer
        if (questionType === 'short_answer' || formattedOptions.length === 0) {
          const answerId = Date.now() + Math.floor(Math.random() * 10000);
          return {
            ...question,
            options: [],
            correctAnswer: answerId.toString(),
            type: question.type || questionType
          };
        }
        
        return {
          ...question,
          options: formattedOptions,
          correctAnswer: correctAnswerId ? correctAnswerId.toString() : '',
          type: question.type || questionType
        };
      } catch (error) {
        console.error('Error formatting question:', error, question);
        // Return a safe default question format
        const defaultId = Date.now();
        return {
          questionText: question.questionText || 'Default question text',
          options: [
            { id: defaultId, text: 'Option 1' },
            { id: defaultId + 1, text: 'Option 2' }
          ],
          correctAnswer: defaultId.toString(),
          explanation: question.explanation || 'No explanation provided',
          marks: question.marks || 5,
          type: questionType
        };
      }
    };
    
    // Handle both single question and multiple questions
    if (count > 1) {
      // If we requested multiple questions, the response should be an array
      const questionsArray = Array.isArray(parsedData) ? parsedData : [parsedData];
      
      // Format each question and add default order
      return questionsArray.map((question, index) => ({
        ...formatQuestion(question),
        order: index + 1
      }));
    } else {
      // Single question case
      return {
        ...formatQuestion(parsedData),
        order: 1
      };
    }
    
  } catch (error) {
    console.error("Error generating quiz question:", error);
    
    // Return a default question instead of throwing an error
    const defaultId = Date.now();
    return {
      questionText: `Question about ${topic}`,
      options: [
        { id: defaultId, text: 'Option 1' },
        { id: defaultId + 1, text: 'Option 2' }
      ],
      correctAnswer: defaultId.toString(),
      explanation: 'Error generating question. Please try again.',
      marks: 5,
      type: questionType,
      order: 1
    };
  }
};
