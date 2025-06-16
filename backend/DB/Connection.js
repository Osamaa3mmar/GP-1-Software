import Sequelize from "sequelize";

export const sequelize = new Sequelize('software_gp1', 'root', '12112228', {
    host: 'localhost',
    dialect:'mysql' ,
    logging: (msg) => {
    if (msg.toLowerCase().includes("error")) {
      console.error(msg);
    }
  },
  });

export const connectDB=()=>{
    // Temporarily using alter instead of force to prevent constraint errors
    sequelize.sync().then(()=>{
        console.log(" connecting to database .");
    }).catch((err)=>{
        console.log(err);
    }); 
}
  