export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, action, data } = req.body;

  if (!password || password !== process.env.EDIT_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = 'Lior1207';
  const repo  = 'nz-travel-dashboard';
  const path  = 'trip-data.json';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // Fetch current file
  const getRes = await fetch(apiBase, { headers });
  if (!getRes.ok) return res.status(500).json({ error: 'Could not read data file from GitHub' });
  const fileData = await getRes.json();
  const current = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

  // Apply the action
  if (action === 'addHotel') {
    current.HOTELS.push(data);
  } else if (action === 'editHotel') {
    const { index, ...hotelData } = data;
    if (index < 0 || index >= current.HOTELS.length) return res.status(400).json({ error: 'Invalid hotel index' });
    current.HOTELS[index] = hotelData;
  } else if (action === 'deleteHotel') {
    current.HOTELS.splice(data.index, 1);

  } else if (action === 'addFlight') {
    current.FLIGHTS.push(data);
    current.FLIGHTS.sort((a, b) => a.date.localeCompare(b.date));
  } else if (action === 'editFlight') {
    const { index, ...flightData } = data;
    if (index < 0 || index >= current.FLIGHTS.length) return res.status(400).json({ error: 'Invalid flight index' });
    current.FLIGHTS[index] = flightData;
    current.FLIGHTS.sort((a, b) => a.date.localeCompare(b.date));
  } else if (action === 'deleteFlight') {
    current.FLIGHTS.splice(data.index, 1);

  } else if (action === 'addActivity') {
    current.ACTIVITIES.push(data);
    current.ACTIVITIES.sort((a, b) => a.date.localeCompare(b.date));
  } else if (action === 'editActivity') {
    const { index, ...actData } = data;
    if (index < 0 || index >= current.ACTIVITIES.length) return res.status(400).json({ error: 'Invalid activity index' });
    current.ACTIVITIES[index] = actData;
    current.ACTIVITIES.sort((a, b) => a.date.localeCompare(b.date));
  } else if (action === 'deleteActivity') {
    current.ACTIVITIES.splice(data.index, 1);

  } else if (action === 'toggleTodo') {
    const todo = current.TODOS.find(t => t.id === data.id);
    if (todo) todo.done = data.done;
  } else if (action === 'addTodo') {
    current.TODOS.push(data);
  } else if (action === 'editTodo') {
    const todo = current.TODOS.find(t => t.id === data.id);
    if (todo) {
      todo.label   = data.label;
      todo.labelHe = data.labelHe;
      todo.notes   = data.notes;
      todo.notesHe = data.notesHe;
    }
  } else if (action === 'deleteTodo') {
    const idx = current.TODOS.findIndex(t => t.id === data.id);
    if (idx !== -1) current.TODOS.splice(idx, 1);
  } else {
    return res.status(400).json({ error: 'Unknown action' });
  }

  // Commit back to GitHub
  const newContent = Buffer.from(JSON.stringify(current, null, 2)).toString('base64');
  const putRes = await fetch(apiBase, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `edit form: ${action}`,
      content: newContent,
      sha: fileData.sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    return res.status(500).json({ error: 'GitHub commit failed', detail: err });
  }

  return res.status(200).json({ ok: true });
}
