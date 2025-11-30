import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signupClient, signinClient, getSession } from "./api";



/* signup */
export function useSignup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: signupClient,
    onSuccess: (data) => {
      qc.setQueryData(["user"], data);
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
    },
  });
}



export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
