import { useState } from "react"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
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
        setName("")
        setEmail("")
        setPassword("")
        location.href = "/"
      }
    })
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(element) => setName(element.target.value)} placeholder="Username" value={name} required />
          <input type="email" onChange={(element) => setEmail(element.target.value)} placeholder="Email" value={email}  required />
          <input type="password" onChange={(element) => setPassword(element.target.value)} placeholder="Password" value={password}  required />
          <button type="submit">Sign Up</button>
          <div className="alt">
							Already have an account?{" "}
							<a href="/login" className="link">
								Log in
							</a>
						</div>
        </form>
      </div>
    </div>
  )
}

export default Register
