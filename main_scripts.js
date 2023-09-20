/*KATEGORIE*/
let categorySecondDesc;
if (document.querySelector(".type-category")) {
	/*rearrange menu*/
	function rearangeCategory() {
		$("#content .category-top").insertBefore(".content-wrapper-in");
		document.querySelector("#category-filter-hover").classList.add("visible");
	}
	rearangeCategory();

	/*zmena serazeni a filteru*/
	function editCategoryArrangment() {
		document.addEventListener("ShoptetDOMContentLoaded", function () {
			$("#content .category-top").remove();
			document.querySelector("#category-filter-hover").classList.add("visible");
			readMoreSecondButton();
		});
	}
	document.addEventListener("DOMContentLoaded", editCategoryArrangment, { once: true });

	/*read more*/
	const categoryPerexReadMore = document.querySelector(".category-perex > table");
	const categorySecondReadMore = document.querySelector(".category__secondDescription > table");

	function readMoreFirstButton() {
		if (categoryPerexReadMore) {
			const showMoreCategory = document.createElement("span");
			const showLessCategory = document.createElement("span");

			const showMoreCategoryContent = document.createTextNode("Zobrazit více");
			const showLessategoryContent = document.createTextNode("Zobrazit méně");

			showMoreCategory.appendChild(showMoreCategoryContent);
			showLessCategory.appendChild(showLessategoryContent);

			showMoreCategory.classList.add("category-read", "more");
			showLessCategory.classList.add("category-read", "less");

			let categoryPerex = document.querySelector(".category-perex");
			categoryPerex.appendChild(showMoreCategory);
			categoryPerex.appendChild(showLessCategory);

			showMoreCategory.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessCategory.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}

	function readMoreSecondButton() {
		if (categorySecondReadMore) {
			const showMoreCategorySecond = document.createElement("span");
			const showLessCategorySecond = document.createElement("span");

			const showMoreCategoryContentSecond = document.createTextNode("Zobrazit více");
			const showLessategoryContentSecond = document.createTextNode("Zobrazit méně");

			showMoreCategorySecond.appendChild(showMoreCategoryContentSecond);
			showLessCategorySecond.appendChild(showLessategoryContentSecond);

			showMoreCategorySecond.classList.add("category-read", "more");
			showLessCategorySecond.classList.add("category-read", "less");

			categorySecondDesc = document.querySelector(".category__secondDescription");
			categorySecondDesc.appendChild(showMoreCategorySecond);
			categorySecondDesc.appendChild(showLessCategorySecond);

			showMoreCategorySecond.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessCategorySecond.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}
	readMoreFirstButton();
	readMoreSecondButton();
}

/*faq*/
if (document.querySelector(".contact-faq")) {
	$(".contact-faq-question > p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
}
/*krok 1 kosik*/
if (document.querySelector("body.in-kosik")) {
	rearangeSummary();
	function rearangeSummary() {
		const summaryInsertPlace = $(".summary-wrapper .price-wrapper");
		$(".extra.delivery").parent().parent().insertBefore(summaryInsertPlace);
		$(".delivery-time").insertBefore(summaryInsertPlace);
		$(".discount-coupon").insertBefore(summaryInsertPlace);
		$(".extra.gift").insertAfter(".cart-summary h4");
	}
	document.addEventListener("ShoptetDOMCartContentLoaded", rearangeSummary);
}

/*kosik 2*/
if (document.querySelector("body.in-krok-1")) {
	$(".checkout-box").appendTo(".co-basic-information");

	$(".next-step").appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");

	const paymentBlock = $(".co-payment-method");
	paymentBlock.addClass("unactive");

	/*AKTIVOVAT I KDYŽ SE ZMĚNÍ ZEMĚ*/
	document.addEventListener(
		"shoptet.checkoutShared.updatePriceSummary",
		function () {
			removeDelivery();
			removePayment();
		},
		{ once: true }
	);
	let deliveryLabels = $(".co-delivery-method > .shipping-billing-table > .radio-wrapper");
	let paymentLabels = $(".co-payment-method > .shipping-billing-table > .radio-wrapper");
	let checkedPayment = false;

	deliveryLabels.each(function () {
		$(this).on("mousedown", function () {
			paymentBlock.removeClass("unactive");
		});
	});
	document.addEventListener("ShoptetBillingMethodUpdated", function () {
		if (!checkedPayment) {
			removePayment();
		}
	});
	document.addEventListener("shoptet.checkoutShared.updatePriceSummary", function () {
		if (!checkedPayment) {
			removePayment();
		}
	});
	paymentLabels.each(function () {
		$(this).on("mousedown", function () {
			checkedPayment = true;
		});
		$(this).on("click", function () {
			$("html, body").animate(
				{
					scrollTop: $("#checkoutSidebar").offset().top,
				},
				300
			);
		});
	});
}
function removeDelivery() {
	$(".co-delivery-method input").prop("checked", false);
	$(".co-delivery-method .radio-wrapper.active").removeClass("active");
	$(".recapitulation-shipping-billing-info").eq(0).html("<span>Zvolte dopravu</span>Doprava");
}

function removePayment() {
	$(".co-payment-method input").prop("checked", false);
	$(".co-payment-method .radio-wrapper.active").removeClass("active");
	$(".recapitulation-shipping-billing-info").eq(1).html("<span>Zvolte platbu</span>Platba");
}

/*posledni krok objednavky*/
if (document.querySelector("body.in-krok-2")) {
	$(".next-step").appendTo(".order-summary-inner");
	$(".cart-items").last().removeClass("cart-items").addClass("order-recapitulation");
	$(".checkout-box").appendTo(".order-summary-inner");
	$(".consents-first").appendTo(".order-summary-inner");
	$(".next-step").appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
	$(".co-box.co-box-additional").appendTo(".co-contact-information");
	$(".company-shopping").insertAfter(".co-billing-address > fieldset");
}