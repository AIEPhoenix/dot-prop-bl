const s = (r) => {
  const t = typeof r;
  return r !== null && (t === "object" || t === "function");
}, y = (r) => s(r) && Object.keys(r).length === 0, d = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), c = new Set("0123456789");
function o(r) {
  const t = [];
  let n = "", e = "start", i = !1;
  for (const f of r)
    switch (f) {
      case "\\": {
        if (e === "index")
          throw new Error("Invalid character in an index");
        if (e === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (n += f), e = "property", i = !i;
        break;
      }
      case ".": {
        if (e === "index")
          throw new Error("Invalid character in an index");
        if (e === "indexEnd") {
          e = "property";
          break;
        }
        if (i) {
          i = !1, n += f;
          break;
        }
        if (d.has(n))
          return [];
        t.push(n), n = "", e = "property";
        break;
      }
      case "[": {
        if (e === "index")
          throw new Error("Invalid character in an index");
        if (e === "indexEnd") {
          e = "index";
          break;
        }
        if (i) {
          i = !1, n += f;
          break;
        }
        if (e === "property") {
          if (d.has(n))
            return [];
          t.push(n), n = "";
        }
        e = "index";
        break;
      }
      case "]": {
        if (e === "index") {
          t.push(Number.parseInt(n, 10)), n = "", e = "indexEnd";
          break;
        }
        if (e === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (e === "index" && !c.has(f))
          throw new Error("Invalid character in an index");
        if (e === "indexEnd")
          throw new Error("Invalid character after an index");
        e === "start" && (e = "property"), i && (i = !1, n += "\\"), n += f;
      }
    }
  switch (i && (n += "\\"), e) {
    case "property": {
      if (d.has(n))
        return [];
      t.push(n);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function u(r, t) {
  if (typeof t != "number" && Array.isArray(r)) {
    const n = Number.parseInt(t, 10);
    return Number.isInteger(n) && r[n] === r[t];
  }
  return !1;
}
function l(r, t) {
  if (u(r, t))
    throw new Error("Cannot use string index");
}
function w(r, t, n) {
  if (!s(r) || typeof t != "string")
    return n === void 0 ? r : n;
  const e = o(t);
  if (e.length === 0)
    return n;
  for (let i = 0; i < e.length; i++) {
    const f = e[i];
    if (u(r, f) ? r = i === e.length - 1 ? void 0 : null : r = r[f], r == null) {
      if (i !== e.length - 1)
        return n;
      break;
    }
  }
  return r === void 0 ? n : r;
}
function E(r, t, n) {
  if (!s(r) || typeof t != "string")
    return r;
  const e = r, i = o(t);
  for (let f = 0; f < i.length; f++) {
    const a = i[f];
    l(r, a), f === i.length - 1 ? r[a] = n : s(r[a]) || (r[a] = typeof i[f + 1] == "number" ? [] : {}), r = r[a];
  }
  return e;
}
function k(r, t) {
  if (!s(r) || typeof t != "string")
    return !1;
  const n = o(t);
  for (let e = 0; e < n.length; e++) {
    const i = n[e];
    if (l(r, i), e === n.length - 1)
      return delete r[i], !0;
    if (r = r[i], !s(r))
      return !1;
  }
}
function I(r, t) {
  if (!s(r) || typeof t != "string")
    return !1;
  const n = o(t);
  if (n.length === 0)
    return !1;
  for (const e of n) {
    if (!s(r) || !(e in r) || u(r, e))
      return !1;
    r = r[e];
  }
  return !0;
}
function x(r) {
  if (typeof r != "string")
    throw new TypeError("Expected a string");
  return r.replace(/[\\.[]/g, "\\$&");
}
function p(r) {
  const t = Object.entries(r);
  return Array.isArray(r) ? t.map(([n, e]) => [Number(n), e]) : t;
}
function g(r) {
  let t = "";
  for (let [n, e] of p(r))
    typeof e == "number" ? t += `[${e}]` : (e = x(e), t += n === 0 ? e : `.${e}`);
  return t;
}
function* h(r, t = []) {
  if (!s(r) || y(r)) {
    t.length > 0 && (yield g(t));
    return;
  }
  for (const [n, e] of p(r))
    yield* h(e, [...t, n]);
}
function m(r) {
  return [...h(r)];
}
export {
  m as deepKeys,
  k as deleteProperty,
  x as escapePath,
  w as getProperty,
  I as hasProperty,
  E as setProperty
};
