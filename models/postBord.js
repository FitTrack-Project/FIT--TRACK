const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "kmj",
  password: "1234",
  database: "fittrack",
});

//전체 게시글 가져오기(매개변수: X)
exports.MsearchAll = (callback) => {
  const query = `SELECT * FROM posts ORDER BY post_id DESC `;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//로그인한 사용자의 정보 가져오기(매개변수: X)
exports.MsigninUser = (callback) => {
  const query = `SELECT * FROM signin_user `;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//하트수가 많은 게시글 제목 3개 불러오기(매개변수: X)
exports.MbestPost = (callback) => {
  const query = `SELECT post_id, title, like_count  FROM posts ORDER BY like_count DESC LIMIT 3`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};
//저장되어있는 전체 댓글 정보 가져오기(매개변수: X)
exports.McommentAll = (callback) => {
  const query = `SELECT * FROM comments ORDER BY post_id DESC`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//게시글 작성
exports.Mwrite = (writeData) => {
  const query = `INSERT INTO posts (user_id, title, content, created_date, created_time, like_count) VALUES 
    ('${writeData.user_id}', '${writeData.title}', '${writeData.content}', '${writeData.created_date}',
    '${writeData.created_time}', '${writeData.like_count}')`;
  conn.query(query);
};

//입력한 단어가 포함된 columns search(매개변수: 입력한 단어)
exports.Msearch = (searchData, callback) => {
  const query = `SELECT * FROM posts WHERE title LIKE '%${searchData}%' OR content LIKE '%${searchData}%'`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//클릭한 게시물 데이터 가져오기(매개변수: 클릭한 게시물의 post_id)
exports.MshowPost = (postIdData, callback) => {
  const query = `SELECT * FROM posts WHERE post_id = ${postIdData}`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};
//클릭한 게시물 댓글 데이터 가져오기(매개변수: 클릭한 게시물의 post_id)
exports.MshowPostComment = (postIdData, callback) => {
  const query = `SELECT * FROM comments WHERE post_id = ${postIdData} ORDER BY post_id DESC`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//내게시물 가져오기(매개변수: 사용자로그인 정보의 signin_id)
exports.MmyPost = (signIdData, callback) => {
  const query = `SELECT * FROM posts WHERE user_id = '${signIdData}' ORDER BY post_id DESC`;
  conn.query(query, (err, rows) => {
    callback(rows);
  });
};

//comment 저장(매개변수: X)
exports.writeComment = (commentData) => {
  const query = `INSERT INTO comments (post_id, signin_user_id, content, created_date,created_time) VALUES 
  ('${commentData.post_id}', '${commentData.signin_user_id}', '${commentData.content}'
  , '${commentData.created_date}','${commentData.created_time}')`;
  conn.query(query);
};

// 좋아요 눌렀을 때 게시물의 좋아요수 변경(매개변수: 좋아요 누른 게시물의 post_id)
exports.MpatchLikeCount = (postIdData, callback) => {
  let query = `SELECT like_count FROM posts WHERE post_id = ${postIdData.postId}`;
  conn.query(query, (err, rows) => {
    let updateLikeCount;
    if (postIdData.msg == "fullHeart") {
      updateLikeCount = rows[0].like_count + 1;
    } else {
      updateLikeCount = rows[0].like_count - 1;
    }

    query = `UPDATE posts SET like_count='${updateLikeCount}'
    WHERE post_id = ${postIdData.postId}`;
    conn.query(query);
    callback(rows);
  });
};

//게시물 수정(UPDATE)title, content, like_count 업데이트
exports.Medit = (editData) => {
  const query = `UPDATE posts SET title='${editData.title}',
   content='${editData.content}'
  WHERE post_id='${editData.post_id}' AND user_id='${editData.signin_id}'`;
  conn.query(query);
};

//게시물 삭제(DELETE)post_id일치 게시물 삭제
exports.Mdel = (delDate, callback) => {
  const arr_post_id = delDate.post_id;
  //posts 값 삭제(배열의 값이 0일경우 동작 -> )
  if (delDate.post_id.length !== 0) {
    //새로운 배열 만들어서 signin_user에 update
    const likePostIdQuery = `SELECT like_post_id FROM signin_user`;
    conn.query(likePostIdQuery, (err, rows) => {
      let UserlikePostId = rows[0].like_post_id;
      if (UserlikePostId !== "[]") {
        UserlikePostId = UserlikePostId.slice(1, -1);
        UserlikePostId = UserlikePostId.split(",");
        //여기 수정하기
        UserlikePostId = UserlikePostId.map((UserlikePostId) =>
          parseInt(UserlikePostId.trim())
        );
        for (const id of delDate.post_id) {
          if (UserlikePostId.includes(parseInt(id))) {
            const index = UserlikePostId.indexOf(parseInt(id));
            if (index > -1) {
              UserlikePostId.splice(index, 1);
            }
          }
        }
        UserlikePostId = JSON.stringify(UserlikePostId); // 배열을 JSON 문자열로 변환([]도 포함)
        const signinUserEditQuery = `UPDATE signin_user SET like_post_id = '${UserlikePostId}'
        WHERE signin_id = '${delDate.signin_id}'`;
        conn.query(signinUserEditQuery);
      }
    });

    //post_id사용해서 게시물, 게시물의 댓글 삭제
    for (const postId of arr_post_id) {
      const commentIdQuery = `DELETE FROM comments WHERE post_id = ${postId}`;
      conn.query(commentIdQuery);
      const postDelQuery = `DELETE FROM posts WHERE post_id = ${postId}`;
      conn.query(postDelQuery);
    }
    callback();
  }
};

//좋아요 누른 게시물 post_id 배열 업데이트
exports.MlikeCountEdit = (likeCountEditData) => {
  if (likeCountEditData.length === 0) {
    //빈 배열일 경우 빈 문자열로 저장
    let stringData = "";
    const query = `UPDATE signin_user SET like_post_id = '${stringData}'`;
    conn.query(query);
  } else {
    let stringData = JSON.stringify(likeCountEditData); // 배열을 JSON 문자열로 변환
    const query = `UPDATE signin_user SET like_post_id = '${stringData}'`;
    conn.query(query);
  }
};
