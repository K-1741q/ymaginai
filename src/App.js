import { useState, useEffect, useRef } from "react";

const EDUCATION = [
  { field: "Pielęgniarstwo", degree: "Magister", year: "2008" },
  { field: "Przygotowanie Pedagogiczne", degree: "Studia podyplomowe", year: "2010" },
  { field: "Zarządzanie BHP", degree: "Studia podyplomowe", year: "2012" },
  { field: "Zarządzanie Ochroną Zdrowia", degree: "Studia podyplomowe", year: "2014" },
  { field: "Master of Business Administration", degree: "MBA", year: "2016" },
  { field: "Dietetyka i Planowanie Żywienia", degree: "Studia podyplomowe", year: "2018" },
  { field: "Trener Rozwoju Osobistego z Psychodietetyką", degree: "Studia podyplomowe", year: "2020" },
  { field: "Social Media & Content Marketing", degree: "Studia podyplomowe", year: "2022" },
];

const RADAR_AXES = [
  { label: "Strategia", angle: 0 },
  { label: "Operacje", angle: 60 },
  { label: "Dane & ROI", angle: 120 },
  { label: "Rynek", angle: 180 },
  { label: "Procesy", angle: 240 },
  { label: "Człowiek", angle: 300 },
];

const SERVICES = [
  {
    tier: "Start",
    price: "1 500 zł",
    sub: "299 zł / mies.",
    tag: "Do 5 pracowników",
    response: "Odpowiedź do 72h",
    features: ["Analiza procesów biznesowych", "1 moduł systemowy", "Wdrożenie + konfiguracja", "Opieka subskrypcyjna"],
    highlight: false,
  },
  {
    tier: "Scale",
    price: "3 500 zł",
    sub: "599 zł / mies.",
    tag: "5–20 pracowników",
    response: "Odpowiedź do 48h",
    features: ["Pogłębiona analiza ROI", "Do 3 modułów systemowych", "Wdrożenie + integracje", "Raport z rekomendacjami"],
    highlight: true,
  },
  {
    tier: "✦ Indywidualny",
    price: "?",
    sub: "? / mies.",
    tag: "Bez ograniczeń",
    response: "Odpowiedź do 24h",
    features: ["Wszystko z Scale", "Nieograniczona złożoność", "Strategia długoterminowa", "Wycena indywidualna"],
    note: "Cena zależy od tego ile możesz zaoszczędzić.",
    highlight: false,
  },
];

const DEMOS = [
  { name: "Salon Beauty", desc: "System rezerwacji dla salonów kosmetycznych", emoji: "💜" },
  { name: "Spa & Wellness", desc: "Platforma dla centrów wellness", emoji: "🌿" },
  { name: "Pet Grooming", desc: "System dla salonów pielęgnacji zwierząt", emoji: "🐾" },
];

