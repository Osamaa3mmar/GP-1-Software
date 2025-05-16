import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller, set, useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyTextArea from "../AddCourseFrom/MyTextArea";
import ImageUploader from "../AddCourseFrom/ImageUploader";
import MyInputField from "../AddCourseFrom/MyInputField";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { UserContext } from "../../../../Context/UserContext";
import { OrgNotificationsContext } from "../../../../Context/NotificationsOrgContext";

export default function EditCourseFormForm({close,reload,course}){
   const {user}=useContext(UserContext);
   const {setNotificationCount}=useContext(OrgNotificationsContext);
  const {watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange",
    defaultValues: {
    title: course?.title || "",
    category: course?.tags?.category || [],
    topics: course?.tags?.topics || [],
    size: course?.size || "",
    price: course?.price || "",
    startDate: course?.startDate.slice(0, 10) || "",
    endDate: course?.endDate.slice(0, 10) || "",
    learningPath: course?.learningPath || "",
    learningOutcomes: course?.learningOutcomes || "",
    description: course?.description || "",
  },
   });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cirtificate, setCirtificate] = useState(course?course.certification:false);
  const clearForm = () => {
    reset();
    toast.info("Form Cleared !", {
      position: "bottom-left",
    });
  };
  
  const getCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4545/category");
      let categories=data.data.map((item) => {
        return item.name;
      })
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getTopics = async (category) => {
    try {
      const {data}=await axios.get(`http://localhost:4545/topics/getByCategoryName/${category}`);
      let topics =data.data.map((item) => {
        return item.name;
      })
      setTopics(prev=>[...prev,...topics]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCategory();
    
  },[course])

  const editCourse=async (info) => {
    try{
        setLoading(true);
        info.cirtificate=cirtificate;
        await delay(1000);
        const {data}=await axios.post('http://localhost:4545/course/editall/'+course.id,{editedCourse:info,orgId:user?.orgId},
            {
                headers:{
                    token:localStorage.getItem('token')
                }
            }
        );
        close();
        reload();
        setNotificationCount((prev)=>(prev+1));
        toast.success(info.title+" Course Edited Successfully !")
    }catch(error){
        console.log(error);
    }
    finally{
        
        setLoading(false);
    }

  }






  return (
    <form
      style={{ height: "80dvh", overflow: "auto" }}
      onSubmit={handleSubmit(editCourse)}
    >
      <Grid
        container
        sx={{ padding: "15px 20px", overflow: "auto" }}
        spacing={2}
      >
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <MyInputField
            label={"Title"}
            register={register}
            type={"text"}
            
            errors={errors}
            errorConfig={{ required: "*Title must be provided" }}
            name={"title"}
            icon={<ListAltIcon />}
          />
        </Grid>
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
         <Controller
  name="category"
  control={control}
  defaultValue={[]}
  render={({ field }) => (
    <FormControl fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        {...field}
        labelId="category-label"
        multiple
        value={field.value}
        onChange={(e) => {
          field.onChange(e.target.value);
          getTopics(e.target.value); // Call your function with the selected values
        }}
        renderValue={(selected) => selected?.join(', ')} // or customize how selected items appear
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}
/>
          
        </Grid>
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <Controller
            name="topics"
            control={control}
            defaultValue={[]} // Ensure default value is an array for multiple select
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                id="tags-outlined"
                options={topics}
                filterSelectedOptions
                onChange={(_, newValue) => field.onChange(newValue)} // Update field value on change
                renderInput={(params) => (
                  <TextField {...params} label="Topics" placeholder="Topics" />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <MyInputField
            register={register}
            errors={errors}
            errorConfig={{
              required: "* Size cant be empty !",
              min: { value: 1, message: "* Size must be at least 1 ." },
              max: { value: 999, message: "* Size must be at most 999" },
            }}
            name={"size"}
            type={"number"}
            label={"Size"}
            icon={<GroupsIcon />}
          />
        </Grid>
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <MyInputField
            register={register}
            errors={errors}
            errorConfig={{
              required: "* Price cant be empty !",
              min: { value: 0, message: "* Size must be at least 1 ." },
              max: { value: 9999, message: "* Size must be at most 9999" },
            }}
            name={"price"}
            type={"number"}
            label={"Course Price"}
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
          <FormControlLabel
            control={
              <Switch
                checked={cirtificate}
                onChange={() => setCirtificate(!cirtificate)}
                name="gilad"
              />
            }
            label={
              cirtificate ? "certification include" : "No certification include"
            }
          />
        </Grid>

        <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
          <h3>Start Date:</h3>
          <MyInputField
            label={""}
            register={register}
            type={"date"}
            errors={errors}
            errorConfig={{ required: "* Start date should be selected !" }}
            name={"startDate"}
            icon={null}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
          <h3>End Date:</h3>
          <MyInputField
            label={""}
            register={register}
            type={"date"}
            errors={errors}
            errorConfig={{ required: "* End date should be selected !" }}
            name={"endDate"}
            icon={null}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
          <MyTextArea
            text={"Learning Path"}
            register={register}
            regName="learningPath"
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
          <MyTextArea
            text={"Learning Outcomes"}
            register={register}
            regName="learningOutcomes"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MyTextArea
            text={"Description"}
            register={register}
            regName="description"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "100%",
          padding: "15px 20px",
          gap: "10px",
        }}
      >
       
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          sx={{ minWidth: "100px" }}
        >
          Edit
        </Button>
      </Box>
    </form>
  );
}
