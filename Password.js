// DOM Elements
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const copyText = document.getElementById("copyText");
const refreshBtn = document.getElementById("refresh");
const generateBtn = document.getElementById("generate");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const toast = document.getElementById("toast");

// Character Dictionaries
const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

/**
 * Get cryptographically secure random integer in range [0, max - 1]
 */
function getSecureRandomInt(max) {
    if (window.crypto && window.crypto.getRandomValues) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        return randomBuffer[0] % max;
    }
    return Math.floor(Math.random() * max);
}

/**
 * Shuffle array using Fisher-Yates with crypto random
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Generate password based on user preferences
 */
function generatePassword() {
    const length = parseInt(lengthSlider.value, 10);
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    // Ensure at least one option is selected
    if (!hasUpper && !hasLower && !hasNumbers && !hasSymbols) {
        showToast("Please select at least one character type!");
        passwordInput.value = "";
        updateStrength(0, 0);
        return;
    }

    const guaranteedChars = [];
    let pool = "";

    if (hasUpper) {
        guaranteedChars.push(CHAR_SETS.uppercase[getSecureRandomInt(CHAR_SETS.uppercase.length)]);
        pool += CHAR_SETS.uppercase;
    }
    if (hasLower) {
        guaranteedChars.push(CHAR_SETS.lowercase[getSecureRandomInt(CHAR_SETS.lowercase.length)]);
        pool += CHAR_SETS.lowercase;
    }
    if (hasNumbers) {
        guaranteedChars.push(CHAR_SETS.numbers[getSecureRandomInt(CHAR_SETS.numbers.length)]);
        pool += CHAR_SETS.numbers;
    }
    if (hasSymbols) {
        guaranteedChars.push(CHAR_SETS.symbols[getSecureRandomInt(CHAR_SETS.symbols.length)]);
        pool += CHAR_SETS.symbols;
    }

    // Fill remaining password length from the pool
    const passwordChars = [...guaranteedChars];
    const remainingLength = length - guaranteedChars.length;

    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = getSecureRandomInt(pool.length);
        passwordChars.push(pool[randomIndex]);
    }

    // Shuffle characters to avoid predictable patterns
    const finalPassword = shuffleArray(passwordChars).join("");
    passwordInput.value = finalPassword;

    // Evaluate strength
    const activeTypesCount = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;
    updateStrength(length, activeTypesCount);
}

/**
 * Calculate and display password strength
 */
function updateStrength(length, typesCount) {
    if (length === 0 || typesCount === 0) {
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = "transparent";
        strengthText.textContent = "None";
        strengthText.style.color = "var(--text-muted)";
        return;
    }

    let score = 0;

    // Length scoring
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (length >= 20) score += 1;

    // Variety scoring
    if (typesCount >= 2) score += 1;
    if (typesCount >= 3) score += 1;
    if (typesCount === 4) score += 1;

    // Strength tier
    if (score <= 2) {
        strengthBar.style.width = "25%";
        strengthBar.style.backgroundColor = "var(--strength-weak)";
        strengthText.textContent = "Weak";
        strengthText.style.color = "var(--strength-weak)";
    } else if (score <= 4) {
        strengthBar.style.width = "50%";
        strengthBar.style.backgroundColor = "var(--strength-fair)";
        strengthText.textContent = "Fair";
        strengthText.style.color = "var(--strength-fair)";
    } else if (score <= 5) {
        strengthBar.style.width = "75%";
        strengthBar.style.backgroundColor = "var(--strength-good)";
        strengthText.textContent = "Good";
        strengthText.style.color = "var(--strength-good)";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "var(--strength-strong)";
        strengthText.textContent = "Very Strong";
        strengthText.style.color = "var(--strength-strong)";
    }
}

/**
 * Copy password to clipboard
 */
async function copyPassword() {
    const password = passwordInput.value;
    if (!password) {
        showToast("No password to copy!");
        return;
    }

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(password);
        } else {
            passwordInput.select();
            document.execCommand("copy");
        }

        // Visual feedback on button
        copyBtn.classList.add("copied");
        copyText.textContent = "Copied!";
        showToast("Password copied to clipboard!");

        setTimeout(() => {
            copyBtn.classList.remove("copied");
            copyText.textContent = "Copy";
        }, 2000);
    } catch (err) {
        console.error("Clipboard copy failed:", err);
        showToast("Failed to copy password.");
    }
}

/**
 * Display toast notification
 */
let toastTimeout;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

// Event Listeners
generateBtn.addEventListener("click", generatePassword);

refreshBtn.addEventListener("click", () => {
    generatePassword();
});

copyBtn.addEventListener("click", copyPassword);

lengthSlider.addEventListener("input", (e) => {
    lengthValue.textContent = e.target.value;
    generatePassword();
});

[uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        // Prevent unchecking all
        const checkedCount = [uppercaseEl, lowercaseEl, numbersEl, symbolsEl].filter(c => c.checked).length;
        if (checkedCount === 0) {
            checkbox.checked = true;
            showToast("At least one option must be selected!");
            return;
        }
        generatePassword();
    });
});

// Initial Password Generation on Page Load
generatePassword();
