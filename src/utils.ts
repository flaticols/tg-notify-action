import { ReleaseLink } from "./schema";

/**
 * Make array from multiline string.
 * @param input Multiline string
 */
export function splitByNewLlne(input: string): string[] {
    const parts = input.trim().split(/\r?\n/);

    if (parts.length > 1) {
        return parts;
    }

    return [input];
}

export function createReleaseLink(text: string): ReleaseLink {
    const link = text.split(/@/);
    const obj = {
        text: link[0].trim(),
        url: link[1].trim(),
    };

    return obj;
}

export default {
    splitByNewLlne,
    createReleaseLink
}
