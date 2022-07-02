const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs-extra");
require("dotenv").config();


async function main() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let promptMessage = fs.readFileSync("script.js").toString();
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: promptMessage,
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
        require('./script.js');
    });
