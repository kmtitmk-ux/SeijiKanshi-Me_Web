const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

exports.handler = async (event) => {
    const client = new BedrockRuntimeClient({ region: "ap-northeast-1" }); // 東京リージョン（利用可能な場合）

    const command = new InvokeModelCommand({
        modelId: "anthropic.claude-v2",
        body: JSON.stringify({
            prompt: "Hello, how can I assist you today?",
            max_tokens_to_sample: 300,
        }),
        contentType: "application/json",
    });

    try {
        const response = await client.send(command);
        const result = JSON.parse(new TextDecoder().decode(response.body));
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
