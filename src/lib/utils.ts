export function lastEightOf(item: string): string {
  // guard against items of less than 8 chars
  if (item.length < 8) {
    return item;
  }
  return item.substring(item.length - 8, item.length);
}
