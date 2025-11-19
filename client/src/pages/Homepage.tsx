import { Banner } from "@/components/Banner";
import { Header } from "@/components/Header";
import { FilterColumn } from "@/components/filtercol";
import Market from "@/components/market";

export function Homepage() {
  return (
    <>
     
        <Header />
        <Banner />
        <div className="flex border w-full px-30 py-10 gap-10">
          <FilterColumn />
          <Market />
        </div>
     
    </>
  );
}
