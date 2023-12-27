import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma';

export const registration = async (req: $Request, res: $Response) => {
    try {
        const {email='', password=''} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'email or password not found'});
        }
        if (email.length < 8 || password.length < 6) {
            return res.status(400).json({message: 'email or password too short'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        
        await prisma.user.create({
            data: {
                email,
                password: hashed
            }
        });

        res.status(201).json({message: 'user created'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'})
    }
}

export const login = async (req: $Request, res: $Response) => {
    try {
        const secret = "secret";
        const token = jwt.sign({id: 1}, secret, {expiresIn: '1h'});
        const {email='', password=''} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'email or password not found'});
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({message: 'invalid credentials'});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({message: 'invalid credentials'});
        }
        
        const {password: _, ...rest} = user;

        return res.status(200).json({user: rest, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
}