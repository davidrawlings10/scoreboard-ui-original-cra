import config from "./config";

export function sfetchList(path: String) {
  return fetch(config.baseUrl + path)
    .then((res) => res.json())
    .then((json) => json.list);
}
