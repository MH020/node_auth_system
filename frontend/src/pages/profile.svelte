<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  onMount(() => {
    fetch('/users/id')
      .then(res => {
        if (res.status !== 200) {
          navigate('/login');
        } else {
          
        }
      });
  });
</script>