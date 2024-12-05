import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/Christopher Columbus.svg"
            alt="Next Logo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Christopher Columbus
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/Vasco da Gama.svg"
            alt="Next Logo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Vasco da Gama 
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/Ferdinand Magellan.svg"
            alt="Next Logo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Ferdinand Magellan
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/Amerigo Vespucci.svg"
            alt="Next Logo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Amerigo Vespucci
        </Button>
      </div>
    </footer>
  );
};