import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const START_NUM = 1,
	END_NUM = 45,
	NUM_COUNT = 6,
	MAX_RANK = 5;

class App {
	constructor() {
		this.issuedLottos = [];
		this.cost = 0;
		this.winningNumbers;
		this.bonusNumbers;
		this.ranks = [];
	}

	async play() {
		const inputGenerator = this.input();
		const outputGenerator = this.output();
		this.cost = (await inputGenerator.next()).value; // 구입 금액 입력
		this.issuedLottos = this.issueLottos(+this.cost); // 로또 발행
		outputGenerator.next(); // 발행된 로또 개수 출력
		outputGenerator.next(); // 발행된 로또 번호 출력

		this.winningNumbers = (await inputGenerator.next()).value.split(",").map(Number); // 당첨 번호 입력
		this.bonusNumbers = [(await inputGenerator.next()).value].map(Number); // 보너스 번호 입력
		this.ranks = this.compareNumbers();
		console.table(this.ranks);
	}

	async *input() {
		yield await Console.readLineAsync("구입금액을 입력해 주세요.\n");
		yield await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
		yield await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
	}

	*output() {
		yield Console.print(`${this.issuedLottos.length}개를 구매했습니다.`);
		const lottos = this.issuedLottos.map((e) => "[" + e.getNumbers() + "]").join("\n");
		yield Console.print(lottos);
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
		for (const lotto of this.issuedLottos) {
			const rank = Lotto.compareNumbers(lotto, this.winningNumbers, this.bonusNumbers);
			// ranks[i] = i등 Lotto, i==0 => 꽝
			ranks[rank].push(lotto);
		}
		return ranks;
		// console.table(this.ranks);
	}
}

export default App;
