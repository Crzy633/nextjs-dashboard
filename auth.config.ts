import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log("authorized~~~");
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            console.log("isLoggedIn", isLoggedIn, "isOnDashboard", isOnDashboard);
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: 'ZS1dHrruKGlKJj5c5Ag3tRzlT0LZZBGTmIbKP1pSYBg=',
} satisfies NextAuthConfig;