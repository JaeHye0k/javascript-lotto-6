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
		// const outputGenerator = this.output();
		this.cost = (await inputGenerator.next()).value;
		this.winningNumbers = (await inputGenerator.next()).value;
		this.bonusNumbers = (await inputGenerator.next()).value;
		this.issueLottos(+this.cost);
		// outputGenerator.next();
		// outputGenerator.next();
	}

	async *input() {
		yield await Console.readLineAsync("구입금액을 입력해 주세요.\n");
		yield await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
		yield await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
	}

	// *output() {
	// 	yield Console.print(`${this.issuedLottos.length}개를 구매했습니다.`);
	// 	const lottos = this.issuedLottos.map((e) => "[" + e.getNumbers() + "]").join("\n");
	// 	yield Console.print(lottos);
	// }

	issueLottos(cost) {
		const count = cost / 1000;
		for (let i = 0; i < count; i++) {
			this.issuedLottos.push(this.getLotto());
		}
	}

	getLotto() {
		const randomNums = Random.pickUniqueNumbersInRange(
			this.startNum,
			this.endNum,
			this.numCount
		);
		randomNums.sort((a, b) => a - b);
		return new Lotto(randomNums);
	}
}

export default App;
