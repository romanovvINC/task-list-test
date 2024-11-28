export function fromIsoToFormat (dateIso: string) {
  const date = new Date(dateIso);
  const days = date.getDate();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${days < 10 ? '0' + days.toString() : days}-${month < 10 ? '0' + month.toString() : month}-${date.getFullYear()} ${hours < 10 ? '0' + hours.toString() : hours}:${minutes < 10 ? '0' + minutes.toString() : minutes}`;
}
