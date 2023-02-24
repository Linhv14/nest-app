import * as argon from 'argon2';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export async function verifyPassword(hashedPassword, rawPassword): Promise<boolean> {
    return await argon.verify(hashedPassword, rawPassword)
}

export function getPayload(id: string, user: User) {
    return {
        sub: id,
        email: user.email,
        role: user.role,
        status: user.status
    }
}

export function getDayAgo(day: number): Date {
    return new Date(Date.now() - day * 24 * 60 * 60 * 1000);
}