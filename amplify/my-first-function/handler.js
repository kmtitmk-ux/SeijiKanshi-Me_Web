import {
    BedrockRuntimeClient,
    InvokeModelCommand
} from "@aws-sdk/client-bedrock-runtime";

export const myFirstFunction = async () => {
    const client = new BedrockRuntimeClient({ region: "us-east-1" });

    const input = {
        modelId: "anthropic.claude-v2",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: "こんにちは、Claude！",
            max_tokens_to_sample: 100
        }),
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const result = await response.body.transformToString();

    return {
        statusCode: 200,
        body: result
    };
};
