import { connect } from "../../../database/connect.js";
import { user } from '../../../database/models.js'

export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'GET':
            try {
                const users = await user.findAll();
                const sanitised = users.map((u) => ({ ...u.dataValues, password: null }))

                res.status(200).json({ usersCount: sanitised.length, users: sanitised })
            } catch (error) {
                res.status(500).json({ error: error.message })

            }
            break;

        default:
            res.status(404).json({ error: 'Not Found.' })
            break;
    }
}