<script>
  import { Router, Link, Route } from "svelte-routing";
  import 'toastr/build/toastr.min.css';
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  
</script>


<Router>
  <nav class="nav">
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

