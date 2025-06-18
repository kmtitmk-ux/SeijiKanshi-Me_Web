import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export const handler = async () => {
    const client = new BedrockRuntimeClient({ region: "us-east-1" }); // 適切なリージョンを指定

    const command = new InvokeModelCommand({
        modelId: "anthropic.claude-v2", // 使用するモデルIDを指定
        body: JSON.stringify({
            prompt: "Hello, how can I assist you today?",
            max_tokens_to_sample: 300,
        }),
        contentType: "application/json",
    });

    try {
        const response = await client.send(command);
        console.log("response", response);
        const result = JSON.parse(new TextDecoder().decode(response.body));
        console.log("result", result);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to invoke Bedrock model" }),
        };
    }
};
