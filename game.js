// نظام الحالة والرتب
let gameState = JSON.parse(localStorage.getItem('radyWarsData')) || {
    gold: 500,
    iron: 200,
    soldiers: 0,
    rank: "ملازم"
};

const ranks = [
    { name: "ملازم", min: 0 },
    { name: "نقيب", min: 50 },
    { name: "رائد", min: 150 },
    { name: "عميد", min: 500 },
    { name: "فريق أول", min: 1000 }
];

function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(gameState.gold);
    document.getElementById('iron-count').innerText = Math.floor(gameState.iron);
    document.getElementById('army-count').innerText = gameState.soldiers;
    
    // تحديث الرتبة بناءً على عدد الجنود
    let currentRank = ranks.filter(r => gameState.soldiers >= r.min).pop();
    gameState.rank = currentRank.name;
    document.getElementById('rank-display').innerText = "الرتبة: " + gameState.rank;

    localStorage.setItem('radyWarsData', JSON.stringify(gameState));
}

function trainSoldier() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.soldiers += 1;
        updateUI();
    } else {
        alert("الموارد غير كافية!");
    }
}

// زيادة الموارد تلقائياً كل ثانية
setInterval(() => {
    gameState.gold += 1;
    updateUI();
}, 1000);

// تسجيل نظام العمل بدون إنترنت (Service Worker)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
