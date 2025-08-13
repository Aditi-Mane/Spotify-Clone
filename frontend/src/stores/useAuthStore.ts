import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	admin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	admin: false,
	isLoading: false,
	error: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ admin: response.data.admin });
		} catch (error: any) {
			set({ admin: false, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ admin: false, isLoading: false, error: null });
	},
}));