import * as income from "../src/utills/income";
import Lotto from "../src/Lotto";

test("getTotalIncomeRate() 테스트", () => {
	// given
	const getTotalIncomeRateSpy = jest.spyOn(income, "getTotalIncomeRate");

	const RANKS = [
		[new Lotto([5, 6, 7, 8, 9, 10])],
		[new Lotto([1, 2, 3, 4, 5, 6])],
		[new Lotto([2, 3, 4, 5, 6, 45])],
		[new Lotto([2, 3, 4, 5, 6, 7])],
		[new Lotto([3, 4, 5, 6, 7, 8])],
		[new Lotto([4, 5, 6, 7, 8, 9])],
	];
	const COST = 6000;
	const EXPECTED_RESULT = "33859250.0";

	// when
	const result = income.getTotalIncomeRate(RANKS, COST);

	// then
	expect(result).toBe(EXPECTED_RESULT);
	expect(getTotalIncomeRateSpy).toHaveBeenCalledTimes(1);
});
