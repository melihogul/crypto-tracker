import { Actions } from "./actions"
import { Logo } from "./logo"

export const Navbar = () => {
  return (
    <main className="flex items-center justify-center px-8 mb-8">
      <nav className="flex top-0 mt-4 items-center justify-between center pr-6 w-full max-w-[1335px] rounded-2xl h-20 z-[49] bg-[#E5E1DA] shadow-lg">
        <Logo />
        <Actions />
      </nav>
    </main>
  )
}