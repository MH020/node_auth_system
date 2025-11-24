<script>
    import {fetchPost} from '../../util/fetchUtil.js'
    import { navigate } from "svelte-routing";
    import toastr from 'toastr';

  let email;
  let password;
  let needsVerification = false
  let verificationCode = "";

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


  async function handleVerification(event) {
    event.preventDefault();

    const request = {email,verificationCode}
    const data = await fetchPost("/api/vaify",request);
    
    if (data.status === 200) {
      toastr.success("Account verified",data.message);
      needsVerification = false;
    }
    else {
      toastr.error(data.status, data.message);
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

{#if needsVerification}
    <div style="margin-top:20px; padding:15px; border:1px solid #ccc;">
        <h3>Enter Verification Code</h3>

        <form on:submit={handleVerification}>
            <input 
                type="text" 
                placeholder="Verification code"
                bind:value={verificationCode}
                required
            />
            <button type="submit">Verify Account</button>
        </form>
    </div>
{/if}