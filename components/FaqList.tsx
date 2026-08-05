import { IoAddOutline } from "react-icons/io5";
import { faqItems } from "@/lib/content";

export function FaqList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqItems.slice(0, limit).map((item) => (
        <details key={item.question}>
          <summary>
            <span>{item.question}</span>
            <IoAddOutline aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
