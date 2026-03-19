// بيانات اللعبة الأساسية
let gameState = {
    gold: 500,
    iron: 200,
    soldiers: 0,
    baseLevel: 1
};

// تحميل البيانات المحفوظة إن وجدت
const savedData = localStorage.getItem('radyWarsData');
if (savedData) {
    gameState = JSON.parse(savedData);
}

// دالة التحديث الشامل للواجهة
function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(gameState.gold);
    document.getElementById('iron-count').innerText = Math.floor(gameState.iron);
    document.getElementById('army-count').innerText = gameState.soldiers;
    
    // تحديث مستوى القاعدة والرتبة
    if(document.getElementById('base-level-text')) {
        document.getElementById('base-level-text').innerText = `المقـر الرئيسـي (المستوى ${gameState.baseLevel})`;
    }
    
    let rank = "ملازم";
    if (gameState.soldiers >= 20) rank = "نقيب";
    if (gameState.soldiers >= 50) rank = "رائد";
    if (gameState.soldiers >= 100) rank = "عميد";
    document.getElementById('rank-display').innerText = "الرتبة: " + rank;

    localStorage.setItem('radyWarsData', JSON.stringify(gameState));
}

// وظائف الأزرار
window.trainSoldier = function() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.soldiers += 1;
        updateUI();
    } else {
        alert("الموارد غير كافية!");
    }
};

window.upgradeBase = function() {
    let cost = gameState.baseLevel * 200;
    if (gameState.iron >= cost) {
        gameState.iron -= cost;
        gameState.baseLevel += 1;
        updateUI();
        alert("تم تطوير القاعدة!");
    } else {
        alert("تحتاج حديد أكثر!");
    }
};

window.startMission = function() {
    if (gameState.soldiers >= 10) {
        let loot = Math.floor(Math.random() * 150) + 50;
        gameState.gold += loot;
        gameState.soldiers -= 3;
        updateUI();
        alert(`انتصرت وغنمت ${loot} ذهب!`);
    } else {
        alert("درب 10 جنود أولاً!");
    }
};

window.toggleSettings = function() {
    if (confirm("إعادة ضبط اللعبة؟")) {
        localStorage.clear();
        location.reload();
    }
};

// زيادة الموارد تلقائياً
setInterval(() => {
    gameState.gold += (1 + gameState.baseLevel);
    gameState.iron += 1;
    updateUI();
}, 1000);

// تشغيل عند التحميل
window.onload = updateUI;
