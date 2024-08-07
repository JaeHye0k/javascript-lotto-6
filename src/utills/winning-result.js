import { commaPerThree } from "./regex.js";

// 등수에 매치되는 상금
const rankMoney = {
	1: 2_000_000_000,
	2: 30_000_000,
	3: 1_500_000,
	4: 50_000,
	5: 5_000,
};

// 등수에 매치되는 문자열 (n개 일치)
const rankMatchCount = {
	1: "6개 일치",
	2: "5개 일치, 보너스 볼 일치",
	3: "5개 일치",
	4: "4개 일치",
	5: "3개 일치",
};

/**
 * 상금의 숫자 세 자리마다 콤마를 추가한다.
 * @param {Number} money 등수에 매치되는 상금
 * @returns {String} 세자리 마다 콤마 추가한 상금
 */
function moneyFormat(money) {
	return money.toString().replace(commaPerThree, ",");
}

/**
 * 당첨 내역 한 줄을 반환한다.
 * @param {Number} rank 등수
 * @param {Number} count 해당 등수에 존재하는 로또의 개수
 * @returns {String} 당첨 내역 한 줄
 */
function getWinningResult(rank, count) {
	const money = moneyFormat(rankMoney[rank]);
	return `${rankMatchCount[rank]} (${money}원) - ${count}개`;
}

/**
 * 당첨내역 전체를 반환한다.
 * @param {Array[Lotto[]]} ranks 등수(인덱스)별 로또를 저장한 2차원 배열
 * @returns {String} 당첨 내역 전체
 */
export function getWinningResults(ranks) {
	let result = "";
	for (let i = ranks.length - 1; i >= 1; i--) {
		result += getWinningResult(i, ranks[i].length) + "\n";
	}
	return result;
}
