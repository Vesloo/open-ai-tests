// Create a bot that play minecraft with mineflayer
// require mineflayer
const mineflayer = require("mineflayer");
const {
    pathfinder,
    Movements,
    goals: { GoalNear },
} = require("mineflayer-pathfinder");

// Create the bot
const bot = mineflayer.createBot({
    host: "localhost",
    port: 55389,
    username: "Mybeautybot",
});

// Say a message when the bot is spawned
bot.on("spawn", () => {
    bot.chat("/tell @a I'm a bot!");
    bot.loadPlugin(pathfinder);

});

// Say a message when the bot is killed
bot.on("death", () => {
    bot.chat("/tell @a I'm dead!");
});

// Jump when player says jump
bot.on("chat", (username, message) => {
    if (message === "jump") {
        bot.setControlState("jump", true);
        bot.setControlState("jump", false);
    }
});

// Move the bot when player says move
bot.on("chat", (username, message) => {
    if (message === "move") {
        bot.setControlState("forward", true);
        setTimeout(() => {
            bot.setControlState("forward", false);
        }, 3000);
    }
});

bot.on("chat", (username, message) => {
    if (message === "where") {
        bot.chat("/tell @a I'm at " + bot.entity.position);
    }
});

bot.on("chat", (username, message) => {
    if (message === "go") {
        const destination = { x: -2, y: 73, z: -3 };
        const path = bot.navigate.findPathSync(destination);
        bot.navigate.walk(path, {
            endRadius: 1,
            timeout: 1000,
        });
    }
});

// When the player says stop, stop the bot
bot.on("chat", (username, message) => {
    if (message === "stop") {
        bot.stop();
    }
});

// When the player says move, move the bot
bot.on("chat", (username, message) => {
    if (message === "move") {
        bot.setControlState("forward", true);
        setTimeout(() => {
            bot.setControlState("forward", false);
        }, 3000);
    }
});

// When the player says turn around, turn around the bot
bot.on("chat", (username, message) => {
    if (message === "turn around") {
        bot.setControlState("back", true);
        setTimeout(() => {
            bot.setControlState("back", false);
        }, 3000);
    }
});
