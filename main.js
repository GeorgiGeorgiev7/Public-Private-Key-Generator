import PrivateKey from './crypto/Key/PrivateKey.js';
import PublicKey from './crypto/Key/PublicKey.js';

const privateKeyElement = document.getElementById('privateKey');
const publicKeyElement = document.getElementById('publicKey');

document.getElementById('generate').addEventListener('click', async () => {
    const privateKey = new PrivateKey();
    const publicKey = new PublicKey(privateKey.toDec());
    const mnemonic = await privateKey.getMnemonic();
    privateKeyElement.textContent = mnemonic.join(' ');
    privateKeyElement.style.display = 'block';
    publicKeyElement.textContent = publicKey.toAddress();
    publicKeyElement.style.display = 'block';
    document.getElementById('copyBtn').style.display = 'block';
});

document.getElementById('copyBtn').addEventListener('click', (e) => {
    const copiedToClipboardMessageElement = document.getElementById('copiedToClipboardMessage');
    if (copiedToClipboardMessageElement.style.display === '') {
        saveToClipBoard(privateKeyElement.textContent + ' ' + publicKeyElement.textContent);
        copiedToClipboardMessageElement.style.display = 'block';
        setTimeout(() => {
            copiedToClipboardMessageElement.style.display = '';
        }, 1000);
    }
});

function saveToClipBoard(text) {
    navigator.clipboard.writeText(text);
}