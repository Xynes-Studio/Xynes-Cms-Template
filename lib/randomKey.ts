export function generateUniqueRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const timestamp = Date.now().toString(36); // Base36 for compact representation
    let randomPart = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPart += characters.charAt(randomIndex);
    }

    return `${timestamp}-${randomPart}`;
}