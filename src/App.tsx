import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────
type Tab = "home" | "exercises" | "nutrition" | "programs" | "records" | "anatomy";

// ─── Ripple Hook ─────────────────────────────────────────
function useRipple() {
  const ref = useRef<HTMLElement>(null);
  const handlePointer = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--ry", `${e.clientY - rect.top}px`);
  };
  return { ref, onPointerDown: handlePointer };
}

// ─── Data ─────────────────────────────────────────────────
const exercises = [
  { id: 1, name: "اسکات", muscle: "پا", level: "متوسط", kcal: 320, sets: "4×12", icon: "🦵", color: "from-orange-500 to-red-500", desc: "یکی از بهترین حرکات پایه برای تقویت عضلات ران، سرینی و ساق پا. کل زنجیره پایین‌تنه را درگیر می‌کند." },
  { id: 2, name: "پرس سینه", muscle: "سینه", level: "متوسط", kcal: 280, sets: "4×10", icon: "💪", color: "from-blue-500 to-cyan-500", desc: "حرکت پایه‌ای برای توسعه عضلات سینه، جلو شانه و سه‌سر بازو. با هالتر یا دمبل قابل اجراست." },
  { id: 3, name: "ددلیفت", muscle: "پشت", level: "پیشرفته", kcal: 400, sets: "3×8", icon: "🏋️", color: "from-purple-500 to-pink-500", desc: "قوی‌ترین حرکت ترکیبی که عضلات پشت، پا، سرینی و کل بدن را به‌طور همزمان فعال می‌سازد." },
  { id: 4, name: "بارفیکس", muscle: "کمر", level: "متوسط", kcal: 260, sets: "3×10", icon: "🤸", color: "from-green-500 to-teal-500", desc: "بهترین حرکت برای پهنای کمر و قدرت گیره. وزن بدن را به عنوان مقاومت استفاده می‌کند." },
  { id: 5, name: "پلانک", muscle: "شکم", level: "مبتدی", kcal: 180, sets: "3×60s", icon: "🧘", color: "from-yellow-500 to-orange-500", desc: "حرکت ایزومتریک برای تقویت هسته مرکزی بدن، بهبود تعادل و پیشگیری از کمردرد." },
  { id: 6, name: "شنا سوئدی", muscle: "سینه", level: "مبتدی", kcal: 220, sets: "3×15", icon: "🤾", color: "from-rose-500 to-pink-500", desc: "حرکت وزن بدن کلاسیک برای تقویت سینه، شانه و سه‌سر. هیچ تجهیزاتی نیاز ندارد." },
  { id: 7, name: "لانگ", muscle: "پا", level: "مبتدی", kcal: 240, sets: "3×12", icon: "🦶", color: "from-indigo-500 to-purple-500", desc: "حرکت عالی برای تقویت عضلات چهارسر، همسترینگ و بهبود تعادل و هماهنگی." },
  { id: 8, name: "کرانچ", muscle: "شکم", level: "مبتدی", kcal: 150, sets: "4×20", icon: "⚡", color: "from-amber-500 to-yellow-500", desc: "تمرین کلاسیک برای تقویت عضله راست شکمی و شکل‌دهی به ناحیه میانی بدن." },
];

const nutritionData = [
  { name: "پروتئین", gram: 180, percent: 30, color: "#f97316", icon: "🥩", foods: ["مرغ", "ماهی", "تخم‌مرغ", "پنیر کوتاژ", "لبنیات"] },
  { name: "کربوهیدرات", gram: 270, percent: 45, color: "#0ea5e9", icon: "🌾", foods: ["برنج", "جو دوسر", "سیب‌زمینی شیرین", "نان سبوس‌دار"] },
  { name: "چربی", gram: 80, percent: 25, color: "#22c55e", icon: "🥑", foods: ["آووکادو", "آجیل", "روغن زیتون", "ماهی چرب"] },
];

