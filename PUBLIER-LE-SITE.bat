@echo off
chcp 65001 >nul
title NYAKA - Publier le site (feature/site_web vers main)
cd /d "%~dp0"
set LOG=publier-journal.txt
> %LOG% echo Publication du %DATE% %TIME%
echo Dossier : %CD% >> %LOG%

if exist .git\MERGE_HEAD (
  echo [ARRET] Une fusion est deja en cours. Rien n'a ete fait. >> %LOG%
  goto fin
)
if exist .git\index.lock (
  echo [ARRET] Git est deja utilise ailleurs ^(index.lock^). Fermez les terminaux puis relancez. >> %LOG%
  goto fin
)

echo 1/6 - Branche feature/site_web >> %LOG%
git checkout feature/site_web >> %LOG% 2>&1 || goto erreur
git add -A >> %LOG% 2>&1
git commit -m "Mise a jour du site NYAKA - %DATE% %TIME%" >> %LOG% 2>&1
git push -u origin feature/site_web >> %LOG% 2>&1 || goto erreur

echo 2/6 - Mise a jour de main >> %LOG%
git checkout main >> %LOG% 2>&1 || goto erreur
git pull --no-edit origin main >> %LOG% 2>&1 || goto erreur

echo 3/6 - Fusion de feature/site_web dans main >> %LOG%
git merge feature/site_web --no-edit >> %LOG% 2>&1 || goto conflit

echo 4/6 - Envoi de main (mise en ligne) >> %LOG%
git push origin main >> %LOG% 2>&1 || goto erreur
echo [OK] main envoye : le site se met a jour dans 2 a 3 minutes >> %LOG%

echo 5/6 - Retour sur feature/site_web >> %LOG%
git checkout feature/site_web >> %LOG% 2>&1 || goto erreur
git merge main --no-edit >> %LOG% 2>&1 || goto conflit
git push origin feature/site_web >> %LOG% 2>&1

echo 6/6 - Termine >> %LOG%
echo [OK] publication reussie >> %LOG%
goto resume

:conflit
echo [CONFLIT] La fusion a rencontre un conflit. Rien n'a ete envoye en ligne pour cette etape. >> %LOG%
git status >> %LOG% 2>&1
goto fin

:erreur
echo [ERREUR] Une etape a echoue, voir ci-dessus. >> %LOG%
goto fin

:resume
git log -3 --oneline >> %LOG% 2>&1
git status -sb >> %LOG% 2>&1

:fin
type %LOG%
timeout /t 10 >nul
