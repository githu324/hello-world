/**
 * 前端脚本：
 *   1. 页面加载后立即请求 /api/time 获取服务器时间；
 *   2. 之后每 1 秒刷新一次，保证页面上的时间始终为“当前服务器时间”；
 *   3. 同时在页面下方显示服务器主机信息（通过 location.host 获取）。
 */
(function () {
  const timeEl = document.getElementById('serverTime');
  const hostEl = document.getElementById('serverHost');

  // 显示服务器地址信息（hostname:port）
  if (hostEl) {
    hostEl.textContent = '服务器地址：' + location.host;
  }

  // 从服务器拉取一次时间并更新页面
  function fetchTime() {
    fetch('/api/time')
      .then(function (res) {
        if (!res.ok) {
          throw new Error('请求失败，状态码 ' + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        if (timeEl) {
          timeEl.textContent = data.time;
        }
      })
      .catch(function (err) {
        // 请求失败时在页面上提示，便于排查
        if (timeEl) {
          timeEl.textContent = '获取时间失败：' + err.message;
        }
      });
  }

  // 立即执行一次，然后每隔 1 秒刷新
  fetchTime();
  setInterval(fetchTime, 1000);
})();
