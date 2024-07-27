const scrollToTarget = (target: string) => {
	const element = document.querySelector(target) as HTMLElement | null;

	if (!element) return;

	const scrollOptions = {
		top: element.offsetTop,
	};

	if (scrollY > scrollOptions.top) scrollTo(scrollOptions);
};

export { scrollToTarget };
