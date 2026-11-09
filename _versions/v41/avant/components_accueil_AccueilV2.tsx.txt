"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import contenu from "@/content/pages/accueil.json";
import { AccueilSituations } from "./AccueilSituations";

// Page d’accueil V2 (v28) — maquette NYAKA_Accueil_V2_Interactif intégrée
// avec l’en-tête et le pied de page officiels du site. Les phrases animées du hero
// restent celles du site (content/pages/accueil.json → hero.sequence_dynamique).

const PHRASES: string[] = contenu.hero.sequence_dynamique;
const LOGOS = contenu.references.logos;

const CSS = ".acc2{--paper:#f5f3ef;--light:#faf9f6;--white:#ffffff;--ink:#191817;--secondary:#6d6861;--rule:#dedad3;--espresso:#231d1a;--brown:#3d2b22;--gold:#c8a36b;--gold-soft:#dfc9a5;--rose:#c9818b;--max:1250px;--font:var(--font-geist-sans),system-ui,-apple-system,\"Segoe UI\",Arial,sans-serif}.acc2 *,.acc2 *:before,.acc2 *:after{box-sizing:border-box}.acc2{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font);font-size:16px;-webkit-font-smoothing:antialiased;overflow-x:hidden}.acc2 a{color:inherit;text-decoration:none}.acc2 button{font:inherit;cursor:pointer}.acc2 button,.acc2 a{outline-offset:4px}.acc2 a:focus-visible,.acc2 button:focus-visible,.acc2 summary:focus-visible{outline:2px solid var(--gold);outline-offset:4px}.acc2 .container{width:min(calc(100% - 88px),var(--max));margin-inline:auto}.acc2 .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.acc2 .eyebrow{font-size:11px;line-height:1.5;font-weight:750;letter-spacing:.18em;text-transform:uppercase;color:var(--secondary)}.acc2 .eyebrow.gold{color:var(--gold-soft)}.acc2 .text-muted{color:var(--secondary)}.acc2 h1,.acc2 h2,.acc2 h3,.acc2 p{margin:0}.acc2 h1,.acc2 h2,.acc2 h3{font-weight:780;letter-spacing:-.058em}.acc2 h2{font-size:clamp(42px,5.3vw,75px);line-height:1.04}.acc2 h3{line-height:1.12}.acc2 .small-divider{height:1px;background:var(--rule)}.acc2 .btn{border-radius:8px;display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:49px;padding:0 20px;font-size:13px;font-weight:710;white-space:nowrap;border:1px solid transparent;transition:transform .25s,background .25s,border-color .25s,opacity .25s}.acc2 .btn:hover{transform:translateY(-2px)}.acc2 .btn-dark{background:#181716;color:#fff}.acc2 .btn-light{background:#f6f3ef;color:#181716}.acc2 .btn-outline{background:transparent;color:var(--ink);border:1px solid var(--rule)}.acc2 .btn-outline:hover{border-color:#968779}.acc2 .btn-inverse{background:transparent;color:white;border:1px solid #776a5f}.acc2 .btn-inverse:hover{border-color:#e3c29c}.acc2 .btn svg{width:16px;height:16px;flex:0 0 auto}.acc2 .hero{background:var(--espresso);color:#fff;position:relative;overflow:hidden}.acc2 .hero:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 87% 20%,#a4754e3d,transparent 27%),radial-gradient(circle at 18% 84%,#6e493338,transparent 30%),linear-gradient(130deg,#181615,#2b211d 67%,#171515)}.acc2 .hero:after{content:\"\";position:absolute;inset:0;pointer-events:none;opacity:.4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cpath d='M0 319H320M319 0V320' stroke='%23ffffff' stroke-opacity='.055' stroke-width='1' fill='none'/%3E%3C/svg%3E\")}.acc2 .hero-inner{position:relative;z-index:1;min-height:690px;padding:97px 0 100px;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:84px;align-items:center}.acc2 .hero-text{max-width:690px;position:relative;z-index:2}.acc2 .hero-label{display:flex;gap:14px;align-items:center;margin-bottom:28px}.acc2 .hero-label i{height:1px;width:28px;background:var(--gold)}.acc2 .hero h1{font-size:clamp(53px,5.55vw,86px);line-height:1.035;letter-spacing:-.072em;font-weight:760}.acc2 .hero h1 em{font-style:normal;color:#e7cda7}.acc2 .hero-copy{font-size:17px;color:#ddd5cb;line-height:1.72;max-width:510px;margin:30px 0 30px}.acc2 .hero-actions{display:flex;gap:11px;flex-wrap:wrap}.acc2 .hero-footnote{font-size:11px;color:#aea197;margin-top:25px;line-height:1.55}.acc2 .kinetic{position:relative;height:500px;min-width:0;isolation:isolate;display:flex;align-items:center;justify-content:center}.acc2 .kinetic-well{width:min(100%,520px);height:430px;border:1px solid #ffffff20;position:relative;overflow:hidden;border-radius:17px;background:linear-gradient(165deg,#45352b 0%,#291f1c 44%,#1a1918 100%);box-shadow:0 42px 90px #0004, inset 0 0 90px #e8bc6b0b}.acc2 .kinetic-well:before{content:\"\";position:absolute;width:510px;height:510px;left:70px;top:-90px;border-radius:50%;border:1px solid #d0a77736;box-shadow:0 0 0 50px #b9946b09,0 0 0 120px #bb97700a}.acc2 .kinetic-well:after{content:\"\";position:absolute;left:-70px;right:-70px;bottom:-250px;height:390px;transform:rotate(-15deg);background:radial-gradient(ellipse,#b58a53aa,transparent 58%);filter:blur(36px)}.acc2 .kinetic-top{position:absolute;top:27px;left:28px;right:28px;display:flex;align-items:center;justify-content:space-between;color:#d2c2b2;font-size:10px;font-weight:750;letter-spacing:.18em;text-transform:uppercase}.acc2 .kinetic-text{position:absolute;left:36px;right:30px;top:110px;z-index:2}.acc2 .kinetic-text small{display:block;letter-spacing:.2em;font-size:11px;color:#e7cda7;margin-bottom:24px;text-transform:uppercase;font-weight:700}.acc2 .kinetic-active{font-size:clamp(35px,3.15vw,52px);min-height:155px;line-height:1.05;font-weight:730;letter-spacing:-.065em;transition:opacity .32s,transform .32s;text-wrap:balance}.acc2 .kinetic-active.is-out{opacity:0;transform:translateY(11px)}.acc2 .kinetic-index{display:flex;align-items:center;gap:14px;color:#ddc6a6;margin-top:32px;font-size:11px;font-weight:700;letter-spacing:.12em}.acc2 .kinetic-track{height:2px;flex:1;background:#ffffff20;border-radius:9px;overflow:hidden;max-width:190px}.acc2 .kinetic-progress{height:100%;background:#d7b985;width:0%;animation:acc2-progress 3.2s linear infinite}.acc2 .kinetic-num{font-size:12px;color:#d1b58a}.acc2 .kinetic-bottom{position:absolute;bottom:22px;left:28px;right:28px;display:flex;justify-content:space-between;font-size:10px;color:#aa9f92;letter-spacing:.12em;text-transform:uppercase;z-index:1}.acc2 .hero-baseline{position:absolute;bottom:24px;left:0;right:0;z-index:2;color:#b7a99b;font-size:10px;letter-spacing:.1em;display:flex;justify-content:space-between}.acc2 .trust{padding:42px 0 47px;background:#fbfaf8;border-bottom:1px solid #e7e3de}.acc2 .trust-row{display:flex;align-items:center;gap:40px}.acc2 .trust-caption{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#8a8178;font-weight:760;white-space:nowrap}.acc2 .trust-rule{width:1px;height:40px;background:var(--rule)}.acc2 .trust-logos{display:flex;flex:1;justify-content:space-between;gap:25px;align-items:center;flex-wrap:wrap}.acc2 .trust-logos span{color:#7a746f;font-size:clamp(12px,1.2vw,17px);font-weight:810;letter-spacing:-.02em;white-space:nowrap}.acc2 .trust-logos span:nth-child(2){letter-spacing:.085em}.acc2 .trust-logos span:nth-child(4){font-family:Georgia,serif;letter-spacing:.07em}.acc2 .expertise{padding:125px 0 125px}.acc2 .section-heading{display:flex;justify-content:space-between;align-items:end;gap:42px;margin-bottom:50px}.acc2 .section-heading .eyebrow{margin-bottom:20px}.acc2 .section-heading p{font-size:16px;line-height:1.8;color:var(--secondary);max-width:425px}.acc2 .exp-shell{display:grid;grid-template-columns:290px minmax(0,1fr);min-height:480px;border:1px solid var(--rule);border-radius:17px;overflow:hidden;background:#fff}.acc2 .exp-tabs{border-right:1px solid var(--rule);padding:19px 15px;background:#fbfaf8;display:flex;flex-direction:column;gap:7px}.acc2 .exp-tab{border:1px solid transparent;background:transparent;border-radius:10px;width:100%;display:flex;align-items:center;justify-content:space-between;padding:22px 15px;text-align:left;color:#625d55;font-weight:700;font-size:15px;transition:background .22s,color .22s,border .22s}.acc2 .exp-tab span{font-size:10px;font-weight:800;letter-spacing:.11em;color:#a9a197;margin-right:12px}.acc2 .exp-tab.is-active{background:#f0ebe3;border-color:#e3d9cb;color:#191817}.acc2 .exp-tab.is-active span{color:#946b37}.acc2 .exp-tab:hover{background:#f0ece6}.acc2 .exp-panel{display:grid;grid-template-columns:.98fr 1.02fr;align-items:stretch;min-width:0}.acc2 .exp-copy{padding:67px 34px 50px 54px;display:flex;flex-direction:column;justify-content:center}.acc2 .exp-copy .eyebrow{color:#9b7750}.acc2 .exp-copy h3{font-size:clamp(34px,3vw,48px);letter-spacing:-.055em;margin:19px 0 18px;line-height:1.09;max-width:390px}.acc2 .exp-copy p{font-size:15px;color:var(--secondary);line-height:1.78;max-width:390px}.acc2 .exp-bullets{margin:24px 0 30px;display:flex;flex-wrap:wrap;gap:8px}.acc2 .exp-bullets span{border-radius:100px;border:1px solid #e2dcd3;background:#faf9f7;color:#6b6259;padding:8px 11px;font-size:11px;font-weight:650}.acc2 .exp-link{display:inline-flex;align-items:center;gap:13px;border-bottom:1px solid #a78a6a;width:fit-content;padding-bottom:9px;font-weight:720;font-size:13px;transition:gap .2s}.acc2 .exp-link:hover{gap:20px}.acc2 .exp-art{min-height:480px;position:relative;overflow:hidden;background:#e9dfd0;isolation:isolate}.acc2 .exp-art>*{transition:transform .45s,opacity .3s}.acc2 .exp-art.branding{background:linear-gradient(145deg,#e0d2bd,#f0e8dd)}.acc2 .exp-art.design{background:linear-gradient(125deg,#e0dfdd,#f9f4ec)}.acc2 .exp-art.video{background:radial-gradient(circle at 58% 27%,#825548,#292323 65%)}.acc2 .exp-art.data{background:linear-gradient(138deg,#2e2825,#121618)}.acc2 .scene-floor{position:absolute;left:7%;bottom:10%;width:93%;height:20%;border-radius:50%;filter:blur(28px);background:#442e2450;transform:rotate(-12deg)}.acc2 .art-card{position:absolute;box-shadow:15px 22px 30px #342a2342;display:flex;justify-content:center;align-items:center;overflow:hidden}.acc2 .branding .a{left:13%;top:16%;width:46%;height:66%;background:#292822;transform:rotate(-13deg);color:#d4b27e;flex-direction:column;gap:19px}.acc2 .branding .a:before{content:\"\";width:160px;height:160px;border:1px solid #ae855575;border-radius:50%;position:absolute;top:35px;left:25px}.acc2 .branding .a b{font-family:Georgia,serif;font-size:100px;font-weight:400;position:relative}.acc2 .branding .a small{position:relative;letter-spacing:.22em;font-size:9px}.acc2 .branding .b{right:11%;top:19%;width:40%;height:54%;background:#f9f3e8;transform:rotate(11deg);color:#aa824c;display:flex;flex-direction:column}.acc2 .branding .b b{font:normal 130px Georgia,serif}.acc2 .branding .b small{font-size:10px;letter-spacing:.16em}.acc2 .branding .c{right:3%;bottom:12%;width:52%;height:27%;transform:rotate(-6deg);background:#a77e5c;color:#fff4d9;display:flex;flex-direction:column;gap:12px}.acc2 .branding .c b{font-size:20px;letter-spacing:-.04em}.acc2 .branding .c small{font-size:9px;letter-spacing:.21em}.acc2 .design .a{left:13%;top:14%;width:46%;height:72%;background:#c3ac97;transform:rotate(-11deg);color:#242121;display:flex;flex-direction:column;justify-content:space-between;padding:22px}.acc2 .design .a b{font-size:60px;font-weight:830;line-height:.83;letter-spacing:-.09em}.acc2 .design .a small{font-size:10px;font-weight:700;letter-spacing:.2em}.acc2 .design .b{right:11%;top:8%;width:40%;height:61%;background:#f7f5f0;transform:rotate(8deg);border:1px solid white;color:#b16c56;display:flex;flex-direction:column;gap:18px}.acc2 .design .b:before{content:\"\";width:130px;height:130px;background:radial-gradient(circle,#cb9d81,#734f63 72%);border-radius:50%;box-shadow:7px 12px 20px #0002}.acc2 .design .b b{font-size:16px;color:#2b2521}.acc2 .design .b small{font-size:10px;letter-spacing:.2em;color:#8e706c}.acc2 .design .c{right:7%;bottom:12%;width:55%;height:24%;background:#202323;color:#f0d6b3;transform:rotate(-3deg);flex-direction:column;gap:7px}.acc2 .design .c b{font-size:30px;letter-spacing:-.06em}.acc2 .design .c small{font-size:10px;letter-spacing:.16em}.acc2 .video .a{left:10%;top:19%;width:79%;height:52%;border:10px solid #3d3633;background:linear-gradient(130deg,#201d26 20%,#be8060 61%,#312e35 100%);box-shadow:12px 20px 35px #0008;color:#fff;transform:rotate(-5deg);justify-content:space-between;align-items:flex-end;padding:16px}.acc2 .video .a b{font-size:31px;letter-spacing:-.06em}.acc2 .video .a small{font-size:11px;color:#fff8;letter-spacing:.2em}.acc2 .video .b{right:6%;bottom:7%;width:43%;height:29%;background:#27272b;border:8px solid #463d38;transform:rotate(9deg);color:#fff}.acc2 .video .b b{font-size:50px;font-weight:500}.acc2 .video .c{left:15%;bottom:11%;width:32%;height:10%;background:transparent;border-top:5px dashed #c1a0798c;border-bottom:5px dashed #c1a0798c;box-shadow:none}.acc2 .data .a{left:10%;top:12%;width:77%;height:68%;background:#1e2425;border:1px solid #57635d;border-radius:12px;transform:rotate(-6deg);display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;padding:22px;box-shadow:18px 21px 35px #0009;color:#e9f0ed}.acc2 .data .a .ui-top{width:100%;height:8px;background:linear-gradient(90deg,#cbb28b 0 12%,#536760 12% 35%,#283835 35% 100%);border-radius:8px;margin-bottom:30px}.acc2 .data .a b{font-size:24px;letter-spacing:-.04em;margin-bottom:9px}.acc2 .data .a small{font-size:10px;color:#abb7af;line-height:1.6}.acc2 .data .bars{display:flex;align-items:end;gap:8px;margin-top:32px;height:100px}.acc2 .data .bars i{display:block;background:linear-gradient(180deg,#c1ae8e,#677f74);width:14%;border-radius:4px 4px 0 0}.acc2 .data .bars i:nth-child(1){height:37%}.acc2 .data .bars i:nth-child(2){height:63%}.acc2 .data .bars i:nth-child(3){height:47%}.acc2 .data .bars i:nth-child(4){height:83%}.acc2 .data .bars i:nth-child(5){height:68%}.acc2 .data .b{right:0%;bottom:10%;width:49%;height:27%;background:#e8e4d9;border-radius:8px;transform:rotate(7deg);color:#2c332f;flex-direction:column;gap:6px}.acc2 .data .b b{font-size:21px;letter-spacing:-.03em}.acc2 .data .b small{font-size:9px;letter-spacing:.2em}.acc2 .data .c{display:none}.acc2 .exp-art:hover .a{translate:0 -5px}.acc2 .exp-art:hover .b{translate:0 -7px}.acc2 .work{background:#fff;padding:120px 0 129px;border-top:1px solid #ebe7e1}.acc2 .work-top{display:flex;justify-content:space-between;align-items:end;gap:50px;margin-bottom:44px}.acc2 .work-top p{max-width:360px;font-size:16px;line-height:1.75;color:var(--secondary)}.acc2 .work-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}.acc2 .project{position:relative;display:block;border-radius:13px;overflow:hidden;background:#e7e0d7;min-height:280px;isolation:isolate}.acc2 .project img{width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;transition:transform .8s cubic-bezier(.2,.6,.2,1)}.acc2 .project:hover img{transform:scale(1.055)}.acc2 .project:after{content:\"\";position:absolute;inset:27% 0 0;background:linear-gradient(transparent,#0e0d0bbb)}.acc2 .project-feature{grid-column:span 2;grid-row:span 2;min-height:570px}.acc2 .project-info{position:absolute;z-index:2;left:21px;right:20px;bottom:18px;color:white;display:flex;align-items:end;justify-content:space-between;gap:12px}.acc2 .project-feature .project-info{left:34px;right:34px;bottom:32px}.acc2 .project-info small{display:block;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#f2ded0;margin-bottom:9px;font-weight:700}.acc2 .project-info h3{font-size:23px;font-weight:740;letter-spacing:-.05em}.acc2 .project-feature .project-info h3{font-size:40px}.acc2 .round-arrow{display:flex;align-items:center;justify-content:center;border:1px solid #ffffff80;width:34px;height:34px;border-radius:50%;flex:0 0 auto}.acc2 .round-arrow svg{width:17px;height:17px}.acc2 .work-bottom{margin-top:32px;text-align:center}.acc2 .about-bridge{background:#231f1d;color:#fff;padding:112px 0 115px;overflow:hidden;position:relative}.acc2 .about-bridge:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 92% 3%,#b5946433,transparent 29%),linear-gradient(130deg,transparent 45%,#3d302a44)}.acc2 .about-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:94px;align-items:center;position:relative;z-index:1}.acc2 .about-bridge .eyebrow{color:var(--gold-soft);margin-bottom:24px}.acc2 .about-bridge h2{font-size:clamp(39px,4.6vw,68px);max-width:780px}.acc2 .about-bridge h2 span{color:#e0b982}.acc2 .about-side{border-left:1px solid #746458;padding-left:35px}.acc2 .about-side p{font-size:16px;line-height:1.84;color:#d4c7bd;margin-bottom:28px}.acc2 .about-side a{display:inline-flex;gap:15px;align-items:center;border-bottom:1px solid #b79366;padding-bottom:9px;color:#f4e5cf;font-weight:700;font-size:13px}.acc2 .faq{background:var(--paper);padding:123px 0 115px}.acc2 .faq-layout{display:grid;grid-template-columns:.77fr 1.23fr;gap:84px}.acc2 .faq-header .eyebrow{margin-bottom:24px}.acc2 .faq-header h2{font-size:clamp(42px,4.7vw,64px)}.acc2 .faq-header p{font-size:15px;color:var(--secondary);line-height:1.75;margin-top:20px;max-width:360px}.acc2 .faq-list{border-top:1px solid #cdc8c0}.acc2 .faq details{border-bottom:1px solid #cdc8c0}.acc2 .faq summary{list-style:none;padding:25px 5px;display:flex;align-items:center;gap:20px;justify-content:space-between;cursor:pointer;font-size:16px;font-weight:700;line-height:1.45}.acc2 .faq summary::-webkit-details-marker{display:none}.acc2 .faq summary svg{width:18px;flex:0 0 auto;transition:transform .25s}.acc2 .faq details[open] summary svg{transform:rotate(45deg)}.acc2 .faq details p{font-size:14px;color:var(--secondary);line-height:1.8;padding:0 35px 28px 5px}.acc2 .cta{background:linear-gradient(145deg,#2b2220,#171717);color:#fff;padding:100px 0 104px;position:relative;overflow:hidden}.acc2 .cta:before{content:\"\";position:absolute;right:-100px;top:-230px;width:680px;height:680px;border-radius:50%;border:1px solid #b28e6050;box-shadow:0 0 0 70px #d2b07c08,0 0 0 150px #c3a17008}.acc2 .cta-content{position:relative;z-index:1;display:flex;align-items:end;justify-content:space-between;gap:50px}.acc2 .cta .eyebrow{color:#dfbf8e;margin-bottom:21px}.acc2 .cta h2{font-size:clamp(46px,5vw,74px);max-width:770px}.acc2 .cta p{font-size:16px;line-height:1.8;color:#d1c7bd;margin-top:18px;max-width:550px}.acc2 .cta-actions{display:flex;flex-direction:column;gap:12px;align-items:stretch;min-width:228px}.acc2 .cta-actions .btn{width:100%}.acc2 .cta-actions small{font-size:11px;color:#a99f95;text-align:center}.acc2 .reveal{opacity:0;transform:translateY(22px);transition:opacity .75s,transform .75s}.acc2 .reveal.visible{opacity:1;transform:none}@keyframes acc2-progress{from{width:0}to{width:100%}}@media(max-width:1180px){.acc2 .hero-inner{gap:42px}.acc2 .exp-shell{grid-template-columns:220px minmax(0,1fr)}.acc2 .exp-copy{padding-left:34px}.acc2 .section-heading{gap:30px}.acc2 .work-grid{grid-template-columns:repeat(4,1fr)}.acc2 .project{min-height:250px}.acc2 .project-feature{min-height:515px}}@media(max-width:950px){.acc2 .container{width:min(calc(100% - 50px),var(--max))}.acc2 .hero-inner{grid-template-columns:1fr;gap:28px;padding:75px 0 95px}.acc2 .hero-text{max-width:800px}.acc2 .hero h1{font-size:clamp(48px,7.3vw,75px)}.acc2 .kinetic{height:390px;width:100%}.acc2 .kinetic-well{width:100%;height:360px}.acc2 .kinetic-text{top:88px}.acc2 .kinetic-active{min-height:104px;font-size:39px}.acc2 .hero-baseline{display:none}.acc2 .trust-row{gap:20px}.acc2 .trust-logos{justify-content:start;gap:20px 26px}.acc2 .section-heading,.acc2 .work-top{align-items:start;flex-direction:column;gap:18px}.acc2 .expertise{padding:90px 0}.acc2 .exp-shell{grid-template-columns:1fr}.acc2 .exp-tabs{display:grid;grid-template-columns:repeat(4,1fr);border-right:0;border-bottom:1px solid var(--rule);padding:11px;gap:5px}.acc2 .exp-tab{padding:13px 10px;justify-content:center;font-size:12px;text-align:center}.acc2 .exp-tab span{display:none}.acc2 .exp-panel{grid-template-columns:1fr 1fr}.acc2 .exp-art{min-height:440px}.acc2 .exp-copy{padding:40px 28px}.acc2 .work{padding:95px 0}.acc2 .work-grid{grid-template-columns:repeat(2,1fr)}.acc2 .project-feature{grid-column:span 2;grid-row:span 1;min-height:470px}.acc2 .project{min-height:270px}.acc2 .about-grid{grid-template-columns:1fr;gap:45px}.acc2 .about-side{max-width:570px}.acc2 .faq-layout{grid-template-columns:1fr;gap:44px}.acc2 .cta-content{align-items:start;flex-direction:column}.acc2 .cta-actions{flex-direction:row}.acc2 .cta-actions .btn{min-width:210px}.acc2 .cta-actions small{display:none}}@media(max-width:680px){.acc2 .container{width:min(calc(100% - 34px),var(--max))}.acc2 .hero-inner{padding:58px 0 65px;gap:20px}.acc2 .hero-label{margin-bottom:20px}.acc2 .hero h1{font-size:clamp(45px,11vw,62px)}.acc2 .hero-copy{font-size:14px;margin:24px 0 24px;line-height:1.75}.acc2 .hero-actions{align-items:stretch}.acc2 .hero-actions .btn{font-size:12px;padding:0 12px;flex:1}.acc2 .hero-footnote{margin-top:20px}.acc2 .kinetic{height:310px}.acc2 .kinetic-well{height:290px}.acc2 .kinetic-text{top:79px;left:25px;right:22px}.acc2 .kinetic-active{font-size:32px;min-height:95px}.acc2 .kinetic-index{margin-top:12px}.acc2 .kinetic-top{top:22px;left:22px}.acc2 .kinetic-bottom{left:22px;bottom:20px}.acc2 .trust{padding:29px 0}.acc2 .trust-row{display:block}.acc2 .trust-rule{display:none}.acc2 .trust-caption{display:block;margin-bottom:23px}.acc2 .trust-logos{gap:15px 23px}.acc2 .trust-logos span{font-size:13px}.acc2 .expertise{padding:78px 0 84px}.acc2 .section-heading{margin-bottom:26px}.acc2 .section-heading .eyebrow{margin-bottom:15px}.acc2 .section-heading h2,.acc2 .work-top h2,.acc2 .faq h2{font-size:clamp(36px,9vw,48px)}.acc2 .section-heading p,.acc2 .work-top p{font-size:14px;line-height:1.7}.acc2 .exp-tabs{grid-template-columns:repeat(2,1fr)}.acc2 .exp-tab{font-size:12px}.acc2 .exp-panel{grid-template-columns:1fr}.acc2 .exp-copy{padding:37px 25px 35px}.acc2 .exp-copy h3{font-size:35px}.acc2 .exp-art{min-height:310px}.acc2 .art-card{scale:.77;transform-origin:center!important}.acc2 .branding .a{left:6%;top:4%}.acc2 .branding .b{right:4%;top:6%}.acc2 .branding .c{right:0%;bottom:1%}.acc2 .design .a{left:6%;top:4%}.acc2 .design .b{right:4%;top:3%}.acc2 .design .c{bottom:2%}.acc2 .video .a{left:4%;top:10%;width:90%;height:60%}.acc2 .video .b{bottom:0%}.acc2 .data .a{left:1%;top:0%;width:93%;height:84%}.acc2 .data .b{right:-8%;bottom:0%}.acc2 .work{padding:80px 0 87px}.acc2 .work-top{margin-bottom:27px}.acc2 .work-grid{gap:10px}.acc2 .project-feature{min-height:350px}.acc2 .project{min-height:205px}.acc2 .project-info{left:12px;right:12px;bottom:13px}.acc2 .project-info h3{font-size:18px}.acc2 .project-feature .project-info h3{font-size:31px}.acc2 .project-info small{font-size:8px;line-height:1.5}.acc2 .project-feature .project-info{left:18px;right:18px;bottom:20px}.acc2 .round-arrow{width:28px;height:28px}.acc2 .work-bottom{margin-top:25px}.acc2 .about-bridge{padding:79px 0}.acc2 .about-grid{gap:30px}.acc2 .about-bridge h2{font-size:clamp(38px,9vw,53px)}.acc2 .about-side{padding-left:22px}.acc2 .about-side p{font-size:14px}.acc2 .faq{padding:82px 0}.acc2 .faq-header p{font-size:14px}.acc2 .faq summary{font-size:14px;padding:21px 0}.acc2 .faq details p{font-size:13px}.acc2 .cta{padding:79px 0 82px}.acc2 .cta h2{font-size:clamp(43px,9vw,60px)}.acc2 .cta p{font-size:14px}.acc2 .cta-actions{flex-direction:column;align-items:stretch;width:100%}.acc2 .cta-actions small{display:block}.acc2 .reveal{transition-duration:.55s}}@media(prefers-reduced-motion:reduce){.acc2 .reveal{transform:none;opacity:1;transition:none}.acc2 .kinetic-progress{animation:none;width:100%}.acc2 .btn,.acc2 .project img,.acc2 .art-card{transition:none}}.acc2 .trust-logos img{height:78px;width:auto;max-width:150px;object-fit:contain;filter:brightness(0) opacity(.8);transition:filter .3s,transform .3s}.acc2 .trust-logos img:hover{filter:brightness(0) opacity(1);transform:scale(1.06)}@media(max-width:950px){.acc2 .trust-logos img{height:66px}}@media(max-width:680px){.acc2 .trust-logos{display:grid;grid-template-columns:repeat(3,1fr);justify-items:center;gap:18px 10px}.acc2 .trust-logos img{height:60px;max-width:100%}}.acc2 .kinetic-bottom{gap:12px}.acc2-head{position:relative;z-index:50;height:72px;background:#f5f3ef;border-bottom:1px solid #dedad3}";

