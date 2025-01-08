import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllFacts() {
  return await api.get(host + "/data/shows?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getFactById(id) {
  return await api.get(host + `/data/shows/${id}`);
}

// create listing
export async function addFact(fact) {
  return await api.post(host + "/data/shows", fact);
}

// edit listing by id
export async function editFactById(id, fact) {
  return await api.put(host + `/data/shows/${id}`, fact);
}

// delete listing by id
export async function deleteFactById(id) {
  return await api.del(host + `/data/shows/${id}`);
}

export async function search(query) {
  return await api.get(host + `/data/shows?where=title%20LIKE%20%22${query}%22`);
}


