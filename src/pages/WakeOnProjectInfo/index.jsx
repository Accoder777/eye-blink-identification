import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import Header from "../../components/Header";

const WakeOnProjectInfo = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.textContainer}>
            <Typography variant="h3" gutterBottom>
              Loyiha nomi: Wake On
            </Typography>

            <Typography variant="h5" paragraph>
              Maqsad: Bu loyiha haydovchilarning yo‘lda uxlab qolishini oldini
              olishga qaratilgan. Tizim har 2 sekundda haydovchining ko‘zlari
              ochiq yoki yumuq ekanligini aniqlaydi. Agar haydovchi uxlab qolsa,
              tizim uni ogohlantirish uchun yoqimsiz musiqa yoki tovush signali
              yuboradi. Bu innovatsion yondashuv avtohalokatlar va
              yo‘l-transport hodisalarining oldini olishga yordam beradi.
            </Typography>

            <Typography variant="h6" paragraph>
              Asosiy funktsiyalar:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Ko‘zlarni aniqlash: Tizim haydovchining ko‘zlarini kuzatib
                  boradi va ularning ochiq yoki yumuqligini aniqlaydi.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Ogohlantirish tizimi: Agar tizim haydovchining uxlab qolganini
                  aniqlasa, yoqimsiz musiqa orqali haydovchiga ogohlantirish
                  yuboriladi.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Real vaqtda ishlash: Tizim 2 sekundda bir marta haydovchini
                  tekshirib, tezda reaktsiya beradi.
                </Typography>
              </li>
            </ul>

            <Typography variant="h6" paragraph>
              Foydalanuvchi uchun foydalari:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Haydovchining ehtimoliy uyqudan xabardor bo‘lishi.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Avtohalokatlar xavfini kamaytirish.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Ko‘proq xavfsizlik va qulaylik.
                </Typography>
              </li>
            </ul>

            <Typography variant="h6" paragraph>
              Texnologiyalar:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  {`Ko‘zlarni aniqlash algoritmlari (Yuzni aniqlash texnologiyalari, kompyuter ko‘rish va sun'iy intellekt)`}
                  .
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Ogohlantirish tizimi (Musiqa, tovush signalizatsiyasi).
                </Typography>
              </li>
            </ul>

            <Typography variant="h6" paragraph>
              Kelajakdagi rejalari:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Tizimni avtomobillarga integratsiya qilish.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Haydovchi xatti-harakatlarini yanada chuqurroq tahlil qilish
                  va optimal ogohlantirish mexanizmlarini ishlab chiqish.
                </Typography>
              </li>
            </ul>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <Link to="/faceDetector">
                <Button
                  variant="contained"
                  sx={{ width: "150%", height: "50px" }}
                >
                  Start Detection
                </Button>
              </Link>
            </Stack>
          </div>
          <div className={styles.picture}>
            <img src="/assets/img/logo-transparent.png" alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WakeOnProjectInfo;
