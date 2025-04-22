import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
    {
        id: '1',
        prefecture: '東京都',
        avatar: '/assets/avatar-10.png',
        city: '港区',
        phone: '908-691-3242',
        address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
        updatedAt: dayjs().subtract(2, 'hours').toDate(),
    },
    {
        id: '2',
        prefecture: '東京都',
        avatar: '/assets/avatar-10.png',
        city: '千代田区',
        phone: '908-691-3242',
        address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
        updatedAt: dayjs().subtract(2, 'hours').toDate(),
    },
    // {
    //     id: 'USR-009',
    //     prefecture: 'Marcus Finn',
    //     avatar: '/assets/avatar-9.png',
    //     city: 'marcus.finn@devias.io',
    //     phone: '415-907-2647',
    //     address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    //     updatedAt: dayjs().subtract(2, 'hours').toDate(),
    // },
    // {
    //     id: 'USR-008',
    //     prefecture: 'Jie Yan',
    //     avatar: '/assets/avatar-8.png',
    //     city: 'jie.yan.song@devias.io',
    //     phone: '770-635-2682',
    //     address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    //     updatedAt: dayjs().subtract(2, 'hours').toDate(),
    // },
    // {
    //     id: 'USR-007',
    //     prefecture: 'Nasimiyu Danai',
    //     avatar: '/assets/avatar-7.png',
    //     city: 'nasimiyu.danai@devias.io',
    //     phone: '801-301-7894',
    //     address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    //     updatedAt: dayjs().subtract(2, 'hours').toDate(),
    // },
    // {
    //     id: 'USR-006',
    //     prefecture: 'Iulia Albu',
    //     avatar: '/assets/avatar-6.png',
    //     city: 'iulia.albu@devias.io',
    //     phone: '313-812-8947',
    //     address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    //     updatedAt: dayjs().subtract(2, 'hours').toDate(),
    // },
    // {
    //     id: 'USR-005',
    //     prefecture: 'Fran Perez',
    //     avatar: '/assets/avatar-5.png',
    //     city: 'fran.perez@devias.io',
    //     phone: '712-351-5711',
    //     address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    //     updatedAt: dayjs().subtract(2, 'hours').toDate(),
    // },
] satisfies Customer[];
export default function Page(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 5;

    const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Customers</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                            Import
                        </Button>
                        <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                            Export
                        </Button>
                    </Stack>
                </Stack>
                <div>
                    <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
                        Add
                    </Button>
                </div>
            </Stack>
            <CustomersFilters />
            <CustomersTable
                count={paginatedCustomers.length}
                page={page}
                rows={paginatedCustomers}
                rowsPerPage={rowsPerPage}
            />
        </Stack>
    );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
