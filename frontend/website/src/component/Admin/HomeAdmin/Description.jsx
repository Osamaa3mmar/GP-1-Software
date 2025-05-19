import { Tooltip } from '@mui/material';
import style from './profile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";
import DescriptionForm from './froms/DescriptionForm';

export default function Description({edit,description,setContent,setTitle,setModal,setOrg}) {
  const openDescriptionForm=()=>{
    setContent(<DescriptionForm setOrg={setOrg} setModal={setModal} description={description}/>);
    setTitle("Edit Organaization Description");
    setModal(true);
  }
  return (
    <motion.div
    initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ amount:0.5}}>
    <div className={style.descriptionCont}>
        <div className={style.descTitle}>
      <h4 style={{fontSize:"28px",fontWeight:"500"}}>Description</h4>
        {edit?

      <Tooltip title="Edit Acadimy Description">
        <EditIcon onClick={openDescriptionForm} sx={{fontSize:40}} color='secondary'  className={style.editIcon3}/>
        </Tooltip>:''}
      </div>
        <div>
            <p style={{marginTop:"20px",fontSize:"18px",fontWeight:"400"}}>
              {description}
              </p>
        </div>
    </div>
    </motion.div>
  )
}
