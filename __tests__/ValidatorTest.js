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

	const testCases = [
		{
			name: "isNotSixDigit",
			inputs: [[], [1], [1, 2, 3, 4, 5, 6, 7]],
			expectedError: MESSAGES.ERROR.NOT_SIX_DIGIT,
		},
		{
			name: "isNotOneDigit",
			inputs: [[], [1, 2]],
			expectedError: MESSAGES.ERROR.NOT_ONE_DIGIT,
		},
		{
			name: "isIncludeDuplicationNumber",
			inputs: [{ args: [[1, 1, 2, 3, 4, 5], 6] }, { args: [[1, 2, 3, 4, 5, 6, 6], 7] }],
			expectedError: MESSAGES.ERROR.DUPLICATION,
		},
		{
			name: "isIncludeNaN",
			inputs: [
				["1", 2, 3, 4, 5, 6],
				[1, 2, 3, "four", 5, 6],
				[1, 2, 3, undefined, 5, 6],
			],
			expectedError: MESSAGES.ERROR.NAN,
		},
		{
			name: "isIncludeOutOfRangeNumber",
			inputs: [
				[0, 1, 2, 3, 4, 5],
				[1, 2, 3, 4, 5, 46],
			],
			expectedError: MESSAGES.ERROR.OUT_OF_RANGE,
		},
		{
			name: "isNotDivieded",
			inputs: [1001, 0, 1100],
			expectedError: MESSAGES.ERROR.NOT_DIVIDED,
		},
		{
			name: "isNaNCost",
			inputs: ["1000j", undefined, "One Hundred"],
			expectedError: MESSAGES.ERROR.NAN,
		},
	];

	testCases.forEach(({ name, inputs, expectedError }) => {
		test(`${name}() 테스트`, () => {
			const spy = jest.spyOn(validator, name);
			inputs.forEach((input) => {
				if (Array.isArray(input?.args)) {
					expect(() => validator[name](...input.args)).toThrow(expectedError);
				} else {
					expect(() => validator[name](input)).toThrow(expectedError);
				}
			});
			expect(spy).toHaveBeenCalledTimes(inputs.length);
		});
	});
});
