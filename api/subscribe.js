export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, first_name, last_name, segment } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const FLODESK_API_KEY = 'fd_key_821377b5eaf448999748fc961e4e940b.OmFo0SFWi6TOH8CLDfDNUCxBe3ckehQpktZA46x1R5SvrO6iUfUIrwHdgkPUfIMhSj7KMxZLid5oo0DKEriJN41aWaTMHhlDF5LZRnBAzjXOrnfFTPP49dG0L8iyqQQCGpqLgaoxBwbAFBc7KZxB7ZkzhxYBTzzWokY1Uf8bcSNXPhedr2PmHfEf0kbXuc5P';

  try {
    const response = await fetch('https://api.flodesk.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(FLODESK_API_KEY + ':').toString('base64')
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        segments: segment ? [segment] : []
      })
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Subscription failed' });
  }
}
