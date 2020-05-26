import * as core from '@actions/core';
import * as tg from "./tg";

async function run(): Promise<void> {
  try {
    const tgChatId = core.getInput('tg-chat-id', { required: true })
    const type = core.getInput("type", { required: true });

    core.info(`Type: ${type}`);

    switch (type.toLowerCase()) {
      case "release":
        const releaseLink = core.getInput("release-link");
        const msg = core.getInput("message");

        tg.sendReleaseMessage(tgChatId, msg.trim(), {
          text: "Release",
          url: releaseLink,
        });

        break;
      case "status":
        // tg.sendStatusMessage(tgBotToken, {
        //   chat_id: tgChatId,
        //   text: "Status message",
        //   parse_mode: "MarkdownV2",
        //   disable_notification: false
        // });
        break;
      case "message":
        break;
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()