function rand(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val));
}
