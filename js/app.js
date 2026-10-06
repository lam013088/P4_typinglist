/**
 * =========================================================================
 * 🎮 APP.JS - 四年級速成打字業務邏輯、UI 互動與跨電腦雲端同步核心
 * 🤖 AI 迭代維護指南：
 *    - 本模組包含四大模式狀態機 (錯字魔王、輔助字型、字母配對、極速手速賽)
 *    - 包含排行榜渲染 (renderLeaderboardTable, renderSpeedLeaderboardTable)
 *    - 包含 Webhook 雙向資料傳輸 (sendReliableWebhook, fetchCloudLeaderboard)
 * =========================================================================
 */

const SafeStorage = window.SafeStorage = {
  _mem: {},
  getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const v = window.localStorage.getItem(key);
        if (v !== null) return v;
      }
    } catch(e) {}
    return this._mem[key] !== undefined ? this._mem[key] : null;
  },
  setItem(key, val) {
    const strVal = String(val);
    this._mem[key] = strVal;
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem(key, strVal);
    } catch(e) {}
  },
  removeItem(key) {
    delete this._mem[key];
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.removeItem(key);
    } catch(e) {}
  },
  getAllKeys() {
    const keysSet = new Set(Object.keys(this._mem));
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        for (let i = 0; i < window.localStorage.length; i++) {
          keysSet.add(window.localStorage.key(i));
        }
      }
    } catch(e) {}
    return Array.from(keysSet);
  }
};

function inspectWebhookStatus() {
  const url = getGasWebhookUrl();
  const lastSync = (typeof lastCloudSyncTime !== 'undefined' && lastCloudSyncTime) ? lastCloudSyncTime.toLocaleString() : '尚未成功連通';
  const msg = [
    '【四年級雲端天梯連線診斷報告】',
    '',
    '1. 當前偵測到的 Webhook 網址:',
    url ? url : '⚠️ (未填寫或仍為範例預設值，處於安全本機離線模式)',
    '',
    '2. 最後成功同步時間:',
    lastSync,
    '',
    '💡 如需連通 Google 試算表（全自動背景同步）：',
    '① 打開「26-27_P4_錯字討伐小遊戲積分記錄表」試算表。',
    '② 點擊上方選單「擴充功能」>「Apps Script」，貼上後端程式碼。',
    '③ 點擊右上角「部署」>「新增部署」> 選擇「網頁應用程式」。',
    '   - 執行身分：我 (Me)',
    '   - 誰可以存取：任何人 (Anyone)',
    '④ 複製生成的 /exec 結尾網址，貼至 js/config.js 的 CONFIG.GAS_WEBHOOK_URL 中。',
    '⑤ 將 js/config.js 更新至 GitHub 倉庫，即可完成全自動背景同步！'
  ].join(String.fromCharCode(10));
  alert(msg);
}

function getGasWebhookUrl() {
  if (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.GAS_WEBHOOK_URL && !window.CONFIG.GAS_WEBHOOK_URL.includes('YourDeploymentIdHere')) {
    return window.CONFIG.GAS_WEBHOOK_URL.trim();
  }
  if (typeof CONFIG !== 'undefined' && CONFIG.GAS_WEBHOOK_URL && !CONFIG.GAS_WEBHOOK_URL.includes('YourDeploymentIdHere')) {
    return CONFIG.GAS_WEBHOOK_URL.trim();
  }
  return '';
}

// 📦 離線待補送佇列處理函式
async function flushPendingUploads() {
  const url = getGasWebhookUrl();
  if (!url) return;
  try {
    const rawPending = SafeStorage.getItem('p4_pending_uploads');
    if (!rawPending) return;
    const queue = JSON.parse(rawPending);
    if (!Array.isArray(queue) || queue.length === 0) return;

    SafeStorage.removeItem('p4_pending_uploads');
    for (const item of queue) {
      if (item && item.payload) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(item.payload)
        }).catch(err => console.warn('補送失敗:', err));
        await new Promise(r => setTimeout(r, 400));
      }
    }
    console.log('✅ 已完成離線紀錄補送');
  } catch (e) {
    console.warn('處理補送佇列異常:', e);
  }
}

function generateRequestId() {
  return 'p4_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

let isFetchingCloudLeaderboard = false;
let lastCloudSyncTime = null;

async function sendReliableWebhook(payload) {
  const url = getGasWebhookUrl();
  if (!url) return;

  if (!payload.requestId) {
    payload.requestId = generateRequestId();
  }

  let success = false;
  // 🚀 即時重試機制：發生異常時進行 2 次重發嘗試 (間隔 1.2 秒)
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      if (attempt > 0) {
        await new Promise(r => setTimeout(r, 1200));
      }
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      success = true;
      break;
    } catch (err) {
      console.warn(`第 ${attempt + 1} 次雲端上傳嘗試失敗:`, err);
    }
  }

  if (success) {
    setTimeout(() => {
      if (typeof fetchCloudLeaderboard === 'function') fetchCloudLeaderboard(true);
    }, 1500);
    setTimeout(() => {
      flushPendingUploads();
    }, 2000);
  } else {
    console.warn('雲端上傳暫時失敗，已安全移入待補送清單');
    try {
      const rawPending = SafeStorage.getItem('p4_pending_uploads');
      const queue = rawPending ? JSON.parse(rawPending) : [];
      queue.push({ payload, time: Date.now() });
      SafeStorage.setItem('p4_pending_uploads', JSON.stringify(queue.slice(-30)));
    } catch(e) {}
  }
}

