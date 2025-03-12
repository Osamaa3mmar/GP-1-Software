import { useState } from "react"
import SignupForm from "../../component/signup/SignupForm";

export default function SignUp() {
  const [position,setPsition]=useState(1);
  return (
    <div className=" w-[100d%] h-[100dvh] bg-[#f3f3f3] flex  items-center justify-center">
       <div className=" flex shadow-lg rounded-[10px] overflow-hidden flex-col bg-white w-[450px]">
        <div className="slides flex w-[100%]">
        <div className="scene1 w-[5500px] shrink-0 "><SignupForm pos={setPsition}/></div>
        <div className="scene2 w-[5500px] shrink-0 bg-amber-200">scene2</div>
        <div className="scene3 w-[5500px] shrink-0 bg-amber-200">scene3</div>
        </div>
        <div className="pagination flex items-center justify-center gap-[15px] pb-[20px]">
        <div className={`dot w-[15px] h-[15px] rounded-[50%] ${position>=1?"bg-blue-500 outline-solid outline-blue-300 outline-3": null} hover:cursor-pointer duration-500`}></div>
        <div className={`dot w-[15px] h-[15px] rounded-[50%] ${position>=2?"bg-blue-500 outline-solid outline-blue-300 outline-3": "  outline-solid outline-[#00000033] outline-3 "} hover:cursor-pointer duration-500`}></div>
        <div className={`dot w-[15px] h-[15px] rounded-[50%] ${position>=3?"bg-blue-500 outline-solid outline-blue-300 outline-3": "  outline-solid outline-[#00000033] outline-3 "} hover:cursor-pointer duration-500`}></div>
       </div>
       </div>
    </div>
  )
}
