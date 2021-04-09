const { Telegraf, Markup } = require("telegraf");
const Web3 = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/dcaff8ece739420a834123b407b373f4");
const bot = new Telegraf(process.env.BOT_TOKEN || "1759536369:AAEwLoZtezLZUnnaSXjyrt3UDLsXHZqDEGg");


function start(ctx) {
    return ctx.reply("Welcome boy!!", {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard([Markup.button.callback("🔍 Account", "account"), Markup.button.callback("💰 Balance", "balance")]),
    });
}

function create() {
    const newA = web3.eth.accounts.create();
    return `Address :\n <i>${newA.address}</i>\n\nPrivateKey :\n <i>${newA.privateKey}</i>`;
}

const main = async () => {
    bot.start((ctx) => {
        start(ctx);
    });

    bot.action(/.+/, async (ctx) => {
        let act = ctx.match[0];
        switch (act) {
            case "account":
                ctx.reply("Account", {
                    parse_mode: "HTML",
                    ...Markup.inlineKeyboard([Markup.button.callback("Create", "create"), Markup.button.callback("Import", "import")]).resize(),
                });
                break;
            case "balance":
                ctx.reply("balance");
                break;
            case "create":
                ctx.reply(create(), { parse_mode: "HTML" });
                break;
            default:
                ctx.reply("command not fund");
        }
    });
    bot.hears("home", (ctx) => {
        start(ctx);
    });
    bot.launch({
      webhook: {
        domain: 'https://myaddress.com',
        port: 4000
      }
    });
    console.log("bot running ...");
};

main();
