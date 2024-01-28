import { useCurrentUser } from "@/hooks/use-current-user"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import { Button } from "../ui/button"
import { Info, Plus } from "lucide-react"
import { AddPortfolio } from "./add-portfolio"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import CoinInfo from "./coin-info"
import { MarketDataType } from "@/types"

interface MarketDetailsItemProps {
    coin: MarketDataType
}

export const MarketDetailsItem = ({coin}: MarketDetailsItemProps) => {
    const user = useCurrentUser()
    
  return (
    <>
        {user && (
          <Drawer>
            <DrawerTrigger className="hover:bg-emerald-200 ml-0 lg:ml-5 mr-2" asChild>
              <Button variant={"link"} className="h-8 w-8 p-0">
                <Plus className="h-4 w-4"/>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <AddPortfolio data={coin} />
            </DrawerContent>
          </Drawer>
        )}
    
        <Dialog>
          <DialogTrigger className="hover:bg-gray-200" asChild>
            <Button variant={"link"} className="h-8 w-8 p-0">
              <Info className="h-4 w-4"/>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CoinInfo data={coin} />
          </DialogContent>
        </Dialog>
    </>
  )
}