async function fetchCloudLeaderboard(silent = false) {
  if (isFetchingCloudLeaderboard) return;
  const url = getGasWebhookUrl();
  if (!url) {
    // 即使在尚未配置雲端 Webhook 狀態下，點擊刷新也立即重繪本地最新手速天梯榜
    if (typeof renderLeaderboardTable === 'function') renderLeaderboardTable();
    if (typeof renderSpeedLeaderboardTable === 'function') renderSpeedLeaderboardTable();
    if (!silent) {
      inspectWebhookStatus();
    }
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    isFetchingCloudLeaderboard = true;
    if (!silent) showPassToast('⏳ 正在同步 Google 雲端試算表最新榮譽榜...');

    await new Promise(r => setTimeout(r, Math.random() * 300));

    const queryUrl = url + (url.includes('?') ? '&' : '?') + 'action=get_data&t=' + Date.now();
    const res = await fetch(queryUrl, { method: 'GET', signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('伺服器 HTTP 狀態碼: ' + res.status);

    const data = await res.json();
    if (data && data.status === 'success') {
      if (Array.isArray(data.combatLeaderboard) && data.combatLeaderboard.length > 0) {
        DATA.benchmark_leaderboard = data.combatLeaderboard.map(item => {
          const pts = (typeof item.grandTotal === 'number') ? item.grandTotal : 
                      ((typeof item.score === 'number') ? item.score : (parseInt(item.totalScore, 10) || 0));
          const badge = item.badge || item.title || '🥉【新手訓練家】';
          const time = item.lastTime || item.date || '';
          return {
            ...item,
            score: pts,
            grandTotal: pts,
            total: pts,
            title: badge,
            badge: badge,
            kills: (typeof item.kills === 'number') ? item.kills : 0,
            date: time,
            lastTime: time
          };
        });
        // ⚠️ 嚴格遵循規範：全級前40名龍虎榜（Tab 1）為第 5 周功課 1-4 成績榜（來源是 26-27_四年級_每周打字積分記錄檔案）
        // 排名條件為功課1-4總分(最高400分)及交齊時間，絕不能以錯字討伐魔王積分 (combatLeaderboard) 作為排名條件！
      }
      if (data.speedLeaderboard || data.speedByWeek || data.speedRecords) {
        DATA.cloud_speed_records = data.speedLeaderboard || data.speedByWeek || data.speedRecords;
      }
      // 僅在雲端明確提供 homeworkTop40 時才更新 DATA.top40，嚴禁使用 combatLeaderboard 覆蓋
      if (Array.isArray(data.homeworkTop40) && data.homeworkTop40.length > 0) {
        DATA.top40 = data.homeworkTop40;
      }
      if (data.class_top10) DATA.class_top10 = data.class_top10;
      if (data.perfect_students) DATA.perfect_students = data.perfect_students;

      if (data.weeklyBanks && typeof data.weeklyBanks === 'object' && Object.keys(data.weeklyBanks).length > 0) {
        window.MODE2_WEEKLY_BANKS = data.weeklyBanks;
        if (typeof initSpeedWeekDropdown === 'function') {
          try { initSpeedWeekDropdown(); } catch(e) {}
        }
        Object.values(window.MODE2_WEEKLY_BANKS).forEach(b => {
          if (b && Array.isArray(b.words)) {
            b.words.forEach(w => {
              if (typeof autoDeriveWordKeys === 'function') autoDeriveWordKeys(w);
            });
          }
        });
      }

      renderLeaderboardTable();
      renderSpeedLeaderboardTable();

      if (currentStudent) {
        try { loadStudentProfile(); } catch(e) {}
        try { renderSkillsHall(); } catch(e) {}
      }
      try { renderTop40(); } catch(e){}
      try { renderClassBarCharts(); } catch(e){}
      try { renderClassCards(); } catch(e){}
      try { renderPerfectScorers(); } catch(e){}

      lastCloudSyncTime = new Date();
      if (!silent) showPassToast('⚡ 雲端試算表最新榮譽榜已即時同步！');
    } else {
      throw new Error((data && data.message) ? data.message : '後端回傳格式非 success');
    }
  } catch(err) {
    clearTimeout(timeoutId);
    console.warn('雲端載入提醒 (自動維持本機安全離線模式):', err);
    if (typeof renderLeaderboardTable === 'function') renderLeaderboardTable();
    if (typeof renderSpeedLeaderboardTable === 'function') renderSpeedLeaderboardTable();
    if (!silent) showPassToast('⚠️ 雲端連線失敗: ' + (err.message || '權限或跨域阻擋'));
  } finally {
    isFetchingCloudLeaderboard = false;
  }
}

// =========================================================================
    // 🎮 全域遊戲狀態變數集中顯式宣告 (嚴格防止 ReferenceError)
    // =========================================================================
    let activeTab = 'top40';
    let currentLeaderboardType = 'combat';
    let speedLeaderboardWeek = 'w6_hw1';
    let speedLeaderboardWordCount = 10;
    let currentSpeedWeek = 'w6_hw1';
    let currentSpeedWordCount = 10;
    let isSpeedPracticeMode = false;
    let currentClass = 'P4A';
    let kioskInterval = null;
    let isKiosk = false;
    let speedWordList = [];
    let speedWordIdx = 0;
    let speedInputCodes = [];
    let speedStartTime = null;
    let speedTimerInterval = null;
    let speedPenaltySeconds = 0.0;
    let speedMistakes = 0;
    let speedTotalKeys = 0;
    let speedCorrectKeys = 0;
    let speedHintTimer = null;
    let speedActive = false;
    let speedWordReadyForSpace = false;
    let options = [];
    let roundMistakeCount = 0;

    // Confetti Engine
    function burstConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const pieces = [];
      const colors = ['#FACC15', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6', '#F97316'];
      
      for (let i = 0; i < 95; i++) {
        pieces.push({
          x: canvas.width * 0.5,
          y: canvas.height * 0.35,
          vx: (Math.random() - 0.5) * 18,
          vy: (Math.random() - 0.7) * 18,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 14,
          gravity: 0.35,
          opacity: 1
        });
      }
      
      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        pieces.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.rotation += p.vrot;
          p.opacity -= 0.009;
          
          if (p.opacity > 0) {
            alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
            ctx.restore();
          }
        });
        if (alive) requestAnimationFrame(render);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      render();
    }

    // Helper: Deterministic pseudo-random Pokemon for students
    function getStudentPokemon(strId) {
      let hash = 0;
      for (let i = 0; i < strId.length; i++) {
        hash = (hash << 5) - hash + strId.charCodeAt(i);
        hash |= 0;
      }
      const idx = Math.abs(hash) % DATA.pokemon_pool.length;
      return DATA.pokemon_pool[idx];
    }

    // Tab Switching
    function switchTab(tabId) {
      activeTab = tabId;
      document.querySelectorAll('.tab-btn').forEach(b => {
        const onclick = b.getAttribute('onclick') || '';
        b.classList.toggle('active', onclick.includes(tabId));
      });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      
      const targetPanel = document.getElementById('panel-' + tabId);
      if (targetPanel) targetPanel.classList.add('active');
      
      if (tabId === 'top40') {
        try { renderTop40(); } catch(e){ console.error(e); }
        try { renderClassBarCharts(); } catch(e){ console.error(e); }
      } else if (tabId === 'class') {
        try { renderClassCards(); } catch(e){ console.error(e); }
      } else if (tabId === 'perfect') {
        try { renderPerfectScorers(); } catch(e){ console.error(e); }
        try { renderClassBarCharts(); } catch(e){ console.error(e); }
      } else if (tabId === 'game') {
        if (currentStudent) {
          try { startNewSession(); } catch(e){ console.error(e); }
        } else {
          try { initLoginDropdowns(); } catch(e){ console.error(e); }
        }
      } else if (tabId === 'vocab') {
        try { renderVocabTable(); } catch(e){ console.error(e); }
      }
    }

    // Render Tab 1: Top 40 with Pikachu (#1), Charmander (#2), Bulbasaur (#3)
    
    // 📊 統計棒形圖 (Bar Chart) 生成組件
    function buildBarChartHtml(title, subtitle, dataList, maxVal, barGradient, totalBadge) {
      const barsHtml = dataList.map(item => {
        const pct = Math.max(12, Math.round((item.val / Math.max(1, maxVal)) * 100));
        return `
          <div class="chart-bar-col">
            <div class="chart-bar-val">${item.val} 人</div>
            <div class="chart-bar-pillar" style="height: ${pct}%; background: ${barGradient};" title="${item.cls}：${item.val} 人"></div>
            <div class="chart-bar-label">${item.cls}</div>
          </div>
        `;
      }).join('');

      return `
        <div class="chart-container-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">${title}</div>
              <div style="font-size: 12px; color: #64748B; margin-top: 2px;">${subtitle}</div>
            </div>
            <div class="stat-pill" style="font-size: 12px; padding: 3px 10px; background: #F8FAFC; border-color: #CBD5E1;">
              <strong>${totalBadge}</strong>
            </div>
          </div>
          <div class="chart-bars-wrap">
            ${barsHtml}
          </div>
        </div>
      `;
    }

    function renderClassBarCharts() {
      const classes = ['P4A', 'P4B', 'P4C', 'P4D', 'P4E', 'P4F'];

      // 1. 各班入選前 40 名人數分佈統計
      const top40Counts = {};
      DATA.top40.forEach(s => top40Counts[s.cls] = (top40Counts[s.cls] || 0) + 1);
      let maxTop40 = 1;
      classes.forEach(c => {
        if ((top40Counts[c] || 0) > maxTop40) maxTop40 = top40Counts[c];
      });
      const top40Data = classes.map(c => ({ cls: c, val: top40Counts[c] || 0 }));
      const chartTop40El = document.getElementById('chart-top40-container');
      if (chartTop40El) {
        chartTop40El.innerHTML = buildBarChartHtml(
          '📊 各班入選全級前 40 名人數分佈 (統計棒形圖)',
          '統計 P4A 至 P4F 各班在全級前 40 名龍虎榜中所佔之傑出訓練家人數',
          top40Data,
          maxTop40,
          'linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)',
          '全級前40名合計：40 人'
        );
      }

      // 2. 各班 400 分大滿貫人數分佈統計
      let maxPerf = 1;
      let totalPerf = 0;
      const perfData = classes.map(c => {
        const count = (DATA.perfect_students[c] || []).length;
        if (count > maxPerf) maxPerf = count;
        totalPerf += count;
        return { cls: c, val: count };
      });
      const chartPerfEl = document.getElementById('chart-perfect-container');
      if (chartPerfEl) {
        chartPerfEl.innerHTML = buildBarChartHtml(
          '📊 各班 400 分大滿貫滿分人數分佈 (統計棒形圖)',
          '統計各班達成 4 次作業 400 分全滿分榮譽之訓練家人數',
          perfData,
          maxPerf,
          'linear-gradient(180deg, #FDE047 0%, #D97706 100%)',
          `全級滿分合計：${totalPerf} 人`
        );
      }
    }

    function renderTop40() {
      if (!DATA || !DATA.top40 || DATA.top40.length === 0) {
        const podiumArea = document.getElementById('podium-area');
        if (podiumArea) podiumArea.innerHTML = '<div style="text-align:center; padding:20px; color:#64748B; font-weight:800;">⏳ 榜單同步中，請稍候...</div>';
        const listArea = document.getElementById('top40-list');
        if (listArea) listArea.innerHTML = '<div style="text-align:center; padding:20px; color:#64748B;">目前暫無排行紀錄</div>';
        return;
      }
      const top1 = DATA.top40[0] || { name: '訓練家', cls: 'P4', num: 1, total: 400, badges: 5, date: '' };
      const top2 = DATA.top40[1] || { name: '訓練家', cls: 'P4', num: 2, total: 400, badges: 5, date: '' };
      const top3_item = DATA.top40[2] || { name: '訓練家', cls: 'P4', num: 3, total: 400, badges: 5, date: '' };
      const top3 = [top1, top2, top3_item];
      const rest = DATA.top40.slice(3);
      
      // Podium with Pikachu, Charmander, Bulbasaur
      const podiumArea = document.getElementById('podium-area');
      podiumArea.innerHTML = `
        <div class="podium-step podium-2">
          <div class="crown-banner">🥈</div>
          <img class="podium-pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" alt="小火龍" title="小火龍 (Charmander) 🔥" onerror="handlePodiumImgError(this, '🔥')">
          <div class="podium-name">${top3[1].name}</div>
          <div class="podium-class">${top3[1].cls} (${top3[1].num}號) · 小火龍之火</div>
          <div class="podium-badge-score">400分 · 5印章</div>
          <div class="podium-time">⏱️ ${top3[1].date.replace('2026-', '')}</div>
        </div>
        <div class="podium-step podium-1">
          <div class="crown-banner">👑</div>
          <img class="podium-pokemon-img" style="width:88px; height:88px;" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="皮卡丘" title="皮卡丘 (Pikachu) ⚡" onerror="handlePodiumImgError(this, '⚡')">
          <div class="podium-name">${top3[0].name}</div>
          <div class="podium-class">${top3[0].cls} (${top3[0].num}號) · 皮卡丘雷霆</div>
          <div class="podium-badge-score">400分 · 5印章</div>
          <div class="podium-time">⏱️ ${top3[0].date.replace('2026-', '')}</div>
        </div>
        <div class="podium-step podium-3">
          <div class="crown-banner">🥉</div>
          <img class="podium-pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="妙蛙種子" title="妙蛙種子 (Bulbasaur) 🍃" onerror="handlePodiumImgError(this, '🍃')">
          <div class="podium-name">${top3[2].name}</div>
          <div class="podium-class">${top3[2].cls} (${top3[2].num}號) · 妙蛙飛葉</div>
          <div class="podium-badge-score">400分 · 5印章</div>
          <div class="podium-time">⏱️ ${top3[2].date.replace('2026-', '')}</div>
        </div>
      `;

      // Render rank 4-40 (其中第 4 至 10 名配有璀璨閃爍光環與 TOP 10 榮譽特效)
      const restPool = DATA.pokemon_pool.slice(3);
      const listArea = document.getElementById('top40-list');
      listArea.innerHTML = rest.map((s, idx) => {
        const pm = restPool[idx % restPool.length];
        const isElite = (s.rank >= 4 && s.rank <= 10);
        return `
          <div class="rank-card ${isElite ? 'rank-card-elite-flash' : ''}" data-student="${s.cls}-${s.num}-${s.name}">
            <div class="rank-left">
              <div class="rank-poke-avatar" style="background:${pm.color}; border-color:${pm.border};" title="${pm.name}">
                <img class="rank-poke-img" src="${pm.img}" alt="${pm.name}" onerror="handleRankImgError(this, '${pm.icon || '⚡'}')">
              </div>
              <div>
                <div class="st-name">
                  #${s.rank} ${s.name} <span class="st-poke-tag">${pm.name}</span>
                  ${isElite ? '<span class="badge-elite-top10">✨ TOP 10 菁英</span>' : ''}
                </div>
                <div class="st-class">${s.cls} · ${s.num}號 · 夥伴：${pm.name} (${pm.tag})</div>
              </div>
            </div>
            <div class="rank-right">
              <div class="st-score">${s.total} 分</div>
              <div class="st-date">交齊: ${s.date.replace('2026-', '')}</div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Tab 2: Class Top 10 with Random Pokemon Avatars
    function switchClass(cls) {
      currentClass = cls;
      document.querySelectorAll('.cls-chip').forEach(c => {
        c.classList.toggle('active', c.textContent.includes(cls));
      });
      renderClassCards();
    }

    function renderClassCards() {
      const container = document.getElementById('class-cards');
      if (!container) return;
      const students = (DATA && DATA.class_top10 && DATA.class_top10[currentClass]) ? DATA.class_top10[currentClass] : [];
      if (students.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#64748B; font-weight:800;">目前該班暫無排行紀錄</div>';
        return;
      }
      const classOffset = ['P4A', 'P4B', 'P4C', 'P4D', 'P4E', 'P4F'].indexOf(currentClass) * 14;
      
      container.innerHTML = students.map((s, idx) => {
        const pm = DATA.pokemon_pool[(classOffset + idx) % DATA.pokemon_pool.length];
        let medal = '';
        let cardClass = 'rank-card';
        let honorBadge = '';

        // 各班前 10 名榮譽榜：前 3 名配置冠軍、亞軍、季軍專屬流光閃爍特效
        if (idx === 0) {
          medal = '🥇 ';
          cardClass += ' rank-card-class-champion';
          honorBadge = '<span class="badge-class-honor gold">👑 班級冠軍</span>';
        } else if (idx === 1) {
          medal = '🥈 ';
          cardClass += ' rank-card-class-runnerup';
          honorBadge = '<span class="badge-class-honor silver">🥈 班級亞軍</span>';
        } else if (idx === 2) {
          medal = '🥉 ';
          cardClass += ' rank-card-class-third';
          honorBadge = '<span class="badge-class-honor bronze">🥉 班級季軍</span>';
        }

        return `
          <div class="${cardClass}" data-student="${currentClass}-${s.num}-${s.name}">
            <div class="rank-left">
              <div class="rank-poke-avatar" style="background:${pm.color}; border-color:${pm.border};" title="${pm.name}">
                <img class="rank-poke-img" src="${pm.img}" alt="${pm.name}" onerror="handleRankImgError(this, '${pm.icon || '⚡'}')">
              </div>
              <div>
                <div class="st-name">
                  ${medal}#${s.rank} ${s.name} <span class="st-poke-tag">${pm.name}</span>
                  ${honorBadge}
                </div>
                <div class="st-class">${currentClass} · ${s.num}號 · 夥伴：${pm.name} (${pm.tag})</div>
              </div>
            </div>
            <div class="rank-right">
              <div class="st-score">${s.total} 分</div>
              <div class="st-date">⏱️ ${s.date.replace('2026-', '')}</div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Tab 3: Perfect Scorers with Random Pokemon Avatars
        function renderPerfectScorers() {
      const container = document.getElementById('perfect-class-groups');
      if (!container) return;
      const classes = ['P4A', 'P4B', 'P4C', 'P4D', 'P4E', 'P4F'];
      let globalCounter = 0;
      
      container.innerHTML = classes.map(cls => {
        const members = (DATA && DATA.perfect_students && DATA.perfect_students[cls]) ? DATA.perfect_students[cls] : [];
        return `
          <div style="margin-bottom: 22px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 18px; font-weight: 900; color: #1E3A8A;">● ${cls} 班</span>
              <span style="background: #DBEAFE; color: #1D4ED8; font-size: 12px; font-weight: 800; padding: 2px 10px; border-radius: 12px;">共 ${members.length} 位滿分</span>
            </div>
            <div class="perfect-grid">
              ${members.map((m) => {
                const pm = DATA.pokemon_pool[(globalCounter++) % DATA.pokemon_pool.length];
                return `
                  <div class="star-card" data-student="${cls}-${m}">
                    <div class="star-avatar" title="${pm.name}">
                      <img class="star-poke-img" src="${pm.img}" alt="${pm.name}" onerror="handleRankImgError(this, '${pm.icon || '⭐'}')">
                    </div>
                    <div class="star-name">${m}</div>
                    <div class="star-cls">${pm.name} · 400分</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Tab 5: Vocab Table
    function renderVocabTable() {
      const tbody = document.getElementById('vocab-tbody');
      tbody.innerHTML = DATA.cangjie_words.map((w, idx) => `
        <tr>
          <td style="font-weight: 800; color: #1E3A8A;">第 ${idx + 1} 名</td>
          <td style="font-size: 22px; font-weight: 900; color: #DC2626;">${w.char}</td>
          <td style="font-weight: 800;">${w.count} 人次</td>
          <td style="color: #64748B;">${w.hw}</td>
          <td><span style="background: #DBEAFE; color: #1D4ED8; padding: 3px 8px; border-radius: 6px; font-weight: 800;">${w.first_code} (${w.first_key}) ＋ ${w.last_code} (${w.last_key})</span></td>
          <td style="text-align: left; font-size: 12px; color: #334155;">${w.secret}</td>
        </tr>
      `).join('');
    }

    
    // =========================================================================
    // 🎮 寶可夢隨機遊行抓寶小遊戲 · 5關挑戰、零假分、首尾同碼修復與平穩數值
    // =========================================================================

    

    let currentStudent = null;       // { cls, num, name }
    let gameStage = 1;               // 5 關挑戰制：當前關卡 (1..5)
    let sessionScore = 0;            // 當前輪次累積得分
    let sessionCorrectCount = 0;     // 當前輪次答對關數
    let comboCount = 0;              // 連擊次數
    let selectedFirst = null;        // { code, key, char }
    let selectedLast = null;         // { code, key, char }
    let currentQuiz = null;
    let activeSkills = [];           // 已解鎖技能
    let roundShieldActive = false;   // 本回合聖盾
    let autoNextTimer = null;        // 模式2與模式3過關自動跳轉計時器
    let wanderingSpeedMultiplier = 1.0;

    // 浮動通關通知橫幅
    function triggerStagePassToast(modeLabel, stageNum, scoreEarned, nextStageNum) {
      const toast = document.getElementById('stage-pass-toast');
      const icon = document.getElementById('stage-pass-toast-icon');
      const text = document.getElementById('stage-pass-toast-text');
      if (!toast) return;

      icon.textContent = nextStageNum ? '🎉' : '🏆';
      if (nextStageNum) {
        text.innerHTML = `<strong>${modeLabel}</strong> 第 ${stageNum} 關 通關成功！<span style="color:#FEF08A;font-weight:900;">+${scoreEarned} 分</span> ➔ 自動進入第 ${nextStageNum} 關...`;
      } else {
        text.innerHTML = `<strong>${modeLabel}</strong> 5 關挑戰全數通關！<span style="color:#FEF08A;font-weight:900;">+${scoreEarned} 分</span> ➔ 正在進行總結算...`;
      }
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 1600);
    }
    let animationFrameId = null;
    let activeOrbs = [];             // 畫面上的遊行球物體集合
    let currentGameMode = 'typo';    // 'typo' | 'aux' | 'letter'

    // 切換三大模式
    function setGameMode(mode) {
      if (autoNextTimer) { clearTimeout(autoNextTimer); autoNextTimer = null; }
      if (speedTimerInterval) clearInterval(speedTimerInterval);
      if (speedHintTimer) clearTimeout(speedHintTimer);
      window.removeEventListener('keydown', handleSpeedKeydown, true);

      // 移除目前聚焦的按鈕，防止按空白鍵觸發按鈕點擊
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }

      currentQuiz = null;
      currentGameMode = mode;

      document.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('mode-tab-' + mode);
      if (activeBtn) activeBtn.classList.add('active');

      const speedSection = document.getElementById('speed-arena-section');
      const wildArena = document.getElementById('capture-arena');
      const monsterIcon = document.getElementById('monster-icon');
      const targetSubHint = document.getElementById('target-sub-hint');
      const standardSlots = document.getElementById('slots-row') || document.getElementById('standard-slots-row');
      const secretBox = document.getElementById('secret-box');
      const targetChar = document.getElementById('target-char');

      if (mode === 'speed') {
        // ⚡ 進入模式 4：展示備戰大廳，不直接開始計時
        if (speedSection) speedSection.style.display = 'block';
        if (wildArena) wildArena.style.display = 'none';
        if (monsterIcon) monsterIcon.style.display = 'none';
        if (targetSubHint) targetSubHint.style.display = 'none';
        if (standardSlots) standardSlots.style.display = 'none';
        if (secretBox) secretBox.style.display = 'none';
        if (targetChar) targetChar.style.display = 'none';

        document.getElementById('game-prompt').style.display = 'none';
        initSpeedWeekDropdown();
        returnToSpeedReadyStage();

        window.addEventListener('keydown', handleSpeedKeydown, true);
      } else {
        // 模式 1、2、3
        if (speedSection) speedSection.style.display = 'none';
        if (wildArena) wildArena.style.display = 'block';
        if (monsterIcon) monsterIcon.style.display = 'block';
        if (targetSubHint) targetSubHint.style.display = 'block';
        if (standardSlots) standardSlots.style.display = 'flex';
        if (targetChar) targetChar.style.display = 'block';
        document.getElementById('game-prompt').style.display = 'block';

        startNewSession();
      }
    }

    // 1. 初始化學號下拉選單 (1 至 36)
    function initLoginDropdowns() {
      const numSelect = document.getElementById('login-num-select');
      if (numSelect && (!numSelect.options || numSelect.options.length === 0)) {
        let opts = '';
        for (let i = 1; i <= 36; i++) {
          opts += `<option value="${i}">${i} 號</option>`;
        }
        numSelect.innerHTML = opts;
      }
      updateIdentityPreview();
    }

    // 2. 即時比對姓名預覽 (Zero-PII)
    function updateIdentityPreview() {
      const cls = document.getElementById('login-class-select').value;
      const num = parseInt(document.getElementById('login-num-select').value);
      let name = "訓練家";
      if (!CONFIG.GITHUB_PRIVACY_MODE && DATA.roster && DATA.roster[cls] && DATA.roster[cls][num]) {
        name = DATA.roster[cls][num];
      }
      const previewEl = document.getElementById('preview-student-name');
      if (previewEl) previewEl.textContent = `${cls} 班 ${num} 號 - ${name}`;
    }

    // 3. 彈出確認身份視窗
    function openIdentityConfirmModal() {
      const cls = document.getElementById('login-class-select').value;
      const num = parseInt(document.getElementById('login-num-select').value);
      let name = "訓練家";
      if (!CONFIG.GITHUB_PRIVACY_MODE && DATA.roster && DATA.roster[cls] && DATA.roster[cls][num]) {
        name = DATA.roster[cls][num];
      }

      document.getElementById('modal-confirm-class').textContent = `${cls} 班`;
      document.getElementById('modal-confirm-num').textContent = `${num} 號`;
      document.getElementById('modal-confirm-name').textContent = name;

      document.getElementById('modal-confirm').style.display = 'flex';
    }

    // 4. 確認並開始遊戲
    function confirmAndStartGame() {
      closeModal('modal-confirm');
      const cls = document.getElementById('login-class-select').value;
      const num = parseInt(document.getElementById('login-num-select').value);
      let name = "訓練家";
      if (!CONFIG.GITHUB_PRIVACY_MODE && DATA.roster && DATA.roster[cls] && DATA.roster[cls][num]) {
        name = DATA.roster[cls][num];
      }

      currentStudent = { cls, num, name };
      SafeStorage.setItem('p4_active_student', JSON.stringify(currentStudent));

      loadStudentProfile();

      document.getElementById('identity-section').style.display = 'none';
      document.getElementById('battle-section').style.display = 'block';

      startNewSession();
      burstConfetti();
    }

    // 5. 切換身份
    function switchIdentity() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      currentStudent = null;
      SafeStorage.removeItem('p4_active_student');
      document.getElementById('battle-section').style.display = 'none';
      document.getElementById('identity-section').style.display = 'block';
      initLoginDropdowns();
    }

    // 6. 讀取與計算學生戰報 (三模式分項記錄)
        // 🎈 浮動扣分與罰時標籤動畫生成器
    function triggerFloatingNotice(targetEl, text) {
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const tag = document.createElement('div');
      tag.className = 'floating-deduct-tag';
      tag.textContent = text;
      tag.style.left = (rect.left + rect.width / 2) + 'px';
      tag.style.top = rect.top + 'px';
      document.body.appendChild(tag);
      setTimeout(() => tag.remove(), 850);
    }

    function getStudentStats(cls, num) {
      const key = `p4_score_${cls}_${num}`;
      const saved = SafeStorage.getItem(key);
      let stats = {
        totalScore: 0, kills: 0,
        typoScore: 0, typoKills: 0,
        auxScore: 0, auxKills: 0,
        letterScore: 0, letterKills: 0,
        speedScore: 0, speedKills: 0
      };
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.assign(stats, parsed);
        } catch(e) {}
      }

      // 🛡️ 雙向同步：從雲端榜單/基準資料庫獲取最新試算表真實累計總分與擊破數
      if (typeof DATA !== 'undefined' && Array.isArray(DATA.benchmark_leaderboard)) {
        const padNum = parseInt(num, 10);
        const cloudMatch = DATA.benchmark_leaderboard.find(item => 
          item.cls === cls && parseInt(item.num, 10) === padNum
        );
        if (cloudMatch) {
          const cloudPts = (typeof cloudMatch.grandTotal === 'number') ? cloudMatch.grandTotal : 
                           ((typeof cloudMatch.score === 'number') ? cloudMatch.score : (parseInt(cloudMatch.totalScore, 10) || 0));
          if (cloudPts > stats.totalScore) {
            stats.totalScore = cloudPts;
          }
          if (cloudMatch.kills && cloudMatch.kills > stats.kills) {
            stats.kills = cloudMatch.kills;
          }
        }
      }
      return stats;
    }

    function saveStudentStats(cls, num, addScore, addKill, mode, bestTime = null, wordCount = 10, weekKey = 'w6_hw1') {
      const current = getStudentStats(cls, num);
      const updated = {
        totalScore: current.totalScore + addScore,
        kills: current.kills + (addKill ? 1 : 0),
        typoScore: current.typoScore + (mode === 'typo' ? addScore : 0),
        typoKills: current.typoKills + (mode === 'typo' && addKill ? 1 : 0),
        auxScore: current.auxScore + (mode === 'aux' ? addScore : 0),
        auxKills: current.auxKills + (mode === 'aux' && addKill ? 1 : 0),
        letterScore: current.letterScore + (mode === 'letter' ? addScore : 0),
        letterKills: current.letterKills + (mode === 'letter' && addKill ? 1 : 0),
        speedScore: (current.speedScore || 0) + (mode === 'speed' ? addScore : 0),
        speedKills: (current.speedKills || 0) + (mode === 'speed' && addKill ? 1 : 0),
        lastMode: mode,
        lastTime: new Date().toISOString()
      };
      SafeStorage.setItem(`p4_score_${cls}_${num}`, JSON.stringify(updated));

      // 同步內存基準排行榜資料，使學生切換分頁或打開技能館時立即感知最新總分與手速成績
      if (typeof DATA !== 'undefined' && Array.isArray(DATA.benchmark_leaderboard)) {
        const padNum = parseInt(num, 10);
        const match = DATA.benchmark_leaderboard.find(item => item.cls === cls && parseInt(item.num, 10) === padNum);
        if (match) {
          match.score = updated.totalScore;
          match.grandTotal = updated.totalScore;
          match.total = updated.totalScore;
          match.kills = updated.kills;
          if (mode === 'speed' && bestTime) {
            match.weekly_speed = match.weekly_speed || {};
            if (!match.weekly_speed[weekKey] || bestTime < match.weekly_speed[weekKey]) {
              match.weekly_speed[weekKey] = bestTime;
            }
            if (wordCount === 10) {
              if (!match.best10 || bestTime < match.best10) {
                match.best10 = bestTime;
              }
            }
          }
        }
      }

      // 同步記憶體雲端手速快取
      if (mode === 'speed' && bestTime && typeof DATA !== 'undefined') {
        if (!DATA.cloud_speed_records) DATA.cloud_speed_records = {};
        if (!DATA.cloud_speed_records[weekKey]) DATA.cloud_speed_records[weekKey] = [];
        const existing = DATA.cloud_speed_records[weekKey].find(x => x.cls === cls && parseInt(x.num, 10) === parseInt(num, 10));
        if (existing) {
          if (!existing.bestTime || bestTime < existing.bestTime) {
            existing.bestTime = bestTime;
            existing.best10 = bestTime;
            existing.cpm = Math.round(10 / (bestTime / 60));
            existing.tier = getSpeedTier(bestTime, 10);
          }
        } else {
          DATA.cloud_speed_records[weekKey].push({
            cls: cls,
            num: parseInt(num, 10),
            name: `${cls} ${(parseInt(num, 10) < 10 ? '0' : '') + parseInt(num, 10)}號`,
            bestTime: bestTime,
            best10: bestTime,
            cpm: Math.round(10 / (bestTime / 60)),
            accuracy: 100,
            tier: getSpeedTier(bestTime, 10),
            weekKey: weekKey
          });
        }
      }

      if (typeof loadStudentProfile === 'function') {
        try { loadStudentProfile(); } catch(e) {}
      }
      if (typeof renderSkillsHall === 'function') {
        try { renderSkillsHall(); } catch(e) {}
      }
      if (mode === 'speed' && typeof renderSpeedLeaderboardTable === 'function') {
        try { renderSpeedLeaderboardTable(); } catch(e) {}
      }

      // 背景發送可靠 Webhook 至 Google Apps Script
      sendReliableWebhook({
        grade: 4,
        cls: cls,
        num: num,
        roundScore: addScore,
        scoreDelta: addScore,
        gameMode: mode,
        mode: mode,
        bestTime: bestTime,
        wordCount: wordCount,
        weekKey: weekKey,
        totalScore: updated.totalScore,
        kills: updated.kills,
        timestamp: updated.lastTime
      });

      return updated;
    }

    function sendWebhookScoreUpdate(cls, num, roundScore, totalKills, mode) {
      if (!CONFIG.GAS_WEBHOOK_URL || CONFIG.GAS_WEBHOOK_URL.includes("YourDeploymentIdHere")) {
        return;
      }
      const payload = {
        cls: cls,
        num: num,
        roundScore: roundScore,
        kills: totalKills,
        gameMode: mode || 'typo',
        name: currentStudent ? currentStudent.name : "",
        timestamp: new Date().toISOString()
      };

      try {
        fetch(CONFIG.GAS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).then(() => {}).catch(err => {});
      } catch (err) {}
    }

    function triggerSkillToast(icon, text) {
      const toast = document.getElementById('skill-toast');
      document.getElementById('skill-toast-icon').textContent = icon;
      document.getElementById('skill-toast-text').textContent = text;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2600);
    }

    // 7. 開啟新一輪 5 關挑戰
    
    // =========================================================================
    // 🛠️ 輔助工具函式與設定變更監聽
    // =========================================================================
    function loadStudentProfile() {
      if (!currentStudent) return;
      try {
        const stats = getStudentStats(currentStudent.cls, currentStudent.num);
        const { currentTier, unlockedSkills } = evalTierAndSkills(stats.totalScore);
        activeSkills = unlockedSkills;

        const badgeEl = document.getElementById("trainer-current-badge");
        const nameEl = document.getElementById("trainer-display-name");
        const titleEl = document.getElementById("trainer-display-title");
        const scoreEl = document.getElementById("trainer-display-score");
        const killsEl = document.getElementById("trainer-display-kills");

        if (badgeEl) badgeEl.textContent = currentTier.badge;
        if (nameEl) nameEl.textContent = currentStudent.cls + " " + currentStudent.num + "號 " + currentStudent.name;
        if (titleEl) titleEl.textContent = currentTier.title;
        if (scoreEl) scoreEl.textContent = stats.totalScore.toLocaleString();
        if (killsEl) killsEl.textContent = stats.kills;
      } catch(e) {
        console.warn("loadStudentProfile error:", e);
      }
    }

    function calculateEffectiveSpeedTime(rawTime, mistakes, accuracy, wordCount) {
      const keyPenalty = mistakes * 0.3;
      const baseFactor = (wordCount === 20) ? 30.0 : 15.0;
      const accRatio = Math.max(0, Math.min(100, accuracy)) / 100;
      const accPenalty = Math.round(baseFactor * (1 - Math.pow(accRatio, 2)) * 100) / 100;
      const bonus = (accuracy >= 100) ? ((wordCount === 20) ? 2.0 : 1.0) : 0.0;
      const effectiveTime = parseFloat((rawTime + keyPenalty + accPenalty - bonus).toFixed(2));
      return {
        keyPenalty: parseFloat(keyPenalty.toFixed(2)),
        accPenalty: parseFloat(accPenalty.toFixed(2)),
        bonus: parseFloat(bonus.toFixed(2)),
        effectiveTime: Math.max(1.0, effectiveTime)
      };
    }

    function handlePodiumImgError(el, icon) {
      if (el) el.outerHTML = "<div class=\"podium-pokemon-icon\">" + icon + "</div>";
    }

    function handleRankImgError(el, icon) {
      if (el) el.outerHTML = icon || "⚡";
    }

    function onSpeedSettingChange() {
      const wcSelect = document.getElementById("speed-word-count-select");
      const wkSelect = document.getElementById("speed-ready-week-select");
      if (wcSelect) currentSpeedWordCount = parseInt(wcSelect.value, 10) || 10;
      if (wkSelect) currentSpeedWeek = wkSelect.value || "w6_hw1";
    }

    function toggleSpeedPracticeMode() {
      isSpeedPracticeMode = !isSpeedPracticeMode;
      const btn = document.getElementById("speed-mode-toggle-btn");
      if (btn) {
        if (isSpeedPracticeMode) {
          btn.innerHTML = "💡 練習模式 (全程字根可見)";
          btn.style.color = "#34D399";
          btn.style.borderColor = "#10B981";
          btn.style.background = "#0F172A";
        } else {
          btn.innerHTML = "⚔️ 競技排位賽 (停頓3秒提燈)";
          btn.style.color = "#FDE047";
          btn.style.borderColor = "#FACC15";
          btn.style.background = "#0F172A";
        }
      }
      if (speedActive && typeof renderSpeedTargetWord === "function") {
        renderSpeedTargetWord();
      }
    }

    function triggerSkillToast(icon, text) {
      const toast = document.getElementById("skill-toast");
      const iconEl = document.getElementById("skill-toast-icon");
      const textEl = document.getElementById("skill-toast-text");
      if (iconEl) iconEl.textContent = icon;
      if (textEl) textEl.textContent = text;
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 2600);
      }
    }

    function startNewSession() {
      if (autoNextTimer) { clearTimeout(autoNextTimer); autoNextTimer = null; }
      gameStage = 1;
      sessionScore = 0;
      sessionCorrectCount = 0;
      comboCount = 0;
      document.getElementById('session-summary-box').style.display = 'none';
      document.getElementById('active-play-area').style.display = 'block';
      loadStudentProfile();
      loadRound();
    }

    function cancelFirstCode() {
      if (selectedFirst && !selectedLast && currentGameMode === 'typo') {
        selectedFirst = null;
        document.getElementById('slot-first').className = 'code-slot';
        document.getElementById('val-first').textContent = '？';
        document.getElementById('game-prompt').textContent = '已取消首碼，請捕捉【首碼】精靈球！';
        document.getElementById('game-prompt').style.color = '#2563EB';
        activeOrbs.forEach(o => o.el.classList.remove('caught'));
      }
    }

    function setArenaSpeed(speed, activeBtnId) {
      wanderingSpeedMultiplier = speed;
      document.querySelectorAll('.arena-speed-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById(activeBtnId);
      if (activeBtn) activeBtn.classList.add('active');

      let tip = '';
      if (speed > 1.2) {
        tip = '⚡ 切換為【敏捷速度】：精靈球高速遊行，答對享有 1.4x (+40%) 速度積分加成！';
      } else if (speed === 0.0) {
        tip = '⏸️ 切換為【定點輔助】：精靈球靜止不動，簡易模式得分為 0.6x 折減。';
      } else {
        tip = '🟢 切換為【悠閒模式】：標準遊行速度，答對獲取 1.0x 標準分數。';
      }
      showPassToast(tip);
    }

    // 8. 載入當前關卡 (支援三大模式動態切換，模式2支援隨機1-3個答案)
    function loadRound() {
      options = [];
      if (autoNextTimer) { clearTimeout(autoNextTimer); autoNextTimer = null; }

      selectedFirst = null;
      selectedLast = null;
      roundShieldActive = false;
      
      document.getElementById('secret-box').style.display = 'none';
      document.getElementById('btn-next-round').style.display = 'none';
      document.getElementById('game-stage-tag').textContent = `關卡 ${gameStage} / 5`;
      document.getElementById('game-combo-tag').textContent = `連擊：${comboCount} Hit 🔥`;
      document.getElementById('game-score-tag').textContent = `本輪得分：${sessionScore} 分`;

      const slotFirst = document.getElementById('slot-first');
      const slotLast = document.getElementById('slot-last');
      const slotThird = document.getElementById('slot-third');
      const labelFirst = document.getElementById('label-slot-first');
      const labelLast = document.getElementById('label-slot-last');
      const labelThird = document.getElementById('label-slot-third');
      const valFirst = document.getElementById('val-first');
      const valLast = document.getElementById('val-last');
      const valThird = document.getElementById('val-third');

      if (currentGameMode === 'typo') {
        // 模式 1：錯字魔王討伐 (速成首尾碼雙碼)
        document.getElementById('monster-icon').textContent = '👾';
        slotFirst.style.display = 'flex';
        slotFirst.className = 'code-slot';
        valFirst.textContent = '？';
        if (labelFirst) labelFirst.textContent = '① 首碼 (First)';

        slotLast.style.display = 'flex';
        slotLast.className = 'code-slot';
        valLast.textContent = '？';
        if (labelLast) labelLast.textContent = '② 尾碼 (Last)';

        if (slotThird) slotThird.style.display = 'none';

        document.getElementById('game-prompt').textContent = '在下方野生原野區，捕捉正確的【首碼】與【尾碼】能量球！';
        document.getElementById('game-prompt').style.color = '#64748B';

        const randIdx = Math.floor(Math.random() * DATA.cangjie_words.length);
        currentQuiz = DATA.cangjie_words[randIdx];
        document.getElementById('target-char').textContent = currentQuiz.char;
        document.getElementById('target-sub-hint').textContent = `【高頻易錯字速成拆碼】 難度：★★★`;

        function getLetterInfo(code) {
          return DATA.cangjie_clean_letters.find(l => l.code === code) || { code, key: '', aux: '' };
        }
        const firstInfo = getLetterInfo(currentQuiz.first_code);
        const lastInfo = getLetterInfo(currentQuiz.last_code);
        options = [];

        // 核心支援首尾碼相同雙球生成
        options.push({ code: firstInfo.code, key: firstInfo.key, aux: firstInfo.aux, isCorrect: true, orbId: 'code-first' });
        options.push({ code: lastInfo.code, key: lastInfo.key, aux: lastInfo.aux, isCorrect: true, orbId: 'code-last' });

        const distractors = fisherYatesShuffle(
          DATA.cangjie_clean_letters.filter(l => l.code !== currentQuiz.first_code && l.code !== currentQuiz.last_code)
        );

        let distCount = 0;
        while (options.length < 8 && distractors.length > 0) {
          const item = distractors.pop();
          distCount++;
          options.push({ code: item.code, key: item.key, aux: item.aux, isCorrect: false, orbId: 'dist-' + distCount });
        }
        setupWanderingOrbs(fisherYatesShuffle(options));

      } else if (currentGameMode === 'aux') {
        // 模式 2：輔助字型大抓寶 (速成主字母 -> 找出對應輔助字型，隨機 1-3 個選項答案)
        document.getElementById('monster-icon').textContent = '🔮';

        const randIdx = Math.floor(Math.random() * DATA.aux_dataset.length);
        currentQuiz = DATA.aux_dataset[randIdx];
        document.getElementById('target-char').textContent = currentQuiz.code;
        document.getElementById('target-sub-hint').textContent = `類別：${currentQuiz.category} ｜ 鍵盤鍵位：${currentQuiz.key}`;

        // 答案個數：隨機 1-3 個 (不超過該字擁有的輔助字型總數)
        const maxAvailable = (currentQuiz.aux_list && currentQuiz.aux_list.length > 0) ? currentQuiz.aux_list.length : 1;
        const targetCount = Math.min(Math.floor(Math.random() * 3) + 1, maxAvailable);

        const shuffledAux = fisherYatesShuffle([...currentQuiz.aux_list]);
        const targetAuxList = shuffledAux.slice(0, targetCount);
        currentQuiz.targetAuxList = targetAuxList;
        currentQuiz.caughtAuxList = [];

        slotFirst.style.display = 'flex';
        slotFirst.className = 'code-slot';
        valFirst.textContent = '？';

        if (targetCount === 1) {
          if (labelFirst) labelFirst.textContent = '🎯 捕捉目標輔助字型';
          slotLast.style.display = 'none';
          if (slotThird) slotThird.style.display = 'none';
          document.getElementById('game-prompt').textContent = `請在原野中找出屬於速成主字母【 ${currentQuiz.code} 】(${currentQuiz.key}鍵) 的輔助字型精靈球！`;
        } else if (targetCount === 2) {
          if (labelFirst) labelFirst.textContent = '🎯 目標輔助字型 ①';
          slotLast.style.display = 'flex';
          slotLast.className = 'code-slot';
          valLast.textContent = '？';
          if (labelLast) labelLast.textContent = '🎯 目標輔助字型 ②';
          if (slotThird) slotThird.style.display = 'none';
          document.getElementById('game-prompt').textContent = `【 ${currentQuiz.code} 】有多個輔助字型！請在原野中找出 2 個對應的精靈球！(已捕獲 0/2)`;
        } else if (targetCount === 3) {
          if (labelFirst) labelFirst.textContent = '🎯 目標輔助字型 ①';
          slotLast.style.display = 'flex';
          slotLast.className = 'code-slot';
          valLast.textContent = '？';
          if (labelLast) labelLast.textContent = '🎯 目標輔助字型 ②';
          if (slotThird) {
            slotThird.style.display = 'flex';
            slotThird.className = 'code-slot';
            valThird.textContent = '？';
            if (labelThird) labelThird.textContent = '🎯 目標輔助字型 ③';
          }
          document.getElementById('game-prompt').textContent = `【 ${currentQuiz.code} 】有多個輔助字型！請在原野中找出 3 個對應的精靈球！(已捕獲 0/3)`;
        }
        document.getElementById('game-prompt').style.color = '#7C3AED';

        options = [];
        targetAuxList.forEach((auxChar, i) => {
          options.push({
            char: auxChar,
            code: auxChar,
            aux: auxChar,
            parentCode: currentQuiz.code,
            parentKey: currentQuiz.key,
            key: currentQuiz.key,
            isCorrect: true,
            orbId: 'aux-correct-' + i
          });
        });

        let allOtherAux = [];
        DATA.aux_dataset.forEach(item => {
          if (item.code !== currentQuiz.code && item.aux_list) {
            item.aux_list.forEach(ac => {
              allOtherAux.push({
                char: ac,
                code: ac,
                aux: ac,
                parentCode: item.code,
                parentKey: item.key,
                key: item.key
              });
            });
          }
        });
        allOtherAux = fisherYatesShuffle(allOtherAux);

        let distCount = 0;
        while (options.length < 8 && allOtherAux.length > 0) {
          const dist = allOtherAux.pop();
          distCount++;
          options.push({
            char: dist.char,
            code: dist.code,
            aux: dist.aux,
            parentCode: dist.parentCode,
            parentKey: dist.parentKey,
            key: dist.key,
            isCorrect: false,
            orbId: 'aux-dist-' + distCount
          });
        }
        setupWanderingOrbs(fisherYatesShuffle(options));

      } else if (currentGameMode === 'letter') {
        // 模式 3：倉頡字母配對 (英文字母鍵位 -> 找出對應倉頡字母)
        document.getElementById('monster-icon').textContent = '🔤';
        slotFirst.style.display = 'flex';
        slotFirst.className = 'code-slot';
        valFirst.textContent = '？';
        if (labelFirst) labelFirst.textContent = '🎯 捕捉目標倉頡字母';

        slotLast.style.display = 'none';
        if (slotThird) slotThird.style.display = 'none';

        const randIdx = Math.floor(Math.random() * DATA.aux_dataset.length);
        currentQuiz = DATA.aux_dataset[randIdx];
        document.getElementById('target-char').textContent = currentQuiz.key;
        document.getElementById('target-sub-hint').textContent = `鍵盤英文字母：${currentQuiz.key} ｜ 請問對應哪一個速成主字母字根？`;

        document.getElementById('game-prompt').textContent = `鍵位【 ${currentQuiz.key} 】對應哪一個速成主字母字根？快去捕捉！`;
        document.getElementById('game-prompt').style.color = '#059669';

        options = [];
        options = [];
        options.push({
          code: currentQuiz.code,
          key: currentQuiz.key,
          aux: currentQuiz.aux,
          isCorrect: true,
          orbId: 'letter-corr'
        });

        const otherLetters = fisherYatesShuffle(
          DATA.cangjie_clean_letters.filter(item => item.key !== currentQuiz.key)
        );

        let distCount = 0;
        while (options.length < 8 && otherLetters.length > 0) {
          const item = otherLetters.pop();
          distCount++;
          options.push({
            code: item.code,
            key: item.key,
            aux: item.aux,
            isCorrect: false,
            orbId: 'letter-dist-' + distCount
          });
        }
        setupWanderingOrbs(fisherYatesShuffle(options));
      
      }

      // 隨機技能觸發：移除自動將球變灰的干擾邏輯，確保所有精靈球入場時均為正常、鮮明、可點擊的狀態
      const insightSkill = activeSkills.find(s => s.name.includes('雷霆看破'));
      if (insightSkill && Math.random() < insightSkill.rate) {
        // 雷霆看破觸發時，以清晰光環標註輔助提示，絕不將球變灰
        let assisted = 0;
        activeOrbs.forEach(orb => {
          if (orb.isCorrect && assisted < 1) {
            orb.el.classList.add('highlight-focus');
            assisted++;
          }
        });
        triggerSkillToast('🔍', '觸發【雷霆看破】！正確字型球散發微光指引！');
      }

      const focusSkill = activeSkills.find(s => s.name.includes('精準直覺'));
      if (focusSkill && Math.random() < focusSkill.rate) {
        activeOrbs.forEach(orb => {
          if (orb.isCorrect) {
            orb.el.classList.add('highlight-focus');
          }
        });
        triggerSkillToast('⚡', '觸發【精準直覺】！感應到正確精靈球發出強烈能量光暈！');
      }
    }

    // 9. 精靈球遊行物理引擎 (嚴格邊界約束，100% 維持經典精靈球模樣)
    function setupWanderingOrbs(options) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      const arena = document.getElementById('capture-arena');
      const orbsContainer = document.getElementById('orbs-container');
      orbsContainer.innerHTML = '';
      
      const arenaW = arena.clientWidth || 600;
      const arenaH = arena.clientHeight || 280;
      const orbSize = 82;

      // 嚴格安全活動邊界 (預留圓角與邊框緩衝，上方預留控制橫條高度)
      const padX = 18;
      const padTop = 48;     // 確保不會與上方速度按鈕重疊
      const padBottom = 16;  // 確保不會貼住或超出底線
      const minX = padX;
      const maxX = Math.max(minX + 10, arenaW - orbSize - padX);
      const minY = padTop;
      const maxY = Math.max(minY + 10, arenaH - orbSize - padBottom);

      activeOrbs = [];

      options.forEach((opt, idx) => {
        const el = document.createElement('div');
        el.className = 'poke-orb';
        el.id = `orb-${idx}`;

        let charHtml = opt.char || opt.code || '';
        if (currentGameMode === 'aux') {
          // 模式 2：輔助字型 (球內僅顯示輔助字型本身，絕不洩漏所屬字母或鍵位)
          charHtml = opt.char || opt.code || '';
        } else if (currentGameMode === 'letter') {
          // 模式 3：主字母 (球內僅顯示主字母本身，絕不洩漏對應英文字母鍵位)
          charHtml = opt.code || opt.char || '';
        }

        // ★ 純粹精靈球：絕無任何答案提示文字，100% 維持經典紅白雙色精靈球與中心發光按鈕
        el.innerHTML = `
          <div class="poke-orb-center-ring"></div>
          <div class="poke-orb-content">
            <div class="poke-orb-char">${charHtml}</div>
          </div>
        `;

        // 在安全矩形內均勻分散初始位置
        const cols = 4;
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cellW = (maxX - minX) / cols;
        const cellH = (maxY - minY) / 2;
        const initX = minX + col * cellW + Math.random() * (cellW * 0.4);
        const initY = minY + row * cellH + Math.random() * (cellH * 0.4);

        const angle = Math.random() * Math.PI * 2;
        const baseSpeed = 0.85 + Math.random() * 0.5;
        const vx = Math.cos(angle) * baseSpeed;
        const vy = Math.sin(angle) * baseSpeed;

        const orbObj = {
          el: el,
          ...opt,
          x: Math.max(minX, Math.min(maxX, initX)),
          y: Math.max(minY, Math.min(maxY, initY)),
          vx: vx,
          vy: vy,
          isHovered: false
        };

        el.addEventListener('mouseenter', () => { orbObj.isHovered = true; });
        el.addEventListener('mouseleave', () => { orbObj.isHovered = false; });
        el.addEventListener('click', () => { catchOrb(orbObj); });

        orbsContainer.appendChild(el);
        activeOrbs.push(orbObj);
      });

      runWanderingPhysics();
    }

    function runWanderingPhysics() {
      const arena = document.getElementById('capture-arena');
      const arenaW = arena.clientWidth || 600;
      const arenaH = arena.clientHeight || 280;
      const orbSize = 82;

      const padX = 16;
      const padTop = 46;
      const padBottom = 16;
      const minX = padX;
      const maxX = Math.max(minX + 10, arenaW - orbSize - padX);
      const minY = padTop;
      const maxY = Math.max(minY + 10, arenaH - orbSize - padBottom);

      activeOrbs.forEach(o => {
        if (!o.isHovered && wanderingSpeedMultiplier > 0) {
          o.x += o.vx * wanderingSpeedMultiplier;
          o.y += o.vy * wanderingSpeedMultiplier;

          // 嚴密邊界反彈，完全不超出原野藍色邊界
          if (o.x <= minX) {
            o.x = minX;
            o.vx = Math.abs(o.vx);
          } else if (o.x >= maxX) {
            o.x = maxX;
            o.vx = -Math.abs(o.vx);
          }

          if (o.y <= minY) {
            o.y = minY;
            o.vy = Math.abs(o.vy);
          } else if (o.y >= maxY) {
            o.y = maxY;
            o.vy = -Math.abs(o.vy);
          }
        }

        o.el.style.transform = `translate3d(${o.x}px, ${o.y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(runWanderingPhysics);
    }

    // 10. 點選/捕捉精靈球判定 (支援模式2隨機1-3個目標捕捉與答錯引導)
    function catchOrb(orbObj) {
      if (orbObj.el.classList.contains('eliminated')) return;

      if (currentGameMode === 'typo') {
        // 模式 1：兩碼抓寶 (支援首尾同碼容錯)
        if (orbObj.el.classList.contains('caught')) {
          if (selectedFirst && !selectedLast && currentQuiz && currentQuiz.first_code === currentQuiz.last_code && orbObj.code === currentQuiz.last_code) {
            selectedLast = { code: orbObj.code, key: orbObj.key };
            document.getElementById('slot-last').className = 'code-slot filled';
            document.getElementById('val-last').textContent = `${orbObj.code} (${orbObj.key})`;
            checkAnswer();
          }
          return;
        }

        orbObj.el.classList.add('caught');

        if (!selectedFirst) {
          selectedFirst = { code: orbObj.code, key: orbObj.key };
          document.getElementById('slot-first').className = 'code-slot filled';
          document.getElementById('val-first').textContent = `${orbObj.code} (${orbObj.key})`;
          document.getElementById('game-prompt').textContent = '成功捕捉首碼！接著捕捉【尾碼】精靈球發動進攻！';
          document.getElementById('game-prompt').style.color = '#1D4ED8';
        } else if (!selectedLast) {
          selectedLast = { code: orbObj.code, key: orbObj.key };
          document.getElementById('slot-last').className = 'code-slot filled';
          document.getElementById('val-last').textContent = `${orbObj.code} (${orbObj.key})`;
          checkAnswer();
        }

      } else if (currentGameMode === 'aux') {
        // 模式 2：輔助字型大抓寶 (支援隨機 1-3 個答案)
        if (orbObj.el.classList.contains('caught')) return;
        const auxChar = orbObj.char || orbObj.code;

        if (orbObj.isCorrect) {
          orbObj.el.classList.add('caught');
          if (!currentQuiz.caughtAuxList) currentQuiz.caughtAuxList = [];
          if (!currentQuiz.targetAuxList) currentQuiz.targetAuxList = [auxChar];

          if (!currentQuiz.caughtAuxList.includes(auxChar)) {
            currentQuiz.caughtAuxList.push(auxChar);
            const count = currentQuiz.caughtAuxList.length;
            const targetTotal = currentQuiz.targetAuxList.length;

            if (count === 1) {
              document.getElementById('slot-first').className = 'code-slot filled';
              document.getElementById('val-first').textContent = auxChar;
            } else if (count === 2) {
              document.getElementById('slot-last').className = 'code-slot filled';
              document.getElementById('val-last').textContent = auxChar;
            } else if (count === 3) {
              const slotThird = document.getElementById('slot-third');
              if (slotThird) {
                slotThird.className = 'code-slot filled';
                document.getElementById('val-third').textContent = auxChar;
              }
            }

            if (count < targetTotal) {
              document.getElementById('game-prompt').innerHTML = `🎯 <span style="color:#2563EB;font-weight:900;">成功捕獲【${auxChar}】(${count}/${targetTotal})！快在原野中找出下一個！</span>`;
            } else {
              // 目標全部捕獲完成！
              checkAnswer();
            }
          }
        } else {
          // 點選到干擾球
          orbObj.el.classList.add('eliminated');
          const shieldSkill = activeSkills.find(s => s.name.includes('聖盾防護'));
          const timewardSkill = activeSkills.find(s => s.name.includes('時空結界'));
          if (!roundShieldActive && ((shieldSkill && Math.random() < shieldSkill.rate) || (timewardSkill && Math.random() < timewardSkill.rate))) {
            roundShieldActive = true;
            triggerSkillToast('🛡️', '觸發【聖盾防護】！成功格擋失誤，保留連擊！');
            document.getElementById('game-prompt').innerHTML = `🛡️ <span style="color:#2563EB;font-weight:900;">聖盾格擋成功！【${auxChar}】是【${orbObj.parentCode || '其他'}】部，連擊保留，請再試！</span>`;
          } else {
            comboCount = 0;
            document.getElementById('game-combo-tag').textContent = `連擊：0 Hit`;
            document.getElementById('game-prompt').innerHTML = `⚠️ <span style="color:#DC2626;font-weight:900;">捕捉錯誤！【${auxChar}】屬於【${orbObj.parentCode || '其他'}】部！請繼續找出屬於【${currentQuiz.code}】的輔助字型！</span>`;
          }
        }

      } else if (currentGameMode === 'letter') {
        // 模式 3：單碼捕捉倉頡字母
        if (orbObj.el.classList.contains('caught')) return;

        if (orbObj.isCorrect) {
          orbObj.el.classList.add('caught');
          selectedFirst = { code: orbObj.code, key: orbObj.key, isCorrect: true };
          document.getElementById('slot-first').className = 'code-slot filled';
          document.getElementById('val-first').textContent = `${orbObj.code} (${orbObj.key})`;
          checkAnswer();
        } else {
          // 點選到干擾字母球
          orbObj.el.classList.add('eliminated');
          const shieldSkill = activeSkills.find(s => s.name.includes('聖盾防護'));
          const timewardSkill = activeSkills.find(s => s.name.includes('時空結界'));
          if (!roundShieldActive && ((shieldSkill && Math.random() < shieldSkill.rate) || (timewardSkill && Math.random() < timewardSkill.rate))) {
            roundShieldActive = true;
            triggerSkillToast('🛡️', '觸發【聖盾防護】！成功格擋失誤，保留連擊！');
            document.getElementById('game-prompt').innerHTML = `🛡️ <span style="color:#2563EB;font-weight:900;">聖盾格擋成功！【${orbObj.code}】對應鍵位【${orbObj.key}】，連擊保留，請再試！</span>`;
          } else {
            comboCount = 0;
            document.getElementById('game-combo-tag').textContent = `連擊：0 Hit`;
            document.getElementById('game-prompt').innerHTML = `⚠️ <span style="color:#DC2626;font-weight:900;">捕捉錯誤！【${orbObj.code}】對應鍵位【${orbObj.key}】，請找出鍵位【${currentQuiz.key}】對應的倉頡主字母！</span>`;
          }
        }
      }
    }

    // 11. 答案核對與精確分數結算 (比分層級：錯字魔王 > 輔助字型 > 倉頡字母)
    function checkAnswer() {
      if (autoNextTimer) { clearTimeout(autoNextTimer); autoNextTimer = null; }

      let isCorrect = false;
      const secretBox = document.getElementById('secret-box');
      secretBox.style.display = 'block';

      let baseScore = 10;

      // 🎯 依使用者需求：調整遊戲模式 1-3 獲得分數比例
      // 輔助字型能獲得分數最高 (基礎 20 分)，倉頡字母與英文字鍵次之 (基礎 12 分)，模式 1 錯字魔王相對獲得分數最少 (基礎 6 分)
      if (currentGameMode === 'typo') {
        isCorrect = (selectedFirst.code === currentQuiz.first_code) && (selectedLast.code === currentQuiz.last_code);
        baseScore = 6;  // 模式 1：相對獲得分數最少 (基礎 6 分)
        document.getElementById('secret-char-badge').textContent = `標準速成碼：${currentQuiz.first_code}(${currentQuiz.first_key}) ＋ ${currentQuiz.last_code}(${currentQuiz.last_key})`;
        document.getElementById('secret-desc').textContent = currentQuiz.secret;
      } else if (currentGameMode === 'aux') {
        isCorrect = true; // 模式 2 必須全部捕獲完成才會進入 checkAnswer
        baseScore = 20; // 模式 2：輔助字型獲得分數最高 (基礎 20 分，鼓勵熟練輔助字型)
        document.getElementById('secret-char-badge').textContent = `倉頡主字母【${currentQuiz.code}】(鍵位 ${currentQuiz.key})`;
        document.getElementById('secret-desc').textContent = `正確輔助字型包含：${currentQuiz.aux_list.join('、')} (例字：${currentQuiz.examples})`;
      } else if (currentGameMode === 'letter') {
        isCorrect = true; // 模式 3 命中正確才會進入 checkAnswer
        baseScore = 12; // 模式 3：倉頡字母與英文字鍵次之 (基礎 12 分)
        document.getElementById('secret-char-badge').textContent = `鍵位【${currentQuiz.key}】對應速成/倉頡主字母【${currentQuiz.code}】`;
        document.getElementById('secret-desc').textContent = `類別：${currentQuiz.category} ｜ 輔助字型：${currentQuiz.aux_list.join('、')} ｜ 範例字：${currentQuiz.examples}`;
      }

      if (isCorrect) {
        comboCount++;
        sessionCorrectCount++;

        // 🎯 游行速度不同選擇對得分的影響 (定點最容易得分最低，敏捷最高)
        let speedMultiplier = 1.0;
        let speedNotice = '';
        if (wanderingSpeedMultiplier > 1.2) {
          speedMultiplier = 1.4; // 敏捷模式獎勵 +40%
          speedNotice = '⚡敏捷1.4x';
        } else if (wanderingSpeedMultiplier === 0.0) {
          speedMultiplier = 0.6; // 定點簡易模式扣減至 60%
          speedNotice = '⏸️定點0.6x';
        } else {
          speedMultiplier = 1.0; // 悠閒標準模式 100%
          speedNotice = '🟢悠閒1.0x';
        }

        let roundEarned = Math.max(1, Math.round(baseScore * speedMultiplier));

        let comboBonus = 0;
        if (comboCount === 2) comboBonus = 2;
        else if (comboCount === 3) comboBonus = 4;
        else if (comboCount === 4) comboBonus = 6;
        else if (comboCount >= 5) comboBonus = 10;

        roundEarned += comboBonus;

        let skillBonus = 0;
        const critSkill = activeSkills.find(s => s.name.includes('烈焰爆擊'));
        if (critSkill && Math.random() < critSkill.rate) {
          skillBonus += 5;
          triggerSkillToast('💥', '觸發【烈焰爆擊】！傷害提升，額外獲得 +5 分！');
        }

        const divineSkill = activeSkills.find(s => s.name.includes('神域天罰'));
        if (divineSkill && Math.random() < divineSkill.rate) {
          skillBonus += 6;
          triggerSkillToast('🌌', '觸發【神域天罰】！天雷降臨，額外獲得 +6 分！');
        }

        const chainSkill = activeSkills.find(s => s.name.includes('極限連擊'));
        if (chainSkill && comboCount >= 2 && Math.random() < chainSkill.rate) {
          skillBonus += 3;
          triggerSkillToast('🌊', '觸發【極限連擊】！連擊增益額外獲得 +3 分！');
        }

        const auraSkill = activeSkills.find(s => s.name.includes('波導感知'));
        if (auraSkill && comboCount >= 3 && Math.random() < auraSkill.rate) {
          skillBonus += 2;
          triggerSkillToast('🌀', '觸發【波導感知】！波導同頻，額外獲得 +2 分！');
        }

        const dynamaxSkill = activeSkills.find(s => s.name.includes('極巨衝能'));
        if (dynamaxSkill && Math.random() < dynamaxSkill.rate) {
          skillBonus += 4;
          triggerSkillToast('🌠', '觸發【極巨衝能】！極巨能量爆發，額外獲得 +4 分！');
        }

        const swiftSkill = activeSkills.find(s => s.name.includes('疾風迅雷'));
        if (swiftSkill && Math.random() < swiftSkill.rate) {
          skillBonus += 3;
          triggerSkillToast('⚡', '觸發【疾風迅雷】！疾風神速，額外獲得 +3 分！');
        }

        const starlightSkill = activeSkills.find(s => s.name.includes('星輝庇佑'));
        if (starlightSkill && comboCount >= 4 && Math.random() < starlightSkill.rate) {
          skillBonus += 4;
          triggerSkillToast('💫', '觸發【星輝庇佑】！星輝守護，額外獲得 +4 分！');
        }

        const genesisSkill = activeSkills.find(s => s.name.includes('創世審判'));
        if (genesisSkill && Math.random() < genesisSkill.rate) {
          skillBonus += 6;
          triggerSkillToast('🔱', '觸發【創世審判】！創世神光降臨，額外獲得 +6 分！');
        }

        roundEarned += skillBonus;
        sessionScore += roundEarned;

        document.getElementById('game-score-tag').textContent = `本輪得分：${sessionScore} 分 (+${roundEarned})`;
        document.getElementById('game-combo-tag').textContent = `連擊：${comboCount} Hit 🔥`;

        if (currentStudent) {
          saveStudentStats(currentStudent.cls, currentStudent.num, roundEarned, true, currentGameMode);
          loadStudentProfile();
        }

        burstConfetti();

        if (currentGameMode === 'typo') {
          // 模式 1 (錯字魔王)：保留手動進入下一關按鈕，方便學生從容研讀錯字秘笈與拆碼
          document.getElementById('monster-icon').textContent = '💥';
          document.getElementById('game-prompt').innerHTML = `🎉 <span style="color:#15803D;font-weight:900;">完美命中！擊破魔王！獲得 ${roundEarned} 分 (連擊加成 +${comboBonus}分)！</span>`;
          document.getElementById('btn-next-round').style.display = 'inline-block';
          if (gameStage >= 5) {
            document.getElementById('btn-next-round').textContent = '🏁 查看 5 關挑戰總結算';
          } else {
            document.getElementById('btn-next-round').textContent = `➡️ 進入第 ${gameStage + 1} 關`;
          }
        } else {
          // 模式 2 & 模式 3：通關後不需要按進入下一關，畫面提示並直接自動進入下一關
          document.getElementById('monster-icon').textContent = '✨';
          document.getElementById('btn-next-round').style.display = 'none';

          let clearMsg = '';
          if (currentGameMode === 'aux') {
            clearMsg = `🎉 <span style="color:#15803D;font-weight:900;">完美通關！成功捕獲【${currentQuiz.code}】的輔助字型【${currentQuiz.targetAuxList.join('、')}】！(+${roundEarned}分)</span>`;
          } else {
            clearMsg = `🎉 <span style="color:#15803D;font-weight:900;">完美命中！鍵位【${currentQuiz.key}】對應倉頡字母【${currentQuiz.code}】！(+${roundEarned}分)</span>`;
          }

          if (gameStage < 5) {
            document.getElementById('game-prompt').innerHTML = `${clearMsg} <span style="color:#2563EB;font-weight:800;margin-left:8px;">➔ 即將自動進入第 ${gameStage + 1} 關...</span>`;
            triggerStagePassToast(currentGameMode === 'aux' ? '🔮 輔助字型' : '🔤 速成主字母', gameStage, roundEarned, gameStage + 1);
            autoNextTimer = setTimeout(() => {
              nextRound();
            }, 1350);
          } else {
            document.getElementById('game-prompt').innerHTML = `🏆 <span style="color:#D97706;font-weight:900;">太強了！5 關挑戰全數通關！(+${roundEarned}分) ➔ 正在進行總結算...</span>`;
            triggerStagePassToast(currentGameMode === 'aux' ? '🔮 輔助字型' : '🔤 速成主字母', 5, roundEarned, null);
            autoNextTimer = setTimeout(() => {
              nextRound();
            }, 1350);
          }
        }

      } else {
        // 模式 1 錯字魔王失誤處理
        const shieldSkill = activeSkills.find(s => s.name.includes('聖盾防護'));
        if (!roundShieldActive && shieldSkill && Math.random() < shieldSkill.rate) {
          roundShieldActive = true;
          triggerSkillToast('🛡️', '觸發【聖盾防護】！成功格擋失誤，保留連擊！');
          document.getElementById('game-prompt').innerHTML = `🛡️ <span style="color:#2563EB;font-weight:900;">聖盾格擋成功！失誤已免除，連擊繼續保留！</span>`;
        } else {
          comboCount = 0;
          document.getElementById('game-combo-tag').textContent = `連擊：0 Hit`;
          document.getElementById('game-prompt').innerHTML = `⚠️ <span style="color:#DC2626;font-weight:900;">捕捉錯誤！正確答案如上方秘笈，請牢記字根！</span>`;
        }

        document.getElementById('btn-next-round').style.display = 'inline-block';
        if (gameStage >= 5) {
          document.getElementById('btn-next-round').textContent = '🏁 查看 5 關挑戰總結算';
        } else {
          document.getElementById('btn-next-round').textContent = `➡️ 進入第 ${gameStage + 1} 關`;
        }
      }
    }

    // 12. 下一關或 5 關挑戰結算
    function nextRound() {
      if (autoNextTimer) { clearTimeout(autoNextTimer); autoNextTimer = null; }

      if (gameStage >= 5) {
        document.getElementById('active-play-area').style.display = 'none';
        const summaryBox = document.getElementById('session-summary-box');
        summaryBox.style.display = 'block';

        let clearBonus = 0;
        if (sessionCorrectCount === 5) {
          if (currentGameMode === 'aux') clearBonus = 30;     // 模式 2 輔助字型大滿貫獎勵最高 (+30分)
          else if (currentGameMode === 'letter') clearBonus = 18; // 模式 3 字母次之 (+18分)
          else clearBonus = 10;                                // 模式 1 相對最少 (+10分)

          sessionScore += clearBonus;
          if (currentStudent) {
            saveStudentStats(currentStudent.cls, currentStudent.num, clearBonus, false, currentGameMode);
            loadStudentProfile();
          }
          document.getElementById('summary-congrats-text').innerHTML = `🌟 <strong>大滿貫！5 關全中！</strong> 額外獎勵 <strong>+${clearBonus}</strong> 點通關積分！`;
        } else {
          document.getElementById('summary-congrats-text').textContent = `本輪挑戰完成！答對 ${sessionCorrectCount} 關，繼續挑戰突破極限！`;
        }

        const stats = currentStudent ? getStudentStats(currentStudent.cls, currentStudent.num) : { totalScore: sessionScore };
        const { currentTier } = evalTierAndSkills(stats.totalScore);

        document.getElementById('summary-correct-stat').textContent = `${sessionCorrectCount} / 5 關`;
        document.getElementById('summary-earned-stat').textContent = `+${sessionScore} 分`;
        document.getElementById('summary-total-stat').textContent = `${stats.totalScore.toLocaleString()} 分`;
        document.getElementById('summary-title-stat').textContent = currentTier.title;

        burstConfetti();
      } else {
        gameStage++;
        loadRound();
      }
    }

        function openModal(id) { document.getElementById(id).style.display = 'flex'; }
    function closeModal(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

    // 快捷鍵：按下 Escape 鍵隨時關閉所有彈窗
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal('modal-skills');
        closeModal('modal-leaderboard');
        closeModal('modal-webhook-settings');
        const confirmModal = document.getElementById('modal-confirm');
        if (confirmModal) confirmModal.style.display = 'none';
      }
    });


    let currentLeaderboardFilter = 'ALL';
    function openLeaderboardModal(defaultType) {
      if (defaultType === 'speed') {
        switchLeaderboardType('speed');
      } else {
        switchLeaderboardType('score');
      }
      openModal('modal-leaderboard');
      if (typeof fetchCloudLeaderboard === 'function') {
        fetchCloudLeaderboard(true);
      }
    }

    function filterLeaderboard(cls) {
      currentLeaderboardFilter = cls;
      document.querySelectorAll('.lb-filter-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.includes(cls) || (cls === 'ALL' && b.textContent === '全級總榜'));
      });
      renderLeaderboardTable();
    }

    
    // 🛡️ 格式化勳章稱號 (防範數字代碼或異常格式，保證 100% 呈現標準圖文勳章)
    function getFormattedBadgeTitle(item) {
      if (!item) return '🥉【新手訓練家】';
      let titleStr = item.badge || item.title;
      // 若為純數字 (例如被誤寫為 5) 或缺少【】括號，依分數動態重新評定
      if (!titleStr || !isNaN(titleStr) || titleStr === '5' || !String(titleStr).includes('【')) {
        const score = (typeof item.score === 'number') ? item.score : (parseInt(item.grandTotal, 10) || 0);
        if (typeof evalTierAndSkills === 'function') {
          const { currentTier } = evalTierAndSkills(score);
          return `${currentTier.badge}【${currentTier.title}】`;
        }
        return '🥉【新手訓練家】';
      }
      return String(titleStr);
    }

    function renderLeaderboardTable() {
      if (currentLeaderboardType === 'speed') {
        renderSpeedLeaderboardTable();
        return;
      }

      // 恢復總分榜表頭
      const thead = document.querySelector('#modal-leaderboard thead tr');
      if (thead) {
        thead.innerHTML = `
          <th style="padding: 10px;">排名</th>
          <th>班別</th>
          <th>學號</th>
          <th>訓練家代號</th>
          <th>勳章稱號</th>
          <th>討伐總分</th>
          <th>擊倒魔王</th>
        `;
      }

      const rankLabel = document.getElementById('lb-my-rank-label');
      const scoreLabel = document.getElementById('lb-my-score-label');
      if (rankLabel) rankLabel.textContent = '全級討伐排名';
      if (scoreLabel) scoreLabel.textContent = '累計討伐總分';

      // 1. 雙軌智能合併：整合 Google 試算表最新真實數據與本地 localStorage
      const allMap = {};

      // 載入 26-27_P4_錯字討伐小遊戲積分記錄表 全級 208 名學生最新動態數據
      if (DATA.benchmark_leaderboard && Array.isArray(DATA.benchmark_leaderboard)) {
        DATA.benchmark_leaderboard.forEach(item => {
          const rawScore = (typeof item.grandTotal === 'number') ? item.grandTotal : 
                           ((typeof item.score === 'number') ? item.score : (parseInt(item.totalScore, 10) || 0));
          const rawTitle = item.badge || item.title || '🥉【新手訓練家】';
          const rawKills = (typeof item.kills === 'number') ? item.kills : 0;
          allMap[`${item.cls}_${item.num}`] = {
            cls: item.cls,
            num: item.num,
            name: `${item.cls} ${(item.num < 10 ? '0' : '') + item.num}號`,
            score: rawScore,
            grandTotal: rawScore,
            kills: rawKills,
            title: rawTitle,
            badge: rawTitle
          };
        });
      }

      // 合併本機 localStorage 產生的最新成績
      const allStorageKeys = SafeStorage.getAllKeys();
      for (let i = 0; i < allStorageKeys.length; i++) {
        const key = allStorageKeys[i];
        if (key.startsWith('p4_score_')) {
          const parts = key.replace('p4_score_', '').split('_');
          const cls = parts[0];
          const num = parseInt(parts[1], 10);
          try {
            const parsed = JSON.parse(SafeStorage.getItem(key));
            if (parsed && typeof parsed.totalScore === 'number') {
              const mapKey = `${cls}_${num}`;
              const cur = allMap[mapKey];
              const localScore = parsed.totalScore;
              const localKills = parsed.kills || 0;
              const { currentTier } = evalTierAndSkills(localScore);
              if (!cur || localScore > cur.score) {
                allMap[mapKey] = {
                  cls, num,
                  name: `${cls} ${(num < 10 ? '0' : '') + num}號`,
                  score: localScore,
                  kills: Math.max(localKills, cur ? cur.kills : 0),
                  title: `${currentTier.badge}【${currentTier.title}】`, badge: `${currentTier.badge}【${currentTier.title}】`
                };
              }
            }
          } catch(e) {}
        }
      }

      // 2. 生成全級總榜排序並計算「全級名次」
      const fullList = Object.values(allMap);
      fullList.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.kills !== a.kills) return b.kills - a.kills;
        if (a.cls !== b.cls) return a.cls.localeCompare(b.cls);
        return a.num - b.num;
      });
      fullList.forEach((item, idx) => {
        item.overallRank = idx + 1;
      });

      // 3. 生成各班專屬榜單並精確計算「班內名次」
      const classGroups = {};
      ['P4A', 'P4B', 'P4C', 'P4D', 'P4E', 'P4F'].forEach(c => {
        classGroups[c] = fullList.filter(s => s.cls === c);
        classGroups[c].forEach((item, idx) => {
          item.classRank = idx + 1;
        });
      });

      // 4. 更新頂部「我的個人戰報」
      if (currentStudent) {
        const myKey = `${currentStudent.cls}_${currentStudent.num}`;
        const myEntry = allMap[myKey] || {
          cls: currentStudent.cls,
          num: currentStudent.num,
          name: `${currentStudent.cls} ${(currentStudent.num < 10 ? '0' : '') + currentStudent.num}號`,
          score: 0,
          kills: 0,
          overallRank: fullList.length,
          classRank: (classGroups[currentStudent.cls] || []).length
        };
        const { currentTier } = evalTierAndSkills(myEntry.score);

        document.getElementById('lb-my-name').textContent = myEntry.name;
        document.getElementById('lb-my-title').textContent = `當前境界：${currentTier.title}`;
        document.getElementById('lb-my-score').textContent = `${myEntry.score.toLocaleString()} 分`;
        document.getElementById('lb-my-badge').textContent = currentTier.badge;

        if (currentLeaderboardFilter === 'ALL') {
          document.getElementById('lb-my-rank').innerHTML = `<span style="color:#B45309; font-weight:900;">全級第 ${myEntry.overallRank} 名</span> <span style="font-size:12px;color:#64748B;">(全級共 ${fullList.length} 人)</span>`;
        } else {
          const clsList = classGroups[currentLeaderboardFilter] || [];
          if (currentStudent.cls === currentLeaderboardFilter) {
            document.getElementById('lb-my-rank').innerHTML = `<span style="color:#2563EB; font-weight:900;">${currentLeaderboardFilter} 班內第 ${myEntry.classRank} 名</span> <span style="font-size:12px;color:#64748B;">(班共 ${clsList.length} 人)</span>`;
          } else {
            document.getElementById('lb-my-rank').innerHTML = `<span style="color:#64748B;">原班 (${currentStudent.cls}) 第 ${myEntry.classRank} 名</span> <span style="font-size:11px;color:#94A3B8;">(正在瀏覽 ${currentLeaderboardFilter})</span>`;
          }
        }
      }

      // 5. 渲染表格列表 (全級前 20 名 / 各班前 15 名)
      const tbody = document.getElementById('leaderboard-tbody');
      const isClassFilter = currentLeaderboardFilter !== 'ALL';
      const limit = isClassFilter ? 15 : 20; // 班內前 15 名，全級前 20 名
      const sourceList = isClassFilter ? (classGroups[currentLeaderboardFilter] || []) : fullList;
      const displayList = sourceList.slice(0, limit);

      // 檢查當前同學是否已經在前 N 名中
      let myInDisplay = false;
      if (currentStudent) {
        if (!isClassFilter || currentStudent.cls === currentLeaderboardFilter) {
          myInDisplay = displayList.some(s => s.cls === currentStudent.cls && s.num === currentStudent.num);
        }
      }

      let rowsHtml = displayList.map(s => {
        const rankNum = isClassFilter ? s.classRank : s.overallRank;
        const medal = rankNum === 1 ? '🥇 1' : rankNum === 2 ? '🥈 2' : rankNum === 3 ? '🥉 3' : `${rankNum}`;
        const isMe = currentStudent && s.cls === currentStudent.cls && s.num === currentStudent.num;
        return `
          <tr style="${isMe ? 'background: #FEF3C7; font-weight: bold; border-left: 4px solid #D97706;' : ''}">
            <td style="padding: 7px; text-align: center; font-weight: 800; color: #1E3A8A;">${medal}</td>
            <td style="padding: 7px; text-align: center;">${s.cls}</td>
            <td style="padding: 7px; text-align: center;">${(s.num < 10 ? '0' : '') + s.num}號</td>
            <td style="padding: 7px; text-align: center; font-weight: 800;">${s.name} ${isMe ? '⭐(我)' : ''}</td>
            <td style="padding: 7px; text-align: center; font-size: 11px;">${getFormattedBadgeTitle(s)}</td>
            <td style="padding: 7px; text-align: center; font-weight: 900; color: #D97706;">${s.score.toLocaleString()}</td>
            <td style="padding: 7px; text-align: center;">${s.kills} 隻</td>
          </tr>
        `;
      }).join('');

      // 若當前同學未進入榜單（未進入全級前20或班級前15），在底端追加專屬激勵行
      if (currentStudent && !myInDisplay) {
        const myKey = `${currentStudent.cls}_${currentStudent.num}`;
        const myEntry = allMap[myKey];
        if (myEntry && (!isClassFilter || currentStudent.cls === currentLeaderboardFilter)) {
          const myRank = isClassFilter ? myEntry.classRank : myEntry.overallRank;
          const cutoffRank = isClassFilter ? 15 : 20;
          const targetStudent = sourceList[cutoffRank - 1];
          const gap = targetStudent ? Math.max(0, targetStudent.score - myEntry.score + 10) : 0;
          rowsHtml += `
            <tr style="background: #FFFBEB; border-top: 2px dashed #D97706; font-weight: bold;">
              <td style="padding: 9px; text-align: center; font-weight: 900; color: #B45309;">第 ${myRank} 名</td>
              <td style="padding: 9px; text-align: center;">${myEntry.cls}</td>
              <td style="padding: 9px; text-align: center;">${(myEntry.num < 10 ? '0' : '') + myEntry.num}號</td>
              <td style="padding: 9px; text-align: center; color: #B45309; font-weight: 900;">
                ${myEntry.name} ⭐ (我的目前排名)
                <div style="font-size: 11px; font-weight: 600; color: #D97706; margin-top: 2px;">
                  ⚡ 距離進榜 (第${cutoffRank}名) 還差 ${gap.toLocaleString()} 分，立即開戰追趕！
                </div>
              </td>
              <td style="padding: 9px; text-align: center; font-size: 11px;">${myEntry.title}</td>
              <td style="padding: 9px; text-align: center; font-weight: 900; color: #D97706;">${myEntry.score.toLocaleString()}</td>
              <td style="padding: 9px; text-align: center;">${myEntry.kills} 隻</td>
            </tr>
          `;
        }
      }

      tbody.innerHTML = rowsHtml;
    }

    function exportLeaderboardCSV() {
      const allMap = {};
      const allStorageKeys = SafeStorage.getAllKeys();
      for (let i = 0; i < allStorageKeys.length; i++) {
        const key = allStorageKeys[i];
        if (key.startsWith('p4_score_')) {
          const parts = key.replace('p4_score_', '').split('_');
          const cls = parts[0];
          const num = parseInt(parts[1]);
          try {
            const parsed = JSON.parse(SafeStorage.getItem(key));
            if (parsed && parsed.totalScore > 0) {
              let name = `${cls} ${num}號`;
              if (!CONFIG.GITHUB_PRIVACY_MODE && DATA.roster && DATA.roster[cls] && DATA.roster[cls][num]) {
                name = DATA.roster[cls][num];
              }
              const { currentTier } = evalTierAndSkills(parsed.totalScore);
              allMap[`${cls}_${num}`] = {
                cls, num, name,
                score: parsed.totalScore,
                kills: parsed.kills,
                title: `${currentTier.badge}【${currentTier.title}】`, badge: `${currentTier.badge}【${currentTier.title}】`
              };
            }
          } catch(e) {}
        }
      }
      let list = Object.values(allMap);
      list.sort((a, b) => b.score - a.score);

      let csv = "\uFEFF全級排名,班別,學號,姓名,勳章稱號,累積討伐總積分,擊破魔王數\n";
      list.forEach((s, idx) => {
        csv += `${idx + 1},"${s.cls}",${s.num},"${s.name}","${s.title}",${s.score},${s.kills}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `26-27_P4_錯字討伐全級真實成績_${new Date().toISOString().slice(0,10)}.csv`;
      link.click();
    }

    function renderSkillsHall() {
      let score = 0;
      let studentName = '未登入訓練家';
      if (currentStudent) {
        const stats = getStudentStats(currentStudent.cls, currentStudent.num);
        score = stats.totalScore || 0;
        studentName = currentStudent.name;
      } else {
        const lastLogin = SafeStorage.getItem('p4_active_student');
        if (lastLogin) {
          try {
            const st = JSON.parse(lastLogin);
            if (st && st.cls && st.num) {
              const stats = getStudentStats(st.cls, st.num);
              score = stats.totalScore || 0;
              studentName = st.name;
            }
          } catch(e) {}
        }
      }

      const { currentTier, nextTier, unlockedSkills } = evalTierAndSkills(score);

      // 1. 動態更新頂部當前境界標題與勳章
      const titleEl = document.getElementById('hall-current-title');
      if (titleEl) {
        titleEl.innerHTML = `當前境界：<span style="color: ${currentTier.color}; font-size: 16px; font-weight: 900;">${currentTier.badge}【${currentTier.title}】</span>`;
      }

      // 2. 動態計算晉升下一階進度與文字說明
      let pct = 100;
      const ptsEl = document.getElementById('hall-current-pts');
      const fillEl = document.getElementById('hall-progress-fill');
      if (nextTier) {
        const span = nextTier.min - currentTier.min;
        const currentProgress = score - currentTier.min;
        pct = Math.min(100, Math.max(0, Math.round((currentProgress / Math.max(1, span)) * 100)));
        const needPts = nextTier.min - score;
        if (ptsEl) {
          ptsEl.innerHTML = `累積積分：<strong>${score.toLocaleString()}</strong> / 晉升【${nextTier.title}】需 ${nextTier.min.toLocaleString()} 分 (<span style="color: #2563EB; font-weight: 800;">還差 ${needPts.toLocaleString()} 分 · ${pct}%</span>)`;
        }
      } else {
        if (ptsEl) {
          ptsEl.innerHTML = `累積積分：<strong>${score.toLocaleString()}</strong> 分 (🏆 已榮登最高創世神皇殿堂！)`;
        }
      }
      if (fillEl) {
        fillEl.style.width = `${pct}%`;
      }

      // 3. 渲染 14 大境界卡片 (動態標註已達成、當前段位與未解鎖)
      const tiersContainer = document.getElementById('tiers-grid-container');
      if (tiersContainer) {
        tiersContainer.innerHTML = TIERS.map(t => {
          const isReached = score >= t.min;
          const isCurrent = (t.title === currentTier.title);
          let borderStyle = isCurrent 
            ? `border: 2.5px solid ${t.color}; box-shadow: 0 0 14px ${t.color}55; transform: scale(1.03);` 
            : (isReached ? `border: 2px solid ${t.color}80;` : `border: 2px solid #E2E8F0; opacity: 0.55;`);
          let bgStyle = isReached ? t.bg : '#F8FAFC';
          let statusBadge = isCurrent 
            ? `<span style="font-size:10px; font-weight:900; background:${t.color}; color:#fff; padding:2px 8px; border-radius:10px; display:inline-block; margin-top:4px;">🌟 當前段位</span>`
            : (isReached 
                ? `<span style="font-size:10px; font-weight:800; color:#16A34A; background:#DCFCE7; padding:1px 6px; border-radius:6px; display:inline-block; margin-top:4px;">✓ 已達成</span>`
                : `<span style="font-size:10px; font-weight:700; color:#94A3B8; display:inline-block; margin-top:4px;">🔒 差 ${(t.min - score).toLocaleString()} 分</span>`);
          
          return `
            <div class="tier-card ${isReached ? 'unlocked' : 'locked'}" style="${borderStyle} background: ${bgStyle};">
              <div class="tier-card-badge">${isReached ? t.badge : '🔒'}</div>
              <div class="tier-card-title" style="color: ${isReached ? t.color : '#64748B'}; font-weight: 900; font-size: 14px;">${t.title}</div>
              <div class="tier-card-score" style="color: ${isReached ? '#B45309' : '#94A3B8'}; font-size: 11px;">${t.min.toLocaleString()} 分解鎖</div>
              ${statusBadge}
            </div>
          `;
        }).join('');
      }

      // 4. 渲染 11 大技能殿堂 (動態高亮已解鎖技能)
      const skillsContainer = document.getElementById('skills-grid-container');
      if (skillsContainer) {
        const closeBtnHtml = `
          <div style="margin-top: 24px; text-align: center; grid-column: 1 / -1;">
            <button class="btn-primary-action" onclick="closeModal('modal-skills')" style="padding: 10px 36px; font-size: 15px; font-weight: 900; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); border-radius: 30px; box-shadow: 0 4px 14px rgba(37,99,235,0.35); cursor: pointer;">
              關閉技能館
            </button>
          </div>
        `;
        const cardsHtml = SKILLS.map(s => {
          const isUnlocked = score >= s.reqPts;
          return `
            <div class="skill-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="skill-name-row">
                <span class="skill-name">${isUnlocked ? ('⚡ ' + s.name) : ('🔒 ' + s.name)}</span>
                <span class="skill-rate">${isUnlocked ? `發動率 ${Math.round(s.rate * 100)}%` : `需 ${s.reqPts.toLocaleString()} 分`}</span>
              </div>
              <div class="skill-desc">${s.desc}</div>
              <div style="font-size: 10px; color: ${isUnlocked ? '#16A34A' : '#94A3B8'}; margin-top: 4px; font-weight: 700;">
                ${isUnlocked ? '✅ 戰鬥已實裝發動' : `🔒 還差 ${(s.reqPts - score).toLocaleString()} 分自動解鎖`}
              </div>
            </div>
          `;
        }).join('');
        skillsContainer.innerHTML = cardsHtml + closeBtnHtml;
      }
    }

    function openSkillsModal() {
      renderSkillsHall();
      openModal('modal-skills');
    }

    // Search function
    function handleSearch(keyword) {
      const q = keyword.trim().toLowerCase();
      document.querySelectorAll('.rank-card, .star-card').forEach(card => {
        const info = card.getAttribute('data-student') || '';
        if (!q) {
          card.classList.remove('highlight');
          card.style.display = '';
        } else if (info.toLowerCase().includes(q)) {
          card.classList.add('highlight');
          card.style.display = '';
        } else {
          card.classList.remove('highlight');
        }
      });
    }

    // Kiosk Auto-play Mode
    function toggleKioskMode() {
      const btn = document.getElementById('kiosk-btn');
      if (isKiosk) {
        clearInterval(kioskInterval);
        isKiosk = false;
        btn.textContent = '🖥️ 投影輪播';
        btn.style.background = 'white';
        btn.style.color = '#2563EB';
      } else {
        isKiosk = true;
        btn.textContent = '⏸️ 停止輪播';
        btn.style.background = '#2563EB';
        btn.style.color = 'white';
        
        const tabs = ['top40', 'class', 'perfect', 'vocab'];
        let tabIdx = 0;
        kioskInterval = setInterval(() => {
          tabIdx = (tabIdx + 1) % tabs.length;
          switchTab(tabs[tabIdx]);
        }, 8000);
      }
    }

    // Immediate Confetti and Render on Load
    window.addEventListener('DOMContentLoaded', () => {
      try { initLoginDropdowns(); } catch(e){ console.error('initLoginDropdowns error:', e); }
      const savedStudent = SafeStorage.getItem('p4_active_student');
      if (savedStudent) {
        try {
          currentStudent = JSON.parse(savedStudent);
          const idSec = document.getElementById('identity-section');
          const batSec = document.getElementById('battle-section');
          if (idSec) idSec.style.display = 'none';
          if (batSec) batSec.style.display = 'block';
          loadStudentProfile();
        } catch(e) {}
      }

      try { renderTop40(); } catch(e){ console.error('renderTop40 error:', e); }
      try { renderClassBarCharts(); } catch(e){ console.error('renderClassBarCharts error:', e); }
      try { renderClassCards(); } catch(e){ console.error('renderClassCards error:', e); }
      try { renderPerfectScorers(); } catch(e){ console.error('renderPerfectScorers error:', e); }
      try { renderVocabTable(); } catch(e){ console.error('renderVocabTable error:', e); }
      try { setTimeout(burstConfetti, 350); } catch(e){}

      // 背景靜默連線 Google Apps Script 雲端天梯 (不阻塞畫面)
      try {
        if (typeof fetchCloudLeaderboard === 'function') {
          fetchCloudLeaderboard(true);
        }
      } catch(e) {}
    });
  
    // =========================================================================
    // ⚡ 模式 4：倉頡/速成 10字/20字 極速鍵盤手速賽核心引擎 (嚴格同步六年級規格)
    // =========================================================================

    ;

    

    function getActiveSpeedWeek() {
      // 支援網址參數手動切換測試 (例如 ?week=w2, ?week=w3, ?week=w4, ?week=w6)
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const qWk = urlParams.get('week');
        if (qWk && ['w2', 'w3', 'w4', 'w6'].includes(qWk.toLowerCase())) {
          return qWk.toLowerCase();
        }
      } catch (e) {}

      const now = new Date();
      for (const s of SPEED_WEEK_SCHEDULES) {
        if (now >= s.start && now <= s.end) {
          return s.week;
        }
      }
      if (now < SPEED_WEEK_SCHEDULES[0].start) return 'w2';
      return 'w6'; // 處於第6周
    }

    function initSpeedWeekDropdown() {
      const select = document.getElementById('speed-ready-week-select');
      const activeWk = getActiveSpeedWeek();
      const allBanks = (typeof MODE2_WEEKLY_BANKS === 'object' && MODE2_WEEKLY_BANKS) ? MODE2_WEEKLY_BANKS : {};

      if (select) {
        // 如果靜態 HTML 已經定義了完整的 optgroup，則保留完整結構並選中當前週次
        if (select.options && select.options.length > 0 && select.querySelector && select.querySelector('optgroup')) {
          const targetVal = `${activeWk}_hw1`;
          let matched = false;
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === targetVal) {
              select.selectedIndex = i;
              currentSpeedWeek = targetVal;
              matched = true;
              break;
            }
          }
          if (!matched && select.options.length > 0) {
            currentSpeedWeek = select.value;
          }
        } else {
          // 動態構建分組選單
          select.innerHTML = '';
          const weekOrder = ['w6', 'w4', 'w3', 'w2'];
          weekOrder.forEach(wk => {
            const isCur = (wk === activeWk);
            const grp = document.createElement('optgroup');
            grp.label = isCur ? `🔥 第 ${wk.slice(1)} 周 速成手速字庫 (當前進行中)` : `📅 第 ${wk.slice(1)} 周 速成手速字庫 (溫故知新)`;
            for (let idx = 1; idx <= 4; idx++) {
              const k = `${wk}_hw${idx}`;
              const bank = allBanks[k];
              if (bank) {
                const opt = document.createElement('option');
                opt.value = k;
                opt.textContent = bank.title ? bank.title.replace(/【.*?】/, '') : `第${wk.slice(1)}周功課${idx}`;
                if (k === `${activeWk}_hw1`) opt.selected = true;
                grp.appendChild(opt);
              }
            }
            if (grp.children.length > 0) select.appendChild(grp);
          });
          if (select.options.length > 0) {
            currentSpeedWeek = select.value;
          }
        }
      }

      // 同步手速榜下拉選單
      const lbSelect = document.getElementById('speed-lb-week-select');
      if (lbSelect) {
        if (!speedLeaderboardWeek) speedLeaderboardWeek = `${activeWk}_hw1`;
        lbSelect.value = speedLeaderboardWeek;
      }
    }

    function updateSpeedLeaderboardButtons(activeWk) {
      const lbSelect = document.getElementById('speed-lb-week-select');
      if (lbSelect) {
        if (!speedLeaderboardWeek) speedLeaderboardWeek = `${activeWk}_hw1`;
        lbSelect.value = speedLeaderboardWeek;
      }
    }

    function returnToSpeedReadyStage() {
      const mainStage = document.getElementById('speed-main-stage');
      const finishBox = document.getElementById('speed-finish-box');
      const readyStage = document.getElementById('speed-ready-stage');
      if (mainStage) mainStage.style.display = 'none';
      if (finishBox) finishBox.style.display = 'none';
      if (readyStage) readyStage.style.display = 'block';
    }

    function launchSpeedMatch() {
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }

      onSpeedSettingChange();

      if (speedTimerInterval) clearInterval(speedTimerInterval);
      if (speedHintTimer) clearTimeout(speedHintTimer);

      const allBanks = (typeof MODE2_WEEKLY_BANKS === "object" && MODE2_WEEKLY_BANKS) ? MODE2_WEEKLY_BANKS : {};
      const bank = allBanks[currentSpeedWeek] || allBanks["w6_hw1"] || Object.values(allBanks)[0] || { words: [] };
      const rawWords = (bank && Array.isArray(bank.words) && bank.words.length > 0) ? [...bank.words] : [
        { char: "明", codes: ["日", "月"], keys: ["A", "B"], full: "日月 (AB)", secret: "速成首碼【日】(A) ＋ 尾碼【月】(B)" }
      ];
      const shuffled = (typeof fisherYatesShuffle === 'function') ? fisherYatesShuffle([...rawWords]) : [...rawWords].sort(() => Math.random() - 0.5);
      speedWordList = shuffled.slice(0, currentSpeedWordCount);

      speedWordIdx = 0;
      speedInputCodes = [];
      speedMistakes = 0;
      speedPenaltySeconds = 0.0;
      speedTotalKeys = 0;
      speedCorrectKeys = 0;
      speedActive = true;
      speedWordReadyForSpace = false;

      document.getElementById('speed-ready-stage').style.display = 'none';
      document.getElementById('speed-finish-box').style.display = 'none';
      document.getElementById('speed-main-stage').style.display = 'block';

      document.getElementById('speed-total-count-text').textContent = speedWordList.length;
      document.getElementById('speed-timer-val').textContent = '00.00s';
      document.getElementById('speed-penalty-display').innerHTML = `⚠️ 失誤 0 次 (+0.0s 罰時)`;
      
      const badgeTag = document.getElementById('speed-active-badge-tag');
      if (badgeTag) {
        const bankObj = MODE2_WEEKLY_BANKS[currentSpeedWeek] || Object.values(MODE2_WEEKLY_BANKS)[0];
        badgeTag.textContent = `⚡ ${currentSpeedWordCount} 字賽 · ${bankObj.title}`;
      }

      const spacePrompt = document.getElementById('speed-space-prompt');
      if (spacePrompt) spacePrompt.style.display = 'none';

      renderSpeedProgressDots();
      renderSpeedTargetWord();

      speedStartTime = performance.now();
      speedTimerInterval = setInterval(updateSpeedClock, 30);

      window.removeEventListener('keydown', handleSpeedKeydown, true);
      window.addEventListener('keydown', handleSpeedKeydown, true);
    }

    function abortSpeedMatchToReady() {
      if (speedTimerInterval) clearInterval(speedTimerInterval);
      if (speedHintTimer) clearTimeout(speedHintTimer);
      speedActive = false;
      speedWordReadyForSpace = false;
      window.removeEventListener('keydown', handleSpeedKeydown, true);

      initSpeedWeekDropdown();
        returnToSpeedReadyStage();
    }

    function updateSpeedClock() {
      if (!speedStartTime || !speedActive) return;
      const now = performance.now();
      const elapsed = ((now - speedStartTime) / 1000) + speedPenaltySeconds;
      document.getElementById('speed-timer-val').textContent = elapsed.toFixed(2) + 's';
    }

    function renderSpeedProgressDots() {
      const container = document.getElementById('speed-progress-dots');
      if (!container) return;
      container.innerHTML = '';
      const total = speedWordList.length;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'speed-dot' + (i === speedWordIdx ? ' active' : (i < speedWordIdx ? ' done' : ''));
        container.appendChild(dot);
      }
    }

    function renderSpeedTargetWord() {
      if (speedWordIdx >= speedWordList.length) return;
      const currentWord = speedWordList[speedWordIdx];

      speedWordReadyForSpace = false;
      const spacePrompt = document.getElementById('speed-space-prompt');
      if (spacePrompt) spacePrompt.style.display = 'none';

      document.getElementById('speed-target-char').textContent = currentWord.char;
      document.getElementById('speed-current-idx-text').textContent = speedWordIdx + 1;
      
      const isSingleCode = currentWord.codes.length === 1;
      const ruleText = isSingleCode 
        ? `單碼字根：<strong>【${currentWord.codes[0]}】(${currentWord.keys[0]})</strong>`
        : `速成首尾取碼：首碼【<strong>${currentWord.codes[0]}</strong>】(${currentWord.keys[0]}) ＋ 尾碼【<strong>${currentWord.codes[1]}</strong>】(${currentWord.keys[1]})`;

      document.getElementById('speed-bottom-tip').innerHTML = `💡 規則：${ruleText} · 按錯鍵每次加計 <strong>+0.3 秒罰時</strong> · <strong>敲完字碼請按【空白鍵 Space】送出</strong>`;

      renderSpeedProgressDots();

      const slotsContainer = document.getElementById('speed-slots-row');
      slotsContainer.innerHTML = '';

      const neededIdx = speedInputCodes.length;

      currentWord.codes.forEach((code, idx) => {
        const slot = document.createElement('div');
        slot.id = `speed-slot-${idx}`;
        slot.className = 'speed-key-slot';

        const slotLabel = isSingleCode ? '【單碼】' : (idx === 0 ? '【首碼】' : '【尾碼】');

        if (idx < speedInputCodes.length) {
          slot.classList.add('filled');
          slot.innerHTML = `
            <div class="speed-slot-code" style="color: #34D399;">${speedInputCodes[idx].code}</div>
            <div class="speed-slot-sub" style="color: #A7F3D0; font-weight: 800;">${speedInputCodes[idx].key} · ${slotLabel}</div>
          `;
        } else if (idx === neededIdx) {
          slot.classList.add('current');
          if (isSpeedPracticeMode) {
            slot.innerHTML = `
              <div class="speed-slot-hint-text">${code}</div>
              <div class="speed-slot-sub" style="color: #FACC15; font-weight: 900;">${currentWord.keys[idx]} · ${slotLabel}</div>
            `;
          } else {
            slot.innerHTML = `
              <div class="speed-slot-code" style="color: #94A3B8;">？</div>
              <div class="speed-slot-sub">${slotLabel}</div>
            `;
          }
        } else {
          slot.innerHTML = `
            <div class="speed-slot-code" style="color: #475569;">·</div>
            <div class="speed-slot-sub">${slotLabel}</div>
          `;
        }
        slotsContainer.appendChild(slot);
      });

      startSpeedHintTimer();
    }

    function startSpeedHintTimer() {
      if (speedHintTimer) clearTimeout(speedHintTimer);
      if (isSpeedPracticeMode || !speedActive || speedWordReadyForSpace) return;

      const currentWord = speedWordList[speedWordIdx];
      const neededIdx = speedInputCodes.length;
      if (!currentWord || neededIdx >= currentWord.codes.length) return;

      speedHintTimer = setTimeout(() => {
        const targetSlot = document.getElementById(`speed-slot-${neededIdx}`);
        if (targetSlot) {
          targetSlot.classList.add('hint-glow');
          targetSlot.innerHTML = `
            <div class="speed-slot-hint-text">${currentWord.codes[neededIdx]}</div>
            <div class="speed-slot-sub" style="color: #FACC15; font-weight: 900;">${currentWord.keys[neededIdx]}</div>
          `;
          document.getElementById('speed-bottom-tip').innerHTML = `💡 <span style="color:#FACC15;font-weight:900;">【提燈指引啟動】：目標字根為【${currentWord.codes[neededIdx]}】(按鍵 ${currentWord.keys[neededIdx]})！</span>`;
        }
      }, 3000);
    }

    function handleSpeedKeydown(e) {
      if (currentGameMode !== 'speed') return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const readyStage = document.getElementById('speed-ready-stage');
      if (readyStage && readyStage.style.display !== 'none') {
        if (e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          launchSpeedMatch();
        }
        return;
      }

      if (!speedActive) return;

      if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault();
        e.stopPropagation();

        if (speedWordReadyForSpace) {
          confirmSpeedWordSpace();
        } else {
          const stage = document.getElementById('speed-main-stage');
          triggerFloatingNotice(stage, '請先敲完速成字碼（首碼與尾碼）再按空白鍵！⚠️');
          const currentWord = speedWordList[speedWordIdx];
          if (currentWord) {
            const neededIdx = speedInputCodes.length;
            const targetSlot = document.getElementById(`speed-slot-${neededIdx}`);
            if (targetSlot) {
              targetSlot.classList.add('shake-error');
              setTimeout(() => targetSlot.classList.remove('shake-error'), 400);
            }
          }
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        e.stopPropagation();
        if (speedWordReadyForSpace) {
          speedWordReadyForSpace = false;
          speedInputCodes.pop();
          renderSpeedTargetWord();
        } else if (speedInputCodes.length > 0) {
          speedInputCodes.pop();
          renderSpeedTargetWord();
        }
        return;
      }

      if (speedWordReadyForSpace) {
        e.preventDefault();
        e.stopPropagation();
        const spacePrompt = document.getElementById('speed-space-prompt');
        if (spacePrompt) {
          spacePrompt.classList.add('shake-error');
          setTimeout(() => spacePrompt.classList.remove('shake-error'), 400);
        }
        return;
      }

      const keyUpper = e.key.toUpperCase();
      if (keyUpper.length === 1 && keyUpper >= 'A' && keyUpper <= 'Z') {
        e.preventDefault();
        e.stopPropagation();
        processSpeedKeyInput(keyUpper);
      }
    }

    function processSpeedKeyInput(pressedKey) {
      if (speedWordReadyForSpace) return;
      const currentWord = speedWordList[speedWordIdx];
      if (!currentWord) return;

      const neededIdx = speedInputCodes.length;
      const targetKey = currentWord.keys[neededIdx];
      const targetCode = currentWord.codes[neededIdx];

      speedTotalKeys++;

      if (pressedKey === targetKey) {
        speedCorrectKeys++;
        speedInputCodes.push({ key: pressedKey, code: targetCode });

        if (speedInputCodes.length === currentWord.keys.length) {
          speedWordReadyForSpace = true;
          if (speedHintTimer) clearTimeout(speedHintTimer);

          const slotsContainer = document.getElementById('speed-slots-row');
          if (slotsContainer) {
            slotsContainer.innerHTML = '';
            currentWord.codes.forEach((code, idx) => {
              const slot = document.createElement('div');
              slot.className = 'speed-key-slot filled';
              slot.style.borderColor = '#10B981';
              slot.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.5)';
              slot.innerHTML = `
                <div class="speed-slot-code" style="color: #34D399;">${code}</div>
                <div class="speed-slot-sub" style="color: #A7F3D0;">${currentWord.keys[idx]} ✓</div>
              `;
              slotsContainer.appendChild(slot);
            });
          }

          const spacePrompt = document.getElementById('speed-space-prompt');
          if (spacePrompt) {
            spacePrompt.style.display = 'flex';
          }
          document.getElementById('speed-bottom-tip').innerHTML = `✨ <strong style="color:#34D399;">【${currentWord.char}】字碼全對！</strong>請按下鍵盤<strong>【Space 空白鍵】</strong>送出並進入下一題 ➔`;
        } else {
          renderSpeedTargetWord();
        }
      } else {
        speedMistakes++;
        speedPenaltySeconds += 0.3;

        const targetSlot = document.getElementById(`speed-slot-${neededIdx}`);
        if (targetSlot) {
          targetSlot.classList.add('shake-error');
          setTimeout(() => targetSlot.classList.remove('shake-error'), 400);
        }

        const stage = document.getElementById('speed-main-stage');
        triggerFloatingNotice(stage, '+0.3s 罰時 ⚠️');

        document.getElementById('speed-penalty-display').innerHTML = `⚠️ 失誤 <strong style="color:#EF4444;">${speedMistakes}</strong> 次 (+<strong style="color:#EF4444;">${speedPenaltySeconds.toFixed(1)}s</strong> 罰時)`;
      }
    }

    function confirmSpeedWordSpace() {
      if (!speedWordReadyForSpace || !speedActive) return;
      speedWordReadyForSpace = false;

      const spacePrompt = document.getElementById('speed-space-prompt');
      if (spacePrompt) spacePrompt.style.display = 'none';

      burstConfetti();
      speedWordIdx++;
      speedInputCodes = [];

      if (speedWordIdx < speedWordList.length) {
        renderSpeedTargetWord();
      } else {
        onSpeedMatchComplete();
      }
    }

    function onSpeedMatchComplete() {
      speedActive = false;
      speedWordReadyForSpace = false;
      if (speedTimerInterval) clearInterval(speedTimerInterval);
      if (speedHintTimer) clearTimeout(speedHintTimer);
      window.removeEventListener('keydown', handleSpeedKeydown, true);

      const endTime = performance.now();
      const rawElapsed = parseFloat(((endTime - speedStartTime) / 1000).toFixed(2));
      const accuracy = Math.max(10, Math.round((speedCorrectKeys / Math.max(1, speedTotalKeys)) * 100));

      const penaltyObj = calculateEffectiveSpeedTime(rawElapsed, speedMistakes, accuracy, currentSpeedWordCount);
      const effectiveFinalTime = penaltyObj.effectiveTime;

      const cpm = Math.round(currentSpeedWordCount / (effectiveFinalTime / 60));
      const speedTier = getSpeedTier(effectiveFinalTime, currentSpeedWordCount);

      document.getElementById('speed-main-stage').style.display = 'none';
      document.getElementById('speed-finish-box').style.display = 'block';

      document.getElementById('speed-finish-title').textContent = `${currentSpeedWordCount} 字極速鍵盤手速賽完成！`;
      document.getElementById('speed-stat-final-time').textContent = effectiveFinalTime.toFixed(2) + 's';
      document.getElementById('speed-stat-raw-time').textContent = rawElapsed.toFixed(2) + 's';
      document.getElementById('speed-stat-acc').textContent = accuracy + '%';
      document.getElementById('speed-stat-acc-penalty').textContent = (penaltyObj.accPenalty >= 0 ? '+' : '') + penaltyObj.accPenalty.toFixed(2) + 's';
      document.getElementById('speed-stat-cpm').textContent = cpm + ' 字/分';
      document.getElementById('speed-stat-tier').textContent = speedTier;

      if (currentStudent) {
        const speedKey = `p4_speed_${currentStudent.cls}_${currentStudent.num}_${currentSpeedWordCount}_${currentSpeedWeek}`;
        const prev = SafeStorage.getItem(speedKey);
        let bestRecord = {
          cls: currentStudent.cls,
          num: currentStudent.num,
          wordCount: currentSpeedWordCount,
          weekKey: currentSpeedWeek,
          bestTime: effectiveFinalTime,
          rawTime: rawElapsed,
          accuracy: accuracy,
          cpm: cpm,
          accPenalty: penaltyObj.accPenalty,
          tier: speedTier,
          date: new Date().toISOString()
        };

        if (prev) {
          try {
            const parsed = JSON.parse(prev);
            if (parsed && typeof parsed.bestTime === 'number' && parsed.bestTime < effectiveFinalTime) {
              bestRecord = parsed;
            }
          } catch(e) {}
        }
        SafeStorage.setItem(speedKey, JSON.stringify(bestRecord));

        if (currentSpeedWordCount === 10) {
          const prevOverall = SafeStorage.getItem(`p4_speed_${currentStudent.cls}_${currentStudent.num}`);
          let shouldUpdateOverall = true;
          if (prevOverall) {
            try {
              const parsedPrev = JSON.parse(prevOverall);
              if (parsedPrev && parsedPrev.bestTime <= effectiveFinalTime) {
                shouldUpdateOverall = false;
              }
            } catch (e) {}
          }
          if (shouldUpdateOverall) {
            SafeStorage.setItem(`p4_speed_${currentStudent.cls}_${currentStudent.num}`, JSON.stringify(bestRecord));
          }
        }

        // ⚡ 依照六年級標準規範：手速賽純秒數制 (非積分制，不累加至討伐總分)，將秒數精準同步至雲端與各周次功課
        saveStudentStats(
          currentStudent.cls,
          currentStudent.num,
          0,
          true,
          'speed',
          effectiveFinalTime,
          currentSpeedWordCount,
          currentSpeedWeek
        );
        loadStudentProfile();
      }

              // 同步手速榜篩選器與按鈕狀態至當前挑戰項目
        speedLeaderboardWordCount = currentSpeedWordCount;
        speedLeaderboardWeek = currentSpeedWeek;
        document.querySelectorAll('#speed-lb-sub-filters .lb-sub-pill[id^="lb-wc-"]').forEach(p => {
          p.classList.toggle('active', p.id === `lb-wc-${speedLeaderboardWordCount}`);
        });
        const select = document.getElementById('speed-lb-week-select');
        if (select) select.value = speedLeaderboardWeek;

      // ⚡ 立即重繪手速天梯榜，使天梯成績與排名即時更新生效！
      if (typeof renderSpeedLeaderboardTable === 'function') {
        renderSpeedLeaderboardTable();
      }

      // 在結算畫面即時展示名次回饋
      const rankEl = document.getElementById('lb-my-rank');
      const descEl = document.getElementById('speed-stat-time-desc');
      if (descEl && rankEl && rankEl.textContent) {
        descEl.innerHTML = `🌟 <strong>${rankEl.textContent.trim()}</strong>`;
      }

      burstConfetti();
    }

    function restartSpeedMatch() {
      launchSpeedMatch();
    }

    // =========================================================================
    // 🏆 排行榜雙軌切換：討伐累積總分榜 vs 獨立手速天梯榜 (題量/周次/秒數升序)
    // =========================================================================
    function switchLeaderboardType(type) {
      currentLeaderboardType = type;
      document.querySelectorAll('.lb-sub-nav-btn').forEach(b => {
        b.classList.toggle('active', (type === 'score' && b.id === 'lb-type-score') || (type === 'speed' && b.id === 'lb-type-speed'));
      });
      
      const subFilters = document.getElementById('speed-lb-sub-filters');
      if (subFilters) {
        subFilters.style.display = (type === 'speed') ? 'block' : 'none';
        const select = document.getElementById('speed-lb-week-select');
        if (select && speedLeaderboardWeek) {
          select.value = speedLeaderboardWeek;
        }
      }

      const modalTitle = document.getElementById('lb-modal-main-title');
      if (modalTitle) {
        modalTitle.textContent = (type === 'speed') ? '⚡ 四年級寶可夢速成手速天梯榜 (10字秒數制)' : '🏆 四年級寶可夢速成討伐龍虎榜';
      }

      renderLeaderboardTable();
    }

    function filterSpeedLeaderboardWeek(weekKey) {
      speedLeaderboardWeek = weekKey;
      const select = document.getElementById('speed-lb-week-select');
      if (select && select.value !== weekKey) {
        select.value = weekKey;
      }
      renderSpeedLeaderboardTable();
    }

    function renderSpeedLeaderboardTable() {
      // 1. 替換表頭為純 10 字秒數制各項指標 (11欄，完全對齊試算表與六年級規格)
      const thead = document.querySelector('#modal-leaderboard thead tr');
      if (thead) {
        thead.innerHTML = `
          <th>排名</th>
          <th>班別</th>
          <th>學號</th>
          <th>訓練家代號</th>
          <th>周次功課</th>
          <th style="color:#0284C7;">⏱️ 10字等效耗時 (秒)</th>
          <th>原始碼表耗時</th>
          <th>擊鍵準確率</th>
          <th>準確率加權罰時</th>
          <th>等效中文字速</th>
          <th>榮譽段位</th>
        `;
      }

      const scoreLabel = document.getElementById('lb-my-score-label');
      const rankLabel = document.getElementById('lb-my-rank-label');
      if (scoreLabel) scoreLabel.textContent = '10字等效總耗時';
      if (rankLabel) rankLabel.textContent = (currentLeaderboardFilter === 'ALL') ? '全級手速名次' : '班內手速名次';

      const bankObj = (typeof MODE2_WEEKLY_BANKS === 'object' && MODE2_WEEKLY_BANKS) ? MODE2_WEEKLY_BANKS[speedLeaderboardWeek] : null;
      const wkTitle = bankObj ? bankObj.title : (speedLeaderboardWeek === 'ALL' ? '全部周次 (生涯最佳)' : speedLeaderboardWeek);

      const allSpeedMap = {};

      // 1. 初始化全級名冊 (預設全部未參賽，不入榜)
      if (DATA.benchmark_leaderboard && Array.isArray(DATA.benchmark_leaderboard)) {
        DATA.benchmark_leaderboard.forEach(item => {
          let hasRec = false;
          let timeVal = 9999.0;

          if (item.weekly_speed && typeof item.weekly_speed[speedLeaderboardWeek] === 'number' && item.weekly_speed[speedLeaderboardWeek] > 0) {
            timeVal = Number(item.weekly_speed[speedLeaderboardWeek]);
            hasRec = true;
          } else if (speedLeaderboardWeek === 'ALL') {
            let best = 9999.0;
            if (typeof item.best10 === 'number' && item.best10 > 0 && item.best10 < 900) {
              best = item.best10;
            }
            if (item.weekly_speed && typeof item.weekly_speed === 'object') {
              Object.values(item.weekly_speed).forEach(v => {
                const numV = Number(v);
                if (!isNaN(numV) && numV > 0 && numV < best) {
                  best = numV;
                }
              });
            }
            if (best < 900) {
              timeVal = best;
              hasRec = true;
            }
          }

          const cpmVal = (hasRec && timeVal > 0) ? Math.round(10 / (timeVal / 60)) : 0;
          const tierVal = hasRec ? getSpeedTier(timeVal, 10) : '--';

          allSpeedMap[`${item.cls}_${item.num}`] = {
            cls: item.cls,
            num: item.num,
            name: item.name || `${item.cls} ${(item.num < 10 ? '0' : '') + item.num}號`,
            bestTime: timeVal,
            rawTime: timeVal,
            cpm: cpmVal,
            accuracy: 100,
            accPenalty: 0,
            tier: tierVal,
            weekKey: speedLeaderboardWeek,
            hasRecord: hasRec
          };
        });
      }

      // 2. 從本地 SafeStorage 讀取該周次功課之真實手速紀錄 (優先採用本機最新最佳)
      const allKeys = SafeStorage.getAllKeys ? SafeStorage.getAllKeys() : [];
      allKeys.forEach(key => {
        if (key.startsWith('p4_speed_')) {
          const parts = key.replace('p4_speed_', '').split('_');
          const cls = String(parts[0] || '').trim().toUpperCase();
          const num = parseInt(parts[1], 10);
          if (!cls || isNaN(num) || num < 1 || num > 36) return;

          let recWc = 10;
          let recWk = 'ALL';
          if (parts.length >= 5) {
            recWc = parseInt(parts[2], 10) || 10;
            recWk = parts.slice(3).join('_');
          } else if (parts.length === 2) {
            recWc = 10;
            recWk = 'ALL';
          } else {
            return;
          }

          if (recWc !== 10) return; // 四年級週次功課鎖定純 10 字
          if (speedLeaderboardWeek !== 'ALL' && recWk !== speedLeaderboardWeek) return;

          try {
            const parsed = JSON.parse(SafeStorage.getItem(key));
            if (parsed && typeof parsed.bestTime === 'number' && parsed.bestTime > 0 && parsed.bestTime < 900) {
              const mapKey = `${cls}_${num}`;
              const time = parsed.bestTime;
              const raw = (typeof parsed.rawTime === 'number') ? parsed.rawTime : time;
              const acc = (typeof parsed.accuracy === 'number') ? parsed.accuracy : 100;
              const cpm = parsed.cpm || Math.round(10 / (time / 60));
              const penalty = parsed.accPenalty || 0;
              const tier = parsed.tier || getSpeedTier(time, 10);

              if (!allSpeedMap[mapKey] || !allSpeedMap[mapKey].hasRecord || allSpeedMap[mapKey].bestTime > time) {
                allSpeedMap[mapKey] = {
                  cls, num,
                  name: `${cls} ${(num < 10 ? '0' : '') + num}號`,
                  bestTime: time,
                  rawTime: raw,
                  cpm: cpm,
                  accuracy: acc,
                  accPenalty: penalty,
                  tier: tier,
                  weekKey: recWk,
                  hasRecord: true
                };
              }
            }
          } catch(e) {}
        }
      });

      // 3. 從雲端即時手速榜合併跨電腦成績 (純 10 字天梯)
      if (DATA.cloud_speed_records) {
        let cloudList = [];
        if (Array.isArray(DATA.cloud_speed_records)) {
          cloudList = DATA.cloud_speed_records;
        } else if (DATA.cloud_speed_records[speedLeaderboardWeek]) {
          cloudList = DATA.cloud_speed_records[speedLeaderboardWeek];
        } else if (speedLeaderboardWeek === 'ALL' && DATA.cloud_speed_records['overall']) {
          cloudList = DATA.cloud_speed_records['overall'];
        }

        cloudList.forEach(cs => {
          const mapKey = `${cs.cls}_${cs.num}`;
          const time = parseFloat(cs.bestTime !== undefined ? cs.bestTime : cs.best10);
          if (!isNaN(time) && time > 0 && time < 900) {
            const curEntry = allSpeedMap[mapKey];
            if (!curEntry || !curEntry.hasRecord || curEntry.bestTime > time) {
              const cpm = cs.cpm || Math.round(10 / (time / 60));
              allSpeedMap[mapKey] = {
                cls: cs.cls,
                num: cs.num,
                name: cs.name || `${cs.cls} ${(cs.num < 10 ? '0' : '') + cs.num}號`,
                bestTime: time,
                rawTime: (typeof cs.rawTime === 'number') ? cs.rawTime : time,
                cpm: cpm,
                accuracy: (typeof cs.accuracy === 'number') ? cs.accuracy : 100,
                accPenalty: (typeof cs.accPenalty === 'number') ? cs.accPenalty : 0,
                tier: cs.tier || getSpeedTier(time, 10),
                weekKey: cs.weekKey || speedLeaderboardWeek,
                hasRecord: true
              };
            }
          }
        });
      }

      // 4. 嚴格過濾：未參與本項手速遊戲者直接不入榜
      const speedList = Object.values(allSpeedMap).filter(s => s.hasRecord && typeof s.bestTime === 'number' && s.bestTime < 900);
      speedList.sort((a, b) => {
        if (a.bestTime !== b.bestTime) return a.bestTime - b.bestTime;
        return b.accuracy - a.accuracy;
      });
      speedList.forEach((item, idx) => item.overallRank = idx + 1);

      // 分班計算班內名次 (僅限有成績者)
      const classGroups = {};
      ['P4A', 'P4B', 'P4C', 'P4D', 'P4E', 'P4F'].forEach(c => {
        classGroups[c] = speedList.filter(s => s.cls === c);
        classGroups[c].forEach((item, idx) => item.classRank = idx + 1);
      });

      // 5. 更新頂部我的個人戰報
      if (currentStudent) {
        const myKey = `${currentStudent.cls}_${currentStudent.num}`;
        const myEntry = allSpeedMap[myKey];
        const myNameEl = document.getElementById('lb-my-name');
        if (myNameEl) myNameEl.textContent = `${currentStudent.cls} ${(currentStudent.num < 10 ? '0' : '') + currentStudent.num}號`;

        if (myEntry && myEntry.hasRecord) {
          document.getElementById('lb-my-title').textContent = `分類：10字賽 · ${wkTitle} ｜ 速成字速：${myEntry.cpm} 字/分`;
          document.getElementById('lb-my-score').textContent = `${myEntry.bestTime.toFixed(2)} 秒 (準確率 ${myEntry.accuracy}%)`;
          document.getElementById('lb-my-badge').textContent = '⚡';
          if (currentLeaderboardFilter === 'ALL') {
            document.getElementById('lb-my-rank').innerHTML = `<span style="color:#B45309;font-weight:900;">全級手速第 ${myEntry.overallRank} 名</span>`;
          } else {
            document.getElementById('lb-my-rank').innerHTML = `<span style="color:#2563EB;font-weight:900;">${currentLeaderboardFilter} 班內手速第 ${myEntry.classRank} 名</span>`;
          }
        } else {
          document.getElementById('lb-my-title').textContent = `分類：10字賽 · ${wkTitle}`;
          document.getElementById('lb-my-score').textContent = '-- 秒';
          document.getElementById('lb-my-badge').textContent = '⏱️';
          document.getElementById('lb-my-rank').textContent = '尚無本組手速紀錄';
        }
      }

      const isClassFilter = currentLeaderboardFilter !== 'ALL';
      const sourceList = isClassFilter ? (classGroups[currentLeaderboardFilter] || []) : speedList;
      const displayList = sourceList.slice(0, isClassFilter ? 15 : 20);

      const tbody = document.getElementById('leaderboard-tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      if (displayList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center;padding:24px;color:#94A3B8;">⚡ 尚無符合條件的手速紀錄，歡迎搶先挑戰！</td></tr>`;
        return;
      }

      displayList.forEach(item => {
        const tr = document.createElement('tr');
        const rank = isClassFilter ? item.classRank : item.overallRank;

        let rankBadge = `${rank}`;
        if (rank === 1) rankBadge = `<span style="font-size:18px;">🥇 1</span>`;
        else if (rank === 2) rankBadge = `<span style="font-size:18px;">🥈 2</span>`;
        else if (rank === 3) rankBadge = `<span style="font-size:18px;">🥉 3</span>`;

        const isMe = currentStudent && (currentStudent.cls === item.cls && currentStudent.num === item.num);
        if (isMe) {
          tr.style.background = '#EFF6FF';
          tr.style.fontWeight = 'bold';
        }

        const bankObj = (typeof MODE2_WEEKLY_BANKS === 'object' && MODE2_WEEKLY_BANKS) ? MODE2_WEEKLY_BANKS[item.weekKey || speedLeaderboardWeek] : null;
        const wkName = bankObj ? bankObj.title : (item.weekKey || speedLeaderboardWeek);

        tr.innerHTML = `
          <td style="font-weight:900;color:${rank <= 3 ? '#B45309' : '#1E293B'};">${rankBadge}</td>
          <td><span class="st-poke-tag" style="background:#DBEAFE;color:#1E40AF;font-weight:800;">${item.cls}</span></td>
          <td style="font-weight:700;">${item.num}</td>
          <td style="font-weight:800;color:#1E293B;">${item.name}</td>
          <td style="font-size:12px;color:#475569;font-weight:700;">${wkName}</td>
          <td style="font-weight:900;color:#0284C7;font-size:15px;">⏱️ ${item.bestTime.toFixed(2)}s</td>
          <td style="color:#64748B;font-size:13px;">${item.rawTime.toFixed(2)}s</td>
          <td style="font-weight:800;color:${item.accuracy >= 95 ? '#10B981' : '#F59E0B'};">${item.accuracy}%</td>
          <td style="color:${item.accPenalty > 0 ? '#EF4444' : '#10B981'};font-size:12px;">+${item.accPenalty.toFixed(2)}s</td>
          <td style="font-weight:800;color:#D97706;">${item.cpm} 字/分</td>
          <td style="font-size:11px;font-weight:800;color:#7C3AED;">${item.tier}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // 頁面載入時依日期自動初始化手速字庫下拉選單與排行榜篩選器
    window.addEventListener('DOMContentLoaded', () => {
      initSpeedWeekDropdown();
    });
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      try { initSpeedWeekDropdown(); } catch(e) {}
    }
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (getGasWebhookUrl() && typeof fetchCloudLeaderboard === 'function') {
        fetchCloudLeaderboard(true);
      }
    }, 400);
  });
}
