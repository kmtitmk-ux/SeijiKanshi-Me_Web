'use client';

import * as React from 'react';
import Link from 'next/link';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import dayjs from 'dayjs';
// import Typography from '@mui/material/Typography';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
    // do nothing
}

export interface DataProps {
    year: string;
    [key: string]: number | string;
}

interface PrefecturesTableProps {
    count?: number;
    page?: number;
    rows?: DataProps[];
    rowsPerPage?: number;
    prefecture?: string;
}
export function PrefecturesTable({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
    prefecture = ""
}: PrefecturesTableProps): React.JSX.Element {
    const rowIds = React.useMemo(() => {
        return rows.map((customer) => customer.id);
    }, [rows]);
    const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
    const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
    const selectedAll = rows.length > 0 && selected?.size === rows.length;

    // カテゴリー一覧取得（"year"以外のキー）
    const cats = rows.reduce<string[]>((maxKeys, obj) => {
        const keys = Object.keys(obj);
        return keys.length > maxKeys.length ? keys : maxKeys;
    }, []);

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            selectAll();
                                        } else {
                                            deselectAll();
                                        }
                                    }}
                                />
                            </TableCell>
                            {cats.map(cat => <TableCell key={cat}>{cat === "year" ? "年" : cat}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isSelected = selected?.has(row.id);
                            return (
                                <TableRow hover key={row.id} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    selectOne(row.id);
                                                } else {
                                                    deselectOne(row.id);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/prefectural-assembly/${prefecture}/${row.year}`}>{row.year}</Link>
                                    </TableCell>
                                    {cats.filter(cat => cat !== "year").map(cat => (
                                        <TableCell key={cat}>{row[cat] ?? 0}件</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
