import {Button,TextField,Grid,Paper} from '@material-ui/core';

function Login(params) {
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
          {/* <form method="POST" onSubmit={formHandle}>
            <TextField error label="Username" variant="outlined" name="username"/><br/>
          <TextField label="Password" variant="outlined" type="password" name="password"/><br/>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form> */}
        </div>
      );
}
export default Login;