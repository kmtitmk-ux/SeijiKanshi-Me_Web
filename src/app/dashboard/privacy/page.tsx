import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography
} from '@mui/material';
import { config } from '@/config';
import Grid from '@mui/material/Unstable_Grid2';

export const metadata = { title: `プライバシーポリシー | Dashboard | ${config.site.name}` } satisfies Metadata;

// 🔧 Section をコンポーネント外に定義
interface SectionProps {
    title: string;
    children: React.ReactNode;
};
function Section({ title, children }: SectionProps): React.JSX.Element {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body1" component="div">{children}</Typography>
        </Box>
    );
}
export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <div>
                <Typography variant="h4">プライバシーポリシー</Typography>
            </div>
            <Card>
                <CardHeader
                    subheader="「政治監視の目」（以下「当サービス」といいます）は、利用者のプライバシーを尊重し、個人情報の適切な保護・管理に努めます。本プライバシーポリシーは、当サービスにおける個人情報の取扱いについて定めたものです。"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={6} wrap="wrap">
                        <Grid sm={12}>
                            <Section title="第1条（収集する情報）">
                                当サービスでは、以下の情報を取得することがあります。
                                <ul>
                                    <li>ユーザーが登録時に入力した情報（メールアドレス、ユーザー名など）</li>
                                    <li>統計データの閲覧履歴、操作履歴</li>
                                    <li>クッキー（Cookie）などの識別情報</li>
                                    <li>IPアドレス、ブラウザ情報、アクセス日時</li>
                                    <li>お問い合わせ時に提供された情報</li>
                                </ul>
                            </Section>

                            <Section title="第2条（利用目的）">
                                当サービスは、取得した情報を以下の目的で利用します。
                                <ul>
                                    <li>サービスの提供、改善、機能拡張</li>
                                    <li>利用状況の分析および統計レポートの生成</li>
                                    <li>不正利用の防止およびセキュリティ対策</li>
                                    <li>利用者からの問い合わせへの対応</li>
                                    <li>重要なお知らせ等の通知</li>
                                </ul>
                            </Section>

                            <Section title="第3条（第三者提供）">
                                当サービスは、法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供することはありません。
                            </Section>

                            <Section title="第4条（外部サービスの利用）">
                                当サービスでは以下の外部サービスを利用することがあります。これらのサービス提供者が利用者情報を取得する可能性があります。
                                <ul>
                                    <li>Google Analytics（アクセス解析）</li>
                                    <li>OpenAI API（レポート自動生成）</li>
                                    <li>AWS Amplify（インフラ・ユーザー管理）</li>
                                </ul>
                                外部サービスのプライバシーポリシーは、それぞれの運営元の定めに従います。
                            </Section>

                            <Section title="第5条（情報の管理）">
                                当サービスは、個人情報への不正アクセス・漏洩・改ざん・破壊を防止するため、合理的なセキュリティ対策を講じます。
                            </Section>

                            <Section title="第6条（利用者の権利）">
                                利用者は、自己の個人情報の開示・訂正・利用停止等を求めることができます。お問い合わせは、下記の連絡先までお願いいたします。
                            </Section>

                            <Section title="第7条（改訂）">
                                本プライバシーポリシーは、必要に応じて変更することがあります。重要な変更がある場合は、サービス上で通知します。
                            </Section>

                            <Section title="第8条（お問い合わせ）">
                                本ポリシーに関するお問い合わせは、以下の連絡先までご連絡ください。
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2">
                                        サービス運営者：政治監視の目 運営事務局
                                    </Typography>
                                    <Typography variant="body2">
                                        お問い合わせ窓口：example@example.com
                                    </Typography>
                                </Box>
                            </Section>

                            <Typography variant="body2" sx={{ mt: 4 }}>
                                制定日：2025年5月21日<br />
                                最終更新日：2025年5月21日
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Stack>
    );
}
