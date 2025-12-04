import { writable } from 'svelte/store';

export const sidebarOpen = writable(false);
export const theme = writable<'light' | 'dark' | undefined>(undefined);

export function toggleSidebar() {
  sidebarOpen.update((v) => !v);
}

export function closeSidebar() {
  sidebarOpen.set(false);
}

export function openSidebar() {
  sidebarOpen.set(true);
}

export function setTheme(t: 'light' | 'dark') {
  theme.set(t);
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  }
}

export function toggleTheme() {
  theme.update((t) => {
    const next = t === 'light' ? 'dark' : 'light';
    setTheme(next);
    return next;
  });
}
