import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

function useUserContext() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      "You can't consume this context if the component is outside ToDosProvider"
    );
  }

  return context;
}

export default useUserContext;
