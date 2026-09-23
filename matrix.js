// ============================================
// Matrix Rain Effect - Hero Background
// ============================================

(function () {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters used in the matrix rain (Katakana + digits + symbols)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789@#$%&*';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Color palette for the rain
    const colors = [
        '#00f5ff', // cyan
        '#39ff14', // green
        '#0088cc', // darker cyan
        '#7c3aed', // purple
        '#00d4aa', // teal
    ];

    // Reduce number of columns on mobile
    function getMaxColumns() {
        if (window.innerWidth < 480) return Math.floor(columns * 0.4);
        if (window.innerWidth < 768) return Math.floor(columns * 0.6);
        return columns;
    }

    function draw() {
        // Semi-transparent black overlay for trail effect
        ctx.fillStyle = 'rgba(10, 14, 23, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const maxCols = getMaxColumns();
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < maxCols; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Random color from palette for bright characters
            const color = colors[Math.floor(Math.random() * colors.length)];
            const brightness = Math.random();

            if (brightness > 0.95) {
                // Bright head character
                ctx.fillStyle = '#fff';
                ctx.shadowColor = color;
                ctx.shadowBlur = 15;
            } else if (brightness > 0.8) {
                // Bright trail
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
            } else {
                // Normal trail
                ctx.fillStyle = `rgba(0, ${100 + Math.floor(Math.random() * 100)}, ${100 + Math.floor(Math.random() * 100)}, ${0.3 + Math.random() * 0.4})`;
                ctx.shadowBlur = 0;
            }

            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;

            // Reset drop when it reaches bottom or randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Adjust columns on resize
    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        const diff = getMaxColumns() - drops.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) drops.push(Math.random() * -100);
        } else if (diff < 0) {
            drops = drops.slice(0, getMaxColumns());
        }
    });

    // Animation loop
    const fps = 25;
    const interval = 1000 / fps;
    let lastTime = Date.now();

    function animate() {
        const now = Date.now();
        if (now - lastTime >= interval) {
            draw();
            lastTime = now;
        }
        requestAnimationFrame(animate);
    }

    // Initial clear
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();
})();