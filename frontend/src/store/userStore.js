import { writable } from 'svelte/store';

export let user = writable({ username: '', email: '', role: '' });
export const loading = writable(true);
