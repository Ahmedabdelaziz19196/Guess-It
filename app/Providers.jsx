"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function Providers({ children }) {
    return (
        <AppRouterCacheProvider options={{ key: "css" }}>
            {children}
        </AppRouterCacheProvider>
    );
}
