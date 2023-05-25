import { connect } from '../../../database/connect.js';
import { ComponentMeta, User } from '../../../database/models.js';
import {
  saveComponentCSS,
  saveComponentCode,
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

        const cssId = await saveComponentCSS(req.body.css);
        const jsxId = await saveComponentCode(req.body.code);

        console.log('IDS ', { cssId, jsxId });

        newComponent = await ComponentMeta.update(
          { jsx_id: jsxId, css_id: cssId },
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
