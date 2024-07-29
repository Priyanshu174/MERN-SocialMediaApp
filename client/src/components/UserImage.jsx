import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const API_URL = 'https://mern-socialmediaapp.onrender.com' || 'http://localhost:3001';

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${API_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
