import image from '../../../../../public/os.jpg';
export default function CardImage() {
  return (
    <div style={{width:"100%",height:"250px",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <img src={image} alt="" />
    </div>
  )
}
