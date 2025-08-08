// D:\kuch_tho_phodna_hei\server\analysis\gemini.js

import { GoogleGenerativeAI } from '@google/generative-ai';

async function run(apiKey) {
  // The client is initialized with the passed key.
  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    // This setting forces the model to return a valid JSON object.
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  // A simpler prompt that requests the data in a JSON format.
  const prompt = 'Latest vaccination data for India, state-wise. Provide keys for "state", "total_doses_administered", "first_dose", and "second_dose".';

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonOutput = JSON.parse(response.text());
    console.log(jsonOutput);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default run;
