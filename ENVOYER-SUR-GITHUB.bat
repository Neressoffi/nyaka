@echo off
chcp 65001 >nul
title NYAKA - Envoi du site sur GitHub
cd /d "%~dp0"
echo.
echo  ============================================================
echo   NYAKA - Envoi du site sur GitHub (Neressoffi/nyaka)
echo   Netlify mettra ensuite nyakaagency.com a jour tout seul.
echo  ============================================================
echo.
echo  Dossier : %CD%
echo.
> envoi-github-journal.txt (
  echo Envoi du %DATE% %TIME%
  echo Dossier : %CD%
)
where git >nul 2>&1
if errorlevel 1 (
  echo  [ERREUR] Git n'est pas installe sur cet ordinateur.
  echo  [ERREUR] Git introuvable >> envoi-github-journal.txt
  goto fin
)
echo  1/4 - Preparation des fichiers...
git add -A >> envoi-github-journal.txt 2>&1
echo  2/4 - Enregistrement de la version...
git commit -m "Mise a jour du site NYAKA - %DATE% %TIME%" >> envoi-github-journal.txt 2>&1
echo  3/4 - Liaison au depot GitHub nyaka...
git remote set-url origin https://github.com/Neressoffi/nyaka.git >> envoi-github-journal.txt 2>&1
echo  4/4 - Envoi sur GitHub (une fenetre de connexion GitHub peut s'ouvrir : acceptez-la)...
git push -u origin main --force >> envoi-github-journal.txt 2>&1
if errorlevel 1 (
  echo.
  echo  [ERREUR] L'envoi a echoue. Le detail est dans envoi-github-journal.txt
  echo  [ERREUR] push echoue >> envoi-github-journal.txt
) else (
  echo.
  echo  [OK] Le site a bien ete envoye sur GitHub.
  echo  [OK] push reussi >> envoi-github-journal.txt
)
git log -1 --format="Derniere version : %%h  %%s" >> envoi-github-journal.txt 2>&1
git remote -v >> envoi-github-journal.txt 2>&1
:fin
echo.
echo  ------------------ Journal ------------------
type envoi-github-journal.txt
echo.
pause