const Fleche = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M5 19 19 5M8 5h11v11" />
  </svg>
);
const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

type Pole = {
  cle: string; onglet: string; num: string; label: string; titre: string; texte: string;
  puces: string[]; lien: string; a: JSX.Element; b: JSX.Element; c: JSX.Element | null;
};

const POLES: Pole[] = [
  {
    cle: "branding", onglet: "Branding", num: "01", label: "01 / Branding",
    titre: "Une identité qui vous distingue.",
    texte: "Nous créons et faisons évoluer des identités de marque fortes, reconnaissables et cohérentes.",
    puces: ["Positionnement", "Identité visuelle", "Direction artistique"], lien: "/solutions#branding",
    a: <><b>N</b><small>THE SIGNATURE</small></>, b: <><b>N</b><small>IDENTITY SYSTEM</small></>,
    c: <><b>Form &amp; feeling.</b><small>VISUAL LANGUAGE</small></>,
  },
  {
    cle: "design", onglet: "Design", num: "02", label: "02 / Design",
    titre: "Des supports qui valorisent vos idées.",
    texte: "Nous concevons des supports imprimés et digitaux qui donnent une forme professionnelle, claire et attractive à vos messages.",
    puces: ["Flyers & affiches", "Brochures & catalogues", "Supports digitaux"], lien: "/solutions#design",
    a: <><b>FORM<br />FOLLOWS<br />IDEAS</b><small>VISUAL DESIGN</small></>, b: <><b>ÉDITO</b><small>PRINT &amp; DIGITAL</small></>,
    c: <><b>Le sens du détail.</b><small>DESIGN SYSTEM</small></>,
  },
  {
    cle: "video", onglet: "Vidéo & campagnes", num: "03", label: "03 / Vidéo & campagnes",
    titre: "Des contenus qui captent l’attention.",
    texte: "Nous imaginons et produisons des contenus audiovisuels et des campagnes qui donnent vie à votre message.",
    puces: ["Vidéos publicitaires", "Campagnes digitales", "Direction artistique"], lien: "/solutions#video",
    a: <><small>FRAME 01 / 24</small><b>Ideas in motion.</b></>, b: <><b>▶</b></>, c: <></>,
  },
  {
    cle: "data", onglet: "IA & Data", num: "04", label: "04 / IA & Data",
    titre: "Des solutions intelligentes pour vos activités.",
    texte: "Nous concevons des outils adaptés à des besoins précis : faciliter les échanges, organiser l’information et simplifier certains processus.",
    puces: ["Assistants IA", "Automatisation", "Analyse & reporting"], lien: "/solutions#ia",
    a: <><div className="ui-top" /><b>Activity overview</b><small>DATA / OPERATIONAL INSIGHTS</small><div className="bars"><i /><i /><i /><i /><i /></div></>,
    b: <><b>Intelligent flows</b><small>AI / WORKFLOW</small></>, c: <></>,
  },
];

const PROJETS = [
  { slug: "kawa-menu-experience", img: "/media/realisations/KME/KME_couverture.jpg", alt: "Deux pages du menu KAWA en mockup, création éditoriale réalisée par NYAKA", cat: "Projet phare · Design éditorial & digital", titre: "KAWA Menu Experience", phare: true },
  { slug: "the-vision", img: "/media/realisations/TV/TV_couverture.jpg", alt: "Mockup éditorial de créations pour THE VISION", cat: "Communication & design", titre: "THE VISION" },
  { slug: "7g-services-7g-pay", img: "/media/realisations/7G/7G_couverture.jpg", alt: "Créations publicitaires de 7G Services et 7G PAY", cat: "Campagnes & design", titre: "7G Services" },
  { slug: "brirena-hair", img: "/media/realisations/BRI/BRI_couverture.jpg", alt: "Identité visuelle et applications de marque BRIRENA HAIR", cat: "Branding & identité", titre: "BRIRENA HAIR" },
  { slug: "perfecta", img: "/media/realisations/PER/PER_couverture.jpg", alt: "Comparaison des logos avant et après refonte de Perfecta", cat: "Refonte & identité", titre: "Perfecta" },
];

const FAQ = [
  { q: "Puis-je vous contacter si mon idée n’est pas encore bien structurée ?", r: "Oui. Un premier échange nous permet de comprendre votre idée, de clarifier vos objectifs et d’identifier ensemble les prochaines étapes." },
  { q: "Puis-je commander uniquement un logo, une vidéo ou un support précis ?", r: "Oui. Nos expertises peuvent être mobilisées séparément ou associées en fonction des besoins réels de votre projet." },
  { q: "Travaillez-vous avec des clients situés dans d’autres pays ?", r: "Oui. Nous pouvons organiser le cadrage, les échanges et les validations à distance selon les contraintes du projet." },
  { q: "Comment obtenir une estimation pour mon projet ?", r: "Présentez-nous votre besoin et les livrables envisagés. Nous précisons ensuite le périmètre, les délais et les modalités avant d’établir une proposition adaptée." },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function AccueilV2() {
  const racine = useRef<HTMLDivElement>(null);
  const [phrase, setPhrase] = useState(0);
  const [sortie, setSortie] = useState(false);
  const [pole, setPole] = useState(0);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);

  // Phrases animées du hero (désactivées si l’utilisateur réduit les animations)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setSortie(true);
      t = setTimeout(() => { setPhrase((p) => (p + 1) % PHRASES.length); setSortie(false); }, 320);
    }, 3200);
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);

  // Apparition au défilement
  useEffect(() => {
    const els = document.querySelectorAll(".acc2 .reveal");
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    }), { threshold: 0.09 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const clavier = (e: React.KeyboardEvent, i: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const n = POLES.length;
    const s = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + n) % n;
    setPole(s);
    onglets.current[s]?.focus();
  };

  const P = POLES[pole];

  return (
    <>
    <div className="acc2" ref={racine}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-label"><span className="eyebrow gold">NYAKA · L’empreinte de votre marque.</span></div>
            <h1 id="hero-title">Des idées qui prennent forme.<br /><em>Des marques qui laissent une trace.</em></h1>
            <p className="hero-copy">Branding, design, vidéo et intelligence artificielle : nous donnons vie à vos projets.</p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#realisations">Voir nos réalisations <Fleche /></a>
              <Link className="btn btn-inverse" href="/demarrer-un-projet">Parler de votre projet <Fleche /></Link>
            </div>
            <p className="hero-footnote">Votre projet peut encore être au stade de l’idée. Nous commencerons par le clarifier avec vous.</p>
          </div>
          <div className="kinetic" aria-label="Exemples de projets et d’expériences que nous pouvons créer">
            <div className="kinetic-well">
              <div className="kinetic-top">NYAKA / Créativité en mouvement</div>
              <div className="kinetic-text">
                <small>Une idée devient</small>
                <div className={`kinetic-active${sortie ? " is-out" : ""}`} aria-live="polite">{PHRASES[phrase]}</div>
                <div className="kinetic-index">
                  <span className="kinetic-num">{pad(phrase + 1)} / {pad(PHRASES.length)}</span>
                  <div className="kinetic-track"><div className="kinetic-progress" /></div>
                </div>
              </div>
              <div className="kinetic-bottom"><span>Stratégie · Création · Intelligence</span></div>
            </div>
          </div>
        </div>
        <div className="container hero-baseline"><span>Faire défiler pour découvrir NYAKA ↓</span></div>
      </section>

      <section className="trust" aria-label="Références clients">
        <div className="container trust-row">
          <span className="trust-caption">Ils nous font confiance</span>
          <span className="trust-rule" aria-hidden />
          <div className="trust-logos">
            {LOGOS.map((l) => <img key={l.nom} src={l.logo} alt={l.nom} loading="lazy" />)}
          </div>
        </div>
      </section>

      <section className="expertise" id="expertises" aria-labelledby="expertise-title">
        <div className="container">
          <div className="section-heading reveal">
            <div><div className="eyebrow">Nos quatre pôles</div><h2 id="expertise-title">Quatre expertises.<br />Une même vision.</h2></div>
            <p>Du branding à l’intelligence artificielle, nous donnons forme à vos idées avec les expertises adaptées à chaque projet.</p>
          </div>
          <div className="exp-shell reveal">
            <div className="exp-tabs" role="tablist" aria-label="Nos expertises">
              {POLES.map((p, i) => (
                <button key={p.cle} ref={(el) => { onglets.current[i] = el; }} className={`exp-tab${i === pole ? " is-active" : ""}`}
                  id={`tab-${p.cle}`} role="tab" aria-selected={i === pole} aria-controls="expertise-panel" tabIndex={i === pole ? 0 : -1}
                  onClick={() => setPole(i)} onKeyDown={(e) => clavier(e, i)}>
                  <span>{p.num}</span>{p.onglet} ↗
                </button>
              ))}
            </div>
            <div className="exp-panel" id="expertise-panel" role="tabpanel" aria-labelledby={`tab-${P.cle}`} tabIndex={0}>
              <div className="exp-copy">
                <div className="eyebrow">{P.label}</div>
                <h3>{P.titre}</h3>
                <p>{P.texte}</p>
                <div className="exp-bullets">{P.puces.map((s) => <span key={s}>{s}</span>)}</div>
                <Link className="exp-link" href={P.lien}>Explorer cette expertise <span aria-hidden>↗</span></Link>
              </div>
              <div className={`exp-art ${P.cle}`} aria-hidden>
                <div className="scene-floor" />
                <div className="art-card a">{P.a}</div>
                <div className="art-card b">{P.b}</div>
                <div className="art-card c">{P.c}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work" id="realisations" aria-labelledby="work-title">
        <div className="container">
          <div className="work-top reveal">
            <div><div className="eyebrow" style={{ marginBottom: 20 }}>Nos réalisations</div><h2 id="work-title">Nos idées prennent vie ici.</h2></div>
            <p>Découvrez une sélection de projets imaginés et réalisés par NYAKA.</p>
          </div>
          <div className="work-grid">
            {PROJETS.map((p) => (
              <Link key={p.slug} className={`project${p.phare ? " project-feature" : ""} reveal`} href={`/realisations/${p.slug}`} aria-label={`Découvrir ${p.titre}`}>
                <img src={p.img} alt={p.alt} loading="lazy" />
                <div className="project-info">
                  <div><small>{p.cat}</small><h3>{p.titre}</h3></div>
                  <span className="round-arrow">{p.phare ? <Fleche /> : "↗"}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="work-bottom"><Link className="btn btn-dark" href="/realisations">Explorer toutes nos réalisations ↗</Link></div>
        </div>
      </section>

      <section className="about-bridge" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="reveal"><div className="eyebrow">Découvrir NYAKA</div><h2 id="about-title">La créativité au service <span>de vos ambitions.</span></h2></div>
          <div className="about-side reveal">
            <p>NYAKA est une agence de communication créative et de solutions d’intelligence artificielle. Nous accompagnons les entrepreneurs, les porteurs de projets et les entreprises dans la création et le développement de leurs activités.</p>
            <Link href="/a-propos">Découvrir NYAKA <span>↗</span></Link>
          </div>
        </div>
      </section>
    </div>

    <AccueilSituations />

    <div className="acc2">
      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div className="faq-header reveal"><div className="eyebrow">Quelques réponses</div><h2 id="faq-title">Réponses à vos questions.</h2><p>L’essentiel pour démarrer votre collaboration avec NYAKA.</p></div>
          <div className="faq-list reveal">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q} <Plus /></summary><p>{f.r}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-title">
        <div className="container cta-content">
          <div className="reveal"><div className="eyebrow">Parlons de votre projet</div><h2 id="cta-title">Un projet en tête ?<br />Parlons-en.</h2><p>Partagez-nous votre idée ou votre besoin. Ensemble, donnons-lui la bonne direction.</p></div>
          <div className="cta-actions reveal">
            <Link className="btn btn-light" href="/demarrer-un-projet">Démarrer un projet ↗</Link>
            <a className="btn btn-inverse" href="https://wa.me/79152135853" target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp ↗</a>
            <small>Premier échange sans engagement</small>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
