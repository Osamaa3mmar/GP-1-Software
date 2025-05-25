import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import TF from "./TF";
import MCQ from "./MCQ";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Delete } from "@mui/icons-material";
export default function QustionCardMaker({
  index,
  reload,
  order,
  id,
  questionText,
  options,
  correctAnswer,
  marks,
  explanation,
  type,
}) {
  const { watch, handleSubmit, control, register, setValue } = useForm({
    defaultValues: {
      id,
      questionText,
      options,
      correctAnswer,
      marks,
      explanation,
      type,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentType = watch("type");
  const correct = watch("correctAnswer");
  const optionsWatch = watch("options");
  const typeOptions = ["mcq", "true_false", "fill_blank"];
  const theme = useTheme();
  const save = async (qustion) => {
    if (!qustion.correctAnswer) {
      toast.info("Chose a correct answer !");
      return;
    }
    try {
      qustion.quizId = 1;
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4545/qustion/save",
        {
          qustion,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      
      toast.success(data.message,{
        position:"bottom-left"
      });
    } catch (error) {
      setError(error);
      toast.error("");
    } finally {
      setLoading(false);
    }
  };
  const deleteQustion = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        "http://localhost:4545/qustion/delete",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            id,
          },
        }
      );
      reload("delete");
      
     
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(save)} style={{ width: "650px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
          border: `4px solid ${theme.palette.primary.main}77`,
          padding: "30px 20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Chip label={`Qustion ${index + 1}`} color="primary" />
          
          <Box>
            <Tooltip title={"Delete Qustion"}>
              <IconButton
                onClick={() => {
                  deleteQustion(id);
                }}
              >
                <Delete sx={{ color: "red", fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            gap: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            label="Marks"
            size="small"
            sx={{ width: "120px" }}
            {...register("marks")}
            required
          ></TextField>

          <FormControl size="small" sx={{ width: "200px" }}>
            <InputLabel id="type-label">Question Type</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="type-label" label="Question Type">
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.replace("_", " ").toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        ></Box>
        <TextField
          multiline
          fullWidth
          rows={4}
          label="Question Text"
          variant="outlined"
          {...register("questionText")}
          required
        ></TextField>
        {currentType == "mcq" ? (
          <MCQ
            options={optionsWatch}
            setValue={setValue}
            name={"options"}
            correct={correct}
            control={control}
            correctName={"correctAnswer"}
          />
        ) : currentType == "true_false" ? (
          <TF control={control} name={"correctAnswer"} />
        ) : (
          <TextField
            fullWidth
            multiline
            rows={3}
            label={"Answer"}
            {...register("correctAnswer")}
          ></TextField>
        )}

        <Divider sx={{ width: "100%", my: 1, borderBottomWidth: 2 }} />
        <TextField
          multiline
          fullWidth
          rows={4}
          label="Explanation (Optional)"
          variant="outlined"
          {...register("explanation")}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          loading={loading}
          startIcon={<SaveIcon />}
        >
          SAVE QUESTION
        </Button>
      </Box>
    </form>
  );
}
