import { connect } from '../../../database/connect.js';
import { ComponentMeta } from '../../../database/models.js';
import {
    connectMongo,
    disconnectMongo,
} from '../../../database/connect-mongo.js';
import { Gut } from '../../../database/models-mongo.js';



export default async function handler(req, res) {
    await connect();

    switch (req.method) {
        case 'POST':
            try {
                await connectMongo();

                const component = await ComponentMeta.findByPk(req.body.component_id);
                if (!component) throw new Error('No component found.');

                await component.destroy()
                const result = await Gut.deleteOne({ _id: component.dataValues.guts_id });


                res.status(200).json({ component_id: component.dataValues.component_id, result });

                await disconnectMongo();
            } catch (error) {
                console.error('ERROR ', error);
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            return res.status(404).json({ error: 'Not Found.' });
            break;
    }
}
