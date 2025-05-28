class postsServices {
      constructor() {
            this.baseUrl = "http://localhost:3000"
      }

      async request(url, method, body, isJson = false) {

            const headers = {}

            // const headers = {
            //       "Content-Type": "multipart/form-data"
            // };

            // get token
            const token = localStorage.getItem("token")
            if (token) {
                  headers["Authorization"] = `Bearer ${token}`
            }

            const options = { method, headers }

            // body
            if (isJson && body) {
                  headers["Content-Type"] = "application/json"
                  options["body"] = JSON.stringify(body)
            }
            else if (!isJson && body) {
                  options["body"] = body
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

      async createPost(body) {
            return this.request(`${this.baseUrl}/posts`, "POST", body)
      }

      async getPosts() {
            return this.request(`${this.baseUrl}/posts/all/5`, "GET")
      }

      async like(postId) {
            return this.request(`${this.baseUrl}/posts/like/${postId}`, "GET")
      }

      async comment(body) {
            return this.request(`${this.baseUrl}/posts/comment`, "POST", body, true)
      }

      async getComment(info) {
            return this.request(`${this.baseUrl}/posts/comment/${info?.id}${info?.limit && `/${info.limit}`}`, "GET", null, true)
      }
}

const postService = new postsServices()
export default postService