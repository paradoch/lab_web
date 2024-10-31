document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const passwordChoice = document.getElementById('passwordChoice');
    const manualPasswordFields = document.getElementById('manualPasswordFields');
    const autoPasswordField = document.getElementById("autoPasswordField");
    const generateNicknameButton = document.getElementById('generateNickname');
    const nicknameInput = document.getElementById('nickname');
    const messageDiv = document.getElementById('message');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    let nicknameAttempts = 0;
    const top100Passwords = ['123456', 'password'];
    const logoutButton = document.getElementById('logout');
    const zakazButton = document.getElementById('zakaz');
    const signButton = document.getElementById('login');
    const autButton = document.getElementById('getstart');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const toggleAutoPasswordBtn = document.getElementById("toggleAutoPasswordBtn");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const autoPassword = document.getElementById("autoPassword");
    const loginForm = document.getElementById('loginForm');
  
    function isPasswordStrong(password) {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
      return strongPasswordRegex.test(password) && !top100Passwords.includes(password);
    }
  
    function generateRandomPassword(length) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }
      return password;
    }
  
    function generateNickname() {
      const randomNickname = 'User' + Math.floor(Math.random() * 10000);
      nicknameAttempts++;
      return randomNickname;
    }
  
    function validateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
  
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
  
      return age;
    }
  
    if (passwordChoice) {
      passwordChoice.addEventListener('change', (event) => {
        if (event.target.value === 'auto') {
          manualPasswordFields.style.display = 'none';
          autoPasswordField.style.display = 'block';
          autoPassword.value = generateRandomPassword(12);
        } else {
          manualPasswordFields.style.display = 'block';
          autoPasswordField.style.display = 'none';
        }
      });
  
      if (passwordChoice.value === 'manual') {
        manualPasswordFields.style.display = 'block';
      } else {
        manualPasswordFields.style.display = 'none';
      }
    }
  
    if (generateNicknameButton) {
      generateNicknameButton.addEventListener('click', () => {
        if (nicknameAttempts < 5) {
          nicknameInput.value = generateNickname();
        } else {
          nicknameInput.removeAttribute('readonly');
          generateNicknameButton.disabled = true;
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;
        const password = passwordChoice.value === 'manual' ? passwordInput.value : autoPassword.value;
        const confirmPassword = confirmPasswordInput.value;
        const name = document.getElementById('name').value;
        const nickname = nicknameInput.value;
        const agreement = document.getElementById('agreement').checked;
        const role = document.getElementById('role').value;
  
        if (validateAge(dob) < 16) {
          messageDiv.textContent = 'You must be at least 16 years old to register.';
          return;
        }
  
        if (passwordChoice.value === 'manual' && (!isPasswordStrong(password) || password !== confirmPassword)) {
          messageDiv.textContent = 'Password does not meet the criteria or passwords do not match.';
          return;
        }
  
        if (!agreement) {
          messageDiv.textContent = 'You must agree to the User Agreement.';
          return;
        }
  
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
          messageDiv.textContent = 'Email is already registered.';
          return;
        }
  
        users.push({ phone, email, dob, password, name, nickname, role });
        localStorage.setItem('users', JSON.stringify(users));
        messageDiv.textContent = 'Registration successful!';
      });
    }
  
    if (togglePasswordBtn) {
      togglePasswordBtn.onclick = function() {
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          confirmPasswordInput.type = "text";
          togglePasswordBtn.textContent = "Скрыть";
        } else {
          passwordInput.type = "password";
          confirmPasswordInput.type = "password";
          togglePasswordBtn.textContent = "Показать";
        }
      };
    }
  
    if (toggleAutoPasswordBtn) {
      toggleAutoPasswordBtn.onclick = function() {
        if (autoPassword.type === "password") {
          autoPassword.type = "text";
          toggleAutoPasswordBtn.textContent = "Скрыть";
        } else {
          autoPassword.type = "password";
          toggleAutoPasswordBtn.textContent = "Показать";
        }
      };
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
  
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        const user = users.find(user => user.email === loginEmail && user.password === loginPassword);
        if (user) {
          messageDiv.textContent = 'Login successful!';
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));
          displayContentBasedOnRole();
          window.location.href = '../main/main.html'; 
        } else {
          messageDiv.textContent = 'Invalid email or password.';
        }
      });
    }
  
    function displayContentBasedOnRole() {
      if (loggedInUser) {
        usernameDisplay.textContent = 'Welcome, ' + loggedInUser.nickname;
        usernameDisplay.style.display = 'inline';
        logoutButton.style.display = 'inline';
        zakazButton.style.display = 'inline';
        signButton.style.display = 'none';
        autButton.style.display = 'none';
  
        if (loggedInUser.role === 'admin') {
          const adminBlocks = document.querySelectorAll('.admin-only');
          adminBlocks.forEach(block => block.style.display = 'block');
  
          const adminHiddenBlocks = document.querySelectorAll('.admin-hidden');
          adminHiddenBlocks.forEach(block => block.style.display = 'none');
        } else {
          const adminBlocks = document.querySelectorAll('.admin-only');
          adminBlocks.forEach(block => block.style.display = 'none');
  
          const adminHiddenBlocks = document.querySelectorAll('.admin-hidden');
          adminHiddenBlocks.forEach(block => block.style.display = 'block');
        }
  
        if (loggedInUser.role === 'user' || loggedInUser.role === 'admin') {
          const userBlocks = document.querySelectorAll('.user-only');
          userBlocks.forEach(block => block.style.display = 'flex');
  
          const userHiddenBlocks = document.querySelectorAll('.user-hidden');
          userHiddenBlocks.forEach(block => block.style.display = 'none');
        } else {
          const userBlocks = document.querySelectorAll('.user-only');
          userBlocks.forEach(block => block.style.display = 'none');
  
          const userHiddenBlocks = document.querySelectorAll('.user-hidden');
          userHiddenBlocks.forEach(block => block.style.display = 'block');
        }
      }
    }
  
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        usernameDisplay.style.display = 'none';
        logoutButton.style.display = 'none';
        zakazButton.style.display = 'none';
        signButton.style.display = 'inline';
        autButton.style.display = 'inline';
      });
    }
  
    window.addEventListener('DOMContentLoaded', () => {
      displayContentBasedOnRole();
    });
  });