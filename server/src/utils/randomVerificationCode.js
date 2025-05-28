export const codeVerification = () => {
      const code = 100000 + Math.floor(Math.random() * 900000)
      return code
}