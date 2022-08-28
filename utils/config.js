const config = {};
config.defaultHeadBaseUrl = 'http://116.63.152.202:5002/userHead/';
// config.baseUrl = "http://116.63.152.202:3002";
config.baseUrl = 'http://localhost:3001';
config.localBaseUrl = 'http://localhost:3001';
config.getQueryVariable = function getQueryVariable (variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
};
/**
 * 测试链接
 * 本地
 * http://127.0.0.1:5501/news-create-manager/News/demo.html?userName="庞老闆"&userId=1005&newId=34&userHeadUrl="http://116.63.152.202:5002/userHead/default_head.png"
 * 远程
 * http://116.63.152.202:5002/News/3.html?userName="庞老闆"&userId=1005&newId=34&userHeadUrl="http://116.63.152.202:5002/userHead/default_head.png"
 */

export default config;
