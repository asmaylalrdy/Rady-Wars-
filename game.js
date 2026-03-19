// 1. بيانات اللعبة مع قيم افتراضية قوية للبدء
let gameState = JSON.parse(localStorage.getItem('radyWarsData')) || {
    gold: 1000,
    iron: 500,
    soldiers: 0,
    baseLevel: 1,
    rank: "ملازم"
};

// نظام الرتب
const ranks = [
    { name: "ملازم", min: 0 },
    { name: "نقيب", min: 20 },
    { name: "رائد", min: 50 },
    { name: "عميد", min: 100 },
    { name: "فريق أول", min: 500 }
];

// 2. دالة تحديث الشاشة (تأكد من وجود ID مطابق في HTML)
function updateUI() {
    // تحديث الأرقام في الأعلى
    if(document.getElementById('gold-count')) document.getElementById('gold-count').innerText = Math.floor(gameState.gold);
    if(document.getElementById('iron-count')) document.getElementById('iron-count').innerText = Math.floor(gameState.iron);
    if(document.getElementById('army-count')) document.getElementById('army-count').innerText = gameState.soldiers;
    
    // تحديث الرتبة
    let currentRank = ranks.filter(r => gameState.soldiers >= r.min).pop();
    if(document.getElementById('rank-display')) document.getElementById('rank-display').innerText = "الرتبة: " + currentRank.name;

    // تحديث مستوى القاعدة في المنتصف
    if(document.querySelector('.base-view h2')) {
        document.querySelector('.base-view h2').innerText = `المقـر الرئيسـي (المستوى ${gameState.baseLevel})`;
    }

    // حفظ البيانات في ذاكرة الهاتف (للعمل بدون إنترنت)
    localStorage.setItem('radyWarsData', JSON.stringify(gameState));
}

// 3. زر تدريب الجندي (يعمل)
function trainSoldier() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.soldiers += 1;
        updateUI();
    } else {
        alert("الموارد غير كافية! تحتاج 50 ذهب.");
    }
}

// 4. إصلاح زر تطوير القاعدة
function upgradeBase() {
    let cost = gameState.baseLevel * 200; // التكلفة تزيد مع كل مستوى
    if (gameState.iron >= cost) {
        gameState.iron -= cost;
        gameState.baseLevel += 1;
        alert("تهانينا! تم تطوير القاعدة للمستوى " + gameState.baseLevel);
        updateUI();
    } else {
        alert(`تحتاج إلى ${cost} حديد لتطوير القاعدة!`);
    }
}

// 5. إصلاح زر غزو منطقة
function startMission() {
    if (gameState.soldiers >= 10) {
        let winChance = Math.random();
        if (winChance > 0.3) { // نسبة فوز 70%
            let loot = Math.floor(Math.random() * 200) + 100;
            gameState.gold += loot;
            gameState.iron += 50;
            gameState.soldiers -= 3; // خسائر بسيطة
            alert(`نصر ساحق! غنمت ${loot} ذهب و 50 حديد.`);
        } else {
            gameState.soldiers -= 5;
            alert("للأسف تراجع جيشك! فقدت 5 جنود في المعركة.");
        }
        updateUI();
    } else {
        alert("جيشك صغير جداً! درب 10 جنود على الأقل للغزو.");
    }
}

// 6. تفعيل زر الإعدادات (الترس)
function toggleSettings() {
    let action = confirm("هل تريد إعادة ضبط اللعبة بالكامل (حذف كل التقدم)؟");
    if (action) {
        localStorage.clear();
        location.reload();
    }
}

// 7. محرك الموارد (زيادة تلقائية كل ثانية)
setInterval(() => {
    gameState.gold += (1 + gameState.baseLevel); // الذهب يزيد أسرع مع تطوير القاعدة
    gameState.iron += (0.5 + (gameState.baseLevel * 0.5));
    updateUI();
}, 1000);

// تشغيل التحديث فور فتح اللعبة
window.onload = updateUI;
