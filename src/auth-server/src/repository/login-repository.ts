import Login from '../entity/login';

export default class LoginRepository {

    async createLogin({ email, token }: { email: string, token: string}) {

        return (
            await Login.create({
                email,
                token,
            })
        )
    }

    async getAllLogins() {
        return await Login.findAll();
    }

    async getLogin(email: string) {
        return (
            await Login.findAll(
                {
                    where: {
                        email: email
                    }
                }
            )
        );
    }

    async updateLogin({ email, token }: any) {
        console.log('updateLogin')
    }

    async deleteLogin(email: string) {
        return await Login.destroy(
            {
                where: {
                    email: email
                }
            }
        );
    }
}
