import UserRepository from '../repository/user-repository';
import bcrypt from "bcrypt";

export default class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async createUser({ email, password, address, city, state, zip }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            return (
                await this.userRepository.createUser ({
                    email,
                    password: hashedPassword,
                    address,
                    city,
                    state,
                    zip
                })
            )
        }
        catch (e) {
            throw e;
        }
    }

    async getUser(email) {
        return await this.userRepository.getUser(email);
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async updateUser({ email, password, address, city, state, zip }, selector) {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        return await this.userRepository.updateUser(
            { 
                email, 
                password: hashedPassword, 
                address, 
                city, 
                state, 
                zip
            }, 
            selector
        );
    }

    async deleteUser(email) {
        return await this.userRepository.deleteUser(email);
    }
}
