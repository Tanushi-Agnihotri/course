import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    role: string;
}

interface AppState {
    user: User | null;
    isSidebarOpen: boolean;
    setUser: (user: User | null) => void;
    toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    isSidebarOpen: false,
    setUser: (user) => set({ user }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
