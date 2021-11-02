//참고문헌 : https://velog.io/@won-developer/Node.js-mongoose-%ED%8E%98%EC%9D%B4%EC%A7%95-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

export const pagingController = async (req, res) => {
  const { page } = req.query; // (1)
  try {
    const totalPost = await Post.countDocuments({}); // (2)
    if (!totalPost) {
      // (3)
      throw Error();
    }
    let { startPage, endPage, hidePost, maxPost, totalPage, currentPage } =
      paging(page, totalPost); // (4)
    const board = await Post.find({}) // (5)
      .sort({ createAt: -1 })
      .skip(hidePost)
      .limit(maxPost);
    res.render("home", {
      // (6)
      board,
      currentPage,
      startPage,
      endPage,
      maxPost,
      totalPage,
    });
  } catch (error) {
    res.render("home", { board: [] }); // (7)
  }
};

const paging = (page, totalPost) => {
  const maxPost = 10; // (1)
  const maxPage = 10; // (2)
  let currentPage = page ? parseInt(page) : 1; // (3)
  const hidePost = page === 1 ? 0 : (page - 1) * maxPost; // (4)
  const totalPage = Math.ceil(totalPost / maxPost); // (5)

  if (currentPage > totalPage) {
    // (6)
    currentPage = totalPage;
  }

  const startPage = Math.floor((currentPage - 1) / maxPage) * maxPage + 1; // (7)
  let endPage = startPage + maxPage - 1; // (8)

  if (endPage > totalPage) {
    // (9)
    endPage = totalPage;
  }

  return { startPage, endPage, hidePost, maxPost, totalPage, currentPage }; // (10)
};
