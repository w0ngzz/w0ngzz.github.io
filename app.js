
async function fetchData() {
  const response = await fetch('https://gwo101.302922.xyz/status');
  const data = await response.json();
  const container = document.getElementById('container');
  container.innerHTML = '';

  for (const [id, v] of Object.entries(data)) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${id}</h2>
      <p>CPU: ${v.cpu.toFixed(2)}%</p>
      <p>Mem: ${v.mem.toFixed(2)}%</p>
      <p>Disk: ${v.disk.toFixed(2)}%</p>
      <p>Net In: ${formatBytes(v.net_in)}</p>
      <p>Net Out: ${formatBytes(v.net_out)}</p>
      <p>Uptime: ${formatUptime(v.uptime)}</p>
      <p>Last update: ${formatTime(v.timestamp)}</p>
    `;
    container.appendChild(card);
  }
}

function formatTime(ts) {
  const d = new Date(ts * 1000);
  return d.toLocaleString();
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  const mb = kb / 1024;
  return mb.toFixed(1) + ' MB';
}

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

setInterval(fetchData, 5000);
fetchData();
