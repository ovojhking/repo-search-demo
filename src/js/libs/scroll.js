function getScrollTop() {
	let scrollTop = 0;
	let bodyScrollTop = 0;
	let documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}

function getScrollHeight() {
	let scrollHeight = 0;
	let bodyScrollHeight = 0;
	let documentScrollHeight = 0;
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0)
		? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}

function getWindowHeight() {
	let windowHeight = 0;
	if (document.compatMode === 'CSS1Compat') {
		windowHeight = document.documentElement.clientHeight;
	} else {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}

function isScrollToBottom() {
	// 因為手機版滾動時的偵測不太靈敏，所以把設定值範圍拉大
	// if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
	if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 50) {
		return true;
	}
	return false;
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

export {
	getScrollTop,
	getScrollHeight,
	getWindowHeight,
	isScrollToBottom,
	scrollToTop,
};
