import React from 'react';
import type { Metadata } from 'next';
import { List } from '@/components/dashboard/prefectural-assembly/prefecture/year/list';
import { config } from '@/config';
// import Grid from '@mui/material/Unstable_Grid2';
import { Typography, /*Breadcrumbs, Link, */Stack } from '@mui/material';
// import { config } from '@/config';
// import { Budget } from '@/components/dashboard/overview/budget';
// import dayjs from 'dayjs';
// import { config } from '@/config';
// import { Budget } from '@/components/dashboard/overview/budget';
// import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
// import { LatestProducts } from '@/components/dashboard/overview/latest-products';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
// import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
// import { TotalProfit } from '@/components/dashboard/overview/total-profit';
// import { Traffic } from '@/components/dashboard/overview/traffic';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
// import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
interface PrefecturalAssemblyPageProps {
    params: {
        prefecture: string;
        year: string;
    };
}
function parseParams({ prefecture, year }: PrefecturalAssemblyPageProps["params"]): {
    year: string;
    prefecture: string;
    city: string;
} {
    // const prefecture = checkId[0];
    const city = "";// checkId.length === 1 ? "" : checkId[1];
    return {
        year: year ?? "",
        prefecture: decodeURIComponent(prefecture) ?? "",
        city: city ?? "",
    };
}
export async function generateMetadata({ params }: PrefecturalAssemblyPageProps): Promise<Metadata> {
    const { prefecture } = parseParams(params);
    return {
        title: `${prefecture} 議案データ可視化 | ${config.site.name}`,
        description: `${prefecture}の全議案をカテゴリ別に分類し、件数をグラフで比較。各議案の名称と公式リンクも一覧で確認できます。分野ごとの議会活動の傾向が一目でわかるページです。${config.site.name}。`,
        // openGraph: {
        //     title: post.title,
        //     description: post.summary,
        //     url: `https://your-site.com/blog/${slug}`,
        //     images: [
        //         { url: post.ogImage },
        //     ],
        // },
    };
}

export default function Page({ params }: PrefecturalAssemblyPageProps): React.JSX.Element {
    const { year, prefecture, city } = parseParams(params);
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">{prefecture}の監視（{year}年の議案一覧）</Typography>
                    <Typography variant="subtitle2" gutterBottom>{prefecture}の{year}年に提出された議案をカテゴリ別に分類し、件数をグラフで比較。各議案の名称と公式リンクも一覧で確認できます。分野ごとの議会活動の傾向が一目でわかるページです。</Typography>
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
            <List year={year} prefecture={prefecture} city={city} />
        </Stack >
    );
};
