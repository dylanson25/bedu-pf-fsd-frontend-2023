import { useLinkClickHandler } from "react-router-dom";
import { Button } from "@mui/material";

const LinkButton = ({ label, color = "inherit", route }) => {
  return (
    <Button color={color} onClick={useLinkClickHandler(route)}>
      {label}
    </Button>
  );
};
export default LinkButton;
