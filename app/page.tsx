import { auth } from "@/auth";
import MarketDataTable from "@/components/market-details";
import Assets from "@/components/portfolio/assets";
import ViewTransActions from "@/components/portfolio/view-transactions";
import { TestComp } from "@/components/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuditLogs } from "@/lib/get-audit-logs";

export default async function Home() {
  const session = await auth()

  const auditLogs = await getAuditLogs(session?.user.id)

  return (
    <main className="container mx-auto">
      <TestComp />
      <Tabs defaultValue={session ? "myPortfolio" : "marketDetails"}>
        <TabsList className="px-2">
          <TabsTrigger value="marketDetails">Market Details</TabsTrigger>
          <TabsTrigger value="myPortfolio" disabled={!session}>My Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="marketDetails">
          <MarketDataTable />
        </TabsContent>
        <TabsContent value="myPortfolio">
          <div>
            <Assets data={auditLogs}/>
            <ViewTransActions data={auditLogs} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
