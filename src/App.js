import { Console } from "@woowacourse/mission-utils";

class App {
	async play() {
		const inputGenerator = this.input();
		const cost = (await inputGenerator.next()).value;
		const winningNumbers = (await inputGenerator.next()).value;
		const bonusNumbers = (await inputGenerator.next()).value;
		console.log(cost, winningNumbers, bonusNumbers);
	}

	async *input() {
		yield await Console.readLineAsync("구입금액을 입력해 주세요.\n");
		yield await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
		yield await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
	}
}

export default App;
