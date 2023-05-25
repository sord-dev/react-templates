import { connect } from '../../../database/connect.js';
import { ComponentMeta, User } from '../../../database/models.js';

const formatComponentList = list => {
    return list.map(c => ({
        component_id: c.dataValues.component_id,
        title: c.dataValues.title,
        description: c.dataValues.description,
        jsx_id: c.dataValues.jsx_id,
        css_id: c.dataValues.css_id,
        author: {
            username: c.dataValues.User.username
        }
    }))
}

export default async function handler(req, res) {
    await connect();

    switch (req.method) {
        case 'GET':
            try {
                const allComponents = await ComponentMeta.findAll({
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                });

                if (!allComponents) throw new Error('no components found.')
                const result = formatComponentList(allComponents)

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(404).json({ error: 'Not Found.' });
            break;
    }
}
