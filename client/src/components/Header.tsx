import logo from "../assets/logo.jpeg"
export function Header() {
  
  return (
    <>
    <div className="bg-accent overflow-x-hidden">
      <div className="justify-around relative items-center flex text-white animate-marquee-reverse"> 
        <div>Click on the profile icon to view your past orders.</div>
        <div>💥 Enjoy up to 50% OFF on your favorite collections!</div>
        <div>
          View your cart anytime by clicking the cart icon.
          </div>
      </div>
    </div>
    
    <div className="flex justify-center h-20 border-2">
       <img src={logo} className="object-contain"/>
    </div>

     {}
    </>
  );
}
