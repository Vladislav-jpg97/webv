'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowUpRight, Check, Copy, ExternalLink, Pencil, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { site } from '@/data/site';
import { buildMessage, chatLink, shareLink, validate } from '@/lib/telegram';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

const typeIds = ['landing', 'multipage', 'other'];
const empty = { name: '', contact: '', type: '', message: '' };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold text-white/70">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-rose-300">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null); // { text }
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  // Предвыбор типа проекта из карточек услуг / портфолио
  useEffect(() => {
    const onPrefill = (e) => {
      setValues((v) => ({ ...v, type: e.detail.type }));
      setErrors((er) => ({ ...er, type: undefined }));
      setSent(null);
    };
    window.addEventListener('vl:prefill', onPrefill);
    return () => window.removeEventListener('vl:prefill', onPrefill);
  }, []);

  // Если язык сменили — перепроверяем уже показанные ошибки на новом языке
  useEffect(() => {
    setErrors((prev) => (Object.keys(prev).length ? validate(values, t) : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const set = (key) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      return true;
    } catch {
      return false;
    }
  };

  const openChat = (text) => window.open(chatLink(text), '_blank', 'noopener,noreferrer');

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values, t);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector(`[data-field="${first}"]`)?.focus();
      return;
    }
    const text = buildMessage(values, t);
    copy(text); // запасной вариант, если Telegram не подставит текст
    openChat(text);
    setSent({ text });
  };

  const reset = () => {
    setSent(null);
    setCopied(false);
  };

  return (
    <section id="contact" data-hue="270" className="section overflow-hidden">
      {/* Анимированный фон секции */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 opacity-40">
        <div className="absolute inset-0 animate-[spin-slow_40s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgba(109,92,255,0.5),transparent_30%,rgba(47,123,255,0.45),transparent_65%,rgba(95,208,255,0.4),rgba(109,92,255,0.5))] blur-[80px]" />
      </div>

      <div className="container-x relative">
        <SectionTitle index="06" eyebrow={c.eyebrow} title={c.title} />

        <div className="mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Левая колонка: контакты */}
          <div>
            <Reveal>
              <p className="max-w-md text-fluid-body text-white/75">{c.desc}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-4">
              <a
                href={site.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group relative flex items-center gap-5 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#7a68ff_0%,#4f6bff_55%,#2f7bff_100%)] p-5 shadow-[0_24px_60px_-20px_rgba(109,92,255,0.9)] transition-transform duration-500 hover:-translate-y-1 sm:p-6"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur transition-transform duration-500 group-hover:rotate-12 sm:h-16 sm:w-16">
                  <Send size={26} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white/75">{c.telegram}</span>
                  <span className="block truncate font-display text-fluid-h4 font-semibold tracking-tight">{site.telegramHandle}</span>
                </span>
                <ArrowUpRight size={26} className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>

              <a
                href={site.phoneHref}
                className="group glass flex items-center gap-5 rounded-[1.75rem] p-5 transition duration-500 hover:-translate-y-1 hover:border-white/25 sm:p-6"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/[0.07] transition-transform duration-500 group-hover:-rotate-12 sm:h-16 sm:w-16">
                  <Phone size={24} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white/55">{c.call}</span>
                  <span className="block font-display text-fluid-h4 font-semibold tracking-tight">{site.phoneDisplay}</span>
                </span>
                <ArrowUpRight size={24} className="shrink-0 text-white/50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/40">{c.price}</p>
            </Reveal>
          </div>

          {/* Правая колонка: форма */}
          <Reveal delay={0.12} amount={0.1}>
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[70px]" />
              <AnimatePresence mode="wait" initial={false}>
                {!sent ? (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                    className="relative space-y-5"
                  >
                    <h3 className="font-display text-fluid-h4 font-semibold tracking-tight">{c.formTitle}</h3>

                    <Field id="f-name" label={c.fName} error={errors.name}>
                      <input
                        id="f-name"
                        data-field="name"
                        className="field"
                        autoComplete="name"
                        placeholder={c.phName}
                        value={values.name}
                        onChange={set('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'f-name-err' : undefined}
                      />
                    </Field>

                    <Field id="f-contact" label={c.fContact} error={errors.contact}>
                      <input
                        id="f-contact"
                        data-field="contact"
                        className="field"
                        autoComplete="off"
                        placeholder={c.phContact}
                        value={values.contact}
                        onChange={set('contact')}
                        aria-invalid={!!errors.contact}
                        aria-describedby={errors.contact ? 'f-contact-err' : undefined}
                      />
                    </Field>

                    <div>
                      <span id="f-type-label" className="mb-2 block text-[13px] font-semibold text-white/70">
                        {c.fType}
                      </span>
                      <div role="radiogroup" aria-labelledby="f-type-label" className="flex flex-wrap gap-2">
                        {typeIds.map((id, i) => {
                          const on = values.type === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              data-field={i === 0 ? 'type' : undefined}
                              onClick={() => {
                                setValues((s) => ({ ...s, type: id }));
                                setErrors((er) => ({ ...er, type: undefined }));
                              }}
                              className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                                on
                                  ? 'border-transparent bg-gradient-to-br from-accent to-electric text-white shadow-[0_8px_28px_-8px_rgba(109,92,255,0.9)]'
                                  : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              {c.types[id]}
                            </button>
                          );
                        })}
                      </div>
                      {errors.type && (
                        <p role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-rose-300">
                          <AlertCircle size={14} /> {errors.type}
                        </p>
                      )}
                    </div>

                    <Field id="f-message" label={c.fMessage} error={errors.message}>
                      <textarea
                        id="f-message"
                        data-field="message"
                        rows={4}
                        className="field resize-none"
                        placeholder={c.phMessage}
                        value={values.message}
                        onChange={set('message')}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'f-message-err' : undefined}
                      />
                    </Field>

                    <Button type="submit" size="lg" className="w-full" icon={<Send size={18} />}>
                      {c.submit}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent to-electric">
                        <Send size={20} />
                      </span>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{c.done.title}</h3>
                    </div>

                    <p className="mt-5 rounded-2xl border border-amber-300/25 bg-amber-300/[0.07] p-4 text-[14px] leading-relaxed text-amber-100">
                      {c.done.warn}
                    </p>

                    <ol className="mt-6 space-y-3">
                      {c.done.steps.map((s, i) => (
                        <li key={i} className="flex gap-3.5 text-[14.5px] leading-snug text-white/80">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-xs">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>

                    <p className="eyebrow mt-7">{c.done.preview}</p>
                    <pre className="mt-3 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-white/10 bg-black/30 p-4 font-sans text-[13.5px] leading-relaxed text-white/75">
                      {sent.text}
                    </pre>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button onClick={() => openChat(sent.text)} icon={<ExternalLink size={17} />}>
                        {c.done.again}
                      </Button>
                      <Button onClick={() => copy(sent.text)} variant="ghost" icon={copied ? <Check size={17} /> : <Copy size={17} />}>
                        {copied ? c.done.copied : c.done.copy}
                      </Button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <a
                        href={shareLink(sent.text)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                      >
                        {c.done.share}
                      </a>
                      <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-white/55 transition hover:text-white">
                        <Pencil size={14} /> {c.done.edit}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
