export async function POST(req) {
    const body = await req.json();
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("APIKEY");
  
    let output = "";
    let info = "";
  
    // Log the received data for debugging purposes
    console.log('Received data:', body);
  
    try {
      const response = await fetch(body.Input, {
        method: 'HEAD',
        redirect: 'follow'
      });
      output = response.url;
    } catch (err) {
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Error occurred while fetching the URL." }),
        { status: 500 }
      );
    }
  
    async function generateStory() {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Tell me info about this link: ${output}`;
  
        // Generate content using the AI model
        const result = await model.generateContent({ prompt });
  
        // Extract and log the result for debugging
        console.log('AI Response:', result);
  
        // Assuming the result contains 'content' as the main response
        return result.response.text() || "No information available.";
      } catch (err) {
        console.error('Error generating story:', err);
        return "Couldn't generate info.";
      }
    }
  
    // Generate information about the URL using the AI API
    info = await generateStory();
  
    return new Response(
      JSON.stringify({
        message: 'Your destination link is:',
        Output: output,
        Info: info
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }