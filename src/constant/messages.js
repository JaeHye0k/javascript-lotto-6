export const MESSAGES = {
	INPUT: {
		COST: "구입금액을 입력해 주세요.\n",
		WINNING_NUM: "\n당첨 번호를 입력해 주세요.\n",
		BONUS_NUM: "\n보너스 번호를 입력해 주세요.\n",
	},
	OUTPUT: {
		WINNING_RESULT: "\n당첨 통계\n---\n",
	},
	ERROR: {
		DUPLICATION: "[ERROR] 중복된 번호가 포함되어 있습니다.",
		NOT_DIVIDED: "[ERROR] 로또 구입 금액이 1,000원으로 나누어 떨어지지 않습니다.",
		NAN: "[ERROR] 숫자가 아닌 문자가 포함되어 있습니다.",
		OUT_OF_RANGE: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
		NOT_SIX_DIGIT: "[ERROR] 로또 번호는 6개여야 합니다.",
		NOT_ONE_DIGIT: "[ERROR] 보너스 번호는 1개여야 합니다.",
	},
};
