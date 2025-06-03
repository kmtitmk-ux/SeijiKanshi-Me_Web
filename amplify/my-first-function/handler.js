import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import readline from "readline";
import { Readable } from "stream";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const bedrockClient = new BedrockRuntimeClient({ region: 'us-east-1' });
const s3Client = new S3Client({ region: 'us-east-1' });

const rewriteText = async (inputText) => {
    const prompt = `次の文章を丁寧なビジネス文にリライトしてください：\n「${inputText}」`;

    const body = JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
            temperature: 0.7,
            maxTokenCount: 512,
            topP: 0.9,
            stopSequences: []
        }
    });

    const command = new InvokeModelCommand({
        modelId: "amazon.titan-text-express-v1",
        contentType: "application/json",
        accept: "application/json",
        body
    });

    const response = await bedrockClient.send(command);
    const result = JSON.parse(Buffer.from(response.body).toString("utf8"));
    return result.results[0].outputText;
};

export const handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const s3Object = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

    const rl = readline.createInterface({
        input: s3Object.Body
    });

    const results = [];

    for await (const line of rl) {
        const json = JSON.parse(line);
        const rewritten = await rewriteText(json.text);
        results.push({ id: json.id, original: json.text, rewritten });
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ count: results.length, results })
    };
};
