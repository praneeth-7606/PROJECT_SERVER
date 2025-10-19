const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.error('⚠️ GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-1.5-flash for faster responses
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async summarizeTasks(tasks) {
    try {
      if (!tasks || tasks.length === 0) {
        return 'No tasks available to summarize.';
      }

      const taskList = tasks.map((task, index) => 
        `${index + 1}. [${task.status}] ${task.title}: ${task.description}`
      ).join('\n');

      const prompt = `Please provide a concise summary of the following project tasks. Include:
1. Total number of tasks
2. Distribution across statuses (To Do, In Progress, Done)
3. Key highlights or patterns
4. Any potential bottlenecks or concerns

Tasks:
${taskList}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('❌ Error in summarizeTasks:', error.message);
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env file');
      }
      throw new Error(`Failed to generate task summary: ${error.message}`);
    }
  }

  async answerQuestion(question, tasks) {
    try {
      if (!question || question.trim() === '') {
        throw new Error('Question cannot be empty');
      }

      if (!tasks || tasks.length === 0) {
        return 'No tasks available to answer questions about.';
      }

      const taskList = tasks.map((task, index) => 
        `${index + 1}. [${task.status}] ${task.title}: ${task.description}`
      ).join('\n');

      const prompt = `Based on the following project tasks, please answer this question: "${question}"

Tasks:
${taskList}

Please provide a helpful and accurate answer based on the task information provided.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('❌ Error in answerQuestion:', error.message);
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env file');
      }
      throw new Error(`Failed to generate answer: ${error.message}`);
    }
  }

  async analyzeTask(task) {
    try {
      const prompt = `Analyze the following task and provide insights:
Title: ${task.title}
Description: ${task.description}
Status: ${task.status}

Please provide:
1. A brief analysis of the task
2. Potential challenges or considerations
3. Suggestions for completion`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in analyzeTask:', error);
      throw new Error('Failed to analyze task');
    }
  }
}

module.exports = new GeminiService();
