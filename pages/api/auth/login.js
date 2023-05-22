import { connect } from "../../../database/connect.js";
import { user } from '../../../database/models.js'


export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'POST':
            const testUser = await user.create({ username: 'stef', password: 'admin' });

            res.status(200).json(testUser)
            break;

        default:
            res.status(404).json({error: 'Not Found.'})
            break;
    }
}