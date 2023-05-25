import { connect } from '../../../database/connect.js';
import { ComponentMeta, User } from '../../../database/models.js';
import {
  saveComponentGuts,
  connectMongo,
  disconnectMongo,
} from '../../../database/connect-mongo.js';

export default async function handler(req, res) {
  await connect();

  switch (req.method) {
    case 'POST':
      try {
        await connectMongo();

        const user = await User.findByPk(req.body.user_id);
        if (!user) throw new Error('No user found.');

        let newComponent = await ComponentMeta.create({
          title: req.body.title,
          description: req.body.description,
          user_id: user.dataValues.user_id,
        });

        const gutsId = await saveComponentGuts({css: req.body.css, code: req.body.code });

        console.log('ID ', gutsId);

        newComponent = await ComponentMeta.update(
          { guts_id: gutsId },
          { where: { component_id: newComponent.component_id } }
        );

        res.status(200).json(newComponent);

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
