export type ReleaseLink = {
    text: string;
    url: string;
}

export type TelegramSendMessageResponse = {
    ok: boolean,
    result: {
        message_id: number,
        from: {
            id: number,
            is_bot: boolean,
            first_name: string,
            username: string
        },
        chat: {
            id: number,
            title: string,
            username: string,
            type: "supergroup"
        },
        date: number,
        text: string,
        entities: any[],
        reply_markup:
        {
            inline_keyboard: any[]
        }
    }
}