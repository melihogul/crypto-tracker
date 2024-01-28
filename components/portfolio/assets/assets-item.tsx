import { FileSearch, Loader2, MoreHorizontal, Plus, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { AddPortfolio } from "@/components/market-details/add-portfolio"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ViewTransActions from "../view-transactions"
import { ElementRef, useRef, useTransition } from "react"
import { deleteManyPortfolio } from "@/actions/delete-many-portfolio"
import { toast } from "sonner"
import { AssetsType } from "@/types"

interface AssetsItemProps {
    data: AssetsType
}

export const AssetsItem = ({data}: AssetsItemProps) => {
    const [isPending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null)
    const onClick = () => {
        startTransition(() => {
          deleteManyPortfolio(data.id)
          .then(() => {
            toast.success("You have successfully removed!")
            closeRef.current?.click()
          })
          .catch(() => toast.error("Something went wrong"))
        })
    }

    const auditLogsData = data.auditLogs.map((item) => item)
  return (
    <div>
          <Drawer>
            <DrawerTrigger asChild className="hover:bg-emerald-200 ml-0 lg:ml-4 mr-2">
              <Button variant={"link"} className="h-8 w-8 p-0">
                <Plus className="h-4 w-4"/>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <AddPortfolio data={data} />
            </DrawerContent>
          </Drawer>

          <Dialog>
          <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:bg-gray-200">
              <Button variant={"link"} className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger>
                <DropdownMenuItem
                className="py-2">
                  <div className="flex justify-center items-center gap-x-1">
                    <FileSearch className="h-4 w-4"/>
                    View Transactions
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem className="py-2" asChild>
              <AlertDialogTrigger className="w-full">
                <div className="flex justify-center items-center text-rose-500 gap-x-1">
                  <Trash className="h-4 w-4"/>
                  <p>Remove</p>
                </div>
              </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DialogContent className="lg:max-w-[50%]">
              <ViewTransActions data={auditLogsData} />
            </DialogContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex justify-center">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="flex justify-center">
                  All transactions associated with this coin will be removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-full" ref={closeRef}>Cancel</AlertDialogCancel>
                <Button
                className="w-full"
                onClick={onClick}
                disabled={isPending}
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
          </AlertDialog>
          </Dialog>
    </div>
  )
}