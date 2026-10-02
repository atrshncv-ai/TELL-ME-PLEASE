/**
 * Блок «Купить карту и связаться» — прогон 2026-10-02, спецификация
 * `.autopilot/2026-10-02-max-vk-buttons--wip/spec.md`, Решения §1–§9.
 *
 * Живёт только на главной (`frontend/src/app/page.tsx`): по решению Ирины
 * («Только на главной», бриф → Дополнения) на карте миссий кнопок нет, там
 * остаётся только исправленный телефон в `RightsFooter`.
 *
 * Здесь живут телефон и обе ссылки — единственные экземпляры на сайте.
 * `RightsFooter` импортирует `CONTACT_PHONE`, чтобы правка номера не разъехалась
 * между подвалом и этим блоком.
 */

/** Номер Ирины — из брифа дословно. `tel:` без пробелов, как требует RFC 3966. */
export const CONTACT_PHONE = "+7 922 680 24 39"
export const CONTACT_PHONE_TEL = "tel:+79226802439"

/** ВК — профиль Ирины (спека §3). */
export const VK_URL = "https://vk.ru/id153803202"

/** MAX — ссылка-приглашение. Копируется символ в символ, `_` и `-` значимы. */
export const MAX_URL =
  "https://max.ru/u/f9LHodD0cOK6PvVzQZBFxbYR61rxE4tistD9_q-r9OnTRZmrJ434prDunJA"

/** Подпись блока — одна строка, дословно по смыслу брифа (спека §9).
 *  В ней обязаны стоять «купить карту», «Ирина» и «продлить подписку на год»:
 *  это приёмка R03, R04, R05. */
const BLOCK_CAPTION = "Купить карту, продлить подписку на год и связаться с Ириной"

/** Иконки — инлайн-SVG (спека §7): логотипы VK и MAX защищены авторским
 *  правом, а сеть на этапе сборки недоступна. Форма — читаемая, не копия. */
function VkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13.16 17.44c-5.06 0-8.28-3.53-8.4-9.36h2.8c.08 4.25 2.03 6.06 3.6 6.44V8.08h2.66v3.6c1.53-.17 3.13-1.94 3.68-3.6h2.62c-.42 2.18-2.17 3.74-3.42 4.4 1.25.53 3.25 1.92 4.02 4.96h-2.89c-.56-1.75-1.96-3.1-4.01-3.29v3.29h-.06Z" />
    </svg>
  )
}

function MaxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8.5 10.5h7" />
      <path d="M12 8v5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

/** Одна кнопка-ссылка. Внешние адреса — обычные `<a>`, не router.push (спека §4):
 *  так мессенджер открывается нативно, и переход не зависит от состояния
 *  клиентских компонентов. */
function ContactLink({
  href,
  children,
  icon,
  className,
}: {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  className: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {icon}
      {children}
    </a>
  )
}

/**
 * Блок контактов. Без пропсов и без состояния: всё, что он показывает, —
 * константы выше и подпись блока. Ни один другой файл не должен дублировать
 * эти значения.
 */
export default function ContactBlock() {
  return (
    <section
      aria-labelledby="contact-block-title"
      className="w-full rounded-3xl border border-primary-200 bg-white/90 p-4 text-center shadow-soft"
    >
      <h2
        id="contact-block-title"
        className="font-display text-lg font-extrabold tracking-tight text-primary-900"
      >
        Купить карту и связаться
      </h2>

      <p className="mx-auto mt-1 max-w-xs text-xs font-medium leading-snug text-slate-600">
        {BLOCK_CAPTION}
      </p>

      <a
        href={CONTACT_PHONE_TEL}
        className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary-200 bg-primary-50 px-4 py-3 text-sm font-extrabold text-primary-800 transition-colors hover:bg-primary-100"
      >
        <PhoneIcon />
        Позвонить {CONTACT_PHONE}
      </a>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <ContactLink href={MAX_URL} icon={<MaxIcon />} className="bg-[#7B4DFF] hover:bg-[#6933f0]">
          Написать в MAX
        </ContactLink>
        <ContactLink href={VK_URL} icon={<VkIcon />} className="bg-[#0077FF] hover:bg-[#0066e0]">
          Написать во ВКонтакте
        </ContactLink>
      </div>
    </section>
  )
}