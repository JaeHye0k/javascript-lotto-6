import { validator } from "../src/utills/validator.js";
import { MESSAGES } from "../src/constant/messages.js";

// TODO: 예외처리 테스트
// [x] 당첨 번호와 보너스 번호에 중복된 숫자가 포함된 경우
// [x] 로또 구입 금액이 1,000원으로 나누어 떨어지지 않는 경우 (비용이 0인 경우도 에러 발생)
// [x] 로또 구입 금액이 숫자가 아닌 경우
// [x] 당첨 번호와 보너스 번호에 숫자가 아닌 문자가 포함된 경우
// [x] 당첨 번호와 보너스 번호가 1~45 까지의 숫자가 아닌 경우
// [x] 당첨 번호가 6개가 아닌 경우
// [x] 보너스 번호가 1개가 아닌 경우

describe("예외처리 테스트", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});
	test("isNotSixDigit() 테스트", () => {
		// given
		const isNotSixDigitSpy = jest.spyOn(validator, "isNotSixDigit");
		const WRONG_SIZE_NUMBER = [[], [1], [1, 2, 3, 4, 5, 6, 7]];
		const COUNT = WRONG_SIZE_NUMBER.length;

		// when & then
		for (const numbers of WRONG_SIZE_NUMBER) {
			expect(() => validator.isNotSixDigit(numbers)).toThrow(MESSAGES.ERROR.NOT_SIX_DIGIT);
		}

		expect(isNotSixDigitSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.NOT_SIX_DIGIT).toMatch(/[Error]/);
	});

	test("isNotOneDigit() 테스트", () => {
		// given
		const isNotOneDigitSpy = jest.spyOn(validator, "isNotOneDigit");
		const WRONG_SIZE_NUMBER = [[], [1, 2]];
		const COUNT = WRONG_SIZE_NUMBER.length;

		// when & then
		for (const numbers of WRONG_SIZE_NUMBER) {
			expect(() => validator.isNotOneDigit(numbers)).toThrow(MESSAGES.ERROR.NOT_ONE_DIGIT);
		}

		expect(isNotOneDigitSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.NOT_ONE_DIGIT).toMatch(/[Error]/);
	});

	test("isIncludeDuplicationNumber() 테스트", () => {
		// given
		const isIncludeDuplicationNumberSpy = jest.spyOn(validator, "isIncludeDuplicationNumber");
		const DUPLICATION_NUMBER = [
			[1, 1, 2, 3, 4, 5],
			[1, 2, 3, 4, 5, 6, 6],
		];
		const COUNT = DUPLICATION_NUMBER.length;

		// when & then
		for (const numbers of DUPLICATION_NUMBER) {
			expect(() => validator.isIncludeDuplicationNumber(numbers, numbers.length)).toThrow(
				MESSAGES.ERROR.DUPLICATION
			);
		}

		expect(isIncludeDuplicationNumberSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.DUPLICATION).toMatch(/[Error]/);
	});

	test("isIncludeNaN() 테스트", () => {
		// given
		const isIncludeNaNSpy = jest.spyOn(validator, "isIncludeNaN");
		const NOT_NUMBERS = [
			["1", 2, 3, 4, 5, 6],
			[1, 2, 3, "four", 5, 6],
			[1, 2, 3, undefined, 5, 6],
		];
		const COUNT = NOT_NUMBERS.length;

		// when & then
		for (const numbers of NOT_NUMBERS) {
			expect(() => validator.isIncludeNaN(numbers)).toThrow(MESSAGES.ERROR.NAN);
		}

		expect(isIncludeNaNSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.NAN).toMatch(/[Error]/);
	});

	test("isIncludeOutOfRangeNumber() 테스트", () => {
		// given
		const isIncludeOutOfRangeNumberSpy = jest.spyOn(validator, "isIncludeOutOfRangeNumber");
		const OUT_OF_RANGE = [
			[0, 1, 2, 3, 4, 5],
			[1, 2, 3, 4, 5, 46],
		];
		const COUNT = OUT_OF_RANGE.length;

		// when & then
		for (const numbers of OUT_OF_RANGE) {
			expect(() => validator.isIncludeOutOfRangeNumber(numbers)).toThrow(
				MESSAGES.ERROR.OUT_OF_RANGE
			);
		}

		expect(isIncludeOutOfRangeNumberSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.OUT_OF_RANGE).toMatch(/[Error]/);
	});

	test("isNotDivieded() 테스트", () => {
		// given
		const isNotDiviededSpy = jest.spyOn(validator, "isNotDivieded");
		const NOT_DIVIDED = [1001, 0, 1100];
		const COUNT = NOT_DIVIDED.length;

		// when & then
		for (const cost of NOT_DIVIDED) {
			expect(() => validator.isNotDivieded(cost)).toThrow(MESSAGES.ERROR.NOT_DIVIDED);
		}

		expect(isNotDiviededSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.NOT_DIVIDED).toMatch(/[Error]/);
	});

	test("isNaNCost() 테스트", () => {
		// given
		const isNaNCostSpy = jest.spyOn(validator, "isNaNCost");
		const NAN_COST = ["1000j", undefined, "One Hundred"];
		const COUNT = NAN_COST.length;

		// when & then
		for (const cost of NAN_COST) {
			expect(() => validator.isNaNCost(cost)).toThrow(MESSAGES.ERROR.NAN);
		}

		expect(isNaNCostSpy).toHaveBeenCalledTimes(COUNT);
		expect(MESSAGES.ERROR.NAN).toMatch(/[Error]/);
	});
});
