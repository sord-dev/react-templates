

import { Op } from 'sequelize';
import { connect } from '../../../database/connect.js';
import { ComponentMeta, User } from '../../../database/models.js';

const formatComponentList = list => {
    return list.map(c => ({
        component_id: c.dataValues.component_id,
        title: c.dataValues.title,
        description: c.dataValues.description,
        guts_id: c.dataValues.guts_id,
        author: {
            username: c.dataValues.User.username
        },
        createdAt: c.dataValues.createdAt
    }))
}

export default async function handler(req, res) {
    await connect();

    const searchFilter = {
        where: {
            title: {
                [Op.iLike]: `%${req?.query?.q.replace(/%20/g, '')}%`
            }
        },
        include: {
            model: User,
            attributes: ['username']
        },
    }

    const searchAllFilter = {
        include: {
            model: User,
            attributes: ['username']
        },
    }

    switch (req.method) {
        case 'GET':
            try {
                let query = req.query.q ? searchFilter : searchAllFilter;
                const allComponents = await ComponentMeta.findAll(query);


                if (!allComponents) throw new Error('no components found.')
                const result = formatComponentList(allComponents)

                console.log(result);

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
