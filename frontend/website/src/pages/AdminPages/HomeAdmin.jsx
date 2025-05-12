import { Stack } from "@mui/material"
import Profile from "../../component/Admin/HomeAdmin/Profile"
import Description from "../../component/Admin/HomeAdmin/Description"
import Tabs from "../../component/Admin/HomeAdmin/Tabs"

export default function HomeAdmin() {
  return (
    <Stack>
      <Profile/>
      <Description/>
      <Tabs/>
    </Stack>
  )
}
