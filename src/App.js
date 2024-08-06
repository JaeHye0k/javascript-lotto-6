import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
	startNum = 1;
	endNum = 45;
	numCount = 6;

	constructor() {
		this.issuedLottos = [];
		this.cost = 0;
		this.winningNumbers;
		this.bonusNumbers;
	}

	async play() {
		const inputGenerator = this.input();
		const outputGenerator = this.output();
		this.cost = (await inputGenerator.next()).value; // 구입 금액 입력
		this.issuedLottos = this.issueLottos(+this.cost); // 로또 발행
		outputGenerator.next(); // 발행된 로또 개수 출력
		outputGenerator.next(); // 발행된 로또 번호 출력

		this.winningNumbers = (await inputGenerator.next()).value.split(",").map(Number); // 당첨 번호 입력
		this.bonusNumbers = (await inputGenerator.next()).value; // 보너스 번호 입력
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
		const randomNums = Random.pickUniqueNumbersInRange(
			this.startNum,
			this.endNum,
			this.numCount
		);
		// 로또 번호 오름차순 정렬
		randomNums.sort((a, b) => a - b);
		return new Lotto(randomNums);
	}
}

export default App;
