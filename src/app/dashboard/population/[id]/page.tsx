"use client";
import React, { useEffect, useState } from 'react';
// import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';
// import { config } from '@/config';
// import { Test } from '@/components/dashboard/layout/test';
// import { Budget } from '@/components/dashboard/overview/budget';
// import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
// import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
// import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
// import { TotalProfit } from '@/components/dashboard/overview/total-profit';
// import { Traffic } from '@/components/dashboard/overview/traffic';

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
// import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
// import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();
// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;
interface PopulationPageProps {
    params: { id: string; };
}
export default function Page({ params }: PopulationPageProps): React.JSX.Element {
    const { id } = params;
    const checkId = decodeURIComponent(id).split("+");
    const prefecture = checkId[0];
    const city = checkId.length === 1 ? "" : checkId[1];
    const [lineGraphYear, setLineGraphYear] = useState<Record<string, number>>({});
    const [pieChartAge, setPieChartAge] = useState<Record<string, number>>({});
    const [barGraphCity, setBarGraphCity] = useState<Record<string, Record<string, number>>>({});

    async function fetchData(): Promise<void> {
        type SKM01QueryParams = Parameters<
            typeof client.models.SKM01.sKM01sByPrefectureAndCity
        >[0];
        let items: Schema['SKM01']['type'][] = [];
        let nextToken: string | null | undefined = "";
        do {
            const queryParams: SKM01QueryParams = {
                prefecture,
                ...(city ? { city: { eq: city } } : {}),
                ...(nextToken ? { nextToken } : {}),
            };
            const { data/*, errors*/, nextToken: newNextToken } = await client.models.SKM01.sKM01sByPrefectureAndCity(queryParams);
            nextToken = newNextToken;
            items = [...items, ...data];
        } while (nextToken);
        const yearData: Record<string, number> = {};
        const ageData: Record<string, number> = {};
        const cityData: Record<string, Record<string, number>> = {};
        for (const v of items) {
            if (v.point) {
                if (!yearData[v.point]) yearData[v.point] = 0;
                yearData[v.point] += v.population ?? 0;
            }
            if (v.age) {
                if (!ageData[v.age]) ageData[v.age] = 0;
                if (v.point === "2024") ageData[v.age] += v.population ?? 0;
            }
            if (v.city) {
                if (!cityData[v.city]) cityData[v.city] = { "男性": 0, "女性": 0 };
                if (v.sex === "男" && v.point === "2024") cityData[v.city]["男性"] += v.population ?? 0;
                if (v.sex === "女" && v.point === "2024") cityData[v.city]["女性"] += v.population ?? 0;
            }
        }
        if (Object.keys(yearData).length) setLineGraphYear(yearData);
        if (Object.keys(cityData).length) setBarGraphCity(cityData);
        if (Object.keys(ageData).length) setPieChartAge(ageData);
        // const { data: SKM01 } = await client.models.SKM01.list();
        // console.log(SKM01);
    };

    // ファイルのURLを取得
    async function fetchFileUrl(): Promise<void> {
        try {
            const resultս: StorageGetUrlOutput = await getUrl({
                path: 'public/sample.jpg', // S3内のファイルパス
                options: {
                    accessLevel: 'public', // public, protected, private
                },
            });
            console.log(resultս);
            // setFileUrl(result.url.toString());
        } catch (error) {
            console.error('Error fetching file URL:', error);
        }
    };

    // // ファイルの内容を取得
    // const downloadFile = async () => {
    //     try {
    //         const result: any = await downloadData({
    //             path: 'public/sample.txt',
    //             options: {
    //                 accessLevel: 'public',
    //             },
    //         });
    //         // setFileContent(result.body.toString());
    //     } catch (error) {
    //         console.error('Error downloading file:', error);
    //     }
    // };

    useEffect(() => {
        fetchFileUrl();
        // downloadFile();
    }, []);

    useEffect(() => {
        // void fetchData();
    }, []);

    // const { data: SKM01 } = await client.models.SKM01.list();
    // console.log(SKM01);
    return (
        <Grid container spacing={3}>
            {/* <Test /> */}
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
            <Grid lg={12}>
                <TimeSeries sx={{ height: '100%' }} prefecture={prefecture} city={city} lineGraphYear={lineGraphYear} />
            </Grid>
            {!city && (
                <Grid lg={12}>
                    <Sales
                        sx={{ height: '100%' }}
                        barGraphCity={barGraphCity}
                    />
                </Grid>
            )}
            <Grid lg={12}>
                <ByAge sx={{ height: '100%' }} prefecture={prefecture} city={city} pieChartAge={pieChartAge} />
            </Grid>
            {/* <Grid lg={4} md={6} xs={12}>
                <LatestProducts
                    products={[
                        {
                            id: 'PRD-005',
                            name: 'Soja & Co. Eucalyptus',
                            image: '/assets/product-5.png',
                            updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
                        },
                        {
                            id: 'PRD-004',
                            name: 'Necessaire Body Lotion',
                            image: '/assets/product-4.png',
                            updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
                        },
                        {
                            id: 'PRD-003',
                            name: 'Ritual of Sakura',
                            image: '/assets/product-3.png',
                            updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
                        },
                        {
                            id: 'PRD-002',
                            name: 'Lancome Rouge',
                            image: '/assets/product-2.png',
                            updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
                        },
                        {
                            id: 'PRD-001',
                            name: 'Erbology Aloe Vera',
                            image: '/assets/product-1.png',
                            updatedAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                    ]}
                    sx={{ height: '100%' }}
                />
            </Grid>
            <Grid lg={8} md={12} xs={12}>
                <LatestOrders
                    orders={[
                        {
                            id: 'ORD-007',
                            customer: { name: 'Ekaterina Tankova' },
                            amount: 30.5,
                            status: 'pending',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                        {
                            id: 'ORD-006',
                            customer: { name: 'Cao Yu' },
                            amount: 25.1,
                            status: 'delivered',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                        {
                            id: 'ORD-004',
                            customer: { name: 'Alexa Richardson' },
                            amount: 10.99,
                            status: 'refunded',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                        {
                            id: 'ORD-003',
                            customer: { name: 'Anje Keizer' },
                            amount: 96.43,
                            status: 'pending',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                        {
                            id: 'ORD-002',
                            customer: { name: 'Clarke Gillebert' },
                            amount: 32.54,
                            status: 'delivered',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                        {
                            id: 'ORD-001',
                            customer: { name: 'Adam Denisov' },
                            amount: 16.76,
                            status: 'delivered',
                            createdAt: dayjs().subtract(10, 'minutes').toDate(),
                        },
                    ]}
                    sx={{ height: '100%' }}
                />
            </Grid> */}
        </Grid>
    );
}


