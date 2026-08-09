@echo off
title SkillMatrix Spring Boot Backend Launcher
echo ========================================================
echo   Starting SkillMatrix Spring Boot 3 Backend...
echo ========================================================

:: Check for JDK in standard Eclipse Adoptium or Java paths
if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
    set "PATH=C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot\bin;%PATH%"
) else if exist "C:\Program Files\Java\jdk-26.0.1\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-26.0.1"
    set "PATH=C:\Program Files\Java\jdk-26.0.1\bin;%PATH%"
)

echo Using Java:
java -version

cd /d "%~dp0backend"
echo Starting Maven Spring Boot Application...
mvn spring-boot:run
pause
