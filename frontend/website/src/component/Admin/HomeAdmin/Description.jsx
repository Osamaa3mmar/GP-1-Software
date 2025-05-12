import { Tooltip } from '@mui/material';
import style from './profile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";

export default function Description() {
  return (
    <motion.div
    initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ amount:0.5}}>
    <div className={style.descriptionCont}>
        <div className={style.descTitle}>
      <h4 style={{fontSize:"28px",fontWeight:"500"}}>Description</h4>
      <Tooltip title="Edit Acadimy Description">
        <EditIcon sx={{fontSize:40}} color='secondary'  className={style.editIcon3}/>
        </Tooltip>
      </div>
        <div>
            <p style={{marginTop:"20px",fontSize:"18px",fontWeight:"400"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, impedit! Architecto, odio saepe quam esse rem mollitia hic. Reiciendis expedita aperiam, adipisci hic, quisquam nulla, nam in optio temporibus facere id dicta corrupti mollitia quia. Similique atque magnam ut architecto nesciunt consequatur sit exercitationem voluptatem itaque cum tempora assumenda, maiores animi. Fugit saepe quisquam sint deserunt corrupti odit ea assumenda? Id ipsum vel unde vitae culpa eum totam eveniet ullam aut explicabo quisquam, nemo dicta placeat voluptate, eos tempora numquam, iusto repellat accusamus ab. Assumenda in est obcaecati, alias sint aliquid eveniet perspiciatis veritatis quod facere. Voluptas magnam facilis doloribus accusantium omnis enim autem. Unde voluptas excepturi, accusamus eligendi neque ut perspiciatis corrupti animi, quis necessitatibus dignissimos nobis aspernatur doloremque nisi rerum error, omnis beatae ea. Voluptas nemo sit natus culpa asperiores accusantium excepturi a autem quisquam aut ex, suscipit recusandae blanditiis facere vero corrupti hic qui doloribus cupiditate dolor nobis possimus deserunt officia quos. Consectetur dignissimos rem perspiciatis explicabo expedita pariatur provident culpa nobis veniam saepe! Laborum, corrupti dolores sint impedit reprehenderit unde, cumque libero obcaecati laboriosam id doloribus, sed accusantium ea dolorem! Ipsam, odio accusantium nobis temporibus veritatis minus reprehenderit magnam perferendis sit. Excepturi amet voluptatum minima ea?</p>
        </div>
    </div>
    </motion.div>
  )
}
