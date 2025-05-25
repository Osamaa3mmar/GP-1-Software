import GPT from "openai";

const client = new GPT({
  apiKey:
  "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"
});

export const generateQuizQuestion = async (topic, details, difficulty, questionType = 'mcq', count = 1) => {
  try {
    console.log(`Generating ${count} ${questionType} question(s) about ${topic}...`);
    // Create a prompt based on the input parameters and question type
    let promptTemplate = '';
    
    // Different prompt templates based on question type
    if (questionType === 'mcq') {
      promptTemplate = `
      Generate ${count > 1 ? count + ' different' : 'a'} multiple-choice question${count > 1 ? 's' : ''} (MCQ) about the topic: '${topic}'.
      
      ${details ? `Additional details about the topic: ${details}` : ''}
      
      Difficulty level: ${difficulty}
      
      The response should be in JSON format with the following structure:
      ${count > 1 ? '[' : ''}
      {
        "questionText": "The question text here",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "The correct option here (exactly matching one of the options)",
        "explanation": "A brief explanation of why this answer is correct",
        "marks": 5,
        "type": "mcq"
      }${count > 1 ? ',' : ''}
      ${count > 1 ? '...' : ''}
      ${count > 1 ? ']' : ''}
      
      IMPORTANT: Make sure that the correctAnswer value EXACTLY matches one of the option strings in the options array. This is critical for proper processing.
      
      Make sure the question${count > 1 ? 's are' : ' is'} appropriate for the specified difficulty level. The question${count > 1 ? 's' : ''} should be clear, concise, and educational.
      `;
    } else if (questionType === 'true_false') {
      promptTemplate = `
      Generate ${count > 1 ? count + ' different' : 'a'} true/false question${count > 1 ? 's' : ''} about the topic: '${topic}'.
      
      ${details ? `Additional details about the topic: ${details}` : ''}
      
      Difficulty level: ${difficulty}
      
      The response should be in JSON format with the following structure:
      ${count > 1 ? '[' : ''}
      {
        "questionText": "The true/false statement here",
        "options": ["True", "False"],
        "correctAnswer": "True or False (matching exactly one of the options)",
        "explanation": "A brief explanation of why this answer is correct",
        "marks": 5,
        "type": "true_false"
      }${count > 1 ? ',' : ''}
      ${count > 1 ? '...' : ''}
      ${count > 1 ? ']' : ''}
      
      IMPORTANT: Make sure that the correctAnswer value is EXACTLY either "True" or "False" matching one of the options. This is critical for proper processing.
      
      Make sure the question${count > 1 ? 's are' : ' is'} appropriate for the specified difficulty level. The statement${count > 1 ? 's' : ''} should be clear, concise, and educational.
      `;
    } else if (questionType === 'short_answer') {
      promptTemplate = `
      Generate ${count > 1 ? count + ' different' : 'a'} short answer question${count > 1 ? 's' : ''} about the topic: '${topic}'.
      
      ${details ? `Additional details about the topic: ${details}` : ''}
      
      Difficulty level: ${difficulty}
      
      The response should be in JSON format with the following structure:
      ${count > 1 ? '[' : ''}
      {
        "questionText": "The question text here",
        "options": [],
        "correctAnswer": "The correct short answer here",
        "explanation": "A brief explanation of the correct answer",
        "marks": 5,
        "type": "short_answer"
      }${count > 1 ? ',' : ''}
      ${count > 1 ? '...' : ''}
      ${count > 1 ? ']' : ''}
      
      For short answer questions, the options array should be empty, and the correctAnswer should be a concise answer.
      
      Make sure the question${count > 1 ? 's are' : ' is'} appropriate for the specified difficulty level. The question${count > 1 ? 's' : ''} should be clear, concise, and educational.
      `;
    }
    
    const prompt = promptTemplate;

    // Call the OpenAI API
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an educational quiz generator that creates high-quality multiple-choice questions. Your responses should be in valid JSON format only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
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
