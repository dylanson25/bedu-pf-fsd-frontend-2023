import { Box, Typography } from "@mui/material";

const Authorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">Only logged users should see this</Typography>
    </Box>
  );
}

export default Authorized;