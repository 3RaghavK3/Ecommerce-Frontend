// import { useEffect } from "react";

// export function cartbuilder(){
    
//     const cart=localStorage.getItem("CART")||"{}"


//     return(
//         <>
//         <div className="w-3/4 flex flex-col bg-red">
//                     <div className="grid grid-cols-5 gap-2 overflow-y-auto border-2 p-4 rounded-xl">
//                         <div className="flex justify-left items-center text-xl font-semibold">Product</div>
//                         <div className="flex justify-left items-center text-xl pl-4 font-semibold">Title</div>
//                         <div className="flex justify-left items-center text-xl font-semibold">Price</div>
//                         <div className="flex justify-left items-center text-xl font-semibold ">Quantity</div>
//                         <div className="flex justify-left items-center text-xl font-semibold ">Subtotal</div>
                    

                       

//                         {cart.map((item,index)=>{
//                             qty+=item.quantity
//                             bill+=item.price*item.quantity
//                             return (<>
//                                 <div className="flex justify-left h-24 w-24 bg-muted rounded-lg border"><img src={item.images[0]||"-"}/></div>
//                                 <div className="flex flex-col justify-center p-4"> 
//                                     <div className="flex justify-left items-center  font-bold text-lg">{item.title||"-"}</div>
//                                     <div className="flex justify-left items-center text-base ">{item.brand||"-"}</div>
//                                 </div>
                            
//                                 <div className="flex justify-left items-center text-2xl font-bold">${item.price||"-"}</div>
//                                 <div className="flex justify-left items-center text-2xl font-bold">{item.quantity||"-"}</div>
//                                 <div className="flex justify-left items-center text-3xl font-bold">${Number(item.price*item.quantity).toFixed(2)||"-"}</div>
//                             </>)
//                         })}
//                     </div>
                
//                     <div className="flex justify-between  items-center mt-4">
                        
//                         <div className="text-left text-xl cursor-pointer bg-accent text-white p-3 rounded-lg" onClick={()=>navigate('/')}>Update Cart</div>
//                         <div className="flex p-3 bg-black rounded-lg text-white">
//                             <div className="text-2xl"> Total:</div>{" "}
//                             <div className="text-2xl font-bold"> ${Number(bill).toFixed(2)}</div>    
//                         </div>
                         
//                     </div>
//             </div>
                
//         </>
//     )
// }