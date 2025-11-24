<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { fetchGet } from '../../util/fetchUtil';
  import { user, loading } from '../store/userStore';
  import toastr from 'toastr';

  onMount(async () => {
    const response = await fetchGet('/users/id')
    console.log(response)
    if (response.status !== 200) {
      toastr.warning(response.data.status,response.data.message);
      navigate('/login');
    } else {
      user.set(response.data)
      loading.set(false);
    }
  });
</script>

{#if $loading}
  <p>Loading profile</p>
{:else}
  <div class="profile">
    <h1>Profile</h1>
    <p><strong>Username:</strong> {$user.username}</p>
    <p><strong>Email:</strong> {$user.email}</p>
    <p><strong>Role:</strong> {$user.role}</p>
  </div>
{/if}
