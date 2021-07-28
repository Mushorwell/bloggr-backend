import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import config from "config";
import { get } from "lodash";
import { IUserDocument as IUser } from '../model/user.model';
import Session, { ISessionDocument as SessionDoc } from '../model/session.model';
import { sign, decode } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });

    return session.toJSON();
}

export function createAccessToken({ user, session, }: {
    user:
        | Omit<IUser, 'password'>
        | LeanDocument<Omit<IUser, 'password'>>;
    session:
        | Omit<SessionDoc, 'password'>
        | LeanDocument<Omit<SessionDoc, 'password'>>;
}) {
    // Build and return the new access token
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') } // 15 minutes
    );

    return accessToken;
}

export async function reIssueAccessToken({
                                             refreshToken,
                                         }: {
    refreshToken: string;
}) {
    // Decode the refresh token
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, '_id')) return false;

    // Get the session
    const session = await Session.findById(get(decoded, '_id'));

    // Make sure the session is still valid
    if (!session || !session?.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = createAccessToken({ user, session });

    return accessToken;
}

export async function updateSession(
    query: FilterQuery<SessionDoc>,
    update: UpdateQuery<SessionDoc>
) {
    return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDoc>) {
    return Session.find(query).lean();
}