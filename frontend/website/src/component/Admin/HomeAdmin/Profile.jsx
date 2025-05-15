import { Tooltip } from '@mui/material';
import acadimy from '../../../../public/ac.jpg';
import acadimy2 from '../../../../public/ac2.jpg';
import style from "./profile.module.css";
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";
import ImageForm from './froms/ImageForm';
import NameForm from './froms/NameForm';

export default function Profile({edit,setOrg,save,setContent,name,profile,background,setTitle,setModal}) {
  const openImageForm=()=>{
    setContent(<ImageForm setOrg={setOrg} setModal={setModal} background={background} profile={profile}/>);
    setTitle("Edit Organaization Images");
    setModal(true);
  }
  const openNameForm=()=>{
    setContent(<NameForm setModal={setModal} setOrg={setOrg} save={save} name={name}/>);
    setTitle("Edit Organaization Name");
    setModal(true);
  }
  return (
    <motion.div
    initial={{opacity:0,y:-50}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1,delay:0.2}}>
    <div style={{background:`url(${background})`,backgroundPosition: "center",backgroundSize: "cover",backgroundRepeat: "no-repeat"}} className={style.profileContainer} >
        <div className={style.profile}>
            <img src={profile} alt="" />
        </div>
        {edit?
        <Tooltip title="Edit Back Ground Image">
        <EditIcon onClick={openImageForm} sx={{fontSize:40}} color='primary' className={style.editIcon2}/>
        </Tooltip>
        :''}
        
        <div className={style.acadimyNameDiv}>
        <h3>{name}</h3>
        {edit?

        <Tooltip title="Edit Acadimy Name">
        <EditIcon onClick={openNameForm} sx={{fontSize:40}} color='secondary'  className={style.editIcon3}/>
        </Tooltip>:''}
        </div>
    </div>
    </motion.div>
  )
}
