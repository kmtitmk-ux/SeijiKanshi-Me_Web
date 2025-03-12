'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
// import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
// import type { ApexOptions } from 'apexcharts';
import { BarChart } from '@mui/x-charts/BarChart';


export interface SalesProps {
    // chartSeries: { name: string; data: number[] }[];
    sx?: SxProps;
}

export function Sales({ sx }: SalesProps): React.JSX.Element {
    const maleData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000];
    const femaleData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398];
    const xLabels = [
        "千代田区",
        "中央区",
        "港区",
        "新宿区",
        "文京区",
        "台東区",
        "墨田区",
        "江東区",
        "品川区",
        "目黒区",
        "大田区",
        "世田谷区",
        "渋谷区",
        "中野区",
        "杉並区",
        "豊島区",
        "北区",
        "荒川区",
        "板橋区",
        "練馬区",
        "足立区",
        "葛飾区",
        "江戸川区"
    ];

    // const chartOptions = useChartOptions();
    const handleBarClick = (_: React.MouseEvent<SVGElement>, { dataIndex }: { dataIndex: number }): void => {
        console.log(xLabels[dataIndex])
    }

    return (
        <Card sx={sx}>
            <CardHeader
                action={
                    <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                        Sync
                    </Button>
                }
                title="東京都の市区町村別人口比較"
            />
            <CardContent sx={{ overflow: "auto" }}>
                <BarChart
                    width={undefined}
                    height={600}
                    series={[
                        { data: maleData, label: '男性', id: 'male', stack: 'total' },
                        { data: femaleData, label: '女性', id: 'female', stack: 'total' },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    onItemClick={handleBarClick}
                />
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
                    Overview
                </Button>
            </CardActions>
        </Card>
    );
}

// function useChartOptions(): ApexOptions {
//     const theme = useTheme();

//     return {
//         chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
//         colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
//         dataLabels: { enabled: false },
//         fill: { opacity: 1, type: 'solid' },
//         grid: {
//             borderColor: theme.palette.divider,
//             strokeDashArray: 2,
//             xaxis: { lines: { show: false } },
//             yaxis: { lines: { show: true } },
//         },
//         legend: { show: false },
//         plotOptions: { bar: { columnWidth: '40px' } },
//         stroke: { colors: ['transparent'], show: true, width: 2 },
//         theme: { mode: theme.palette.mode },
//         xaxis: {
//             axisBorder: { color: theme.palette.divider, show: true },
//             axisTicks: { color: theme.palette.divider, show: true },
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//             labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
//         },
//         yaxis: {
//             labels: {
//                 formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
//                 offsetX: -10,
//                 style: { colors: theme.palette.text.secondary },
//             },
//         },
//     };
// }
