// بيانات اللعبة المتكاملة مع متجر الأسلحة
let gameState = {
    gold: 500,
    iron: 200,
    soldiers: 0,
    tanks: 0, // آليات جديدة
    baseLevel: 1
};

// تحميل البيانات المحفوظة إن وجدت
const savedData = localStorage.getItem('radyWarsData');
if (savedData) {
    gameState = JSON.parse(savedData);
}

// دالة التحديث الشامل للواجهة والجيش البصري
function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(gameState.gold);
    document.getElementById('iron-count').innerText = Math.floor(gameState.iron);
    document.getElementById('soldiers-count').innerText = gameState.soldiers;
    document.getElementById('tanks-count').innerText = gameState.tanks;
    
    // تحديث مستوى القاعدة والرتبة
    document.getElementById('base-level-text').innerText = `المقـر الرئيسـي (المستوى ${gameState.baseLevel})`;
    
    let totalPower = gameState.soldiers + (gameState.tanks * 10);
    let rank = "ملازم";
    if (totalPower >= 10) rank = "نقيب";
    if (totalPower >= 50) rank = "رائد";
    if (totalPower >= 150) rank = "عميد";
    document.getElementById('rank-display').innerText = "الرتبة: " + rank;

    renderArmyVisuals(); // بناء الجيش البصري
    localStorage.setItem('radyWarsData', JSON.stringify(gameState));
}

// بناء الجيش البصري في ساحة الكتيبة
function renderArmyVisuals() {
    const barracks = document.getElementById('army-barracks');
    barracks.innerHTML = ''; // تنظيف الساحة
    
    // إظهار جندي واحد لكل جندي حقيقي (ماكس 20 للتوضيح البصري)
    for(let i=0; i < Math.min(gameState.soldiers, 20); i++) {
        let s = document.createElement('span');
        s.innerText = '🪖';
        s.className = 'soldier-anim';
        barracks.appendChild(s);
    }

    // إظهار مدرعة واحدة لكل مدرعة (ماكس 5 للتوضيح البصري)
    for(let i=0; i < Math.min(gameState.tanks, 5); i++) {
        let t = document.createElement('span');
        t.innerText = '🚜';
        t.className = 'tank-anim';
        barracks.appendChild(t);
    }
}

// وظائف متجر الأسلحة وبناء الجيش
window.trainSoldier = function() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.soldiers += 1;
        updateUI();
    } else {
        alert("الموارد غير كافية لجندي!");
    }
};

window.buildTank = function() {
    if (gameState.baseLevel >= 2) {
        if (gameState.iron >= 200) {
            gameState.iron -= 200;
            gameState.tanks += 1;
            updateUI();
        } else {
            alert("تحتاج 200 حديد لبناء مدرعة!");
        }
    } else {
        alert("طور القاعدة للمستوى 2 لفتح المدرعات!");
    }
};

// وظائف التطوير والغزو
window.upgradeBase = function() {
    let cost = gameState.baseLevel * 200;
    if (gameState.iron >= cost) {
        gameState.iron -= cost;
        gameState.baseLevel += 1;
        updateUI();
        alert("تم تطوير القاعدة للمستوى " + gameState.baseLevel);
    } else {
        alert("تحتاج حديد أكثر!");
    }
};

window.startMission = function() {
    let armyPower = gameState.soldiers + (gameState.tanks * 10);
    if (armyPower >= 20) {
        let loot = Math.floor(Math.random() * 200) + 100;
        gameState.gold += loot;
        gameState.iron += 50;
        
        // خسائر معركة بسيطة
        gameState.soldiers = Math.max(0, gameState.soldiers - 2); 
        
        updateUI();
        alert(`نصر ساحق! غنمت ${loot} ذهب و 50 حديد.`);
    } else {
        alert("جيشك ضعيف! درب جنود أو ابن مدرعات أولاً.");
    }
};

// وظيفة تبديل التبويبات (Tabs)
window.switchTab = function(tabName) {
    document.querySelectorAll('.command-content').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName + '-tab').classList.add('active-tab');
    event.target.classList.add('active');
};

// زيادة الموارد تلقائياً
setInterval(() => {
    gameState.gold += (2 + gameState.baseLevel);
    gameState.iron += 1;
    updateUI();
}, 1000);

// تشغيل عند التحميل
window.onload = updateUI;
