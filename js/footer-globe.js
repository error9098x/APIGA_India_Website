// Rotating dotted Earth drawn behind the footer. Loaded lazily by
// main_component.js once the footer scrolls near view.
//
// LAND is derived from Natural Earth 1:110m land (world-atlas@2.0.2): rows of
// latitude "lat:dotsInRow:runs", where runs are base36 run lengths alternating
// ocean/land, starting with ocean.
(function () {
    const LAND = '-87:9:0,9|-85:16:0,g|-83:22:0,m|-81:28:0,s|-79:34:0,y|-77:40:0,14|-75:47:0,1b|-73:53:0,1h|-71:59:i,1,b,r,2|-69:65:k,1,h,1,1,5,2,e,4|-67:70:19,1,8,4,1,4,7|-65:76:24|-63:82:2a|-61:87:2f|-59:93:2l|-57:98:2q|-55:103:v,2,1y|-53:108:w,1,23|-51:113:x,2,26|-49:118:y,3,29|-47:123:10,3,2c|-45:127:11,3,2a,2,3|-43:132:13,3,25,1,9,1,2|-41:136:14,3,28,1,a,1,1|-39:140:15,5,2k,1,1|-37:144:17,6,27,4,c|-35:147:18,6,1z,1,7,6,c|-33:151:19,8,u,4,11,4,4,7,c|-31:154:1a,9,u,5,10,g,c|-29:157:1b,a,t,6,11,g,c|-27:160:1d,9,t,8,10,h,c|-25:163:1e,a,s,9,4,2,u,i,c|-23:166:1f,c,r,9,4,2,u,i,d|-21:168:1f,e,p,a,4,3,v,g,e|-19:170:1g,e,p,b,4,2,y,c,g|-17:172:1g,f,p,d,2,3,z,7,1,3,g|-15:174:1e,i,p,e,3,1,10,5,3,2,h|-13:175:1e,j,p,d,4,1,13,3,2,1,i|-11:177:1e,k,p,d,1e,1,i|-9:178:1e,m,n,e,1e,1,1,2,f|-7:179:1e,m,o,d,x,4,c,5,4,1,b|-5:179:1d,m,o,e,w,1,8,1,7,4,h|-3:180:1e,k,p,f,v,2,2,3,1,2,3,1,1,1,1,3,j|-1:180:1e,h,r,h,t,2,3,4,6,2,n|1:180:1e,f,u,h,r,2,4,4,1,1,t|3:180:1f,e,u,i,q,1,1,1,4,3,v|5:179:1f,c,m,2,1,1,3,m,n,1,1,2,6,2,u|7:179:1f,9,o,u,f,1,9,1,b,1,r|9:178:1d,a,n,w,d,1,1e|11:177:1a,1,5,3,q,t,2,2,c,2,b,3,6,1,s|13:175:19,2,w,t,1,1,e,3,8,1,1,4,5,2,r|15:174:16,5,w,s,1,3,c,3,8,6,5,1,s|17:172:12,6,y,r,1,6,9,4,6,6,7,1,r|19:170:b,1,o,4,2,2,7,1,p,q,1,8,7,6,4,6,1,1,x|21:168:z,4,3,1,4,2,r,p,1,9,7,7,2,7,1,1,w|23:166:y,4,7,1,t,o,2,9,5,m,1,1,r|25:163:w,5,12,m,1,7,1,1,5,n,1,1,q|27:160:t,1,1,6,6,1,u,l,1,6,2,t,r|29:157:u,7,5,1,v,q,1,v,p|31:154:r,1,1,d,v,b,2,3,1,13,p|33:151:q,g,u,9,9,10,4,1,k|35:147:o,i,t,7,a,y,3,1,1,4,g|37:144:n,i,r,3,3,2,7,9,2,r,2,1,3,1,g|39:140:m,j,p,4,6,1,1,1,1,9,2,p,3,1,4,1,f|41:136:l,k,o,3,3,1,1,5,1,3,1,4,2,s,j|43:132:k,k,n,4,3,1,1,4,5,2,2,t,3,2,d|45:127:k,k,1,1,l,5,1,5,1,1,1,3,2,u,f|47:123:j,i,1,1,3,1,i,d,1,y,e|49:118:j,j,2,1,h,1b,d|51:113:g,m,h,1b,b|53:108:f,e,1,7,e,1,1,1,1,16,4,1,6|55:103:e,e,1,6,e,2,6,x,6,2,5|57:98:d,c,3,4,f,1,3,2,2,w,5,1,5|59:93:5,2,4,b,4,4,i,3,2,u,5,1,4|61:87:4,h,4,2,5,1,c,3,1,w,2,2,2|63:82:3,h,5,1,3,2,c,2,1,10|65:76:0,1,1,12,2,1,2,1,u|67:70:1,11,5,1,q|69:65:3,x,3,6,k|71:59:a,2,3,3,3,5,c,1,1,1,1,h|73:53:8,2,2,3,3,5,b,1,3,7,8|75:47:9,4,3,5,e,3,3,1,5|77:40:9,2,1,6,d,1,8|79:34:8,2,1,4,3,1,f|81:28:7,6,8,1,6|83:22:6,1,1,2,c';

    // Decode into unit-sphere points once.
    const points = [];
    LAND.split('|').forEach(row => {
        const [latStr, countStr, runStr] = row.split(':');
        const lat = parseFloat(latStr) * Math.PI / 180;
        const count = parseInt(countStr, 10);
        let k = 0;
        let land = false;
        runStr.split(',').forEach(r => {
            const n = parseInt(r, 36);
            if (land) {
                for (let i = 0; i < n; i++) {
                    const lon = (-180 + (k + i + 0.5) * 360 / count) * Math.PI / 180;
                    points.push([Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)]);
                }
            }
            k += n;
            land = !land;
        });
    });

    function mount(canvas) {
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const tilt = -0.32; // radians; tips the north pole towards the viewer
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        // Start with India (about 78°E) facing the viewer.
        let spin = -78 * Math.PI / 180;
        let size = 0;
        let dpr = 1;
        let running = false;
        let visible = false;
        let last = 0;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            size = canvas.clientWidth;
            canvas.width = Math.round(size * dpr);
            canvas.height = Math.round(size * dpr);
        }

        function draw() {
            const w = canvas.width;
            const r = w * 0.46;
            const c = w / 2;
            ctx.clearRect(0, 0, w, w);

            // Faint sphere body and rim so the globe reads even over oceans.
            const body = ctx.createRadialGradient(c - r * 0.3, c - r * 0.35, r * 0.1, c, c, r);
            body.addColorStop(0, 'rgba(36, 99, 235, 0.10)');
            body.addColorStop(1, 'rgba(36, 99, 235, 0.02)');
            ctx.fillStyle = body;
            ctx.beginPath();
            ctx.arc(c, c, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(36, 99, 235, 0.18)';
            ctx.lineWidth = dpr;
            ctx.stroke();

            const cosS = Math.cos(spin);
            const sinS = Math.sin(spin);
            const dot = Math.max(1.2 * dpr, w / 230);

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                // Spin around the polar axis, then tilt towards the viewer.
                const x = p[0] * cosS + p[2] * sinS;
                const z0 = -p[0] * sinS + p[2] * cosS;
                const y = p[1] * cosT - z0 * sinT;
                const z = p[1] * sinT + z0 * cosT;
                if (z < -0.05) continue; // far side

                const depth = Math.max(0, z);
                const s = dot * (0.55 + 0.45 * depth);
                ctx.fillStyle = 'rgba(29, 78, 216, ' + (0.18 + 0.62 * depth).toFixed(3) + ')';
                ctx.fillRect(c + x * r - s / 2, c - y * r - s / 2, s, s);
            }
        }

        function frame(t) {
            if (!running) return;
            const dt = last ? Math.min(t - last, 64) : 16;
            last = t;
            spin += dt * 0.00012; // about one turn every 52 seconds
            draw();
            requestAnimationFrame(frame);
        }

        function update() {
            const shouldRun = visible && !document.hidden && !reduceMotion;
            if (shouldRun && !running) {
                running = true;
                last = 0;
                requestAnimationFrame(frame);
            } else if (!shouldRun) {
                running = false;
            }
        }

        resize();
        draw();

        new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            update();
        }).observe(canvas);
        document.addEventListener('visibilitychange', update);
        window.addEventListener('resize', () => { resize(); draw(); });
    }

    document.querySelectorAll('canvas[data-dotted-globe]').forEach(mount);
})();
