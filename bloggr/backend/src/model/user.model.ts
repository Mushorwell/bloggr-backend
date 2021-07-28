import config from 'config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface IUserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(signInPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    let user = this as IUserDocument;

    // guard clause for new or modified user
    if (!user.isModified('password')) return next();

    // Password encryption
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

    // Encrypted password
    user.password = await bcrypt.hashSync(user.password, salt);

    return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
    signInPassword: string
) {
    const user = this as IUserDocument;

    return bcrypt.compare(signInPassword, user.password).catch((e) => false);
};

const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User;