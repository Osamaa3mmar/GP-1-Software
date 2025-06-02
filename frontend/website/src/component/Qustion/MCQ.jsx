import { Box, Button, FormControl, FormLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Controller } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
export default function MCQ({control,correctName,correct,options,setValue,name}) {
    
   const addOption = () => {
  setValue(name, [
    ...options,
    {
      id: Date.now(),
      text: ""  // initialize text
    }
  ]);
};

    const deleteOption=(id)=>{
        let newOptions=options.filter((option)=>{
            if(option.id==correct){
                setValue(correctName,"");
            }
            return option.id!= id;
        })
        
        setValue(name,newOptions);
    }
    const handleChange = (text, index) => {
  const updatedOptions = [...options];
  updatedOptions[index] = {
    ...updatedOptions[index],
    text: text
  };
  setValue(name, updatedOptions);
};

  return (
   <Box sx={{width:"100%"}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Answer Options
        </Typography>
        <FormControl fullWidth>
            <FormLabel sx={{mb:2}}>Correct Answer</FormLabel>
            <Controller
            control={control}
            name={correctName}
             render={({ field }) => (
                        <RadioGroup {...field} row={false} defaultValue={correct}>
                          {options.length>0?
                          options.map((option,index)=>{
                           return <Box
                           sx={{
          display: "flex",
          alignItems: "center",
          gap: 1, 
          mb: 1.6   
        }}
                           key={index}>

                            <Radio value={option.id}/> 
                           <TextField
                            fullWidth
                            autoComplete="off"
                            label={"Option "+(index+1)}
                           size="small"
                            sx={{marginX:"10px"}}
                            value={option.text || ""}
                            onChange={(e)=>handleChange(e.target.value,index)}
                           >

                           </TextField>
                           <Tooltip title={"Delete Option"}>
                           <IconButton onClick={()=>{deleteOption(option.id)}} >
                            <DeleteIcon sx={{color:"red",fontSize:26}}/>
                           </IconButton>
                           </Tooltip>
                           </Box>
                          }):""}
                        </RadioGroup>
                      )}/>
        </FormControl>
        <Button onClick={addOption} startIcon={<AddIcon/>}  variant="outlined">
        ADD OPTION
        </Button>
    </Box>
  )
}
