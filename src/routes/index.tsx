import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Check,
  X,
  ShieldCheck,
  Headphones,
  Infinity as InfinityIcon,
  GraduationCap,
  Wand2,
  Film,
  Crown,
  Smile,
  Gift,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { CTAButton } from "@/components/landing/CTAButton";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import quemSou from "@/assets/quem-sou.jpg";
import vslHeroVideo from "@/assets/VSL NOVA CONVITES VIRAIS (1).mp4";
import selo7dias from "@/assets/selo7dias.webp";
import siteLogo from "@/assets/Logo.png";
import bonus35Gifs from "@/assets/35gifs.png";
import bonus15Convites from "@/assets/15convites-prontos.png";

const testimonialImageModules = import.meta.glob<string>(
  "../assets/depoimentos-img/*.{png,jpg,jpeg,webp,gif,avif}",
  { eager: true, import: "default" },
);
const testimonialImages = Object.keys(testimonialImageModules)
  .sort((a, b) => a.localeCompare(b, "pt"))
  .map((key) => testimonialImageModules[key]);

const conviteVideoModules = import.meta.glob<string>(
  "../assets/convites/*.{mp4,webm,mov,m4v,ogg}",
  { eager: true, import: "default" },
);

type ConviteVideo = { src: string; label: string };

const conviteVideos: ConviteVideo[] = Object.keys(conviteVideoModules)
  .sort((a, b) => a.localeCompare(b, "pt"))
  .map((key) => {
    const fileName = key.split("/").pop() ?? key;
    const label = fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim();
    return { src: conviteVideoModules[key], label };
  });

const truthVideoModules = import.meta.glob<string>("../assets/videos/*.{mp4,webm,mov,m4v,ogg}", {
  eager: true,
  import: "default",
});

type TruthVideo = {
  src: string;
  name: string;
};

const truthVideos: TruthVideo[] = Object.keys(truthVideoModules)
  .sort((a, b) => a.localeCompare(b, "pt"))
  .map((key) => {
    const fileName = key.split("/").pop() ?? key;
    const name = fileName.replace(/\.[^.]+$/, "");
    return { src: truthVideoModules[key], name };
  });

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Convites Virais - Ganhe de R$3.000 a R$10.000 por mês" },
      {
        name: "description",
        content:
          "Curso Convites Virais com Tali: aprenda a criar convites digitais animados com I.A. e fature alto. Acesso vitalício, suporte direto, garantia de 7 dias.",
      },
      { property: "og:title", content: "Convites Virais — Curso Tali Arte" },
      {
        property: "og:description",
        content:
          "Transforme sua criatividade em renda real criando convites premium com I.A. De R$297 por R$197.",
      },
    ],
  }),
});

const conditions = [
  "Vende barato para não perder cliente",
  "Trabalha demais e lucra de menos",
  "Se sente insegura na hora de precificar",
  "Cria arte bonita, mas que ninguém valoriza",
  "Se perde em encomendas mal organizadas",
  "Aceita qualquer pedido só para fechar venda",
  "Se compara o tempo todo",
  "Trabalha por demanda e se esgota",
  "Tenta sozinha, no escuro",
];

const transformations = [
  "Cobrar o valor que seu convite merece",
  "Lucrar mais com menos esforço",
  "Ter um processo rápido e profissional",
  "Vender com confiança e posicionamento",
  "Entregar arte com propósito e valor agregado",
  "Ter um fluxo de trabalho leve e eficaz",
  "Atrair o cliente certo que valoriza seu trabalho",
  "Criar com estratégia e leveza",
  "Ter um método testado e um suporte real",
];

const modules = [
  {
    icon: Wand2,
    title: "Introdução às ferramentas de I.A.",
    desc: "Todo passo a passo de como usar a inteligência artificial de forma prática e estratégica para criar convites únicos, encantadores e com alto valor percebido. Mesmo que você nunca tenha usado essas ferramentas, aqui você vai descobrir as melhores IAs para criação dos convites, imagens, animações, prompts e muito mais.",
  },
  {
    icon: Film,
    title: "Desenvolvendo animações para convites",
    desc: "Aqui você vai aprender, de forma simples e prática, como criar animações incríveis para suas imagens — incluindo convites que se abrem com estilo e encantamento. Vamos explorar o uso de prompts estratégicos e técnicas que te permitirão animar seus projetos exatamente como imaginar, com fluidez, criatividade e alto impacto visual.",
  },
  {
    icon: Crown,
    title: "Convites para Debutantes",
    desc: "Aqui você vai aprender a criar convites personalizados e sofisticados para debutantes, dominando desde a escolha das ferramentas ideais até a adaptação de cada detalhe ao estilo e desejo da cliente. Vamos explorar diferentes temas, estilos e acabamentos, sempre com foco em encantar e entregar uma experiência única — digna de um verdadeiro baile dos sonhos.",
  },
  {
    icon: Smile,
    title: "Convites infantis com mascotes que falam",
    desc: "Neste módulo, você vai aprender um método completo e inovador para criar convites com mascotes personalizados que falam. Desde o desenvolvimento do personagem, seguindo o estilo e o tema desejado pelo cliente, até a animação com voz e a montagem final do convite — tudo de forma prática, criativa e com alto valor agregado. Prepare-se para encantar as crianças (e impressionar os pais)!",
  },
];

const advantages = [
  {
    icon: Headphones,
    title: "Suporte individual",
    desc: "Tire suas dúvidas, receba ajuda de forma eficaz e rápida e venda muito com o suporte dado 100% por mim!",
  },
  {
    icon: InfinityIcon,
    title: "Acesso vitalício",
    desc: "Irei atualizar novas aulas e métodos durante o primeiro ano inteiro, sempre deixando todos atualizados!",
  },
  {
    icon: GraduationCap,
    title: "Aulas sob medida para você",
    desc: "As aulas e temas são programados continuamente, sempre de acordo com as necessidades e sugestões dos alunos.",
  },
];

const bonusLessons = [
  {
    title: "Criação de GIFs",
    desc: "Descubra como transformar seus personagens em GIFs animados que encantam e ganham vida na tela.",
  },
  {
    title: "Baixando fontes gratuitas",
    desc: "O segredo das fontes que encantam — descubra onde encontrar e como usar, sem pagar nada!",
  },
  {
    title: "Criando silhueta debutante",
    desc: "Domine a técnica de criar silhuetas incríveis a partir da imagem real da cliente, e torne tudo mais profissional!",
  },
  {
    title: "Criar confirmação de presença",
    desc: "Aprenda a criar formulários de presença profissionais no Forms baseado no tema da cliente!",
  },
];

const extraBonuses = [
  {
    tag: "Bônus 01",
    title: "35 GIFs prontos",
    desc: "Torne seu trabalho ainda mais mágico com esse super bônus de 35 GIFs já animados para você simplesmente pegar e usar nos seus convites!",
    color: "from-primary to-rose",
    image: bonus35Gifs,
    imageAlt: "Pack de 35 GIFs animados para Canva",
  },
  {
    tag: "Bônus 02",
    title: "15 convites prontos editáveis",
    desc: "Saia na frente e tenha um catálogo com modelos incríveis e mais vendidos pela minha página. Convites de 15 anos e infantis, com temas como A Bela e a Fera, Alice no País das Maravilhas e muito mais!",
    color: "from-rose to-gold",
    image: bonus15Convites,
    imageAlt: "Pack de 15 convites prontos editáveis",
  },
];

