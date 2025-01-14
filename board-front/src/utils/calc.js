// 게시글 index 계산 함수
export const itemIdxByPage = (totalCount, currentPage, pageSize, index) => totalCount - (currentPage - 1) * pageSize - index;
