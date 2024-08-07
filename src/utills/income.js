import { rankMoney } from "../constant/rank.js";

/**
 * 총 수익률을 반환한다.
 * @param {Array[][]} ranks 등수(인덱스)별 로또를 저장한 2차원 배열
 * @param {Number} cost 총 로또 구입 비용
 * @returns {String} 총 수익률
 */
export function getTotalIncomeRate(ranks, cost) {
	const totalIncome = getTotalIncome(ranks);
	const totalIncomeRate = getIncomeRate(cost, totalIncome);
	return totalIncomeRate;
}

/**
 * 총 수익을 반환한다.
 * @param {Array[Lotto[]]} ranks 등수(인덱스)별 로또를 저장한 2차원 배열
 * @returns {Number} 총 수익
 */
function getTotalIncome(ranks) {
	let income = 0;
	for (let i = 1; i < ranks.length; i++) {
		income += getIncome(i, ranks[i].length);
	}
	return income;
}

/**
 * 현재 등수에서 당첨된 로또의 수익을 반환한다.
 * @param {Number} rank 로또 등수
 * @param {Number} count 해당 등수에 존재하는 로또의 개수
 * @returns {Number} 현재 등수에서의 수익
 */
function getIncome(rank, count) {
	return rankMoney[rank] * count;
}

/**
 * 수익률을 반환한다.
 * @param {Number} cost 비용
 * @param {Number} income 수익
 * @returns {String} 수익률
 */
function getIncomeRate(cost, income) {
	return ((income / cost) * 100).toFixed(1);
}
