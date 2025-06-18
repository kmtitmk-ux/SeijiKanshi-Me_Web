import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
export const handler = async () => {
    console.log("Hello, World!");
    try {
        const client = new BedrockRuntimeClient({ region: 'us-east-1' });
        const prompt = 'Tell me a joke'; // 固定プロンプト
        const command = new InvokeModelCommand({
            modelId: 'anthropic.claude-v2',
            body: JSON.stringify({ prompt: `\n\nHuman: ${prompt}\n\nAssistant:`, max_tokens_to_sample: 100 }),
        });
        const response = await client.send(command);
        console.log('Bedrock response:', response.body);
    }
    catch (error) {
        const errorMessage = `Failed to invoke Bedrock: ${error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};