const programs = [
  { name: "قدرتی ۱۲ هفته", level: "پیشرفته", days: 5, goal: "افزایش قدرت", icon: "💪", color: "from-orange-600 to-red-600", weeks: 12, rating: 4.9, users: "۱۲,۴۰۰" },
  { name: "چربی‌سوزی سریع", level: "متوسط", days: 4, goal: "کاهش وزن", icon: "🔥", color: "from-blue-600 to-cyan-600", weeks: 8, rating: 4.8, users: "۲۸,۷۰۰" },
  { name: "بدنسازی مبتدی", level: "مبتدی", days: 3, goal: "حجم عضله", icon: "🌱", color: "from-green-600 to-teal-600", weeks: 6, rating: 4.7, users: "۴۵,۲۰۰" },
  { name: "تناسب اندام کامل", level: "متوسط", days: 4, goal: "ترکیب بدنی", icon: "⭐", color: "from-purple-600 to-pink-600", weeks: 10, rating: 4.9, users: "۱۹,۸۰۰" },
];

const worldRecords = [
  { name: "ددلیفت هالتر", record: "۵۰۱ کیلوگرم", holder: "هافثور یولیوس بیورنسون", country: "🇮🇸 ایسلند", year: 2020, icon: "🏋️" },
  { name: "اسکات عمیق", record: "۴۹۷.۵ کیلوگرم", holder: "رِی ویلیامز", country: "🇺🇸 آمریکا", year: 2019, icon: "🦵" },
  { name: "پرس سینه", record: "۳۵۵ کیلوگرم", holder: "جیمی لگار", country: "🇺🇸 آمریکا", year: 2023, icon: "💪" },
  { name: "بارفیکس متوالی", record: "۶۵۱ تکرار", holder: "مینورو یوشیدا", country: "🇯🇵 ژاپن", year: 2022, icon: "🤸" },
  { name: "پرس بالای سر", record: "۲۲۷.۵ کیلوگرم", holder: "لاشا طالاخادزه", country: "🇬🇪 گرجستان", year: 2021, icon: "🏆" },
  { name: "دو ۱۰۰ متر", record: "۹.۵۸ ثانیه", holder: "اوسین بولت", country: "🇯🇲 جامائیکا", year: 2009, icon: "🏃" },
];

const muscleGroups = [
  { name: "سینه", latin: "Pectoralis", exercises: 24, icon: "🫁", color: "from-red-500 to-pink-500", tips: "با فشار بالا، میانی و پایین سینه را به‌طور جداگانه تمرین دهید." },
  { name: "کمر", latin: "Latissimus Dorsi", exercises: 18, icon: "🦴", color: "from-blue-500 to-indigo-500", tips: "روی پهنای کمر با حرکات کشش عمودی و روی ضخامت با کشش افقی تمرکز کنید." },
  { name: "شانه", latin: "Deltoid", exercises: 21, icon: "💎", color: "from-purple-500 to-violet-500", tips: "هر سه سر شانه (جلو، میانی، پشت) باید به‌طور متوازن تمرین ببینند." },
  { name: "پا", latin: "Quadriceps", exercises: 30, icon: "🦵", color: "from-green-500 to-emerald-500", tips: "عضلات پا بزرگ‌ترین عضله بدن هستند. با بار سنگین و حجم بالا تمرین کنید." },
  { name: "بازو", latin: "Biceps/Triceps", exercises: 16, icon: "💪", color: "from-orange-500 to-amber-500", tips: "سه‌سر دو برابر دوسر حجم دارد؛ برای بازوی بزرگ روی سه‌سر بیشتر تمرکز کنید." },
  { name: "شکم", latin: "Abdominals", exercises: 20, icon: "⚡", color: "from-yellow-500 to-orange-500", tips: "شکم نیاز به تمرین متنوع دارد: کرانچ، پلانک، چرخشی و ایزومتریک." },
];

