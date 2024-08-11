import { validator } from "./utills/validator.js";

class Lotto {
	#numbers;

	/**
	 * 6자리 숫자를 갖는 로또를 생성한다.
	 * @param {Number[]} numbers
	 */
	constructor(numbers) {
		this.#validate(numbers);
		this.#numbers = numbers;
	}

	/**
	 * 로또 번호의 유효성을 검사한다.
	 * @param {Number[]} numbers
	 */
	#validate(numbers) {
		validator.checkLottoNumber(numbers);
	}

	// TODO: 추가 기능 구현

	/**
	 *	인수로 전달된 로또가 몇 등인지 반환한다.
	 * @param {Lotto} lotto
	 * @param {Number[]} winningNumbers
	 * @param {Number[]} bonusNumbers
	 * @returns {Number}
	 */
	static compareNumbers(lotto, winningNumbers, bonusNumbers) {
		const numbers = lotto.getNumbers();
		const winningCount = Lotto.getSameNumberCount(numbers, winningNumbers);
		const bonusCount = Lotto.getSameNumberCount(numbers, bonusNumbers);
		const rank = Lotto.getRank(winningCount, bonusCount);
		return rank;
	}

	/**
	 * 동일한 번호의 개수를 반환한다.
	 * @param {Number[]} base
	 * @param {Number[]} compared
	 * @returns {Number}
	 */
	static getSameNumberCount(base, compared) {
		let includeCount = 0;
		for (let i = 0; i < compared.length; i++) {
			if (base.includes(compared[i])) includeCount++;
		}
		return includeCount;
	}

	/**
	 * 등수를 반환한다.
	 * @param {Number} winningCount 당첨 번호와 일치하는 번호의 개수
	 * @param {Number} bonusCount 보너스 번호와 일치하는 번호의 개수 (1또는 0)
	 * @returns {Number}
	 */
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

	/**
	 * 로또의 6자리 번호를 반환한다.
	 * @returns {Number}
	 */
	getNumbers() {
		return this.#numbers;
	}
}

export default Lotto;
