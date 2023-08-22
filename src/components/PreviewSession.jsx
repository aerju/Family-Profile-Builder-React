import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PreviewSection = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log('this is working');
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (Object.keys(userData).length !== 0) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Preview Section
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Personal Information:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${userData?.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${userData?.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Phone Number: ${userData?.phoneNumber}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Date of Birth: ${userData?.dob}`} />
            </ListItem>
          </List>
          <Typography variant="subtitle1" gutterBottom>
            Family Members:
          </Typography>
          <List>
              {userData.members.map((member, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Member Name: ${member?.membername}`}
                    secondary={`Member Age: ${member?.memberage}`}
                  />
                </ListItem>
              ))}
            </List>
        </Paper>
      </Container>
    );
  }
};

export default PreviewSection;
