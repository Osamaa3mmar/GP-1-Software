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
import { Controller, useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import MyTextArea from "./MyTextArea";
import ImageUploader from "./ImageUploader";
import MyInputField from "./MyInputField";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CourseForm({ close,getCourses }) {
  const {watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [aiLoading,setAiLoading]=useState(false);
  const [loading, setLoading] = useState(false);
  const [cirtificate, setCirtificate] = useState(false);
  const [generated,isGenerated]=useState(false);
  const [urlGenerated,setUrlGenerated] = useState(null);
  const generateAiThump=async()=>{
    try{
      setAiLoading(true);
      const title=watch("title");
      const description=watch("description");
      if(title=='' || description=='' ){
        toast.error("Title And Description Requaierd !");
        return null;

      }else if(generated){
        toast.info("Image Allredy Generated !");
        return null;
      }
      else{
        const {data}=await axios.post("http://localhost:4545/ai/test",{
          desc:description,
          subject:title
        });
        console.log(data);
        isGenerated(true);
        setUrlGenerated(data.result);
        return data.result;
      }
    }catch(error){
      console.log(error);

    }finally{
      setAiLoading(false);
    }
  }
  const clearForm = () => {
    reset();
    toast.info("Form Cleared !", {
      position: "bottom-left",
    });
  };
  const makeCourseApi = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4545/course/create",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      Swal.fire({
        title: data.message,
        icon: "success",
        draggable: true,
      });
      getCourses();
      close();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const makeCourse = async (data) => {
    let tags = {
      category: data.category,
      topics: data.topics,
    };
    delete data.category;
    delete data.topics;
    data.tags = JSON.stringify(tags);
    const formData = new FormData();
    if(generated){
      console.log("line 111");
      formData.append("thumbnail",urlGenerated);
    }
    else{
    formData.append("thumbnail", data.thumbnail[0]);
  console.log("line 115");  
  }
    formData.append("background", data.background[0]);
    delete data.background;
    delete data.thumbnail;
    formData.append("certification", cirtificate ? "true" : "false");
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("isGenerated",generated?"true":"false");
    makeCourseApi(formData);
  };
  const getCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4545/category");
      console.log(data.data);
      let categories=data.data.map((item) => {
        return item.name;
      })
      console.log(categories)
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };
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
  },[])
  return (
    <form
      style={{ height: "80dvh", overflow: "auto" }}
      onSubmit={handleSubmit(makeCourse)}
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
        renderValue={(selected) => selected.join(', ')} // or customize how selected items appear
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
          <ImageUploader
          setStatusGen={isGenerated}
          aiLoading={aiLoading}
            generate={generateAiThump}
            register={register}
            title={"Thumbnail"}
            regName={"thumbnail"}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
          <ImageUploader
            register={register}
            title={"Background"}
            regName={"background"}
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
          onClick={clearForm}
          disabled={loading ? true : false}
          sx={{ minWidth: "100px", background: "#6366F115" }}
        >
          Clear
        </Button>
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          sx={{ minWidth: "100px" }}
        >
          Add
        </Button>
      </Box>
    </form>
  );
}
