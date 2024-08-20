import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InvitationsModal from "../components/Portal/InvitationsModal/InvitationsModal.jsx";
import { AuthContext } from "./AuthContext.jsx";
import { useBoards } from "../contexts/BoardContext.jsx";
import API_BASE_URL from "../utils/apiConfig.js";

// Creăm contextul
const InvitationsContext = createContext();

// Provider-ul contextului
export const InvitationsProvider = ({ children }) => {
  const [invitations, setInvitations] = useState([]);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const { fetchBoards, boards } = useBoards();

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/invitations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          const invitationsWithTitles = response.data.map((invitation) => ({
            ...invitation,
            boardTitle: invitation.boardId.titleBoard, // Corectat: accesează titleBoard
          }));
          setInvitations(invitationsWithTitles);
          setIsInvitationModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching invitations", error);
      }
    };

    fetchInvitations();
    const interval = setInterval(fetchInvitations, 120000);
    return () => clearInterval(interval);
  }, [token]);

  const handleAccept = async (invitationId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/invitations/accept/${invitationId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Invitation accepted, fetching boards...");
      await fetchBoards(); // Așteptăm actualizarea boardurilor
      console.log("Boards after fetch:", boards);

      setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
      if (invitations.length === 1) {
        setIsInvitationModalOpen(false); // Închide modalul dacă nu mai sunt invitații
      }
    } catch (error) {
      console.error("Error accepting invitation", error);
    }
  };

  const handleDecline = async (invitationId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/invitations/decline/${invitationId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
      if (invitations.length === 1) {
        setIsInvitationModalOpen(false); // Închide modalul dacă nu mai sunt invitații
      }
      await fetchBoards();
    } catch (error) {
      console.error("Error declining invitation", error);
    }
  };

  return (
    <InvitationsContext.Provider value={{ handleAccept, handleDecline }}>
      {children}
      <InvitationsModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
        invitations={invitations}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </InvitationsContext.Provider>
  );
};

InvitationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InvitationsContext;
