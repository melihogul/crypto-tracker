import { auth } from "@/auth";
import MarketDataTable from "@/components/market-details";
import MyPortfolio from "@/components/my-portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const session = await auth()

  return (
    <main className="container mx-auto">
      <Tabs defaultValue="marketDetails">
        <TabsList className="px-2">
          <TabsTrigger value="marketDetails">Market Details</TabsTrigger>
          <TabsTrigger value="myPortfolio" disabled={!session}>My Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="marketDetails">
          <MarketDataTable />
        </TabsContent>
        <TabsContent value="myPortfolio">
          <MyPortfolio />
        </TabsContent>
      </Tabs>
    </main>
  )
}
