import { useEffect } from "react";
import { useSelector } from "react-redux";

function HeadInjector() {
  const { setting } = useSelector((state) => state.setting);
  const header_code = setting?.header_code || "";

  useEffect(() => {
    if (!header_code) return;

    // إنشاء عنصر مؤقت لتحويل string HTML لعناصر DOM
    const template = document.createElement("template");
    template.innerHTML = header_code.trim();

    // إضافة كل العناصر داخل head
    Array.from(template.content.childNodes).forEach((node) => {
      document.head.appendChild(node);
    });

    // تنظيف العناصر عند unmount (اختياري)
    return () => {
      Array.from(template.content.childNodes).forEach((node) => {
        if (document.head.contains(node)) {
          document.head.removeChild(node);
        }
      });
    };
  }, [header_code]);

  return null; // لا حاجة لعرض أي شيء
}

export default HeadInjector;
