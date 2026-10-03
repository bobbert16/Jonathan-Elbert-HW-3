// S24 §3: helper kecil yang tidak terikat satu komponen.
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
export function getIdFromUrl(url) {
  return Number(url.split("/").filter(Boolean).pop());
}

export function formatId(id) {
  return "#" + String(id).padStart(3, "0");
}
