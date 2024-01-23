export const checkXSS = (code: string) => {
    const regex = /[<]*<[\s\u200B]*script[\s\u200B]*>.*[/]*[<]*<[\s\u200B]*\/[\s\u200B]*script[\s\u200B]*>/ig;
    return regex.test(code);
}
