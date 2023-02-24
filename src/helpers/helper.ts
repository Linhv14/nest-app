import * as argon from 'argon2';
import { User } from 'src/schemas/user.schema';

export async function verifyPassword(hashedPassword, rawPassword): Promise<boolean> {
    return await argon.verify(hashedPassword, rawPassword)
}

export function getPayload(id, user: User) {
    return {
        sub: id.toHexString(),
        email: user.email,
        role: user.role,
        status: user.status
    }
}