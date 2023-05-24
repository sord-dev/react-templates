import { compare } from "bcrypt";
import { connect } from "../../../database/connect.js";
import { User } from '../../../database/models.js'

export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'POST':
            try {
                const foundUser = await User.findOne({ where: { username: req.body.username } });

                if (!foundUser) return res.status(404).json({ error: 'No user found.' })

                const match = await compare(req.body.password, foundUser.password);

                if (match) {
                    res.status(200).json({ ...foundUser.dataValues, password: null })
                } else {
                    res.status(401).json({ error: 'Incorrect Password.' })
                }

            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
            break;

        default:
            return res.status(404).json({ error: 'Not Found.' })
            break;
    }
}