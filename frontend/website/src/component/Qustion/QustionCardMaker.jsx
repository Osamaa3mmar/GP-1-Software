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
  const save = async (formData) => {
    try {
      // Validate required fields
      if (!formData.questionText || formData.questionText.trim() === '') {
        toast.warning("Question text is required");
        return;
      }

      if (!formData.marks || isNaN(parseInt(formData.marks))) {
        toast.warning("Valid marks value is required");
        return;
      }

      // Validate based on question type
      if (formData.type === 'mcq') {
        // For MCQ, validate options and correct answer
        if (!formData.options || !Array.isArray(formData.options) || formData.options.length < 2) {
          toast.warning("Multiple choice questions require at least 2 options");
          return;
        }

        // Check if all options have text
        const invalidOptions = formData.options.filter(opt => !opt.text || opt.text.trim() === '');
        if (invalidOptions.length > 0) {
          toast.warning("All options must have text");
          return;
        }

        if (!formData.correctAnswer) {
          toast.warning("Please select a correct answer");
          return;
        }
      } else if (formData.type === 'true_false') {
        // For true/false questions
        if (!formData.correctAnswer || (formData.correctAnswer !== 'true' && formData.correctAnswer !== 'false')) {
          toast.warning("Please select either True or False as the correct answer");
          return;
        }
      }

      // Prepare question data in the format expected by the backend
      const questionData = {
        id: formData.id || undefined, // Only include if editing existing question
        quizId: 1, // Hardcoded for now
        questionText: formData.questionText.trim(),
        options: formData.type === 'mcq' ? formData.options : [],
        correctAnswer: formData.correctAnswer,
        marks: parseInt(formData.marks),
        explanation: formData.explanation || '',
        type: formData.type
      };

      setLoading(true);
      
      // Log the exact data being sent
      console.log("Sending question data to server:", {
        qustion: questionData
      });
      
      // Make the API call
      const { data } = await axios.post(
        "http://localhost:4545/qustion/save",
        {
          qustion: questionData
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
      
      toast.success("Question saved successfully", {
        position: "bottom-left"
      });
      
      // Reload questions after successful save
      if (reload) {
        reload();
      }
    } catch (error) {
      console.error("Error saving question:", error);
      console.error("Error response:", error.response?.data);
      setError(error);
      
      // Extract and display the error message
      let errorMessage = "Failed to save question. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        position: "bottom-left"
      });
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
    <form onSubmit={handleSubmit(save)} style={{ margin:"auto", width: "650px" }}>
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
