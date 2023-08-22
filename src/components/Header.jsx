import React from "react";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <div>
      <Typography variant="h4" component="h4" align="center" gutterBottom>
        Family Profile Builder
      </Typography>
      <Typography variant="subtitle1" align="center">
        Create your connections
      </Typography>
    </div>
  );
};

export default Header;
