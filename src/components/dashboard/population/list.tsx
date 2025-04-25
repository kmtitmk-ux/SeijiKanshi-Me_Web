"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import dayjs from 'dayjs';

interface ListProps {
    data: Customer[];
    paginatedCustomers: {
        id: string;
        prefecture: string;
        city: string;
        updatedAt: Date;
    }[];
}
export function List(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 5;
    const [list, setList] = useState<ListProps["paginatedCustomers"]>([]);
    const [searchWord, setSearchWord] = useState<string>("");

    const listData = useMemo(() => [
        {
            id: '1',
            prefecture: '東京都',
            city: '港区',
            updatedAt: dayjs().subtract(2, 'hours').toDate(),
        },
        {
            id: '2',
            prefecture: '東京都',
            city: '千代田区',
            updatedAt: dayjs().subtract(2, 'hours').toDate(),
        },
    ], []);

    useEffect(() => {
        const searchWords = searchWord.trim().split(/[\u0020\u3000]+/).filter(Boolean);
        const newList = applyPagination(listData).filter((v) => {
            if (searchWords.length === 0) return true;
            if (searchWords.length === 1) {
                const word = searchWords[0];
                return v.prefecture.includes(word) || v.city.includes(word);
            }
            return searchWords.every((word) => {
                return v.prefecture.includes(word) || v.city.includes(word);
            });
        });
        setList(newList);
    }, [searchWord, listData]);

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
                count={list.length}
                page={page}
                rows={list}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
}
