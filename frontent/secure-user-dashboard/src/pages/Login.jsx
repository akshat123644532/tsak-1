import React, { useState } from "react";

function Login() {
  const[data,setData] = useState({
    name: "",
    password: "",
  });

  const FormData = (e)=>{
console.log(e.target.value);
setData({...data,[e.target.name]:e.target.value})
  }
  const HandleSubmit = (e)=>{
  e.preventDefault();
console.log(data);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <form>
          <div>
          <input  onChange={FormData} type="text" placeholder="enter your name"></input>
          </div>
            <div>
          <input type="text" placeholder="enter your password"></input>
          </div>
               <button onSubmit={HandleSubmit}>Login</button>
        </form>
   
      </div>
    </div>
  );
}

export default Login;

