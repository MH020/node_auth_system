<script>
    import {fetchPost} from '../../util/fetchUtil.js'
    import { navigate } from "svelte-routing";
    import toastr from 'toastr';

  let email;
  let password;
  let needsVerification = false

  async function handleLogin(event) {
    event.preventDefault(); 

    const body = {email,password}
    console.log(email,password)

    const data = await fetchPost("/api/login",body)
    console.log(data)

    if(data.status === 200){
      toastr.success(data.message)
      navigate("/profile")

    } else if(data.status === 403) {

      toastr.warning(data.status,data.message);
      needsVerification = true;     


    } else {
      toastr.error(data.status,data.message)
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