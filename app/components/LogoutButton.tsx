'use client'

import { useState } from "react";
import { logoutAction } from "../admin/actions";


export default function LogoutButton() {
    const [isPending, setIsPending] = useState(false);

    async function handleLogout() {
        setIsPending(true)
        await logoutAction()
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                { isPending ? (
                    <>
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></span>
                        خروج...
                    </>
                    ) : (
                    <>
                        <span>خروج</span>
                        <span>→</span>
                    </>
                    )
                }
        </button>
    )
}