import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200","300","400","500","600","700","800"]
})

export const Logo = () => {
    return(
        <Link href={"/"}>
            <div className="pl-5 sm:pl-20 pr-10 sm: flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="p-1 lg:mr-0 shrink-0">
                    <Image
                    src={"/wallet.png"}
                    alt="Gamehub"
                    height={"32"}
                    width={"32"}
                     />
                </div>
                <div className={cn(
                    font.className,
                    )}>
                    <p className="text-lg font-semibold">
                        Crypto Tracker
                    </p>
                    <p className="text-xs text-[#4b8088] hidden sm:block">
                        Know your calculations, realize your profits
                    </p>
                </div>
            </div>
        </Link>
    )
}