import { getDb } from '../db/mongoClient.js';

export const handleWebhook = async (req, res) => {
  const raw = req.body.toString('utf8').replace(/\r/g, '').trim();
  let messages = [];

  try {
    messages = [JSON.parse(raw)];
  } catch {
    try {
      const parts = raw.replace(/}\s*{/g, '}\n{').split('\n');
      messages = parts.map(str => JSON.parse(str));
    } catch (err) {
      console.error('🚨 JSON split parsing failed:', err.message);
      console.error('⚠️ Raw content was:\n', raw);
      return res.status(400).json({ success: false, error: 'Invalid JSON format' });
    }
  }

  try {
    const db = getDb();
    const collection = db.collection(process.env.COLLECTION_NAME);
    await collection.insertMany(
      messages.map(m => ({
        data: m,
        receivedAt: new Date(),
      }))
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('🚨 Mongo insert error:', err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
};
