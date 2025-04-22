import React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';

import { config } from '@/config';
// import { Test } from '@/components/dashboard/layout/test';
// import { Budget } from '@/components/dashboard/overview/budget';
// import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
// import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
// import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
// import { TotalProfit } from '@/components/dashboard/overview/total-profit';
// import { Traffic } from '@/components/dashboard/overview/traffic';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Grid container spacing={3}>
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
                <TimeSeries sx={{ height: '100%' }} />
            </Grid>
            <Grid lg={12}>
                {/* <Test /> */}
                <Sales
                    // chartSeries={[
                    //   { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                    //   { name: 'a', data: [1, 11, 4, 3, 2, 9, 9, 10, 4, 12, 13, 13] },
                    //   { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
                    //   { name: 'b', data: [1, 11, 4, 3, 2, 9, 9, 10, 4, 12, 13, 13] },
                    // ]}
                    sx={{ height: '100%' }}
                />
            </Grid>
            <Grid lg={12}>
                <ByAge sx={{ height: '100%' }} />
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

export interface TimeSeriesProps {
    sx?: SxProps;
}
function TimeSeries({ sx }: TimeSeriesProps): React.JSX.Element {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800];
    const xLabels = [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
    ];
    return (
        <Card sx={sx as SxProps}>
            <CardHeader
                action={
                    <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                        Sync
                    </Button>
                }
                title="東京都の人口推移（年次データ）"
            />
            <CardContent sx={{ overflow: "auto" }}>
                <LineChart
                    width={undefined}
                    height={300}
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
                    Overview
                </Button>
            </CardActions>
        </Card>
    )
}

export interface ByAgeProps {
    sx?: SxProps;
}
function ByAge({ sx }: ByAgeProps): React.JSX.Element {
    return (
        <Card sx={sx as SxProps}>
            <CardHeader
                action={
                    <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                        Sync
                    </Button>
                }
                title="東京都の年齢別人口分布"
            />
            <CardContent sx={{ overflow: "auto" }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 100, label: '0～4歳' },
                                { id: 1, value: 15, label: '5～9歳' },
                                { id: 2, value: 20, label: '10～14歳' },
                                { id: 3, value: 44, label: '15～19歳' },
                                { id: 4, value: 20, label: '20～24歳' },
                                { id: 5, value: 54, label: '25～29歳' },
                                { id: 6, value: 20, label: '30～34歳' },
                                { id: 7, value: 33, label: '35～39歳' },
                                { id: 8, value: 20, label: '40～44歳' },
                                { id: 9, value: 66, label: '45～49歳' },
                                { id: 10, value: 88, label: '50～54歳' },
                                { id: 11, value: 32, label: '55～59歳' },
                                { id: 12, value: 24, label: '60～64歳' },
                                { id: 13, value: 20, label: '65～69歳' },
                                { id: 14, value: 23, label: '70～74歳' },
                                { id: 15, value: 47, label: '75～79歳' },
                                { id: 16, value: 31, label: '80～84歳' },
                                { id: 17, value: 9, label: '85歳以上' },
                            ],
                        },
                    ]}
                    width={undefined}
                    height={400}
                />
            </CardContent>
        </Card>
    )
}