const statsData = [
  { label: "حرکت ورزشی", value: "۵۰۰+", icon: "🏋️", color: "text-orange-400" },
  { label: "برنامه تمرینی", value: "۸۰+", icon: "📋", color: "text-blue-400" },
  { label: "کاربر فعال", value: "۲۰۰K+", icon: "👥", color: "text-green-400" },
  { label: "رکورد جهانی", value: "۱۵۰+", icon: "🏆", color: "text-yellow-400" },
];

const tips = [
  "برای عضله‌سازی بهینه، روزانه ۱.۶ تا ۲.۲ گرم پروتئین به ازای هر کیلوگرم وزن بدن مصرف کنید.",
  "خواب کافی (۷-۹ ساعت) اثر مستقیم بر ریکاوری عضلات و سطح تستوسترون دارد.",
  "گرم‌کردن ۱۰ دقیقه‌ای قبل از تمرین خطر آسیب را تا ۵۰٪ کاهش می‌دهد.",
  "نوشیدن آب کافی (حداقل ۳ لیتر در روز) عملکرد ورزشی را بهبود می‌بخشد.",
  "تمرین پیشرونده (افزایش تدریجی بار یا تکرار) کلید رشد مستمر عضلانی است.",
  "استراحت بین ست‌ها برای قدرت: ۳-۵ دقیقه، برای هایپرتروفی: ۶۰-۹۰ ثانیه.",
];

// ─── Components ───────────────────────────────────────────

function RippleButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ripple = useRipple();
  return (
    <button
      ref={ripple.ref as React.RefObject<HTMLButtonElement>}
      onPointerDown={ripple.onPointerDown}
      onClick={onClick}
      className={`ripple ${className}`}
    >
      {children}
    </button>
  );
}

function StatCard({ stat, delay }: { stat: typeof statsData[0]; delay: string }) {
  return (
    <div className={`glass rounded-2xl p-5 text-center card-hover animate-fadeUp ${delay}`}>
      <div className="text-4xl mb-2">{stat.icon}</div>
      <div className={`text-3xl font-black ${stat.color} animate-countUp`}>{stat.value}</div>
      <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
    </div>
  );
}

function TipCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % tips.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="glass rounded-2xl p-5 border border-orange-500/20 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">💡</div>
        <span className="text-orange-400 font-bold text-sm">نکته ورزشی روز</span>
      </div>
      <p className="text-slate-200 leading-7 text-sm animate-fadeIn" key={idx}>{tips[idx]}</p>
      <div className="flex gap-1.5 mt-4">
        {tips.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-orange-500" : "w-1.5 bg-slate-600"}`} />
        ))}
      </div>
    </div>
  );
}

