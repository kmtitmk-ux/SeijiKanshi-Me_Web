import React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { List } from '@/components/dashboard/prefectural-assembly/list';
// import Button from '@mui/material/Button';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';

export const metadata = {
    title: `都道府県別議会リスト｜${config.site.name}`,
    description: `全国47都道府県の地方議会を一覧で掲載。各議会の基本情報、議員構成、議案の動向、会議録リンクなどを分かりやすくまとめています。地域政治の見える化にご活用ください。${config.site.name}。`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">都道府県議会の監視</Typography>
                    <Typography variant="subtitle2" gutterBottom>全国47都道府県の地方議会を一覧で掲載。各議会の基本情報、議員構成、議案の動向、会議録リンクなどを分かりやすくまとめています。地域政治の見える化にご活用ください。</Typography>
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
};
