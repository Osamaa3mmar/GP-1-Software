import React, { useContext, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../Context/UserContext';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../../../Context/NotificationsOrgContext';

export default function ImageForm({ setOrg,setModal, background, profile }) {
  const { register, handleSubmit, watch,setValue } = useForm();
  const [backgroundPreview, setBackgroundPreview] = useState(background);
  const [profilePreview, setProfilePreview] = useState(profile);
  const [sendProfile, setSendProfile] = useState(null);
  const [sendBackground, setSendBackground] = useState(null);
    const {setNotificationCount}=useContext(OrgNotificationsContext);

  const [change, setChange] = useState(false);
    const {user}=useContext(UserContext);
    const [loading, setLoading] = useState(false);
 

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundPreview(URL.createObjectURL(file));
      setChange(true);
    //   setValue("background", e.target.files); // Store in react-hook-form
      setSendBackground( e.target.files[0]); // manually set files
    }
  };
  
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      setChange(true);
    //   setValue("profile", e.target.files); // Store in react-hook-form

      setSendProfile( e.target.files[0]); // manually set files
    }
  };
  

 

  const editImages = async (info) => {
    const formData = new FormData();
    
    if (sendProfile) {
        console.log("39")
      formData.append("profile", sendProfile);
      
    }

    if (sendBackground) {
        console.log("44")
        formData.append("background", sendBackground);

    }
    
    try {
        setLoading(true);
      const {data} = await axios.post(`http://localhost:4545/org/edit/images/${user?.orgId}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(data)
      toast.success(data.message);
      await new Promise(resolve => setTimeout(resolve, 100));
      setNotificationCount(prev=>(prev+1));
      setOrg(prev=>({...prev,profile:data.images.profile?data.images.profile:profile,backGroundImage:data.images.background?data.images.background:background}));
      setModal(false);
    } catch (error) {
      console.error("Upload error:", error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(editImages)}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "20px", justifyContent: "space-between" }}>
        
        {/* Background Image Section */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "6px", fontWeight: 500 }}>
            Background Image
          </Typography>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#6366f108",
              width: "100%",
              height: "200px",
              borderRadius: "20px",
              borderColor: "primary.main",
              borderWidth: "1px",
              borderStyle: "dashed"
            }}
          >
            <label htmlFor="background">
              <input
                {...register("background")}
                type="file"
                id="background"
                hidden
                accept="image/*"
                onChange={handleBackgroundChange}
              />
              <img src={backgroundPreview} alt="background" style={{ height: "100%", cursor: "pointer" }} />
            </label>
          </Box>
        </Box>

        {/* Profile Image Section */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "6px", fontWeight: 500 }}>
            Profile Image
          </Typography>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#6366f108",
              width: "100%",
              height: "200px",
              borderRadius: "20px",
              borderColor: "primary.main",
              borderWidth: "1px",
              borderStyle: "dashed"
            }}
          >
            <label htmlFor="profile">
              <input
                {...register("profile")}
                type="file"
                id="profile"
                hidden
                accept="image/*"
                onChange={handleProfileChange}
              />
              <img src={profilePreview} alt="profile" style={{ height: "100%", cursor: "pointer" }} />
            </label>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Button loading={loading} type="submit" variant="contained" >
          Save
        </Button>
      </Box>
    </form>
  );
}
