export function formatSecondsToMinutes(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const modSeconds = String(Math.floor(seconds % 60)).padStart(2, '0');

  const formatedMinutes = `${minutes}:${modSeconds}`;
  return formatedMinutes;
}
