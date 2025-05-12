import { Tooltip } from '@mui/material';
import acadimy from '../../../../public/ac.jpg';
import acadimy2 from '../../../../public/ac2.jpg';
import style from "./profile.module.css";
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
    initial={{opacity:0,y:-50}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1,delay:0.2}}>
    <div style={{background:`url(${acadimy})`,backgroundPosition: "center",backgroundSize: "cover",backgroundRepeat: "no-repeat"}} className={style.profileContainer} >
        <div className={style.profile}>
            <img src={acadimy2} alt="" />
        </div>
        <Tooltip title="Edit Back Ground Image">
        <EditIcon sx={{fontSize:40}} color='primary' className={style.editIcon2}/>
        </Tooltip>
        <div className={style.acadimyNameDiv}>
        <h3>Knowledg Acadimy</h3>
        <Tooltip title="Edit Acadimy Name">
        <EditIcon sx={{fontSize:40}} color='secondary'  className={style.editIcon3}/>
        </Tooltip>
        </div>
    </div>
    </motion.div>
  )
}
