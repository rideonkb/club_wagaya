'use strict';
const LAUGH_WORD = ['草', 'w', 'W', 'ｗ', 'W', 'kusa', '笑', 'わろた']
const HEAT_WORD = ['おおお', 'foo', '888']
var cnt = {"LAUGH":0, "HEAT":0}
 
const chat_viewer = document.querySelector('yt-live-chat-app');

const getComment = element => {
  let commentText = '';
  for(const child of element.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      commentText += child.wholeText;
    }
    if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.nodeName.toLowerCase() === 'img' && typeof child.alt ==='string') {
        commentText += child.alt;
      }
    }
  }
  return commentText;
};

const countElement = async node => {
  // TODO: コメントの内容を解析し，特定単語の個数をカウントする処理
  if (
    node.nodeName.toLowerCase() !== 'yt-live-chat-text-message-renderer' &&
    node.nodeName.toLowerCase() !== 'yt-live-chat-paid-message-renderer'
  ) {
    return;
  }

  const comment = getComment(mode.querySelector('#message'));

  if (comment.includes(LAUGH_WORD)) cnt['LAUGH']++;
  if (comment.includes(HEAT_WORD)) cnt['HEAT']++;
  for (key in cnt){
    if (cnt[key] > 40) {
      playSound(key);
      cnt[key] = 0;
    }
  };
};

const playSound = commentType => {
  // TODO: 受け取ったcommentTypeによって対応するSEを鳴らす処理
  var audioElem = new Audio();
  switch (contentType) {
    case LAUGH:
      audioElem.src = "../sounds/people-studio-laugh-large2.mp3"
      audioElem.play();
      break;
    case HEAT:
      audioElem.src = "../sounds/people-stadium-cheer1.mp3"
      break;
    default:
      break;
  }
  audioElem.pause();
}

const main = async () => {
  const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => countElement(node));
  });
});

observer.observe(chat_viewer, {
  childList: true,
  subtree: true,
});
};
main();