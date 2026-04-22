import crypto from "crypto";

export const generateApiKey = ()=>{
    const randomHex = crypto.randomBytes(32).toString("hex");
    const visiblePrefix = randomHex.slice(0,8);
    const rawKey = `sk_${randomHex}`;
    const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
    const prefix = `sk_${visiblePrefix}`;

    return {
        rawKey,
        keyHash,
        prefix
    };
};
