import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export async function verifyPassword(rawPassword, hashedPassword): Promise<boolean> {
    return await argon.verify(rawPassword, hashedPassword)
}

export function getPayload(id, user: User) {
    return {
        sub: id.toHexString(),
        email: user.email,
        role: user.role
    }
}