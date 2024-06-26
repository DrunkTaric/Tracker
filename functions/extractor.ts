export function extractParams(url: string): { [key: string]: string | number } {
  const local_url = new URL(url)
  const local_params = new URLSearchParams(local_url.search)
  let object: { [key: string]: string | number } = {}

  const local_entries = local_params.entries()
  let current_entry = local_entries.next()

  while (!current_entry.done) {
    object[current_entry.value[0]] = current_entry.value[1]
    current_entry = local_entries.next()
  }

  return object
}
