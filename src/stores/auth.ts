import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { apiEndpoints } from '@/commons/globals'
import { type Role, toRole } from '@/commons/utils'

/**
 * Store to manage the authentication of the user.
 */
export const useAuthStore = defineStore('auth', () => {
  /** The url to which redirect the client after a successful login. */
  const returnUrl = '/sources'
  /** The user JWT access token or null if not logged. */
  const accessToken = ref(sessionStorage.getItem('accessToken'))
  /** The username of the logged user or null if not logged. */
  const user = ref(sessionStorage.getItem('username'))
  /** The role of the logged user or null if not logged. */
  const userRole = ref(toRole(sessionStorage.getItem('role')))
  /** True if the user is logged, false otherwise. */
  const isLogged = computed(() => accessToken.value !== null)

  /** Attempts to log in the user with the given credentials, throwing an exception if the request fails. */
  async function login(role: Role, username: string, password: string) {
    const url = `${apiEndpoints.AUTH_SERVER}/auth/login`
    const response = await axios.post(url, { email: username, password: password })
    setUser(username)
    setUserRole(role)
    setAccessToken(response.data.data.accessToken)
    setRefreshToken(response.data.data.refreshToken)
    await router.push(returnUrl)
  }

  /**
   * Registers a new user with the given credentials.
   * @param username the username of the new user
   * @param password the password of the new user
   * @param firstName the first name of the new user
   * @param secondName the second name of the new user
   */
  async function register(
    username: string,
    password: string,
    firstName: string,
    secondName: string,
  ): Promise<{
    success: boolean
    msg: string
  }> {
    const urlCreation = `${apiEndpoints.API_SERVER}/users`
    const responseResult = await axios.post(urlCreation, {
      email: username,
      password: password,
      firstName: firstName,
      secondName: secondName,
      role: 'user',
    })

    if (responseResult.status !== 201) {
      return { success: false, msg: 'Error during registration' }
    }
    return { success: true, msg: 'Registration successful' }
  }

  /** Refreshes the access token of the user. */
  async function refreshAccessToken() {
    console.debug('Refreshing access token...')
    const url = `${apiEndpoints.AUTH_SERVER}/auth/refresh`
    const response = await axios.post(url, {
      email: sessionStorage.getItem('username'),
      refreshToken: sessionStorage.getItem('refreshToken'),
    })
    setAccessToken(response.data.data.accessToken)
    setRefreshToken(response.data.data.refreshToken)
  }

  /** Logout the user. */
  async function logout() {
    accessToken.value = null
    user.value = null
    userRole.value = null
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('role')
    console.debug('Logged out!')
    // router.push('/login') does not interrupt the execution of the request that triggered the logout
    // causing the caller to not be redirected to the login page.
    window.location.href = '/login'
  }

  /**
   * Sets the access token of the user.
   * @param token the access token to set
   */
  function setAccessToken(token: string) {
    accessToken.value = token
    sessionStorage.setItem('accessToken', token)
    console.debug(
      `Expiration access token: ${new Date(1000 * JSON.parse(atob(token.split('.')[1])).exp)}`,
    )
  }

  /**
   * Sets the refresh token of the user.
   * @param token the refresh token to set
   */
  function setRefreshToken(token: string) {
    sessionStorage.setItem('refreshToken', token)
    console.debug(
      `Expiration refresh token: ${new Date(1000 * JSON.parse(atob(token.split('.')[1])).exp)}`,
    )
  }

  /**
   * Sets the user of the store.
   * @param username the username to set
   */
  function setUser(username: string) {
    user.value = username
    sessionStorage.setItem('username', username)
  }

  /**
   * Sets the role of the user.
   * @param role the role to set
   */
  function setUserRole(role: Role) {
    userRole.value = role
    sessionStorage.setItem('role', role)
  }

  return {
    returnUrl,
    accessToken,
    user,
    userRole,
    register,
    login,
    logout,
    isLogged,
    refreshAccessToken,
  }
})
