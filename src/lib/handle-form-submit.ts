import { isDev } from '@/constants';
import ky from 'ky';

type PostSubmissionResponse = {
	success: boolean;
};

/**
 * Posts form payload data to a PHP endpoint
 * @param payload - Object containing form field key-value pairs
 * @returns Promise resolving to submission response or error object
 */
export const postFormPayload = async <T extends Record<string, string>>(payload: T) => {
	const url = isDev ? 'http://localhost:8000/send.php' : '/send.php';

	const formData = new FormData();

	for (const [key, value] of Object.entries(payload)) {
		if (value !== undefined && value !== null) {
			formData.append(key, value);
		}
	}

	try {
		const response = await ky.post(url, { body: formData }).json<PostSubmissionResponse>();

		return response;
	} catch (error) {
		console.error('Error:', error);
		return { success: false };
	}
};
