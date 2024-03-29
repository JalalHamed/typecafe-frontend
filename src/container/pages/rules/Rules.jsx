import { useEffect, useState, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Actions
import { RulesScrollTo } from "redux/actions";

// Designs
import "./rules.scss";

const Rules = () => {
  const dispatch = useDispatch();
  const DistributionOfContent = useRef();
  const StandardFormat = useRef();
  const HowTheWebsiteWorks = useRef();
  const OneAtATime = useRef();
  const PasswordResponsibility = useRef();
  const scrollTo = useSelector(state => state.Rules);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    if (scrollTo) {
      if (scrollTo === "HowTheWebsiteWorks")
        HowTheWebsiteWorks.current.scrollIntoView();
      if (scrollTo === "StandardFormat")
        StandardFormat.current.scrollIntoView();
      dispatch(RulesScrollTo(""));
    }

    // eslint-disable-next-line
  }, [scrollTo]);

  return (
    <div className={`rules-wrapper ${width < 1050 ? "w-100" : "w-78"}`}>
      {width > 1050 && (
        <div className="quick-access no-select">
          <p className="title">انتقال سریع</p>
          <p
            className="item"
            onClick={() => DistributionOfContent.current.scrollIntoView()}
          >
            توزیع و انتشار محتوا
          </p>
          <p
            className="item"
            onClick={() => StandardFormat.current.scrollIntoView()}
          >
            فرمت استاندارد تایپ
          </p>
          <p
            className="item"
            onClick={() => HowTheWebsiteWorks.current.scrollIntoView()}
          >
            ایجاد و انجام پروژه
          </p>
          <p
            className="item"
            onClick={() => OneAtATime.current.scrollIntoView()}
          >
            یکی یکی
          </p>
          <p
            className="item"
            onClick={() => PasswordResponsibility.current.scrollIntoView()}
          >
            مسئولیت محافظت از رمز عبور
          </p>
        </div>
      )}
      <p className="rules-initiate-note">
        شما با مشاهده و یا استفاده از هر یک از خدمات تایپ‌کافه، در جایگاه یک
        کاربر عادی یا یک کاربر عضو شده، قوانین تایپ‌کافه را به رسمیت می‌شناسید.
        همچنین متعهد می‌شوید که از آخرین به‌روزرسانی این قوانین آگاهی داشته
        باشید. منظور از اسامی تایپ‌کافه و TypeCafe، وب‌سایت{" "}
        <span className="blue-note">https://typecafe.ir</span> می‌باشد و تمامی
        حقوق برای تایپ‌کافه محفوظ است.
      </p>
      <p
        className="rules-title"
        ref={DistributionOfContent}
        onClick={() => DistributionOfContent.current.scrollIntoView()}
      >
        توزیع و انتشار محتوا
      </p>
      <p className="rules-value">
        تایپ‌کافه تحت قوانین جمهوری اسلامی ایران فعالیت می‌کند و هدف آن تسهیل
        خدمات تایپ به صورت آنلاین و دورکاری می‌باشد. در نتیجه انتشار و توزیع
        هرگونه محتوای مجرمانه از نظر قوانین جمهوری اسلامی ایران و یا مغایر با
        اهداف اساسی سایت، خلاف قوانین است و به‌محض آگاهی یافتن از انتشار چنین
        محتوایی، حساب کاربری مجرم برای همیشه بسته خواهد شد و وجوه دریافتی نیز به
        وی بازگردانده نخواهد شد. از نمونه های اینگونه محتوا می‌توان به موارد زیر
        اشاره کرد:
      </p>
      <ul className="rules-value less-mt" style={{ margin: "10px 55px" }}>
        <li>نام نمایشی نامناسب</li>
        <li>توهین، تهدید و یا بی‌احترامی به هر شکل</li>
        <li>انتشار هرگونه فایل ویروسی و مخرب</li>
        <li>انتشار محتوا و تصاویر غیراخلاقی و جنسی</li>
        <li>تبادل هرگونه راه ارتباطی خارج از سایت</li>
        <li>هرگونه تبلیغ و یا ترویج</li>
        <li>...</li>
      </ul>
      <p
        className="rules-title"
        ref={StandardFormat}
        onClick={() => StandardFormat.current.scrollIntoView()}
      >
        فرمت استاندارد تایپ
      </p>
      <div className="rules-value">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>فونت</th>
              <th>اندازه فونت</th>
              <th>فاصله خطوط</th>
              <th>انداز کاغذ</th>
              <th>حاشیه صفحه</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B Nazanin</td>
              <td>۱۸</td>
              <td>۱.۵</td>
              <td>A۴</td>
              <td>حالت نرمال ورد</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p
        className="rules-title"
        ref={HowTheWebsiteWorks}
        onClick={() => HowTheWebsiteWorks.current.scrollIntoView()}
      >
        ایجاد و انجام پروژه
      </p>
      <p className="rules-value">
        در حال حاضر حداقل قیمت پیشنهادی برای هر صفحه ۱,۵۶۰ تومان و کارمزد
        تایپ‌کافه ۱۰٪ می‌باشد. که با توجه به ارقام ذکر شده، تایپیست به ازای هر
        صفحه ۱,۴۰۴ تومان دریافتی، و کارفرما ۱,۷۱۶ تومان پرداختی خواهد داشت.
      </p>
      <p className="rules-value less-mt">
        بعد از تایید پیشنهاد تایپیست توسط کارفرما، مجموع مبلغ پروژه (قیمت
        پیشنهادی به ازای هر صفحه x تعداد صفحات ± کارمزد تایپ‌کافه) از اعتبار هر
        دو طرف کسر و نزد تایپ‌کافه گروگذاری خواهد شد. این مبلغ جهت حسن انجام کار
        توسط تایپیست و حصول اطمینان از پرداخت دستمزد توسط کارفرما از اعتبار
        طرفین اخذ می‌گردد و درصورت بروز هرگونه مورد عدم انطباق به شرح ذیل، وجه
        دریافتی به اعتبار طرف دیگر منتقل خواهد شد.
      </p>
      <p className="rules-value less-mt" style={{ margin: "10px 40px" }}>
        ۱. در صورت عدم تحویل موفق پروژه توسط تایپیست در موعد مقرر، بلافاصله و
        سپس بعد از هر ۵ دقیقه تاخیر، ۱۰٪ از کل مبلغ گروگذاری شده از اعتبار وی
        کسر و به اعتبار کارفرما منتقل خواهد شد. به عنوان مثال اگر مهلت انجام
        پروژه ای یک ساعت باشد، در صورت عدم تحویل موفق پروژه پس از ۶۰ دقیقه،
        ابتدا بلافاصله، و سپس بعد از هر ۵ دقیقه تاخیر، ۱۰٪ از مبلغ گروگذاری شده
        به حساب کارفرما منتقل خواهد شد. در نتیجه پس از گذشت ۵۰ دقیقه از مهلت
        تعیین شده و ناموفق بودن تایپیست در تحویل پروژه در این بازه، کل مبلغ
        گروگذاری شده توسط تایپیست به حساب کارفرما منتقل، و یک پروژه ناموفق در
        پروفایل تایپیست ثبت خواهد شد.
      </p>
      <p className="rules-value less-mt" style={{ margin: "10px 40px" }}>
        ۲. در صورت عدم پرداخت دستمزد تایپیست تا ۲۴ ساعت پس از تحویل فایل نهایی
        پروژه، کل مبلغ گروگذاری شده توسط کارفرما به اعتبار تایپیست منتقل، و یک
        پروژه ناموفق در پروفایل کارفرما ثبت خواهد شد.
      </p>
      <p className="rules-value less-mt">
        با توجه به موارد بالا، مطابق با میزان دیرکرد، درصد "تحویل به موقع پروژه"
        در پروفایل تایپیست در صورت بروز مورد اول و درصد "پرداخت به موقع" در
        پروفایل کارفرما در صورت بروز مورد دوم، کاهش خواهد یافت. البته شایان ذکر
        است که این درصد قابل جبران بوده و با تحویل و پرداخت به موقع، مجددا
        افزایش خواهد یافت.
      </p>
      <p className="rules-value less-mt">
        پس از پایان پروژه، تایپیست فایل نهایی تایپ شده را آپلود و تعداد صفحات
        تایپ شده با{" "}
        <span
          className="blue-note"
          onClick={() => StandardFormat.current.scrollIntoView()}
        >
          فرمت استاندارد سایت
        </span>{" "}
        را وارد می‌نماید. (توجه داشته باشید که حتی در صورت تقاضای تحویل پروژه با
        فرمت دیگر، محاسبه تعداد صفحات تایپ شده بر اساس{" "}
        <span
          className="blue-note"
          onClick={() => StandardFormat.current.scrollIntoView()}
        >
          فرمت استاندارد سایت
        </span>{" "}
        می‌باشد. و تایپیست بعد از محاسبه، فرمت دلخواه کارفرما را اعمال می‌کند.)
        سپس کارفرما موظف است ظرف موعد حداکثر ۲۴ ساعت، پروژه نهایی را دانلود و
        درصورت بیشتر بودن تعداد صفحات، وجه مازاد را بپردازد. درصورت کمتر بودن
        تعداد صفحات تایپ شده از تعداد صفحات پروژه، وجه اضافی بدون اعمال کارمزد
        به حساب کارفرما بازگردانده خواهد شد. پس از دریافت فایل توسط کارفرما و به
        اتمام رسیدن پروژه، تمام وجوه گروگذاری شده آزاد خواهند شد.
      </p>
      <p className="rules-value less-mt">
        لطفا توجه داشته باشید که به علت تاثیری که تعداد صفحات بر محاسبه مبلغ
        گروگذاری دارد، کارفرما به هیچ عنوان نمی‌بایست تعداد صفحات را کمتر یا
        بیشتر از تعداد حقیقی آن‌ها وارد کند. در صورت گزارش و یا مشاهده چنین
        موردی، پروژه معلق -و یا توسط تایپ‌کافه تصحیح- خواهد شد. (در صورت ثبت
        پیشنهاد توسط تایپیست و تایید شدن آن، مسئولیت انجام پروژه بر عهده تایپیست
        می‌باشد و پروژه معلق و یا تصحیح نخواهد شد.) همچنین تایپیست به هیچ عنوان
        نمی‌بایست پروژه را ناقص تحویل دهد. در صورت گزارش و یا مشاهده چنین موردی
        تمام مبلغ گروگذاری شده توسط تایپیست بی چون و چرا به اعتبار کارفرما
        منتقل، و یک پروژه ناموفق در پروفایل تایپیست ثبت خواهد شد.
      </p>
      <p className="rules-value less-mt">
        در صورت بروز و یا مشاهده هر مشکلی در هر کدام از مراحل پروسه ایجاد و
        انجام پروژه، با گزارش پروژه تایپ‌کافه موضوع را بررسی و سپس رای نهایی را
        صادر می‌کند.
      </p>
      <p className="rules-value less-mt">
        هر کاربر عضو شده در وب‌سایت تایپ‌کافه، ضمن رعایت قوانین، می‌تواند همزمان
        هم به عنوان تایپیست و هم به عنوان کارفرما در وب‌سایت فعالیت کند.
      </p>
      <p className="rules-value">
        پیرو سیاست های کنونی وب‌سایت، تایپیست باید حتما قبل از ثبت پیشنهاد، فایل
        پروژه را دانلود و با بررسی محتوای پروژه از توانایی انجام آن تا قبل از
        موعد تعیین شده اطمینان حاصل کند.
      </p>
      <p
        className="rules-title"
        ref={OneAtATime}
        onClick={() => PasswordResponsibility.current.scrollIntoView()}
      >
        یکی یکی
      </p>
      <p className="rules-value">
        در تایپ‌کافه، هر تایپیست در هر لحظه موظف به انجام یک پروژه و فقط یک
        پروژه می‌باشد و در صورت ثبت چندین پیشنهاد، به محض تایید شدن یکی از آنها
        بقیه پیشنهادات تایپیست لغو و توانایی ثبت پیشنهاد بر روی پروژه دیگر تا
        پایان تایپ پروژه فعلی و آپلود موفق آن (و یا به پایان رسیدن ناموفق
        پروژه)، از وی سلب خواهد شد. این سیاست جهت تمرکز هر چه بیشتر تایپیست بر
        روی پروژه ای که وی مسئولیت انجام آن را به عهده دارد اتخاذ گردیده است.
      </p>
      <p
        className="rules-title"
        ref={PasswordResponsibility}
        onClick={() => PasswordResponsibility.current.scrollIntoView()}
      >
        مسئولیت محافظت از رمز عبور
      </p>
      <p className="rules-value">
        در کنار ساختار بسیار قدرتمند و امن تایپ‌کافه که با بهره‌گیری
        تکنولوژی‌های بروز دنیا طراحی شده، و همچنین استفاده از پروتکل امن ارسال
        درخواست <i>https</i>، تایپ‌کافه تلاش کرده است تا کاربران نتوانند از رمز
        عبور ساده استفاده کنند. اما ممکن است کاربران از رمزهای عبور متداول
        استفاده و یا در حفظ و نگه‌داری رمز عبور خود دقت کافی را نداشته باشند؛ در
        این موقعیت با سوءاستفاده از رمز عبور ممکن است حساب کاربر مورد نفوذ قرار
        بگیرد. در این موقعیت تایپ‌کافه هیچ‌گونه مسئولیتی را قبول نمی‌کند.
        تایپ‌کافه به‌شدت تاکید می‌کند از رمز عبورهای پیچیده استفاده کنید و از
        انتشار آن به‌شکل مجازی و فیزیکی بپرهیزید.
      </p>
    </div>
  );
};

export default Rules;
