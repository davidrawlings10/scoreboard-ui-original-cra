// keeping this in js

let teams = {};

export function searchCacheForTeam(id) {
  return teams[id];
}

export function cacheTeam(id, team) {
  teams[id] = team;
}
