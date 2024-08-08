import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "../constant/messages.js";
import { format } from "./format.js";
import { validator } from "./validator.js";

let numbers;

export const input = {
	/**
	 * 구입 비용 입력
	 * @returns {Promise<Number>}
	 */
	cost: async () => {
		const cost = await Console.readLineAsync(MESSAGES.INPUT.COST); // 구입 비용 입력
		const formattedCost = format.input.cost(cost);
		validator.checkCost(formattedCost);
		return formattedCost;
	},
	/**
	 * 당첨 번호 입력
	 * @returns {Promise<Number[]>}
	 */
	winningNumber: async () => {
		const winningNumber = await Console.readLineAsync(MESSAGES.INPUT.WINNING_NUM); // 당첨 번호 입력
		const formattedWinningNumber = format.input.winningNumber(winningNumber);
		validator.checkWinningNumber(formattedWinningNumber);
		numbers = [...formattedWinningNumber];
		return formattedWinningNumber;
	},
	/**
	 * 보너스 번호 입력
	 * @returns {Promise<Number[]>}
	 */
	bonusNumber: async () => {
		const bonusNumber = await Console.readLineAsync(MESSAGES.INPUT.BONUS_NUM); // 보너스 번호 입력
		const formattedBonusNumber = format.input.bonusNumber(bonusNumber);
		validator.checkBonusNumber(formattedBonusNumber);
		numbers = [...numbers, formattedBonusNumber];
		validator.checkDuplication(numbers);
		return formattedBonusNumber;
	},
};

export const output = {
	/**
	 * 구입한 로또 개수 출력
	 *  @type {(issuedLottos: Lotto[]) => undefined}
	 */
	purchaseCount: (issuedLottos) => {
		const purchaseCount = format.output.purchaseCount(issuedLottos.length);
		Console.print(purchaseCount);
	},
	/**
	 * 구입한 로또 번호 출력
	 * @type {(issuedLottos: Lotto[]) => undefined}
	 */
	lotto: (issuedLottos) => {
		const lottos = format.output.issuedLottos(issuedLottos);
		Console.print(lottos);
	},
	/**
	 * 당첨 내역 출력
	 * @type {(ranks: Lotto[][]) => undefined}
	 */
	winningResult: (ranks) => {
		const winningResult = format.output.winningResults(ranks);
		Console.print(winningResult);
	},
	/**
	 * 수익률 출력
	 * @type {(incomeRate: Number) => undefined}
	 */
	incomeRate: (incomeRate) => {
		const rate = format.output.incomeRate(incomeRate);
		Console.print(rate);
	},
};
