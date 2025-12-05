import { writable } from 'svelte/store';

// Main sidebar state
export const sidebarOpen = writable(false);
export const theme = writable<'light' | 'dark' | undefined>(undefined);

// Content sidebar navigation state
export const contentSidebarMode = writable<'main' | 'content'>('main');
export const contentSidebarVisible = writable(false);

export function toggleSidebar() {
  sidebarOpen.update((v) => !v);
}

export function closeSidebar() {
  sidebarOpen.set(false);
}

export function openSidebar() {
  sidebarOpen.set(true);
}

// Content sidebar navigation functions
export function showContentSidebar() {
  contentSidebarVisible.set(true);
}

export function hideContentSidebar() {
  contentSidebarVisible.set(false);
}

export function setContentSidebarMode(mode: 'main' | 'content') {
  contentSidebarMode.set(mode);
}

export function backToMainMenu() {
  contentSidebarMode.set('main');
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
