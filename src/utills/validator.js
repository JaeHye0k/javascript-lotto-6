import { MESSAGES } from "../constant/messages.js";

/** @type {(cost:Number)=>undefined} 구입 금액에 대한 유효성 검사를 수행한다. */
function checkCost(cost) {
	if (isNaN(cost)) throw new Error(MESSAGES.ERROR.NAN);
	if (cost % 1000 !== 0) throw new Error(MESSAGES.ERROR.NOT_DIVIDED);
}

/** @type {(winningNumber: Number[])=>undefined} 당첨 번호에 대한 유효성 검사를 수행한다.*/
function checkLottoNumber(winningNumber) {
	if (winningNumber.length !== 6) throw new Error(MESSAGES.ERROR.NOT_SIX_DIGIT);
	if (new Set(winningNumber).size !== 6) throw new Error(MESSAGES.ERROR.DUPLICATION);
	for (const num of winningNumber) {
		if (isNaN(num)) throw new Error(MESSAGES.ERROR.NAN);
		if (num < 1 || num > 45) throw new Error(MESSAGES.ERROR.OUT_OF_RANGE);
	}
}

/** @type {(bonusNumber: Number[])=>undefined} 보너스 번호에 대한 유효성 검사를 수행한다.*/
function checkBonusNumber(bonusNumber) {
	if (bonusNumber.length !== 1) throw new Error(MESSAGES.ERROR.NOT_ONE_DIGIT);
	if (isNaN(bonusNumber)) throw new Error(MESSAGES.ERROR.NAN);
	if (bonusNumber < 1 || bonusNumber > 45) throw new Error(MESSAGES.ERROR.OUT_OF_RANGE);
}

/** @type {(numbers: Number[])=>undefined} 보너스 번호와 당첨 번호를 합쳐서 중복된 번호가 있는지 검사한다.*/
function checkDuplication(numbers) {
	if (new Set(numbers).size !== 7) throw new Error(MESSAGES.ERROR.DUPLICATION);
}

export const validator = { checkCost, checkBonusNumber, checkLottoNumber, checkDuplication };
