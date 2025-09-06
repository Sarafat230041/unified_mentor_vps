// Enhanced game state
let petStats = {
    hunger: 80,
    happiness: 70,
    energy: 90,
    health: 100,
    intelligence: 50,
    sleeping: false,
    sick: false,
    mood: 'happy'
};

let playerData = {
    level: 1,
    xp: 0,
    xpToNext: 100,
    coins: 100,
    petType: 'cat',
    petName: 'Buddy'
};

let inventory = {
    food: 5,
    toy: 3,
    medicine: 2,
    premiumFood: 0,
    superToy: 0,
    healthPotion: 0
};

let gameState = {
    weather: 'sunny',
    isNight: false,
    temperature: 22,
    achievements: [],
    totalFeedCount: 0,
    totalPlayCount: 0,
    totalSleepCount: 0,
    petClicks: 0,
    gamesPlayed: 0,
    itemsUsed: 0
};

// Weather system
const weatherTypes = [{
    type: 'sunny',
    icon: '☀️',
    name: 'Sunny Day',
    effect: {
        happiness: 1.1
    }
}, {
    type: 'rainy',
    icon: '🌧️',
    name: 'Rainy Day',
    effect: {
        energy: 0.9
    }
}, {
    type: 'snowy',
    icon: '❄️',
    name: 'Snowy Day',
    effect: {
        hunger: 1.1
    }
}, {
    type: 'cloudy',
    icon: '☁️',
    name: 'Cloudy Day',
    effect: {}
}, {
    type: 'stormy',
    icon: '⛈️',
    name: 'Stormy Night',
    effect: {
        happiness: 0.8,
        energy: 0.8
    }
}];

// Pet types with unique characteristics
const petTypes = {
    cat: {
        name: 'Cat',
        emoji: '🐱',
        hungerRate: 1.0,
        happinessRate: 1.2,
        energyRate: 0.8
    },
    dog: {
        name: 'Dog',
        emoji: '🐶',
        hungerRate: 1.3,
        happinessRate: 1.5,
        energyRate: 1.0
    },
    dragon: {
        name: 'Dragon',
        emoji: '🐉',
        hungerRate: 0.8,
        happinessRate: 1.0,
        energyRate: 1.3
    },
    robot: {
        name: 'Robot',
        emoji: '🤖',
        hungerRate: 0.5,
        happinessRate: 0.8,
        energyRate: 0.6
    }
};

// Premium features initialization
function initPremiumFeatures() {
    // Loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    }, 2000);

    // Initialize systems
    createAdvancedStars();
    startWeatherSystem();
    startAdvancedGameLoop();
    startDayNightCycle();
    loadPlayerData();
    updateAllUI();

    // Welcome notification
    showNotification('Welcome to Premium Pet Simulator! 🎉', 'success');
}

// Advanced star system with shooting stars
function createAdvancedStars() {
    const starsContainer = document.getElementById('stars');

    // Regular twinkling stars
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }

    // Shooting stars
    setInterval(() => {
        if (Math.random() < 0.3) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = Math.random() * 100 + '%';
            shootingStar.style.top = Math.random() * 50 + '%';
            starsContainer.appendChild(shootingStar);

            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.parentNode.removeChild(shootingStar);
                }
            }, 3000);
        }
    }, 8000);
}

// Dynamic weather system
function startWeatherSystem() {
    setInterval(() => {
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        changeWeather(randomWeather);
    }, 45000); // Change weather every 45 seconds

    // Initial weather
    changeWeather(weatherTypes[0]);
}

