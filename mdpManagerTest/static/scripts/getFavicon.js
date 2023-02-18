document.addEventListener("DOMContentLoaded", function () {
    const accounts = document.querySelectorAll('.account');
    
    accounts.forEach(account => {
        const accountName = account.querySelector('.img-logo').getAttribute('data-account-name');
        const faviconUrl = getFavicon(accountName);

        account.querySelector('.img-logo').src = faviconUrl;
    });
    
  });
  
  function getFavicon(accountName) {
      const baseUrl = 'https://www.google.com/s2/favicons?sz=64&domain_url=';
      const encodedName = encodeURIComponent(accountName);
      return `${baseUrl}${encodedName}`;
  }
