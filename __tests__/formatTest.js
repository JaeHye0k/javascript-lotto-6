import { format } from "../src/utills/format.js";
import Lotto from "../src/Lotto.js";
jest.mock("../src/Lotto.js");

describe("format 테스트", () => {
	describe("input 테스트", () => {
		const testCases = [
			{
				name: "cost",
				args: "1000",
				expectedResult: 1000,
			},
			{
				name: "winningNumber",
				args: "1,2,3,4,5,6",
				expectedResult: [1, 2, 3, 4, 5, 6],
			},
			{
				name: "bonusNumber",
				args: ["7"],
				expectedResult: [7],
			},
		];

		testCases.forEach(({ name, args, expectedResult }) => {
			test(`format.input.${name}() 테스트`, () => {
				const result = format.input[name](args);
				if (Array.isArray(result)) expect(result).toEqual(expectedResult);
				else expect(result).toBe(expectedResult);
			});
		});
	});

	describe("output 테스트", () => {
		Lotto.mockImplementation(function (numbers) {
			this.numbers = numbers;
			this.getNumbers = () => {
				return this.numbers;
			};
		});

		const testCases = [
			{
				name: "issuedLottos",
				args: [new Lotto([1, 2, 3, 4, 5, 6])],
				expectedResult: "[1, 2, 3, 4, 5, 6]",
			},
			{
				name: "purchaseCount",
				args: 5,
				expectedResult: `\n5개를 구매했습니다.`,
			},
			{
				name: "winningResults",
				args: [
					[new Lotto([5, 6, 7, 8, 9, 10])],
					[new Lotto([1, 2, 3, 4, 5, 6])],
					[new Lotto([2, 3, 4, 5, 6, 45])],
					[new Lotto([2, 3, 4, 5, 6, 7])],
					[new Lotto([3, 4, 5, 6, 7, 8])],
					[new Lotto([4, 5, 6, 7, 8, 9])],
				],
				expectedResult: `
당첨 통계
---
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 1개
5개 일치 (1,500,000원) - 1개
5개 일치, 보너스 볼 일치 (30,000,000원) - 1개
6개 일치 (2,000,000,000원) - 1개`,
			},
			{
				name: "incomeRate",
				args: "100.0",
				expectedResult: "총 수익률은 100.0%입니다.",
			},
		];

		testCases.forEach(({ name, args, expectedResult }) => {
			test(`format.output.${name}() 테스트`, () => {
				const result = format.output[name](args);
				console.log(result);
				if (Array.isArray(result)) expect(result).toEqual(expectedResult);
				else expect(result).toBe(expectedResult);
			});
		});

		Lotto.mockRestore();
	});
});