function changeWeather(weather) {
    gameState.weather = weather.type;
    document.getElementById('weatherDisplay').textContent = `${weather.icon} ${weather.name}`;

    // Clear previous weather effects
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';

    // Add weather effects
    if (weather.type === 'rainy') {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const rain = document.createElement('div');
                rain.className = 'rain';
                rain.style.left = Math.random() * 100 + '%';
                rain.style.animationDelay = Math.random() * 1 + 's';
                weatherContainer.appendChild(rain);

                setTimeout(() => {
                    if (rain.parentNode) rain.parentNode.removeChild(rain);
                }, 1000);
            }, i * 100);
        }
    } else if (weather.type === 'snowy') {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const snow = document.createElement('div');
                snow.className = 'snow';
                snow.textContent = '❄';
                snow.style.left = Math.random() * 100 + '%';
                snow.style.fontSize = (Math.random() * 15 + 10) + 'px';
                snow.style.animationDelay = Math.random() * 3 + 's';
                weatherContainer.appendChild(snow);

                setTimeout(() => {
                    if (snow.parentNode) snow.parentNode.removeChild(snow);
                }, 3000);
            }, i * 200);
        }
    }

    showNotification(`Weather changed to ${weather.name}! ${weather.icon}`, 'info');
}

// Pet type management
function changePetType(type) {
    playerData.petType = type;
    playerData.petName = `${playerData.petName.split(' ')[0]} the ${petTypes[type].name}`;

    // Update UI
    document.getElementById('petName').textContent = playerData.petName;
    const pet = document.getElementById('pet');
    pet.className = `pet pet-${type}`;

    // Update active button
    document.querySelectorAll('.pet-type-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    showNotification(`Switched to ${petTypes[type].name}! ${petTypes[type].emoji}`, 'success');
    gainXP(10);
}

// Enhanced pet interactions
function petClick() {
    gameState.petClicks++;
    const bonusAmount = 3 + Math.floor(playerData.level / 2);
    petStats.happiness = Math.min(100, petStats.happiness + bonusAmount);

    createFloatingText(`💕 +${bonusAmount} Love`, 'center');
    createAdvancedParticles('heart', 5);

    // Special click achievements
    if (gameState.petClicks === 1) {
        unlockAchievement('First Click', 'You clicked your pet for the first time! 💕');
        gainXP(5);
    } else if (gameState.petClicks === 50) {
        unlockAchievement('Pet Lover', 'Clicked your pet 50 times! 🥰');
        gainXP(25);
    } else if (gameState.petClicks === 200) {
        unlockAchievement('Click Master', 'Clicked your pet 200 times! You really love them! 💖');
        gainXP(50);
    }

    // Random bonus
    if (Math.random() < 0.1) {
        const coinBonus = Math.floor(Math.random() * 5) + 1;
        playerData.coins += coinBonus;
        createFloatingText(`🪙 +${coinBonus} Bonus!`, 'center');
    }

    updateAllUI();
}

function feedPet() {
    if (petStats.sleeping) {
        showNotification('Your pet is sleeping! 😴', 'warning');
        return;
    }

    if (inventory.food <= 0) {
        showNotification('No food in inventory! Buy some from the shop. 🛒', 'warning');
        return;
    }

    inventory.food--;
    gameState.totalFeedCount++;
    gameState.itemsUsed++;

    const hungerBonus = 20 + Math.floor(playerData.level / 3);
    petStats.hunger = Math.min(100, petStats.hunger + hungerBonus);
    petStats.happiness = Math.min(100, petStats.happiness + 8);

    createFloatingText(`🍖 +${hungerBonus} Food!`, 'center');
    createAdvancedParticles('food', 3);

    // Feeding achievements
    if (gameState.totalFeedCount === 10) {
        unlockAchievement('Good Caretaker', 'Fed your pet 10 times! 🍽️');
        gainXP(15);
    } else if (gameState.totalFeedCount === 50) {
        unlockAchievement('Master Chef', 'Fed your pet 50 times! 👨‍🍳');
        gainXP(40);
    }

    gainXP(3);
    updateAllUI();
}

function playWithPet() {
    if (petStats.sleeping) {
        showNotification('Your pet is sleeping! 😴', 'warning');
        return;
    }

    if (petStats.energy < 15) {
        showNotification('Your pet is too tired to play! 😪', 'warning');
        return;
    }

    if (inventory.toy <= 0) {
        showNotification('No toys in inventory! Buy some from the shop. 🛒', 'warning');
        return;
    }

    inventory.toy--;
    gameState.totalPlayCount++;
    gameState.itemsUsed++;

    const happinessBonus = 25 + Math.floor(playerData.level / 2);
    petStats.happiness = Math.min(100, petStats.happiness + happinessBonus);
    petStats.intelligence = Math.min(100, petStats.intelligence + 5);
    petStats.energy = Math.max(0, petStats.energy - 12);
    petStats.hunger = Math.max(0, petStats.hunger - 8);

    createFloatingText(`🎾 +${happinessBonus} Fun!`, 'center');
    createAdvancedParticles('play', 8);

    // Play achievements
    if (gameState.totalPlayCount === 15) {
        unlockAchievement('Play Buddy', 'Played with your pet 15 times! 🎮');
        gainXP(20);
    }

    gainXP(5);
    updateAllUI();
}

function petSleep() {
    if (petStats.sleeping) {
        // Wake up
        petStats.sleeping = false;
        document.getElementById('pet').classList.remove('pet-sleeping');
        createFloatingText('☀️ Good morning!', 'center');
        showNotification('Your pet woke up refreshed! 😊', 'success');
    } else {
        // Sleep
        petStats.sleeping = true;
        gameState.totalSleepCount++;
        document.getElementById('pet').classList.add('pet-sleeping');

        const energyBonus = 35 + Math.floor(playerData.level / 2);
        petStats.energy = Math.min(100, petStats.energy + energyBonus);

        createFloatingText('💤 Sweet dreams!', 'center');
        createAdvancedParticles('sleep', 4);
        showNotification('Your pet is sleeping peacefully... 😴', 'info');

        // Sleep achievements
        if (gameState.totalSleepCount === 5) {
            unlockAchievement('Sleep Expert', 'Put your pet to sleep 5 times! 😴');
            gainXP(15);
        }

        gainXP(3);
    }

    updateAllUI();
}

// Inventory system
function useItem(itemType) {
    if (petStats.sleeping && itemType !== 'medicine') {
        showNotification('Your pet is sleeping! 😴', 'warning');
        return;
    }

    if (inventory[itemType] <= 0) {
        showNotification('No items of this type! 📦', 'warning');
        return;
    }

    inventory[itemType]--;
    gameState.itemsUsed++;

    switch (itemType) {
        case 'food':
            feedPet();
            return; // feedPet already handles the logic
        case 'toy':
            playWithPet();
            return; // playWithPet already handles the logic
        case 'medicine':
            petStats.health = Math.min(100, petStats.health + 30);
            petStats.sick = false;
            createFloatingText('💊 +30 Health!', 'center');
            showNotification('Your pet feels much better! 💊', 'success');
            gainXP(5);
            break;
        case 'premiumFood':
            petStats.hunger = Math.min(100, petStats.hunger + 35);
            petStats.health = Math.min(100, petStats.health + 8);
            createFloatingText('🥩 +35 Food, +8 Health!', 'center');
            gainXP(8);
            break;
        case 'superToy':
            petStats.happiness = Math.min(100, petStats.happiness + 30);
            petStats.intelligence = Math.min(100, petStats.intelligence + 12);
            createFloatingText('🎯 +30 Fun, +12 Intelligence!', 'center');
            gainXP(10);
            break;
        case 'healthPotion':
            petStats.health = 100;
            petStats.sick = false;
            createFloatingText('🧪 Full Health Restored!', 'center');
            gainXP(15);
            break;
    }

    createAdvancedParticles('sparkle', 6);
    updateAllUI();
}

// Mini-games system
function playMemoryGame() {
    showNotification('Memory game started! Remember the sequence... 🧠', 'info');

    // Simple memory game simulation
    const sequences = [
        ['🔴', '🟢', '🔵'],
        ['🟡', '🔴', '🟢', '🔵'],
        ['🔵', '🟡', '🔴', '🟢', '🟣'],
        ['🟠', '🔴', '🟢', '🔵', '🟡', '🟣']
    ];

    const difficulty = Math.min(Math.floor(playerData.level / 5), 3);
    const sequence = sequences[difficulty];

    // Simulate game success (80% chance)
    setTimeout(() => {
        if (Math.random() < 0.8) {
            const intelligenceGain = 8 + difficulty * 3;
            const coinReward = 5 + difficulty * 2;

            petStats.intelligence = Math.min(100, petStats.intelligence + intelligenceGain);
            playerData.coins += coinReward;

            createFloatingText(`🧠 +${intelligenceGain} Intelligence!`, 'center');
            showNotification(`Great memory! +${coinReward} coins! 🪙`, 'success');
            gainXP(10 + difficulty * 5);
        } else {
            showNotification('Nice try! Keep practicing! 💪', 'info');
            gainXP(2);
        }

        gameState.gamesPlayed++;
        updateAllUI();
    }, 2000);
}

function playReactionGame() {
    showNotification('Reaction game started! Click when you see the signal! ⚡', 'info');

    const reactionTime = 1000 + Math.random() * 3000;

    setTimeout(() => {
        const startTime = Date.now();
        const reactionPrompt = document.createElement('div');
        reactionPrompt.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #e74c3c;
                    color: white;
                    padding: 30px 50px;
                    border-radius: 20px;
                    font-size: 2rem;
                    font-weight: bold;
                    z-index: 1000;
                    cursor: pointer;
                `;
        reactionPrompt.textContent = 'CLICK NOW!';

        reactionPrompt.onclick = () => {
            const reactionSpeed = Date.now() - startTime;
            document.body.removeChild(reactionPrompt);

            let performance = 'Good';
            let energyGain = 10;
            let coinReward = 3;

            if (reactionSpeed < 500) {
                performance = 'Excellent';
                energyGain = 20;
                coinReward = 8;
            } else if (reactionSpeed < 1000) {
                performance = 'Great';
                energyGain = 15;
                coinReward = 5;
            }

            petStats.energy = Math.min(100, petStats.energy + energyGain);
            playerData.coins += coinReward;

            createFloatingText(`⚡ +${energyGain} Energy!`, 'center');
            showNotification(`${performance} reflexes! ${reactionSpeed}ms - +${coinReward} coins!`, 'success');
            gainXP(8);

            gameState.gamesPlayed++;
            updateAllUI();
        };

        document.body.appendChild(reactionPrompt);

        // Auto remove after 3 seconds if not clicked
        setTimeout(() => {
            if (reactionPrompt.parentNode) {
                document.body.removeChild(reactionPrompt);
                showNotification('Too slow! Try again next time! 🐌', 'warning');
            }
        }, 3000);

    }, reactionTime);
}

function playPuzzleGame() {
    showNotification('Puzzle game started! Solve the equation! 🧩', 'info');

    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
    }

    const userAnswer = prompt(`What is ${num1} ${operation} ${num2}?`);

    if (parseInt(userAnswer) === answer) {
        const happinessGain = 25 + Math.floor(playerData.level / 2);
        const coinReward = 6;

        petStats.happiness = Math.min(100, petStats.happiness + happinessGain);
        petStats.intelligence = Math.min(100, petStats.intelligence + 8);
        playerData.coins += coinReward;

        createFloatingText(`🧩 +${happinessGain} Happiness!`, 'center');
        showNotification(`Correct! Great problem solving! +${coinReward} coins!`, 'success');
        gainXP(12);
    } else {
        showNotification(`Incorrect. The answer was ${answer}. Keep trying! 🤔`, 'info');
        gainXP(3);
    }

    gameState.gamesPlayed++;
    updateAllUI();
}

// Shop system
function buyItem(itemType, cost) {
    if (playerData.coins < cost) {
        showNotification('Not enough coins! Play mini-games to earn more! 💰', 'warning');
        return;
    }

    playerData.coins -= cost;

    switch (itemType) {
        case 'premiumFood':
            inventory.premiumFood++;
            showNotification('Bought Premium Food! 🥩', 'success');
            break;
        case 'superToy':
            inventory.superToy++;
            showNotification('Bought Super Toy! 🎯', 'success');
            break;
        case 'healthPotion':
            inventory.healthPotion++;
            showNotification('Bought Health Potion! 🧪', 'success');
            break;
        case 'xpBoost':
            gainXP(50);
            showNotification('Experience boost applied! +50 XP! ⭐', 'success');
            break;
    }

    gainXP(2);
    updateAllUI();
}

// Level and XP system
function gainXP(amount) {
    playerData.xp += amount;

    // Check for level up
    while (playerData.xp >= playerData.xpToNext) {
        playerData.xp -= playerData.xpToNext;
        playerData.level++;
        playerData.xpToNext = Math.floor(playerData.xpToNext * 1.5);

        // Level up rewards
        playerData.coins += playerData.level * 5;
        inventory.food += 2;
        inventory.toy += 1;

        showLevelUp();
        unlockAchievement(`Level ${playerData.level}`, `Reached level ${playerData.level}! 🎉`);
    }

    updateAllUI();
}

function showLevelUp() {
    const levelUpEffect = document.createElement('div');
    levelUpEffect.className = 'level-up-effect';
    levelUpEffect.textContent = `LEVEL UP! 🎉 Level ${playerData.level}`;
    document.body.appendChild(levelUpEffect);

    setTimeout(() => {
        if (levelUpEffect.parentNode) {
            document.body.removeChild(levelUpEffect);
        }
    }, 3000);

    showNotification(`Congratulations! You reached level ${playerData.level}! 🎊`, 'success');
}

// Achievement system
function unlockAchievement(title, description) {
    const achievementKey = title.toLowerCase().replace(/\s+/g, '_');
    if (gameState.achievements.includes(achievementKey)) return;

    gameState.achievements.push(achievementKey);

    const achievementDisplay = document.getElementById('achievementDisplay');
    const newAchievement = document.createElement('div');
    newAchievement.style.cssText = 'color: #ffd700; font-size: 0.9rem; padding: 5px; border-left: 3px solid #ffd700; margin-bottom: 5px;';
    newAchievement.innerHTML = `<strong>${title}</strong><br><small>${description}</small>`;
    achievementDisplay.insertBefore(newAchievement, achievementDisplay.firstChild);

    // Keep only last 5 achievements visible
    while (achievementDisplay.children.length > 5) {
        achievementDisplay.removeChild(achievementDisplay.lastChild);
    }

    showNotification(`Achievement Unlocked: ${title}! 🏆`, 'success');
}

// Enhanced particle system
function createAdvancedParticles(type, count) {
    const petRect = document.getElementById('pet').getBoundingClientRect();

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 100;
                        left: ${petRect.left + Math.random() * petRect.width}px;
                        top: ${petRect.top + petRect.height / 2}px;
                    `;

            let animationName, backgroundColor, fontSize = '10px',
                content = '';

            switch (type) {
                case 'heart':
                    backgroundColor = '#ff6b6b';
                    content = '❤️';
                    fontSize = '15px';
                    animationName = 'heartFloat 2s ease-out forwards';
                    break;
                case 'play':
                    backgroundColor = '#feca57';
                    content = '⭐';
                    fontSize = '12px';
                    animationName = 'starFloat 2.5s ease-out forwards';
                    break;
                case 'sleep':
                    backgroundColor = '#48dbfb';
                    content = '💤';
                    fontSize = '12px';
                    animationName = 'sleepFloat 3s ease-out forwards';
                    break;
                case 'food':
                    backgroundColor = '#ff8e53';
                    content = '🍖';
                    fontSize = '12px';
                    animationName = 'heartFloat 2s ease-out forwards';
                    break;
                case 'sparkle':
                    backgroundColor = '#ffd700';
                    content = '✨';
                    fontSize = '14px';
                    animationName = 'starFloat 3s ease-out forwards';
                    break;
            }

            if (content) {
                particle.textContent = content;
                particle.style.fontSize = fontSize;
                particle.style.background = 'none';
            } else {
                particle.style.backgroundColor = backgroundColor;
            }

            particle.style.animation = animationName;
            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 3000);
        }, i * 100);
    }
}

