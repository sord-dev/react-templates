import { connect } from '../../../database/connect.js';
import { connectMongo, disconnectMongo } from '../../../database/connect-mongo.js';

import { ComponentMeta, User } from '../../../database/models.js';
import { Gut } from '../../../database/models-mongo.js';

const formatComponent = item => {
    let list = [item];
    let formatted = list.map(c => ({
        component_id: c.dataValues.component_id,
        title: c.dataValues.title,
        description: c.dataValues.description,
        guts_id: c.dataValues.guts_id,
        author: {
            username: c.dataValues.User.username
        }
    }))

    return formatted[0];
}

export default async function handler(req, res) {
    await connect();

    switch (req.method) {
        case 'GET':
            try {
                await connectMongo();
                const component = await ComponentMeta.findByPk(req.query.componentId, {
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                });

                if (!component) return res.status(404).json({ error: 'no such component found' });
                let result = formatComponent(component) // format component

                // request mongodb for file contents
                const guts = await Gut.findById(result.guts_id);
                if (!guts) return res.status(404).json({ error: 'no such component data found' });
                result = { ...result, jsx: guts.code, css: guts.css }

                res.status(200).json(result);
                await disconnectMongo()
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(404).json({ error: 'Not Found.' });
            break;
    }
}
