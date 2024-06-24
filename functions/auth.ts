export function isAuthenticated(): boolean {
  return localStorage.getItem("session") ? true : false
}

export function setAuth(uuid: string) {
  localStorage.setItem("session", uuid)
}

export async function Authenticate() {
  await fetch("/api/auth").then(async (response) => {
    const data = await response.json()
    setAuth(data.session)
    console.log(data.session)
  })
}
