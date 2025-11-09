import logo from "../assets/logo.jpeg"
export function Header() {
  
  return (
    <>
    <div className="bg-accent overflow-x-hidden">
      <div className="justify-around text-lg relative items-center flex text-white animate-marquee-reverse"> 
        <div>🎉 Free shipping worldwide on all orders over $100 </div>
        <div>💥 Up to 50% OFF — across your favorite collections!</div>
        <div>🎁 Every order packed with care — because details matter.</div>
      </div>
    </div>
    
    <div className="flex justify-center h-24">
       <img src={logo} className="object-contain"/>
    </div>

     {}
    </>
  );
}
