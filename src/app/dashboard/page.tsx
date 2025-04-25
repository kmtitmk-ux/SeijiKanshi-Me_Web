import React from 'react';
import type { Metadata } from 'next';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { List } from '@/components/dashboard/population/list';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';


export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">人口動態の監視</Typography>
                    {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                            Import
                        </Button>
                        <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                            Export
                        </Button>
                    </Stack> */}
                </Stack>
                {/* <div>
                    <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
                        Add
                    </Button>
                </div> */}
            </Stack>
            <List />
        </Stack>
    );
}
