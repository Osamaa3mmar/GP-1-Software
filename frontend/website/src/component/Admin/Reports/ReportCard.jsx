
export default function ReportCard({title,icon}) {
  return (
    <div style={{gap:"15px",background:"white",borderRadius:"20px",padding:"40px ",boxShadow:"0px 0px 10px rgba(0,0,0,0.2)",flexGrow:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div>
            {icon}
        </div>
        <h2 style={{fontSize:"50px"}}>{title}</h2>
    </div>
  )
}
