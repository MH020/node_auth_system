<script>
    import {fetchPost} from '../../util/fetchUtil.js'
    import { navigate } from "svelte-routing";
      import toastr from 'toastr';

  let email;
  let password;
  let message;

  async function handleLogin(event) {
    event.preventDefault(); 

    const body = {email,password}
    console.log(email,password)

    const data = await fetchPost("/login",body)
    console.log(data)

    if(data.status === 200){
        navigate("/profile")
    } else {
        toastr.error("login failed","login")
        toastr.info("please make sure the information is correct and that you are a user")
    }
  }
</script>

<h1>login Page</h1>
<form on:submit={handleLogin}>
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required />
  </div>

  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required />
  </div>

  <button type="submit">Login</button>
</form>