const faqs = [
  {
    q: "O curso é 100% online?",
    a: "Sim, o curso é totalmente online! Você pode assistir às aulas onde e quando quiser, no seu ritmo e no conforto da sua casa. Basta ter acesso à internet e um dispositivo (computador, tablet ou celular).",
  },
  {
    q: "O curso tem atualizações?",
    a: "Sim! Durante o primeiro ano após o lançamento, o curso vai receber atualizações de conteúdo — novas aulas, ferramentas, dicas ou tendências do mercado. E o melhor: quem já é aluno não paga nada a mais por essas atualizações.",
  },
  {
    q: "Por quanto tempo terei acesso ao curso?",
    a: "Não precisa instalar nada para assistir às aulas. Elas ficam hospedadas em uma plataforma de ensino super intuitiva e fácil de navegar. Para colocar as técnicas em prática, eu apresento as ferramentas que utilizamos, mas você escolhe se prefere usar pelo computador ou pelo telemóvel. Muitas delas têm versões gratuitas e aplicativos.",
  },
  {
    q: "E se eu tiver dúvidas durante o curso?",
    a: "Você não estará sozinha! O suporte é feito diretamente comigo, de forma humanizada. Pode tirar dúvidas, pedir ajuda ou orientações sempre que precisar. Quero que você realmente aprenda e consiga aplicar o que ensino.",
  },
  {
    q: "Existe garantia?",
    a: "Sim! Você tem 7 dias de garantia, conforme o Código de Defesa do Consumidor. Ou seja, pode se inscrever, assistir ao conteúdo e, se achar que não é para você, é só pedir o reembolso dentro desse prazo.",
  },
  {
    q: "Posso fazer o curso apenas pelo celular?",
    a: "Sim, é possível! Muitos alunos acompanham o curso e colocam em prática usando apenas o telemóvel. Algumas ferramentas possuem aplicativo próprio, o que facilita muito. O curso foi gravado a partir de um computador, então em alguns momentos o visual pode ser um pouco diferente no celular — mas o suporte é direto e pessoal: se ficar com dúvidas, pode falar comigo e eu ajudo a adaptar para o seu dispositivo.",
  },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-ink overflow-x-hidden">
      <Hero />
      <PainGain />
      <Testimonials />
      <Truth />
      <Modules />
      <StudentWorks />
      <Advantages />
      <BonusLessons />
      <ExtraBonuses />
      <Pricing />
      <Guarantee />
      <About />
      <FAQ />
      <Footer />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const vslRef = useRef<HTMLVideoElement>(null);
  const [vslStarted, setVslStarted] = useState(false);

  const handleVslPlayClick = () => {
    const el = vslRef.current;
    if (!el) return;
    void el.play().catch(() => {});
    setVslStarted(true);
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <nav className="flex items-center justify-between gap-4 py-5 sm:py-6">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center transition-opacity hover:opacity-90"
          >
            <img
              src={siteLogo}
              alt="Criando Convites Virais"
              width={320}
              height={140}
              className="h-12 w-auto max-w-[min(100%,18rem)] object-contain object-left sm:h-14 sm:max-w-[22rem] md:h-16 md:max-w-[26rem]"
              decoding="async"
            />
          </Link>
          <CTAButton size="md">Garantir minha vaga</CTAButton>
        </nav>

        <div className="mx-auto max-w-3xl pb-20 pt-4 text-center sm:pb-28 sm:pt-8">
          <p className="text-sm font-medium text-muted-foreground">
            Curso online · método passo a passo · suporte direto
          </p>
          <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[2.85rem] lg:leading-[1.12]">
            Fature entre <span className="text-gradient">R$3.000 e R$10.000</span> por mês com
            convites digitais que se destacam
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Processo enxuto, posicionamento claro e entregas premium — o mesmo método que centenas
            de alunas aplicam no dia a dia, com acompanhamento humano.
          </p>

          <div className="mx-auto mt-10 w-full max-w-4xl">
            <div className="relative mt-6 rounded-[1.35rem] p-[1px] shadow-glow">
              <div
                aria-hidden
                className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-primary/55 via-rose/35 to-gold/25"
              />
              <div className="relative overflow-hidden rounded-[1.3rem] border border-border/70 bg-ink/95 p-1 shadow-card sm:p-1.5">
                <AspectRatio ratio={16 / 9}>
                  <div className="relative size-full">
                    <video
                      ref={vslRef}
                      src={vslHeroVideo}
                      title="Apresentação do curso Convites Virais"
                      controls={vslStarted}
                      playsInline
                      preload="metadata"
                      onPlay={() => setVslStarted(true)}
                      className="size-full rounded-xl border border-white/10 object-cover"
                    />
                    {!vslStarted && (
                      <>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-ink/70 via-ink/15 to-ink/35"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"
                        />
                        <button
                          type="button"
                          onClick={handleVslPlayClick}
                          aria-label="Reproduzir vídeo de apresentação"
                          className="group absolute left-1/2 top-1/2 z-10 flex h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:h-20 sm:w-20 md:h-[5.25rem] md:w-[5.25rem]"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -inset-3 rounded-full bg-primary/30 blur-2xl motion-safe:animate-pulse sm:-inset-4"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-rose to-[oklch(0.52_0.2_350)] shadow-[0_14px_50px_-12px_color-mix(in_oklab,var(--primary)_58%,transparent)] transition duration-300 group-hover:scale-[1.06] group-hover:shadow-glow group-active:scale-[0.96]"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full ring-2 ring-white/35 ring-offset-2 ring-offset-ink/90 transition duration-300 group-hover:ring-white/50"
                          />
                          <Play
                            className="relative z-10 ml-1 size-9 text-primary-foreground drop-shadow-md sm:ml-1.5 sm:size-10 md:size-[2.75rem]"
                            strokeWidth={1.75}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <CTAButton size="lg">Quero começar agora</CTAButton>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />7 dias de garantia
            </li>
            <li className="flex items-center gap-2">
              <InfinityIcon className="size-4 shrink-0 text-primary" aria-hidden />
              Acesso vitalício
            </li>
            <li className="flex items-center gap-2">
              <Headphones className="size-4 shrink-0 text-primary" aria-hidden />
              Suporte com a Tali
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAIN / GAIN ---------------- */
function PainGain() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Antes & Depois"
          title={
            <>
              De onde você está,{" "}
              <em className="text-primary not-italic">para onde você vai chegar</em>
            </>
          }
          subtitle="Reconhece alguma dessas situações? Veja a transformação que esse método vai trazer pra sua rotina."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-cream p-8 shadow-card sm:p-10">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-destructive/10 text-destructive">
                <X className="size-5" />
              </div>
              <h3 className="font-display text-2xl">Se você...</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {conditions.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                  <span className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-destructive/60" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow sm:p-10">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-white/20">
                <Check className="size-5" />
              </div>
              <h3 className="font-display text-2xl">Você vai passar a...</h3>
            </div>
            <ul className="relative mt-6 space-y-3.5">
              {transformations.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed">
                  <Check className="mt-1 size-4 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <CTAButton size="lg">Quero essa transformação</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const loopImages = useMemo(() => [...testimonialImages, ...testimonialImages], []);
  const durationSec = Math.max(28, testimonialImages.length * 9);

  return (
    <section className="relative bg-blush/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Depoimentos"
          title={
            <>
              Veja resultados reais de <em className="text-primary not-italic">quem já é aluna</em>
            </>
          }
          subtitle="Prints e feedbacks reais — o carrossel roda em loop contínuo."
        />

        {testimonialImages.length === 0 ? (
          <p className="mt-14 text-center text-muted-foreground">
            Adicione imagens em{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
              src/assets/depoimentos-img
            </code>{" "}
            (PNG, JPG ou WebP) para exibir o carrossel.
          </p>
        ) : (
          <div
            role="region"
            aria-label="Carrossel de depoimentos em imagens"
            className="relative mt-14 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div
              className="animate-testimonial-marquee flex w-max gap-5 motion-reduce:animate-none md:gap-7"
              style={{ animationDuration: `${durationSec}s` }}
            >
              {loopImages.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  width={400}
                  height={711}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-[min(60vw,26rem)] w-auto shrink-0 select-none rounded-2xl border border-primary/10 bg-card object-cover shadow-card sm:h-[min(52vw,30rem)] md:h-[28rem]"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <CTAButton size="lg">Quero ser a próxima</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUTH ---------------- */
function Truth() {
  return (
    <section className="relative bg-ink min-h-[100vh] py-16 text-primary-foreground">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, oklch(0.62 0.22 8 / 0.4), transparent 50%), radial-gradient(circle at 70% 80%, oklch(0.5 0.18 350 / 0.3), transparent 50%)",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col px-6 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary-soft">
          A verdade
        </span>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          A verdade sobre o curso
          <br />
          <span className="text-gradient">é simples e transparente.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          Sem promessas mágicas. Aqui você encontra um método estruturado, suporte humano e uma
          comunidade que aplica e fatura. O resultado vem de quem coloca em prática — e eu vou
          caminhar junto com você.
        </p>
        <TruthVideosCarousel />

        <div className="mt-10">
          <CTAButton size="lg">Quero entrar pra dentro</CTAButton>
        </div>
      </div>
    </section>
  );
}

function TruthVideosCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const total = truthVideos.length;

  const setVideoRef = useCallback(
    (idx: number) => (el: HTMLVideoElement | null) => {
      if (el) videoRefs.current.set(idx, el);
      else videoRefs.current.delete(idx);
    },
    [],
  );

  const pauseAll = useCallback(() => {
    videoRefs.current.forEach((el) => {
      el.pause();
    });
  }, []);

  const prev = () => {
    if (total === 0) return;
    pauseAll();
    setPlayingIdx(null);
    setActiveIndex((i) => (i - 1 + total) % total);
  };

  const next = () => {
    if (total === 0) return;
    pauseAll();
    setPlayingIdx(null);
    setActiveIndex((i) => (i + 1) % total);
  };

  const handlePlay = (idx: number) => {
    const el = videoRefs.current.get(idx);
    if (!el) return;
    pauseAll();
    void el.play().catch(() => {});
  };

  const handlePause = (idx: number) => {
    videoRefs.current.get(idx)?.pause();
    setPlayingIdx((p) => (p === idx ? null : p));
  };

  const handleVideoAreaClick = (idx: number) => {
    const el = videoRefs.current.get(idx);
    if (!el) return;
    if (el.paused) {
      pauseAll();
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const safeIndex = (idx: number) => {
    if (total === 0) return 0;
    return (idx + total) % total;
  };

  const leftIndex = safeIndex(activeIndex - 1);
  const rightIndex = safeIndex(activeIndex + 1);

  const progressPct = total ? ((activeIndex + 1) / total) * 100 : 0;

  const visibleIndices = total === 0 ? [] : [leftIndex, activeIndex, rightIndex];

  return (
    <div className="mx-auto mt-6 w-full max-w-3xl">
      <div className="relative rounded-xl p-[1px] shadow-glow">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/65 via-rose/45 to-gold/25" />

        <div className="relative rounded-xl bg-ink/30 p-3 sm:p-4">
          {total === 0 ? (
            <p className="text-sm text-primary-foreground/80">
              Adicione seus vídeos em `src/assets/videos` (mp4/webm) para exibir este carrossel.
            </p>
          ) : (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Vídeo anterior"
                  className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-primary-foreground ring-1 ring-white/10 transition hover:bg-ink/70 sm:flex size-9"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próximo vídeo"
                  className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-primary-foreground ring-1 ring-white/10 transition hover:bg-ink/70 sm:flex size-9"
                >
                  <ChevronRight className="size-4" />
                </button>

                <div className="grid grid-cols-3 gap-3">
                  {visibleIndices.map((idx, slot) => {
                    const v = truthVideos[idx];
                    const isActive = idx === activeIndex;

                    return (
                      <div
                        key={`${v.src}-${slot}`}
                        className={`relative overflow-hidden rounded-lg border bg-ink/20 transition-all duration-300 ${
                          isActive
                            ? "scale-[1.015] border-primary/40 shadow-glow"
                            : "scale-[0.985] border-border/60 opacity-90"
                        }`}
                      >
                        <AspectRatio ratio={9 / 16}>
                          <video
                            ref={setVideoRef(idx)}
                            src={v.src}
                            playsInline
                            preload="metadata"
                            className="size-full cursor-pointer object-cover"
                            onClick={() => handleVideoAreaClick(idx)}
                            onPlay={() => setPlayingIdx(idx)}
                            onPause={() => setPlayingIdx((p) => (p === idx ? null : p))}
                            onEnded={() => handlePause(idx)}
                          />
                        </AspectRatio>

                        {playingIdx !== idx && (
                          <>
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/20"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlay(idx);
                              }}
                              aria-label="Reproduzir vídeo"
                              className="absolute left-1/2 top-1/2 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow ring-1 ring-white/20 transition hover:scale-[1.05] active:scale-[0.98] sm:size-16"
                            >
                              <Play className="ml-0.5 size-7 sm:size-8" />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <div
                  className="h-2 w-full rounded-full bg-white/10 overflow-hidden"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={total}
                  aria-valuenow={activeIndex + 1}
                >
                  <div
                    className="h-full rounded-full bg-gradient-primary transition-[width] duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-ink/30 px-3 py-1.5 text-sm font-semibold text-primary-foreground/90"
                >
                  <ChevronLeft className="size-3.5" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-ink/30 px-3 py-1.5 text-sm font-semibold text-primary-foreground/90"
                >
                  Próximo
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MODULES ---------------- */
function Modules() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Conteúdo do curso"
          title={
            <>
              O que você vai <em className="text-primary not-italic">aprender</em>
            </>
          }
          subtitle="Só precisa de Canva Pro e ferramentas gratuitas — sem instalar programas complicados."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <article
                key={m.title}
                className="group relative flex flex-col gap-5 rounded-3xl border border-primary/15 bg-gradient-cream p-8 shadow-card transition-all hover:shadow-glow sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                    <Icon className="size-6" />
                  </div>
                  <span className="font-display text-5xl text-primary/20">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight">{m.title}</h3>
                <p className="text-[15px] leading-relaxed text-foreground/80">{m.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STUDENT WORKS ---------------- */
function StudentWorks() {
  const conviteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [convitePlayingKey, setConvitePlayingKey] = useState<string | null>(null);

  const setConviteVideoRef = useCallback(
    (src: string) => (el: HTMLVideoElement | null) => {
      if (el) conviteVideoRefs.current.set(src, el);
      else conviteVideoRefs.current.delete(src);
    },
    [],
  );

  const pauseOtherConviteVideos = useCallback((exceptSrc: string) => {
    conviteVideoRefs.current.forEach((v, k) => {
      if (k !== exceptSrc) v.pause();
    });
  }, []);

  const handleConvitePlay = (src: string) => {
    const el = conviteVideoRefs.current.get(src);
    if (!el) return;
    pauseOtherConviteVideos(src);
    void el.play().catch(() => {});
  };

  const handleConvitePause = (src: string) => {
    conviteVideoRefs.current.get(src)?.pause();
    setConvitePlayingKey((p) => (p === src ? null : p));
  };

  const handleConviteVideoClick = (src: string) => {
    const el = conviteVideoRefs.current.get(src);
    if (!el) return;
    if (el.paused) {
      pauseOtherConviteVideos(src);
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-rose py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-rose/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Portfólio das alunas"
          title={
            <>
              Veja alguns convites criados <em className="text-primary not-italic">por elas</em>
            </>
          }
          subtitle="Trechos em vídeo do que as alunas criam — o mesmo visual premium do restante da página."
        />

        {conviteVideos.length === 0 ? (
          <p className="mt-14 text-center text-muted-foreground">
            Coloque vídeos em{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-sm text-foreground">
              src/assets/convites
            </code>{" "}
            (mp4, webm ou mov) para montar o portfólio automaticamente.
          </p>
        ) : (
          <div className="mt-14 flex w-full justify-center">
            <div className="flex max-w-6xl flex-wrap justify-center gap-6 sm:gap-7">
              {conviteVideos.map((item) => (
                <article
                  key={item.src}
                  className="group relative w-full max-w-[min(100%,18rem)] shrink-0 sm:w-[19rem] sm:max-w-none md:w-[20.5rem]"
                >
                  <div className="relative h-[min(78vw,30rem)] w-full overflow-hidden rounded-2xl shadow-card transition duration-300 group-hover:shadow-glow sm:h-[34rem] md:h-[38rem]">
                    <video
                      ref={setConviteVideoRef(item.src)}
                      src={item.src}
                      title={item.label || "Vídeo do portfólio"}
                      aria-label={item.label || "Vídeo do portfólio"}
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 size-full cursor-pointer rounded-2xl object-contain object-center"
                      onClick={() => handleConviteVideoClick(item.src)}
                      onPlay={() => setConvitePlayingKey(item.src)}
                      onPause={() => setConvitePlayingKey((p) => (p === item.src ? null : p))}
                      onEnded={() => handleConvitePause(item.src)}
                    />

                    {convitePlayingKey !== item.src && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvitePlay(item.src);
                        }}
                        aria-label="Reproduzir vídeo"
                        className="absolute left-1/2 top-1/2 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow ring-1 ring-white/20 transition hover:scale-[1.05] active:scale-[0.98] sm:size-16"
                      >
                        <Play className="ml-0.5 size-7 sm:size-8" />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- ADVANTAGES ---------------- */
function Advantages() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Vantagens exclusivas"
          title={
            <>
              Quem é aluna recebe <em className="text-primary not-italic">muito mais</em>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {advantages.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="rounded-3xl border border-primary/15 bg-card p-8 text-center shadow-card"
              >
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <CTAButton size="lg">Quero todas as vantagens</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BONUS LESSONS ---------------- */
function BonusLessons() {
  return (
    <section className="bg-blush/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Aulas bônus"
          title={
            <>
              Aulas bônus que vão te fazer
              <br />
              <em className="text-primary not-italic">faturar muito mais</em>
            </>
          }
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bonusLessons.map((b, i) => (
            <div
              key={b.title}
              className="relative flex flex-col gap-4 rounded-3xl border border-primary/15 bg-card p-7 shadow-card"
            >
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-soft">
                Bônus {i + 1}
              </span>
              <Gift className="size-7 text-primary" />
              <h3 className="font-display text-lg leading-snug">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXTRA BONUSES ---------------- */
function ExtraBonuses() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Adquirindo agora"
          title={
            <>
              Você ainda ganha <em className="text-primary not-italic">mais bônus</em>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {extraBonuses.map((b) => (
            <div
              key={b.title}
              className={`relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${b.color} p-8 text-primary-foreground shadow-glow sm:p-10`}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-48 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative mb-6 flex justify-center md:mb-8">
                <img
                  src={b.image}
                  alt={b.imageAlt}
                  width={560}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-auto w-full max-w-[min(100%,260px)] object-contain drop-shadow-2xl sm:max-w-[280px]"
                />
              </div>
              <span className="relative inline-block self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                {b.tag}
              </span>
              <h3 className="relative mt-5 font-display text-3xl leading-tight">{b.title}</h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-primary-foreground/90">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  return (
    <section className="relative bg-gradient-rose py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-10 shadow-glow sm:p-14">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 size-80 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Convites Virais
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Se torne uma aluna ainda hoje e faça parte
              <br className="hidden sm:block" />
              de uma comunidade que <em className="text-primary not-italic">inspira e ensina</em>.
            </h2>

            <div className="mt-10 inline-flex flex-col items-center">
              <span className="text-sm text-muted-foreground line-through">De R$297</span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Por apenas
              </span>
              <span className="mt-2 font-display text-6xl font-bold text-gradient sm:text-7xl">
                R$197,00
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                à vista ou <strong className="text-foreground">10x de R$23,68</strong>
              </span>
            </div>

            <div className="mt-10">
              <CTAButton size="lg">Quero garantir minha vaga</CTAButton>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Acesso vitalício
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Suporte direto
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> 7 dias de garantia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GUARANTEE ---------------- */
function Guarantee() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[auto_1fr]">
        <div className="relative mx-auto flex max-w-[min(100%,16rem)] justify-center sm:max-w-[18rem] md:max-w-[20rem]">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gold/25 blur-3xl" />
          <img
            src={selo7dias}
            alt="Selo de garantia de 7 dias"
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="relative z-10 w-full object-contain drop-shadow-xl"
          />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Garantia
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Garantia incondicional de 7 dias
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Não gostou? A gente devolve <strong className="text-foreground">100% do valor</strong>.
            Sem perguntas, sem estresse. Sua tranquilidade vem em primeiro lugar.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section className="bg-blush/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 shadow-glow">
            <img
              src={quemSou}
              alt="Tali, criadora do curso Convites Virais"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Quem sou eu?
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Oi, eu sou a <em className="text-primary not-italic">Tali</em>
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
            <p>
              Tenho 28 anos, sou mãe de uma princesinha de quase 3 anos e foi justamente por ela que
              toda essa história começou.
            </p>
            <p>
              Quando minha filha tinha apenas 9 meses, tomei uma decisão difícil, mas que mudou
              completamente o rumo da minha vida: optei por não colocá-la na creche. Moro em
              Portugal, longe da família, sem rede de apoio, apenas eu, meu marido e ela. Foi aí que
              os convites — antes um “hobby” — se transformaram na minha principal fonte de renda…
              e, mais do que isso, no meu propósito.
            </p>
            <p>
              Percebi que, num mercado saturado de cópias e modelos repetidos, o que faz a diferença
              é a autenticidade e o cuidado em cada criação. Foi assim que nasceu minha linha de
              Convites Premium: convites únicos, com alto valor percebido, que encantam e geram
              desejo nos clientes. E o melhor? Eles permitem que você trabalhe menos, mas fature
              muito mais.
            </p>
            <p>
              Hoje, meu maior prazer é ensinar outras pessoas a transformar criatividade e dedicação
              em uma fonte de renda real. Se eu consegui, sem rede de apoio, começando do zero…{" "}
              <strong className="text-primary">você também consegue</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="F.A.Q."
          title={
            <>
              Dúvidas <em className="text-primary not-italic">frequentes</em>
            </>
          }
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] duration-300 ease-out ${
                  isOpen ? "border-primary/40 shadow-card" : "border-border"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-muted/40"
                >
                  <span className="font-display text-lg leading-tight">{f.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-primary transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      aria-hidden={!isOpen}
                      className={`px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                        isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <CTAButton size="lg">Quero ganhar com convites virais</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
const INSTAGRAM_URL =
  "https://www.instagram.com/convites.virais?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D";

function Footer() {
  return (
    <footer className="border-t border-border bg-ink py-12 text-primary-foreground/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:gap-4">
        <div className="flex items-center justify-center sm:justify-start">
          <img
            src={siteLogo}
            alt="Criando Convites Virais"
            width={320}
            height={140}
            className="h-12 w-auto max-w-[min(100%,280px)] object-contain sm:h-16 md:h-[4.5rem]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col items-center gap-4 sm:items-end">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @convites.virais"
            className="instagram-uiverse-link"
          >
            <span className="instagram-uiverse-link__icon-wrap">
              <svg
                className="instagram-uiverse-link__svg"
                fill="white"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
            <span className="instagram-uiverse-link__bg" aria-hidden />
          </a>
          <p className="text-center text-xs sm:text-right">
            © {new Date().getFullYear()} Convites Virais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
