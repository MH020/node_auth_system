<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  onMount(() => {
    fetch('/profile')
      .then(res => {
        if (res.status === 401) {
          navigate('/login');
        }
      });
  });
</script>