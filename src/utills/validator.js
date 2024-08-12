import { MESSAGES } from "../constant/messages.js";

function isNotSixDigit(numbers) {
	if (numbers.length !== 6) throw new Error(MESSAGES.ERROR.NOT_SIX_DIGIT);
}

function isNotOneDigit(numbers) {
	if (numbers.length !== 1) throw new Error(MESSAGES.ERROR.NOT_ONE_DIGIT);
}
function isIncludeDuplicationNumber(numbers, originLenth) {
	if (new Set(numbers).size !== originLenth) throw new Error(MESSAGES.ERROR.DUPLICATION);
}
function isIncludeNaN(numbers) {
	if (numbers.some((num) => typeof num !== "number" || isNaN(num)))
		throw new Error(MESSAGES.ERROR.NAN);
}
function isIncludeOutOfRangeNumber(numbers) {
	if (numbers.some((num) => num < 1 || num > 45)) throw new Error(MESSAGES.ERROR.OUT_OF_RANGE);
}
function isNotDivieded(cost) {
	if (cost === 0 || cost % 1000 !== 0) throw new Error(MESSAGES.ERROR.NOT_DIVIDED);
}
function isNaNCost(cost) {
	if (typeof cost !== "number" || isNaN(cost)) throw new Error(MESSAGES.ERROR.NAN);
}

export const validator = {
	isNotSixDigit,
	isNotOneDigit,
	isIncludeDuplicationNumber,
	isIncludeNaN,
	isIncludeOutOfRangeNumber,
	isNotDivieded,
	isNaNCost,
};
