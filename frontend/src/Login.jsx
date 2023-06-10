function Login() {
  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
