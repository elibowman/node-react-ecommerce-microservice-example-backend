import User from '../entity/user';

export default class UserRepository {
    
    async createUser({ email, password, address, city, state, zip }) {
        
        return (
            await User.create ({
                email,
                password,
                address,
                city,
                state,
                zip
            })
        )
    }

    async getUser(email) {
        return (
            await User.findAll(
                {
                    where: {
                        email: email
                    }
                }
            )
        );
    }

    // async getAllUsers() {
    //     return await User.findAll();
    // }

    async getAllUsers() {
        return await User.findAll();
    }

    async updateUser(update, selector) {
        return await User.update(
            update,
            { where: selector }
        );
    }

    async deleteUser(email) {
        return await User.destroy(
            {
                where: {
                    email: email
                }
            }
        );
    }
}
