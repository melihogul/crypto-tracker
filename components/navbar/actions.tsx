import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { LoginButton } from "../auth/login-button"
import { currentUser } from "@/lib/auth"
import { UserButton } from "../auth/user-button"

export const Actions = async() => {
  const user = await currentUser()
  
  return (
    <div className="flex items-center justify-end gap-x-2">
      <div>
        {!user && (
          <LoginButton mode="modal" asChild>
            <Button
            size={"sm"}
            variant={"ghost"}
            className="hover:bg-[#FBF9F1] text-muted-foreground hover:text-primary"
            >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
            </Button>
          </LoginButton>
        )}
        {user && (
          <UserButton />
        )}
      </div>
    </div>
  )
}