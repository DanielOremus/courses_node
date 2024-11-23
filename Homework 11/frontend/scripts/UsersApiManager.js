class UsersApiManager {
  static async getUsers() {
    return RequestManager.fetchData("/users")
  }
  static async addUser(formEl) {
    return RequestManager.putOrPostFormRequest(
      "POST",
      "/users/register",
      formEl,
      "./list.html"
    )
  }
  static async getUserById(id) {
    return RequestManager.fetchData(`/users/${id}`, true)
  }
  static async editUser(id, formEl) {
    return RequestManager.putOrPostFormRequest(
      "PUT",
      `/users/register/${id}`,
      formEl,
      "./list.html"
    )
  }
  static async deleteUser(id) {
    return RequestManager.deleteRequest("/users", id)
  }
}
