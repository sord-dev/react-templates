import { connect } from '../../../database/connect.js';
import { ComponentMeta, User } from '../../../database/models.js';
import { CSS, Code } from '../../../database/models-mongo.js';
import { connectMongo, disconnectMongo } from '../../../database/connect-mongo.js';

const formatComponent = item => {
    let list = [item];
    let formatted = list.map(c => ({
        component_id: c.dataValues.component_id,
        title: c.dataValues.title,
        description: c.dataValues.description,
        jsx: c.dataValues.jsx_id,
        css: c.dataValues.css_id,
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
                const cssData = await CSS.findById(result.css)
                const codeData = await Code.findById(result.jsx)
                result = { ...result, jsx: codeData.code, css: cssData.css }

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
