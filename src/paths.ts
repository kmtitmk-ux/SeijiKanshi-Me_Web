export const paths = {
    home: '/',
    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        resetPassword: '/auth/reset-password'
    },
    dashboard: {
        population: '/dashboard',
        privacy: '/dashboard/privacy',
        "prefectural-assembly": '/dashboard/prefectural-assembly',
        account: '/dashboard/account',
        customers: '/dashboard/customers',
        integrations: '/dashboard/integrations',
        settings: '/dashboard/settings',
    },
    errors: {
        notFound: '/errors/not-found'
    },
} as const;
