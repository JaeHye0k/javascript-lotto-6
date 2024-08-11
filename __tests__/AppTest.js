import App from "../src/App.js";
import Lotto from "../src/Lotto.js";

// TODO: App 단위 테스트 구현하기
// [x] costToCount
// [x] getLotto
// [x] issueLottos
// [x] compareNumbers

describe("앱 단위 테스트", () => {
	const app = new App();

	test("costToCount() 는 구입할 로또 개수를 반환해야 합니다.", () => {
		// given
		const COST = 1000;

		// when
		const count = app.costToCount(COST);

		// then
		const result = 1;
		expect(count).toBe(result);
	});

	test("getLotto() 는 로또 객체를 반환해야 합니다.", () => {
		// given
		const RANDOM_NUM = [6, 5, 4, 3, 2, 1];

		// when
		const lotto = app.getLotto(RANDOM_NUM);

		// then
		const result = new Lotto([1, 2, 3, 4, 5, 6]);
		expect(lotto).toEqual(result);
	});

	test("issueLottos() 는 발행된 로또 객체를 담은 1차원 배열을 반환해야 합니다.", () => {
		// given
		const COST = 3000;
		const COUNT = COST / 1000;
		const RANDOM_NUMS = [
			[6, 5, 4, 3, 2, 1],
			[10, 9, 8, 7, 6, 5],
			[43, 42, 41, 40, 39, 38],
		];
		const ISSUED_LOTTOS = [];

		// when
		for (let i = 0; i < COUNT; i++) {
			RANDOM_NUMS[i].sort((a, b) => a - b);
			ISSUED_LOTTOS.push(new Lotto(RANDOM_NUMS[i]));
		}

		// then
		const RESULT = [
			new Lotto([1, 2, 3, 4, 5, 6]),
			new Lotto([5, 6, 7, 8, 9, 10]),
			new Lotto([38, 39, 40, 41, 42, 43]),
		];

		expect(ISSUED_LOTTOS).toEqual(RESULT);
		expect(ISSUED_LOTTOS.length).toBe(COUNT);
	});

	test("compareNumbers() 는 Lotto 객체를 담은 2차원 배열을 반환해야 합니다.", () => {
		// given
		const getWhatRankOfLottoSpy = jest.spyOn(Lotto, "getWhatRankOfLotto");
		const MAX_RANK = 5;
		const ISSUED_LOTTO_RANK = Array.from({ length: MAX_RANK + 1 }, () => []);
		const ISSUED_LOTTOS = [
			new Lotto([1, 2, 3, 4, 5, 6]),
			new Lotto([2, 3, 4, 5, 6, 7]),
			new Lotto([2, 3, 4, 5, 6, 8]),
			new Lotto([3, 4, 5, 6, 7, 8]),
			new Lotto([4, 5, 6, 7, 8, 9]),
			new Lotto([5, 6, 7, 8, 9, 10]),
		];
		const WINNING_NUMBER = [1, 2, 3, 4, 5, 6];
		const BONUS_NUMBER = [7];

		// when
		for (const LOTTO of ISSUED_LOTTOS) {
			const RANK = Lotto.getWhatRankOfLotto(LOTTO, WINNING_NUMBER, BONUS_NUMBER);
			ISSUED_LOTTO_RANK[RANK].push(LOTTO);
		}

		// then
		const RESULT = [
			[new Lotto([5, 6, 7, 8, 9, 10])], // 5등 (2개 이하 일치)
			[new Lotto([1, 2, 3, 4, 5, 6])], // 1등 (6개 일치)
			[new Lotto([2, 3, 4, 5, 6, 7])], // 2등 (5개 일치 + 보너스 번호 일치)
			[new Lotto([2, 3, 4, 5, 6, 8])], // 2등 (5개 일치)
			[new Lotto([3, 4, 5, 6, 7, 8])], // 3등 (4개 일치)
			[new Lotto([4, 5, 6, 7, 8, 9])], // 4등 (3개 일치)
		];
		expect(ISSUED_LOTTO_RANK).toEqual(RESULT);
		expect(getWhatRankOfLottoSpy).toHaveBeenCalledTimes(ISSUED_LOTTOS.length);
	});
});
