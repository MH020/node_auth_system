<script>
  import { Router, Link, Route } from "svelte-routing";
  import 'toastr/build/toastr.min.css';
  import toastr from 'toastr';
    //toastr.error("login failed","login")
    //toastr.info("please make sure the information is correct and that you are a user")



  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
</script>


<Router>
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/login'>login</Link>
    <Link to='/profile'>profile</Link>
  </nav>
  <div>
    <Route path='/'><h1>THE WALL OF GUNS</h1></Route>
    <Route path='/login'><Login /></Route>
    <Route path='/profile'><Profile /></Route>
  </div>
</Router>
