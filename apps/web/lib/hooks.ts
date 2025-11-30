import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signupClient, signinClient, getSession } from "./api";
import { AxiosInstance } from "@/app/services/auth/AxiosInstance";



/* signup */
export function useSignup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: signupClient,
    onSuccess: (data) => {
      qc.setQueryData(["user"], data);
      qc.invalidateQueries({ queryKey: ["session"] });
    },
  });
}



export function useSignin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: signinClient,
    onSuccess: (data) => {
      // set user in cache if your backend returns user
      qc.setQueryData(["user"], data.user ?? data);
      qc.invalidateQueries({ queryKey: ["session"] });
    },
  });
}



export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await AxiosInstance.get("/courses");
      return data;
    },
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (courseData: any) => {
      const { data } = await AxiosInstance.post("/courses", courseData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await AxiosInstance.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });


}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      const { data } = await AxiosInstance.get(`/courses/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await AxiosInstance.patch(`/courses/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await AxiosInstance.patch("/user/me", data);
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
