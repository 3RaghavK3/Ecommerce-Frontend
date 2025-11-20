import logo from "../assets/logo.jpeg";
export function Header() {
  return (
    <>
      <div className="bg-accent text-sm md:text-base w-full overflow-x-hidden">
        <div className="relative items-center text-white flex whitespace-nowrap p-1 gap-10 md:gap-20 lg:gap-30 animate-marquee-reverse w-fit">
          <div>Click on the profile icon to view your past orders.</div>
          <div>💥 Enjoy up to 50% OFF on your favorite collections!</div>
          <div>View your cart anytime by clicking the cart icon.</div>
        </div>
      </div>

      <div className="flex justify-center h-15 md:h-18 lg:h-20 border-2">
        <img src={logo} className="object-contain" />
      </div>

      {}
    </>
  );
}
