import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { getVerificationTokenByEmail } from "@/utils/verification-token";

export const generateVerificationToken = async (email: string) => {
    // Generating a token
    const token = uuidv4();

    // Token expires in 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // Checking for an existing token for a given email
    const existingToken = await getVerificationTokenByEmail(email);

    // If token exists...
    if (existingToken) {
        // Remove it from the database
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // Generating new Verification Token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};
