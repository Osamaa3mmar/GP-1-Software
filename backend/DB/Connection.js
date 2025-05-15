import Sequelize from "sequelize";

export const sequelize = new Sequelize('software_gp1', 'root', '', {
    host: 'localhost',
    dialect:'mysql' 
  });

export const connectDB=()=>{
    sequelize.sync({force:true}).then(()=>{
        console.log(" connecting to database .");
    }).catch((err)=>{
        console.log(err);
    }); 
}

  