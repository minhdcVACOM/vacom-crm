@echo off
REM ==============================
REM 📱 React Native APK Release Build Script
REM ==============================

REM Get script's current directory
set SCRIPT_DIR=%~dp0
echo ==============================
echo  📱 React Native APK Release Build
echo ==============================
echo.

REM Move to project root
cd /d %SCRIPT_DIR%
echo → Cleaning old builds...
cd android
echo Do you want to clean before build? (Y/N)
set /p CLEAN_CHOICE=
IF /I "%CLEAN_CHOICE%"=="Y" (
  .\gradlew clean
)

echo → Building APK Release...
.\gradlew assembleRelease

echo → Moving back to project root...
cd ..

REM Check if Universal APK exists
set APK_PATH=android\app\build\outputs\apk\release\app-universal-release.apk
IF EXIST %APK_PATH% (
    echo.
    echo ✅ Build successful!
    echo → APK location: %APK_PATH%
    echo → Opening APK folder...
    explorer android\app\build\outputs\apk\release
) ELSE (
    echo.
    echo ❌ Build failed! APK not found.
)

echo.
echo ==============================
echo  ▶ Press any key to exit...
echo ==============================
pause >nul
exit /b
