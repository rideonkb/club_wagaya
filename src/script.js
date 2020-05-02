const LAUGH_WORD = ['草', 'w', 'W', 'ｗ', 'W', 'kusa', '笑', 'わろた']
const HEAT_WORD = ['おおお', 'foo', '888', 'あああ']
var cnt = {"LAUGH":0, "HEAT":0, "CALL":0}
 
const selector = {
  getChatDom: () => document.querySelector('yt-live-chat-app'),
};

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
  if (
    node.nodeName.toLowerCase() !== 'yt-live-chat-text-message-renderer' &&
    node.nodeName.toLowerCase() !== 'yt-live-chat-paid-message-renderer'
  ) {
    return;
  }

  const comment = getComment(node.querySelector('#message'));

  for (var el of LAUGH_WORD){
    if (comment.includes(el)) cnt['LAUGH']++;
  }
  
  for (var el of HEAT_WORD){
    if (comment.includes(el)) cnt['HEAT']++;
  }

  if (comment.includes("はい")) cnt['CALL']++;
  
  for (key in cnt) {
    if (cnt[key] > 20) {
      playSound(key);
      cnt[key] = 0;
    }
  };
};

const playSound = commentType => {
  var audioElem = new Audio();
  switch (commentType) {
    case "LAUGH":
      audioElem.src = chrome.extension.getURL("sounds/people-studio-laugh-large2.mp3");
      audioElem.play();
      break;
    case "HEAT":
      audioElem.src = chrome.extension.getURL("sounds/people-stadium-cheer1.mp3");
      break;
    case "CALL":
      audioElem.src = chrome.extension.getURL("sounds/hai-hai1.mp3");
    default:
      break;
  }  
  audioElem.play();
}

const init = async () => {
  const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => countElement(node));
  });
});

observer.observe(selector.getChatDom(), {
  childList: true,
  subtree: true,
});
};
init();