"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog"
import { LoginForm } from "./login-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { RegisterForm } from "./register-form"
import { ResetForm } from "./reset-form"

interface LoginButtonProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {
    const router = useRouter()
    
    const onClick = () => {
        router.push("/auth/login")
    }

    if(mode === "modal") {
        return(
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <Tabs defaultValue="login">
                        <TabsList>
                            <TabsTrigger value="login">
                                <p>Login</p>
                            </TabsTrigger>
                            <TabsTrigger value="register">
                                <p>Create account</p>
                            </TabsTrigger>
                            <TabsTrigger value="reset">
                                <p className="text-[#2a9ab6]">Reset password</p>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm />
                        </TabsContent>
                        <TabsContent value="reset">
                            <ResetForm />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        )
    }
    
  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  )
}