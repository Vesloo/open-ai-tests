// Create a bot that play minecraft with mineflayer
// require mineflayer
// Say a message when the bot is spawned
bot.on("spawn", () => {
    bot.chat("/tell @a I'm a bot!");
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
