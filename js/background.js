/**
 * ADRS Background Engine - Bespoke "Clinical Pastoral" Visual System
 * Implements full-viewport interactive background with stacked canvas & SVG layers,
 * scene crossfading, cursor parallax, and reactive particle physics.
 */

(function () {
  'use strict';

  class ADRSBackgroundEngine {
    constructor() {
      this.canvas = document.getElementById('bg-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      
      this.activeSceneKey = 'dawn';
      this.prevSceneKey = null;
      this.transitionProgress = 1; // 0 to 1
      this.transitionDuration = 800; // ms
      this.lastTransitionTime = 0;

      this.isMotionEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.isTabActive = true;

      // Cursor & Parallax State
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.ripples = [];

      // Dynamic Node Particle Array
      this.particles = [];
      this.maxParticles = window.innerWidth < 768 ? 24 : 75;

      // Broken / Reconnected Links Metaphor (Gap vs Solution)
      this.linkIntegrity = 1.0; // 0.0 = broken/fractured (alert), 1.0 = unified mesh (connect)

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });
      
      // Track pointer for desktop parallax
      if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
          if (!this.isMotionEnabled) return;
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          this.pointer.targetX = (e.clientX - cx) / cx; // -1 to 1
          this.pointer.targetY = (e.clientY - cy) / cy; // -1 to 1
        }, { passive: true });
      }

      // Tab visibility pause
      document.addEventListener('visibilitychange', () => {
        this.isTabActive = !document.hidden;
      });

      // Spawn initial particles
      this.initParticles();

      // Start render loop
      this.lastFrameTime = performance.now();
      requestAnimationFrame((t) => this.render(t));
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.maxParticles = this.width < 768 ? 24 : 75;
      this.initParticles();
    }

    initParticles() {
      this.particles = [];
      const count = Math.min(this.maxParticles, (CONFIG.SCENES[this.activeSceneKey]?.particles.count || 60));
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 1.5 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
          depth: 0.2 + Math.random() * 0.8
        });
      }
    }

    setScene(newSceneKey) {
      if (newSceneKey === this.activeSceneKey || !CONFIG.SCENES[newSceneKey]) return;
      this.prevSceneKey = this.activeSceneKey;
      this.activeSceneKey = newSceneKey;
      this.transitionProgress = 0;
      this.lastTransitionTime = performance.now();

      // Trigger broken-to-connected metaphor based on scene
      if (newSceneKey === 'alert') {
        this.linkIntegrity = 0.15; // fractured
      } else if (newSceneKey === 'connect') {
        this.linkIntegrity = 1.0; // connected mesh
      }

      // Update document root accent color
      const scene = CONFIG.SCENES[newSceneKey];
      if (scene && scene.accent) {
        document.documentElement.style.setProperty('--scene-accent', scene.accent);
      }
    }

    setLinkIntegrity(val) {
      this.linkIntegrity = Math.max(0, Math.min(1, val));
    }

    triggerRipple(x, y, color = null) {
      if (!this.isMotionEnabled) return;
      const rippleColor = color || CONFIG.SCENES[this.activeSceneKey].accent;
      this.ripples.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        radius: 5,
        maxRadius: Math.max(this.width, this.height) * 0.45,
        opacity: 0.65,
        color: rippleColor
      });
    }

    toggleMotion(enabled) {
      this.isMotionEnabled = enabled;
      if (!enabled) {
        this.pointer.x = 0;
        this.pointer.y = 0;
      }
    }

    update(dt) {
      // Smooth lerp for parallax pointer
      this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.05;
      this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.05;

      // Handle scene crossfade progress
      if (this.transitionProgress < 1) {
        const elapsed = performance.now() - this.lastTransitionTime;
        this.transitionProgress = Math.min(1, elapsed / this.transitionDuration);
      }

      // Update particles
      const scene = CONFIG.SCENES[this.activeSceneKey];
      const speedMult = (scene.particles.speed || 0.3) * (this.isMotionEnabled ? 1 : 0);

      for (let p of this.particles) {
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;
        p.pulse += 0.02;

        // Wrap around boundaries
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
      }

      // Update ripples
      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const r = this.ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.06 + 2.5;
        r.opacity *= 0.94;
        if (r.opacity < 0.02 || r.radius >= r.maxRadius * 0.98) {
          this.ripples.splice(i, 1);
        }
      }
    }

    render(time) {
      if (!this.isTabActive) {
        requestAnimationFrame((t) => this.render(t));
        return;
      }

      const dt = Math.min(32, time - (this.lastFrameTime || time));
      this.lastFrameTime = time;

      this.update(dt);

      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      // Layer 1: Base Gradient
      this.renderBaseGradient(ctx);

      // Layer 2: Abstract Topographic & Blueprint Art
      this.renderSceneArt(ctx, time);

      // Layer 3: Particles & Proximity Lines
      this.renderParticlesAndLinks(ctx);

      // Layer 4: Interactive Ripples
      this.renderRipples(ctx);

      requestAnimationFrame((t) => this.render(t));
    }

    renderBaseGradient(ctx) {
      const activeScene = CONFIG.SCENES[this.activeSceneKey];
      const prevScene = this.prevSceneKey ? CONFIG.SCENES[this.prevSceneKey] : null;

      // Draw active scene background
      ctx.save();
      if (this.transitionProgress < 1 && prevScene) {
        // Crossfade between backgrounds
        ctx.fillStyle = this.createGradientFromScene(ctx, prevScene);
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalAlpha = this.transitionProgress;
        ctx.fillStyle = this.createGradientFromScene(ctx, activeScene);
        ctx.fillRect(0, 0, this.width, this.height);
      } else {
        ctx.fillStyle = this.createGradientFromScene(ctx, activeScene);
        ctx.fillRect(0, 0, this.width, this.height);
      }
      ctx.restore();
    }

    createGradientFromScene(ctx, scene) {
      // Synthesize smooth radial/linear blend based on scene theme
      const px = this.width * 0.5 + this.pointer.x * 30;
      const py = this.height * 0.4 + this.pointer.y * 30;

      if (scene.name === 'paper' || scene.name === 'human') {
        // High-legibility light paper gradient
        const grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#FAF7EE');
        grad.addColorStop(0.5, '#F3ECE0');
        grad.addColorStop(1, '#E9DEC9');
        return grad;
      } else if (scene.name === 'alert') {
        const grad = ctx.createRadialGradient(px, py, 40, px, py, this.width * 0.9);
        grad.addColorStop(0, '#271715');
        grad.addColorStop(0.5, '#17221C');
        grad.addColorStop(1, '#0B1712');
        return grad;
      } else if (scene.name === 'data') {
        const grad = ctx.createRadialGradient(px, py, 60, px, py, this.width * 0.85);
        grad.addColorStop(0, '#0F3025');
        grad.addColorStop(0.6, '#081712');
        grad.addColorStop(1, '#040C08');
        return grad;
      } else {
        // Default Clinical Pastoral Forest Glow
        const grad = ctx.createRadialGradient(px, py, 80, px, py, this.width);
        grad.addColorStop(0, '#153C2D');
        grad.addColorStop(0.45, '#0E291E');
        grad.addColorStop(1, '#071510');
        return grad;
      }
    }

    renderSceneArt(ctx, time) {
      ctx.save();
      const scene = CONFIG.SCENES[this.activeSceneKey];
      const isPaper = (scene.name === 'paper' || scene.name === 'human');
      const strokeColor = isPaper ? 'rgba(74, 90, 82, 0.12)' : 'rgba(143, 181, 155, 0.08)';
      const accentStroke = isPaper ? 'rgba(47, 179, 163, 0.22)' : 'rgba(47, 179, 163, 0.18)';

      const offsetX = this.pointer.x * 20;
      const offsetY = this.pointer.y * 20;

      // 1. Topographic Elevation Contours
      if (scene.artMode === 'contours' || scene.artMode === 'timeline' || scene.artMode === 'data-bloom') {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        const waves = 5;
        for (let i = 0; i < waves; i++) {
          ctx.beginPath();
          const baseHeight = (this.height * 0.25) + i * 110;
          for (let x = 0; x <= this.width; x += 40) {
            const freq = 0.0025;
            const y = baseHeight + Math.sin(x * freq + (time * 0.0003) + i * 0.8) * 45 
                                 + Math.cos(x * 0.0015 - i) * 25 + offsetY;
            if (x === 0) ctx.moveTo(x + offsetX * 0.5, y);
            else ctx.lineTo(x + offsetX * 0.5, y);
          }
          ctx.stroke();
        }
      }

      // 2. Blueprint Engineering Grid (Methodology & Architecture)
      if (scene.artMode === 'blueprint') {
        ctx.strokeStyle = 'rgba(47, 179, 163, 0.07)';
        ctx.lineWidth = 0.75;
        const gridSize = 48;
        const startX = (offsetX * 0.3) % gridSize;
        const startY = (offsetY * 0.3) % gridSize;

        for (let x = startX; x < this.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, this.height);
          ctx.stroke();
        }
        for (let y = startY; y < this.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(this.width, y);
          ctx.stroke();
        }

        // Concentric Blueprint Target Radar in upper corner
        ctx.beginPath();
        ctx.arc(this.width * 0.82 + offsetX, this.height * 0.25 + offsetY, 140, 0, Math.PI * 2);
        ctx.arc(this.width * 0.82 + offsetX, this.height * 0.25 + offsetY, 70, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Stylized Abstract Sri Lanka Geographic Surveillance Mesh (Abstract Polygons)
      if (scene.artMode === 'contours' || scene.artMode === 'data-bloom' || scene.artMode === 'connected-mesh') {
        this.renderAbstractDistrictMesh(ctx, offsetX, offsetY, accentStroke);
      }

      ctx.restore();
    }

    renderAbstractDistrictMesh(ctx, offsetX, offsetY, color) {
      // Abstract geometric polygon representing Sri Lanka regional clusters (purely abstract, not exact farms)
      const cx = this.width * 0.85 + offsetX * 0.6;
      const cy = this.height * 0.5 + offsetY * 0.6;
      const scale = Math.min(this.width, this.height) * 0.28;

      const nodes = [
        { x: cx, y: cy - scale * 0.9, label: "North" },
        { x: cx - scale * 0.35, y: cy - scale * 0.3, label: "North-West" },
        { x: cx + scale * 0.4, y: cy - scale * 0.2, label: "North-East" },
        { x: cx - scale * 0.45, y: cy + scale * 0.2, label: "Western" },
        { x: cx, y: cy + scale * 0.1, label: "Central" },
        { x: cx + scale * 0.45, y: cy + scale * 0.35, label: "Eastern" },
        { x: cx - scale * 0.25, y: cy + scale * 0.75, label: "South" },
        { x: cx + scale * 0.2, y: cy + scale * 0.65, label: "Uva" }
      ];

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();

      // Connect nodes into abstract geospatial polygon
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < scale * 1.1) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
      }
      ctx.stroke();

      // Draw faint beacons on nodes
      for (let n of nodes) {
        ctx.fillStyle = 'rgba(47, 179, 163, 0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    renderParticlesAndLinks(ctx) {
      ctx.save();
      const scene = CONFIG.SCENES[this.activeSceneKey];
      const isPaper = (scene.name === 'paper' || scene.name === 'human');
      const maxConnectDist = this.width < 768 ? 95 : 145;

      // Draw proximity lines
      if (scene.particles.lines) {
        const canConnect = this.linkIntegrity > 0.3;
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const p1 = this.particles[i];
            const p2 = this.particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxConnectDist) {
              const alpha = (1 - dist / maxConnectDist) * 0.35 * this.linkIntegrity;
              
              if (scene.particles.lines === 'broken' && this.linkIntegrity < 0.5) {
                // Fractured dashed lines for Research Gap scene
                ctx.strokeStyle = `rgba(226, 109, 90, ${alpha * 1.4})`;
                ctx.setLineDash([4, 6]);
              } else {
                ctx.setLineDash([]);
                ctx.strokeStyle = isPaper 
                  ? `rgba(74, 90, 82, ${alpha * 0.7})` 
                  : (scene.accent === '#2FB3A3' 
                      ? `rgba(47, 179, 163, ${alpha})` 
                      : `rgba(233, 162, 59, ${alpha})`);
              }

              ctx.lineWidth = 0.85;
              ctx.beginPath();
              ctx.moveTo(p1.x + this.pointer.x * p1.depth * 15, p1.y + this.pointer.y * p1.depth * 15);
              ctx.lineTo(p2.x + this.pointer.x * p2.depth * 15, p2.y + this.pointer.y * p2.depth * 15);
              ctx.stroke();
            }
          }
        }
      }

      ctx.setLineDash([]);

      // Draw particle points
      for (let p of this.particles) {
        const px = p.x + this.pointer.x * p.depth * 15;
        const py = p.y + this.pointer.y * p.depth * 15;
        const rad = p.radius + Math.sin(p.pulse) * 0.6;

        ctx.fillStyle = scene.particles.color || 'rgba(47, 179, 163, 0.6)';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.8, rad), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    renderRipples(ctx) {
      if (this.ripples.length === 0) return;
      ctx.save();
      for (let r of this.ripples) {
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.opacity;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // Export globally
  window.addEventListener('DOMContentLoaded', () => {
    window.ADRS_BG = new ADRSBackgroundEngine();
  });
})();
