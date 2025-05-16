class userServices {
      constructor() {
            this.baseUrl = "http://localhost:3000"
      }

      async request(url, method, body) {
            // head
            const headers = {
                  'Content-Type': "application/json",
                  "Accept": "application/json"
            }

            // get token
            const token = localStorage.getItem("token")
            if (token) {
                  headers["Authorization"] = `Bearer ${token}`
            }
            const options = { method, headers }

            // body
            if (body) {
                  options["body"] = JSON.stringify(body)
            }

            // send
            try {
                  const response = await fetch(url, options)
                  if (!response.ok) {
                        throw new Error('Xatolik yuz berdi')
                  }

                  return await response.json()
            } catch (error) {
                  console.log(error);
            }
      }

      async sendSiginEmail(data) {
            return this.request(`${this.baseUrl}/user/auth/sigin`, "POST", data)
      }

      async checkCodeInEmail(data) {
            return this.request(`${this.baseUrl}/user/auth/sigin/code`, "POST", data)
      }

      async siginUser(data) {
            return this.request(`${this.baseUrl}/user/auth/sigin/password`, "POST", data)
      }
      async isExistedEmail(data) {
            return this.request(`${this.baseUrl}/user/auth/check/email`, "POST", data)
      }

      async loginEmail(data) {
            return this.request(`${this.baseUrl}/user/auth/login`, "POST", data)
      }

      async loginPassword(data) {
            return this.request(`${this.baseUrl}/user/auth/login/password`, "POST", data)
      }

      async resetPassword(email) {
            return this.request(`${this.baseUrl}/user/reset/${email}`, "GET")
      }

      async resetCode(data) {
            return this.request(`${this.baseUrl}/user/reset/check`, "POST", data)
      }

      async newPassword(data) {
            return this.request(`${this.baseUrl}/user/reset/password`, "POST", data)
      }

      async usersProfile(id) {
            return this.request(`${this.baseUrl}/profile/show/${id}`, "GET")
      }
}


const userService = new userServices()

export default userService