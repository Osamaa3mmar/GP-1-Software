import image from '../../../../../public/os.jpg';
export default function CardImage({url}) {
  return (
    <div style={{width:"100%",height:"250px",borderRadius:"8px 8px 0px 0px",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <img src={url?url:image} alt="" style={{width: "100%",
      height: "100%",
      objectFit: "cover",}} />
    </div>
  )
}
