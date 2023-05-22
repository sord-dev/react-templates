import { connect } from '../../../database/connect.js';
import { ComponentPost, User } from '../../../database/models.js'

export default async function handler(req, res) {
    await connect()

    switch (req.method) {
        case 'POST':

            try {
                const user = await User.findByPk(req.body.user_id);
                if(!user) throw new Error('No user found.');

                const newComponent = await ComponentPost.create({ title: req.body.title, description: req.body.description, user_id: user.dataValues.user_id });

                res.status(200).json(newComponent)

            } catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message })
            }
            break;

        default:
            return res.status(404).json({ error: 'Not Found.' })
            break;
    }
}