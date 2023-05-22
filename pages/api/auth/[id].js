import { connect } from "../../../database/connect.js";
import { user } from '../../../database/models.js'


export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'GET':
            try {
                const returnedUser = await user.findOne({ where: { id: req.query.id } });

                if(!returnedUser) throw new Error('User not found.')

                return res.status(200).json({ ...returnedUser.dataValues, password: null })
            } catch (error) {
                return res.status(500).json({ error: error.message })

            }
            break;

        default:
            return res.status(404).json({ error: 'Not Found.' })
            break;
    }
}