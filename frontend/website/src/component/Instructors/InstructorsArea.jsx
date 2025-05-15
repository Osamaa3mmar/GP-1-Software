import { Box } from '@mui/material'
import AcceptedInstractourCard from './AcceptedInstractourCard'

export default function InstructorsArea({getAll,instructors}) {
  return (
    <Box 
    sx={{
      marginTop:4
    }}
    >
      {instructors?.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <AcceptedInstractourCard getAll={getAll} {...item} index={index} />
        </Box>
      ))}
    </Box>
  )
}
