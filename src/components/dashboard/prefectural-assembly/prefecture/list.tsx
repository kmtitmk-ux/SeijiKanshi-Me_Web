"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { downloadData } from 'aws-amplify/storage';
import type { DetailProps } from '@/components/dashboard/prefectural-assembly/filters';
import { PrefecturesTable } from '@/components/dashboard/prefectural-assembly/prefecture/table';
import type { DataProps } from '@/components/dashboard/prefectural-assembly/prefecture/table';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import type { MarkElementProps } from '@mui/x-charts/LineChart';
import Grid from '@mui/material/Unstable_Grid2';
// import { PieChart } from '@mui/x-charts/PieChart';
// import type { PieItemIdentifier, DefaultizedPieValueType } from '@mui/x-charts/models';
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
    lineGraphYear: Record<string, number>[];
}
function TimeSeries({ sx, lineGraphYear }: TimeSeriesProps): React.JSX.Element {
    const series = [];
    const outPut: Record<string, Record<string, number>> = {};
    const points: number[] = [];

    // データ整形: 年ごとのデータを outPut に格納
    for (const item of lineGraphYear) {
        const { year, ...rest } = item;
        outPut[String(year)] = rest;
        if (!points.includes(Number(year))) {
            points.push(Number(year));
        }
    }

    // 年の昇順ソート
    const sortedPoints = [...points].sort((a, b) => a - b);
    const startYear = sortedPoints[0];
    const endYear = sortedPoints[sortedPoints.length - 1];
    const diff = endYear - startYear;

    // x軸ラベル生成
    const xLabels: string[] = [];
    for (let i = 0; i <= diff; i++) {
        xLabels.push(String(startYear + i));
    }

    // カテゴリー一覧取得（"year"以外のキー）
    const lineKeys = lineGraphYear.reduce<string[]>((maxKeys, obj) => {
        const keys = Object.keys(obj).filter((key) => key !== "year");
        return keys.length > maxKeys.length ? keys : maxKeys;
    }, []);

    // 各カテゴリごとの系列データ構築
    for (const cat of lineKeys) {
        const data: number[] = [];
        for (let i = 0; i <= diff; i++) {
            const year = String(startYear + i);
            const value = outPut[year]?.[cat] ?? 0;
            data.push(value);
        }
        series.push({ label: cat, data });
    }

    return (
        <Card sx={sx}>
            <CardHeader
            // title="例: 東京都の人口推移"
            />
            <CardContent sx={{ overflow: "auto" }}>
                <LineChart
                    height={300}
                    series={series}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    yAxis={[{ width: 50 }]}
                />
            </CardContent>
            <Divider />
        </Card>
    );
}

interface ListProps {
    prefecture?: string;
}
export function List({ prefecture }: ListProps): React.JSX.Element {
    // const [originalItems, setOriginalItems] = useState<DataProps[]>([]);
    const [items, setItems] = useState<DataProps[]>([]);
    // const [searchWord, setSearchWord] = useState<string>("");
    // const [lineGraphYear, setLineGraphYear] = useState<Record<string, number>>({});
    const page = 0;
    const rowsPerPage = 1000;

    async function fetchData(): Promise<void> {
        const downloadResult = await downloadData({
            path: `public-data/prefectural-assembly/${prefecture}.jsonl`,
            options: { bucket: "SKM01" }
        }).result;
        const text = await downloadResult.body.text();

        // 行ごとに分割し、空行を除外
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');

        // 各行をJSONとしてパース
        const parsedData: DetailProps[] = lines.map((line: string, index: number) => {
            try {
                return JSON.parse(line) as DetailProps;
            } catch (error) {
                console.error(`Error parsing line ${index + 1}:`, line, error);
            }
            return null;
        }).filter(item => item !== null);

        const outPut: Record<string, Record<string, number>> = {};
        for (const { date, cat } of parsedData) {
            if (!date || !cat) continue;
            if (!outPut[date]) outPut[date] = {};
            if (!outPut[date][cat]) outPut[date][cat] = 0;
            outPut[date][cat]++;
        }
        const newList: DataProps[] = [];
        for (const year in outPut) {
            newList.push({ year, ...outPut[year] });
        }
        newList.sort((a, b) => {
            return (b.year > a.year) ? 1 : (b.year < a.year ? -1 : 0);
        });
        setItems(applyPagination(newList));
    }

    useEffect(() => {
        void fetchData();
    }, []);

    // useEffect(() => {
    //     const searchWords = searchWord.trim().split(/[\u0020\u3000]+/).filter(Boolean);
    //     const newList = applyPagination(originalItems).filter((v) => {
    //         if (searchWords.length === 0) return true;
    //         // return searchWords.every((word) => {
    //         //     return v.title.includes(word) || v.cat.includes(word) || v.round.includes(word);
    //         // });
    //     });
    //     setItems(newList);
    // }, [searchWord]);

    function applyPagination(rows: DataProps[]): DataProps[] {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return (
        <>
            <Grid lg={12}>
                <TimeSeries
                    sx={{ height: '100%' }}
                    lineGraphYear={items}
                />
            </Grid>
            <PrefecturesTable
                count={items.length}
                page={page}
                rows={items}
                rowsPerPage={rowsPerPage}
                prefecture={prefecture}
            />
        </>
    );
}
