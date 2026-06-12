"use server"

import { cookies } from "next/headers";

export async function logoutAction() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("token");
        return { ok: true, message: "user logout successfully" }
    } catch (error) {
        return { ok: false, message: error }
    }
}