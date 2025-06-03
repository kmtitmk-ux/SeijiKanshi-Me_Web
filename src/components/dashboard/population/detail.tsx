"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { downloadData } from 'aws-amplify/storage';

import { Sales } from '@/components/dashboard/overview/sales';
// import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
// import { CustomersTable } from '@/components/dashboard/customer/customers-table';
// import type { Customer } from '@/components/dashboard/customer/customers-table';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import type { MarkElementProps } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { PieItemIdentifier, DefaultizedPieValueType } from '@mui/x-charts/models';
import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';

export interface CustomMarkProps extends MarkElementProps {
    xLabels?: string[];
    prefecture?: string;
    city?: string;
}
export function CustomMark(props: CustomMarkProps & MarkElementProps): React.JSX.Element {
    const { x, y, color, dataIndex, xLabels, prefecture, city } = props;
    const router = useRouter();
    function handleClick(event: React.MouseEvent<SVGPathElement>): void {
        const index = Number(event.currentTarget.getAttribute('data-index'));
        if (xLabels) {
            let path = `/dashboard/population/${xLabels[index]}/${prefecture}`;
            if (city) path += `+${city}`;
            router.push(path);
        }
    }
    return (
        <path
            d="M4.514,0A4.514,4.514,0,1,1,-4.514,0A4.514,4.514,0,1,1,4.514,0"
            transform={`translate(${x}, ${y})`}
            fill={color}
            data-index={dataIndex}
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
        />
    );
}

interface TimeSeriesProps {
    sx?: SxProps;
    prefecture: string;
    city: string;
    lineGraphYear: Record<string, number>;
}
function TimeSeries({ sx, prefecture, city, lineGraphYear }: TimeSeriesProps): React.JSX.Element {
    const data: number[] = [];
    const xLabels: string[] = [];
    const points: string[] = Object.keys(lineGraphYear);
    const diff = Number(points[points.length - 1] ?? 0) - Number(points[0]);
    // xLabels と data を作成
    for (let i = 0; i <= diff; i++) {
        const point = String(Number(points[0] ?? 0) + i);
        xLabels.push(point);
        data.push(lineGraphYear[point] ?? 0);
    }
    return (
        <Card sx={sx}>
            <CardHeader
                title={`${prefecture}${city}の人口推移（年次データ）`}
            />
            <CardContent sx={{ overflow: "auto" }}>
                <LineChart
                    width={undefined}
                    height={300}
                    series={[{ data, label: city || prefecture }]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    slots={{
                        mark: CustomMark,
                    }}
                    slotProps={{
                        mark: {
                            xLabels,
                            prefecture,
                            city
                        } as unknown as Partial<MarkElementProps>,
                    }}
                />
            </CardContent>
            <Divider />
        </Card>
    );
}

interface ByAgeProps {
    sx?: SxProps;
    prefecture: string;
    city: string;
    pieChartAge: Record<string, number>;
    year: string;
}
interface PieData {
    id: string;
    value: number;
    label: string;
    link: string;
}
function ByAge({ sx, prefecture, city, pieChartAge, year }: ByAgeProps): React.JSX.Element {
    const router = useRouter();
    const data: PieData[] = [];
    const id = city ? `${prefecture}+${city}` : prefecture;
    for (const k in pieChartAge) {
        data.push({
            id: k,
            value: pieChartAge[k],
            label: k === "85" ? `${k}歳以上` : `${k.replace("-", "～")}歳`,
            link: `/dashboard/population/${year}/${id}/${k}`
        });
    }

    function handleClick(
        _event: React.MouseEvent<SVGPathElement>,
        itemIdentifier: PieItemIdentifier,
        _item: DefaultizedPieValueType
    ): void {
        const clicked = data[itemIdentifier.dataIndex];
        if (clicked?.link) router.push(clicked.link);
    };

    return (
        <Card sx={sx}>
            <CardHeader
                // action={
                //     <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
                //         Sync
                //     </Button>
                // }
                title={`${prefecture}${city}の年齢別人口分布（${year}年）`}
            />
            <CardContent sx={{ overflow: "auto" }}>
                <PieChart
                    series={[{ data }]}
                    width={undefined}
                    height={400}
                    onItemClick={handleClick}
                />
            </CardContent>
        </Card>
    );
}

export interface DetailProps {
    year: string;
    prefecture: string;
    city: string;
    age?: string;
}
export function Detail({ year, prefecture, city, age }: DetailProps): React.JSX.Element {
    const [lineGraphYear, setLineGraphYear] = useState<Record<string, number>>({});
    const [pieChartAge, setPieChartAge] = useState<Record<string, number>>({});
    const [barGraphCity, setBarGraphCity] = useState<Record<string, Record<string, number>>>({});
    async function fetchData(): Promise<void> {
        const downloadResult = await downloadData({
            path: `public-data/population/${prefecture}.jsonl`,
            options: {
                bucket: "SKM01"
            }
        }).result;
        const text = await downloadResult.body.text();
        // 行ごとに分割し、空行を除外
        const lines = text.split('\n').filter(line => line.trim() !== '');
        interface DataProps {
            id: string;
            updatedAt: string;
            __typename: string;
            sex: string;
            age: string,
            city: string;
            point: string;
            population: number;
            prefecture: string;
        };
        // 各行をJSONとしてパース
        const parsedData: DataProps[] = lines.map((line: string, index: number) => {
            try {
                return JSON.parse(line) as DataProps;
            } catch (error) {
                console.error(`Error parsing line ${index + 1}:`, line, error);
                return null;
            }
        }).filter(item => item !== null);
        const checkCity = city ? city : "";
        const checkAge = age ? age : "総計";
        const items = [...parsedData];
        const yearData: Record<string, number> = {};
        const ageData: Record<string, number> = {};
        const cityData: Record<string, Record<string, number>> = {};
        for (const v of items) {
            if (v.point && v.city === checkCity && v.age === checkAge) {
                if (!yearData[v.point]) yearData[v.point] = 0;
                yearData[v.point] += v.population ?? 0;
            }
            if (v.city && !city && v.point === year && v.age === checkAge) {
                if (!cityData[v.city]) cityData[v.city] = { "男性": 0, "女性": 0 };
                if (v.sex === "男") cityData[v.city]["男性"] += v.population ?? 0;
                if (v.sex === "女") cityData[v.city]["女性"] += v.population ?? 0;
            }
            if (v.age && !age && v.city === checkCity && v.point === year && v.age !== checkAge) {
                if (!ageData[v.age]) ageData[v.age] = 0;
                ageData[v.age] += v.population ?? 0;
            }
        }
        if (Object.keys(yearData).length) setLineGraphYear(yearData);
        if (Object.keys(cityData).length) setBarGraphCity(cityData);
        if (Object.keys(ageData).length) setPieChartAge(ageData);
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <>
            {Object.keys(barGraphCity).length > 0 && (
                <Grid lg={12}>
                    <Sales
                        sx={{ height: '100%' }}
                        barGraphCity={barGraphCity}
                        year={year}
                        prefecture={prefecture}
                        age={age}
                    />
                </Grid>
            )}
            {Object.keys(pieChartAge).length > 0 && (
                <Grid lg={12}>
                    <ByAge
                        sx={{ height: '100%' }}
                        pieChartAge={pieChartAge}
                        year={year}
                        prefecture={prefecture}
                        city={city}
                    />
                </Grid>
            )}
            <Grid lg={12}>
                <TimeSeries
                    sx={{ height: '100%' }}
                    prefecture={prefecture}
                    city={city}
                    lineGraphYear={lineGraphYear}
                />
            </Grid>
        </>
    );
}
