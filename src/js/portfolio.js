(() => {
	const filters = document.querySelectorAll('[data-portfolio-filter]');
	const cards = document.querySelectorAll('[data-portfolio-category]');
	const sections = document.querySelectorAll('[data-portfolio-section]');
	const lightbox = document.getElementById('portfolio-lightbox');
	const lightboxImage = document.getElementById('portfolio-lightbox-image');
	const lightboxTitle = document.getElementById('portfolio-lightbox-title');
	const lightboxCategory = document.getElementById('portfolio-lightbox-category');
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
		sections.forEach((section) => {
			section.hidden = selected !== 'all' && section.dataset.portfolioSection !== selected;
		});
	}));

	document.querySelectorAll('[data-portfolio-image]').forEach((button) => button.addEventListener('click', () => {
		lightboxImage.src = button.dataset.portfolioImage;
		lightboxImage.alt = `${button.dataset.portfolioCategory} portfolio image`;
		lightboxTitle.textContent = 'Selected work';
		lightboxCategory.textContent = button.dataset.portfolioCategory;
		lightbox.showModal();
	}));

	lightbox.querySelector('.portfolio-lightbox-close').addEventListener('click', () => lightbox.close());
	lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
})();
