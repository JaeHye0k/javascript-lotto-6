import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { getTotalIncomeRate } from "./utills/income.js";
import { MESSAGES } from "./constant/messages.js";
import { format } from "./utills/format.js";

const START_NUM = 1,
	END_NUM = 45,
	NUM_COUNT = 6,
	MAX_RANK = 5;

class App {
	#issuedLottos;
	#cost;
	#winningNumber;
	#bonusNumber;
	#ranks;
	#incomeRate;

	async play() {
		const inputGenerator = this.input();
		const outputGenerator = this.output();

		this.#cost = (await inputGenerator.next()).value;
		this.#issuedLottos = this.issueLottos(+this.#cost);

		outputGenerator.next(); // 구입한 로또 개수 출력
		outputGenerator.next(); // 구입한 로또 번호 출력

		this.#winningNumber = (await inputGenerator.next()).value;
		this.#bonusNumber = (await inputGenerator.next()).value;
		this.#ranks = this.compareNumbers();

		outputGenerator.next(); // 당첨 결과 출력

		this.#incomeRate = getTotalIncomeRate(this.#ranks, this.#cost);

		outputGenerator.next(); // 총 수익률 출력
	}

	async *input() {
		const cost = await Console.readLineAsync(MESSAGES.INPUT.COST); // 구입 비용 입력
		const formattedCost = format.input.cost(cost);
		yield formattedCost;

		const winningNumber = await Console.readLineAsync(MESSAGES.INPUT.WINNING_NUM); // 당첨 번호 입력
		const formattedWinningNumber = format.input.winningNumber(winningNumber);
		yield formattedWinningNumber;

		const bonusNumber = await Console.readLineAsync(MESSAGES.INPUT.BONUS_NUM); // 보너스 번호 입력
		const formattedBonusNumber = format.input.bonusNumber(bonusNumber);
		yield formattedBonusNumber;
	}

	*output() {
		const purchaseCount = format.output.purchaseCount(this.#issuedLottos.length);
		yield Console.print(purchaseCount); // 구입한 로또 개수 출력

		const lottos = format.output.issuedLottos(this.#issuedLottos);
		yield Console.print(lottos); // 구입한 로또 번호 출력

		const winningResult = format.output.winningResults(this.#ranks);
		yield Console.print(winningResult); // 당첨 내역 출력

		const incomeRate = format.output.incomeRate(this.#incomeRate);
		yield Console.print(incomeRate); // 수익률 출력
	}

	// 구입 금액만큼 로또 발행
	issueLottos(cost) {
		const count = this.costToCount(cost);
		const issuedLottos = [];
		for (let i = 0; i < count; i++) {
			issuedLottos.push(this.getLotto());
		}
		return issuedLottos;
	}

	// 구입 금액를 로또 개수로 변환
	costToCount(cost) {
		return cost / 1000;
	}

	// 로또 한 개 발행
	getLotto() {
		const randomNums = Random.pickUniqueNumbersInRange(START_NUM, END_NUM, NUM_COUNT);
		// 로또 번호 오름차순 정렬
		randomNums.sort((a, b) => a - b);
		return new Lotto(randomNums);
	}

	// 발행된 번호와 당첨번호(+보너스 번호) 비교
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
