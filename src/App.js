import { useState, useEffect } from "react";

const NAV_ITEMS = ["O mnie", "Oferta", "Portfolio", "Dla kogo", "Kontakt"];

const SERVICES = [
  {
    tier: "Start",
    price: "1 500 zł",
    sub: "299 zł / mies.",
    tag: "Dla małych firm",
    limit: "do 5 pracowników",
    response: "Odpowiedź do 72h",
    features: [
      "Analiza procesów biznesowych",
      "1 moduł systemowy",
      "Wdrożenie + konfiguracja",
      "Opieka subskrypcyjna",
      "Kontakt asynchroniczny",
    ],
    note: null,
    highlight: false,
  },
  {
    tier: "Scale",
    price: "3 500 zł",
    sub: "599 zł / mies.",
    tag: "Dla firm rozwijających się",
    limit: "5–20 pracowników",
    response: "Odpowiedź do 48h",
    features: [
      "Pogłębiona analiza ROI",
      "Do 3 modułów systemowych",
      "Wdrożenie + integracje",
      "Priorytetowa opieka",
      "Raport z rekomendacjami",
    ],
    note: null,
    highlight: true,
  },
  {
    tier: "✦ Indywidualny",
    price: "?",
    sub: "? / mies.",
    tag: "Znalazłeś dziurę w płocie",
    limit: "Bez ograniczeń",
    response: "Odpowiedź do 24h",
    features: [
      "Wszystko z pakietu Scale",
      "Nieograniczona złożoność",
      "Strategia długoterminowa",
      "Wycena indywidualna",
      "Warunki ustalane osobno",
    ],
    note: "Cena zależy od tego ile możesz zaoszczędzić. Wypełnij formularz – resztę ustalimy.",
    highlight: false,
  },
];

const EDUCATION = [
  { field: "Pielęgniarstwo", degree: "Magister" },
  { field: "Przygotowanie Pedagogiczne", degree: "Kwalifikacje" },
  { field: "Zarządzanie BHP", degree: "Studia podyplomowe" },
  { field: "Zarządzanie Ochroną Zdrowia", degree: "Studia podyplomowe" },
  { field: "Master of Business Administration", degree: "MBA" },
  { field: "Dietetyka i Planowanie Żywienia", degree: "Studia podyplomowe" },
  { field: "Trener Rozwoju Osobistego z Psychodietetyką", degree: "Certyfikat" },
  { field: "Social Media & Content Marketing", degree: "Studia podyplomowe" },
];

const DEMOS = [
  { name: "Salon Beauty", desc: "System rezerwacji dla salonów kosmetycznych", emoji: "💜", url: "#" },
  { name: "Spa & Wellness", desc: "Platforma rezerwacyjna dla centrów wellness", emoji: "🌿", url: "#" },
  { name: "Pet Grooming", desc: "System dla salonów pielęgnacji zwierząt", emoji: "🐾", url: "#" },
];

