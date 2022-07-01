const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs-extra");
const mineflayer = require("mineflayer");
require("dotenv").config();

const bot = mineflayer.createBot({
    host: "192.168.1.3",
    port: 57465,
    username: "Mybeautybot",
});

async function main() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: fs.readFileSync("script.js").toString(),
        max_tokens: 250,
        temperature: 0.7,
    });
    fs.appendFileSync("script.js", response.data.choices[0].text);
}
main()
    .catch((error) => {
        console.log(error);
    })
    .then(() => {
        console.log("Done");
    });
