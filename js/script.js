'use strict';
 
const chat_viewer = document.querySelector('yt-live-chat-app');

const getComment = element => {
  // TODO: yt-live-chat-app中のelementセレクタを獲得する処理
}

const countElement = async node => {
  // TODO: コメントの内容を解析し，特定単語の個数をカウントする処理
}

const playSound = commentType => {
  // TODO: 受け取ったcommentTypeによって対応するSEを鳴らす処理
}

const main = async () => {
  const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    // TODO: ノードが変化するごとに行うことの作成
  })
});
};
main();
