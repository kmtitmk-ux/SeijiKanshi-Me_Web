import React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import { Detail } from '@/components/dashboard/population/detail';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import { config } from '@/config';
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
interface PopulationPageProps {
    params: {
        id: string;
        year: string;
        age: string;
    };
}
// PopulationPageProps['params']
function parseParams({ id, year, age }: PopulationPageProps["params"]): {
    year: string;
    prefecture: string;
    city: string;
    age: string;
} {
    const checkId = decodeURIComponent(id).split('+');
    const prefecture = checkId[0];
    const city = checkId.length === 1 ? "" : checkId[1];
    return {
        year: year ?? "",
        prefecture: prefecture ?? "",
        city: city ?? "",
        age: age ?? ""
    };
}
export async function generateMetadata({ params }: PopulationPageProps): Promise<Metadata> {
    const { year, prefecture, city, age } = parseParams(params);
    return {
        title: `${year}年 ${prefecture}${city} ${age.replace("-", "～")}歳の人口動態を監視・分析 | ${config.site.name}`,
        description: `${year}年 ${prefecture}${city} ${age.replace("-", "～")}歳の人口動態データを確認。年齢構成や男女比、更新日などの統計情報を簡単にチェックできます。${config.site.name}。`,
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

export default function Page({ params }: PopulationPageProps): React.JSX.Element {
    const { year, prefecture, city, age } = parseParams(params);
    return (
        <Grid container spacing={3}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/dashboard">人口動態</Link>
                {city ? <Link underline="hover" color="inherit" href={`/dashboard/population/${year}/${prefecture}`}>{prefecture}</Link> :
                    age ? <Link underline="hover" color="inherit" href={`/dashboard/population/${year}/${prefecture}`}>{prefecture}</Link> :
                        <Typography sx={{ color: 'text.primary' }}>{prefecture}</Typography>}
                {city ? <Link underline="hover" color="inherit" href={`/dashboard/population/${year}/${prefecture}+${city}`}>{city}</Link> : ""}
                <Typography sx={{ color: 'text.primary' }}>{age.replace("-", "～")}歳</Typography>
            </Breadcrumbs>
            <Detail year={year} prefecture={prefecture} city={city} age={age} />
            {/* <Grid lg={3} sm={6} xs={12}>
                <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <TasksProgress sx={{ height: '100%' }} value={75.5} />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <TotalProfit sx={{ height: '100%' }} value="$15k" />
            </Grid> */}
        </Grid>
    );
}
