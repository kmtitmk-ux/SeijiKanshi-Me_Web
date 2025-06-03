import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
    { key: 'population', title: '人口', href: paths.dashboard.population, icon: 'chart-pie' },
    { key: 'prefectural-assembly', title: '都道府県議会の政策データ', href: paths.dashboard["prefectural-assembly"], icon: 'chart-pie' },
    { key: 'privacy', title: 'プライバシーポリシー', href: paths.dashboard.privacy, icon: 'users' },
    // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
    // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
    // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
    // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
    // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
