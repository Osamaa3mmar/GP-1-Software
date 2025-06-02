import Sequelize from "sequelize";

export const sequelize = new Sequelize('software_gp1', 'root', '', {
    host: 'localhost',
    dialect:'mysql' 
  });

export const connectDB=()=>{
    // Temporarily using alter instead of force to prevent constraint errors
    sequelize.sync().then(()=>{
        console.log(" connecting to database .");
    }).catch((err)=>{
        console.log(err);
    }); 
}
  