import bcrypt from 'bcrypt'

const hashedPasswordMiddleware = async (next) => {
    try {
        if (this && this.isModified && this.isModified('password')) {
            const hashedPassword = await bcrypt.hashSync(this.password, 10);
            this.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
};

export default hashedPasswordMiddleware;