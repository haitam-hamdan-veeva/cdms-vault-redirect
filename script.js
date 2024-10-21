// ==UserScript==
// @name         CDMS Vault Redirect
// @namespace    http://tampermonkey.net/
// @version      2024-10-16
// @description  Shortcut to access CDMS redirect Vaults
// @author       Haitam Hamdan
// @match        https://*.veevavault.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=veevavault.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const SWITCH_VAULT_PATH = 'veevaHome/switchVault/';
  const VMC_REDIRECT_URL = 'https://vmc.veevavault.com/vmc/vault/find/';

  function interceptXHRRequests() {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      const requestURL = new URL(url, window.location.origin).href;

      if (requestURL.includes(SWITCH_VAULT_PATH)) {
        const cdmsRedirectDialog = document.querySelector('.vv-cdm-dialog.cdm-redirectdialog');
        if (cdmsRedirectDialog) {
          const redirectVaultId = requestURL.split('/').pop();

          alert(`[CDMS Vault Redirect]: Opening target Vault ${redirectVaultId}. Click OK to continue.`);

          window.location.replace(`${VMC_REDIRECT_URL}${redirectVaultId}`);
        } else {
          console.log('[CDMS Vault Redirect]: No CDMS redirect dialog found. Redirect skipped.');
        }
      }

      return originalOpen.apply(this, arguments);
    };
  }

  interceptXHRRequests();
})();
