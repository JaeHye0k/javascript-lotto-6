import { commaPerThree } from "./regex.js";
import { rankMoney, rankMatchCount } from "../constant/rank.js";
import { MESSAGES } from "../constant/messages.js";

const input = {
	/** @type {(cost:String)=>Number} 입력받은 구입 금액을 처리 형식에 맞게 변환한다. */
	cost(cost) {
		return +cost;
	},

	/**  @type {(numbers:String)=>Number[]} 입력받은 당첨 번호를 처리 형식에 맞게 변환한다. */
	winningNumber(numbers) {
		return numbers.split(",").map(Number);
	},

	/** @type {(number:String)=>Number[]} 입력받은 보너스 번호를 처리 형식에 맞게 변환한다. */
	bonusNumber(number) {
		return [+number];
	},
};

const output = {
	/** @type {(lottos:Lotto[])=>String} 구입한 로또들을 출력 형식에 맞게 변환한다.*/
	issuedLottos(lottos) {
		return lottos.map((lotto) => lottoNumToString(lotto.getNumbers())).join("\n");
	},

	/** @type {(count:Number)=>String} 구입한 로또의 개수를 출력 형식에 맞게 변환한다. */
	purchaseCount(count) {
		return `\n${count}개를 구매했습니다.`;
	},

	/** @type {(ranks:Lotto[][])=>String} 당첨내역 전체를 출력 형식에 맞게 변환한다 */
	winningResults(ranks) {
		let result = MESSAGES.OUTPUT.WINNING_RESULT;
		for (let i = ranks.length - 1; i >= 1; i--) {
			result += getWinningResult(i, ranks[i].length) + "\n";
		}
		return result.trimEnd();
	},

	/** @type {(incomeRate:Number)=>String} 총 수익률을 출력 형식에 맞게 변환한다. */
	incomeRate(incomeRate) {
		return `총 수익률은 ${incomeRate}%입니다.`;
	},
};

/**
 * 구입한 로또 번호를 출력 형식에 맞게 변환한다.
 * @param {Number[]} numbers 로또 번호
 * @returns {String}
 */
function lottoNumToString(numbers) {
	return `[${numbers.join(", ")}]`;
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

export const format = { input, output };
