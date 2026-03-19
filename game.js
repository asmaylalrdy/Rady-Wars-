// 1. الحالة والبيانات
let gameState = JSON.parse(localStorage.getItem('radyWarsData')) || {
    gold: 500,
    iron: 200,
    soldiers: 0,
    rank: "ملازم",
    baseLevel: 1
};

const ranks = [
    { name: "ملازم", min: 0 },
    { name: "نقيب", min: 10 },
    { name: "رائد", min: 30 },
    { name: "عميد", min: 100 }
];

// 2. تحديث الواجهة
function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(gameState.gold);
    document.getElementById('iron-count').innerText = Math.floor(gameState.iron);
    document.getElementById('army-count').innerText = gameState.soldiers;
    
    let currentRank = ranks.filter(r => gameState.soldiers >= r.min).pop();
    document.getElementById('rank-display').innerText = "الرتبة: " + currentRank.name;

    localStorage.setItem('radyWarsData', JSON.stringify(gameState));
}

// 3. وظيفة تدريب الجنود
function trainSoldier() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.soldiers += 1;
        updateUI();
    } else {
        alert("الموارد غير كافية! تحتاج 50 ذهب.");
    }
}

// 4. وظيفة تطوير القاعدة (التي طلبتها)
function upgradeBase() {
    if (gameState.iron >= 200) {
        gameState.iron -= 200;
        gameState.baseLevel += 1;
        alert("تم تطوير القاعدة للمستوى " + gameState.baseLevel);
        updateUI();
    } else {
        alert("تحتاج إلى 200 حديد لتطوير القاعدة!");
    }
}

// 5. وظيفة غزو منطقة
function startMission() {
    if (gameState.soldiers >= 5) {
        let loot = Math.floor(Math.random() * 100) + 50;
        gameState.gold += loot;
        gameState.soldiers -= 2; // خسائر معركة
        alert("انتصرت في المعركة وغنمت " + loot + " ذهب! (فقدت جنديين)");
        updateUI();
    } else {
        alert("جيشك ضعيف! درب 5 جنود على الأقل للهجوم.");
    }
}

// 6. تفعيل زر الإعدادات (الترس)
function toggleSettings() {
    let pass = prompt("أدخل كلمة مرور القائد لإعادة ضبط اللعبة (مسح البيانات):");
    if (pass === "rady123") {
        localStorage.clear();
        location.reload();
    }
}

// زيادة الموارد تلقائياً
setInterval(() => {
    gameState.gold += 2; // زيادة السرعة للتجربة
    gameState.iron += 1;
    updateUI();
}, 1000);

updateUI();
