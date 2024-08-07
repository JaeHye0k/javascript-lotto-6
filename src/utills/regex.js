/**
 * @constant commaPerThree 숫자 세자리마다 매치되는 정규표현식 (세 자리마다 콤마 찍을때 사용)
 */
export const commaPerThree = /\B(?=(\d{3})+(?!\d))/g;
