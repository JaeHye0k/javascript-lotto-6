import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "../constant/messages.js";
import { format } from "./format.js";
import { validator } from "./validator.js";

let numbers;

const input = {
	/**
	 * 구입 비용 입력
	 * @returns {Promise<Number>}
	 */
	async cost() {
		const cost = await Console.readLineAsync(MESSAGES.INPUT.COST); // 구입 비용 입력
		const formattedCost = format.input.cost(cost);
		validator.checkCost(formattedCost);
		return formattedCost;
	},
	/**
	 * 당첨 번호 입력
	 * @returns {Promise<Number[]>}
	 */
	async winningNumber() {
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
	async bonusNumber() {
		const bonusNumber = await Console.readLineAsync(MESSAGES.INPUT.BONUS_NUM); // 보너스 번호 입력
		const formattedBonusNumber = format.input.bonusNumber(bonusNumber);
		validator.checkBonusNumber(formattedBonusNumber);
		numbers = [...numbers, ...formattedBonusNumber];
		validator.checkDuplication(numbers);
		return formattedBonusNumber;
	},
};

const output = {
	/**
	 * 구입한 로또 개수 출력
	 *  @type {(issuedLottos: Lotto[]) => undefined}
	 */
	purchaseCount(issuedLottos) {
		const purchaseCount = format.output.purchaseCount(issuedLottos.length);
		Console.print(purchaseCount);
	},
	/**
	 * 구입한 로또 번호 출력
	 * @type {(issuedLottos: Lotto[]) => undefined}
	 */
	lotto(issuedLottos) {
		const lottos = format.output.issuedLottos(issuedLottos);
		Console.print(lottos);
	},
	/**
	 * 당첨 내역 출력
	 * @type {(ranks: Lotto[][]) => undefined}
	 */
	winningResult(ranks) {
		const winningResult = format.output.winningResults(ranks);
		Console.print(winningResult);
	},
	/**
	 * 수익률 출력
	 * @type {(incomeRate: Number) => undefined}
	 */
	incomeRate(incomeRate) {
		const rate = format.output.incomeRate(incomeRate);
		Console.print(rate);
	},
};

/**
 * 에러가 발생하지 않을 때까지 반복해서 입력받는 함수
 * @type {(input:function)=>Number|Number[]}
 */
async function repeat(input) {
	let success = false;
	let result;
	while (!success) {
		try {
			result = await input();
			success = true;
		} catch (err) {
			console.error(err);
		}
	}
	return result;
}

const inputHandler = {
	get(target, prop, receiver) {
		if (typeof target[prop] === "function") {
			return () => repeat(target[prop]);
		}
		return Reflect.get(target, prop, receiver);
	},
};

const proxiedInput = new Proxy(input, inputHandler);

export { proxiedInput, output };
