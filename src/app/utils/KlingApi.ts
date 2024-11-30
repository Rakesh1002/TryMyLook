import jwt from 'jsonwebtoken';
import { Buffer } from 'buffer';

const API_BASE_URL = 'https://api.klingai.com';
const ACCESS_KEY = process.env.KLING_ACCESS_KEY;
const SECRET_KEY = process.env.KLING_SECRET_KEY;

function generateApiToken(): string {
  const payload = {
    iss: ACCESS_KEY,
    exp: Math.floor(Date.now() / 1000) + 1800,
    nbf: Math.floor(Date.now() / 1000) - 5,
  };

  if (SECRET_KEY === undefined) {
    throw new Error('SECRET_KEY is undefined');
  }

  return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256' });
}
async function makeApiRequest(
  endpoint: string,
  method = 'POST',
  data?: unknown
) {
  const token = generateApiToken();
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  console.log('Request URL:', url);
  console.log('Request Headers:', headers);
  console.log('Request Body:', data);

  const response = await fetch(url, options);
  const responseBody = await response.text();
  console.log('Response Status:', response.status);
  console.log('Response Body:', responseBody);

  if (!response.ok) {
    console.error(
      `API request failed: ${response.status} ${response.statusText}`,
      responseBody
    );
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return JSON.parse(responseBody);
}

async function blobToBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}
async function virtualTryOn(modelImage: Blob, apparelImage: Blob) {
  console.log('Starting virtual try-on process');
  console.log('Model image size:', modelImage.size);
  console.log('Apparel image size:', apparelImage.size);

  const modelImageBase64 = await blobToBase64(modelImage);
  const apparelImageBase64 = await blobToBase64(apparelImage);

  const createTaskEndpoint = '/v1/images/kolors-virtual-try-on';
  const taskData = {
    model_name: 'kolors-virtual-try-on-v1',
    human_image: modelImageBase64,
    cloth_image: apparelImageBase64,
  };

  console.log('Sending task data:', {
    ...taskData,
    human_image: '[BASE64_STRING]',
    cloth_image: '[BASE64_STRING]',
  });

  const taskResponse = await makeApiRequest(
    createTaskEndpoint,
    'POST',
    taskData
  );
  console.log('Task creation response:', taskResponse);

  const taskId = taskResponse.data?.task_id;
  if (!taskId) {
    throw new Error('Failed to create task');
  }

  // Wait for 5 seconds before the first status check
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Poll for task status
  const queryTaskEndpoint = `/v1/images/kolors-virtual-try-on/${taskId}`;
  let taskStatus = 'submitted';
  let taskResult;
  let retryCount = 0;
  const maxRetries = 5;

  while (
    taskStatus !== 'succeed' &&
    taskStatus !== 'failed' &&
    retryCount < maxRetries
  ) {
    try {
      const statusResponse = await makeApiRequest(queryTaskEndpoint, 'GET');
      console.log('Task status response:', statusResponse);

      taskStatus = statusResponse.data?.task_status;
      taskResult = statusResponse.data?.task_result;

      if (taskStatus === 'failed') {
        throw new Error(`Task failed: ${statusResponse.data?.task_status_msg}`);
      }

      if (taskStatus !== 'succeed') {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(
        `Error checking task status (attempt ${retryCount + 1}):`,
        error
      );
      retryCount++;
      if (retryCount >= maxRetries) {
        throw new Error('Max retries reached while checking task status');
      }
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (taskResult?.images?.length > 0) {
    return taskResult.images[0].url;
  } else {
    throw new Error('No output URL in the response');
  }
}

async function imageToVideo(
  image: Blob,
  prompt: string,
  cfg_scale = 0.5,
  mode: 'std' | 'pro' = 'std',
  duration: '5' | '10' = '5',
  negative_prompt?: string
) {
  const imageBase64 = await blobToBase64(image);

  const createTaskEndpoint = '/v1/images/qingque-img2video';
  const taskData = {
    model_name: 'kling-v1',
    image: imageBase64,
    prompt: prompt,
    cfg_scale: cfg_scale,
    mode: mode,
    duration: duration,
    negative_prompt: negative_prompt || undefined,
  };

  const taskResponse = await makeApiRequest(
    createTaskEndpoint,
    'POST',
    taskData
  );
  const taskId = taskResponse.data?.task_id;
  if (!taskId) {
    throw new Error('Failed to create task');
  }

  // Wait for 5 seconds before the first status check
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Poll for task status
  const queryTaskEndpoint = `/v1/images/qingque-img2video/${taskId}`;
  let taskStatus = 'submitted';
  let taskResult;
  let retryCount = 0;
  const maxRetries = 5;

  while (
    taskStatus !== 'succeed' &&
    taskStatus !== 'failed' &&
    retryCount < maxRetries
  ) {
    try {
      const statusResponse = await makeApiRequest(queryTaskEndpoint, 'GET');
      console.log('Task status response:', statusResponse);

      taskStatus = statusResponse.data?.task_status;
      taskResult = statusResponse.data?.task_result;

      if (taskStatus === 'failed') {
        throw new Error(`Task failed: ${statusResponse.data?.task_status_msg}`);
      }

      if (taskStatus !== 'succeed') {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(
        `Error checking task status (attempt ${retryCount + 1}):`,
        error
      );
      retryCount++;
      if (retryCount >= maxRetries) {
        throw new Error('Max retries reached while checking task status');
      }
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (taskResult?.video?.length > 0) {
    return taskResult.video[0].url;
  } else {
    throw new Error('No output URL in the response');
  }
}

export { virtualTryOn, imageToVideo };
