(() => {
	const filters = document.querySelectorAll('[data-portfolio-filter]');
	const cards = document.querySelectorAll('[data-portfolio-category]');
	const lightbox = document.getElementById('portfolio-lightbox');
	const lightboxImage = document.getElementById('portfolio-lightbox-image');
	const lightboxTitle = document.getElementById('portfolio-lightbox-title');
	const lightboxCategory = document.getElementById('portfolio-lightbox-category');
	const lightboxFilename = document.getElementById('portfolio-lightbox-filename');
	if (!filters.length || !lightbox) return;

	filters.forEach((filter) => filter.addEventListener('click', () => {
		const selected = filter.dataset.portfolioFilter;
		filters.forEach((button) => {
			const active = button === filter;
			button.classList.toggle('active', active);
			button.setAttribute('aria-pressed', String(active));
		});
		cards.forEach((card) => {
			card.closest('.portfolio-card').hidden = selected !== 'all' && card.dataset.portfolioCategory !== selected;
		});
	}));

	document.querySelectorAll('[data-portfolio-image]').forEach((button) => button.addEventListener('click', () => {
		lightboxImage.src = button.dataset.portfolioImage;
		lightboxImage.alt = `${button.dataset.portfolioCategory} project, ${button.dataset.portfolioFilename}`;
		lightboxTitle.textContent = button.dataset.portfolioTitle;
		lightboxCategory.textContent = button.dataset.portfolioCategory;
		lightboxFilename.textContent = button.dataset.portfolioFilename;
		lightbox.showModal();
	}));

	lightbox.querySelector('.portfolio-lightbox-close').addEventListener('click', () => lightbox.close());
	lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
})();
