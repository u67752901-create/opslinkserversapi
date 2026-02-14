import fetch from 'node-fetch';

const SERVERS_API = process.env.SERVERS_API;

export async function canAccessServer(user, serverId, token) {
  // Admin check
  const roleRes = await fetch(
    `${SERVERS_API}/servers/role/${encodeURIComponent(user.discordUsername)}`
  );
  const roleData = await roleRes.json();

  if (roleData.role === 'admin') {
    // admin can access approved servers
    const res = await fetch(`${SERVERS_API}/servers`);
    const servers = await res.json();
    return servers.some(s => s._id === serverId && s.status === 'approved');
  }

  // normal user: servers/mine
  const mineRes = await fetch(`${SERVERS_API}/servers/mine`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const mine = await mineRes.json();
  return mine.some(s => s._id === serverId);
}
