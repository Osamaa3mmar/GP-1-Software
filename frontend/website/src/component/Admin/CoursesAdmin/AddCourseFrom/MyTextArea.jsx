
export default function MyTextArea({text,register,regName}) {
  return (
    <>
        <h3 style={{fontSize:"18px",marginBottom:"6px",fontWeight:"600"}}>
                {text}
          </h3>
                <textarea {...register(regName)} style={{borderWidth:"1px",borderStyle:"solid",borderColor:"#6366f1",outline:"none",borderRadius:"10px",width:"100%",padding:"6px 10px"}} rows={5}></textarea>
    </>
  )
}
