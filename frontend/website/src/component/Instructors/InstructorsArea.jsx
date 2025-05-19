import { Box, Grid } from '@mui/material'
import AcceptedInstractourCard from './AcceptedInstractourCard'

export default function InstructorsArea({getAll,instructors,search}) {
  return (
    <Box 
    sx={{
      marginTop:4
    }}
    >
      <Grid  container  spacing={2}>
      {instructors?.map((item, index) => (
        <Grid item key={index} xs={10} sm={8} md={6} lg={4}>
        <Box key={index} sx={{ mb: 2 }}>
          <AcceptedInstractourCard search={search} getAll={getAll} {...item} index={index} />
        </Box>
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}