interface TimeSeriesProps {
    sx?: SxProps;
    prefecture: string;
    city: string;
    lineGraphYear: Record<string, number>;
}
function TimeSeries({ sx, prefecture, city, lineGraphYear }: TimeSeriesProps): React.JSX.Element {
    const data = [], xLabels = [];
    const points: string[] = Object.keys(lineGraphYear);
    const diff = Number(points[points.length - 1] ?? 0) - Number(points[0]);
    for (let i = 0; i <= diff; i++) {
        const point = String(Number(points[0] ?? 0) + i);
        xLabels.push(point);
        data.push(lineGraphYear[point] ?? 0);
    }
    return (
        <Card sx={sx}>
            <CardHeader
                // action={
                //     <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                //         Sync
                //     </Button>
                // }
                title={`${prefecture}${city}の人口推移（年次データ）`}
            />
            <CardContent sx={{ overflow: "auto" }}>
                <LineChart
                    width={undefined}
                    height={300}
                    series={[
                        { data, label: city ? city : prefecture },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </CardContent>
            <Divider />
            {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
                    Overview
                </Button>
            </CardActions> */}
        </Card>
    );
}


interface ByAgeProps {
    sx?: SxProps;
    prefecture: string;
    city: string;
    pieChartAge: Record<string, number>;
}
function ByAge({ sx, prefecture, city, pieChartAge }: ByAgeProps): React.JSX.Element {
    const data = [];
    for (const k in pieChartAge) {
        data.push({
            id: k,
            value: pieChartAge[k],
            label: k === "85" ? `${k}歳以上` : `${k.replace("-", "～")}歳`
        });
    }

    return (
        <Card sx={sx}>
            <CardHeader
                // action={
                //     <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                //         Sync
                //     </Button>
                // }
                title={`${prefecture}${city}の年齢別人口分布`}
            />
            <CardContent sx={{ overflow: "auto" }}>
                <PieChart
                    series={[{ data }]}
                    width={undefined}
                    height={400}
                />
            </CardContent>
        </Card>
    );
}
