import ky, { type Input } from 'ky';

type PostDataResponse = {
	success: boolean;
};

export const sendForm = async <T extends Record<string, string>>(url: Input, payload: T) => {
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
