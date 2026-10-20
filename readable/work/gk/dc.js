(() => {
  const v = (new URLSearchParams(location.search).get("b") || "").replace(
      /[^\w-]/g,
      "",
    ),
    l = "http://www.w3.org/2000/svg",
    C = new Set(
      "536527ecec9b933db2d89e473cd8f4af 273ee58cb619fe3396fac17990de33d1 efe4118104cba6f076b772e38c7498a1 d29b1af891ec6706d31e0f6af6ce53d6 1bd1c207424eb25d8ebe97e24a48c0b3 a99adf15beab814547b9dfaa0cd7e7e6 962cf8cc0a0e030dd969392e2aad3cfc c83e563c70b1f527bc730e97b00db172 ff54b1e9ca36da6b6f52881eb69d9bba adfc422740ec8c5162df290249e74ea2 68559f35eeecbc671dedba3b601a56c2 3d27c6ee0755976fd196152872adfb29 c9969de6e3ef2df1fe753aeffdc4eeab 309014748ceef49054bfaeb2c9f97bb2 803ef26a65efb80750acb4998b63d613 861810427cbbf1e2cf5a1c87a8125d98 35b9819ff2677596544976f33747fd60 56a97072e91829d51ec5c718caf0f24d eb3ef331bf309f9cc67d6215d1753c21 e644bd9d25e60804065fe40d78b78ecf 56f20fd6bff5024e83542103180232d6 c6cc1094d8c3a05c2c38fc596aa23598 0b0c79b39cb497faa7ad656b6bca767c 786bac5dc8f59c6291499d4dfa9904a5 217aa1dde170a8443a7c9d849fea05fd ffb63f0255059f253a0978a0b63b493d 995fdbed1c032d51f659c091518a77fb dffbf2e1a3494cfb2f8eb5b57930068c c18e40f7efd39efacf9ad800def39d14 2aafdd84758c6ea94df13597b50d608a 658b6685d184453da05caf7e4ae422bc".split(
        " ",
      ),
    ),
    y = (e) =>
      String(e).replace(
        /\/_blob\/([0-9a-f]{32})/g,
        (t, r) => "blob/" + r + (C.has(r) ? ".png" : ".webp"),
      );
  let g = !0;
  addEventListener("message", (e) => {
    e.data && typeof e.data.run == "boolean" && (g = e.data.run);
  });
  const E = setInterval;
  window.setInterval = (e, t, ...r) =>
    E(() => {
      g && e(...r);
    }, t);
  const k = /\{\{\s*([\w$.]+)\s*\}\}/g,
    N = /^\{\{\s*([\w$.]+)\s*\}\}$/;
  function u(e, t) {
    return e === "true"
      ? !0
      : e === "false"
        ? !1
        : /^-?\d+(\.\d+)?$/.test(e)
          ? +e
          : e.split(".").reduce((r, c) => r?.[c], t);
  }
  const w = (e, t) =>
    e
      .replace(/\{\{\{\{/g, "{{")
      .replace(/\}\}\}\}/g, "}}")
      .replace(k, (r, c) => {
        const a = u(c, t);
        return a ?? "";
      });
  function _(e) {
    if (e.nodeType === 3) {
      const n = e.nodeValue;
      return n.includes("{{") ? (f) => w(n, f) : () => n;
    }
    if (e.nodeType !== 1) return () => null;
    const t = e.localName,
      r = Array.from(e.childNodes).map(_),
      c = (n) =>
        r.flatMap((f) => {
          const s = f(n);
          return s == null ? [] : Array.isArray(s) ? s : [s];
        });
    if (t === "sc-for") {
      const n = e.getAttribute("list").match(/[\w$.]+/)[0],
        f = e.getAttribute("as") || "item";
      return (s) =>
        (u(n, s) || []).flatMap((b, d) => c({ ...s, [f]: b, $index: d }));
    }
    if (t === "sc-if") {
      const n = e.getAttribute("value").match(/[\w$.]+/)[0];
      return (f) => (u(n, f) ? c(f) : null);
    }
    const a = e.namespaceURI === l ? l : null,
      o = Array.from(e.attributes).map((n) => {
        const f = n.value.match(N);
        return {
          n: n.name,
          v: n.value,
          w: f && f[1],
          h: n.value.includes("{{"),
        };
      });
    return (n) => {
      const f = {};
      return (
        o.forEach((s) => {
          f[s.n] = s.w ? u(s.w, n) : s.h ? w(s.v, n) : s.v;
        }),
        { tag: t, ns: a, props: f, kids: c(n) }
      );
    };
  }
  function x(e) {
    if (typeof e != "object") return document.createTextNode(String(e));
    const t = e.ns
      ? document.createElementNS(e.ns, e.tag)
      : document.createElement(e.tag);
    return ((t.__p = {}), t);
  }
  function L(e, t) {
    return typeof t != "object"
      ? e.nodeType === 3
      : e.nodeType === 1 &&
          e.localName === t.tag &&
          (e.namespaceURI === l) == (t.ns === l);
  }
  function M(e, t) {
    const r = e.__p;
    for (const c in r) c in t || e.removeAttribute(c);
    for (const c in t) {
      let a = t[c];
      if (c === "onclick") {
        ((e.__click = a),
          e.__on ||
            ((e.__on = !0),
            e.addEventListener("click", (o) => e.__click && e.__click(o))));
        continue;
      }
      if (c === "ref") {
        typeof a == "function" && a(e);
        continue;
      }
      c.startsWith("hint-") ||
        (c === "src" && a && (a = y(a)),
        c === "style" && a && (a = y(a)),
        r[c] !== a &&
          (a == null || a === !1
            ? e.removeAttribute(c)
            : e.setAttribute(c, a === !0 ? "" : String(a))));
    }
    e.__p = t;
  }
  function S(e, t) {
    const r = e.childNodes;
    for (
      t.forEach((c, a) => {
        let o = r[a];
        if (!o || !L(o, c)) {
          const n = x(c);
          (o ? e.replaceChild(n, o) : e.appendChild(n), (o = n));
        }
        if (typeof c != "object") {
          const n = String(c);
          o.nodeValue !== n && (o.nodeValue = n);
          return;
        }
        (M(o, c.props), S(o, c.kids));
      });
      r.length > t.length;
    )
      e.removeChild(e.lastChild);
  }
  class $ {
    constructor(t) {
      ((this.props = t || {}), (this.state = {}));
    }
    setState(t, r) {
      const c = typeof t == "function" ? t(this.state, this.props) : t;
      (c && (this.state = { ...this.state, ...c }),
        this.__dirty(),
        r && queueMicrotask(r));
    }
    forceUpdate() {
      this.__dirty();
    }
  }
  async function q() {
    const e = await (await fetch("boards/" + v + ".dc.html")).text(),
      t = new DOMParser().parseFromString(e, "text/html"),
      r = t.querySelector("x-dc"),
      c = r.querySelector("helmet");
    if (
      (c &&
        (Array.from(c.children).forEach((i) =>
          document.head.appendChild(document.importNode(i, !0)),
        ),
        c.remove()),
      !(window.CSS && CSS.supports("animation-timeline: view()")))
    ) {
      const i = document.createElement("style");
      ((i.textContent = ".away,.read,.rv{animation:none!important}"),
        document.head.appendChild(i));
    }
    const a = Array.from(r.childNodes).map(_),
      o = t.querySelector("script[data-dc-script]");
    let n = {};
    try {
      n = JSON.parse(o.getAttribute("data-props") || "{}");
    } catch {}
    const f = {};
    Object.keys(n).forEach((i) => {
      i[0] !== "$" && n[i] && "default" in n[i] && (f[i] = n[i].default);
    });
    const s = new Function(
        "DCLogic",
        o.textContent +
          `
;return Component;`,
      )($),
      b = document.getElementById("root"),
      d = new s(f);
    let h = !1;
    const A = () => {
      h = !1;
      const i = d.renderVals();
      S(
        b,
        a.flatMap((p) => {
          const m = p(i);
          return m == null ? [] : Array.isArray(m) ? m : [m];
        }),
      );
    };
    ((d.__dirty = () => {
      h || ((h = !0), queueMicrotask(A));
    }),
      A(),
      d.componentDidMount && d.componentDidMount(),
      b.addEventListener("click", (i) => {
        const p = i.target.closest("a[href]");
        p && /\.dc\.html/.test(p.getAttribute("href")) && i.preventDefault();
      }));
  }
  q();
})();
