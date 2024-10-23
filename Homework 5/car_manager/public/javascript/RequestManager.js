class RequestManager {
  static async deleteRequest(route, body) {
    const response = await fetch(route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    window.location.reload()
    return data
  }
  static async postRequest(route, body) {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  }
}
