"use client";

import React, { useEffect, useState } from 'react';
import { downloadData } from 'aws-amplify/storage';

// import { Sales } from '@/components/dashboard/overview/sales';
import { Filters } from '@/components/dashboard/prefectural-assembly/filters';
import { CustomersTable } from '@/components/dashboard/prefectural-assembly/prefecture/year/customers-table';
import type { DataProps } from '@/components/dashboard/prefectural-assembly/prefecture/year/customers-table';

import { BarChart } from '@mui/x-charts/BarChart';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import type { SxProps } from '@mui/material/styles';
// import { LineChart } from '@mui/x-charts/LineChart';
// import type { MarkElementProps } from '@mui/x-charts/LineChart';
// import { PieChart } from '@mui/x-charts/PieChart';
// import type { PieItemIdentifier, DefaultizedPieValueType } from '@mui/x-charts/models';
// import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';

export interface DetailProps {
    year: string;
    prefecture: string;
    city: string;
}
// interface ItemsProps {
//     data: Customer[];
//     paginatedCustomers: Customer[];
// }
export function List({ year, prefecture }: DetailProps): React.JSX.Element {
    const [originalItems, setOriginalItems] = useState<DataProps[]>([]);
    const [items, setItems] = useState<DataProps[]>([]);
    const [searchWord, setSearchWord] = useState<string>("");
    const page = 0;
    const rowsPerPage = 1000;

    useEffect(() => {
        void fetchData();
    }, []);

    useEffect(() => {
        const searchWords = searchWord.trim().split(/[\u0020\u3000]+/).filter(Boolean);
        const newList = applyPagination(originalItems).filter((v) => {
            if (searchWords.length === 0) return true;
            return searchWords.every((word) => {
                return v.title.includes(word) || v.cat.includes(word) || v.round.includes(word);
            });
        });
        setItems(newList);
    }, [searchWord]);

    async function fetchData(): Promise<void> {
        const downloadResult = await downloadData({
            path: `public-data/prefectural-assembly/${prefecture}.jsonl`,
            options: {
                bucket: "SKM01"
            }
        }).result;
        const text = await downloadResult.body.text();

        // 行ごとに分割し、空行を除外
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');

        // 各行をJSONとしてパース
        const parsedData: DataProps[] = lines.map((line: string, index: number) => {
            try {
                const data = JSON.parse(line) as DataProps;
                if (data.date === year) return data;
            } catch (error) {
                console.error(`Error parsing line ${index + 1}:`, line, error);
            }
            return null;
        }).filter(item => item !== null);
        setOriginalItems(parsedData);
        setItems(applyPagination(parsedData));
    }

    function applyPagination(rows: DataProps[]): DataProps[] {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;
        setSearchWord(searchValue);
    }

    const outPut: Record<string, number> = {};
    for (const v of items) {
        if (v.cat) {
            if (!outPut[v.cat]) outPut[v.cat] = 0;
            outPut[v.cat]++;
        }
    }
    const xLabels: string[] = Object.keys(outPut);
    const data: number[] = Object.values(outPut);

    return (
        <>
            <BarChart
                width={undefined}
                height={300}
                series={[{ data, label: '議案', id: 'catId', stack: 'total' }]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />

            <form onSubmit={handleSubmit}>
                <Filters />
            </form>

            <CustomersTable
                count={items.length}
                page={page}
                rows={items}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
}
