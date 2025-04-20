import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
    langGraphPlatformEndpoint,
} from '@copilotkit/runtime';
import OpenAI from 'openai';
import { NextRequest } from 'next/server';

// Use Deepseek API endpoint and key
const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, // Make sure this env variable is set
    baseURL: 'https://api.deepseek.com' // Deepseek API endpoint
});
const serviceAdapter = new OpenAIAdapter({ openai: deepseek }); // Pass the deepseek client
const deploymentUrl = process.env.DEPLOYMENT === 'local' ? process.env.LOCAL_DEPLOYMENT_URL : process.env.DEPLOYMENT_URL
const runtime = new CopilotRuntime(
    /*{
    remoteEndpoints: [
        langGraphPlatformEndpoint({
            deploymentUrl: deploymentUrl!,
            //langsmithApiKey: process.env.LANGSMITH_API_KEY!,
            agents: [{
                name: 'agent',
                description: 'Research assistant',
            }],
        })
    ]
}*/
    );

export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: '/api/copilotkit',
    });

    return handleRequest(req);
};