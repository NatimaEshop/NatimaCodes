function loadNextPageOfProducts() {
	let loadProducts;
	loadProducts = document.querySelector(".load-products");

	if ($(".lb-pagination__btn").length) {
		loadProducts = document.querySelector(".lb-pagination__btn");
	}

	if (loadProducts) {
		const observerOptions = {
			root: null, // Use the viewport as the root
			rootMargin: "-50% 0px", // Adjust the margin to trigger when the element is in the middle of the screen
			threshold: 0, // Trigger as soon as any part of the element is visible within the rootMargin
		};

		const observerCallback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadProducts.click();
					observer.unobserve(loadProducts); // Stop observing after the click
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);
		observer.observe(loadProducts);
	}
}

if (document.body.classList.contains("type-category")) {
	document.addEventListener(
		"DOMContentLoaded",
		function () {
			loadNextPageOfProducts();
		},
		{ once: true }
	);
}
/*cz a sk varianta*/
if (document.body.classList.contains("in-vyhledavani") || document.body.classList.contains("in-vyhledavanie")) {
	document.addEventListener(
		"resizeEnd",
		function () {
			loadNextPageOfProducts();
		},
		{ once: true }
	);
}

document.addEventListener(
	"ShoptetDOMSearchResultsLoaded",
	function () {
		loadNextPageOfProducts();
	},
	{ once: true }
);

/*
if (document.body.classList.contains("type-posts-listing")) {
	!(function (a, b, c) {
		if (
			(
			a(b).load(function () {
				var b = function () {
					a(".news-item").length &&
						a(".news-item").each(function () {
							var b = a(this),
								c = a(this).find(".description").text(),
								d = c.replace(/[^\w ]/g, "").split(/\s+/).length,
								f = Math.floor(d / 200) + 1,
								g = f + " min";
							if (
								(b.find(".reading-time").length ||
									(b.find("time").length
										? a(
												'<div class="reading-time">' +
													g +
													'</div>'
										  ).insertAfter(b.find("time"))
										: a(
											'<div class="reading-time">' +
											g +
											'</div>'
										  ).insertAfter(b.find(".title")))
								)
							) 
						});
				};
				b(),
					c.addEventListener("ShoptetDOMContentLoaded", function () {
						b();
					});
			}),
			a(".type-post").length)
		) 
	})(window.jQuery, window, document);
}
*/

/*-------------------doba cteni až nebude žádný starý článek*/
/*
if (document.body.classList.contains("type-posts-listing")) {
    (function ($, window, document) {
        $(document).ready(function () {
            function calculateReadingTime() {
                $(".news-item").each(function () {
                    var $newsItem = $(this);
                    var descriptionText = $newsItem.find(".description").text();
                    var wordCount = descriptionText.replace(/[^\w ]/g, "").split(/\s+/).length;
                    var readingTime = Math.floor(wordCount / 135)  + " min";

                    if (!$newsItem.find(".reading-time").length) {
                        var $readingTimeDiv = $('<div class="reading-time">' + readingTime + '</div>');
                        if ($newsItem.find("time").length) {
                            $readingTimeDiv.insertAfter($newsItem.find("time"));
                        } else {
                            $readingTimeDiv.insertAfter($newsItem.find(".title"));
                        }
                    }
                });
            }

            calculateReadingTime();
            document.addEventListener("ShoptetDOMContentLoaded", calculateReadingTime);
        });
    })(window.jQuery, window, document);
}
	*/
