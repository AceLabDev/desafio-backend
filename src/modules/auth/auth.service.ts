import { AppDataSource } from "../../config/database";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  async register(email: string, password: string) {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("USER_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }

  async login(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return token;
  }
}

export const authService = new AuthService();