export default function Ymaginai() {
  const [activeSection, setActiveSection] = useState("O mnie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={s.root}>
      {/* Background */}
      <div style={s.bgGrad} />

      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <span style={s.navLogoK}>K</span>
          <span style={s.navLogoDots}>..</span>
          <span style={s.navSep}>|</span>
          <span style={s.navBrand}>Ymaginai</span>
        </div>
        <div style={s.navLinks}>
          {NAV_ITEMS.map(item => (
            <button key={item}
              style={{...s.navLink, ...(activeSection===item ? s.navLinkActive : {})}}
              onClick={()=>setActiveSection(item)}>
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{...s.hero, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease"}}>
        <div style={s.heroTag}>Strateg · Ekspert · Twórca procesów</div>
        <h1 style={s.heroTitle}>
          <span style={s.heroTitleK}>K</span>
          <span style={s.heroTitleDots}>..</span>
        </h1>
        <div style={s.heroBrand}>Ymaginai</div>
        <p style={s.heroSub}>
          Łączę ludzką intuicję z możliwościami AI.<br />
          Razem tworzymy coś czego wcześniej nie było.
        </p>
        <div style={s.heroY}>
          <span style={s.heroYLetter}>Y</span>
          <span style={s.heroYText}> – bo to Ty jesteś częścią każdego procesu który tworzymy.</span>
        </div>
        <button style={s.heroBtn} onClick={()=>setActiveSection("Kontakt")}>
          Wypełnij formularz ✦
        </button>
      </section>

      {/* Content */}
      <main style={s.main}>

        {/* O MNIE */}
        {activeSection === "O mnie" && (
          <Section title="O mnie">
            <div style={s.aboutGrid}>
              <div style={s.aboutLeft}>
                <div style={s.aboutInitials}>K..</div>
                <p style={s.aboutText}>
                  Jestem strategiem i ekspertem który łączy wiedzę z ośmiu dziedzin z możliwościami sztucznej inteligencji.
                  Nie piszę kodu. Buduję systemy które eliminują straty czasu i zwiększają przychody.
                </p>
                <p style={s.aboutText}>
                  Pracuję <strong style={s.strong}>wyłącznie asynchronicznie</strong> – bez spotkań, bez telefonów, bez zbędnego szumu.
                  Tylko konkretne działania i mierzalne efekty.
                </p>
                <p style={s.aboutText}>
                  Formularze czytam dwa razy w tygodniu.<br />
                  <em style={s.em}>Reszta czasu jest zajęta. Tak to działa.</em>
                </p>
              </div>
              <div style={s.aboutRight}>
                <div style={s.eduTitle}>Wykształcenie</div>
                {EDUCATION.map((e, i) => (
                  <div key={i} style={s.eduItem}>
                    <span style={s.eduDegree}>{e.degree}</span>
                    <span style={s.eduField}>{e.field}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* OFERTA */}
        {activeSection === "Oferta" && (
          <Section title="Oferta">
            <p style={s.offerIntro}>
              Model subskrypcyjny. Płacisz raz za wdrożenie, potem miesięcznie za system który pracuje na Twój biznes.
              <br /><em style={s.em}>Czas to pieniądz. Mój system zwraca się szybciej niż myślisz.</em>
            </p>
            <div style={s.cardsGrid}>
              {SERVICES.map((srv, i) => (
                <div key={i} style={{...s.card, ...(srv.highlight ? s.cardHighlight : {})}}>
                  {srv.highlight && <div style={s.cardBadge}>Najpopularniejszy</div>}
                  <div style={s.cardTier}>{srv.tier}</div>
                  <div style={s.cardTag}>{srv.tag}</div>
                  <div style={s.cardPrice}>{srv.price}</div>
                  <div style={s.cardSub}>{srv.sub}</div>
                  <div style={s.cardLimit}>👥 {srv.limit}</div>
                  <div style={s.cardResponse}>⏱ {srv.response}</div>
                  <div style={s.cardDivider} />
                  {srv.features.map((f, j) => (
                    <div key={j} style={s.cardFeature}>✦ {f}</div>
                  ))}
                  {srv.note && <div style={s.cardNote}>{srv.note}</div>}
                  <button style={{...s.cardBtn, ...(srv.highlight ? s.cardBtnHighlight : {})}}
                    onClick={()=>setActiveSection("Kontakt")}>
                    Wyślij formularz
                  </button>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* PORTFOLIO */}
        {activeSection === "Portfolio" && (
          <Section title="Portfolio">
            <p style={s.offerIntro}>
              Przykładowe systemy rezerwacji wdrożone dla branż usługowych.
              Każdy projekt to analiza procesów + wdrożenie + opieka subskrypcyjna.
            </p>
            <div style={s.demoGrid}>
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
              Powyższe to przykłady jednego typu rozwiązań.<br />
              Zakres możliwych wdrożeń jest znacznie szerszy – zależy od Twoich potrzeb i branży.
            </p>
          </Section>
        )}

        {/* DLA KOGO */}
        {activeSection === "Dla kogo" && (
          <Section title="Czy to dla mnie?">
            <div style={s.forGrid}>
              <div style={s.forCard}>
                <div style={s.forCardTitle}>✦ To jest dla Ciebie jeśli...</div>
                <div style={s.forItem}>Rozumiesz że czas ma cenę i chcesz go odzyskać</div>
                <div style={s.forItem}>Jesteś firmą która chce rosnąć bez chaosu</div>
                <div style={s.forItem}>Szukasz systemu nie jednorazowej naprawy</div>
                <div style={s.forItem}>Rozumiesz różnicę między kosztem a inwestycją</div>
                <div style={s.forItem}>Potrafisz czekać na odpowiedź 48–72 godziny</div>
              </div>
              <div style={s.forCard}>
                <div style={s.forCardTitle}>✗ To nie jest dla Ciebie jeśli...</div>
                <div style={s.forItemNo}>Myślisz że Twoja firma jest za mała<br/><em style={s.forSub}>– masz rację, to nie dla Ciebie</em></div>
                <div style={s.forItemNo}>Szukasz kogoś kto odbiera telefon o 18:00<br/><em style={s.forSub}>– to nie ja</em></div>
                <div style={s.forItemNo}>Chcesz efektów jutro<br/><em style={s.forSub}>– zamknij tę stronę</em></div>
                <div style={s.forItemNo}>Myślisz że to za drogie<br/><em style={s.forSub}>– policz ile kosztuje Cię jedna godzina Twojego czasu</em></div>
              </div>
            </div>
            <div style={s.forBottom}>
              Jeśli dotarłeś do tego miejsca – prawdopodobnie już wiesz.
              <button style={s.forBtn} onClick={()=>setActiveSection("Kontakt")}>Sprawdź ✦</button>
            </div>
          </Section>
        )}

        {/* KONTAKT */}
        {activeSection === "Kontakt" && (
          <Section title="Kontakt">
            <div style={s.contactWrap}>
              <div style={s.contactLeft}>
                <h3 style={s.contactTitle}>Formularz to jedyna droga.</h3>
                <p style={s.contactText}>
                  Nie ma adresu email. Nie ma numeru telefonu. Nie ma czatu.
                </p>
                <p style={s.contactText}>
                  Jest formularz który zadaje właściwe pytania – i który pozwala mi ocenić
                  czy jestem w stanie realnie pomóc Twojemu biznesowi.
                </p>
                <p style={s.contactText}>
                  <strong style={s.strong}>Formularze czytam dwa razy w tygodniu.</strong><br />
                  Reszta czasu jest zajęta. Tak to działa.
                </p>
                <div style={s.contactInfo}>
                  <div style={s.contactInfoItem}>✦ Potrzebny NIP firmy</div>
                  <div style={s.contactInfoItem}>✦ Tylko firmy (sektor prywatny i publiczny)</div>
                  <div style={s.contactInfoItem}>✦ Odpowiedź w ciągu 72h od dnia odczytu</div>
                </div>
              </div>
              <div style={s.contactRight}>
                <div style={s.tallyCard}>
                  <div style={s.tallyIcon}>✦</div>
                  <div style={s.tallyTitle}>Formularz kwalifikacyjny</div>
                  <div style={s.tallySub}>Analiza wstępna · ROI · Kwalifikacja</div>
                  <button style={s.tallyBtn}>
                    Otwórz formularz →
                  </button>
                  <div style={s.tallyNote}>
                    Formularz zawiera pytania o NIP, strukturę firmy, obecne procesy i oczekiwany ROI.
                    Wypełnienie zajmuje około 5 minut.
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

      </main>

      {/* Footer */}
      <footer style={s.footer}>
        <span style={s.footerK}>K</span>
        <span style={s.footerDots}>..</span>
        <span style={s.footerSep}> | </span>
        <span style={s.footerBrand}>Ymaginai</span>
        <span style={s.footerCopy}> · {new Date().getFullYear()} · Wszelkie prawa zastrzeżone</span>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={s.section}>
      <div style={s.sectionHeader}>
        <span style={s.sectionDot}>✦</span>
        <h2 style={s.sectionTitle}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

const s = {
  root: { minHeight:"100vh", background:"#080810", color:"#e8e4f0", fontFamily:"'Palatino Linotype', 'Book Antiqua', Palatino, serif", position:"relative", overflowX:"hidden" },
  bgGrad: { position:"fixed", top:0, left:0, right:0, bottom:0, background:"radial-gradient(ellipse at 20% 20%, #1a0a2e 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #0a1a2e 0%, transparent 50%)", pointerEvents:"none", zIndex:0 },
  nav: { position:"sticky", top:0, zIndex:100, background:"rgba(8,8,16,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid #2a1f4a", padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" },
  navLogo: { display:"flex", alignItems:"baseline", gap:4 },
  navLogoK: { fontSize:22, fontWeight:700, color:"#e8d5ff", letterSpacing:2 },
  navLogoDots: { fontSize:22, color:"#a855f7", letterSpacing:0 },
  navSep: { fontSize:16, color:"#3a2a5a", margin:"0 12px" },
  navBrand: { fontSize:16, color:"#9370b0", letterSpacing:4, textTransform:"uppercase" },
  navLinks: { display:"flex", gap:8, flexWrap:"wrap" },
  navLink: { background:"transparent", border:"none", color:"#7c5fa0", fontSize:13, cursor:"pointer", padding:"6px 14px", borderRadius:20, letterSpacing:1, textTransform:"uppercase", transition:"all 0.2s" },
  navLinkActive: { color:"#e8d5ff", background:"#1a0f2e", border:"1px solid #3a2a5a" },
  hero: { position:"relative", zIndex:1, textAlign:"center", padding:"100px 40px 80px", maxWidth:800, margin:"0 auto" },
  heroTag: { fontSize:12, color:"#7c5fa0", letterSpacing:4, textTransform:"uppercase", marginBottom:32 },
  heroTitle: { fontSize:96, fontWeight:700, lineHeight:1, margin:"0 0 8px" },
  heroTitleK: { color:"#e8d5ff", letterSpacing:-2 },
  heroTitleDots: { color:"#a855f7" },
  heroBrand: { fontSize:14, color:"#7c5fa0", letterSpacing:8, textTransform:"uppercase", marginBottom:40 },
  heroSub: { fontSize:18, color:"#b09ac0", lineHeight:1.8, marginBottom:32 },
  heroY: { background:"#1a0f2e", border:"1px solid #3a2a5a", borderRadius:12, padding:"16px 24px", marginBottom:40, display:"inline-block" },
  heroYLetter: { fontSize:20, fontWeight:700, color:"#a855f7" },
  heroYText: { fontSize:14, color:"#9370b0", fontStyle:"italic" },
  heroBtn: { background:"linear-gradient(135deg, #a855f7, #7c3aed)", color:"#fff", border:"none", borderRadius:12, padding:"16px 40px", fontSize:16, fontWeight:700, cursor:"pointer", letterSpacing:1 },
  main: { position:"relative", zIndex:1, maxWidth:1100, margin:"0 auto", padding:"0 40px 80px" },
  section: { paddingTop:60 },
  sectionHeader: { display:"flex", alignItems:"center", gap:16, marginBottom:40 },
  sectionDot: { color:"#a855f7", fontSize:20 },
  sectionTitle: { fontSize:32, fontWeight:700, color:"#e8d5ff", margin:0, letterSpacing:1 },
  aboutGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 },
  aboutLeft: {},
  aboutInitials: { fontSize:72, fontWeight:700, color:"#a855f7", lineHeight:1, marginBottom:24 },
  aboutText: { fontSize:16, color:"#b09ac0", lineHeight:1.8, marginBottom:16 },
  strong: { color:"#e8d5ff", fontWeight:700 },
  em: { color:"#a855f7", fontStyle:"italic" },
  aboutRight: { background:"#0f0a1a", border:"1px solid #2a1f4a", borderRadius:16, padding:"28px" },
  eduTitle: { fontSize:11, color:"#7c5fa0", textTransform:"uppercase", letterSpacing:2, marginBottom:20 },
  eduItem: { display:"flex", flexDirection:"column", marginBottom:14, paddingBottom:14, borderBottom:"1px solid #1a1228" },
  eduDegree: { fontSize:10, color:"#7c5fa0", textTransform:"uppercase", letterSpacing:1, marginBottom:4 },
  eduField: { fontSize:14, color:"#e8d5ff", fontWeight:600 },
  offerIntro: { fontSize:16, color:"#b09ac0", lineHeight:1.8, marginBottom:40 },
  cardsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24 },
  card: { background:"#0f0a1a", border:"1px solid #2a1f4a", borderRadius:20, padding:"32px 24px", position:"relative", display:"flex", flexDirection:"column", gap:8 },
  cardHighlight: { border:"1px solid #a855f7", background:"#130d20" },
  cardBadge: { position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#a855f7", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 16px", borderRadius:20, whiteSpace:"nowrap", letterSpacing:1 },
  cardTier: { fontSize:20, fontWeight:700, color:"#e8d5ff", marginBottom:4 },
  cardTag: { fontSize:12, color:"#a855f7", marginBottom:8, fontStyle:"italic" },
  cardPrice: { fontSize:32, fontWeight:700, color:"#e8d5ff" },
  cardSub: { fontSize:14, color:"#7c5fa0", marginBottom:8 },
  cardLimit: { fontSize:12, color:"#7c5fa0" },
  cardResponse: { fontSize:12, color:"#7c5fa0", marginBottom:8 },
  cardDivider: { height:1, background:"#2a1f4a", margin:"12px 0" },
  cardFeature: { fontSize:13, color:"#b09ac0", marginBottom:6 },
  cardNote: { fontSize:12, color:"#a855f7", fontStyle:"italic", marginTop:8, lineHeight:1.6 },
  cardBtn: { marginTop:"auto", paddingTop:16, background:"transparent", border:"1px solid #3a2a5a", color:"#9370b0", borderRadius:10, padding:"12px", fontSize:13, cursor:"pointer", fontFamily:"inherit" },
  cardBtnHighlight: { background:"linear-gradient(135deg, #a855f7, #7c3aed)", border:"none", color:"#fff", fontWeight:700 },
  demoGrid: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24, marginBottom:32 },
  demoCard: { background:"#0f0a1a", border:"1px solid #2a1f4a", borderRadius:16, padding:"28px 24px", textAlign:"center" },
  demoEmoji: { fontSize:40, marginBottom:12 },
  demoName: { fontSize:18, fontWeight:700, color:"#e8d5ff", marginBottom:8 },
  demoDesc: { fontSize:13, color:"#7c5fa0", marginBottom:20, lineHeight:1.6 },
  demoBtn: { background:"transparent", border:"1px solid #a855f7", color:"#a855f7", borderRadius:8, padding:"8px 20px", fontSize:13, cursor:"pointer", fontFamily:"inherit" },
  portfolioNote: { fontSize:14, color:"#7c5fa0", fontStyle:"italic", textAlign:"center", lineHeight:1.8 },
  forGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, marginBottom:40 },
  forCard: { background:"#0f0a1a", border:"1px solid #2a1f4a", borderRadius:16, padding:"28px" },
  forCardTitle: { fontSize:14, fontWeight:700, color:"#a855f7", marginBottom:20, letterSpacing:1 },
  forItem: { fontSize:14, color:"#b09ac0", marginBottom:12, paddingLeft:12, borderLeft:"2px solid #a855f7", lineHeight:1.6 },
  forItemNo: { fontSize:14, color:"#7c5fa0", marginBottom:16, paddingLeft:12, borderLeft:"2px solid #3a2a5a", lineHeight:1.6 },
  forSub: { fontSize:12, color:"#a855f7", fontStyle:"italic" },
  forBottom: { textAlign:"center", fontSize:18, color:"#b09ac0", fontStyle:"italic", display:"flex", alignItems:"center", justifyContent:"center", gap:24 },
  forBtn: { background:"linear-gradient(135deg, #a855f7, #7c3aed)", color:"#fff", border:"none", borderRadius:10, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer" },
  contactWrap: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 },
  contactLeft: {},
  contactTitle: { fontSize:24, fontWeight:700, color:"#e8d5ff", marginBottom:20 },
  contactText: { fontSize:15, color:"#b09ac0", lineHeight:1.8, marginBottom:16 },
  contactInfo: { background:"#0f0a1a", border:"1px solid #2a1f4a", borderRadius:12, padding:"20px", marginTop:24 },
  contactInfoItem: { fontSize:13, color:"#9370b0", marginBottom:10, letterSpacing:0.5 },
  contactRight: {},
  tallyCard: { background:"#0f0a1a", border:"1px solid #a855f7", borderRadius:20, padding:"40px 32px", textAlign:"center" },
  tallyIcon: { fontSize:36, color:"#a855f7", marginBottom:16 },
  tallyTitle: { fontSize:20, fontWeight:700, color:"#e8d5ff", marginBottom:8 },
  tallySub: { fontSize:12, color:"#7c5fa0", letterSpacing:1, textTransform:"uppercase", marginBottom:32 },
  tallyBtn: { background:"linear-gradient(135deg, #a855f7, #7c3aed)", color:"#fff", border:"none", borderRadius:12, padding:"16px 40px", fontSize:16, fontWeight:700, cursor:"pointer", width:"100%", marginBottom:20 },
  tallyNote: { fontSize:12, color:"#7c5fa0", lineHeight:1.8, fontStyle:"italic" },
  footer: { position:"relative", zIndex:1, borderTop:"1px solid #2a1f4a", padding:"32px 40px", textAlign:"center" },
  footerK: { fontSize:18, fontWeight:700, color:"#e8d5ff" },
  footerDots: { fontSize:18, color:"#a855f7" },
  footerSep: { color:"#3a2a5a" },
  footerBrand: { fontSize:13, color:"#7c5fa0", letterSpacing:4, textTransform:"uppercase" },
  footerCopy: { fontSize:11, color:"#3a2a5a" },
};
