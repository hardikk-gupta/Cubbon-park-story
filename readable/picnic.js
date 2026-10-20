(() => {
  const _e = /[?&]tick/.test(location.search)
      ? (t) => setTimeout(() => t(performance.now()), 16)
      : (t) => requestAnimationFrame(t),
    Ue = (t) => document.querySelector(t),
    M = (t, n = 0, e = 1) => Math.min(e, Math.max(n, t)),
    A = (t, n, e) => t + (n - t) * e,
    de = (t, n, e) => M((t - n) / (e - n)),
    xt = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    qe = (t) => 1 - Math.pow(1 - t, 3),
    xn = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
    St = (t) => t * t * (3 - 2 * t),
    Os =
      "A product designer. For three years I designed the heavy stuff: fuel logistics, ERPs, a 200-store retail chain, and 27 client projects across 7 countries at Whatmatters. Now AI lets designers build, so I ship what I design: three websites and two apps lately. The latest, Goalkeeper, is a voice assistant in testing, with 35 people waiting. Next, I want a team where I own the work and its numbers.",
    js = ["Aarya Shah", "AI Product Designer", "3+ years of experience"],
    Vt = {
      id: "goalkeeper",
      name: "Goalkeeper",
      summary:
        "A voice assistant for everyday errands. Say what you need and it drafts it, compares prices and opens the right app to finish. The website is live, the app is in testing and 35+ people are on the waitlist.",
    },
    bt = [
      {
        id: "prd-loop",
        ink: "#2a3a7a",
        pm: { x: 352, y: 224, R: 40 },
        name: "PRD Loop",
        summary:
          "Six free skills for Claude that keep a PRD true while the work moves, from the first rough ask to a reviewed handoff.",
      },
      {
        id: "phonepe",
        ink: "#2a3a7a",
        pm: { x: 352, y: 224, R: 40 },
        name: "PhonePe Car Insurance",
        summary:
          "A case study redesigning the car insurance flow in PhonePe, to make the whole journey clearer and easier to finish.",
      },
      {
        id: "ride-through-the-valley",
        ink: "#7a1f2a",
        pm: { x: 90, y: 220, R: 40 },
        name: "Ride Through the Valley",
        summary:
          "A game I built: a horse rider travels through a valley as the weather changes around them.",
      },
      {
        id: "dayro",
        ink: "#7a1f2a",
        pm: { x: 90, y: 224, R: 40 },
        name: "Dayro",
        summary: "A consumer IoT app for running a smart home from your phone.",
      },
      {
        id: "lamad",
        ink: "#2a3a7a",
        pm: { x: 352, y: 220, R: 40 },
        name: "Lamad",
        summary:
          "An ERP for a company that had never used enterprise software before.",
      },
      {
        id: "transporter",
        ink: "#2a3a7a",
        pm: { x: 352, y: 222, R: 40 },
        name: "Transporter",
        summary:
          "Fuel logistics across five connected platforms, from the depot to the road.",
      },
      {
        id: "quickmart",
        ink: "#7a1f2a",
        pm: { x: 90, y: 220, R: 40 },
        name: "QuickMart",
        summary: "The backend behind a retail chain of 200 stores.",
      },
    ],
    gn = [-0.035, 0.045, -0.03, 0.04, -0.025, 0.05, -0.04, 0.035],
    Se = [
      {
        name: "Heet Jivani",
        role: "Founder @ Stairs Media",
        client: "stairs",
        quote:
          "I had a great experience working with Aarya on designing my firm’s website. He is highly professional, creative, and very responsive throughout the process. He understood our requirements clearly and delivered a modern, clean, and high-quality website. I am fully satisfied with his work and would definitely recommend him to anyone looking for a reliable and skilled web designer.",
      },
      {
        name: "Dhrumil Patel",
        role: "CEO @ Logicbric",
        client: "logicbric",
        quote:
          "He is a rare talent in the UI/UX space who truly understands the balance between aesthetic elegance and functional usability. His designs didn’t just make our product look better; they significantly improved our user engagement and streamlined the overall flow. If you’re looking for a designer who prioritizes the user journey as much as the visual identity, I couldn’t recommend him more highly.",
      },
      {
        name: "Yashvi Mehta",
        role: "Marketing Consultant",
        client: null,
        quote:
          "I enjoyed the timely delivery. His ability to work and grasp on feedback made it very easy going for one to work with him as a designer. Aarya comes with a sharp sense of research in his designs.",
      },
      {
        name: "Bhavik Patel",
        role: "CEO @ Rysysth Technologies",
        client: "rysysth",
        quote:
          "The UI/UX project with Aarya was a great learning experience. The guidance was clear and practical, helping me understand user-centred design, wire-framing, and usability principles. The feedback was constructive and improved my design thinking and confidence.",
      },
    ],
    qn = [-0.04, 0.035, -0.03, 0.045, -0.02, 0.03],
    Pe = [
      "byd",
      "cwsr",
      "daixta",
      "lamad",
      "logicbric",
      "rcmo",
      "rysysth",
      "stairs",
      "tidymy",
      "zanride",
    ],
    Vn = Pe.filter((t) => !Se.some((n) => n.client === t)),
    Jn = [-0.12, 0.18, -0.06, 0.1, -0.2, 0.07, 0.14, -0.1],
    bn = [
      [
        "S",
        { family: "Shrikhand", shape: "cut", ink: "#2448b8" },
        1.04,
        -0.08,
        0.02,
      ],
      [
        "e",
        {
          family: "Fraunces",
          weight: 900,
          style: "italic",
          shape: "tile",
          ink: "#141414",
          bg: "#ffffff",
        },
        0.9,
        0.06,
        -0.04,
      ],
      [
        "l",
        { family: "Bebas Neue", shape: "tile", ink: "#ffffff", bg: "#141414" },
        1.02,
        -0.04,
        0.03,
      ],
      [
        "e",
        {
          family: "Cherry Bomb One",
          shape: "circle",
          ink: "#141414",
          bg: "#f6c22d",
        },
        0.84,
        0.1,
        0.06,
      ],
      [
        "c",
        { family: "Abril Fatface", shape: "cut", ink: "#141414" },
        1.06,
        -0.05,
        -0.02,
      ],
      [
        "t",
        {
          family: "Rubik Mono One",
          shape: "tile",
          ink: "#ffffff",
          bg: "#e8452c",
        },
        0.82,
        0.07,
        -0.02,
      ],
      [
        "e",
        {
          family: "DM Serif Display",
          style: "italic",
          shape: "tile",
          ink: "#141414",
          bg: "#ffffff",
        },
        0.96,
        -0.06,
        0.04,
      ],
      [
        "d",
        { family: "Bowlby One", shape: "cut", ink: "#141414" },
        1,
        0.04,
        -0.03,
      ],
      [" "],
      [
        "w",
        { family: "Bungee", shape: "tile", ink: "#ffffff", bg: "#2f8f4e" },
        0.86,
        0.09,
        0.02,
      ],
      [
        "o",
        {
          family: "Instrument Serif",
          style: "italic",
          shape: "circle",
          ink: "#141414",
          bg: "#ffffff",
        },
        1.02,
        -0.05,
        -0.04,
      ],
      [
        "r",
        { family: "Archivo Black", shape: "cut", ink: "#e8452c" },
        1,
        0.08,
        0.03,
      ],
      [
        "k",
        {
          family: "Abril Fatface",
          shape: "tile",
          ink: "#ffffff",
          bg: "#141414",
        },
        1.05,
        -0.07,
        -0.02,
      ],
    ],
    Bt = [
      { id: "email", name: "Email", value: "aaryashah.design@gmail.com" },
      {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/aaryahshah/",
      },
      {
        id: "instagram",
        name: "Instagram",
        url: "https://www.instagram.com/aaryashahh",
      },
      { id: "x", name: "X", url: "https://x.com/aaryashahh" },
      { id: "resume", name: "Résumé", url: "/Aarya_Shah_Resume.pdf" },
    ],
    vn = 0.7,
    Bs = { base: [0.98, 0.83, 0.835], dye: [0.8, 0.1, 0.18] },
    d = { flip0: 0.12, flip1: 1.3, peel0: 1.85, peel1: 2.25, trav1: 3.35 };
  ((d.proj1 = d.trav1 + bt.length),
    (d.tf0 = d.proj1 + 0.35),
    (d.tf1 = d.tf0 + 1.1),
    (d.end = d.tf1));
  const Ds = [
      ["Fine brush", 0.45],
      ["Medium brush", 1],
      ["Broad brush", 2.1],
    ],
    Ws = [
      ["Red", "#d8322a"],
      ["Pink", "#f08aa8"],
      ["Yellow", "#ffbe12"],
      ["Green", "#3f9a4f"],
      ["Blue", "#4f86d9"],
      ["Brown", "#9b6234"],
    ],
    Dt = Ue("#scene"),
    Ys = Ue("#track");
  {
    const t = document.createElement("ul"),
      n = document.createElement("h2");
    ((n.textContent = "Get in touch"),
      Bt.forEach((e) => {
        const s = e.id === "email" ? e.value && `mailto:${e.value}` : e.url;
        if (!s) return;
        const a = document.createElement("li"),
          c = document.createElement("a");
        ((c.href = s),
          (c.textContent = e.id === "email" ? e.value : e.name),
          a.appendChild(c),
          t.appendChild(a));
      }),
      t.children.length && Ue(".copy").append(n, t));
  }
  let E = null;
  try {
    E = Scene.create(Dt);
  } catch (t) {
    console.error(t);
  }
  if (!E) {
    document.body.classList.add("nogl");
    return;
  }
  const wn = new Date(),
    Mn = [
      `${wn.toLocaleString("en", { month: "short" }).toUpperCase()} ${wn.getDate()}`,
      String(wn.getFullYear()),
    ];
  let p = 0,
    u = 0,
    Ee = 1,
    P = !1,
    Q,
    ht,
    Wt,
    te,
    zt,
    vt,
    ue,
    It,
    Lt = null,
    Zn = "",
    Yt = null,
    Qn = !1,
    Ve = 0;
  const Ht = [];
  let ts = null;
  const Je = { front: null, back: null };
  let Ze = null,
    Ae = !1,
    es = !1;
  const kn = {},
    Qe = [];
  let tn = -1,
    R = null,
    pe = [],
    ns = "",
    Ft = null,
    ss = !1;
  const Sn = {
      url: "https://nirngzcuzobmafojwdvw.supabase.co",
      key: "sb_publishable_7-c08gZol6ltOg_52BOtXA_Cb6buNeU",
      table: "sticker_sheet_leads",
    },
    J = { open: !1, at: 0, anchor: null, savedAt: 0 };
  try {
    localStorage.getItem("picnic-logo") === "1" && (J.savedAt = 1);
  } catch {}
  let Te = null,
    os = "",
    ee = [],
    as = "",
    fe = null,
    ze = null,
    me = null,
    X = null,
    N = null,
    Pt = null,
    is = "",
    Pn = null,
    En = null;
  const en = {},
    rt = { clients: {}, title: null, stamps: {}, posters: {} };
  function rs() {
    ((p = innerWidth),
      (u = innerHeight),
      (Ee = Math.min(window.devicePixelRatio || 1, 2)),
      (P = p < u * 0.85),
      P
        ? ((Q = Math.min(p * 0.86, 460)),
          (ht = Q * 1.42),
          ht > u * 0.74 && ((ht = u * 0.74), (Q = ht / 1.42)))
        : ((Q = M(Math.min(p * 0.5, u * 0.62 * 1.5), 300, 720)),
          (ht = Q / 1.5)),
      (Wt = P
        ? Math.min(p * 0.84, 400)
        : M(Math.min(p * 0.32, (u * 0.5 * Print.SW) / Print.SH), 300, 520)),
      (te = (Wt * Print.SH) / Print.SW),
      (zt = Wt * (0.5 + vn / 2) + (P ? p * 0.35 : M(p * 0.06, 56, 120))),
      (vt = p * 0.5 + Q * 0.3 + Wt * 0.3),
      (ue = P ? u * 0.05 : u * 0.08),
      (It = vt + zt * bt.length),
      (R = Ns()),
      (d.down = d.tf0 + Math.max(d.tf1 - d.tf0, R.bottom / u - 0.5)),
      (d.sheet = d.tf0 + Math.max(0, (R.sheet.y - R.sheet.H / 2) / u - 0.3)),
      (d.end = d.down),
      (d.s0 = d.down + 0.45),
      (d.s1 = d.s0 + 1),
      (d.u0 = d.s1 + 0.35),
      (d.u1 = d.u0 + 1.6));
    const t = (d.down - d.tf0) * u;
    ((X = Xs(t)), (Ys.style.height = (d.u1 + 1) * u + "px"));
    const n = [],
      e = [],
      s = Math.max(p, u),
      a = (i, m, T, x, w, L, j) => n.push([i, m, T, x, w, L, j, 0]);
    P
      ? (a(p / 2 + 60, -u / 2 - 60, 2.2, u * 0.42, 10, 1.3, 0.05),
        a(-p / 2 - 50, u / 2 + 40, -0.9, u * 0.34, 14, 4.1, 0.06),
        e.push([p / 2 + 50, -u / 2 - 20, 170, 0]))
      : (a(
          p / 2 + 70,
          -u / 2 - 90,
          2.3,
          Math.max(620, s * 0.52),
          10,
          1.3,
          0.05,
        ),
        a(p / 2 + 90, u * 0.1, 3.1, Math.max(420, s * 0.34), 17, 2.7, -0.07),
        a(
          -p / 2 - 70,
          u / 2 + 70,
          -0.8,
          Math.max(460, s * 0.36),
          14,
          4.1,
          0.06,
        ),
        e.push([p / 2 + 30, -u / 2 - 10, Math.max(300, s * 0.26), 0]));
    for (let i = 0; i <= bt.length; i++) {
      const m = vt + (i + 0.5) * zt;
      i % 2 === 0
        ? a(
            m + 120,
            -u / 2 - 80,
            2 + 0.2 * Math.sin(i),
            Math.max(480, u * 0.6),
            10 + (i % 3) * 4,
            5 + i * 1.7,
            0.05,
          )
        : a(
            m - 100,
            u / 2 + 80,
            -1.15 + 0.2 * Math.cos(i),
            Math.max(440, u * 0.52),
            12 + (i % 2) * 5,
            6 + i * 2.1,
            -0.05,
          );
    }
    e.push([vt + 2.5 * zt, u / 2 + 30, 300, 0], [It + p * 0.3, -u / 2, 340, 0]);
    const c = R.cards[0],
      l = R.cards[R.cards.length - 1];
    (a(
      It + p / 2 + 60,
      c.y + c.h * 0.6,
      2.7,
      Math.max(460, s * 0.4),
      12,
      8.3,
      0.05,
    ),
      a(
        It - p / 2 - 60,
        (c.y + l.y) / 2 + c.h * 0.5,
        -0.45,
        Math.max(440, s * 0.36),
        15,
        9.7,
        -0.06,
      ),
      a(
        It + p / 2 + 40,
        l.y + l.h * 0.4,
        3.4,
        Math.max(400, s * 0.34),
        11,
        11.2,
        0.04,
      ),
      e.push([It - p * 0.42, (c.y + l.y) / 2, P ? 220 : 320, 0]),
      a(
        R.sheet.x - R.sheet.W / 2 - 90,
        R.sheet.y - R.sheet.H * 0.1,
        -0.25,
        Math.max(420, s * 0.36),
        13,
        12.6,
        0.05,
      ),
      E.resize(p, u, Ee, It + p, Math.max(R.bottom, X.y + X.h / 2) + u * 0.3),
      E.branches(n, e),
      Qn && cs());
  }
  const nn = { wide: [1086, 110], tall: [700, 206] };
  function Fs() {
    const [t, n] = P ? nn.tall : nn.wide,
      e = 11;
    return [t + e * 2, n + e * 2];
  }
  function Ns() {
    const t = It,
      n = P ? 470 : 330,
      e = P ? Math.min(p - 36, 440) : M(p * 0.34, 380, 540),
      s = (e * n) / Print.SW,
      [a, c] = Fs(),
      l = P ? p - 20 : Math.min(p * 0.62, 860),
      i = (l * c) / a,
      m = (d.tf1 - d.tf0) * u,
      T = P ? p * 0.02 : Math.min(p * 0.17, 270),
      x = P ? 150 : 0,
      w = Se.map((et, C) => ({
        x: t + (C % 2 ? 1 : -1) * T,
        y: P ? m + C * (s + x) : m + C * s * 0.8,
        w: e,
        h: s,
        r: qn[C % qn.length],
        tH: n,
      })),
      L = { x: t, y: m - s / 2 - 34 - i / 2, w: l, h: i },
      j = [];
    w.forEach((et, C) => {
      if (P) {
        const lt = et.y + s / 2 + x / 2;
        j.push([t - p * 0.22, lt - 8], [t + p * 0.22, lt + 10]);
      } else {
        const lt = C % 2 ? -1 : 1,
          Ut = t + lt * T;
        j.push(
          [Ut - e * 0.22, et.y - s * 0.08],
          [Ut + e * 0.24, et.y + s * 0.12],
        );
      }
    });
    const _ = P ? 54 : 78,
      tt = P ? p * 0.36 : e * 0.42,
      D = Vn.map((et, C) => ({
        id: et,
        x: j[C][0],
        y: j[C][1],
        r: Jn[C % Jn.length],
        h: _,
        maxW: tt,
      })),
      O = w[w.length - 1],
      G = Ks(
        t,
        Math.max(O.y + s / 2, ...D.map((et) => et.y + _)) + (P ? 70 : 120),
        _,
        tt,
      ),
      U = G.H < u - 40 ? u / 2 : G.H / 2 + (P ? 76 : 24);
    return {
      cards: w,
      title: L,
      stickers: D,
      sh: _,
      maxW: tt,
      sheet: G,
      bottom: G.y + U,
      cardSticker: P ? 44 : 58,
    };
  }
  function Xs(t) {
    const n = P,
      e = n ? 152 : 52,
      s = n ? 14 : 18;
    let a, c;
    if (n) {
      ((a = p - 24), (c = a / 0.84));
      const l = u - e - s - 80;
      c > l && ((c = l), (a = c * 0.84));
    } else
      ((c = Math.min(u - e - s - 110, 700)),
        (a = c * 1.45),
        a > p * 0.86 && ((a = p * 0.86), (c = a / 1.45)));
    return {
      x: 0,
      y: t - (e + s) / 2,
      w: a,
      h: c,
      r: n ? 0.006 : -0.01,
      gap: s,
      camY: t,
    };
  }
  function Gs(t, n, e) {
    const s = rt.clients[t],
      a = s ? s.width / s.height : 1.9;
    return n * a > e ? [e, e / a] : [n * a, n];
  }
  function Ks(t, n, e, s) {
    const a = P,
      c = a ? p - 24 : M(p * 0.68, 780, 1040),
      l = a ? 20 : 40,
      i = a ? 50 : 78,
      m = a ? 96 : 122,
      T = m + (a ? 26 : 34),
      x = c * 0.6,
      w = l,
      L = a ? c - l : x - 28,
      j = a ? 14 : 24,
      _ = a ? 18 : 26,
      tt = Pe.map((dt) => ({ id: dt, size: Gs(dt, e, s) }));
    tt.push({ id: "you", size: [Math.min(e * 2.3, s), e] });
    const D = [];
    let O = [],
      G = 0;
    for (const dt of tt)
      (O.length &&
        G + j + dt.size[0] > L - w &&
        (D.push([O, G]), (O = []), (G = 0)),
        (G += (O.length ? j : 0) + dt.size[0]),
        O.push(dt));
    D.push([O, G]);
    const U = {};
    let et = T;
    D.forEach(([dt, q]) => {
      let Ne = w + (L - w - q) / 2;
      (dt.forEach((At) => {
        ((U[At.id] = {
          x: Ne + At.size[0] / 2,
          y: et + e / 2,
          w: At.size[0],
          h: At.size[1],
        }),
          (Ne += At.size[0] + j));
      }),
        (et += e + _));
    });
    const C = et - _,
      lt = a ? 92 : 136,
      Ut = Print.CONTACT_DIMS,
      we = lt * Ut.email[1] + 18,
      K = a ? 40 : 46,
      gt = lt * 0.88 + (a ? 20 : 26),
      Z = a ? 30 : 40,
      Y = Z + (a ? 18 : 24),
      Be = Bt.length - 1,
      re = Y + we + K + Math.ceil(Be / 2) * gt;
    let Rt, Zt, De, Ot;
    if (a) {
      const dt = et + 4;
      ((Ot = [l, dt, c - l, dt]), (Rt = dt + 28), (Zt = l), (De = c - l));
    } else
      ((Rt = T - 6 + Math.max(0, (C - T - re) / 2)),
        (Zt = x + 28),
        (De = c - l),
        (Ot = [x, m + 24, x, null]));
    const We = (De - Zt) / 2,
      Ye = (Zt + De) / 2,
      Fe = Rt + Y,
      Qt = Bt.map((dt, q) =>
        q === 0
          ? { x: Ye, y: Fe + we / 2 }
          : {
              x: Zt + We * (((q - 1) % 2) + 0.5),
              y:
                Fe +
                we +
                K +
                Math.floor((q - 1) / 2) * gt +
                gt / 2 -
                (a ? 10 : 13),
            },
      ),
      ce = Math.max(C, Rt + re - (a ? 10 : 13)) + l;
    return (
      a || (Ot[3] = ce - l),
      {
        x: t,
        y: n + ce / 2,
        W: c,
        H: ce,
        r: a ? -0.008 : -0.012,
        pad: l,
        band: m,
        titleSize: i,
        titleRoom: c - l * 2,
        slots: U,
        S: lt,
        contact: Qt,
        perf: Ot,
        hi: { text: "Say hi to me", x: Ye, y: Rt + Z * 0.82, size: Z },
        stamp: { x: Ye + lt * 0.08, y: Fe + we + K * 0.45 },
      }
    );
  }
  function _s() {
    const [t, n] = P ? nn.tall : nn.wide,
      e = 2,
      s = rt.title,
      a = document.createElement("canvas");
    ((a.width = t * e), (a.height = n * e));
    const c = a.getContext("2d");
    return (
      P
        ? (c.drawImage(s, 0, 0, 646, 110, 0, 0, 646 * e, 110 * e),
          c.drawImage(
            s,
            646,
            0,
            440,
            110,
            (t - 440) * e,
            96 * e,
            440 * e,
            110 * e,
          ))
        : c.drawImage(s, 0, 0, 1086, 110, 0, 0, t * e, n * e),
      Print.dieCut(a, t, n, 7, e)
    );
  }
  function Us(t, n, e) {
    ((g.art = Print.frontLive(t, n, e)), (g.t = -1));
    const s = P ? "tall" : "wide";
    g.loop &&
      g.cut !== s &&
      ((g.cut = s),
      (g.live = !1),
      g.v !== g.loop && (g.v.remove(), (g.v = g.loop)),
      (g.v.src = `${ye[s].loop}.mp4`),
      g.v.play().catch(() => {}),
      xe(`${ye[s].loop}-poster.jpg`)
        .then((c) => {
          rt.posters[s] = c;
        })
        .catch(() => {}));
    const a = rt.posters[s];
    return !(g.live && g.v.readyState >= 2 && g.art.draw(g.v)) &&
      !(a && g.art.draw(a))
      ? Print.front(t, n, e, null)
      : g.art.canvas;
  }
  function cs() {
    const t = E.gl,
      n = Math.round(M(Q * Ee * 1.35, 1024, 2048)),
      e = `${P}|${n}|${Math.round((ht / Q) * 100)}`;
    if (e !== Zn) {
      if (((Zn = e), Lt))
        for (const x of ["front", "back", "backPeeled", "cover"])
          t.deleteTexture(Lt[x]);
      const i = Print.openMark(P, Mn),
        m = Print.coverStamp(P, i, rt.stamps[Vt.id]),
        T = {
          cw: Q,
          ch: ht,
          TW: n,
          portrait: P,
          cover: m,
          mark: i,
          intro: Os,
          lines: js,
        };
      ((Lt = {
        front: E.texture(Us(Q, ht, n)),
        back: E.texture(Print.back({ ...T, peeled: !1 })),
        backPeeled: E.texture(Print.back({ ...T, peeled: !0 })),
        cover: E.texture(m.inked),
      }),
        (Je.front = m.inked));
    }
    Ht.length ||
      ((Je.back = Print.stampBack(Vt, rt.stamps[Vt.id], 0)),
      (ts = E.texture(Je.back)),
      bt.forEach((i, m) => {
        const T = Print.stamp(rt.stamps[i.id], {
          ...i.pm,
          top: "SELECTED WORK",
          bottom: "AARYA SHAH",
          l1: Mn[0],
          l2: Mn[1],
          color: i.ink,
          seed: 20 + m,
        });
        ((kn[i.id] = {
          front: T.inked,
          back: Print.stampBack(i, rt.stamps[i.id], m + 1),
        }),
          Ht.push({
            plain: E.texture(T.plain),
            inked: E.texture(T.inked),
            back: E.texture(kn[i.id].back),
            stickers: (i.stickers || []).map(([x, w, L, j, _, tt, D, O, G]) => {
              const U = Print.sticker(x, w, L, j, _, tt);
              return {
                tex: E.texture(U.canvas),
                w: U.w,
                h: U.h,
                cx: D + _ / 2 - Print.SW / 2,
                cy: O + tt / 2 - Print.SH / 2,
                r: G,
              };
            }),
          }));
      }));
    let s = P ? p * 0.11 : M(p * 0.05, 48, 84);
    const a = (P ? p - 32 : p * 0.8) / (qs(s) || 1);
    if ((a < 1 && (s *= a), !Yt || Yt.size !== s)) {
      Yt && Yt.letters.forEach((w) => t.deleteTexture(w.tex));
      const i = [];
      let m = 0,
        T = 0;
      bn.forEach(([w, L, j, _, tt], D) => {
        if (w === " ") {
          m += s * 0.32;
          return;
        }
        const O = Print.letter(w, L, s * j);
        (i.push({
          tex: E.texture(O.canvas),
          w: O.w,
          h: O.h,
          ox: m + O.w / 2,
          oy: _ * s,
          r: tt,
          k: 60 + ((D * 37) % 30),
          z: 0.5 + (D % 3) * 0.08,
        }),
          (m += O.w * 0.86),
          (T = Math.max(T, O.h)));
      });
      const x = m + i[i.length - 1].w * 0.14;
      (i.forEach((w) => {
        ((w.ox -= x / 2), (w.x = null), (w.v = 0));
      }),
        (Yt = { size: s, letters: i, width: x, height: T }));
    }
    const c = `${P}`;
    if (
      (c !== ns &&
        ((ns = c),
        pe.forEach((i) => t.deleteTexture(i)),
        (pe = Se.map((i, m) =>
          E.texture(Print.testimonial(i, m, R.cards[0].tH)),
        )),
        Ft && (t.deleteTexture(Ft.tex), (Ft = null))),
      ss)
    ) {
      for (const x of Pe) {
        const w = rt.clients[x];
        w && !en[x] && (en[x] = { tex: E.texture(w), w: w.width, h: w.height });
      }
      if (rt.title && !Ft) {
        const x = _s();
        Ft = { tex: E.texture(x.canvas), w: x.w, h: x.h };
      }
      const i = R.sheet,
        m = `${i.S}`;
      m !== as &&
        ((as = m),
        ee.forEach((x) => t.deleteTexture(x.tex)),
        (ee = Bt.map((x) => {
          const w = Print.contactSticker(x.id, i.S);
          return { ...w, tex: E.texture(w.canvas) };
        })));
      const T = `${P}|${Math.round(i.W)}|${Math.round(i.H)}|${i.slots.byd ? Math.round(i.slots.byd.w) : 0}`;
      if (T !== os) {
        ((os = T), Te && t.deleteTexture(Te));
        const x = Pe.filter((L) => rt.clients[L]).map((L) => ({
          img: rt.clients[L],
          ...i.slots[L],
        }));
        ze && t.deleteTexture(ze.tex);
        const w = Print.blankSticker(i.slots.you.w, i.slots.you.h);
        ((ze = { ...w, tex: E.texture(w.canvas) }),
          x.push({ img: w.canvas, ...i.slots.you }),
          i.contact.forEach((L, j) =>
            x.push({
              img: ee[j].canvas,
              x: L.x,
              y: L.y,
              w: ee[j].w,
              h: ee[j].h,
            }),
          ),
          (Te = E.texture(
            Print.stickerSheet({
              W: i.W,
              H: i.H,
              K: Math.min(3, Math.max(2, Ee * 1.25)),
              pad: i.pad,
              band: i.band,
              titleSize: i.titleSize,
              title: "Be the next sticker.",
              titleRoom: i.titleRoom,
              hi: i.hi,
              perf: i.perf,
              holes: x,
            }),
          )));
      }
      if (!fe) {
        const x = Print.inkStamp("COPIED", "#d8322a");
        fe = { ...x, tex: E.texture(x.canvas) };
      }
      if (!me) {
        const x = Print.inkStamp("SAVED", "#d8322a");
        me = { ...x, tex: E.texture(x.canvas) };
      }
    }
    const l = `${P}|${Math.round(X.w)}|${Math.round(X.h)}`;
    if (
      (l !== is &&
        ((is = l),
        (N = Colour.painter(
          X.w,
          X.h,
          Math.min(2, Math.max(1.25, Ee * 1.1), 2400 / X.w),
          P,
          N,
        )),
        Pt && t.deleteTexture(Pt),
        (Pt = E.texture(N.canvas)),
        Ss(N.colour, N.eraser)),
      !Pn)
    ) {
      const i = document.createElement("canvas");
      i.width = i.height = 4;
      const m = i.getContext("2d");
      ((m.fillStyle = "#fff"), m.fillRect(0, 0, 4, 4), (Pn = E.texture(i)));
    }
    (ft ||
      (ft = Props.create(E, {
        radio: () => {
          const i = !Garden.on;
          (Gn(i), Is(i));
        },
        sound: (i, m) => Garden.play(i, m),
      })),
      ft.layout({
        vw: p,
        vh: u,
        cw: Q,
        ch: ht,
        Xc: vt,
        spacing: zt,
        yRow: ue,
        SHd: te,
        maxCam: It,
        portrait: P,
      }),
      Ve || (Ve = performance.now()));
  }
  function qs(t) {
    let n = 0,
      e = 0;
    for (const [s, a, c] of bn) {
      if (s === " ") {
        n += t * 0.32;
        continue;
      }
      const l = Print.letter(s, a, t * c);
      ((n += l.w * 0.86), (e = l.w));
    }
    return n + e * 0.14;
  }
  const ye = {
      wide: { intro: "hero-intro", loop: "hero" },
      tall: { intro: "hero-tall-intro", loop: "hero-tall" },
    },
    g = {
      v: null,
      loop: null,
      art: null,
      t: -1,
      live: !1,
      cut: innerWidth < innerHeight * 0.85 ? "tall" : "wide",
      still: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  function ls(t, n) {
    const e = document.createElement("video");
    ((e.muted = !0),
      (e.loop = n),
      (e.playsInline = !0),
      (e.preload = "auto"),
      (e.disablePictureInPicture = !0));
    for (const s of ["muted", "playsinline", ...(n ? ["loop"] : [])])
      e.setAttribute(s, "");
    return (
      e.setAttribute("aria-hidden", "true"),
      (e.tabIndex = -1),
      (e.style.cssText =
        "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;z-index:-1"),
      (e.src = `${t}.mp4`),
      e.addEventListener("playing", () => {
        g.v === e && (g.live = !0);
      }),
      document.body.appendChild(e),
      e
    );
  }
  if (!g.still) {
    const t = ls(ye[g.cut].intro, !1),
      n = ls(ye[g.cut].loop, !0);
    (t.addEventListener("ended", () => {
      g.v === t && ((g.v = n), n.play().catch(() => {}), t.remove());
    }),
      (g.v = t),
      (g.loop = n),
      addEventListener(
        "pointerdown",
        () => {
          g.started && !g.live && g.v.play().catch(() => {});
        },
        { once: !0 },
      ));
  }
  const xe = (t) =>
      new Promise((n, e) => {
        const s = new Image();
        ((s.onload = () => n(s)), (s.onerror = e), (s.src = t));
      }),
    Vs = Promise.all([
      ...[Vt, ...bt]
        .map((t) => t.id)
        .map((t) =>
          xe(`stamps/${t}.webp`)
            .then((n) => {
              rt.stamps[t] = n;
            })
            .catch(() => {}),
        ),
      ...(g.still
        ? ["wide", "tall"].map((t) => [t, `${ye[t].loop}-poster.jpg`])
        : [[g.cut, `${ye[g.cut].intro}-poster.jpg`]]
      ).map(([t, n]) =>
        xe(n)
          .then((e) => {
            rt.posters[t] = e;
          })
          .catch(() => {}),
      ),
    ]);
  (Promise.all([
    document.fonts.load("400 40px 'Geist'"),
    document.fonts.load("500 40px 'Geist'"),
    document.fonts.load("600 40px 'Geist'"),
    document.fonts.load("700 40px 'Geist'"),
    document.fonts.load("800 40px 'Geist'"),
    document.fonts.load("500 40px 'Geist Mono'"),
    document.fonts.load("400 40px 'Yellowtail'"),
    document.fonts.load("700 40px 'Source Serif 4'", "NORISKTY"),
    document.fonts.load("400 40px 'Kalam'"),
    document.fonts.load("400 40px 'Cherry Bomb One'", "e"),
    document.fonts.load("italic 400 40px 'DM Serif Display'", "“"),
    ...bn
      .filter((t) => t[1])
      .map(([t, n]) =>
        document.fonts.load(
          `${n.style || ""} ${n.weight || 400} 40px '${n.family}'`,
          t,
        ),
      ),
  ])
    .catch(() => {})
    .then(() => Vs)
    .then(() => {
      ((Qn = !0), p && cs());
    }),
    Promise.all([
      ...Pe.map((t) =>
        xe(`clients/${t}.png`)
          .then((n) => {
            rt.clients[t] = Print.cleanSticker(n);
          })
          .catch(() => {}),
      ),
      xe("clients/title.svg")
        .then((t) => {
          rt.title = t;
        })
        .catch(() => {}),
    ]).then(() => {
      ((ss = !0), p && rs());
    }));
  let An = 0,
    hs = 0,
    ds = 0;
  function Tn() {
    !innerWidth ||
      !innerHeight ||
      (innerWidth === An && Math.abs(innerHeight - hs) < 120) ||
      (innerWidth === An && J.open) ||
      ((An = innerWidth), (hs = innerHeight), rs());
  }
  (addEventListener("resize", () => {
    (clearTimeout(ds), (ds = setTimeout(Tn, 120)));
  }),
    Tn());
  const v = { x: -1, y: -1, speed: 0, lx: 0, ly: 0, lt: 0, vx: 0, vy: 0 },
    Nt = [];
  let ne = 0,
    se = 0;
  (addEventListener("pointermove", (t) => {
    const n = performance.now(),
      e = Math.max(8, n - v.lt);
    if (v.lt && n - v.lt < 200) {
      const l = ((t.clientX - v.lx) / e) * 1e3,
        i = ((t.clientY - v.ly) / e) * 1e3;
      ((v.vx += (l - v.vx) * 0.5),
        (v.vy += (i - v.vy) * 0.5),
        (v.speed = Math.max(v.speed, Math.hypot(l, i))));
    } else v.vx = v.vy = 0;
    ((v.lx = v.x = t.clientX),
      (v.ly = v.y = t.clientY),
      (v.lt = n),
      (v.touch = t.pointerType === "touch"));
    const s = t.clientX - p / 2 + ne,
      a = t.clientY - u / 2 + se,
      c = Nt[Nt.length - 1];
    (!c || Math.hypot(s - c.x, a - c.y) > 14 || n - c.t > 60) &&
      (Nt.push({ x: s, y: a, vx: v.vx, vy: v.vy, t: n }),
      Nt.length > 12 && Nt.shift());
  }),
    document.addEventListener("pointerleave", () => {
      v.x = -1;
    }));
  const zn = new Float32Array(48),
    In = new Float32Array(12),
    us = Nature.create(E),
    ps = Butterflies.create(E),
    oe = { on: !1, at: -1e9, x: null, v: 0 };
  let Et = scrollY / Math.max(1, innerHeight),
    fs = performance.now(),
    Ln = 1;
  const Ie = { z: 0, rx: 0, ry: 0 };
  let ft = null,
    sn = null,
    Hn = 0,
    Cn = 0,
    ms = 0;
  const Le = bt.map(() => ({ z: 0, rx: 0, ry: 0, p: 0 })),
    wt = { z: 0, rx: 0, ry: 0, p: 0 },
    He = bt.map(() => 0),
    ys = Se.map(() => ({ z: 0, rx: 0, ry: 0 })),
    Xt = { k: 0, stage: 0, lock: -1, input: 0, to: -1 },
    $n = () => {
      ((Xt.input = performance.now()), (Xt.to = -1));
    },
    xs = document.getElementById("more"),
    Js = document.getElementById("minimal");
  let gs = !0,
    on = performance.now(),
    Rn = !1,
    bs = !1;
  const Zs = () => {
    on = performance.now();
  };
  for (const t of ["wheel", "touchmove", "keydown", "pointerdown", "scroll"])
    addEventListener(t, Zs, { passive: !0 });
  (addEventListener("wheel", $n, { passive: !0 }),
    addEventListener("touchmove", $n, { passive: !0 }),
    addEventListener("keydown", $n));
  const B = { k: -1, p: 0, open: !1, at: 0 };
  let On = !1;
  const Gt = { on: !1, at: 0 },
    vs = {},
    jn = [...Bt, 0].map(() => ({ a: 0, at: -1e9 })),
    Bn = [],
    Ce = { z: 0, rx: 0, ry: 0 };
  let $e = 0,
    Dn = -1,
    Ct = !1,
    Kt = null,
    an = 1,
    Wn = 0,
    rn = !1,
    ws = !1;
  const cn = {},
    Yn = (t, n) => cn[t] || (cn[t] = n);
  function Re(t, n, e, s, a) {
    const c = 1 - Math.exp(-a * 8);
    ((t.z += ((n ? 14 : 0) - t.z) * c),
      (t.rx += ((n ? -s * 0.3 : 0) - t.rx) * c),
      (t.ry += ((n ? e * 0.34 : 0) - t.ry) * c),
      (t.bow = (t.bow || 0) + ((n ? 1 : 0) - (t.bow || 0)) * c),
      (t.p = t.settle
        ? M((t.p || 0) - a / 0.16)
        : M((t.p || 0) + ((n ? 1 : -1) * a) / 0.7)));
  }
  function Ms(t, n, e) {
    const s = Math.PI,
      a = 0.5 - 0.5 * Math.cos(s * n.p),
      [c, l] = t.size;
    ((t.mode = 1),
      (t.texB = e),
      (t.mixB = 0),
      (t.glossBack = 0.1),
      (t.bend = [0, 0]));
    const i = Math.atan2(l, c) * (1 - St(M(a / 0.65))),
      m = Math.cos(i),
      T = Math.sin(i),
      x = (m * c + T * l) / 2,
      w = c * (0.06 + 0.06 * Math.sin(s * a)),
      L = A(x, -x - s * w, a);
    let j = 1 / 0,
      _ = -1 / 0;
    for (let tt = 0; tt <= 24; tt++) {
      const D = -x + (2 * x * tt) / 24,
        O = D - L,
        G =
          O > 0
            ? L + w * Math.sin(Math.min(O / w, s)) - Math.max(O - s * w, 0)
            : D;
      ((j = Math.min(j, G)), (_ = Math.max(_, G)));
    }
    return ((t.curl = [m, T, L, w, -(j + _) / 2]), 12 * Math.sin(s * a));
  }
  function ae(t, n) {
    let e = 1 / 0;
    const [s, a] = t.size;
    t.pos[2] = 0;
    for (const c of [-0.5, -0.25, 0, 0.25, 0.5])
      for (const l of [-0.5, 0.5]) e = Math.min(e, E.point(t, c * s, l * a)[2]);
    return ((t.pos[2] = Math.max(n, -e + 1)), t);
  }
  function ln(t, n, e) {
    const s = E.point(t, n, e),
      a = E.point(t, n + 2, e),
      c = E.point(t, n, e + 2),
      l = [a[0] - s[0], a[1] - s[1], a[2] - s[2]],
      i = [c[0] - s[0], c[1] - s[1], c[2] - s[2]],
      m = [
        l[1] * i[2] - l[2] * i[1],
        l[2] * i[0] - l[0] * i[2],
        l[0] * i[1] - l[1] * i[0],
      ],
      T = Math.hypot(...m);
    return { p: s, n: m.map((x) => x / T) };
  }
  function Oe(t, n) {
    const e = Math.cos(-n),
      s = Math.sin(-n);
    return [
      Math.asin(M(-(t[0] * s + t[1] * e), -1, 1)),
      Math.atan2(t[0] * e - t[1] * s, t[2]),
    ];
  }
  function $t(t, n, e, s, a, c, l = v.x, i = v.y) {
    if (l < 0 || ws) return null;
    const m = Scene.D / (Scene.D - e),
      T = (t - ne) * m + p / 2,
      x = (n - se) * m + u / 2,
      w = (l - T) / m,
      L = (i - x) / m,
      j = Math.cos(-c),
      _ = Math.sin(-c),
      tt = (w * j - L * _) / s,
      D = (w * _ + L * j) / a;
    return Math.abs(tt) <= 0.5 && Math.abs(D) <= 0.5 ? [tt, D] : null;
  }
  function hn(t) {
    const n = Math.min((t - fs) / 1e3, 0.05);
    if (((fs = t), !u)) {
      (Tn(), _e(hn));
      return;
    }
    if (!Lt || !Yt) {
      _e(hn);
      return;
    }
    document.body.classList.add("on");
    let e = scrollY / u;
    if (
      ((Et += (e - Et) * (1 - Math.exp(-n * 7))),
      Math.abs(e - Et) < 1e-4 && (Et = e),
      e >= d.u1 - 0.002 && Et >= d.u1 - 0.004)
    ) {
      ((Et = e = 0),
        scrollTo(0, 0),
        Object.assign(Xt, { k: 0, stage: 0, lock: -1, to: -1 }),
        He.fill(0));
      for (const r in cn) delete cn[r];
    }
    {
      const r = d.s0,
        h = d.s0 + 0.5,
        k = d.s1,
        o = Xt,
        z = 0.01;
      (o.to >= 0 && Math.abs(e - o.to) < 0.01 && (o.to = -1),
        o.to >= 0
          ? (o.stage = e >= k ? 2 : e > r ? 1 : 0)
          : e < d.down || e > d.u0
            ? ((o.stage = e > d.u0 ? 2 : 0),
              (o.k = [0, 0.7, 1][o.stage]),
              (o.lock = -1))
            : e <= r && o.lock < 0
              ? (o.stage = 0)
              : e >= k && o.lock < 0
                ? (o.stage = 2)
                : o.stage === 0 && e > r + z
                  ? ((o.stage = 1), (o.lock = h))
                  : o.stage === 1 && e > h + z
                    ? ((o.stage = 2), (o.lock = k))
                    : o.stage === 1 && e < h - z
                      ? ((o.stage = 0), (o.lock = r))
                      : o.stage === 2 && e < k - z
                        ? ((o.stage = 1), (o.lock = h))
                        : o.lock < 0 &&
                          e > r &&
                          e < k &&
                          (o.lock = [r, h, k][o.stage]));
      const I = [0, 0.7, 1][o.stage],
        $ = (o.k < 0.7 || (o.k === 0.7 && I < 0.7) ? 0.7 / 2.1 : 0.3 / 1.3) * n;
      ((o.k = o.k < I ? Math.min(I, o.k + $) : Math.max(I, o.k - $)),
        o.lock >= 0 &&
          (Math.abs(scrollY - o.lock * u) > 1 && scrollTo(0, o.lock * u),
          o.k === I && t - o.input > 260 && (o.lock = -1)));
    }
    const s = Et,
      a = s >= d.u0 ? 0 : Math.min(s, d.down),
      c = Xt.k,
      l = de(s, d.u0, d.u1),
      i = M(c / 0.7),
      m = s > d.u0,
      T = (r, h) => h * Math.pow(Math.sin(Math.PI * r), 1.4),
      x = 1 + 0.45 * xt(i) * (1 - St(M((c - 0.68) / 0.32))) - T(l, 0.42),
      w = 0;
    ws = x < 0.97;
    const L = (t - Ve) / 1e3,
      j = xt(M(L / 2.8)),
      _ = A(0.34, 1, j) * x,
      tt = -0.16 * (1 - j) + w,
      D = 1 / _,
      O = M(L / 2.6),
      G = 1 - qe(O),
      U = xt(de(a, d.flip0, d.flip1));
    if (g.v) {
      !g.started && L > 2.2 && ((g.started = !0), g.v.play().catch(() => {}));
      const r = U < 0.98 || m;
      (r && g.v.paused && !g.v.ended && g.live
        ? g.v.play().catch(() => {})
        : !r && !g.v.paused && g.v.pause(),
        r &&
          g.live &&
          g.v.readyState >= 2 &&
          g.v.currentTime !== g.t &&
          ((g.t = g.v.currentTime),
          g.art.draw(g.v) && E.upload(Lt.front, g.art.canvas)));
    }
    const et = xt(de(a, d.peel0, d.peel1)),
      C = xt(de(a, d.peel1, d.trav1)),
      lt = bt.length,
      Ut = de(a, d.trav1, d.proj1) * lt,
      we =
        Ut >= lt
          ? lt
          : Math.floor(Ut) + St(M((Ut - Math.floor(Ut) - 0.3) / 0.5));
    let K = vt * C + zt * we;
    const gt = xt(de(a, d.tf0, d.tf1));
    let Z = Math.min(Math.max(0, a - d.tf0), d.down - d.tf0) * u;
    ((s > d.s0 || (c > 0 && s > d.down)) &&
      ((K = A(It, X.x, xt(i))), (Z = A(X.camY, 0, xt(l)))),
      (ne = K),
      (se = Z),
      (On = gt >= 1),
      J.open &&
        document.activeElement !== ge &&
        Math.abs(e - J.at) > 0.08 &&
        je(),
      B.k >= 0 &&
        (B.open && Math.abs(e - B.at) > 0.06 && (B.open = !1),
        (B.p = M(B.p + (B.open ? n : -n) / 0.85)),
        !B.open && B.p <= 0 && (B.k = -1)));
    const Y = [],
      Be = Math.max(0, (K - vt) / zt),
      re = (r) => vn + (1 - vn) * St(M(1 - Math.abs(Be - r)));
    bs = C >= 1 && a < d.tf0 && Math.abs(Be - Math.round(Be)) < 0.12;
    const Rt = Math.sin(Math.PI * U),
      Zt = -20 * Rt,
      Ot =
        (U < 0.02 || (U > 0.98 && et === 0)) && O >= 1
          ? $t(0, Zt, U > 0.5 ? 56 : 2, Q, ht, A(-0.08, 0.02, U))
          : null;
    Re(Ie, !!Ot, Ot ? Ot[0] * (U > 0.5 ? -1 : 1) : 0, Ot ? Ot[1] : 0, n);
    const We = Math.PI * U,
      Ye = n > 0 ? (We - ms) / n : 0;
    ms = We;
    const Fe =
      (1.3 * Rt +
        M(Ye * 0.14, -0.7, 0.7) +
        Ie.bow * 0.3 * (U > 0.5 ? -1 : 1) +
        G * (0.6 + 0.4 * Math.sin(L * 3.1))) /
      Q;
    ((Cn += ((Fe - Hn) * 130 - Cn * 13) * n), (Hn += Cn * n));
    const Qt = {
      mode: 1,
      pos: [G * 70 * Math.sin(L * 1.9), Zt - G * 40, 0],
      size: [Q, ht],
      rot: [
        A(-0.08, 0.02, U) - G * 0.55,
        0.12 * Rt + Ie.rx * 0.6 + G * 0.25 * Math.sin(L * 2.3),
        Ie.ry * 0.6 + G * 0.2 * Math.cos(L * 1.7),
      ],
      bend: [We, Hn],
      texA: Lt.front,
      texB: et > 0 ? Lt.backPeeled : Lt.back,
      gloss: 0.55,
      glossBack: 0.18,
      sheen: 0.14,
    };
    let ce = 1 / 0;
    for (let r = 0; r <= 12; r++)
      for (const h of [-0.5, 0.5])
        ce = Math.min(ce, E.point(Qt, (r / 12 - 0.5) * Q, h * ht)[2]);
    const dt = Rt * 230 + 55 * U * (1 - et) + G * 900 + Ie.z * 0.6;
    ((Qt.pos[2] = Math.max(dt, -ce + 1.5)), m || Y.push(Qt));
    const q = [
        {
          id: "card",
          obj: Qt,
          stable: !m && O >= 1 && (U < 0.004 || (U > 0.996 && et === 0)),
        },
      ],
      Ne = Print.backLayout(P, (ht / Q) * 1e3),
      At = Ne.slot,
      lo = (At.w * Print.SH) / Print.SW,
      ho = (0.5 - (At.x + At.w / 2) / 1e3) * Q,
      uo = ((At.y + lo / 2) / Ne.H - 0.5) * ht;
    if (((Ze = null), et > 0 || C > 0)) {
      const r = E.point(Qt, ho, uo),
        h = (At.w / 1e3) * Q,
        k = et * (1 - C),
        o = C >= 1 && !Ae ? $t(vt, ue, 1, Wt * re(0), te * re(0), gn[0]) : null;
      Re(wt, !!o, o ? o[0] : 0, o ? o[1] : 0, n);
      const z = h * Math.pow((Wt * re(0)) / h, C),
        I = (0.35 * wt.bow) / z,
        $ = {
          pos: [A(r[0], vt, C), A(r[1], ue, C), 0],
          size: [z, (z * Print.SH) / Print.SW],
          rot: [
            A(Qt.rot[0] + Print.SLOT_ROT, gn[0], C) +
              0.14 * Math.sin(Math.PI * C),
            0.16 * k + wt.rx,
            wt.ry,
          ],
          bend: [-0.45 * k, (2.4 * k) / z + I],
          texA: Lt.cover,
          gloss: 0.06,
          sheen: 0.2,
        },
        nt = A(r[2] + 0.6, 0.8, C) + k * 90 + Math.sin(Math.PI * C) * 230;
      C < 1 && (wt.p = 0);
      const Mt = wt.p > 0 ? Ms($, wt, ts) : 0;
      (C >= 1 ? ae($, nt + wt.z + Mt) : ($.pos[2] = nt),
        (Ze = $),
        (es = C < 1),
        Ae ||
          (Y.push($),
          q.push({ id: "cover", obj: $, stable: C >= 1 && wt.p === 0 })));
    }
    ((Qe.length = 0),
      bt.forEach((r, h) => {
        const k = vt + (h + 1) * zt,
          o = ue + (h % 2 ? 8 : -6),
          z = gn[h + 1];
        if (Math.abs(k - K) > p * D + Wt || O < 1) return;
        !He[h] && K > k - zt * 0.3 && (He[h] = t);
        const I = He[h] ? (t - He[h]) / 1e3 : -1,
          $ = I >= 0 && I < 0.35 ? Math.sin((Math.PI * I) / 0.35) : 0,
          nt = h === lt - 1 && gt > 0;
        if (nt && gt >= 1) return;
        const Mt = re(h + 1),
          yt = Le[h],
          jt = nt || tn === h ? null : $t(k, o, 1, Wt * Mt, te * Mt, z);
        Re(yt, !!jt, jt ? jt[0] : 0, jt ? jt[1] : 0, n);
        const f = Mt * (1 - $ * 0.02),
          y = Wt * f,
          b = (0.35 * yt.bow) / y;
        let S;
        if (nt) {
          const H = R.cards[0],
            W = gt,
            V = Math.sin(Math.PI * W),
            ut = V * V,
            it = t / 1e3,
            at = xt(M((W - 0.15) / 0.7)),
            pt = A(y, H.w, W),
            st = A(te * f, H.h, St(M((at - 0.3) / 0.4)));
          S = ae(
            {
              mode: 1,
              pos: [A(k, H.x, W), A(o, H.y, W), 0],
              size: [pt, st],
              rot: [
                A(z, H.r, W) + 0.35 * V,
                0.12 * V + 0.07 * ut * Math.sin(it * 2.2),
                0.06 * ut * Math.sin(it * 1.7 + 1),
              ],
              bend: [
                Math.PI * at,
                (1.1 * V + 0.25 * ut * Math.sin(it * 2.6)) / pt,
              ],
              texA: Ht[h].inked,
              texB: pe[0],
              gloss: 0.06,
              glossBack: 0.1,
              sheen: 0.2,
            },
            0.8 + V * 240,
          );
        } else {
          const H = I < 0 ? 0 : St(M((I - 0.06) / 0.14));
          S = {
            pos: [k, o, 0],
            size: [y, te * f],
            rot: [z, yt.rx, yt.ry],
            bend: [0, b],
            texA: Ht[h].plain,
            texB: Ht[h].inked,
            mixB: H,
            gloss: 0.06,
            sheen: 0.2,
          };
          let W = 0;
          (yt.p > 0 &&
            ((S.texA = H > 0.5 ? Ht[h].inked : Ht[h].plain),
            (W = Ms(S, yt, Ht[h].back))),
            ae(S, 0.8 + yt.z - $ * 0.6 + W));
        }
        if (
          (nt && (yt.p = 0),
          nt || (Qe[h] = { obj: S, X: k, Y: o, r: z }),
          tn === h)
        )
          return;
        (Y.push(S), q.push({ id: "p" + h, obj: S, stable: !nt && yt.p === 0 }));
        const ot = S.size[0] / Print.SW,
          F = S.size[1] / Print.SH;
        Ht[h].stickers.forEach((H, W) => {
          const V = I < 0 ? 0 : M((I - 0.3 - W * 0.16) / 0.45);
          if (V <= 0) return;
          const ut = xn(V),
            it = ln(S, H.cx * ot, H.cy * F);
          if (nt && it.n[2] < 0.05) return;
          const at = z + H.r + (1 - ut) * 0.5,
            [pt, st] = Oe(it.n, at),
            kt = 1.4 + (1 - qe(V)) * 60,
            le = {
              pos: it.p.map((Tt, Ge) => Tt + it.n[Ge] * kt),
              size: [H.w * ot * (1.4 - 0.4 * ut), H.h * ot * (1.4 - 0.4 * ut)],
              rot: [at, pt, st],
              texA: H.tex,
              alpha: Math.min(1, V * 5),
              gloss: 0.25,
              sheen: 0.1,
            };
          (Y.push(le),
            q.push({
              id: `p${h}s${W}`,
              obj: le,
              stable: V >= 1 && !nt,
              fit: 0.8,
            }));
        });
      }));
    const Hs = C > 0.6;
    Hs !== oe.on && ((oe.on = Hs), (oe.at = t));
    const Cs = (t - oe.at) / 1e3,
      po = Yt.letters.length,
      $s = M(K, vt, vt + lt * zt),
      fo = ue - te / 2 - 30 - Yt.height / 2;
    if (
      (Yt.letters.forEach((r, h) => {
        r.x === null && (r.x = $s);
        const k = ($s - r.x) * r.k - r.v * 2 * Math.sqrt(r.k) * 0.62;
        ((r.v += k * n), (r.x += r.v * n));
        const o = oe.on
          ? M((Cs - h * 0.055) / 0.45)
          : 1 - M((Cs - (po - 1 - h) * 0.025) / 0.22);
        if (o <= 0) return;
        const z = oe.on ? xn(o) : o,
          I = Math.min(16, Math.abs(r.v) * 0.012),
          $ = {
            pos: [r.x + r.ox, fo + r.oy, r.z + I + (1 - qe(o)) * 60],
            size: [r.w * (1.4 - 0.4 * z), r.h * (1.4 - 0.4 * z)],
            rot: [
              r.r + (1 - z) * 0.5 + M(-r.v * 15e-5, -0.1, 0.1),
              0,
              M(r.v * 1e-4, -0.08, 0.08),
            ],
            texA: r.tex,
            alpha: Math.min(1, o * 5),
            gloss: 0.3,
          };
        (Y.push($),
          q.push({ id: "t" + h, obj: $, stable: oe.on && o >= 1, fit: 0.85 }));
      }),
      R && pe.length)
    ) {
      const r = (f, y) => Math.abs(f - Z) < (u / 2) * D + y,
        h = (f, y, b) => {
          const S = xn(y);
          return (
            (f.size = f.size.map((ot) => ot * (1.4 - 0.4 * S))),
            (f.rot[0] += (1 - S) * 0.5),
            (f.alpha = Math.min(1, y * 5)),
            b * (1 - qe(y))
          );
        },
        k = (f, y, b) => {
          let S = (y * f.w) / f.h;
          return (S > b && ((y *= b / S), (S = b)), [S, y]);
        };
      if (Ft && gt > 0 && r(R.title.y, R.title.h)) {
        const f = R.title,
          y = M(((t - Yn("title", t)) / 1e3 - 0.1) / 0.5),
          b = {
            pos: [f.x, f.y, 0],
            size: [f.w, (f.w * Ft.h) / Ft.w],
            rot: [-0.015, 0, 0],
            texA: Ft.tex,
            gloss: 0.3,
            sheen: 0.1,
          };
        ((b.pos[2] = 0.6 + h(b, y, 60)),
          y > 0 &&
            (Y.push(b),
            q.push({ id: "tt", obj: b, stable: y >= 1, fit: 0.85 })));
      }
      gt > 0 &&
        Se.forEach((f, y) => {
          const b = R.cards[y],
            S = y === 0,
            ot = B.k === y;
          if ((S && gt < 1) || (!ot && !r(b.y, b.h))) return;
          const F = ys[y],
            H = B.k >= 0 ? null : $t(b.x, b.y, 1, b.w, b.h, b.r);
          Re(F, !!H, H ? H[0] * (S ? -1 : 1) : 0, H ? H[1] : 0, n);
          let W = [b.x, b.y, 0],
            V = [b.r, F.rx, F.ry],
            ut = (0.35 * F.bow) / b.w,
            it = 0.8 + F.z;
          if (ot) {
            const he = B.p,
              yn = Math.sin(Math.PI * he),
              Un = St(M(he / 0.7)),
              ke = xt(M((he - 0.15) / 0.85)),
              xo = Math.max(1.05, Math.min((0.8 * u) / b.h, (0.92 * p) / b.w));
            ((W = [A(b.x, K, ke), A(b.y, Z, ke), 0]),
              (V = [
                A(b.r, 0, ke),
                A(F.rx, 0, Un) + 0.1 * yn + 0.012 * ke * Math.sin(t / 900),
                A(F.ry, 0, Un) + 0.01 * ke * Math.sin(t / 1300 + 1),
              ]),
              (ut = (1.3 * yn + 0.18 * ke) / b.w),
              (it = A(it, Scene.D * (1 - 1 / xo), Un)));
          }
          const at = ae(
            {
              mode: S ? 1 : 0,
              pos: W,
              size: [b.w, b.h],
              rot: V,
              bend: [S ? Math.PI : 0, ut * (S ? -1 : 1)],
              texA: S ? Ht[lt - 1].inked : pe[y],
              texB: pe[y],
              gloss: 0.1,
              glossBack: 0.1,
              sheen: 0.2,
              dapple: ot ? 0.6 * B.p : 0,
            },
            it,
          );
          (Y.push(at), q.push({ id: "q" + y, obj: at, stable: !ot }));
          const pt = f.client && en[f.client];
          if (!pt || (!ot && !r(b.y, -40))) return;
          const st = M(((t - Yn("q" + y, t)) / 1e3 - (S ? 0.15 : 0.3)) / 0.45);
          if (st <= 0) return;
          const kt = b.w * (P ? 0.28 : 0.36),
            le = -b.h * (P ? 0.44 : 0.42),
            Tt = ln(at, S ? -kt : kt, le);
          Tt.n[2] < 0 && (Tt.n = Tt.n.map((he) => -he));
          const [Ge, _n] = k(pt, R.cardSticker, b.w * 0.38),
            qt = {
              pos: [0, 0, 0],
              size: [Ge, _n],
              rot: [b.r + (y % 2 ? -0.16 : 0.14), 0, 0],
              texA: pt.tex,
              gloss: 0.3,
              sheen: 0.1,
              dapple: at.dapple,
            },
            mn = 1.4 + h(qt, st, 60),
            [Ke, Me] = Oe(Tt.n, qt.rot[0]);
          ((qt.rot[1] = Ke),
            (qt.rot[2] = Me),
            (qt.pos = Tt.p.map((he, yn) => he + Tt.n[yn] * mn)),
            Y.push(qt),
            q.push({ id: "qs" + y, obj: qt, stable: st >= 1, fit: 0.8 }));
        });
      const o = R.sheet,
        z = Te && r(o.y, o.H / 2) && Math.abs(o.x - K) < (p / 2) * D + o.W / 2,
        I = z && B.k < 0 && !J.open ? $t(o.x, o.y, 1, o.W, o.H, o.r) : null;
      Re(Ce, !!I, I ? I[0] : 0, I ? I[1] : 0, n);
      const $ = (0.35 * Ce.bow) / o.W,
        nt = ae(
          {
            pos: [o.x, o.y, 0],
            size: [o.W, o.H],
            rot: [o.r, Ce.rx * 0.3, Ce.ry * 0.3],
            bend: [0, $],
            texA: Te,
            gloss: 0.5,
            sheen: 0.34,
          },
          0.5 + Ce.z * 0.5,
        );
      z && (Y.push(nt), q.push({ id: "sheet", obj: nt, stable: !0 }));
      const Mt = (f, y) => ln(nt, f - o.W / 2, y - o.H / 2),
        yt = o.y - o.H / 2;
      (!Gt.on && Z > yt - u * 0.05
        ? ((Gt.on = !0), (Gt.at = t))
        : Gt.on && Z < yt - u * 0.35 && ((Gt.on = !1), (Gt.at = t)),
        R.stickers.forEach((f, y) => {
          const b = en[f.id];
          if (!b) return;
          const S = o.slots[f.id],
            ot = Math.hypot(
              o.x - o.W / 2 + S.x - f.x,
              o.y - o.H / 2 + S.y - f.y,
            ),
            F = vs[f.id] || 0,
            H = Gt.on ? y * 0.14 : (Vn.length - 1 - y) * 0.07,
            W =
              (t - Gt.at) / 1e3 > H
                ? M(F + (Gt.on ? n : -n) / (1.15 + ot / 2600))
                : F;
          vs[f.id] = W;
          const [V, ut] = k(b, f.h, f.maxW);
          if (W <= 0) {
            if (gt <= 0 || !r(f.y, -50)) return;
            const Ke = M(
              ((t - Yn("l" + y, t)) / 1e3 - 0.1 - (y % 2) * 0.12) / 0.45,
            );
            if (Ke <= 0) return;
            const Me = {
              pos: [f.x, f.y, 0],
              size: [V, ut],
              rot: [f.r, 0, 0],
              texA: b.tex,
              gloss: 0.3,
              sheen: 0.1,
            };
            ((Me.pos[2] = 0.6 + h(Me, Ke, 60)),
              Y.push(Me),
              q.push({ id: "l" + y, obj: Me, stable: Ke >= 1, fit: 0.85 }));
            return;
          }
          const it = o.slots[f.id],
            at = Mt(it.x, it.y),
            pt = St(M(W / 0.18)),
            st = xt(M((W - 0.1) / 0.75)),
            kt = Math.sin(Math.PI * st),
            le = Math.sin(Math.PI * M((W - 0.84) / 0.16)),
            Tt = pt * (1 - st) + 0.22 * kt,
            Ge = Math.min(
              520,
              140 + Math.hypot(at.p[0] - f.x, at.p[1] - f.y) * 0.22,
            ),
            [_n, qt] = Oe(at.n, o.r),
            mn = {
              pos: [
                A(f.x, at.p[0], st),
                A(f.y, at.p[1], st),
                A(0.6, at.p[2] + 2, st) + kt * Ge + pt * (1 - st) * 16,
              ],
              size: [V * (1 + 0.04 * le), ut * (1 + 0.04 * le)],
              rot: [
                A(f.r, o.r, st) + kt * 0.5 * (y % 2 ? 1 : -1),
                A(0, _n, st) + kt * 0.22 * Math.sin(t / 170 + y),
                A(0, qt, st) + kt * 0.18 * Math.cos(t / 210 + y),
              ],
              bend: [-0.45 * Tt, (2.4 * Tt) / V + $ * st],
              texA: b.tex,
              gloss: 0.3,
              sheen: 0.1,
            };
          (Y.push(mn),
            q.push({ id: "l" + y, obj: mn, stable: W >= 1, fit: 0.85 }));
        }),
        (Dn = -1));
      const jt = (f, y, b, S, ot) => {
        const F = jn[f],
          H = Mt(y, b);
        Bn[f] = [H.p[0], H.p[1], H.p[2] + 1.2, S.w, S.h, o.r];
        const W = B.k < 0 && !J.open && $t(...Bn[f]);
        W && (Dn = f);
        const V = t - F.at < 420 ? 1 : ot ? 0.5 : W ? 0.4 : 0;
        F.a += (V - F.a) * (1 - Math.exp(-n * (V > F.a ? 14 : 7)));
        const [ut, it] = Oe(H.n, o.r),
          at = 2 + F.a * 40,
          pt = {
            pos: H.p.map((st, kt) => st + H.n[kt] * at),
            size: [S.w, S.h],
            rot: [o.r + F.a * 0.1, ut, it],
            bend: [-0.55 * F.a, (3 * F.a) / S.w + $],
            texA: S.tex,
            gloss: 0.3,
            sheen: 0.12,
          };
        return (
          Y.push(pt),
          q.push({ id: "c" + f, obj: pt, stable: F.a < 0.01, fit: 0.85 }),
          pt
        );
      };
      if (
        (z &&
          ee.length &&
          o.contact.forEach((f, y) => {
            jt(y, f.x, f.y, ee[y]);
          }),
        z && ze)
      ) {
        const f = o.slots.you,
          y = jt(Bt.length, f.x, f.y, ze, J.open);
        if (
          ((J.anchor = [y.pos[0], y.pos[1], y.pos[2], f.h]), J.savedAt && me)
        ) {
          const b = M((t - J.savedAt) / 140),
            S = 1.12 - 0.12 * b;
          Y.push({
            pos: y.pos.map((ot, F) => ot + [0, 0, 0.5][F]),
            size: [me.w * S, me.h * S],
            rot: [o.r - 0.14, y.rot[1], y.rot[2]],
            bend: y.bend,
            texA: me.tex,
            alpha: b * 0.9,
            gloss: 0.05,
          });
        }
      }
      if (z && $e && fe) {
        const f = o.stamp,
          y = M((t - $e) / 140),
          b = Mt(f.x, f.y),
          S = 1.12 - 0.12 * y,
          [ot, F] = Oe(b.n, o.r - 0.1);
        Y.push({
          pos: b.p.map((H, W) => H + b.n[W] * 1),
          size: [fe.w * S, fe.h * S],
          rot: [o.r - 0.1, ot, F],
          bend: [0, $],
          texA: fe.tex,
          alpha: y * 0.9,
          gloss: 0.05,
        });
      }
    }
    if ((N && Pt && N.tick(t) && E.upload(Pt, N.canvas), R && X && Pt && m)) {
      const r = X;
      let h;
      {
        const k = xt(l),
          o = Math.sin(Math.PI * l),
          z = St(M((l - 0.2) / 0.6)),
          I = St(M((z - 0.35) / 0.3)),
          $ = A(r.w, Q, k),
          nt = $ / A(r.w / r.h, Q / ht, I);
        h = ae(
          {
            mode: 1,
            pos: [A(r.x, 0, k), A(r.y, 0, k), 0],
            size: [$, nt],
            rot: [A(r.r, -0.08, k) - 0.25 * o, 0.12 * o, 0],
            bend: [Math.PI * (1 - z), (1.1 * Math.sin(Math.PI * z)) / $],
            texA: Lt.front,
            texB: Pt,
            gloss: 0.55,
            glossBack: 0.08,
            sheen: A(0.12, 0.14, k),
          },
          A(0.6, 1.5, k) + 320 * o,
        );
      }
      (Y.push(h), q.push({ id: "foot", obj: h, stable: !1 }));
    }
    if (R && X && Pt && !m && c < 1) {
      const r = X,
        h = R.sheet,
        k = M(Math.min(p, u) * 0.085, 42, 84),
        o = P ? h.x - h.W / 2 + k * 0.9 : h.x - h.W / 2 - k * 1.7,
        z = P ? h.y + h.H / 2 - k * 0.5 : h.y + h.H / 2 - k * 1.3,
        I = xt(i),
        $ = St(M((c - 0.68) / 0.32)),
        nt = A(o, r.x, I),
        Mt = A(z, r.y, I),
        yt = Math.max(
          1,
          Math.round(Math.hypot(r.x - o, r.y - z) / (2 * Math.PI * k)),
        );
      if (
        Math.abs(nt - K) < (p / 2) * D + r.w &&
        Math.abs(Mt - Z) < (u / 2) * D + r.h
      ) {
        if (!En) {
          const f = document.createElement("canvas");
          ((f.width = f.height = 256),
            Print.paper(f.getContext("2d"), 256, 256, "#fbf7ec", 41, 15),
            (En = E.texture(f)));
        }
        const jt = {
          mode: 1,
          pos: [nt, Mt, P ? A(4, 0.6, I) : 0.6],
          size: [r.w, r.h],
          rot: [A(-0.3, r.r, $), 0, 0],
          crumple: [
            1 - $,
            k,
            Math.PI - Math.PI * (2 * yt + 1) * I,
            Math.hypot(r.w, r.h) / 2,
          ],
          texA: Pt,
          texB: En,
          gloss: 0,
          glossBack: 0,
          sheen: 0,
        };
        Y.push(jt);
      }
    }
    Ct = !1;
    let Kn = !1;
    if (
      X &&
      Pt &&
      c >= 1 &&
      !m &&
      Math.abs(X.x - K) < (p / 2) * D + X.w &&
      Math.abs(X.y - Z) < (u / 2) * D + X.h
    ) {
      const r = X,
        h = ae(
          {
            pos: [r.x, r.y, 0],
            size: [r.w, r.h],
            rot: [r.r, 0, 0],
            texA: Pt,
            gloss: 0.08,
            sheen: 0.12,
          },
          0.6,
        );
      ((an = h.pos[2]), Y.push(h), q.push({ id: "foot", obj: h, stable: !0 }));
      const k = Wn ? 1 - (t - Wn) / 420 : 0;
      (k > 0 &&
        Y.push({
          ...h,
          pos: [r.x, r.y, an + 0.3],
          texA: Pn,
          alpha: 0.75 * k * k,
          gloss: 0,
          sheen: 0,
        }),
        (Ct = !0));
      const o = Ct && v.x >= 0 && !v.touch ? Nn(v.x, v.y) : null;
      Kn =
        Kt !== null || (!!o && Math.abs(o[0]) <= 0.5 && Math.abs(o[1]) <= 0.5);
    }
    no(K, Z, Kn);
    {
      (Xt.lock >= 0 ||
        Ct ||
        B.k >= 0 ||
        J.open ||
        Jt.getAttribute("aria-expanded") === "true" ||
        document.body.classList.contains("case") ||
        Math.abs(e - Et) > 0.002) &&
        (on = Math.max(on, t));
      const h = t - Math.max(on, Ve + 2800) > 2e3;
      (h && !Rn && xs.classList.toggle("tap", bs),
        h !== Rn && ((Rn = h), xs.classList.toggle("on", h)));
    }
    ao(Et);
    {
      const r = Et < 0.04 && !document.body.classList.contains("case");
      r !== gs && ((gs = r), Js.classList.toggle("on", r));
    }
    const Rs = [];
    (O >= 1 && v.x >= 0 && B.k < 0 && !ft.holding()
      ? (sn = ft.pick(v.x, v.y, K, p, u, Z))
      : (sn = null),
      ft.frame({
        now: t,
        cam: K,
        camY: Z,
        vw: p * D,
        vh: u,
        objects: Y,
        meshes: Rs,
        supports: q,
        hover: sn,
        dt: n,
      }));
    const Xe = t / 1e3,
      mo =
        v.x >= 0 && t - v.lt < 80
          ? {
              x: v.x - p / 2 + K,
              y: v.y - u / 2 + Z,
              vx: v.vx,
              vy: v.vy,
              speed: Math.hypot(v.vx, v.vy),
            }
          : null;
    for (
      ps.step(
        {
          t: Xe,
          dt: n,
          cam: K,
          camY: Z,
          vw: p,
          vh: u,
          zv: D,
          supports: q,
          surfaceAt: ln,
          on: O >= 1,
          toScreen: (r) => E.toScreen(r, K, Z),
          ptr: v.x >= 0 ? { x: v.x, y: v.y, moving: t - v.lt < 150 } : null,
        },
        Y,
      ),
        us.step(
          Xe,
          n,
          {
            cam: K,
            camY: Z,
            vw: p,
            vh: u,
            supports: q,
            ptr: O >= 1 ? mo : null,
          },
          Y,
        ),
        Y.sort((r, h) => r.pos[2] - h.pos[2]),
        Dt.style.cursor = Kn
          ? "none"
          : B.k >= 0 || ft.holding()
            ? "zoom-out"
            : Dn >= 0 ||
                Le.some((r) => r.z > 6) ||
                ys.some((r) => r.z > 6) ||
                (wt.z > 6 && !Ae) ||
                sn
              ? "pointer"
              : "";
      Nt.length && t - Nt[0].t > 1600;
    )
      Nt.shift();
    (zn.fill(0),
      In.fill(1),
      Nt.forEach((r, h) => {
        const k = (t - r.t) / 1e3,
          o = Math.min(1, k / 0.05) * Math.exp(-k / 0.42) * Math.cos(k * 5.5);
        let z = r.vx * 0.012,
          I = r.vy * 0.012;
        const $ = Math.hypot(z, I);
        ($ > 14 && ((z *= 14 / $), (I *= 14 / $)),
          zn.set([r.x, r.y, z * o, I * o], h * 4),
          (In[h] = 55 + k * 50));
      }),
      (v.speed *= Math.exp(-n * 2.5)));
    const yo =
      0.85 +
      0.3 * Math.sin(Xe * 0.21) * Math.sin(Xe * 0.13 + 2) +
      Math.min(v.speed / 1800, 1.1) +
      1.5 * Math.sin(Math.PI * gt);
    ((Ln += (yo - Ln) * (1 - Math.exp(-n * 1.5))),
      J.open && J.anchor && eo(K, Z),
      E.render({
        cam: K,
        camY: Z,
        time: Xe,
        gust: Ln,
        soft: 1.25,
        drags: zn,
        dragR: In,
        colors: Bs,
        objects: Y,
        meshes: Rs,
        zoom: _,
        spin: tt,
      }),
      _e(hn));
  }
  (_e(hn),
    addEventListener("click", (t) => {
      if (
        !ft ||
        t.target === ve ||
        (t.target instanceof Node &&
          (mt.contains(t.target) ||
            ct.contains(t.target) ||
            ie.contains(t.target)))
      )
        return;
      if (Jt.getAttribute("aria-expanded") === "true") {
        pn(!1);
        return;
      }
      if (rn) {
        rn = !1;
        return;
      }
      if (J.open) {
        je();
        return;
      }
      if (B.k >= 0) {
        B.open = !1;
        return;
      }
      if (ft.holding()) {
        ft.release();
        return;
      }
      const n = Ze,
        e = es ? 1.3 : 1;
      if (
        n &&
        !Ae &&
        $t(
          n.pos[0],
          n.pos[1],
          Math.max(1, n.pos[2]),
          n.size[0] * e,
          n.size[1] * e,
          n.rot[0],
          t.clientX,
          t.clientY,
        )
      ) {
        window.Case && Case.open("goalkeeper");
        return;
      }
      const s = Qe.findIndex(
        (i, m) =>
          i &&
          tn !== m &&
          window.Case &&
          Case.has(bt[m].id) &&
          $t(
            i.X,
            i.Y,
            1,
            i.obj.size[0],
            i.obj.size[1],
            i.r,
            t.clientX,
            t.clientY,
          ),
      );
      if (s >= 0) {
        Case.open(bt[s].id);
        return;
      }
      const a = ks(t.clientX, t.clientY);
      if (a >= 0) return Qs(a);
      const c = zs(t.clientX, t.clientY);
      if (c >= 0) {
        Object.assign(B, { k: c, p: 0, open: !0, at: scrollY / u });
        return;
      }
      const l = ft.pick(t.clientX, t.clientY, ne, p, u, se);
      l && ft.click(l, performance.now(), ne, se);
    }));
  const Fn = (t) => bt.findIndex((n) => n.id === t);
  ((window.Picnic = {
    art: (t) => (t === Vt.id ? Je : kn[t] || {}),
    settle: (t) =>
      new Promise((n) => {
        const e = t === Vt.id ? wt : Le[Fn(t)] || {};
        e.settle = !0;
        const s = () =>
          e.p > 0 ? requestAnimationFrame(s) : ((e.settle = !1), n());
        s();
      }),
    rect(t) {
      const n = t === Vt.id ? Ze : (Qe[Fn(t)] || {}).obj;
      if (!n) return null;
      const e = { ...n, bend: [0, 0], curl: null },
        [s, a] = e.size,
        c = (T, x) => E.toScreen(E.point(e, T, x), ne, se),
        l = c(0, 0),
        i = c(s / 2, 0),
        m = c(0, a / 2);
      return {
        x: l[0],
        y: l[1],
        w: 2 * Math.hypot(i[0] - l[0], i[1] - l[1]),
        h: 2 * Math.hypot(m[0] - l[0], m[1] - l[1]),
        r: Math.atan2(i[1] - l[1], i[0] - l[0]),
      };
    },
    hide(t, n) {
      if (t === Vt.id) {
        ((Ae = n), n && (wt.p = 0));
        return;
      }
      const e = Fn(t);
      ((tn = n ? e : -1), n && Le[e] && (Le[e].p = 0));
    },
  }),
    addEventListener("keydown", (t) => {
      if (t.key === "Escape") {
        if (Jt.getAttribute("aria-expanded") === "true") {
          (pn(!1), Jt.focus());
          return;
        }
        (B.k >= 0 && (B.open = !1), J.open && je());
      }
    }));
  function ks(t, n) {
    return !R || !On ? -1 : Bn.findIndex((e) => e && $t(...e, t, n));
  }
  function Qs(t) {
    if (((jn[t].at = performance.now()), t === Bt.length)) return to();
    const n = Bt[t];
    if (n.id === "email")
      n.value &&
        io(n.value)
          .then(() => {
            $e = $e || performance.now();
          })
          .catch(() => {});
    else if (n.url) {
      const e = document.createElement("a");
      ((e.href = n.url),
        (e.target = "_blank"),
        (e.rel = "noopener noreferrer"),
        document.body.appendChild(e),
        e.click(),
        e.remove());
    }
  }
  const mt = document.createElement("form");
  ((mt.id = "logo"),
    (mt.noValidate = !0),
    (mt.innerHTML =
      '<label class="sr" for="logo-email">Your email</label><input id="logo-email" type="email" name="email" autocomplete="email" inputmode="email" maxlength="254" placeholder="Type your email" required><button type="submit">Send</button><p class="err" role="status" aria-live="polite"></p>'),
    document.body.appendChild(mt));
  const ge = mt.querySelector("input"),
    dn = mt.querySelector("button"),
    un = mt.querySelector(".err");
  function to() {
    ((J.open = !0),
      (J.at = scrollY / u),
      (un.textContent = ""),
      mt.classList.add("on"),
      ge.focus({ preventScroll: !0 }));
  }
  function je() {
    ((J.open = !1), mt.classList.remove("on"), ge.blur());
  }
  function eo(t, n) {
    const [e, s, a, c] = J.anchor,
      l = Scene.D / (Scene.D - a),
      i = (e - t) * l + p / 2,
      m = (s - n) * l + u / 2,
      T = mt.offsetWidth,
      x = mt.offsetHeight;
    let w = m - (c * l) / 2 - x - 14;
    (w < 16 && (w = m + (c * l) / 2 + 14),
      (mt.style.translate = `${Math.round(M(i - T / 2, 16, p - T - 16))}px ${Math.round(M(w, 16, u - x - 16))}px`));
  }
  mt.addEventListener("submit", (t) => {
    t.preventDefault();
    const n = ge.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(n)) {
      ((un.textContent = "That doesn’t look like an email."), ge.focus());
      return;
    }
    ((dn.disabled = !0),
      (dn.textContent = "Sending…"),
      (un.textContent = ""),
      fetch(`${Sn.url}/rest/v1/${Sn.table}`, {
        method: "POST",
        headers: {
          apikey: Sn.key,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: n }),
      })
        .then((e) => {
          if (!e.ok && e.status !== 409) throw new Error(e.status);
          J.savedAt = performance.now();
          try {
            localStorage.setItem("picnic-logo", "1");
          } catch {}
          ((ge.value = ""), je());
        })
        .catch(() => {
          un.textContent = "That didn’t go through. Try again?";
        })
        .finally(() => {
          ((dn.disabled = !1), (dn.textContent = "Send"));
        }));
  });
  const ct = document.createElement("div");
  ((ct.id = "paints"),
    ct.setAttribute("role", "toolbar"),
    ct.setAttribute("aria-label", "Paints"),
    (ct.inert = !0),
    (ct.innerHTML =
      '<div class="sw">' +
      Ws.map(
        ([t, n]) =>
          `<button type="button" aria-label="${t}" aria-pressed="false" data-c="${n}" style="--c:${n}"></button>`,
      ).join("") +
      '</div><div class="sz">' +
      Ds.map(
        ([t, n], e) =>
          `<button type="button" aria-label="${t}" aria-pressed="false" data-s="${n}"><i style="--d:${[6, 12, 20][e]}px"></i></button>`,
      ).join("") +
      '<button type="button" class="tool" data-a="erase" aria-pressed="false">Eraser</button></div><div class="act"><button type="button" class="tool" data-a="clear">Start over</button><button type="button" class="tool save" data-a="save">Save</button></div>'),
    document.body.appendChild(ct));
  const _t = document.createElement("div");
  ((_t.id = "brush"),
    _t.setAttribute("aria-hidden", "true"),
    document.body.appendChild(_t));
  function Ss(t, n) {
    (ct
      .querySelectorAll("[data-c]")
      .forEach((e) =>
        e.setAttribute("aria-pressed", String(!n && e.dataset.c === t)),
      ),
      ct
        .querySelectorAll("[data-s]")
        .forEach((e) =>
          e.setAttribute("aria-pressed", String(+e.dataset.s === N.brush)),
        ),
      ct
        .querySelectorAll("[data-s] i")
        .forEach((e) => (e.style.background = n ? "#fff" : t)),
      ct
        .querySelector('[data-a="erase"]')
        .setAttribute("aria-pressed", String(n)),
      _t.style.setProperty("--c", n ? "rgba(255, 255, 255, 0.6)" : t),
      _t.classList.toggle("erase", n));
  }
  ct.addEventListener("click", (t) => {
    const n = t.target instanceof Element && t.target.closest("button");
    !n ||
      !N ||
      (n.dataset.c
        ? N.set(n.dataset.c)
        : n.dataset.s
          ? N.setSize(+n.dataset.s)
          : n.dataset.a === "erase"
            ? N.erase(!N.eraser)
            : n.dataset.a === "clear"
              ? N.clear(performance.now())
              : n.dataset.a === "save" &&
                (N.save("aarya-wtf.png"), (Wn = performance.now())),
      Ss(N.colour, N.eraser));
  });
  let Ps = !1;
  function no(t, n, e) {
    if (
      (Ct !== Ps &&
        ((Ps = Ct), ct.classList.toggle("on", Ct), (ct.inert = !Ct)),
      Ct)
    ) {
      const s = X,
        a = s.x - t + p / 2,
        c = s.y + s.h / 2 - n + u / 2 + s.gap;
      ct.style.translate = `${Math.round(a - ct.offsetWidth / 2)}px ${Math.round(c)}px`;
    }
    if ((_t.classList.toggle("on", e && !v.touch), e && N)) {
      const s = N.size * (Scene.D / (Scene.D - an));
      ((_t.style.width = _t.style.height = `${s}px`),
        (_t.style.translate = `${v.x - s / 2}px ${v.y - s / 2}px`));
    }
  }
  function Nn(t, n) {
    const e = X,
      s = Scene.D / (Scene.D - an),
      a = (t - ((e.x - ne) * s + p / 2)) / s,
      c = (n - ((e.y - se) * s + u / 2)) / s,
      l = Math.cos(-e.r),
      i = Math.sin(-e.r);
    return [(a * l - c * i) / e.w, (a * i + c * l) / e.h];
  }
  function Es(t, n) {
    if (!Ct || !N) return null;
    const e = Nn(t, n);
    return Math.abs(e[0]) <= 0.5 && Math.abs(e[1]) <= 0.5 ? e : null;
  }
  (Dt.addEventListener("pointerdown", (t) => {
    if (((rn = !1), t.button > 0 || Kt !== null)) return;
    const n = Es(t.clientX, t.clientY);
    if (n) {
      ((Kt = t.pointerId), (rn = !0));
      try {
        Dt.setPointerCapture(t.pointerId);
      } catch {}
      N.down(n[0], n[1]);
    }
  }),
    Dt.addEventListener("pointermove", (t) => {
      if (t.pointerId !== Kt) return;
      const n = t.getCoalescedEvents ? t.getCoalescedEvents() : [];
      for (const e of n.length ? n : [t]) {
        const s = Nn(e.clientX, e.clientY);
        N.move(s[0], s[1]);
      }
    }));
  function As() {
    Kt !== null && ((Kt = null), N.up());
  }
  (Dt.addEventListener("pointerup", (t) => {
    t.pointerId === Kt && As();
  }),
    Dt.addEventListener("pointercancel", (t) => {
      t.pointerId === Kt && As();
    }),
    Dt.addEventListener(
      "touchstart",
      (t) => {
        const n = t.touches[0];
        t.touches.length === 1 &&
          Es(n.clientX, n.clientY) &&
          t.preventDefault();
      },
      { passive: !1 },
    ),
    Dt.addEventListener(
      "touchmove",
      (t) => {
        Kt !== null && t.preventDefault();
      },
      { passive: !1 },
    ));
  const Xn = [
      ["hello", "Hello", "#f6c945", "#141210", () => 0],
      ["work", "Work", "#2442c6", "#fff8e4", () => d.trav1],
      ["words", "Kind words", "#f08aa8", "#141210", () => d.tf1],
      ["hi", "Say hi", "#d8322a", "#fff8e4", () => d.down],
      ["colour", "Colour in", "#3f9a4f", "#fff8e4", () => d.s1],
    ],
    so = [-3, 2, -1.5, 3, -2.5],
    oo =
      '<svg class="pm" viewBox="0 0 70 40" aria-hidden="true"><g fill="none" stroke="#c2303a" stroke-width="2.2" stroke-linecap="round"><circle cx="17" cy="20" r="13"/><path d="M34 11q4-4 8 0t8 0t8 0t8 0M34 20q4-4 8 0t8 0t8 0t8 0M34 29q4-4 8 0t8 0t8 0t8 0"/></g></svg>',
    ie = document.createElement("nav");
  ((ie.id = "nav"),
    ie.setAttribute("aria-label", "Sections"),
    (ie.innerHTML =
      '<button type="button" class="open" aria-expanded="false" aria-controls="nav-sheet" aria-label="Menu"><img alt=""></button><div id="nav-sheet" class="sheet">' +
      Xn.map(
        ([t, n], e) =>
          `<button type="button" class="st" data-k="${t}" aria-label="${n}" style="--r:${so[e]}deg;--d:${60 + e * 60}ms"><img alt="">${oo}</button>`,
      ).join("") +
      "</div>"),
    document.body.appendChild(ie));
  const Jt = ie.querySelector(".open"),
    be = ie.querySelector(".sheet");
  ((be.inert = !0),
    Promise.all([
      document.fonts.load("600 12px 'Geist Mono'"),
      xe("clients/logo.svg").catch(() => null),
    ]).then(([, t]) => {
      ((Jt.querySelector("img").src = Print.navStamp(
        "logo",
        "",
        "#fbf6ea",
        "#141210",
        t,
      ).toDataURL()),
        Xn.forEach(([n, e, s, a], c) => {
          be.children[c].querySelector("img").src = Print.navStamp(
            n,
            e,
            s,
            a,
          ).toDataURL();
        }));
    }));
  function pn(t) {
    (Jt.setAttribute("aria-expanded", String(t)),
      be.classList.toggle("on", t),
      (be.inert = !t));
  }
  (Jt.addEventListener("click", () => {
    const t = Jt.getAttribute("aria-expanded") !== "true";
    pn(t);
  }),
    be.addEventListener("click", (t) => {
      const n = t.target instanceof Element && t.target.closest(".st");
      if (!n) return;
      const e = Xn.find((s) => s[0] === n.dataset.k)[4]();
      (pn(!1),
        B.k >= 0 && (B.open = !1),
        J.open && je(),
        (Xt.to = e),
        (Xt.lock = -1),
        scrollTo({
          top: e * u,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        }));
    }));
  let Ts = -1;
  function ao(t) {
    const n =
      t < d.peel1 || t >= d.u0
        ? 0
        : t < d.tf0
          ? 1
          : t < d.sheet
            ? 2
            : t < d.s0 + 0.3
              ? 3
              : 4;
    n !== Ts &&
      ((Ts = n),
      [...be.children].forEach((e, s) =>
        e.setAttribute("aria-current", String(s === n)),
      ));
  }
  function io(t) {
    let n = !1;
    try {
      const e = document.createElement("textarea");
      ((e.value = t),
        e.setAttribute("readonly", ""),
        (e.style.cssText = "position:fixed;top:0;left:0;opacity:0"),
        document.body.appendChild(e),
        e.select(),
        e.setSelectionRange(0, t.length),
        (n = document.execCommand("copy")),
        e.remove());
    } catch {}
    return n
      ? Promise.resolve()
      : navigator.clipboard
        ? Promise.race([
            navigator.clipboard.writeText(t),
            new Promise((e, s) => setTimeout(s, 1500)),
          ])
        : Promise.reject();
  }
  function zs(t, n) {
    if (!R || !On) return -1;
    for (let e = R.cards.length - 1; e >= 0; e--) {
      const s = R.cards[e];
      if ($t(s.x, s.y, 1, s.w, s.h, s.r, t, n)) return e;
    }
    return -1;
  }
  const ve = Ue("#sound"),
    ro = [...ve.querySelectorAll("i")],
    fn = [],
    co = (t) => {
      (fn.forEach(clearTimeout), (fn.length = 0));
      const n = matchMedia("(prefers-reduced-motion: reduce)").matches;
      ro.forEach((e, s) => {
        if (!t) {
          e.style.height = "";
          return;
        }
        if (n) {
          e.style.height = [12, 18, 12][s] + "px";
          return;
        }
        const a = s === 1 ? 20 : 14,
          c = () => {
            const l = 120 + Math.random() * 160;
            (e.style.setProperty("--d", (l / 1e3).toFixed(2) + "s"),
              (e.style.height = (6 + Math.random() * a).toFixed(1) + "px"),
              (fn[s] = setTimeout(c, l)));
          };
        fn[s] = setTimeout(c, s * 70);
      });
    },
    Is = (t) => {
      try {
        localStorage.setItem("picnic-sound", t ? "1" : "0");
      } catch {}
    },
    Gn = (t) => {
      (Garden.set(t),
        ft && ft.setRadio(t),
        ve.setAttribute("aria-pressed", String(t)),
        ve.setAttribute("aria-label", t ? "Sound on" : "Sound off"),
        co(t));
    };
  ve.addEventListener("click", () => {
    const t = !Garden.on;
    (Gn(t), Is(t));
  });
  let Ls = !1;
  try {
    Ls = localStorage.getItem("picnic-sound") === "1";
  } catch {}
  if (Ls) {
    const t = (n) => {
      (n.target instanceof Node && ve.contains(n.target)) ||
        (removeEventListener("pointerdown", t),
        removeEventListener("keydown", t),
        Garden.on || Gn(!0));
    };
    (addEventListener("pointerdown", t), addEventListener("keydown", t));
  }
  window.picnic = {
    jump(t) {
      (scrollTo(0, t * u), (Et = t));
    },
    T: d,
    roll: Xt,
    foot: () => X,
    painter: () => N,
    flies: ps,
    drop: () => us.drop(),
    held: B,
    cardAt: zs,
    contactAt: ks,
    contactState: jn,
    CONTACT: Bt,
    copied: () => {
      $e = performance.now();
    },
  };
})();
