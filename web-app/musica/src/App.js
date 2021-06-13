import './App.css';

function App() {
  function formHandle(event){
    event.preventDefault();
    console.log(event.target);
    const fd = new FormData(event.target);
    let data = {}
    fd.forEach((k,v)=>{
      data[v] = k;
    });
    const reqd = JSON.stringify(data);
    fetch("http://localhost:5000/api/user/login",{
      method:"POST",
      body: reqd,
      credentials: 'include',
      mode:"cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json())
    .then(data => console.log(data));
  }
  return (
    <div>
      <form method="POST" onSubmit={formHandle}>
        <input type="username" name="username"/>
        {/* <input type="email" name="email"/> */}
        <input type="password" name="password"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