function AnimatedDots() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${d.opacity})`;
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i+1).forEach(b => {
        const dist = Math.hypot(a.x-b.x, a.y-b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(168,85,247,${0.08*(1-dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }} />;
}

const EDU_COLORS = ["#e84393","#f97316","#eab308","#22c55e","#06b6d4","#6366f1","#a855f7","#ec4899"];
const EDU_ICONS = ["🏥","📚","⚠️","🏛️","💼","🥗","🧠","📱"];

// Balloon positions: x from center (250), y from top
const BALLOONS = [
  { x: 80,  y: 60,  r: 58 },  // 0 - far left low
  { x: 155, y: 30,  r: 52 },  // 1 - left mid
  { x: 100, y: 155, r: 48 },  // 2 - left low
  { x: 195, y: 110, r: 44 },  // 3 - center left
  { x: 310, y: 110, r: 44 },  // 4 - center right
  { x: 355, y: 30,  r: 52 },  // 5 - right mid
  { x: 400, y: 155, r: 48 },  // 6 - right low
  { x: 420, y: 60,  r: 58 },  // 7 - far right low
];

const TRUNK_CX = 250;

function EducationWheel() {
  const [hovered, setHovered] = useState(null);

  // Stem base Y (bottom of balloon circle)
  const stemBase = (b) => b.y + b.r;
  // Trunk join Y for each balloon
  const trunkJoin = (b) => Math.min(280, stemBase(b) + 40 + Math.abs(b.x - TRUNK_CX) * 0.3);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
      <svg width={500} height={420} style={{ overflow:"visible" }}>
        <defs>
          {EDU_COLORS.map((c, i) => (
            <radialGradient key={i} id={`grad${i}`} cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor={c} stopOpacity="1" />
            </radialGradient>
          ))}
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Trunk */}
        <rect x={TRUNK_CX - 6} y={240} width={12} height={140} rx={6}
          fill="url(#trunkGrad)" />

        {/* Roots */}
        {[-60,-35,-10,10,35,60].map((dx,i) => (
          <path key={i}
            d={`M ${TRUNK_CX} 370 Q ${TRUNK_CX + dx*0.6} 385 ${TRUNK_CX + dx} 395`}
            fill="none" stroke="#4c1d95" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round" />
        ))}

        {/* Ground label */}
        <text x={TRUNK_CX} y={412} textAnchor="middle" fill="#6366f1" fontSize="11"
          fontFamily="Palatino Linotype, serif" letterSpacing="3" opacity="0.6">WIEDZA</text>

        {/* Stems from trunk to balloons */}
        {BALLOONS.map((b, i) => {
          const bx = b.x;
          const by = stemBase(b);
          const tj = trunkJoin(b);
          const isHov = hovered === i;
          return (
            <path key={i}
              d={`M ${TRUNK_CX} ${tj} Q ${bx} ${tj} ${bx} ${by}`}
              fill="none"
              stroke={isHov ? EDU_COLORS[i] : "#c4b5fd"}
              strokeWidth={isHov ? 3 : 2}
              strokeOpacity={isHov ? 1 : 0.5}
              strokeLinecap="round"
              style={{ transition:"all 0.3s" }} />
          );
        })}

        {/* Balloons */}
        {BALLOONS.map((b, i) => {
          const isHov = hovered === i;
          const scale = isHov ? 1.12 : 1;
          return (
            <g key={i}
              style={{ cursor:"pointer", transformOrigin:`${b.x}px ${b.y}px`,
                transform:`scale(${scale})`, transition:"transform 0.25s ease" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>

              {/* Shadow */}
              <ellipse cx={b.x} cy={b.y + b.r + 6} rx={b.r * 0.7} ry={8}
                fill="#000000" opacity={isHov ? 0.12 : 0.06}
                style={{ transition:"all 0.25s" }} />

              {/* Main circle */}
              <circle cx={b.x} cy={b.y} r={b.r}
                fill={`url(#grad${i})`}
                stroke={isHov ? "#ffffff" : EDU_COLORS[i]}
                strokeWidth={isHov ? 3 : 1.5}
                strokeOpacity={isHov ? 0.9 : 0.6}
                style={{ transition:"all 0.25s", filter: isHov ? `drop-shadow(0 4px 16px ${EDU_COLORS[i]}88)` : "none" }} />

              {/* Shine */}
              <ellipse cx={b.x - b.r*0.25} cy={b.y - b.r*0.3} rx={b.r*0.22} ry={b.r*0.14}
                fill="#ffffff" opacity={0.35} transform={`rotate(-30, ${b.x - b.r*0.25}, ${b.y - b.r*0.3})`} />

              {/* Icon */}
              <text x={b.x} y={b.y - 10} textAnchor="middle" dominantBaseline="middle"
                fontSize={b.r * 0.55} style={{ userSelect:"none" }}>
                {EDU_ICONS[i]}
              </text>

              {/* Number */}
              <text x={b.x} y={b.y + b.r*0.38} textAnchor="middle" dominantBaseline="middle"
                fill="#ffffff" fontSize={b.r * 0.28} fontWeight="700" opacity="0.9"
                fontFamily="Palatino Linotype, serif">
                0{i+1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <div style={{ height:68, display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
        {hovered !== null ? (
          <div style={{ background:`linear-gradient(135deg, #1a0f2e, #0f0a1a)`,
            border:`2px solid ${EDU_COLORS[hovered]}`,
            borderRadius:14, padding:"12px 28px", textAlign:"center", maxWidth:360,
            boxShadow:`0 4px 24px ${EDU_COLORS[hovered]}44` }}>
            <div style={{ fontSize:11, color:EDU_COLORS[hovered], textTransform:"uppercase",
              letterSpacing:2, marginBottom:5, fontFamily:"Palatino Linotype, serif" }}>
              {EDUCATION[hovered].degree}
            </div>
            <div style={{ fontSize:16, color:"#ffffff", fontWeight:700,
              fontFamily:"Palatino Linotype, serif" }}>
              {EDUCATION[hovered].field}
            </div>
          </div>
        ) : (
          <div style={{ fontSize:13, color:"#555", fontStyle:"italic",
            fontFamily:"Palatino Linotype, serif" }}>
            Najedź na balon aby zobaczyć kierunek studiów
          </div>
        )}
      </div>
    </div>
  );
}

function RadarChart() {
  const [progress, setProgress] = useState(0);
  const [hoveredAxis, setHoveredAxis] = useState(null);
  const [pulse, setPulse] = useState(0);
  const animRef = useRef(null);
  const pulseRef = useRef(null);
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const dataValues = [0.9, 0.85, 0.95, 0.8, 0.92, 0.88];

  useEffect(() => {
    let start = null;
    const duration = 1800;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    let pulseStart = null;
    const pulseDuration = 1200;
    const animatePulse = (ts) => {
      if (!pulseStart) pulseStart = ts;
      const p = ((ts - pulseStart) % pulseDuration) / pulseDuration;
      setPulse(p);
      pulseRef.current = requestAnimationFrame(animatePulse);
    };
    pulseRef.current = requestAnimationFrame(animatePulse);

    return () => {
      cancelAnimationFrame(animRef.current);
      cancelAnimationFrame(pulseRef.current);
    };
  }, []);

  const toRad = deg => (deg - 90) * Math.PI / 180;
  const pt = (angle, radius) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });

  const animatedValues = dataValues.map(v => v * progress);
  const polygonPoints = RADAR_AXES.map((ax, i) => {
    const p = pt(ax.angle, animatedValues[i] * r);
    return `${p.x},${p.y}`;
  }).join(" ");

  const pulseR = 6 + Math.sin(pulse * Math.PI * 2) * 4;
  const pulseOpacity = 0.15 + Math.sin(pulse * Math.PI * 2) * 0.1;
  const pulseOuterR = 14 + Math.sin(pulse * Math.PI * 2) * 8;

  const descriptions = [
    "Długofalowe myślenie o celach i kierunku rozwoju firmy",
    "Efektywność procesów wewnętrznych i zarządzanie zasobami",
    "Analiza liczb, wskaźników i zwrotu z inwestycji",
    "Pozycja konkurencyjna i otoczenie biznesowe",
    "Mapowanie i optymalizacja przepływów pracy",
    "Motywacja, zachowania i potrzeby ludzi w organizacji",
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
      <svg width={size} height={size} style={{ overflow:"visible" }}>
        {levels.map((lv, li) => (
          <polygon key={li}
            points={RADAR_AXES.map(ax => { const p = pt(ax.angle, lv*r); return `${p.x},${p.y}`; }).join(" ")}
            fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="1" />
        ))}
        {RADAR_AXES.map((ax, i) => {
          const p = pt(ax.angle, r);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(168,85,247,0.2)" strokeWidth="1" />;
        })}
        <polygon points={polygonPoints} fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="2" />
        {RADAR_AXES.map((ax, i) => {
          const p = pt(ax.angle, animatedValues[i] * r);
          const isHov = hoveredAxis === i;
          return (
            <circle key={i} cx={p.x} cy={p.y} r={isHov ? 8 : 5}
              fill={isHov ? "#ff2a2a" : "#a855f7"}
              style={{ cursor:"pointer", transition:"r 0.2s" }}
              onMouseEnter={() => setHoveredAxis(i)}
              onMouseLeave={() => setHoveredAxis(null)} />
          );
        })}
        {RADAR_AXES.map((ax, i) => {
          const p = pt(ax.angle, r + 28);
          const isHov = hoveredAxis === i;
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
              fill={isHov ? "#ff2a2a" : "#ffffff"} fontSize="13" fontWeight={isHov ? "700" : "400"}
              fontFamily="Palatino Linotype, serif" style={{ cursor:"pointer" }}
              onMouseEnter={() => setHoveredAxis(i)}
              onMouseLeave={() => setHoveredAxis(null)}>
              {ax.label}
            </text>
          );
        })}
        {/* Pulsujący punkt w centrum */}
        <circle cx={cx} cy={cy} r={pulseOuterR} fill="rgba(255,42,42,0)" stroke={`rgba(255,42,42,${pulseOpacity})`} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={pulseR} fill="#ff2a2a" opacity={0.9} />
      </svg>
      {/* Tooltip o stałej wysokości żeby nie skakało */}
      <div style={{ height:70, display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
        {hoveredAxis !== null ? (
          <div style={{ background:"#1a0f2e", border:"2px solid #a855f7", borderRadius:12, padding:"12px 24px", textAlign:"center", maxWidth:320 }}>
            <div style={{ fontSize:14, color:"#a855f7", fontWeight:700, marginBottom:4 }}>{RADAR_AXES[hoveredAxis].label}</div>
            <div style={{ fontSize:13, color:"#ffffff", lineHeight:1.5 }}>{descriptions[hoveredAxis]}</div>
          </div>
        ) : (
          <div style={{ fontSize:13, color:"#666", fontStyle:"italic" }}>Najedź na punkt aby zobaczyć opis</div>
        )}
      </div>
    </div>
  );
}

export default function Ymaginai() {
  const [, setSection] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const scrollTo = (id) => {
    setSection(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div style={s.root}>
      <AnimatedDots />

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={s.navK}>K</span><span style={s.navDots}>..</span>
          <span style={s.navBar}>|</span>
          <span style={s.navBrand}>Ymaginai</span>
        </div>
        <div style={s.navLinks}>
          {["o-mnie","oferta","portfolio","dla-kogo","kontakt"].map(id => (
            <button key={id} style={s.navBtn} onClick={() => scrollTo(id)}>
              {id === "o-mnie" ? "O mnie" : id === "dla-kogo" ? "Dla kogo" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ ...s.hero, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 1.2s ease" }}>
        <div style={s.heroTag}>Strateg · Ekspert · Twórca procesów</div>
        <div style={s.heroLogo}>
          <span style={s.heroK}>K</span><span style={s.heroDots}>..</span>
          <span style={s.heroBar}>|</span>
          <span style={s.heroBrand}>Ymaginai</span>
        </div>
        <p style={s.heroSub}>
          Łączę ludzką intuicję z możliwościami AI.<br />
          Razem tworzymy coś czego wcześniej nie było.
        </p>
        <div style={s.heroY}>
          <div style={s.heroYTop}>
            <span style={s.heroYLetter}>Y</span>
            <span style={s.heroYDash}> – bo to </span>
            <span style={s.heroYTy}>Ty</span>
          </div>
          <div style={s.heroYMain}>jesteś częścią każdego procesu który tworzymy.</div>
          <div style={s.heroYSub}>Nie jesteś odbiorcą usługi. Jesteś współtwórcą rozwiązania.</div>
        </div>
        <button style={s.heroBtn} onClick={() => scrollTo("kontakt")}>
          Wypełnij formularz ✦
        </button>
        <div style={s.heroScroll}>↓</div>
      </section>

      {/* O MNIE - dark */}
      <section id="o-mnie" style={s.secDark}>
        <div style={s.secInner}>
          <SectionLabel text="O mnie" />
          <div style={s.aboutGrid}>
            <div style={s.aboutText}>
              <div style={s.aboutInitials}>K..</div>
              <p style={s.bodyText}>
                Jestem strategiem i ekspertem który łączy wiedzę z ośmiu dziedzin z możliwościami sztucznej inteligencji. Absolwentka <strong style={s.white}>MBA</strong> – do każdego problemu podchodzę interdyscyplinarnie, łącząc perspektywę biznesową, operacyjną i ludzką jednocześnie.
              </p>
              <p style={s.bodyText}>
                Nie piszę kodu. <strong style={s.white}>Buduję systemy</strong> które eliminują straty czasu i zwiększają przychody.
              </p>
              <p style={s.bodyText}>
                Pracuję <strong style={s.white}>wyłącznie asynchronicznie</strong> – bez spotkań, bez telefonów, bez zbędnego szumu.
                Tylko konkretne działania i mierzalne efekty.
              </p>
              <p style={{ ...s.bodyText, color: "#c084fc", fontStyle: "italic" }}>
                Formularze czytam raz na dwa tygodnie.<br />
                Kolejne czytanie już było. Fast Track dostępny dla niecierpliwych.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:13, color:"#a855f7", textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>8 kierunków studiów</div>
              <EducationWheel />
            </div>
          </div>
        </div>
      </section>

      {/* STRATEG - light */}
      <section style={s.secLight}>
        <div style={s.secInner}>
          <SectionLabel text="Jak patrzę na Twój problem" dark />
          <div style={s.radarWrap}>
            <div style={s.radarLeft}>
              <h3 style={s.radarTitle}>Strateg widzi więcej.</h3>
              <p style={s.radarText}>
                Gdy inni widzą problem – ja widzę system. Każde wyzwanie biznesowe oglądam z sześciu stron jednocześnie.
              </p>
              <p style={s.radarText}>
                Ktoś nazwie to <em>"czepianiem się szczegółów"</em>.<br />
                Ja nazywam to <strong>rozumieniem struktury problemu</strong>.
              </p>
              <p style={s.radarText}>
                Bo tylko gdy wiesz <em>skąd</em> pochodzi problem – możesz stworzyć rozwiązanie które naprawdę działa.
              </p>
            </div>
            <div style={s.radarRight}>
              <RadarChart />
              <div style={s.radarCaption}>Wielowymiarowa analiza problemu biznesowego</div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA - dark */}
      <section id="oferta" style={s.secDark}>
        <div style={s.secInner}>
          <SectionLabel text="Oferta" />
          <p style={s.introText}>
            Model subskrypcyjny. Płacisz raz za wdrożenie, potem miesięcznie za system który pracuje na Twój biznes.
            <br /><br />
            <em style={s.em}>Formularze czytam raz na dwa tygodnie. Kolejne czytanie już było. Fast Track dostępny dla niecierpliwych.</em>
          </p>
          <div style={s.cardsRow}>
            {SERVICES.map((srv, i) => (
              <div key={i} style={{ ...s.card, ...(srv.highlight ? s.cardHL : {}) }}>
                {srv.highlight && <div style={s.cardBadge}>Najpopularniejszy</div>}
                <div style={s.cardTier}>{srv.tier}</div>
                <div style={s.cardTag}>{srv.tag}</div>
                <div style={s.cardPrice}>{srv.price}</div>
                <div style={s.cardSub}>{srv.sub}</div>
                <div style={s.cardDiv} />
                {srv.features.map((f, j) => <div key={j} style={s.cardFeat}>✦ {f}</div>)}

                {srv.note && <div style={s.cardNote}>{srv.note}</div>}
                <button style={{ ...s.cardBtn, ...(srv.highlight ? s.cardBtnHL : {}) }}
                  onClick={() => scrollTo("kontakt")}>
                  Wyślij formularz
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO - light */}
      <section id="portfolio" style={s.secLight}>
        <div style={s.secInner}>
          <SectionLabel text="Portfolio" dark />
          <p style={{ ...s.introText, color: "#333333" }}>
            Przykładowe systemy rezerwacji dla branż usługowych.<br />
            Każdy projekt to analiza procesów + wdrożenie + opieka subskrypcyjna.
          </p>
          <div style={s.demoRow}>
            {DEMOS.map((d, i) => (
              <div key={i} style={s.demoCard}>
                <div style={s.demoEmoji}>{d.emoji}</div>
                <div style={s.demoName}>{d.name}</div>
                <div style={s.demoDesc}>{d.desc}</div>
                <button style={s.demoBtn}>Zobacz demo →</button>
              </div>
            ))}
          </div>
          <p style={s.portfolioNote}>
            Powyższe projekty to <strong style={{color:"#111"}}>prototypy demonstracyjne</strong> – każdy element jest w pełni dostosowywalny.<br />
            Kolory, nazwa, zabiegi, personel, ceny, struktura – wszystko tworzone pod indywidualne potrzeby klienta.<br />
            <em>Zakres możliwych wdrożeń jest znacznie szerszy – zależy od Twojej branży i procesów.</em>
          </p>
        </div>
      </section>

      {/* DLA KOGO - dark */}
      <section id="dla-kogo" style={s.secDark}>
        <div style={s.secInner}>
          <SectionLabel text="Czy to dla mnie?" />
          <div style={s.forGrid}>
            <div style={s.forCard}>
              <div style={s.forCardTitle}>✦ To jest dla Ciebie jeśli...</div>
              {["Rozumiesz że czas ma cenę i chcesz go odzyskać",
                "Jesteś firmą która chce rosnąć bez chaosu",
                "Szukasz systemu nie jednorazowej naprawy",
                "Rozumiesz różnicę między kosztem a inwestycją",
                "Potrafisz czekać na odpowiedź 48–72 godziny"].map((t, i) => (
                <div key={i} style={s.forItemYes}>{t}</div>
              ))}
            </div>
            <div style={s.forCard}>
              <div style={s.forCardTitleNo}>✗ To nie jest dla Ciebie jeśli...</div>
              {[
                ["Myślisz że Twoja firma jest za mała", "– mali rosną najszybciej. Mam dla Ciebie coś czego nie ma w cenniku."],
                ["Szukasz kogoś kto odbiera telefon o 18:00", "– to nie ja"],
                ["Chcesz efektów jutro", "– zamknij tę stronę"],
                ["Myślisz że to za drogie", "– policz ile kosztuje Cię jedna godzina Twojego czasu"],
              ].map(([t, sub], i) => (
                <div key={i} style={s.forItemNo}>{t}<br /><em style={s.forSub}>{sub}</em></div>
              ))}
            </div>
          </div>
          <div style={s.forBottom}>
            <span style={s.forBottomText}>Jeśli dotarłeś do tego miejsca – prawdopodobnie już wiesz.</span>
            <button style={s.forBtn} onClick={() => scrollTo("kontakt")}>Sprawdź ✦</button>
          </div>
        </div>
      </section>

      {/* KONTAKT - light */}
      <section id="kontakt" style={s.secLight}>
        <div style={s.secInner}>
          <SectionLabel text="Kontakt" dark />
          <div style={s.contactGrid}>
            <div style={s.contactLeft}>
              <h3 style={s.contactTitle}>Formularz to jedyna droga.</h3>
              <p style={s.contactText}>Nie ma adresu email. Nie ma numeru telefonu. Nie ma czatu.</p>
              <p style={s.contactText}>
                Jest formularz który zadaje właściwe pytania – i który pozwala mi ocenić
                czy jestem w stanie realnie pomóc Twojemu biznesowi.
              </p>
              <p style={{ ...s.contactText, fontWeight: 700, color: "#111" }}>
                Formularze czytam raz na dwa tygodnie.<br />
                <em style={{ color: "#7c3aed" }}>Kolejne czytanie już było. Fast Track dostępny dla niecierpliwych.</em>
              </p>
              <div style={s.contactInfo}>
                {["Potrzebny NIP firmy", "Tylko firmy (sektor prywatny i publiczny)"].map((t, i) => (
                  <div key={i} style={s.contactInfoItem}>✦ {t}</div>
                ))}
                <div style={{...s.contactInfoItem, color:"#ff2a2a", borderTop:"1px solid #2a1f4a", paddingTop:12, marginTop:4}}>
                  ⚡ Fast Track – priorytetowe rozpatrzenie w 24h. Zaznacz w formularzu. Wycena indywidualna.
                </div>
              </div>
            </div>
            <div>
              <div style={s.tallyCard}>
                <div style={s.tallyIcon}>✦</div>
                <div style={s.tallyTitle}>Formularz kwalifikacyjny</div>
                <div style={s.tallySub}>Analiza wstępna · ROI · Kwalifikacja</div>
                <button style={s.tallyBtn}>Otwórz formularz →</button>
                <div style={s.tallyNote}>
                  Formularz zawiera pytania o NIP, strukturę firmy, obecne procesy i oczekiwany ROI.
                  Wypełnienie zajmuje około 5 minut.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span style={s.footerK}>K</span><span style={s.footerDots}>..</span>
        <span style={s.footerSep}> | </span>
        <span style={s.footerBrand}>Ymaginai</span>
        <span style={s.footerCopy}> · {new Date().getFullYear()} · Wszelkie prawa zastrzeżone</span>
      </footer>
    </div>
  );
}

function SectionLabel({ text, dark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48, justifyContent: "center" }}>
      <span style={{ color: "#a855f7", fontSize: 20 }}>✦</span>
      <h2 style={{ fontSize: 38, fontWeight: 700, color: dark ? "#111111" : "#ffffff", margin: 0, letterSpacing: 1 }}>{text}</h2>
      <span style={{ color: "#a855f7", fontSize: 20 }}>✦</span>
    </div>
  );
}

const s = {
  root: { fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", background: "#080810", color: "#ffffff", overflowX: "hidden" },

  nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,16,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #2a1f4a", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  navLogo: { display: "flex", alignItems: "baseline", gap: 6, cursor: "pointer" },
  navK: { fontSize: 24, fontWeight: 700, color: "#ffffff" },
  navDots: { fontSize: 24, color: "#a855f7" },
  navBar: { fontSize: 20, color: "#3a2a5a", margin: "0 12px" },
  navBrand: { fontSize: 18, fontWeight: 700, color: "#ffffff", letterSpacing: 4, textTransform: "uppercase" },
  navLinks: { display: "flex", gap: 4 },
  navBtn: { background: "transparent", border: "none", color: "#cccccc", fontSize: 14, cursor: "pointer", padding: "8px 16px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" },

  hero: { position: "relative", zIndex: 1, textAlign: "center", padding: "120px 40px 100px", maxWidth: 900, margin: "0 auto" },
  heroTag: { fontSize: 14, color: "#cccccc", letterSpacing: 4, textTransform: "uppercase", marginBottom: 48 },
  heroLogo: { display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, marginBottom: 48 },
  heroK: { fontSize: 88, fontWeight: 700, color: "#ffffff", lineHeight: 1 },
  heroDots: { fontSize: 88, color: "#a855f7", lineHeight: 1 },
  heroBar: { fontSize: 64, color: "#3a2a5a", margin: "0 8px", lineHeight: 1 },
  heroBrand: { fontSize: 80, fontWeight: 700, color: "#ffffff", letterSpacing: 4, textTransform: "uppercase", lineHeight: 1 },
  heroSub: { fontSize: 22, color: "#ffffff", lineHeight: 1.9, marginBottom: 40 },
  heroY: { background: "#1a0f2e", border: "1px solid #ff2a2a", borderRadius: 16, padding: "28px 40px", marginBottom: 48, display: "inline-block", textAlign: "center" },
  heroYTop: { display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 8 },
  heroYLetter: { fontSize: 72, fontWeight: 700, color: "#ff2a2a", lineHeight: 1, textShadow: "0 0 30px rgba(255,42,42,0.5)" },
  heroYDash: { fontSize: 24, color: "#ffffff" },
  heroYTy: { fontSize: 36, fontWeight: 700, color: "#ff2a2a" },
  heroYMain: { fontSize: 22, color: "#ffffff", fontStyle: "italic", marginBottom: 10 },
  heroYSub: { fontSize: 15, color: "#aaaaaa", letterSpacing: 1 },
  heroBtn: { background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "20px 56px", fontSize: 18, fontWeight: 700, cursor: "pointer", letterSpacing: 1, marginBottom: 60 },
  heroScroll: { fontSize: 28, color: "#3a2a5a", animation: "bounce 2s infinite" },

  secDark: { position: "relative", zIndex: 1, background: "#080810", padding: "100px 0" },
  secLight: { position: "relative", zIndex: 1, background: "#f8f6ff", padding: "100px 0" },
  secInner: { maxWidth: 1100, margin: "0 auto", padding: "0 48px" },

  bodyText: { fontSize: 18, color: "#dddddd", lineHeight: 1.9, marginBottom: 20 },
  white: { color: "#ffffff", fontWeight: 700 },
  introText: { fontSize: 18, color: "#cccccc", lineHeight: 1.8, marginBottom: 48, textAlign: "center" },

  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" },
  aboutText: {},
  aboutInitials: { fontSize: 88, fontWeight: 700, color: "#a855f7", lineHeight: 1, marginBottom: 32 },
  eduGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  eduCard: { background: "#0f0a1a", border: "1px solid #2a1f4a", borderRadius: 12, padding: "20px 18px" },
  eduYear: { fontSize: 11, color: "#a855f7", letterSpacing: 2, marginBottom: 4 },
  eduDegree: { fontSize: 12, color: "#888888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  eduField: { fontSize: 15, color: "#ffffff", fontWeight: 600, lineHeight: 1.4 },

  radarWrap: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" },
  radarLeft: {},
  radarTitle: { fontSize: 32, fontWeight: 700, color: "#111111", marginBottom: 24 },
  radarText: { fontSize: 18, color: "#333333", lineHeight: 1.9, marginBottom: 20 },
  radarRight: { display: "flex", flexDirection: "column", alignItems: "center", gap: 16 },
  radarCaption: { fontSize: 13, color: "#888888", letterSpacing: 1, textAlign: "center", textTransform: "uppercase" },

  cardsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 },
  card: { background: "#0f0a1a", border: "1px solid #2a1f4a", borderRadius: 20, padding: "36px 28px", position: "relative", display: "flex", flexDirection: "column", gap: 10 },
  cardHL: { border: "2px solid #a855f7", background: "#130d20" },
  cardBadge: { position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#a855f7", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 18px", borderRadius: 20, whiteSpace: "nowrap" },
  cardTier: { fontSize: 22, fontWeight: 700, color: "#ffffff" },
  cardTag: { fontSize: 14, color: "#c084fc", fontStyle: "italic" },
  cardPrice: { fontSize: 38, fontWeight: 700, color: "#ffffff" },
  cardSub: { fontSize: 16, color: "#aaaaaa" },
  cardDiv: { height: 1, background: "#2a1f4a", margin: "10px 0" },
  cardFeat: { fontSize: 15, color: "#ffffff", marginBottom: 6 },
  cardRes: { fontSize: 14, color: "#aaaaaa" },
  cardNote: { fontSize: 14, color: "#c084fc", fontStyle: "italic", lineHeight: 1.6 },
  cardBtn: { background: "transparent", border: "1px solid #a855f7", color: "#ffffff", borderRadius: 10, padding: "14px", fontSize: 15, cursor: "pointer", fontFamily: "inherit", marginTop: 12 },
  cardBtnHL: { background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "none", fontWeight: 700 },

  demoRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginBottom: 32 },
  demoCard: { background: "#ffffff", border: "2px solid #ede9fe", borderRadius: 16, padding: "36px 28px", textAlign: "center", boxShadow: "0 4px 24px rgba(168,85,247,0.08)" },
  demoEmoji: { fontSize: 48, marginBottom: 16 },
  demoName: { fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 10 },
  demoDesc: { fontSize: 16, color: "#555555", marginBottom: 24, lineHeight: 1.6 },
  demoBtn: { background: "transparent", border: "2px solid #a855f7", color: "#7c3aed", borderRadius: 8, padding: "10px 24px", fontSize: 15, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 },
  portfolioNote: { fontSize: 16, color: "#666666", fontStyle: "italic", textAlign: "center", lineHeight: 1.8 },

  forGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 60 },
  forCard: { background: "#0f0a1a", border: "1px solid #2a1f4a", borderRadius: 16, padding: "36px 32px" },
  forCardTitle: { fontSize: 16, fontWeight: 700, color: "#a855f7", marginBottom: 28, letterSpacing: 1 },
  forCardTitleNo: { fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 28, letterSpacing: 1 },
  forItemYes: { fontSize: 16, color: "#ffffff", marginBottom: 16, paddingLeft: 18, borderLeft: "3px solid #a855f7", lineHeight: 1.6 },
  forItemNo: { fontSize: 16, color: "#aaaaaa", marginBottom: 20, paddingLeft: 18, borderLeft: "3px solid #2a1f4a", lineHeight: 1.6 },
  forSub: { fontSize: 14, color: "#c084fc" },
  forBottom: { textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" },
  forBottomText: { fontSize: 22, color: "#ffffff", fontStyle: "italic" },
  forBtn: { background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 10, padding: "16px 36px", fontSize: 17, fontWeight: 700, cursor: "pointer" },

  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 },
  contactLeft: {},
  contactTitle: { fontSize: 30, fontWeight: 700, color: "#111111", marginBottom: 24 },
  contactText: { fontSize: 18, color: "#333333", lineHeight: 1.8, marginBottom: 18 },
  contactInfo: { background: "#ede9fe", borderRadius: 12, padding: "24px", marginTop: 28 },
  contactInfoItem: { fontSize: 16, color: "#111111", marginBottom: 12 },
  tallyCard: { background: "#080810", border: "2px solid #a855f7", borderRadius: 20, padding: "48px 36px", textAlign: "center" },
  tallyIcon: { fontSize: 40, color: "#a855f7", marginBottom: 20 },
  tallyTitle: { fontSize: 24, fontWeight: 700, color: "#ffffff", marginBottom: 10 },
  tallySub: { fontSize: 14, color: "#aaaaaa", letterSpacing: 1, textTransform: "uppercase", marginBottom: 36 },
  tallyBtn: { background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 12, padding: "20px 40px", fontSize: 18, fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: 24, fontFamily: "inherit" },
  tallyNote: { fontSize: 14, color: "#aaaaaa", lineHeight: 1.8, fontStyle: "italic" },

  footer: { position: "relative", zIndex: 1, background: "#080810", borderTop: "1px solid #2a1f4a", padding: "40px 48px", textAlign: "center" },
  footerK: { fontSize: 20, fontWeight: 700, color: "#ffffff" },
  footerDots: { fontSize: 20, color: "#a855f7" },
  footerSep: { color: "#3a2a5a" },
  footerBrand: { fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: 4, textTransform: "uppercase" },
  footerCopy: { fontSize: 13, color: "#444444" },
};
