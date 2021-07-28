import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { IUserDocument as IUser } from '../model/user.model';
import { omit } from "lodash";

export function getUsers() {
    return User.find().lean();
}

export async function validatePassword({ email, password, }: {
    email: IUser["email"];
    password: string;
}) {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<IUser>) {
    return User.findOne(query).lean();
}

export async function createUser(input: DocumentDefinition<IUser>) {
    try {
        return await User.create(input);
    } catch (error) {
        throw new Error(error);
    }
}