// Floating text system
function createFloatingText(text, position) {
    const pet = document.getElementById('pet');
    const petRect = pet.getBoundingClientRect();

    const floatingText = document.createElement('div');
    floatingText.style.cssText = `
                position: fixed;
                font-size: 1.2rem;
                font-weight: bold;
                color: #fff;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                pointer-events: none;
                z-index: 200;
                animation: floatUp 2s ease-out forwards;
            `;

    if (position === 'center') {
        floatingText.style.left = (petRect.left + petRect.width / 2) + 'px';
        floatingText.style.top = (petRect.top - 20) + 'px';
        floatingText.style.transform = 'translateX(-50%)';
    }

    floatingText.textContent = text;
    document.body.appendChild(floatingText);

    setTimeout(() => {
        if (floatingText.parentNode) {
            document.body.removeChild(floatingText);
        }
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Enhanced game loop
function startAdvancedGameLoop() {
    setInterval(() => {
        if (petStats.sleeping) {
            // Slower degradation while sleeping
            petStats.hunger = Math.max(0, petStats.hunger - 0.5);
            petStats.energy = Math.min(100, petStats.energy + 2);
        } else {
            // Apply weather effects and pet type modifiers
            const weather = weatherTypes.find(w => w.type === gameState.weather);
            const petType = petTypes[playerData.petType];

            let hungerRate = 1.5 * petType.hungerRate;
            let happinessRate = 1.0 * petType.happinessRate;
            let energyRate = 1.2 * petType.energyRate;

            if (weather && weather.effect) {
                hungerRate *= weather.effect.hunger || 1;
                happinessRate *= weather.effect.happiness || 1;
                energyRate *= weather.effect.energy || 1;
            }

            petStats.hunger = Math.max(0, petStats.hunger - hungerRate);
            petStats.happiness = Math.max(0, petStats.happiness - happinessRate);
            petStats.energy = Math.max(0, petStats.energy - energyRate);

            // Health system
            if (petStats.hunger < 20 || petStats.happiness < 30) {
                petStats.health = Math.max(0, petStats.health - 0.5);
            } else if (petStats.hunger > 80 && petStats.happiness > 80 && petStats.energy > 70) {
                petStats.health = Math.min(100, petStats.health + 0.3);
            }

            // Sickness system
            if (petStats.health < 30 && Math.random() < 0.02) {
                petStats.sick = true;
                showNotification('Your pet is feeling sick! Use medicine to help them recover. 🤒', 'warning');
            }

            // Critical status warnings
            if (petStats.hunger < 15 && !petStats.sleeping) {
                if (Math.random() < 0.1) {
                    showNotification('Your pet is starving! Feed them immediately! 🍖', 'warning');
                }
            }

            if (petStats.happiness < 10) {
                if (Math.random() < 0.1) {
                    showNotification('Your pet is very sad! Play with them to cheer them up! 🎾', 'warning');
                }
            }
        }

        // Auto-save progress
        if (Math.random() < 0.1) {
            savePlayerData();
        }

        updateAllUI();
    }, 6000); // Update every 6 seconds

    // Coin generation over time
    setInterval(() => {
        if (!petStats.sleeping && petStats.happiness > 70) {
            const coinGain = Math.floor(Math.random() * 3) + 1;
            playerData.coins += coinGain;

            if (Math.random() < 0.3) {
                createFloatingText(`🪙 +${coinGain} Passive Income!`, 'center');
            }
        }
    }, 30000); // Every 30 seconds
}

// Day/Night cycle with enhanced effects
function startDayNightCycle() {
    setInterval(() => {
        gameState.isNight = !gameState.isNight;
        const dayNightCycle = document.querySelector('body');

        if (gameState.isNight) {
            dayNightCycle.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            showNotification('🌙 Night time! Your pet will sleep better now.', 'info');

            // Night bonuses
            if (petStats.sleeping) {
                petStats.energy = Math.min(100, petStats.energy + 5);
            }
        } else {
            dayNightCycle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            showNotification('☀️ Day time! Perfect time for activities!', 'info');

            // Day bonuses
            if (!petStats.sleeping) {
                petStats.happiness = Math.min(100, petStats.happiness + 3);
            }
        }
    }, 60000); // 60 seconds day/night cycle
}

// Comprehensive UI update system
function updateAllUI() {
    // Update stat bars and text
    const stats = ['hunger', 'happiness', 'energy', 'health', 'intelligence'];
    stats.forEach(stat => {
        const value = Math.round(petStats[stat]);
        const bar = document.getElementById(`${stat}Bar`);
        const text = document.getElementById(`${stat}Text`);

        if (bar && text) {
            bar.style.width = value + '%';
            text.textContent = value + '%';

            // Color coding for low stats
            if (value < 25) {
                bar.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
            } else if (value < 50) {
                bar.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
            } else {
                // Reset to original colors
                switch (stat) {
                    case 'hunger':
                        bar.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
                        break;
                    case 'happiness':
                        bar.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
                        break;
                    case 'energy':
                        bar.style.background = 'linear-gradient(45deg, #48dbfb, #0abde3)';
                        break;
                    case 'health':
                        bar.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
                        break;
                    case 'intelligence':
                        bar.style.background = 'linear-gradient(45deg, #9b59b6, #8e44ad)';
                        break;
                }
            }
        }
    });

    // Update pet status and mood
    updatePetMood();

    // Update inventory display
    updateInventoryDisplay();

    // Update player info
    document.getElementById('playerLevel').textContent = playerData.level;
    document.getElementById('xpText').textContent = `${playerData.xp}/${playerData.xpToNext} XP`;
    document.getElementById('xpFill').style.width = (playerData.xp / playerData.xpToNext * 100) + '%';
    document.getElementById('coinsAmount').textContent = playerData.coins;
}

function updatePetMood() {
    const pet = document.getElementById('pet');
    const statusIndicator = document.getElementById('statusIndicator');

    // Remove all mood classes
    pet.classList.remove('pet-happy', 'pet-sad', 'pet-sick', 'pet-sleeping');

    if (petStats.sleeping) {
        pet.classList.add('pet-sleeping');
        statusIndicator.textContent = '😴 Sleeping peacefully...';
    } else if (petStats.sick) {
        pet.classList.add('pet-sick');
        statusIndicator.textContent = '🤒 Feeling unwell...';
    } else if (petStats.health < 30) {
        statusIndicator.textContent = '💔 Needs medical attention!';
    } else if (petStats.happiness >= 80 && petStats.energy >= 60) {
        pet.classList.add('pet-happy');
        statusIndicator.textContent = '😄 Absolutely thriving!';
    } else if (petStats.happiness >= 60) {
        pet.classList.add('pet-happy');
        statusIndicator.textContent = '😊 Having a great time!';
    } else if (petStats.happiness >= 40) {
        statusIndicator.textContent = '😐 Doing okay...';
    } else if (petStats.happiness >= 20) {
        pet.classList.add('pet-sad');
        statusIndicator.textContent = '😟 Feeling a bit down...';
    } else {
        pet.classList.add('pet-sad');
        statusIndicator.textContent = '😢 Really needs attention!';
    }

    // Critical warnings
    if (petStats.hunger < 15) {
        statusIndicator.textContent = '🍖 Extremely hungry!';
    } else if (petStats.energy < 10) {
        statusIndicator.textContent = '😪 Completely exhausted!';
    }
}

function updateInventoryDisplay() {
    document.getElementById('foodCount').textContent = `${inventory.food} items`;
    document.getElementById('toyCount').textContent = `${inventory.toy} items`;
    document.getElementById('medicineCount').textContent = `${inventory.medicine} items`;
}

// Save/Load system
function savePlayerData() {
    const saveData = {
        petStats: petStats,
        playerData: playerData,
        inventory: inventory,
        gameState: gameState
    };
    localStorage.setItem('premiumPetSimulator', JSON.stringify(saveData));
}

function loadPlayerData() {
    try {
        const saveData = JSON.parse(localStorage.getItem('premiumPetSimulator'));
        if (saveData) {
            petStats = {...petStats,
                ...saveData.petStats
            };
            playerData = {...playerData,
                ...saveData.playerData
            };
            inventory = {...inventory,
                ...saveData.inventory
            };
            gameState = {...gameState,
                ...saveData.gameState
            };

            showNotification('Progress loaded successfully! 💾', 'success');
        }
    } catch (e) {
        console.log('No save data found or error loading');
    }
}

// Special events system
function triggerSpecialEvent() {
    const events = [{
        name: 'Lucky Day',
        message: '🍀 It\'s your lucky day! Double coin rewards for 1 minute!',
        effect: () => {
            // Double coins for 1 minute
            const originalCoinGain = playerData.coins;
            setTimeout(() => {
                showNotification('Lucky day ended! Back to normal rewards.', 'info');
            }, 60000);
        }
    }, {
        name: 'Visitor',
        message: '👋 A friendly visitor brings gifts!',
        effect: () => {
            playerData.coins += 20;
            inventory.food += 3;
            inventory.toy += 2;
            gainXP(15);
        }
    }, {
        name: 'Happy Mood',
        message: '😄 Your pet is in an amazing mood today!',
        effect: () => {
            petStats.happiness = Math.min(100, petStats.happiness + 30);
            petStats.energy = Math.min(100, petStats.energy + 20);
        }
    }, {
        name: 'Energy Boost',
        message: '⚡ Natural energy boost from good weather!',
        effect: () => {
            petStats.energy = Math.min(100, petStats.energy + 25);
            petStats.health = Math.min(100, petStats.health + 10);
        }
    }];

    const event = events[Math.floor(Math.random() * events.length)];
    showNotification(`Special Event: ${event.message}`, 'success');
    event.effect();
    gainXP(10);
    updateAllUI();
}

// Random events
setInterval(() => {
    if (Math.random() < 0.15) { // 15% chance every interval
        triggerSpecialEvent();
    }
}, 120000); // Every 2 minutes

// Bonus features
function showPetStats() {
    const totalCare = gameState.totalFeedCount + gameState.totalPlayCount + gameState.totalSleepCount;
    const careLevel = totalCare < 10 ? 'Beginner' : totalCare < 50 ? 'Good' : totalCare < 100 ? 'Expert' : 'Master';

    showNotification(`Pet Care Level: ${careLevel} | Games Played: ${gameState.gamesPlayed} | Items Used: ${gameState.itemsUsed}`, 'info');
}

// Easter eggs
let clickSequence = [];
document.addEventListener('keydown', (e) => {
    clickSequence.push(e.key);
    if (clickSequence.length > 5) clickSequence.shift();

    // Konami code easter egg
    if (clickSequence.join('').includes('ArrowUpArrowUpArrowDownArrowDown')) {
        playerData.coins += 100;
        showNotification('Konami Code activated! +100 coins! 🎮', 'success');
        clickSequence = [];
    }

    // Debug mode
    if (clickSequence.join('').includes('debug')) {
        console.log('Game State:', {
            petStats,
            playerData,
            inventory,
            gameState
        });
        showNotification('Debug info logged to console! 🔧', 'info');
        clickSequence = [];
    }
});

// Auto-save every 2 minutes
setInterval(savePlayerData, 120000);

// Initialize the premium game
window.addEventListener('load', () => {
    initPremiumFeatures();

    // Special welcome achievement
    setTimeout(() => {
        unlockAchievement('Welcome', 'Welcome to Premium Pet Simulator! 🎉');
    }, 3000);
});

// Clean shutdown
window.addEventListener('beforeunload', () => {
    savePlayerData();
});