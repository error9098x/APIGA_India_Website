// Hero title morph: "APIGA INDIA 2027" <-> "Asia Pacific Internet Governance Academy".
//
// Both states are laid out once, as stacked layers with fixed lines (see the
// HERO TITLE MORPH section in css/style.css). This script only animates
// transform and opacity, so the browser never reflows the title:
//
//   1. FLIP: measure each capital A P I G A in the short layer and in the long
//      layer, then translate the long layer's capitals from the short
//      positions to their own (power3.inOut, 0.8s).
//   2. The lowercase part of each word fades in with a small rise once the
//      capitals are 60% of the way there, staggered 40ms per word.
//   3. "INDIA" and "2027" fade out as whole words.
//
// Every animation is padded with endDelay to the same total length, so
// playing the set backwards is an exact mirror of playing it forwards and
// lands on the static short layout pixel for pixel.
(function () {
    const root = document.querySelector('.hero-morph .morph');
    if (!root || !root.animate) return;

    const shortCaps = Array.from(root.querySelectorAll('.morph-short .cap'));
    const longCaps = Array.from(root.querySelectorAll('.morph-long .cap'));
    const tails = Array.from(root.querySelectorAll('.morph-long .lc'));
    const fadeWords = Array.from(root.querySelectorAll('.morph-short .fade-word'));
    const shortLayer = root.querySelector('.morph-short');
    const longLayer = root.querySelector('.morph-long');

    const CAP_MS = 800;
    const TAIL_START = CAP_MS * 0.6;
    const TAIL_MS = 380;
    const STAGGER = 40;
    const FADE_MS = 320;
    const CROSSFADE_MS = 600;
    const HOLD_SHORT = 4000;
    const HOLD_LONG = 4500;

    const POWER3_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
    const POWER2_OUT = 'cubic-bezier(0.33, 1, 0.68, 1)';
    const POWER2_IN = 'cubic-bezier(0.32, 0, 0.67, 0)';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let anims = [];
    let total = 0;
    let state = 'short';  // state currently shown (or being left)
    let target = null;    // state being animated towards, if any
    let staleLayout = false;

    function timing(delay, duration, easing) {
        return { delay, duration, endDelay: total - delay - duration, easing, fill: 'both' };
    }

    function build() {
        anims.forEach(a => a.cancel());
        anims = [];

        if (reduceMotion.matches) {
            root.classList.remove('is-ready');
            root.classList.add('is-crossfade');
            total = CROSSFADE_MS;
            anims.push(shortLayer.animate([{ opacity: 1 }, { opacity: 0 }], timing(0, CROSSFADE_MS, 'ease-in-out')));
            anims.push(longLayer.animate([{ opacity: 0 }, { opacity: 1 }], timing(0, CROSSFADE_MS, 'ease-in-out')));
        } else {
            root.classList.remove('is-crossfade');
            total = Math.max(CAP_MS, TAIL_START + STAGGER * (tails.length - 1) + TAIL_MS);

            // Measure with no transforms applied (all animations were just cancelled).
            longCaps.forEach((cap, i) => {
                const from = shortCaps[i].getBoundingClientRect();
                const to = cap.getBoundingClientRect();
                const dx = from.left - to.left;
                const dy = from.top - to.top;
                anims.push(cap.animate(
                    [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
                    timing(0, CAP_MS, POWER3_IN_OUT)
                ));
            });

            tails.forEach((tail, i) => {
                anims.push(tail.animate(
                    [{ opacity: 0, transform: 'translateY(0.25em)' }, { opacity: 1, transform: 'translateY(0)' }],
                    timing(TAIL_START + i * STAGGER, TAIL_MS, POWER2_OUT)
                ));
            });

            fadeWords.forEach(word => {
                anims.push(word.animate([{ opacity: 1 }, { opacity: 0 }], timing(0, FADE_MS, POWER2_IN)));
            });

            // Long capitals now sit exactly on the short ones, so hand over.
            root.classList.add('is-ready');
        }

        // Rest on the state we are in, or snap to where an interrupted morph was heading.
        const restOn = target || state;
        anims.forEach(a => {
            a.pause();
            a.currentTime = restOn === 'long' ? total : 0;
        });
    }

    function animateTo(next) {
        target = next;
        const rate = next === 'long' ? 1 : -1;
        anims.forEach(a => {
            a.playbackRate = rate;
            a.play();
        });
        return Promise.all(anims.map(a => a.finished));
    }

    // A hold that only counts time while the tab is visible.
    function hold(ms) {
        return new Promise(resolve => {
            let left = ms;
            let last = performance.now();
            const tick = () => {
                const now = performance.now();
                if (!document.hidden) left -= now - last;
                last = now;
                if (left <= 0) resolve();
                else setTimeout(tick, Math.min(left, 250));
            };
            setTimeout(tick, Math.min(left, 250));
        });
    }

    async function loop() {
        for (;;) {
            await hold(state === 'short' ? HOLD_SHORT : HOLD_LONG);
            const next = state === 'short' ? 'long' : 'short';
            try {
                await animateTo(next);
            } catch (e) {
                // Rebuilt mid-morph (resize / font swap); build() already snapped to `next`.
            }
            state = next;
            target = null;
            if (staleLayout) {
                staleLayout = false;
                build();
            }
        }
    }

    // Pause a running morph while the tab is hidden; hold() pauses itself.
    document.addEventListener('visibilitychange', () => {
        if (!target) return;
        anims.forEach(a => (document.hidden ? a.pause() : a.play()));
    });

    let lastWidth = window.innerWidth;
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (window.innerWidth === lastWidth) return; // ignore mobile URL-bar height changes
        lastWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 150);
    });

    reduceMotion.addEventListener('change', build);

    // Measure only once the real font is in, otherwise positions are wrong.
    const fontsReady = document.fonts && document.fonts.ready
        ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 3000))])
        : Promise.resolve();

    fontsReady.then(() => {
        build();
        loop();
        // A late font (e.g. the icon font) can shift metrics: re-measure, but never mid-morph.
        if (document.fonts) {
            document.fonts.addEventListener('loadingdone', () => {
                if (target) staleLayout = true;
                else build();
            });
        }
    });
})();