function ExerciseModal({ ex, onClose }: { ex: typeof exercises[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-dark rounded-3xl p-6 max-w-sm w-full z-10 animate-fadeUp" onClick={e => e.stopPropagation()}>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center text-3xl mb-4`}>{ex.icon}</div>
        <h3 className="text-2xl font-black text-white mb-2">{ex.name}</h3>
        <p className="text-slate-400 text-sm leading-6 mb-4">{ex.desc}</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "عضله", val: ex.muscle },
            { label: "ست×تکرار", val: ex.sets },
            { label: "کالری", val: `${ex.kcal}` },
          ].map(item => (
            <div key={item.label} className="glass rounded-xl p-3 text-center">
              <div className="text-white font-bold text-sm">{item.val}</div>
              <div className="text-slate-400 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <RippleButton className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-sm">
            افزودن به برنامه
          </RippleButton>
          <RippleButton onClick={onClose} className="px-4 py-3 rounded-xl glass text-slate-300 text-sm font-bold">
            بستن
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────

function HomePage({ setTab }: { setTab: (t: Tab) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-center p-7"
        style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #0a1628 100%)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0ea5e9 0%, transparent 40%)" }} />
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1 text-xs text-orange-300 mb-4 animate-fadeUp">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse-ring inline-block"></span>
            اپلیکیشن ورزشی هوشمند
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3 animate-fadeUp delay-100">
            <span className="gradient-text">قوی‌تر</span> از دیروز،<br />
            <span className="text-white">آماده‌تر برای فردا</span>
          </h1>
          <p className="text-slate-400 text-sm leading-6 mb-5 max-w-xs animate-fadeUp delay-200">
            برنامه‌های تمرینی علمی، تغذیه هدفمند و ردیابی پیشرفت در یک پلتفرم جامع.
          </p>
          <div className="flex gap-3 flex-wrap animate-fadeUp delay-300">
            <RippleButton onClick={() => setTab("programs")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-500/30">
              شروع تمرین 🚀
            </RippleButton>
            <RippleButton onClick={() => setTab("exercises")}
              className="px-5 py-2.5 rounded-xl glass text-slate-200 font-bold text-sm">
              مشاهده حرکات
            </RippleButton>
          </div>
        </div>
        <div className="hidden sm:block text-[90px] animate-float select-none">🏋️</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statsData.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={`delay-${(i + 1) * 100}`} />
        ))}
      </div>

      {/* Tip */}
      <TipCarousel />

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "حرکات ورزشی", icon: "🏋️", tab: "exercises" as Tab, color: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/20" },
            { label: "تغذیه ورزشی", icon: "🥗", tab: "nutrition" as Tab, color: "from-green-500/20 to-green-600/10", border: "border-green-500/20" },
            { label: "برنامه‌ها", icon: "📋", tab: "programs" as Tab, color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/20" },
            { label: "رکورد‌های جهانی", icon: "🏆", tab: "records" as Tab, color: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/20" },
            { label: "آناتومی عضلات", icon: "🫀", tab: "anatomy" as Tab, color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/20" },
            { label: "ردیابی پیشرفت", icon: "📈", tab: "home" as Tab, color: "from-pink-500/20 to-pink-600/10", border: "border-pink-500/20" },
          ].map(item => (
            <RippleButton key={item.label} onClick={() => setTab(item.tab)}
              className={`ripple card-hover bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-4 text-right`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-white font-bold text-sm">{item.label}</div>
            </RippleButton>
          ))}
        </div>
      </div>

      {/* BMI Calculator */}
      <BMICalc />
    </div>
  );
}

function BMICalc() {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);
  const category =
    bmi < 18.5 ? { label: "کمبود وزن", color: "text-blue-400" }
    : bmi < 25 ? { label: "وزن سالم ✅", color: "text-green-400" }
    : bmi < 30 ? { label: "اضافه وزن", color: "text-yellow-400" }
    : { label: "چاقی", color: "text-red-400" };
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));

  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2">
        <span>⚖️</span> محاسبه شاخص توده بدنی (BMI)
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {[
          { label: "وزن (کیلوگرم)", val: weight, min: 30, max: 200, set: setWeight },
          { label: "قد (سانتی‌متر)", val: height, min: 100, max: 220, set: setHeight },
        ].map(f => (
          <div key={f.label}>
            <label className="text-slate-400 text-xs mb-2 block">{f.label}</label>
            <div className="flex items-center gap-2">
              <button onClick={() => f.set(v => Math.max(f.min, v - 1))} className="w-8 h-8 rounded-lg glass text-white font-bold text-lg leading-none ripple">−</button>
              <div className="flex-1 glass rounded-xl py-2 text-center text-white font-black text-lg">{f.val}</div>
              <button onClick={() => f.set(v => Math.min(f.max, v + 1))} className="w-8 h-8 rounded-lg glass text-white font-bold text-lg leading-none ripple">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        <div className={`text-5xl font-black ${category.color} animate-countUp`}>{bmi}</div>
        <div className={`text-sm font-bold mt-1 ${category.color}`}>{category.label}</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #38bdf8, #22c55e, #facc15, #ef4444)" }} />
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>لاغر</span><span>نرمال</span><span>اضافه وزن</span><span>چاق</span>
      </div>
    </div>
  );
}

function ExercisesPage() {
  const [selected, setSelected] = useState<typeof exercises[0] | null>(null);
  const [filter, setFilter] = useState("همه");
  const muscles = ["همه", "پا", "سینه", "پشت", "کمر", "شکم"];
  const filtered = filter === "همه" ? exercises : exercises.filter(e => e.muscle === filter);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">حرکات ورزشی</h1>
        <p className="text-slate-400 text-sm">کتابخانه جامع تمرینات با راهنمای کامل</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {muscles.map(m => (
          <RippleButton key={m} onClick={() => setFilter(m)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === m ? "tab-active" : "glass text-slate-300"}`}>
            {m}
          </RippleButton>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((ex, i) => (
          <div key={ex.id} onClick={() => setSelected(ex)}
            className={`ripple glass rounded-2xl p-4 card-hover cursor-pointer border border-white/5 animate-fadeUp delay-${Math.min(i * 100, 500)}`}>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {ex.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-black text-base">{ex.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${ex.level === "مبتدی" ? "bg-green-500/20 text-green-400" : ex.level === "متوسط" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                    {ex.level}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">{ex.desc}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1">🦴 {ex.muscle}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">🔥 {ex.kcal} کال</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">📊 {ex.sets}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <ExerciseModal ex={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function NutritionPage() {
  const [calories, setCalories] = useState(2400);
  const total = nutritionData.reduce((a, b) => a + (b.name === "پروتئین" ? b.gram * 4 : b.name === "کربوهیدرات" ? b.gram * 4 : b.gram * 9), 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">تغذیه ورزشی</h1>
        <p className="text-slate-400 text-sm">راهنمای جامع تغذیه برای عملکرد بهتر</p>
      </div>

      {/* Calorie target */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">🎯 هدف کالری روزانه</h2>
        <div className="text-center mb-4">
          <div className="text-5xl font-black gradient-text">{calories.toLocaleString("fa-IR")}</div>
          <div className="text-slate-400 text-sm mt-1">کیلوکالری در روز</div>
        </div>
        <input type="range" min={1200} max={4000} step={50} value={calories} onChange={e => setCalories(+e.target.value)}
          className="w-full accent-orange-500" />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>۱۲۰۰</span><span>۴۰۰۰</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "پروتئین", val: Math.round(calories * 0.3 / 4), unit: "گرم", color: "text-orange-400" },
            { label: "کربوهیدرات", val: Math.round(calories * 0.45 / 4), unit: "گرم", color: "text-blue-400" },
            { label: "چربی", val: Math.round(calories * 0.25 / 9), unit: "گرم", color: "text-green-400" },
          ].map(m => (
            <div key={m.label} className="glass rounded-xl p-3 text-center">
              <div className={`text-xl font-black ${m.color}`}>{m.val}</div>
              <div className="text-slate-400 text-xs">{m.unit} {m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Macros */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-5">📊 درشت‌مغذی‌ها</h2>
        <div className="space-y-5">
          {nutritionData.map(n => {
            const cal = n.name === "چربی" ? n.gram * 9 : n.gram * 4;
            const pct = Math.round(cal / total * 100);
            return (
              <div key={n.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{n.icon}</span>
                    <span className="text-white font-bold text-sm">{n.name}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-white font-black">{n.gram}گ</span>
                    <span className="text-slate-500 text-xs mr-1">({pct}٪)</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill transition-all duration-1000" style={{ width: `${pct}%`, background: n.color }} />
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {n.foods.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full glass text-slate-300">{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hydration */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">💧 آبرسانی بهینه</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "روزانه (غیرورزشی)", val: "۲-۳ لیتر", icon: "💧" },
            { label: "روزانه (ورزشی)", val: "۳-۴ لیتر", icon: "🚰" },
            { label: "هر ساعت ورزش", val: "۵۰۰-۷۵۰ میلی", icon: "🏃" },
          ].map(h => (
            <div key={h.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">{h.icon}</div>
              <div className="text-blue-400 font-black text-lg">{h.val}</div>
              <div className="text-slate-400 text-xs mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">💊 مکمل‌های رایج</h2>
        <div className="space-y-3">
          {[
            { name: "پروتئین وی", use: "ریکاوری پس از تمرین", rating: 5, safe: true },
            { name: "کراتین مونوهیدرات", use: "افزایش قدرت و توده عضلانی", rating: 5, safe: true },
            { name: "کافئین", use: "افزایش تمرکز و چربی‌سوزی", rating: 4, safe: true },
            { name: "بتا آلانین", use: "کاهش خستگی عضلانی", rating: 4, safe: true },
            { name: "ویتامین D3", use: "سلامت استخوان و ایمنی", rating: 5, safe: true },
          ].map(s => (
            <div key={s.name} className="flex items-center gap-3 glass rounded-xl p-3">
              <div className="text-2xl">💊</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{s.name}</span>
                  {s.safe && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">ایمن</span>}
                </div>
                <div className="text-slate-400 text-xs mt-0.5">{s.use}</div>
              </div>
              <div className="text-yellow-400 text-xs">{"★".repeat(s.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramsPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">برنامه‌های تمرینی</h1>
        <p className="text-slate-400 text-sm">برنامه‌های علمی طراحی‌شده توسط متخصصان</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {programs.map((p, i) => (
          <div key={p.name} className={`ripple glass rounded-3xl overflow-hidden card-hover cursor-pointer border transition-all duration-300 animate-fadeUp delay-${i * 100} ${active === i ? "border-orange-500/50" : "border-white/5"}`}
            onClick={() => setActive(active === i ? null : i)}>
            <div className={`bg-gradient-to-r ${p.color} p-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl mb-2">{p.icon}</div>
                  <h3 className="text-white font-black text-lg">{p.name}</h3>
                  <p className="text-white/70 text-sm">{p.goal}</p>
                </div>
                <div className="text-left">
                  <div className="text-white/80 text-xs mb-1">⭐ {p.rating}</div>
                  <div className="text-white/60 text-xs">{p.users} نفر</div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex gap-4 mb-4">
                <div className="text-center">
                  <div className="text-white font-black text-xl">{p.weeks}</div>
                  <div className="text-slate-400 text-xs">هفته</div>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-white font-black text-xl">{p.days}</div>
                  <div className="text-slate-400 text-xs">روز/هفته</div>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <div className={`font-black text-sm px-2 py-1 rounded-lg ${p.level === "مبتدی" ? "bg-green-500/20 text-green-400" : p.level === "متوسط" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{p.level}</div>
                  <div className="text-slate-400 text-xs mt-1">سطح</div>
                </div>
              </div>
              {active === i && (
                <div className="animate-fadeUp space-y-3 mb-4">
                  <div className="text-slate-300 text-sm font-bold">برنامه هفتگی نمونه:</div>
                  {Array.from({ length: p.days }, (_, d) => (
                    <div key={d} className="flex items-center gap-3 glass rounded-xl p-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-black flex items-center justify-center">{d + 1}</div>
                      <div className="text-slate-300 text-xs">
                        {["سینه + سه‌سر", "پشت + دوسر", "پا + سرینی", "شانه + شکم", "کل بدن"][d] || "استراحت فعال"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <RippleButton className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-sm">
                {active === i ? "شروع این برنامه 🚀" : "مشاهده جزئیات"}
              </RippleButton>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly schedule */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">📅 برنامه هفتگی پیشنهادی</h2>
        <div className="grid grid-cols-7 gap-1.5">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, i) => (
            <div key={day} className={`rounded-xl p-2 text-center ${i < 5 ? "glass border border-orange-500/20" : "glass border border-slate-700/30 opacity-50"}`}>
              <div className="text-slate-400 text-xs mb-1">{day}</div>
              <div className="text-xs font-bold text-white">{["سینه", "پشت", "پا", "شانه", "شکم", "ریکاوری", "استراحت"][i]}</div>
              <div className={`w-2 h-2 rounded-full mx-auto mt-1.5 ${i < 5 ? "bg-orange-400" : "bg-slate-600"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecordsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">رکوردهای جهانی</h1>
        <p className="text-slate-400 text-sm">برترین دستاوردهای بشری در دنیای قدرت</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {worldRecords.map((r, i) => (
          <div key={r.name} className={`glass rounded-3xl p-5 card-hover border border-white/5 animate-fadeUp delay-${i * 100}`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                {r.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-black">{r.name}</h3>
                <div className="text-2xl font-black gradient-text mt-1">{r.record}</div>
                <div className="text-slate-400 text-xs mt-2">{r.holder}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs">{r.country}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500">{r.year}</span>
                </div>
              </div>
              <div className="text-yellow-400 text-2xl">🥇</div>
            </div>
          </div>
        ))}
      </div>

      {/* Powerlifting Total */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">🏋️ توتال پاورلیفتینگ (بهترین‌ها)</h2>
        <div className="space-y-3">
          {[
            { name: "ددلیفت", record: 501, color: "#f97316" },
            { name: "اسکات", record: 497, color: "#0ea5e9" },
            { name: "پرس سینه", record: 355, color: "#22c55e" },
          ].map(r => (
            <div key={r.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300 font-bold">{r.name}</span>
                <span className="text-white font-black">{r.record} کیلوگرم</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(r.record / 501) * 100}%`, background: r.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Iran Records */}
      <div className="glass rounded-3xl p-6 border border-green-500/20">
        <h2 className="text-base font-black text-white mb-4">🇮🇷 رکوردهای ایران</h2>
        <div className="space-y-3">
          {[
            { name: "وزنه‌برداری ۹۶ کیلوگرم", record: "۲۲۱ کیلوگرم", holder: "سهراب مرادی", medal: "🥇" },
            { name: "کشتی آزاد ۷۴ کیلوگرم", record: "قهرمان المپیک", holder: "حسن یزدانی", medal: "🥇" },
            { name: "ددلیفت ملی", record: "۳۸۵ کیلوگرم", holder: "محمد باقری", medal: "🥈" },
          ].map(r => (
            <div key={r.name} className="flex items-center gap-3 glass rounded-xl p-3">
              <span className="text-2xl">{r.medal}</span>
              <div className="flex-1">
                <div className="text-white font-bold text-sm">{r.name}</div>
                <div className="text-slate-400 text-xs">{r.holder}</div>
              </div>
              <div className="text-green-400 font-black text-sm">{r.record}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnatomyPage() {
  const [selected, setSelected] = useState<typeof muscleGroups[0] | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">آناتومی عضلات</h1>
        <p className="text-slate-400 text-sm">راهنمای کامل گروه‌های عضلانی بدن</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {muscleGroups.map((m, i) => (
          <div key={m.name} onClick={() => setSelected(selected?.name === m.name ? null : m)}
            className={`ripple glass rounded-2xl p-4 card-hover cursor-pointer border transition-all duration-300 animate-fadeUp delay-${i * 100} ${selected?.name === m.name ? "border-orange-500/50 bg-orange-500/5" : "border-white/5"}`}>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl mb-3`}>
              {m.icon}
            </div>
            <h3 className="text-white font-black">{m.name}</h3>
            <p className="text-slate-500 text-xs">{m.latin}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-slate-400 text-xs">{m.exercises} حرکت</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="glass rounded-3xl p-6 border border-orange-500/30 animate-fadeUp">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-3xl`}>{selected.icon}</div>
            <div>
              <h2 className="text-xl font-black text-white">{selected.name}</h2>
              <p className="text-slate-400 text-sm">{selected.latin}</p>
            </div>
          </div>
          <div className="glass rounded-xl p-4 mb-4">
            <div className="text-orange-400 text-xs font-bold mb-2">💡 نکات کلیدی تمرین</div>
            <p className="text-slate-300 text-sm leading-6">{selected.tips}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "تعداد حرکات", val: selected.exercises },
              { label: "روز پیشنهادی", val: "۲ بار/هفته" },
              { label: "ریکاوری", val: "۴۸ ساعت" },
            ].map(s => (
              <div key={s.label} className="glass rounded-xl p-3 text-center">
                <div className="text-white font-black">{s.val}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body fat chart */}
      <div className="glass rounded-3xl p-6">
        <h2 className="text-base font-black text-white mb-4">📊 درصد چربی بدن – راهنما</h2>
        <div className="space-y-2">
          {[
            { label: "ورزشکار المپیکی", men: "۳-۶٪", women: "۱۰-۱۳٪", color: "bg-blue-500" },
            { label: "ورزشکار", men: "۶-۱۳٪", women: "۱۴-۲۰٪", color: "bg-green-500" },
            { label: "تناسب اندام", men: "۱۴-۱۷٪", women: "۲۱-۲۴٪", color: "bg-yellow-500" },
            { label: "متوسط", men: "۱۸-۲۴٪", women: "۲۵-۳۱٪", color: "bg-orange-500" },
            { label: "چاقی", men: "۲۵٪+", women: "۳۲٪+", color: "bg-red-500" },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3 glass rounded-xl p-3">
              <div className={`w-3 h-3 rounded-full ${row.color} flex-shrink-0`} />
              <div className="flex-1 text-slate-300 text-sm font-bold">{row.label}</div>
              <div className="text-slate-400 text-xs">مرد: {row.men}</div>
              <div className="text-slate-400 text-xs">زن: {row.women}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────
const navItems: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "خانه", icon: "🏠" },
  { id: "exercises", label: "حرکات", icon: "🏋️" },
  { id: "nutrition", label: "تغذیه", icon: "🥗" },
  { id: "programs", label: "برنامه", icon: "📋" },
  { id: "records", label: "رکورد", icon: "🏆" },
  { id: "anatomy", label: "آناتومی", icon: "🫀" },
];

// ─── App ─────────────────────────────────────────────────
export function App() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen pb-24 sm:pb-6 sm:pr-20">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass-dark border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-orange-500/30">
            ⚡
          </div>
          <div>
            <div className="text-white font-black text-base leading-tight">اسپرت‌لب</div>
            <div className="text-slate-500 text-xs">دستیار هوشمند ورزشی</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-xl px-3 py-1.5 text-xs text-green-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            آنلاین
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex fixed right-0 top-0 h-full w-16 flex-col items-center py-4 gap-2 glass-dark border-l border-white/5 z-30 pt-20">
        {navItems.map(n => (
          <RippleButton key={n.id} onClick={() => setTab(n.id)}
            className={`ripple w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${tab === n.id ? "bg-orange-500 shadow-lg shadow-orange-500/40" : "glass"}`}>
            <span className="text-lg">{n.icon}</span>
          </RippleButton>
        ))}
      </aside>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-5">
        {tab === "home" && <HomePage setTab={setTab} />}
        {tab === "exercises" && <ExercisesPage />}
        {tab === "nutrition" && <NutritionPage />}
        {tab === "programs" && <ProgramsPage />}
        {tab === "records" && <RecordsPage />}
        {tab === "anatomy" && <AnatomyPage />}
      </main>

      {/* Bottom Nav (mobile) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/5 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map(n => (
            <RippleButton key={n.id} onClick={() => setTab(n.id)}
              className={`ripple flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${tab === n.id ? "bg-orange-500/20" : ""}`}>
              <span className={`text-xl transition-transform duration-200 ${tab === n.id ? "scale-125" : ""}`}>{n.icon}</span>
              <span className={`text-[10px] font-bold ${tab === n.id ? "text-orange-400" : "text-slate-500"}`}>{n.label}</span>
            </RippleButton>
          ))}
        </div>
      </nav>
    </div>
  );
}
