"use client";

import React, { useEffect, useState } from 'react';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
// import { CustomersTable } from '@/components/dashboard/customer/customers-table';
// import type { Customer } from '@/components/dashboard/customer/customers-table';
// import dayjs from 'dayjs';
import { list } from 'aws-amplify/storage';

// interface itemsProps {
//     data: Customer[];
//     paginatedCustomers: {
//         id: string;
//         prefecture: string;
//         city: string;
//         updatedAt: Date;
//     }[];
// }
export function List(): React.JSX.Element {
    // const page = 0;
    // const rowsPerPage = 100;
    // const [originalItems, setOriginalItems] = useState<itemsProps["paginatedCustomers"]>([]);
    // const [items, setItems] = useState<itemsProps["paginatedCustomers"]>([]);
    const [searchWord, setSearchWord] = useState<string>("");

    async function fetchData(): Promise<void> {
        try {
            // const result = await list({
            //     path: 'public-data/',
            //     options: {
            //         listAll: true,
            //     },
            // });
            // console.log(result);
            const result = await list({
                path: 'public-data/',
                // Alternatively, path: ({identityId}) => `album/${identityId}/photos/`
            });
            console.log(result);
        } catch (error) {
            console.error('エラー:', error);
        }

        // const downloadResult = await downloadData({
        //     path: "public-data/神奈川県.jsonl",
        //     options: {
        //         // Specify a target bucket using name assigned in Amplify Backend
        //         bucket: "SKM01"
        //     }
        // }).result;
        // const text = await downloadResult.body.text();

        // // 行ごとに分割し、空行を除外
        // const lines = text.split('\n').filter(line => line.trim() !== '');
        // interface DataProps {
        //     id: string;
        //     updatedAt: Date;
        //     __typename: string;
        //     sex: string;
        //     age: string,
        //     city: string;
        //     point: string;
        //     population: number;
        //     prefecture: string;
        // };

        // // 各行をJSONとしてパース
        // const parsedData: DataProps[] = lines.map((line: string, index: number) => {
        //     try {
        //         return JSON.parse(line) as DataProps;
        //     } catch (error) {
        //         console.error(`Error parsing line ${index + 1}:`, line, error);
        //         return null;
        //     }
        // }).filter(item => item !== null);

        // const cities: string[] = [];
        // const newList: itemsProps["paginatedCustomers"] = [];
        // for (const v of parsedData) {
        //     if (!cities.includes(v.city)) {
        //         cities.push(v.city);
        //         newList.push({
        //             id: v.id,
        //             prefecture: v.prefecture,
        //             city: v.city,
        //             updatedAt: new Date(v.updatedAt)
        //         });
        //     }
        // }
        // setOriginalItems(newList);
        // setItems(applyPagination(newList));
    }

    useEffect(() => {
        void fetchData();
    }, []);

    useEffect(() => {
        const searchWords = searchWord.trim().split(/[\u0020\u3000]+/).filter(Boolean);
        console.log(searchWords);
        // const newList = applyPagination(originalItems).filter((v) => {
        //     if (searchWords.length === 0) return true;
        //     if (searchWords.length === 1) {
        //         const word = searchWords[0];
        //         return v.prefecture.includes(word) || v.city.includes(word);
        //     }
        //     return searchWords.every((word) => {
        //         return v.prefecture.includes(word) || v.city.includes(word);
        //     });
        // });
        // setItems(newList);
    }, [searchWord]);

    // function applyPagination(rows: Customer[]): Customer[] {
    //     return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // }

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
            {/* <CustomersTable
                count={items.length}
                page={page}
                rows={items}
                rowsPerPage={rowsPerPage}
            /> */}
        </>
    );
}
