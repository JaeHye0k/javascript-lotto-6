import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { getTotalIncomeRate } from "./utills/income.js";
import { proxiedInput, output } from "./utills/io.js";

const START_NUM = 1,
	END_NUM = 45,
	NUM_COUNT = 6,
	MAX_RANK = 5;

/**
 * @property {Lotto[]} issuedLottos 발행된 로또 배열
 * @property {Number} cost 구입금액
 * @property {Number[]} winningNumber 당첨 번호
 * @property {Number[]} bonusNumber 보너스 번호
 * @property {Lotto[][]} ranks 등수 별 로또 배열
 * @property {Number} incomeRate 수익률
 */
class App {
	#issuedLottos;
	#cost;
	#winningNumber;
	#bonusNumber;
	#ranks;
	#incomeRate;

	async play() {
		this.#cost = await proxiedInput.cost(); // 구입 금액 입력
		this.#issuedLottos = this.issueLottos(this.#cost);

		output.purchaseCount(this.#issuedLottos); // 구입한 로또 개수 출력
		output.lotto(this.#issuedLottos); // 구입한 로또 번호 출력

		this.#winningNumber = await proxiedInput.winningNumber(); // 당첨 번호 입력
		this.#bonusNumber = await proxiedInput.bonusNumber(); // 보너스 번호 입력
		this.#ranks = this.compareNumbers();

		output.winningResult(this.#ranks); // 당첨 결과 출력

		this.#incomeRate = getTotalIncomeRate(this.#ranks, this.#cost);

		output.incomeRate(this.#incomeRate); // 총 수익률 출력
	}

	/** @type {(cost:Number)=>Lotto[]} 구입 금액만큼 로또 발행 */
	issueLottos(cost) {
		const count = this.costToCount(cost);
		const issuedLottos = [];
		for (let i = 0; i < count; i++) {
			issuedLottos.push(this.getLotto());
		}
		return issuedLottos;
	}

	/** @type {(cost:Number)=>Number} 구입 금액를 로또 개수로 변환*/
	costToCount(cost) {
		return cost / 1000;
	}

	/** @type {()=>Lotto} 로또 한 개 발행 */
	getLotto() {
		const randomNums = Random.pickUniqueNumbersInRange(START_NUM, END_NUM, NUM_COUNT);
		// 로또 번호 오름차순 정렬
		randomNums.sort((a, b) => a - b);
		return new Lotto(randomNums);
	}

	/** @type {()=> Lotto[][]} 발행된 번호와 당첨번호(+보너스 번호) 비교한 뒤 2차원 등수 배열 반환 */
	compareNumbers() {
		const ranks = Array.from({ length: MAX_RANK + 1 }, () => []);
		for (const lotto of this.#issuedLottos) {
			const rank = Lotto.compareNumbers(lotto, this.#winningNumber, this.#bonusNumber);
			// ranks[i] = i등 Lotto, i==0 => 꽝
			ranks[rank].push(lotto);
		}
		return ranks;
	}
}

export default App;
