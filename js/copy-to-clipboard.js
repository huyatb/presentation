async function writeClipboardText(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error(error.message);
    }
}
function addCopyButtonToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre.highlight');

    codeBlocks.forEach(function (codeBlock) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy';
        copyButton.type = 'button';
        copyButton.ariaLabel = 'Copy code to clipboard';
        copyButton.innerText = 'Copy';

        codeBlock.append(copyButton);

        copyButton.addEventListener('click',  async function () {
            const code = codeBlock.querySelector('code').innerText.trim();
            await writeClipboardText(code);
            copyButton.innerText = 'Copied';
            const fourSeconds = 4000;

            setTimeout(function () {
                copyButton.innerText = 'Copy';
            }, fourSeconds);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addCopyButtonToCodeBlocks();
});