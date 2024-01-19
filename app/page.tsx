import { auth } from "@/auth";
import MarketDataTable from "@/components/market-details";
import MyPortfolio from "@/components/my-portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";

export default async function Home() {
  const session = await auth()

  const auditLogs = await db.auditLog.findMany({
    where: {
        userId: session?.user.id
    }
  })
  
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
          <div>
            {auditLogs.map((log) => (
              <div key={log.id} className="flex flex-col gap-2 bg-gray-500 p-4 mt-2 rounded-md w-fit">
                <p>{log.action}</p>
                <p>{log.coinId}</p>
                <p>{log.price}</p>
                <p>{log.quantity}</p>
              </div>
            ))}
            <MyPortfolio />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
