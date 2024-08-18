import { useContext } from "react";
import InvitationsContext from "../contexts/InvitationsContext";

// Hook pentru a folosi contextul invitațiilor
const useInvitations = () => {
  return useContext(InvitationsContext);
};

export default useInvitations;
