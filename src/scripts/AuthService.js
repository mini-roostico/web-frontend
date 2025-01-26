import Cookies from 'js-cookie'

export const AuthService = {
  login(userData) {
    // TODO handle login
    /* eslint-disable no-unused-vars */
    const { username, _ } = userData
    // TODO send request
    return new Promise((resolve, _) => {
      /* eslint-disable no-unused-vars */
      setTimeout(() => {
        const token = 'fake-token'
        Cookies.set('auth_token', token, { expires: 7 })
        localStorage.setItem('user', JSON.stringify(username))
        resolve({ success: true })
      }, 1000)
    })
  },

  register(_) {
    //const { username, password } = userData
    // TODO send request
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({ success: true })
      })
    })
  },

  logout() {
    Cookies.remove('auth_token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  isAuthenticated() {
    return !!Cookies.get('auth_token')
  },

  async verifyToken() {
    try {
      // TODO
      // const response = await axios.post('/verify-token', {
      //   token: Cookies.get('auth_token')
      // })
      // return response.data.valid
    } catch {
      this.logout()
      return false
    }
  },
}
