// Create a bot that play minecraft with mineflayer
// require mineflayer
const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')

// Create the bot
const bot = mineflayer.createBot({
    host: "localhost",
    port: 57986,
    username: "Mybeautybot",
});

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

// Attack the closest entity
bot.on("chat", (username, message) => {
    if (message === "attack") {
        const target = bot.nearestEntity();
        if (target) {
            bot.attack(target, true);
            bot.chat("/tell @a I attack the entity");
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Follow the closest player
bot.once('spawn', () => {
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
  
    bot.on('chat', (username, message) => {
      if (username === bot.username) return
      if (message !== 'come') return
      const target = bot.players[username].entity
      if (!target) {
        bot.chat("I don't see you !")
        return
      }
      const { x: playerX, y: playerY, z: playerZ } = target.position
  
      bot.pathfinder.setMovements(defaultMove)
      bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
    })
})


// Stop the bot
bot.on("chat", (username, message) => {
    if (message === "stop") {
        bot.chat("/tell @a I stop");
        bot.pathfinder.setMovements(bot.entity);
    }
});

// Get mob type of nearest entity
bot.on("chat", (username, message) => {
    if (message === "mob") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + target.entityType);
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Get mob type of nearest entity
bot.on("chat", (username, message) => {
    if (message === "name") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + target.username);
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Get position of nearest entity
bot.on("chat", (username, message) => {
    if (message === "position") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + JSON.stringify(target.position));
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Get health of nearest entity
bot.on("chat", (username, message) => {
    if (message === "health") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + target.health);
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Get health of nearest entity
bot.on("chat", (username, message) => {
    if (message === "armor") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + target.armor);
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});

// Get name of nearest entity
bot.on("chat", (username, message) => {
    if (message === "name") {
        const target = bot.nearestEntity();
        if (target) {
            bot.chat("/tell @a " + target.name);
        } else {
            bot.chat("/tell @a No entity close to me");
        }
    }
});