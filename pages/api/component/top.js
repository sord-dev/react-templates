import { connect } from '../../../database/connect.js';
import { ComponentPost, User } from '../../../database/models.js';

export default async function handler(req, res) {
    await connect();

    switch (req.method) {
        case 'GET':
            try {
                const allComponents = await ComponentPost.findAll({
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                    limit: 4
                });

                res.status(200).json(allComponents);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(404).json({ error: 'Not Found.' });
            break;
    }
}
