// ======================================================
// CAMPUSCODE - STUDENT AUTHENTICATION
// Demo Authentication using Browser LocalStorage
// ======================================================


// 1. LocalStorage Keys
const USERS_KEY = 'campuscode_users';
const CURRENT_USER_KEY = 'campuscode_current_user';


// 2. Default Demo Student Account
const DEMO_USER = {
  fullName: 'CampusCode Student',
  email: 'student@gmail.com',
  password: 'Student@123',
  accountType: 'student',
};


// ======================================================
// 3. GET ALL REGISTERED USERS
// ======================================================

export function getUsers() {
  try {
    const savedUsers = JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    );

    const users = Array.isArray(savedUsers) ? savedUsers : [];

    // Add demo account if it doesn't already exist
    const demoExists = users.some(
      (user) => user.email?.toLowerCase() === DEMO_USER.email
    );

    if (!demoExists) {
      users.push(DEMO_USER);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return users;

  } catch (error) {
    console.error('Error retrieving users:', error);

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([DEMO_USER])
    );

    return [DEMO_USER];
  }
}


// ======================================================
// 4. REGISTER NEW STUDENT
// ======================================================

export function registerUser(user) {

  const users = getUsers();

  const email = user.email.trim().toLowerCase();

  // Check if email already exists
  const existingUser = users.find(
    (item) => item.email.toLowerCase() === email
  );

  if (existingUser) {
    return {
      ok: false,
      message: 'An account with this email already exists. Please login.'
    };
  }

  // Create new student account
  const newUser = {
    fullName: user.fullName.trim(),
    email: email,
    password: user.password,
    accountType: user.accountType || 'student',
  };

  // Save registered user
  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  return {
    ok: true,
    message: 'Registration successful!'
  };
}


// ======================================================
// 5. LOGIN STUDENT
// ======================================================

export function loginUser(email, password) {

  const users = getUsers();

  if (!email || !password) {
    return null;
  }

  // Find matching user
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  // Invalid credentials
  if (!user) {
    return null;
  }

  // Save logged-in user details
  const currentUser = {
    fullName: user.fullName,
    email: user.email,
    accountType: user.accountType || 'student',
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );

  return user;
}


// ======================================================
// 6. GET CURRENT LOGGED-IN USER
// ======================================================

export function getCurrentUser() {

  try {
    return JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY)
    );

  } catch (error) {
    console.error('Error retrieving current user:', error);
    return null;
  }
}


// ======================================================
// 7. LOGOUT STUDENT
// ======================================================

export function logoutUser() {

  localStorage.removeItem(CURRENT_USER_KEY);

}
