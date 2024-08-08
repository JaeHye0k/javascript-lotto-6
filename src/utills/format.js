import { commaPerThree } from "./regex.js";
import { rankMoney, rankMatchCount } from "../constant/rank.js";
import { MESSAGES } from "../constant/messages.js";

/**
 * 구입한 로또 번호를 출력 형식에 맞게 변환한다.
 * @param {Number[]} numbers 로또 번호
 * @returns {String}
 */
function lottoNumToString(numbers) {
	return `[${numbers.join(", ")}]`;
}

/**
 * 구입한 로또들을 출력 형식에 맞게 변환한다.
 * @param {Lotto[]} lottos
 * @returns {String}
 */
function issuedLottos(lottos) {
	return lottos.map((lotto) => lottoNumToString(lotto.getNumbers())).join("\n");
}

/**
 * 구입한 로또의 개수를 출력 형식에 맞게 변환한다.
 * @param {Number} count
 * @returns {String}
 */
function purchaseCount(count) {
	return `\n${count}개를 구매했습니다.`;
}

/**
 * 상금의 숫자 세 자리마다 콤마를 추가한다.
 * @param {Number} money 등수에 매치되는 상금
 * @returns {String} 세자리 마다 콤마 추가한 상금
 */
function addComma(money) {
	return money.toString().replace(commaPerThree, ",");
}

/**
 * 당첨 내역 한 줄을 출력 형식에 맞게 변환한다.
 * @param {Number} rank 로또 등수
 * @param {Number} count 해당 등수에 존재하는 로또의 개수
 * @returns {String} 당첨 내역 한 줄
 */
function getWinningResult(rank, count) {
	const money = addComma(rankMoney[rank]);
	return `${rankMatchCount[rank]} (${money}원) - ${count}개`;
}

/**
 * 당첨내역 전체를 출력 형식에 맞게 변환한다.
 * @param {Array[][]} ranks 등수(인덱스)별 로또를 저장한 2차원 배열
 * @returns {String} 당첨 내역 전체
 */
function winningResults(ranks) {
	let result = MESSAGES.OUTPUT.WINNING_RESULT;
	for (let i = ranks.length - 1; i >= 1; i--) {
		result += getWinningResult(i, ranks[i].length) + "\n";
	}
	return result.trimEnd();
}

/**
 * 총 수익률을 출력 형식에 맞게 변환한다.
 * @param {Number} incomeRate
 * @returns {String}
 */
function incomeRate(incomeRate) {
	return `총 수익률은 ${incomeRate}%입니다.`;
}

/**
 * 입력받은 구입 금액을 처리 형식에 맞게 변환한다.
 * @param {String} cost
 * @returns {Number}
 */
function cost(cost) {
	return +cost;
}

/**
 * 입력받은 당첨 번호를 처리 형식에 맞게 변환한다.
 * @param {String} numbers
 * @returns {Number[]}
 */
function winningNumber(numbers) {
	return numbers.split(",").map(Number);
}

/**
 * 입력받은 보너스 번호를 처리 형식에 맞게 변환한다.
 * @param {String} number
 * @returns {Number[]}
 */
function bonusNumber(number) {
	return [+number];
}

export const format = {
	input: { cost, winningNumber, bonusNumber },
	output: { issuedLottos, purchaseCount, winningResults, incomeRate },
};
