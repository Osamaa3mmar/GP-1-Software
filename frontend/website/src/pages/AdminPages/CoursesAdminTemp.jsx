
import { useParams } from 'react-router-dom'
import CoursesAdmin from './CoursesAdmin'

export default function CoursesAdminTemp() {
    const {id}=useParams();
  return (
    <CoursesAdmin id={id}/>
  )
}
