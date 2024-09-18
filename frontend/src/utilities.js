function setCookie(name, value, expiresIn = 86400) {
  let expires = "";
  if (expiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000); // expiresIn is in seconds
    expires = `expires=${date.toUTCString()};`;
  }
  document.cookie = `${name}=${value};${expires}path=/;secure;SameSite=Strict`;
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null; // Cookie not found
}

function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Strict`;
}

export { setCookie, getCookie, removeCookie };
