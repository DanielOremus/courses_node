class RequestManager {
  static async deleteRequest(url, body, callback) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        callback()
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
