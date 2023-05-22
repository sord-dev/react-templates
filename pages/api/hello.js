// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connect } from "../../database/connect";
import { user } from '../../database/models'


export default async function handler(req, res) {
  await connect()
  try {
    const testUser = await user.create({ username: 'stef', password: 'admin' });

    res.status(200).json(testUser)
  } catch (error) {
    res.status(500).json({ error: error.message })

  }
}
