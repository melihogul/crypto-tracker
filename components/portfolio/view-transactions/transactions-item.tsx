import { Loader2, Pencil, Trash } from "lucide-react"
import { deletePortfolio } from "@/actions/delete-portfolio"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ElementRef, useRef, useTransition } from "react"
import { toast } from "sonner"
import { PopoverClose } from "@radix-ui/react-popover"
import { OneAuditLogType } from "@/types"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { EditTransaction } from "./edit-transaction"

interface TransactionsItemProps {
    data: OneAuditLogType
}

export const TransactionsItem = ({data}: TransactionsItemProps) => {
    const [isPending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null)
    
    const onClick = () => {
      startTransition(() => {
        deletePortfolio(data.id)
        .then(() => {
          toast.success("You have successfully deleted!")
          closeRef.current?.click()
        })
        .catch(() => toast.error("Something went wrong"))
    })}
    
  return (
    <div className="flex gap-x-2">
        <Drawer>
          <DrawerTrigger>
              <Pencil className="h-7 w-7 p-[7px] hover:bg-gray-100 rounded-md"/>
          </DrawerTrigger>
          <DrawerContent>
              <EditTransaction data={data} />
          </DrawerContent>
        </Drawer>

        <Popover>
          <PopoverTrigger>
            <Trash className="h-7 w-7 p-[7px] hover:bg-rose-400 rounded-md" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col justify-center items-center w-40 gap-y-2 p-2 ">
            Are you sure?
            <Button onClick={onClick} className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </Button>
            <PopoverClose ref={closeRef} asChild>
              <Button variant={"ghost"} className="w-full">
                Close
              </Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
    </div>
  )
}