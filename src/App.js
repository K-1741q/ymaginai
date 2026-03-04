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

function RadarChart() {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const dataValues = [0.9, 0.85, 0.95, 0.8, 0.92, 0.88];
  const toRad = deg => (deg - 90) * Math.PI / 180;
  const pt = (angle, radius) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });
  const polygonPoints = RADAR_AXES.map((ax, i) => {
    const p = pt(ax.angle, dataValues[i] * r);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
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
        const p = pt(ax.angle, dataValues[i] * r);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#a855f7" />;
      })}
      {RADAR_AXES.map((ax, i) => {
        const p = pt(ax.angle, r + 22);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fill="#ffffff" fontSize="12" fontFamily="Palatino Linotype, serif">{ax.label}</text>
        );
      })}
    </svg>
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
          <span style={s.heroYLetter}>Y</span>
          <span style={s.heroYText}> – bo to Ty jesteś częścią każdego procesu który tworzymy.</span>
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
                Jestem strategiem i ekspertem który łączy wiedzę z ośmiu dziedzin z możliwościami sztucznej inteligencji.
              </p>
              <p style={s.bodyText}>
                Nie piszę kodu. <strong style={s.white}>Buduję systemy</strong> które eliminują straty czasu i zwiększają przychody.
              </p>
              <p style={s.bodyText}>
                Pracuję <strong style={s.white}>wyłącznie asynchronicznie</strong> – bez spotkań, bez telefonów, bez zbędnego szumu.
                Tylko konkretne działania i mierzalne efekty.
              </p>
              <p style={{ ...s.bodyText, color: "#c084fc", fontStyle: "italic" }}>
                Formularze czytam dwa razy w tygodniu.<br />
                Reszta czasu jest zajęta. Tak to działa.
              </p>
            </div>
            <div style={s.eduGrid}>
              {EDUCATION.map((e, i) => (
                <div key={i} style={s.eduCard}>
                  <div style={s.eduYear}>{e.year}</div>
                  <div style={s.eduDegree}>{e.degree}</div>
                  <div style={s.eduField}>{e.field}</div>
                </div>
              ))}
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
                <div style={s.cardRes}>⏱ {srv.response}</div>
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
            Zakres możliwych wdrożeń jest znacznie szerszy – zależy od Twoich potrzeb i branży.
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
                ["Myślisz że Twoja firma jest za mała", "– masz rację, to nie dla Ciebie"],
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
                Formularze czytam dwa razy w tygodniu.<br />
                <em style={{ color: "#7c3aed" }}>Reszta czasu jest zajęta. Tak to działa.</em>
              </p>
              <div style={s.contactInfo}>
                {["Potrzebny NIP firmy", "Tylko firmy (sektor prywatny i publiczny)", "Odpowiedź w ciągu 72h od dnia odczytu"].map((t, i) => (
                  <div key={i} style={s.contactInfoItem}>✦ {t}</div>
                ))}
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
  heroY: { background: "#1a0f2e", border: "1px solid #a855f7", borderRadius: 14, padding: "20px 32px", marginBottom: 48, display: "inline-block" },
  heroYLetter: { fontSize: 24, fontWeight: 700, color: "#a855f7" },
  heroYText: { fontSize: 18, color: "#ffffff", fontStyle: "italic" },
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
