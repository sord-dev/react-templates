import { genSalt, hash } from "bcrypt";
import { connect } from "../../../database/connect.js";
import { User } from '../../../database/models.js'

export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'POST':
            try {
                const salt = await genSalt();
                const hashed = await hash(req.body.password, salt);

                const newUser = await User.create({ username: req.body.username, password: hashed });

                res.status(200).json({ ...newUser.dataValues, password: null })
            } catch (error) {
                let message = error.message;

                res.status(500).json({ error: message })
            }
            break;

        default:
            res.status(404).json({ error: 'Not Found.' })
            break;
    }
}