class Lotto {
	#numbers;

	constructor(numbers) {
		this.#validate(numbers);
		this.#numbers = numbers;
	}

	#validate(numbers) {
		if (numbers.length !== 6) {
			throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
		}
	}

	// TODO: 추가 기능 구현

	static compareNumbers(lotto, winningNumbers, bonusNumbers) {
		const numbers = lotto.getNumbers();
		const winningCount = Lotto.getSameNumberCount(numbers, winningNumbers);
		const bonusCount = Lotto.getSameNumberCount(numbers, bonusNumbers);
		const rank = Lotto.getRank(winningCount, bonusCount);
		// console.log("로또 번호: ", numbers);
		// console.log("당첨 번호: ", winningNumbers);
		// console.log("당첨 개수: ", winningCount);
		// console.log("보너스 번호: ", bonusNumbers);
		// console.log("보너스 개수: ", bonusCount);
		// console.log(rank + "등");
		return rank;
	}

	// 동일한 번호의 개수를 반환
	static getSameNumberCount(base, compared) {
		let includeCount = 0;
		for (let i = 0; i < compared.length; i++) {
			if (base.includes(compared[i])) includeCount++;
		}
		return includeCount;
	}

	// 등수 구하기
	static getRank(winningCount, bonusCount) {
		if (winningCount < 3) return 0; // 꽝
		if (winningCount === 3) return 5; // 5등
		if (winningCount === 4) return 4; // 4등
		if (winningCount === 5) {
			if (!bonusCount) return 3; // 3등
			return 2; // 2등
		}
		if (winningCount === 6) return 1; // 1등
	}

	getNumbers() {
		return this.#numbers;
	}
}

export default Lotto;
