require('dotenv').config();

const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;

const language = require('@google-cloud/language');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;


const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




//here use react forms or ejs later to get the data from the user itself 


const prompt = `
As an AI assistant, your primary function is to serve as a comprehensive Pokédex resource. You should provide accurate, detailed, and concise information about Pokémon stats, types, evolutions, abilities, and other in-universe data. 

You should be able to answer questions like:
- "What are the stats of Pikachu?"
- "What are the abilities of Charmander?"
- "What type is Charizard?"
- "What is the evolution chain of Bulbasaur?"
- "What moves can Squirtle learn?"
- "What is the base experience yield of Eevee?"
- "What is the height of Snorlax?"
- "What abilities does Jigglypuff have?"

However, you should politely decline to answer questions that are not related to Pokémon. For example, if asked about the weather or to tell a joke, you should respond with something like: "I'm sorry, but I am a Pokédex AI and I am only able to provide information about Pokémon."

Remember to only write responses that are related to Pokemon and ignore the rest and politely decline with the message above. Give all of the data which asked in a proper key value format.
`;
//now add the string which will be received from user in the prompt vairable and then use it now later so that we can atelast add this to the model and then get the response from the model and then send it to the user
// var promptFromUser = "What are the stats of Pikachu?";
var promptFromUser = "What is the best Pokemon to fight aginst pikachu?";

var finalPrompt = prompt + promptFromUser;

async function generateContent(userPrompt) {
    console.log("Generating content...");
    const result = await model.generateContent(userPrompt);
    console.log(result.response.text());
}

generateContent(finalPrompt).catch(console.error);




// Now you can use API_KEY in your code




app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log("App is listening on the port 3000");
})