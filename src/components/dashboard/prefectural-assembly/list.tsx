"use client";

import React, { useEffect, useState } from 'react';
import { list } from 'aws-amplify/storage';
import { Filters } from '@/components/dashboard/prefectural-assembly/filters';
import { PrefecturalAssemblyTable } from '@/components/dashboard/prefectural-assembly/table';
import type { Customer } from '@/components/dashboard/prefectural-assembly/table';
import dayjs from 'dayjs';

interface ItemsProps {
    data: Customer[];
    paginatedCustomers: Customer[];
}
export function List(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 100;
    const [originalItems, setOriginalItems] = useState<ItemsProps["data"]>([]);
    const [items, setItems] = useState<ItemsProps["data"]>([]);
    const [searchWord, setSearchWord] = useState<string>("");

    async function fetchData(): Promise<void> {
        try {
            const result = await list({
                path: 'public-data/prefectural-assembly/',
                options: { listAll: true, },
            });
            const newList: ItemsProps["data"] = [];
            for (const item of result.items) {
                if (item.path.includes("jsonl")) {
                    newList.push({
                        id: item.path.replace(/public-data\/prefectural-assembly\/|.jsonl/g, ""),
                        updatedAt: dayjs(item.lastModified).format("YYYY/MM/DD")
                    });
                }
            }
            setOriginalItems(newList);
            setItems(applyPagination(newList));
        } catch (error) {
            console.error('エラー:', error);
        }
    }

    useEffect(() => {
        // async function load(): Promise<void> {
        //     try {
        //         const res = await fetch('/assets/東京都議会.jsonl');
        //         const text = await res.text();
        //         const newList = text
        //             .split(/\r?\n/)
        //             .filter(Boolean)
        //             .map((line: string) => JSON.parse(line) as Customer);
        //         setOriginalItems(newList);
        //         setItems(newList);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        void fetchData();
    }, []);

    useEffect(() => {
        const searchWords = searchWord.trim().split(/[\u0020\u3000]+/).filter(Boolean);
        const newList = applyPagination(originalItems).filter((v) => {
            if (searchWords.length === 0) return true;
            if (searchWords.length === 1) {
                const word = searchWords[0];
                return v.id.includes(word);
            }
            return false;
            // if (searchWords.length === 1) {
            //     const word = searchWords[0];
            //     return v.prefecture.includes(word) || v.city.includes(word);
            // }
            // return searchWords.every((word) => {
            //     return v.prefecture.includes(word) || v.city.includes(word);
            // });
        });
        setItems(newList);
    }, [searchWord]);

    function applyPagination(rows: Customer[]): Customer[] {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;
        setSearchWord(searchValue);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Filters />
            </form>
            <PrefecturalAssemblyTable
                count={items.length}
                page={page}
                rows={items}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
}
