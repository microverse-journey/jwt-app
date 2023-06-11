import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then((res) => res.json())
    .then((data) => {
      if(data.error) {
        const key = Object.keys(data.error);
        const errorMsg = data.error[key][0];
        alert(errorMsg);
      }else{
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", JSON.stringify(data.token))
        setEmail("")
        setPassword("")
        location.href = "/"
      }
    })
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" onChange={(element) => setEmail(element.target.value)} placeholder="Email" value={email}  required />
          <input type="password" onChange={(element) => setPassword(element.target.value)} placeholder="Password" value={password}  required />
          <button type="submit">Login</button>
          <div className="alt">
							Don't have an account?{" "}
							<a href="/register" className="link">
								Sign up
							</a>
						</div>
        </form>
      </div>
    </div>
  )
}

export default Login
