import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending, error, } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
          queryClient.invalidateQueries({ queryKey: ["friends"] });
          queryClient.invalidateQueries({ queryKey: ["users"] });
          queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
        }
    });
    return { logoutMutation, isPending, error };
};
export default useLogout;