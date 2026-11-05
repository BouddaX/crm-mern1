const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/clients";

async function request(url, options = {}) {
  let response;
  try { response = await fetch(url, options); }
  catch (error) { throw new Error("Cannot reach the API. Is the backend running?"); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status}).`);
  return data;
}
export function getClients() { return request(API_URL); }
export function createClient(client) { return request(API_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(client) }); }
export function updateClient(id, changes) { return request(`${API_URL}/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(changes) }); }
export function deleteClient(id) { return request(`${API_URL}/${id}`, { method:"DELETE" }); }
