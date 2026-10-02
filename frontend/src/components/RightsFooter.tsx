/**
 * Подвал прав — текст клиентки дословно (прогон visual-paragraphs, тикет 02, R11).
 * Отдельные строки для учителя, контакта, телефона и прав.
 *
 * Номер телефона импортируется из `ContactBlock` — единственный экземпляр на
 * сайте. Прогон 2026-10-02 (R01): номер заменён на тот, что назвала Ирина.
 */
import { CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/components/ContactBlock"

export default function RightsFooter() {
  return (
    <footer className="w-full px-4 py-6 text-center text-xs text-slate-500">
      <p>Учитель-методист Time Travel Mission Ирина Булдакова.</p>
      <p>По вопросам приобретения интерактивной карты, платформы и обучения английскому языку обращайтесь по телефону</p>
      <p>
        <a
          href={CONTACT_PHONE_TEL}
          className="font-bold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900"
        >
          {CONTACT_PHONE}
        </a>
      </p>
      <p className="mt-2">
        Все права защищены. Копирование и использование материалов сайта и таблицы
        запрещено: &quot;Политикой защиты материалов сайта&quot;.
      </p>
    </footer>
  )
}