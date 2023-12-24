module.exports = function(eleventyConfig) {

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/js");

return {
		dir: {
			input : "src",
			output : "_site",
			includes : "_includes",
			data : "_data"
		},
		templateFormats : ["html", "md", "njk", "css"],
		htmlTemplateEngine : "njk",
		markdownTemplate : "njk",
		setUseGitIgnore : false
	};
}