import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    location.href = "/login"
  }

  useEffect(() => {
    if(!localStorage.getItem("user")) {
      location.href = "/login"
    }else{
      setUser(JSON.parse(localStorage.getItem("user")))
    }

    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        const key = Object.keys(data.error);
        const errorMsg = data.error[key][0];
        alert(errorMsg);
      }else{
        setUsers(data)
      }
    })
  }, [])
  return (
    <div className="container">
      <div className="home-container">
        <h2>Welcome to the Home Page!</h2>
        <p>This is the content of the home page.</p>
        <h3>All users</h3>
        <ul>
          {
            users.map(user => <li>{user}</li>)
          }
        </ul>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Home
