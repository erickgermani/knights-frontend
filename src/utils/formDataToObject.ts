function formDataToObject<T extends Record<string, any>>(
	formData: FormData,
): T {
	const object: Partial<T> = {};

	formData.forEach((value, key) => {
		object[key as keyof T] = value.toString() as any;
	});

	return object as T;
}

export { formDataToObject };
