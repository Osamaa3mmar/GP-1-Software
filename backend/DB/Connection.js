import Sequelize from "sequelize";

export const sequelize = new Sequelize('software_gp1', 'root', '12112228', {
    host: 'localhost',
    dialect:'mysql' 
  });

export const connectDB=()=>{
    sequelize.sync().then(()=>{
        console.log(" connecting to database .");
    }).catch((err)=>{
        console.log(err);
    });
}

  