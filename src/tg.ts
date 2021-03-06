import * as core from "@actions/core";
import axios from "axios";
import { ReleaseLink, TelegramSendMessageResponse } from "./schema";

const tgBotToken = core.getInput('tg-bot-token', { required: true });

const client = axios.create({
    baseURL: `https://api.telegram.org/bot${tgBotToken}/`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});

// export function sendStatusMessage(tgBotToken: string, payload: any) {
//     const data = JSON.stringify(payload);

//     const req = https.request({
//         hostname: "api.telegram.org",
//         port: 443,
//         path: `/bot${tgBotToken}/sendMessage`,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': data.length
//         }
//     }, (res) => {
//         console.log(`statusCode: ${res.statusCode}`)

//         res.on('data', (d) => {
//             process.stdout.write(d)
//         })
//     });

//     req.on('error', (error) => {
//         console.error(error)
//     })

//     req.write(data)
//     req.end()
// }

export async function sendReleaseMessage(chat_id: string, msg: string, link: ReleaseLink) {
    try {
        const response = await client.post("sendMessage", {
            chat_id: chat_id,
            text: msg,
            parse_mode: "MarkdownV2",
            disable_notification: false,
            reply_markup: {
                inline_keyboard: [
                    [
                        link
                    ]
                ]
            }
        });

        const tgResponse: TelegramSendMessageResponse = response.data;
        await pinChatMessage(tgResponse.result.chat.id, tgResponse.result.message_id, true);
    } catch (exception) {
        core.error(JSON.stringify(exception.response.data))
    }
}

export async function pinChatMessage(chat_id: number | string, message_id: Number, disable_notification: boolean = false) {
    try {
        const response = await client.post("pinChatMessage", {
            chat_id,
            message_id,
            disable_notification
        });
    } catch (exception) {
        core.error(JSON.stringify(exception.response.data))
    }
}