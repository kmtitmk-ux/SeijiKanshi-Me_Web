"use client";

import React, { useEffect, useState } from 'react';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import dayjs from 'dayjs';
import { list } from 'aws-amplify/storage';

interface ItemsProps {
    data: Customer[];
    paginatedCustomers: {
        id: string;
        updatedAt: string;
    }[];
}
export function List(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 100;
    const [originalItems, setOriginalItems] = useState<ItemsProps["paginatedCustomers"]>([]);
    const [items, setItems] = useState<ItemsProps["paginatedCustomers"]>([]);
    const [searchWord, setSearchWord] = useState<string>("");

    async function fetchData(): Promise<void> {
        try {
            const result = await list({
                path: 'public-data/',
                options: { listAll: true, },
            });
            const newList: ItemsProps["paginatedCustomers"] = [];
            for (const item of result.items) {
                if (item.path.includes("jsonl")) {
                    newList.push({
                        id: item.path.replace(/public-data\/|.jsonl/g, ""),
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
                <CustomersFilters />
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
