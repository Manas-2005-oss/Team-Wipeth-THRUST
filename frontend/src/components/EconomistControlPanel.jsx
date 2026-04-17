import { useState } from "react";

function EconomistControlPanel({ runSimulation }) {

const [policyText, setPolicyText] = useState("");

return (

<div style={{
width:"300px",
background:"#ffffff",
padding:"20px",
borderRight:"1px solid #eee",
height:"100vh"
}}>

<h3 style={{color:"black"}}>Policy Input</h3>

<textarea
placeholder="Enter policy...
Example: Increase income tax by 20%"
value={policyText}
onChange={(e)=>setPolicyText(e.target.value)}
style={{
width:"100%",
height:"120px",
padding:"10px",
border:"1px solid #ccc",
marginTop:"10px"
}}
/>

<button
onClick={()=>runSimulation(policyText)}
style={{
marginTop:"20px",
width:"100%",
padding:"12px",
background:"#2f6fed",
color:"white",
border:"none",
borderRadius:"8px",
fontWeight:"bold"
}}
>
Run Simulation
</button>

</div>

)

}

export default EconomistControlPanel