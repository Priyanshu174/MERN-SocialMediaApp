import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFriends = async () => {
    const API_URL = 'https://mern-socialmediaapp.onrender.com' || 'http://localhost:3001';

    setLoading(true); // Ensure loading state is true when starting the fetch
    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch friends');

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    getFriends();
  }, [dispatch, token, userId]); // Dependencies to handle changes

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length === 0 ? (
          <Typography color={palette.neutral.medium}>No friends to display</Typography>
        ) : (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
