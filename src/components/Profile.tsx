import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Avatar,Card,CardActionArea, CardContent  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any | null>(null);
  const [flagUrl, setFlagUrl] = useState<string | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?seed=${userId}`);
        setUser(response.data.results[0]);
        fetchFlag(response.data.results[0].nat);
        fetchMap(response.data.results[0].location.coordinates);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const fetchFlag = async (countryCode: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      setFlagUrl(response.data.flags.svg);
    } catch (error) {
      console.error('Error fetching flag:', error);
    }
  };

  const fetchMap = async (coordinates: { latitude: string; longitude: string }) => {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=15`;
    setMapUrl(mapUrl);
  };

  if (!user) {
    return <div><CircularProgress/></div>;
  }

  return (
    <Grid container justifyContent="start" sx={{marginTop: "20px", marginLeft:"20px"}} alignItems="start" style={{ minHeight: '100vh' }}>
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
    <Avatar alt={`${user.name.first} ${user.name.last}`} src={user.picture.large} sx={{ width: 120, height: 120, margin: '0 auto 20px auto' }} />

      <CardContent>
      <Typography align='center' gutterBottom>{`${user.name.first} ${user.name.last}`}</Typography>
        <Typography sx={{fontSize: "12px"}} gutterBottom><span style={{fontWeight:"bold", color:"#000", marginRight:"2px"}}>Email:</span>{user.email}</Typography>
          <Typography sx={{fontSize: "12px"}} gutterBottom><span style={{fontWeight:"bold", color:"#000", marginRight:"2px"}}>Cell:</span> {user.cell}</Typography>
          <Typography sx={{fontSize: "12px"}} gutterBottom><span style={{fontWeight:"bold", color:"#000" , marginRight:"2px"}}>Gender:</span> {user.gender}</Typography>
          <Typography sx={{fontSize: "12px"}} gutterBottom><span style={{fontWeight:"bold", color:"#000", marginRight:"2px"}}>Age:</span> {user.dob.age}</Typography>
          <Typography sx={{fontSize: "12px"}} ><span style={{fontWeight:"bold", color:"#000", marginRight:"2px"}}>Country:</span> {user.location.country}</Typography>
          {flagUrl && (
              <div>
                <Typography variant="body2">Nationality Flag:</Typography>
                <img src={flagUrl} alt="Nationality Flag" style={{ width: '30px', height: '20px' }} />
              </div>
            )}

            {mapUrl && (
              <div>
                <Typography variant="body2">Google Maps:</Typography>
                <iframe src={mapUrl} width="300" height="200" allowFullScreen loading="lazy"></iframe>
              </div>
            )}
      </CardContent>
    </CardActionArea>
  </Card>
    
  </Grid>
  );
};

export default Profile;
