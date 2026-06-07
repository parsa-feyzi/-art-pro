import { loginSchema } from "@/src/features/auth/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

function useLoginForm() {
    return useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
}

export default useLoginForm