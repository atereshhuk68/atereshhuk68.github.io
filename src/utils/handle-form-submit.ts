import { isDev } from '../../constants';
import ky from 'ky';

type PostDataResponse = {
	success: boolean;
};

export const sendForm = async <T extends Record<string, string>>(payload: T) => {
	const url = isDev ? 'http://localhost:8000/send.php' : '/send.php';

	const formData = new FormData();

	for (const [key, value] of Object.entries(payload)) {
		if (value !== undefined && value !== null) {
			formData.append(key, value);
		}
	}

	try {
		const response = await ky.post(url, { body: formData }).json<PostDataResponse>();

		return response;
	} catch (error) {
		console.error('Error:', error);
		return { success: false };
	}
};
